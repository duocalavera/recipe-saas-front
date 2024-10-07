import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';
import { format, subDays } from 'date-fns';
import { useRecipes } from '../context/RecipesContext';
import { useTheme } from '../context/ThemeContext';
import { themeStyles, ThemeKey } from '../themes/themeStyles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const { recipes } = useRecipes();
  const { currentTheme } = useTheme();
  const theme = themeStyles[currentTheme as ThemeKey];

  // Function to get purple-based colors (dark to light)
  const getPurpleColors = () => {
    return ['#4C1D95', '#5B21B6', '#6D28D9', '#7C3AED', '#8B5CF6'];
  };

  const purpleColors = getPurpleColors();

  // Simulated API call to fetch analytics data
  const fetchAnalyticsData = async (days: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const data = [];
        for (let i = days; i > 0; i--) {
          data.push({
            date: format(subDays(new Date(), i), 'MMM dd'),
            visits: Math.floor(Math.random() * 1000) + 100,
          });
        }
        resolve(data);
      }, 500);
    });
  };

  const [analyticsData, setAnalyticsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAnalyticsData(timeRange === '7days' ? 7 : 30);
      setAnalyticsData(data as any[]);
    };
    fetchData();
  }, [timeRange]);

  const visitData = {
    labels: analyticsData.map(d => d.date),
    datasets: [
      {
        label: 'Daily Visits',
        data: analyticsData.map(d => d.visits),
        fill: false,
        borderColor: purpleColors[2],
        backgroundColor: purpleColors[2],
        tension: 0.1,
      },
    ],
  };

  const topRecipes = recipes
    .map(recipe => ({ name: recipe.title, views: Math.floor(Math.random() * 1000) + 100 }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const topRecipesData = {
    labels: topRecipes.map(r => r.name),
    datasets: [
      {
        label: 'Views',
        data: topRecipes.map(r => r.views),
        backgroundColor: purpleColors,
      },
    ],
  };

  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [65, 30, 5],
        backgroundColor: purpleColors.slice(0, 3),
        hoverBackgroundColor: purpleColors.slice(0, 3),
      },
    ],
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${theme.body}`}>
      <h1 className={`text-3xl font-bold mb-8 ${theme.heading}`}>Blog Analytics</h1>
      
      <div className="mb-6">
        <label htmlFor="timeRange" className={`mr-2 ${theme.label}`}>Time Range:</label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className={`border rounded p-2 ${theme.select}`}
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`${theme.card} p-6 rounded-lg shadow`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme.heading}`}>Daily Visits</h2>
          <Line data={visitData} />
        </div>

        <div className={`${theme.card} p-6 rounded-lg shadow`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme.heading}`}>Top Recipes</h2>
          <Bar data={topRecipesData} />
        </div>

        <div className={`${theme.card} p-6 rounded-lg shadow`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme.heading}`}>Device Usage</h2>
          <Doughnut data={deviceData} />
        </div>

        <div className={`${theme.card} p-6 rounded-lg shadow`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme.heading}`}>Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className={`text-3xl font-bold ${theme.accent}`}>{analyticsData.reduce((sum, d) => sum + d.visits, 0)}</p>
              <p className={theme.text}>Total Visits</p>
            </div>
            <div className="text-center">
              <p className={`text-3xl font-bold ${theme.accent}`}>{(analyticsData.reduce((sum, d) => sum + d.visits, 0) / analyticsData.length).toFixed(0)}</p>
              <p className={theme.text}>Avg. Daily Visits</p>
            </div>
            <div className="text-center">
              <p className={`text-3xl font-bold ${theme.accent}`}>{topRecipes.length}</p>
              <p className={theme.text}>Top Recipes</p>
            </div>
            <div className="text-center">
              <p className={`text-3xl font-bold ${theme.accent}`}>65%</p>
              <p className={theme.text}>Desktop Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;