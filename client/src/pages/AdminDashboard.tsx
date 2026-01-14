/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage, FaUpload } from 'react-icons/fa';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'EXPERTISE' | 'PROJECTS' | 'EXPERIENCE'>('EXPERTISE');
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            let response;
            if (activeTab === 'EXPERTISE') response = await api.getExpertise();
            else if (activeTab === 'PROJECTS') response = await api.getProjects();
            else if (activeTab === 'EXPERIENCE') response = await api.getExperience();
            setItems(response?.data || []);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            if (activeTab === 'EXPERTISE') await api.deleteExpertise(id);
            else if (activeTab === 'PROJECTS') await api.deleteProject(id);
            else if (activeTab === 'EXPERIENCE') await api.deleteExperience(id);
            fetchData();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                if (activeTab === 'EXPERTISE') await api.updateExpertise(editingId, formData);
                else if (activeTab === 'PROJECTS') await api.updateProject(editingId, formData);
                else if (activeTab === 'EXPERIENCE') await api.updateExperience(editingId, formData);
            } else {
                if (activeTab === 'EXPERTISE') await api.createExpertise(formData);
                else if (activeTab === 'PROJECTS') await api.createProject(formData);
                else if (activeTab === 'EXPERIENCE') await api.createExperience(formData);
            }
            setIsModalOpen(false);
            setFormData({});
            setEditingId(null);
            fetchData();
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const openModal = (item?: any) => {
        if (item) {
            setFormData(item);
            setEditingId(item._id);
        } else {
            setFormData({});
            setEditingId(null);
        }
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploading(true);
            try {
                const response = await api.uploadImage(file);
                setFormData({ ...formData, [field]: response.data.filePath });
            } catch (error) {
                console.error('Upload error:', error);
                alert('Failed to upload image');
            } finally {
                setUploading(false);
            }
        }
    };

    const renderFormFields = () => {
        const inputClass = "w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-800 focus:border-[#02ffff] focus:outline-none transition-colors";
        const labelClass = "block text-sm font-medium mb-2 text-gray-300";

        if (activeTab === 'EXPERTISE') {
            return (
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Icon Name</label>
                        <input className={inputClass} placeholder="e.g., REACT, NODE" value={formData.icon || ''} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Heading</label>
                            <input className={inputClass} placeholder="Frontend" value={formData.heading || ''} onChange={e => setFormData({ ...formData, heading: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Heading Content</label>
                            <input className={inputClass} placeholder="Development" value={formData.headingContemt || ''} onChange={e => setFormData({ ...formData, headingContemt: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea className={inputClass} placeholder="Describe your expertise..." rows={4} value={formData.desc || ''} onChange={e => setFormData({ ...formData, desc: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Display Order</label>
                        <input type="number" className={inputClass} placeholder="0" value={formData.displayOrder || 0} onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })} />
                    </div>
                </div>
            );
        }

        if (activeTab === 'PROJECTS') {
            return (
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Project Title</label>
                        <input className={inputClass} placeholder="E-Commerce Platform" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Category</label>
                            <input className={inputClass} placeholder="Full-Stack Development" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Type</label>
                            <select className={inputClass} value={formData.type || 'FULLSTACK'} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option value="FULLSTACK">Full-Stack</option>
                                <option value="AI">AI/ML</option>
                                <option value="MOBILE">Mobile</option>
                                <option value="BLOCKCHAIN">Blockchain</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}><FaImage className="inline mr-2" />Project Image</label>
                        <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center hover:border-[#02ffff] transition-colors">
                            {formData.image ? (
                                <div className="space-y-3">
                                    <img src={formData.image} alt="Preview" className="mx-auto h-40 object-cover rounded-lg" />
                                    <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="text-red-400 hover:text-red-300 text-sm">Remove Image</button>
                                </div>
                            ) : (
                                <label className="cursor-pointer block">
                                    <FaUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                                    <span className="text-gray-400">Click to upload or drag and drop</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'image')} disabled={uploading} />
                                    {uploading && <p className="text-[#02ffff] mt-2">Uploading...</p>}
                                </label>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Slug (optional)</label>
                        <input className={inputClass} placeholder="ecommerce-platform" value={formData.slug || ''} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                    </div>
                </div>
            );
        }

        if (activeTab === 'EXPERIENCE') {
            return (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Role</label>
                            <input className={inputClass} placeholder="Software Engineer" value={formData.role || ''} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Company</label>
                            <input className={inputClass} placeholder="Tech Company Inc." value={formData.company || ''} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Period</label>
                            <input className={inputClass} placeholder="2023 - Present" value={formData.period || ''} onChange={e => setFormData({ ...formData, period: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Location</label>
                            <input className={inputClass} placeholder="Jakarta, Indonesia" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea className={inputClass} placeholder="Describe your role..." rows={4} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Background Color</label>
                        <div className="flex gap-2">
                            <input type="color" value={formData.backgroundColor || '#1d4ed8'} onChange={e => setFormData({ ...formData, backgroundColor: e.target.value })} className="h-12 w-20 rounded cursor-pointer" />
                            <input className={inputClass} placeholder="#1d4ed8" value={formData.backgroundColor || ''} onChange={e => setFormData({ ...formData, backgroundColor: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}><FaImage className="inline mr-2" />Company Logo</label>
                        <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center hover:border-[#02ffff] transition-colors">
                            {formData.logo ? (
                                <div className="space-y-3">
                                    <img src={formData.logo} alt="Logo" className="mx-auto h-20 object-contain rounded bg-white p-2" />
                                    <button type="button" onClick={() => setFormData({ ...formData, logo: '' })} className="text-red-400 hover:text-red-300 text-sm">Remove Logo</button>
                                </div>
                            ) : (
                                <label className="cursor-pointer block">
                                    <FaUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                                    <span className="text-gray-400">Click to upload logo</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'logo')} disabled={uploading} />
                                    {uploading && <p className="text-[#02ffff] mt-2">Uploading...</p>}
                                </label>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Skills (comma separated)</label>
                        <input className={inputClass} placeholder="React, Node.js, MongoDB" value={formData.skills?.join(',') || ''} onChange={e => setFormData({ ...formData, skills: e.target.value.split(',').map((s: string) => s.trim()) })} />
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="bg-black border-b border-gray-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Portfolio Admin</h1>
                            <p className="text-gray-400 mt-1">Manage your portfolio content</p>
                        </div>
                        <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#02ffff] hover:bg-[#02ffff]/90 text-black px-6 py-3 rounded-lg font-medium transition-colors shadow-lg">
                            <FaPlus /> Add New
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-2 mb-8 bg-gray-900 p-2 rounded-lg w-fit border border-gray-800">
                    {['EXPERTISE', 'PROJECTS', 'EXPERIENCE'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-[#02ffff] text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02ffff] mx-auto"></div>
                        <p className="text-gray-400 mt-4">Loading...</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {items.length === 0 ? (
                            <div className="text-center py-20 bg-gray-900 rounded-lg border border-gray-800">
                                <p className="text-gray-400 text-lg">No items yet. Click "Add New" to create one!</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item._id} className="bg-gray-900 border border-gray-800 p-6 rounded-lg hover:border-[#02ffff] transition-all">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-xl text-white mb-2">{item.heading || item.title || item.role}</h3>
                                            <p className="text-gray-400 line-clamp-2">{item.desc || item.description || item.category}</p>
                                            {item.image && <img src={item.image} alt="" className="mt-3 h-20 object-cover rounded" />}
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button onClick={() => openModal(item)} className="p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"><FaEdit /></button>
                                            <button onClick={() => handleDelete(item._id)} className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"><FaTrash /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-gray-900 rounded-xl w-full max-w-2xl my-8 border border-gray-800 shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-gray-800">
                            <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><FaTimes size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            {renderFormFields()}
                            <div className="flex gap-3 mt-6">
                                <button type="submit" disabled={uploading} className="flex-1 bg-[#02ffff] hover:bg-[#02ffff]/90 disabled:bg-gray-600 text-black py-3 rounded-lg font-medium transition-colors">
                                    {uploading ? 'Uploading...' : 'Save Changes'}
                                </button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
