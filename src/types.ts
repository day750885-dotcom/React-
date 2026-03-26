export interface Post {
  id: string;
  type: 'video' | 'image';
  url: string;
  caption: string;
  platforms: string[];
  status: 'success' | 'failed' | 'pending';
  createdAt: string;
}

export interface Stat {
  label: string;
  value: string | number;
  icon: string;
  trend?: number;
}

export interface Account {
  platform: string;
  connected: boolean;
  username?: string;
}
