import { useState, useEffect } from 'react';
import { BsPinAngleFill } from 'react-icons/bs';
import Animate from '../../utils/animations/Animate';

interface Comment {
    _id: string;
    name: string;
    message: string;
    profilePhoto?: string;
    isPinned: boolean;
    createdAt: string;
}

interface CommentFormData {
    name: string;
    message: string;
    profilePhoto: File | null;
}

function Comments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [formData, setFormData] = useState<CommentFormData>({
        name: '',
        message: '',
        profilePhoto: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch comments
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch('https://www.kzherdin.onesite.my.id/api/comments');
            const data = await response.json();
            if (data.success) {
                setComments(data.data);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                profilePhoto: e.target.files[0]
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let profilePhotoUrl = null;

            // Upload profile photo if provided
            if (formData.profilePhoto) {
                const photoFormData = new FormData();
                photoFormData.append('image', formData.profilePhoto);

                const uploadResponse = await fetch('https://www.kzherdin.onesite.my.id/api/upload', {
                    method: 'POST',
                    body: photoFormData
                });

                const uploadData = await uploadResponse.json();
                if (uploadData.success) {
                    profilePhotoUrl = uploadData.filePath;
                }
            }

            // Post comment
            const response = await fetch('https://www.kzherdin.onesite.my.id/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    message: formData.message,
                    profilePhoto: profilePhotoUrl
                })
            });

            const data = await response.json();

            if (data.success) {
                setFormData({ name: '', message: '', profilePhoto: null });
                fetchComments(); // Refresh comments
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTimeAgo = (date: string) => {
        const now = new Date();
        const commentDate = new Date(date);
        const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="w-full">
            <Animate delay={200} type="slideUp">
                <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-6">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <h3 className="text-xl font-bold">
                            Komentar <span className="text-primary">({comments.length})</span>
                        </h3>
                    </div>

                    {/* Comment Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <div>
                            <label htmlFor="comment-name" className="block text-sm font-medium mb-2">
                                Nama *
                            </label>
                            <input
                                type="text"
                                id="comment-name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                                placeholder="Masukkan nama Anda"
                            />
                        </div>

                        <div>
                            <label htmlFor="comment-message" className="block text-sm font-medium mb-2">
                                Pesan *
                            </label>
                            <textarea
                                id="comment-message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none text-sm"
                                placeholder="Tulis pesan Anda di sini..."
                            />
                        </div>

                        <div>
                            <label htmlFor="comment-photo" className="block text-sm font-medium mb-2">
                                Foto Profil <span className="text-foreground/50">(opsional)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="comment-photo"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="comment-photo"
                                    className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formData.profilePhoto ? formData.profilePhoto.name : 'Pilih Foto Profil'}
                                </label>
                                <p className="text-xs text-foreground/50 mt-1">Maks ukuran file: 2MB</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${isSubmitting
                                ? 'bg-foreground/20 cursor-not-allowed'
                                : 'bg-primary hover:bg-primary/90 hover:scale-105 text-black'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            {isSubmitting ? 'Memposting...' : 'Kirim Komentar'}
                        </button>
                    </form>

                    <div className="border-t border-foreground/10 pt-6">
                        {/* Comments List */}
                        {isLoading ? (
                            <div className="text-center text-foreground/50 py-8">
                                Memuat komentar...
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="text-center text-foreground/50 py-8">
                                Belum ada komentar. Jadilah yang pertama berkomentar!
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                                {comments.map((comment) => (
                                    <div
                                        key={comment._id}
                                        className={`rounded-xl transition-all duration-300 ${comment.isPinned
                                            ? 'bg-[#1a1b26] border border-indigo-500/30 p-5 shadow-lg shadow-indigo-500/5'
                                            : 'bg-foreground/5 border border-foreground/10 p-4 hover:bg-foreground/10'
                                            }`}
                                    >
                                        {/* Pinned Header */}
                                        {comment.isPinned && (
                                            <div className="flex items-center gap-2 mb-3 text-indigo-400 pb-2 border-b border-indigo-500/20">
                                                <BsPinAngleFill className="text-sm" />
                                                <span className="text-[10px] uppercase font-bold tracking-wider">Komentar Disematkan</span>
                                            </div>
                                        )}

                                        <div className="flex gap-4">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                {comment.profilePhoto ? (
                                                    <img
                                                        src={comment.profilePhoto}
                                                        alt={comment.name}
                                                        className={`w-10 h-10 rounded-full object-cover border-2 ${comment.isPinned ? 'border-indigo-500/30' : 'border-foreground/10'}`}
                                                    />
                                                ) : (
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white/10 ${comment.isPinned ? 'bg-indigo-600 text-white' : 'bg-gradient-to-br from-gray-700 to-gray-900 text-white'}`}>
                                                        {getInitials(comment.name)}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className={`font-semibold text-sm ${comment.isPinned ? 'text-indigo-200' : 'text-foreground'}`}>
                                                            {comment.name}
                                                        </h4>
                                                        {comment.isPinned && (
                                                            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-medium border border-indigo-500/20">
                                                                Admin
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className={`text-xs ${comment.isPinned ? 'text-indigo-300/50' : 'text-foreground/50'}`}>
                                                        {getTimeAgo(comment.createdAt)}
                                                    </span>
                                                </div>
                                                <p className={`text-sm leading-relaxed break-words ${comment.isPinned ? 'text-indigo-200/80' : 'text-foreground/80'}`}>
                                                    {comment.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Animate>
        </div>
    );
}

export default Comments;
