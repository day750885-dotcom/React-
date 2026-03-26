import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Users, 
  FileText,
  Youtube,
  Facebook,
  Twitter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';

const data = [
  { name: 'Mon', posts: 4 },
  { name: 'Tue', posts: 7 },
  { name: 'Wed', posts: 5 },
  { name: 'Thu', posts: 12 },
  { name: 'Fri', posts: 8 },
  { name: 'Sat', posts: 15 },
  { name: 'Sun', posts: 10 },
];

const StatCard = ({ label, value, icon: Icon, trend, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-card p-6 rounded-2xl border border-border shadow-xl"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{label}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </motion.div>
);

const RecentPost = ({ post }: any) => {
  const StatusIcon = post.status === 'success' ? CheckCircle2 : post.status === 'failed' ? AlertCircle : Clock;
  const statusColor = post.status === 'success' ? 'text-green-400' : post.status === 'failed' ? 'text-red-400' : 'text-yellow-400';

  return (
    <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50 hover:border-primary/30 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-card overflow-hidden border border-border">
          <img src={post.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
        </div>
        <div>
          <p className="text-sm font-semibold truncate max-w-[150px] md:max-w-[300px]">{post.caption}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex -space-x-2">
              {post.platforms.map((p: string) => (
                <div key={p} className="w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center p-1">
                  {p === 'youtube' && <Youtube className="w-full h-full text-red-500" />}
                  {p === 'facebook' && <Facebook className="w-full h-full text-blue-500" />}
                  {p === 'x' && <Twitter className="w-full h-full text-sky-400" />}
                </div>
              ))}
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold ml-2">{post.date}</span>
          </div>
        </div>
      </div>
      <div className={`flex items-center gap-1.5 ${statusColor} text-xs font-bold uppercase tracking-widest`}>
        <StatusIcon className="w-4 h-4" />
        <span className="hidden sm:inline">{post.status}</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const stats = [
    { label: 'Total Posts', value: '1,284', icon: FileText, trend: 12, color: 'bg-primary' },
    { label: 'Successful', value: '1,240', icon: CheckCircle2, trend: 8, color: 'bg-green-500' },
    { label: 'Failed', value: '44', icon: AlertCircle, trend: -2, color: 'bg-red-500' },
    { label: 'Accounts', value: '6', icon: Users, trend: 0, color: 'bg-blue-500' },
  ];

  const recentPosts = [
    { id: '1', caption: 'New product launch video! Check it out.', thumbnail: 'https://picsum.photos/seed/tech/200/200', platforms: ['youtube', 'facebook', 'x'], status: 'success', date: '2 hours ago' },
    { id: '2', caption: 'Behind the scenes of our creative process.', thumbnail: 'https://picsum.photos/seed/creative/200/200', platforms: ['facebook', 'x'], status: 'pending', date: '5 hours ago' },
    { id: '3', caption: 'Weekly update: What we achieved this week.', thumbnail: 'https://picsum.photos/seed/update/200/200', platforms: ['youtube'], status: 'failed', date: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, Ibra! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Posting Activity</h2>
            <select className="bg-background border border-border rounded-lg px-3 py-1 text-xs focus:outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6600" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF6600" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3A506B" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#6FFFE9" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6FFFE9" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C2541', border: '1px solid #3A506B', borderRadius: '8px' }}
                  itemStyle={{ color: '#FF6600' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="posts" 
                  stroke="#FF6600" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPosts)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-xl">
          <h2 className="text-xl font-bold mb-6">Recent Posts</h2>
          <div className="space-y-4">
            {recentPosts.map(post => (
              <RecentPost key={post.id} post={post} />
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-card-hover transition-colors">
            View All Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
