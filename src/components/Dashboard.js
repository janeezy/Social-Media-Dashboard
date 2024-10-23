import React, { useState, useMemo, useCallback } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// Mock data
const mockData = {
  followers: [
    { name: 'Twitter', value: 1000 },
    { name: 'Facebook', value: 1500 },
    { name: 'Instagram', value: 2000 },
    { name: 'LinkedIn', value: 800 },
  ],
  engagement: [
    { name: 'Twitter', likes: 500, shares: 200, comments: 100 },
    { name: 'Facebook', likes: 800, shares: 300, comments: 150 },
    { name: 'Instagram', likes: 1200, shares: 150, comments: 300 },
    { name: 'LinkedIn', likes: 300, shares: 100, comments: 50 },
  ],
  recentPosts: [
    { id: 1, platform: 'Twitter', content: 'Check out our latest product launch!', likes: 50, shares: 20, comments: 10 },
    { id: 2, platform: 'Facebook', content: 'Join us for our upcoming webinar on digital marketing.', likes: 80, shares: 30, comments: 15 },
    { id: 3, platform: 'Instagram', content: 'Behind the scenes at our photo shoot. #BTS', likes: 120, shares: 15, comments: 25 },
  ],
  growthTrend: [
    { date: '2023-01', Twitter: 800, Facebook: 1200, Instagram: 1500, LinkedIn: 600 },
    { date: '2023-02', Twitter: 850, Facebook: 1300, Instagram: 1600, LinkedIn: 650 },
    { date: '2023-03', Twitter: 900, Facebook: 1400, Instagram: 1800, LinkedIn: 700 },
    { date: '2023-04', Twitter: 1000, Facebook: 1500, Instagram: 2000, LinkedIn: 800 },
  ],
  audienceDemographics: [
    { name: '18-24', value: 20 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 25 },
    { name: '45-54', value: 15 },
    { name: '55+', value: 5 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const styles = {
  container: "px-6 py-8 max-w-7xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all rounded-lg shadow-md space-y-8",
  header: "flex justify-between items-center mb-6",
  button: "px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all",
  input: "w-full sm:w-64 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",
  tabs: "flex flex-wrap gap-4 mb-8",
  tabButton: (active) => `
    px-5 py-2 rounded-full transition-all shadow-sm ${
      active ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
    }
  `,
  card: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all space-y-6",
  select: "w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",
  textarea: "w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",
  publishButton: "w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  sectionHeading: "text-2xl font-semibold mb-6",
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [postContent, setPostContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const filteredPosts = useMemo(() => {
    return mockData.recentPosts.filter((post) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handlePost = useCallback(() => {
    console.log(`Posting to ${selectedPlatform}: ${postContent}`);
    setPostContent('');
    setSelectedPlatform('');
  }, [postContent, selectedPlatform]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab data={mockData.followers} />;
      case 'engagement':
        return <EngagementTab data={mockData.engagement} />;
      case 'posts':
        return <RecentPostsTab posts={filteredPosts} />;
      case 'trends':
        return <TrendsTab data={mockData.growthTrend} />;
      case 'demographics':
        return <DemographicsTab data={mockData.audienceDemographics} />;
      case 'publish':
        return (
          <PublishTab
            postContent={postContent}
            setPostContent={setPostContent}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            handlePost={handlePost}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={toggleTheme} className={styles.button}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <input
          type="text"
          className={styles.input}
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.tabs}>
        {['overview', 'engagement', 'posts', 'trends', 'demographics', 'publish'].map((tab) => (
          <button
            key={tab}
            className={styles.tabButton(activeTab === tab)}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.card}>
        {renderTabContent()}
      </div>
    </div>
  );
};

const OverviewTab = ({ data }) => (
  <div className="space-y-6">
    <h3 className={styles.sectionHeading}>Followers Overview</h3>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const EngagementTab = ({ data }) => (
  <div className="space-y-6">
    <h3 className={styles.sectionHeading}>Engagement Metrics</h3>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="likes" fill="#8884d8" />
        <Bar dataKey="shares" fill="#82ca9d" />
        <Bar dataKey="comments" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const RecentPostsTab = ({ posts }) => (
  <div className="space-y-6">
    <h3 className={styles.sectionHeading}>Recent Posts</h3>
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-bold">{post.platform}</h4>
          <p className="mb-3 text-gray-700 dark:text-gray-300">{post.content}</p>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex space-x-4">
            <span>❤️ {post.likes}</span>
            <span>🔁 {post.shares}</span>
            <span>💬 {post.comments}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TrendsTab = ({ data }) => (
  <div className="space-y-6">
    <h3 className={styles.sectionHeading}>Follower Growth Trends</h3>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Twitter" stroke="#1DA1F2" />
        <Line type="monotone" dataKey="Facebook" stroke="#4267B2" />
        <Line type="monotone" dataKey="Instagram" stroke="#E1306C" />
        <Line type="monotone" dataKey="LinkedIn" stroke="#0077B5" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const DemographicsTab = ({ data }) => (
  <div className="space-y-6">
    <h3 className={styles.sectionHeading}>Audience Demographics</h3>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const PublishTab = ({ postContent, setPostContent, selectedPlatform, setSelectedPlatform, handlePost }) => (
  <div className="space-y-6">
    <h3 className={styles.sectionHeading}>Publish New Post</h3>
    <select
      className={styles.select}
      value={selectedPlatform}
      onChange={(e) => setSelectedPlatform(e.target.value)}
    >
      <option value="">Select platform</option>
      <option value="Twitter">Twitter</option>
      <option value="Facebook">Facebook</option>
      <option value="Instagram">Instagram</option>
      <option value="LinkedIn">LinkedIn</option>
    </select>
    <textarea
      className={styles.textarea}
      placeholder="What's on your mind?"
      rows="4"
      value={postContent}
      onChange={(e) => setPostContent(e.target.value)}
    />
    <button
      className={styles.publishButton}
      onClick={handlePost}
      disabled={!selectedPlatform || !postContent}
    >
      Post
    </button>
  </div>
);

export default Dashboard;
