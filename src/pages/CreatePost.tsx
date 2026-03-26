import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X as CloseIcon, 
  Youtube, 
  Facebook, 
  Twitter, 
  Image as ImageIcon, 
  Video as VideoIcon,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CreatePost = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setSuccess(false);
    }
  };

  const togglePlatform = (platform: string) => {
    setPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || platforms.length === 0) return;

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setSuccess(true);
          // Reset form after success
          setTimeout(() => {
            setFile(null);
            setPreviewUrl(null);
            setCaption('');
            setPlatforms([]);
          }, 3000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-gray-400 mt-1">Upload your media and distribute it across all your social channels.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* File Upload Area */}
          <div className="bg-card rounded-2xl border-2 border-dashed border-border p-8 text-center relative overflow-hidden group hover:border-primary/50 transition-colors">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
            />
            
            <AnimatePresence mode="wait">
              {!previewUrl ? (
                <motion.div 
                  key="upload-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-primary w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold">Click to upload</h3>
                  <p className="text-gray-500 text-sm mt-1">Supports Video (MP4, MOV) and Images (JPG, PNG)</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-xl overflow-hidden aspect-video bg-black"
                >
                  {file?.type.startsWith('video') ? (
                    <video src={previewUrl} className="w-full h-full object-contain" controls />
                  ) : (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  )}
                  <button 
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Caption</label>
            <textarea 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write something engaging..."
              className="w-full bg-card border border-border rounded-xl p-4 h-32 focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Platform Selection */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              Select Platforms
              <span className="text-xs font-normal text-gray-500">(Choose at least one)</span>
            </h3>
            
            <div className="space-y-3">
              {[
                { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-500' },
                { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-500' },
                { id: 'x', label: 'X (Twitter)', icon: Twitter, color: 'text-sky-400' },
              ].map((p) => (
                <label 
                  key={p.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    platforms.includes(p.id) 
                      ? 'bg-primary/5 border-primary' 
                      : 'bg-background border-border hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <p.icon className={`w-6 h-6 ${p.color}`} />
                    <span className="font-medium">{p.label}</span>
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={platforms.includes(p.id)}
                    onChange={() => togglePlatform(p.id)}
                  />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    platforms.includes(p.id) ? 'bg-primary border-primary' : 'border-border'
                  }`}>
                    {platforms.includes(p.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button & Progress */}
          <div className="space-y-4">
            <button 
              type="submit"
              disabled={!file || platforms.length === 0 || uploading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                !file || platforms.length === 0 || uploading
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-orange-600 shadow-primary/20 hover:-translate-y-1'
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Posted Successfully!
                </>
              ) : (
                'Publish Post'
              )}
            </button>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-wider">
                  <span>Uploading to platforms</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-card rounded-full overflow-hidden border border-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 text-sm flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Your post has been queued for distribution!
              </motion.div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
