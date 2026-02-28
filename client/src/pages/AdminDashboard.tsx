/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage, FaUpload, FaComments, FaGripVertical, FaSort } from 'react-icons/fa';

// ---- DRAG & DROP TYPES ----
interface DragState {
    dragIndex: number | null;
    overIndex: number | null;
}

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
    const [sortBy, setSortBy] = useState<string>('manual');
    const [isSaving, setIsSaving] = useState(false);

    // Drag & drop state
    const [drag, setDrag] = useState<DragState>({ dragIndex: null, overIndex: null });
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const parseDate = (dateStr: string) => {
        if (!dateStr) return 0;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const [month, year] = dateStr.split(' ');
        const monthIdx = months.indexOf(month);
        return new Date(parseInt(year), monthIdx || 0).getTime();
    };

    const getSortOptions = () => {
        const base = [{ value: 'manual', label: 'Urutan Manual (Drag & Drop)' }];
        if (activeTab === 'CERTIFICATES') {
            return [
                ...base,
                { value: 'date-newest', label: 'Tanggal Terbit (Terbaru)' },
                { value: 'date-oldest', label: 'Tanggal Terbit (Terlama)' },
                { value: 'title-az', label: 'Judul (A–Z)' },
                { value: 'title-za', label: 'Judul (Z–A)' },
            ];
        }
        if (activeTab === 'PROJECTS') {
            return [
                ...base,
                { value: 'title-az', label: 'Judul (A–Z)' },
                { value: 'title-za', label: 'Judul (Z–A)' },
                { value: 'date-newest', label: 'Tanggal Dibuat (Terbaru)' },
                { value: 'date-oldest', label: 'Tanggal Dibuat (Terlama)' },
            ];
        }
        if (activeTab === 'EXPERIENCE') {
            return [
                ...base,
                { value: 'title-az', label: 'Role (A–Z)' },
                { value: 'title-za', label: 'Role (Z–A)' },
            ];
        }
        if (activeTab === 'CATEGORIES') {
            return [
                ...base,
                { value: 'title-az', label: 'Nama (A–Z)' },
                { value: 'title-za', label: 'Nama (Z–A)' },
            ];
        }
        return base;
    };

    const applySortToData = (data: any[], tab: string, sort: string) => {
        const sorted = [...data];
        if (sort === 'manual') {
            sorted.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        } else if (sort === 'date-newest') {
            if (tab === 'CERTIFICATES') {
                sorted.sort((a, b) => parseDate(b.issueDate) - parseDate(a.issueDate));
            } else {
                sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
        } else if (sort === 'date-oldest') {
            if (tab === 'CERTIFICATES') {
                sorted.sort((a, b) => parseDate(a.issueDate) - parseDate(b.issueDate));
            } else {
                sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            }
        } else if (sort === 'title-az') {
            sorted.sort((a, b) => {
                const aKey = a.title || a.role || a.name || '';
                const bKey = b.title || b.role || b.name || '';
                return aKey.localeCompare(bKey);
            });
        } else if (sort === 'title-za') {
            sorted.sort((a, b) => {
                const aKey = a.title || a.role || a.name || '';
                const bKey = b.title || b.role || b.name || '';
                return bKey.localeCompare(aKey);
            });
        }
        return sorted;
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const typesResponse = await api.getProjectTypes();
            setProjectTypes(typesResponse.data);

            let response;
            if (activeTab === 'PROJECTS') response = await api.getProjects();
            else if (activeTab === 'EXPERIENCE') response = await api.getExperience();
            else if (activeTab === 'CERTIFICATES') response = await api.getCertificates();
            else if (activeTab === 'CATEGORIES') response = { data: typesResponse.data };

            const responseData = response?.data;
            let data: any[] = [];
            if (Array.isArray(responseData)) {
                data = responseData;
            } else if (responseData?.data && Array.isArray(responseData.data)) {
                data = responseData.data;
            }

            setItems(applySortToData(data, activeTab, sortBy));
        } catch (error) {
            console.error('Fetch error:', error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    useEffect(() => {
        setItems(prev => applySortToData(prev, activeTab, sortBy));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy]);

    // Reset sort when switching tabs
    useEffect(() => {
        setSortBy('manual');
    }, [activeTab]);

    // ---- DRAG & DROP HANDLERS ----
    const handleDragStart = (index: number) => {
        dragItem.current = index;
        setDrag({ dragIndex: index, overIndex: index });
    };

    const handleDragEnter = (index: number) => {
        dragOverItem.current = index;
        setDrag(prev => ({ ...prev, overIndex: index }));
    };

    const handleDragEnd = async () => {
        const from = dragItem.current;
        const to = dragOverItem.current;

        if (from === null || to === null || from === to) {
            setDrag({ dragIndex: null, overIndex: null });
            dragItem.current = null;
            dragOverItem.current = null;
            return;
        }

        const newItems = [...items];
        const [moved] = newItems.splice(from, 1);
        newItems.splice(to, 0, moved);

        // Assign new displayOrder values
        const orders = newItems.map((item, idx) => ({ id: item._id, displayOrder: idx }));
        setItems(newItems);
        setDrag({ dragIndex: null, overIndex: null });
        dragItem.current = null;
        dragOverItem.current = null;

        // Persist only if already in manual mode
        if (sortBy === 'manual') {
            try {
                setIsSaving(true);
                if (activeTab === 'PROJECTS') await api.reorderProjects(orders);
                else if (activeTab === 'EXPERIENCE') await api.reorderExperience(orders);
                else if (activeTab === 'CERTIFICATES') await api.reorderCertificates(orders);
                else if (activeTab === 'CATEGORIES') await api.reorderProjectTypes(orders);
            } catch (error) {
                console.error('Reorder error:', error);
                fetchData();
            } finally {
                setIsSaving(false);
            }
        }
    };

    const saveCurrentOrderAsManual = async () => {
        if (!window.confirm('Simpan urutan tampilan saat ini sebagai urutan manual?')) return;
        try {
            setIsSaving(true);
            const orders = items.map((item, idx) => ({ id: item._id, displayOrder: idx }));
            if (activeTab === 'PROJECTS') await api.reorderProjects(orders);
            else if (activeTab === 'EXPERIENCE') await api.reorderExperience(orders);
            else if (activeTab === 'CERTIFICATES') await api.reorderCertificates(orders);
            else if (activeTab === 'CATEGORIES') await api.reorderProjectTypes(orders);
            setSortBy('manual');
            fetchData();
        } catch (error) {
            console.error('Save order error:', error);
            alert('Gagal menyimpan urutan');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Yakin ingin menghapus item ini?')) return;
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
                else if (activeTab === 'CATEGORIES') await api.updateProjectType(editingId, formData);
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
                        <p className="text-sm text-gray-400 mb-4">Kaitkan minimal 1 keahlian ke lisensi atau sertifikasi ini.</p>

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
                        <label className={labelClass}><FaImage className="inline mr-2" />Media (Sertifikat)</label>
                        <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center hover:border-[#02ffff] transition-colors">
                            {formData.image ? (
                                <div className="space-y-3">
                                    <img src={formData.image} alt="Preview" className="mx-auto h-40 object-cover rounded-lg" />
                                    <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="text-red-400 hover:text-red-300 text-sm">Remove Media</button>
                                </div>
                            ) : (
                                <label className="cursor-pointer block">
                                    <FaUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                                    <span className="text-gray-400">Click to upload certificate image</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'image')} disabled={uploading} />
                                    {uploading && <p className="text-[#02ffff] mt-2">Uploading...</p>}
                                </label>
                            )}
                        </div>
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

    const getItemLabel = (item: any) => item.heading || item.title || item.role || item.name || '';
    const getItemSub = (item: any) => item.desc || item.description || item.label || item.company || item.issuer || '';

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
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
                {/* Tab + Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="flex gap-2 bg-gray-900 p-2 rounded-lg w-fit border border-gray-800 overflow-x-auto">
                        {(['PROJECTS', 'EXPERIENCE', 'CERTIFICATES', 'CATEGORIES'] as const).map((tab) => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-[#02ffff] text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
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

                {/* Sort & Order Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-gray-900/60 p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-3 flex-wrap">
                        <FaSort className="text-[#02ffff]" />
                        <span className="text-gray-300 font-medium text-sm">Urutkan:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-[#02ffff] outline-none transition-colors cursor-pointer text-sm"
                        >
                            {getSortOptions().map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        {isSaving && (
                            <span className="text-[#02ffff] text-sm animate-pulse flex items-center gap-1">
                                <div className="w-3 h-3 border-b border-[#02ffff] rounded-full animate-spin" />
                                Menyimpan urutan...
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {sortBy !== 'manual' && (
                            <button
                                onClick={saveCurrentOrderAsManual}
                                disabled={isSaving}
                                className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-600/50 px-4 py-2 rounded-lg transition-all text-sm font-semibold disabled:opacity-50"
                            >
                                💾 Simpan sebagai Urutan Manual
                            </button>
                        )}
                        <p className="text-xs text-gray-500 italic max-w-xs">
                            {sortBy === 'manual'
                                ? '🎯 Drag & drop item untuk mengatur urutan tampilan.'
                                : '⚠️ Urutan ini sementara. Klik "Simpan" untuk menjadikannya urutan tetap.'}
                        </p>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02ffff] mx-auto"></div>
                        <p className="text-gray-400 mt-4">Loading...</p>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {items.length === 0 ? (
                            <div className="text-center py-20 bg-gray-900 rounded-lg border border-gray-800">
                                <p className="text-gray-400 text-lg">Belum ada item. Klik "Add New" untuk membuat baru!</p>
                            </div>
                        ) : (
                            items.map((item, index) => {
                                const isDragging = drag.dragIndex === index;
                                const isOver = drag.overIndex === index && drag.dragIndex !== index;

                                return (
                                    <div
                                        key={item._id}
                                        draggable={sortBy === 'manual'}
                                        onDragStart={() => handleDragStart(index)}
                                        onDragEnter={() => handleDragEnter(index)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={`
                                            group bg-gray-900 border rounded-lg p-5 transition-all duration-200 select-none
                                            ${isDragging ? 'opacity-40 scale-[0.98] border-[#02ffff]/50 shadow-lg shadow-[#02ffff]/10' : ''}
                                            ${isOver ? 'border-[#02ffff] bg-[#02ffff]/5 shadow-md shadow-[#02ffff]/20 translate-y-1' : 'border-gray-800 hover:border-gray-600'}
                                            ${sortBy === 'manual' ? 'cursor-grab active:cursor-grabbing' : ''}
                                        `}
                                    >
                                        <div className="flex justify-between items-center gap-4">
                                            {/* Drag handle + info */}
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                {sortBy === 'manual' && (
                                                    <div className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors">
                                                        <FaGripVertical size={18} />
                                                    </div>
                                                )}
                                                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-gray-400 font-mono">
                                                    {index + 1}
                                                </div>
                                                {item.image && (
                                                    <img src={item.image} alt="" className="flex-shrink-0 h-12 w-16 object-cover rounded-md" />
                                                )}
                                                {item.logo && !item.image && (
                                                    <img src={item.logo} alt="" className="flex-shrink-0 h-10 w-10 object-contain rounded bg-white p-1" />
                                                )}
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold text-white truncate">{getItemLabel(item)}</h3>
                                                    <p className="text-gray-400 text-sm line-clamp-1">{getItemSub(item)}</p>
                                                    {item.type && <span className="inline-block mt-1 text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{item.type}</span>}
                                                    {item.period && <span className="inline-block mt-1 text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full ml-1">{item.period}</span>}
                                                    {item.issueDate && <span className="inline-block mt-1 text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full ml-1">📅 {item.issueDate}</span>}
                                                </div>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button
                                                    onClick={() => openModal(item)}
                                                    className="p-2.5 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
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
