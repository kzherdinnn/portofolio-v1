/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage, FaUpload, FaComments, FaLink } from 'react-icons/fa';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'PROJECTS' | 'EXPERIENCE' | 'CERTIFICATES' | 'CATEGORIES'>('PROJECTS');
    const [items, setItems] = useState<any[]>([]);
    const [projectTypes, setProjectTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [showSkillInput, setShowSkillInput] = useState(false);
    const [isMediaMenuOpen, setIsMediaMenuOpen] = useState(false);
    const [mediaInputType, setMediaInputType] = useState<'LINK' | 'UPLOAD' | 'NONE'>('NONE');

    const fetchData = async () => {
        setLoading(true);
        try {
            // Always fetch types for dropdown
            const typesResponse = await api.getProjectTypes();
            setProjectTypes(typesResponse.data);

            let response;
            if (activeTab === 'PROJECTS') response = await api.getProjects();
            else if (activeTab === 'EXPERIENCE') response = await api.getExperience();
            else if (activeTab === 'CERTIFICATES') response = await api.getCertificates();
            else if (activeTab === 'CATEGORIES') response = { data: typesResponse.data };

            const responseData = response?.data;
            if (Array.isArray(responseData)) {
                setItems(responseData);
            } else if (responseData?.data && Array.isArray(responseData.data)) {
                setItems(responseData.data);
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setItems([]);
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
            if (activeTab === 'PROJECTS') await api.deleteProject(id);
            else if (activeTab === 'EXPERIENCE') await api.deleteExperience(id);
            else if (activeTab === 'CERTIFICATES') await api.deleteCertificate(id);
            else if (activeTab === 'CATEGORIES') await api.deleteProjectType(id);
            fetchData();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                if (activeTab === 'PROJECTS') await api.updateProject(editingId, formData);
                else if (activeTab === 'EXPERIENCE') await api.updateExperience(editingId, formData);
                else if (activeTab === 'CERTIFICATES') await api.updateCertificate(editingId, formData);
                // Note: Categories usually don't need update if ID is the key, but we might want to update label
                else if (activeTab === 'CATEGORIES') await api.createProjectType(formData); // Simple overwrite/add for now or implement update
            } else {
                if (activeTab === 'PROJECTS') await api.createProject(formData);
                else if (activeTab === 'EXPERIENCE') await api.createExperience(formData);
                else if (activeTab === 'CERTIFICATES') await api.createCertificate(formData);
                else if (activeTab === 'CATEGORIES') await api.createProjectType(formData);
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
        setIsMediaMenuOpen(false);
        setMediaInputType('NONE');
        setShowSkillInput(false);
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

    const handleFetchMetadata = async (url: string) => {
        if (!url) {
            alert('Please enter a URL first');
            return;
        }

        setUploading(true);
        try {
            const response = await api.fetchMetadata(url);
            if (response.data.success && response.data.image) {
                setFormData({ ...formData, image: response.data.image });
                alert('Media fetched successfully!');
            } else {
                alert('Could not auto-fetch image. Please upload manually.');
            }
        } catch (error) {
            console.error('Fetch metadata error:', error);
            alert('Failed to fetch media from URL');
        } finally {
            setUploading(false);
        }
    };

    const renderFormFields = () => {
        const inputClass = "w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-800 focus:border-[#02ffff] focus:outline-none transition-colors";
        const labelClass = "block text-sm font-medium mb-2 text-gray-300";

        if (activeTab === 'CATEGORIES') {
            return (
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Unique ID (e.g., FULLSTACK, AI)</label>
                        <input className={inputClass} placeholder="FULLSTACK" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value.toUpperCase() })} />
                        <p className="text-xs text-gray-500 mt-1">Must be unique, uppercase, no spaces</p>
                    </div>
                    <div>
                        <label className={labelClass}>Display Label (e.g., Full-Stack Development)</label>
                        <input className={inputClass} placeholder="Full-Stack Development" value={formData.label || ''} onChange={e => setFormData({ ...formData, label: e.target.value })} />
                    </div>
                </div>
            );
        }

        if (activeTab === 'CERTIFICATES') {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const currentYear = new Date().getFullYear();
            const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

            const splitDate = (dateStr: string) => {
                if (!dateStr) return { month: '', year: '' };
                const parts = dateStr.split(' ');
                return { month: parts[0] || '', year: parts[1] || '' };
            };

            const issue = splitDate(formData.issueDate);
            const expiry = splitDate(formData.expirationDate);

            return (
                <div className="space-y-6 text-gray-200">
                    <p className="text-sm text-gray-400">* Wajib diisi</p>

                    <div>
                        <label className={labelClass}>Nama*</label>
                        <input className={inputClass} placeholder="Mis.: Microsoft certified network associate security" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>

                    <div>
                        <label className={labelClass}>Organisasi penerbit*</label>
                        <input className={inputClass} placeholder="Mis.: Microsoft" value={formData.issuer || ''} onChange={e => setFormData({ ...formData, issuer: e.target.value })} />
                    </div>

                    <div>
                        <label className={labelClass}>Tanggal terbit</label>
                        <div className="flex gap-4">
                            <select
                                className={`${inputClass} appearance-none cursor-pointer`}
                                value={issue.month}
                                onChange={e => setFormData({ ...formData, issueDate: `${e.target.value} ${issue.year}`.trim() })}
                            >
                                <option value="">Bulan</option>
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <select
                                className={`${inputClass} appearance-none cursor-pointer`}
                                value={issue.year}
                                onChange={e => setFormData({ ...formData, issueDate: `${issue.month} ${e.target.value}`.trim() })}
                            >
                                <option value="">Tahun</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Tanggal kedaluwarsa</label>
                        <div className="flex gap-4">
                            <select
                                className={`${inputClass} appearance-none cursor-pointer`}
                                value={expiry.month}
                                onChange={e => setFormData({ ...formData, expirationDate: `${e.target.value} ${expiry.year}`.trim() })}
                            >
                                <option value="">Bulan</option>
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <select
                                className={`${inputClass} appearance-none cursor-pointer`}
                                value={expiry.year}
                                onChange={e => setFormData({ ...formData, expirationDate: `${expiry.month} ${e.target.value}`.trim() })}
                            >
                                <option value="">Tahun</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>ID Kredensial</label>
                        <input className={inputClass} value={formData.credentialId || ''} onChange={e => setFormData({ ...formData, credentialId: e.target.value })} />
                    </div>

                    <div>
                        <label className={labelClass}>URL Kredensial</label>
                        <input className={inputClass} value={formData.credentialUrl || ''} onChange={e => setFormData({ ...formData, credentialUrl: e.target.value })} />
                    </div>

                    <div className="pt-2">
                        <h3 className="text-xl font-semibold mb-1">Keahlian</h3>
                        <p className="text-sm text-gray-400 mb-4">Kaitkan minimal 1 keahlian ke lisensi atau sertifikasi ini. Akan ditampilkan juga di bagian Keahlian.</p>

                        {(showSkillInput || (formData.skills && formData.skills.length > 0)) ? (
                            <div className="space-y-2">
                                <input
                                    className={inputClass}
                                    placeholder="Ex: Kotlin, Android Development (comma separated)"
                                    value={formData.skills?.join(', ') || ''}
                                    onChange={e => setFormData({ ...formData, skills: e.target.value.split(',').map((s: string) => s.trim()) })}
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <button type="button" onClick={() => setShowSkillInput(true)} className="flex items-center gap-2 text-blue-400 hover:bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400 transition-colors font-semibold">
                                <FaPlus /> Tambahkan keahlian
                            </button>
                        )}
                    </div>

                    <div className="pt-2">
                        <h3 className="text-xl font-semibold mb-1">Media</h3>
                        <p className="text-sm text-gray-400 mb-4">Tambahkan media seperti gambar, dokumen, website, atau presentasi. Pelajari lebih lanjut tentang jenis file media yang didukung</p>

                        {formData.image ? (
                            <div className="border border-gray-700 rounded-lg p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div className="relative group w-full aspect-video bg-black/50 rounded-lg overflow-hidden border border-gray-700">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: '' })}
                                        className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition-colors"
                                        title="Remove"
                                    >
                                        <FaTimes />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[#02ffff] text-xs p-2 text-center">
                                        Media Attached
                                    </div>
                                </div>
                            </div>
                        ) : mediaInputType === 'LINK' ? (
                            <div className="border border-gray-700 rounded-lg p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold">Tambahkan link</h4>
                                    <button onClick={() => setMediaInputType('NONE')} className="text-gray-400 hover:text-white"><FaTimes /></button>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        className={inputClass}
                                        placeholder="Paste URL (e.g. Credential URL)..."
                                        value={formData.tempUrl || ''}
                                        onChange={e => setFormData({ ...formData, tempUrl: e.target.value })}
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleFetchMetadata(formData.tempUrl)}
                                        className="bg-[#02ffff]/10 text-[#02ffff] px-6 rounded hover:bg-[#02ffff]/20 whitespace-nowrap border border-[#02ffff]/50 font-semibold"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative inline-block">
                                <button
                                    type="button"
                                    onClick={() => setIsMediaMenuOpen(!isMediaMenuOpen)}
                                    className="flex items-center gap-2 text-blue-400 hover:bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400 transition-colors font-semibold"
                                >
                                    <FaPlus /> Tambah media
                                </button>

                                {isMediaMenuOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 overflow-hidden text-black animate-in fade-in zoom-in-95 duration-200">
                                        <div
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-start gap-3 transition-colors"
                                            onClick={() => {
                                                setMediaInputType('LINK');
                                                setIsMediaMenuOpen(false);
                                                if (formData.credentialUrl) setFormData({ ...formData, tempUrl: formData.credentialUrl });
                                            }}
                                        >
                                            <FaLink className="text-gray-600 mt-1" />
                                            <div>
                                                <p className="font-semibold text-sm">Tambahkan link</p>
                                                <p className="text-xs text-gray-500">Gunakan untuk video, artikel, dan situs web</p>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200"></div>
                                        <label
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-start gap-3 transition-colors"
                                        >
                                            <FaImage className="text-gray-600 mt-1" />
                                            <div>
                                                <p className="font-semibold text-sm">Tambahkan media</p>
                                                <p className="text-xs text-gray-500">Mengunggah gambar, presentasi, atau dokumen</p>
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                                    handleImageUpload(e, 'image');
                                                    setIsMediaMenuOpen(false);
                                                }} disabled={uploading} />
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>
                        )}
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
                            <label className={labelClass}>Type</label>
                            <select
                                className={inputClass}
                                value={formData.type || ''}
                                onChange={e => {
                                    const selectedType = projectTypes.find(t => t.name === e.target.value);
                                    setFormData({
                                        ...formData,
                                        type: e.target.value,
                                        category: selectedType ? selectedType.label : ''
                                    });
                                }}
                            >
                                <option value="" disabled>Select Type</option>
                                {projectTypes.map(type => (
                                    <option key={type._id} value={type.name}>{type.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Slug (optional)</label>
                            <input className={inputClass} placeholder="ecommerce-platform" value={formData.slug || ''} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea className={inputClass} placeholder="Project description..." rows={4} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
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
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Live Demo Link</label>
                            <input className={inputClass} placeholder="https://demo.com" value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Github Link</label>
                            <input className={inputClass} placeholder="https://github.com/..." value={formData.github || ''} onChange={e => setFormData({ ...formData, github: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Technologies (comma separated)</label>
                        <input className={inputClass} placeholder="React, Node.js, Python" value={formData.technologies?.join(',') || ''} onChange={e => setFormData({ ...formData, technologies: e.target.value.split(',').map((s: string) => s.trim()) })} />
                    </div>
                    <div>
                        <label className={labelClass}>Key Features (comma separated)</label>
                        <textarea className={inputClass} placeholder="Feature 1, Feature 2, Feature 3" rows={3} value={formData.features?.join(',') || ''} onChange={e => setFormData({ ...formData, features: e.target.value.split(',').map((s: string) => s.trim()) })} />
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
                            <input className={inputClass} placeholder="Full-Stack Web Developer" value={formData.role || ''} onChange={e => setFormData({ ...formData, role: e.target.value })} />
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
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex gap-2 bg-gray-900 p-2 rounded-lg w-fit border border-gray-800 overflow-x-auto">
                        {['PROJECTS', 'EXPERIENCE', 'CERTIFICATES', 'CATEGORIES'].map((tab) => (
                            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-[#02ffff] text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/admin/comments')}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                        >
                            <FaComments /> Manage Comments
                        </button>
                        <button
                            onClick={() => openModal()}
                            className="flex items-center gap-2 bg-[#02ffff] hover:bg-[#02ffff]/90 text-black px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                        >
                            <FaPlus /> Add New
                        </button>
                    </div>
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
                                            <h3 className="font-bold text-xl text-white mb-2">{item.heading || item.title || item.role || item.name}</h3>
                                            <p className="text-gray-400 line-clamp-2">{item.desc || item.description || item.category || item.label}</p>
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
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="w-full max-w-2xl rounded-xl border border-gray-800 bg-gray-900 shadow-2xl relative">
                            <div className="flex justify-between items-center p-6 border-b border-gray-800">
                                <h2 className="text-2xl font-bold text-white">
                                    {activeTab === 'CERTIFICATES'
                                        ? 'Tambahkan lisensi atau sertifikasi'
                                        : (editingId ? 'Edit Item' : 'Add New Item')}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><FaTimes size={24} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6">
                                {renderFormFields()}
                                <div className="flex gap-3 mt-6">
                                    <button type="submit" disabled={uploading} className="flex-1 bg-[#02ffff] hover:bg-[#02ffff]/90 disabled:bg-gray-600 text-black py-3 rounded-lg font-medium transition-colors">
                                        {uploading ? 'Uploading...' : (activeTab === 'CERTIFICATES' ? 'Simpan' : 'Save Changes')}
                                    </button>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
