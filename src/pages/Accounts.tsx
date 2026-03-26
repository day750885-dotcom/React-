import React, { useState } from 'react';
import { 
  Youtube, 
  Facebook, 
  Twitter, 
  CheckCircle2, 
  Plus, 
  ExternalLink,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';

const Accounts = () => {
  const [accounts, setAccounts] = useState([
    { id: 'youtube', platform: 'YouTube', icon: Youtube, color: 'text-red-500', connected: true, username: 'ZynkTech Official', followers: '12.4k' },
    { id: 'facebook', platform: 'Facebook', icon: Facebook, color: 'text-blue-500', connected: true, username: 'ZynkPost App', followers: '5.2k' },
    { id: 'x', platform: 'X (Twitter)', icon: Twitter, color: 'text-sky-400', connected: false },
  ]);

  const handleConnect = (id: string) => {
    // Simulate connection
    setAccounts(prev => prev.map(acc => 
      acc.id === id ? { ...acc, connected: true, username: 'New Account', followers: '0' } : acc
    ));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Social Accounts</h1>
        <p className="text-gray-400 mt-1">Manage your connected social media profiles and their permissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <motion.div 
            key={acc.id}
            whileHover={{ y: -5 }}
            className="bg-card rounded-2xl border border-border p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-background rounded-2xl border border-border">
                  <acc.icon className={`w-8 h-8 ${acc.color}`} />
                </div>
                {acc.connected ? (
                  <div className="flex items-center gap-1.5 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    Connected
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-gray-500 bg-gray-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-3 h-3" />
                    Disconnected
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold">{acc.platform}</h3>
              {acc.connected ? (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-400 text-sm">Connected as <span className="text-white font-semibold">{acc.username}</span></p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Followers</p>
                      <p className="text-lg font-bold">{acc.followers}</p>
                    </div>
                    <div className="w-px h-8 bg-border"></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Status</p>
                      <p className="text-lg font-bold text-green-400">Active</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-gray-500 text-sm">Connect your {acc.platform} account to start cross-posting content automatically.</p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-border flex gap-3">
              {acc.connected ? (
                <>
                  <button className="flex-1 py-2 rounded-xl bg-background border border-border text-sm font-medium hover:bg-card-hover transition-colors flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Sync
                  </button>
                  <button className="p-2 rounded-xl bg-background border border-border text-gray-400 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => handleConnect(acc.id)}
                  className="w-full py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-orange-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Connect Account
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Need more platforms?</h2>
          <p className="text-gray-400 mt-1">We're constantly adding new integrations. Suggest a platform you'd like to see.</p>
        </div>
        <button className="px-8 py-3 rounded-xl bg-white text-background font-bold hover:bg-gray-200 transition-colors">
          Request Integration
        </button>
      </div>
    </div>
  );
};

export default Accounts;
