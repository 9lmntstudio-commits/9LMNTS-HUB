import { useState, useRef } from 'react';
import { Upload, Save, X, Image as ImageIcon, Edit2, Trash2, Plus } from 'lucide-react';

interface FeaturedWork {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  features: string[];
  external: boolean;
}

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export function AdminPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [featuredWorks, setFeaturedWorks] = useState<FeaturedWork[]>([
    {
      id: '1',
      title: 'Sound Clash OS',
      category: 'Nightlife & Entertainment',
      image: '/images/sound-clash.jpg',
      link: '/clash/index.html',
      features: ['Live Voting', 'Power Tips', 'Battle Mode', 'Real-time Chat'],
      external: true
    },
    {
      id: '2',
      title: 'The Union: Wedding OS',
      category: 'Lifestyle & Events',
      image: '/images/wedding-os.jpg',
      link: '/romeo/index.html',
      features: ['Guest Management', 'Live Streaming', 'Digital Invitations', 'Photo Gallery'],
      external: true
    },
    {
      id: '3',
      title: 'Corporate Clash',
      category: 'Business & Tech',
      image: '/images/corporate-clash.jpg',
      link: '/pitch/index.html',
      features: ['Pitch Battles', 'Investor Voting', 'Live Analytics', 'Networking Hub'],
      external: true
    }
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: '1', icon: '🎨', title: 'Brand Identity', description: 'Complete brand systems that capture your essence' },
    { id: '2', icon: '🚀', title: 'Web Experiences', description: 'Interactive websites with artistic vision' },
    { id: '3', icon: '📱', title: 'Mobile Applications', description: 'Native and progressive apps' },
    { id: '4', icon: '🎮', title: 'Event OS Platforms', description: 'Custom operating systems for events' },
    { id: '5', icon: '🤖', title: 'AI Integration', description: 'Intelligent systems and automation' },
    { id: '6', icon: '📊', title: 'Data Visualization', description: 'Interactive dashboards and analytics' }
  ]);

  const [editingWork, setEditingWork] = useState<FeaturedWork | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File, workId: string) => {
    setUploadingImage(true);
    // In a real implementation, this would upload to a server
    // For now, we'll simulate the upload and create a local URL
    const imageUrl = URL.createObjectURL(file);
    
    setFeaturedWorks(prev => prev.map(work => 
      work.id === workId ? { ...work, image: imageUrl } : work
    ));
    
    setUploadingImage(false);
  };

  const saveFeaturedWork = () => {
    if (editingWork) {
      setFeaturedWorks(prev => prev.map(work => 
        work.id === editingWork.id ? editingWork : work
      ));
      setEditingWork(null);
    }
  };

  const saveService = () => {
    if (editingService) {
      setServices(prev => prev.map(service => 
        service.id === editingService.id ? editingService : service
      ));
      setEditingService(null);
    }
  };

  const addNewWork = () => {
    const newWork: FeaturedWork = {
      id: Date.now().toString(),
      title: 'New Event OS',
      category: 'Category',
      image: '/images/placeholder.jpg',
      link: '/new-os/index.html',
      features: ['Feature 1', 'Feature 2'],
      external: true
    };
    setFeaturedWorks(prev => [...prev, newWork]);
  };

  const deleteWork = (id: string) => {
    setFeaturedWorks(prev => prev.filter(work => work.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Manage your 9LMNTS Studio content</p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors"
          >
            Back to Site
          </button>
        </div>

        {/* Featured Works Management */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-white">Featured Works</h2>
            <button
              onClick={addNewWork}
              className="px-4 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add New
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorks.map((work) => (
              <div key={work.id} className="bg-[#222222] rounded-lg p-6 border border-[#FF7A00]/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-white font-semibold">{work.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingWork(work)}
                      className="text-[#FF7A00] hover:text-[#FF7A00]/80 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteWork(work.id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="aspect-video bg-[#1A1A1A] rounded-lg mb-2 flex items-center justify-center">
                    {work.image.startsWith('blob:') ? (
                      <img src={work.image} alt={work.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="mx-auto text-gray-500 mb-2" size={32} />
                        <p className="text-gray-500 text-sm">No image uploaded</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, work.id);
                    }}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="w-full px-4 py-2 bg-[#FF7A00]/20 text-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload size={16} />
                    {uploadingImage ? 'Uploading...' : 'Upload Image'}
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">Category: <span className="text-white">{work.category}</span></p>
                  <p className="text-gray-400">Link: <span className="text-white text-xs">{work.link}</span></p>
                  <div className="text-gray-400">
                    Features:
                    <div className="flex flex-wrap gap-1 mt-1">
                      {work.features.map((feature, idx) => (
                        <span key={idx} className="bg-[#FF7A00]/20 text-[#FF7A00] px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Management */}
        <div className="mb-12">
          <h2 className="text-2xl text-white mb-6">Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-[#222222] rounded-lg p-6 border border-[#FF7A00]/20">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <h3 className="text-xl text-white font-semibold">{service.title}</h3>
                  </div>
                  <button
                    onClick={() => setEditingService(service)}
                    className="text-[#FF7A00] hover:text-[#FF7A00]/80 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modals */}
        {editingWork && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#222222] rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white">Edit Featured Work</h3>
                <button
                  onClick={() => setEditingWork(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Title</label>
                  <input
                    type="text"
                    value={editingWork.title}
                    onChange={(e) => setEditingWork({ ...editingWork, title: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Category</label>
                  <input
                    type="text"
                    value={editingWork.category}
                    onChange={(e) => setEditingWork({ ...editingWork, category: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Link</label>
                  <input
                    type="text"
                    value={editingWork.link}
                    onChange={(e) => setEditingWork({ ...editingWork, link: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Features (comma-separated)</label>
                  <input
                    type="text"
                    value={editingWork.features.join(', ')}
                    onChange={(e) => setEditingWork({ 
                      ...editingWork, 
                      features: e.target.value.split(',').map(f => f.trim()).filter(f => f) 
                    })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={saveFeaturedWork}
                    className="px-6 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingWork(null)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {editingService && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#222222] rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white">Edit Service</h3>
                <button
                  onClick={() => setEditingService(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={editingService.icon}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Title</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Description</label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={saveService}
                    className="px-6 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingService(null)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
