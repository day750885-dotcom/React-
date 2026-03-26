import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import Accounts from './pages/Accounts';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/settings" element={<div className="p-8 text-center text-gray-500">Settings page coming soon...</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}
