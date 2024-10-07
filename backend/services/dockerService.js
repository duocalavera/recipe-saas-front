import Docker from 'dockerode';
import fs from 'fs/promises';
import path from 'path';

const docker = new Docker(); // This will use the default socket path

export async function createUserContainer(user, blogContent) {
  const subdomain = user.blogName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const containerName = `blog-${subdomain}`;

  // Create a temporary directory to store the blog files
  const tempDir = path.join('/tmp', containerName);
  await fs.mkdir(tempDir, { recursive: true });

  // Write blog content to files
  await fs.writeFile(path.join(tempDir, 'index.html'), blogContent.html);
  await fs.writeFile(path.join(tempDir, 'styles.css'), blogContent.css);
  await fs.writeFile(path.join(tempDir, 'script.js'), blogContent.js);

  // Create a Dockerfile
  const dockerfileContent = `
    FROM nginx:alpine
    COPY . /usr/share/nginx/html
    EXPOSE 80
  `;
  await fs.writeFile(path.join(tempDir, 'Dockerfile'), dockerfileContent);

  // Build the Docker image
  const stream = await docker.buildImage({
    context: tempDir,
    src: ['Dockerfile', 'index.html', 'styles.css', 'script.js']
  }, { t: containerName });

  await new Promise((resolve, reject) => {
    docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
  });

  // Check if a container with the same name already exists
  const containers = await docker.listContainers({ all: true });
  const existingContainer = containers.find(c => c.Names.includes(`/${containerName}`));

  if (existingContainer) {
    // Stop and remove the existing container
    const container = docker.getContainer(existingContainer.Id);
    await container.stop();
    await container.remove();
  }

  // Create and start the new container
  const container = await docker.createContainer({
    Image: containerName,
    name: containerName,
    HostConfig: {
      PortBindings: { '80/tcp': [{ HostPort: '0' }] } // Dynamically assign a port
    }
  });

  await container.start();

  // Get the assigned port
  const containerInfo = await container.inspect();
  const port = containerInfo.NetworkSettings.Ports['80/tcp'][0].HostPort;

  // Clean up the temporary directory
  await fs.rm(tempDir, { recursive: true, force: true });

  return { containerName, port };
}

export async function stopAndRemoveContainer(containerName) {
  const containers = await docker.listContainers({ all: true });
  const existingContainer = containers.find(c => c.Names.includes(`/${containerName}`));

  if (existingContainer) {
    const container = docker.getContainer(existingContainer.Id);
    await container.stop();
    await container.remove();
  }
}