import { useState, useEffect } from 'react';
import Animate from '../utils/animations/Animate';

interface Comment {
    _id: string;
    name: string;
    message: string;
    profilePhoto?: string;
    isPinned: boolean;
    createdAt: string;
}

function AdminComments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch('/api/comments');
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

    const handleTogglePin = async (id: string) => {
        setActionLoading(id);
        try {
            const response = await fetch(`/api/comments/${id}/pin`, {
                method: 'PATCH',
            });

            const data = await response.json();
            if (data.success) {
                fetchComments(); // Refresh list
            }
        } catch (error) {
            console.error('Error toggling pin:', error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        setActionLoading(id);
        try {
            const response = await fetch(`/api/comments/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (data.success) {
                fetchComments(); // Refresh list
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        } finally {
            setActionLoading(null);
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
        <div className="min-h-screen bg-background p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <Animate delay={200} type="slideUp">
                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                            📌 Manage Comments
                        </h1>
                        <p className="text-foreground/70">
                            Pin important comments or delete spam
                        </p>
                    </div>
                </Animate>

                <Animate delay={400} type="slideUp">
                    <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 backdrop-blur-sm">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                    {comments.length}
                                </div>
                                <div className="text-sm text-foreground/70">Total Comments</div>
                            </div>
                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <div className="text-2xl font-bold text-blue-400">
                                    {comments.filter(c => c.isPinned).length}
                                </div>
                                <div className="text-sm text-foreground/70">Pinned</div>
                            </div>
                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <div className="text-2xl font-bold text-green-400">
                                    {comments.filter(c => !c.isPinned).length}
                                </div>
                                <div className="text-sm text-foreground/70">Regular</div>
                            </div>
                        </div>

                        {/* Comments List */}
                        {isLoading ? (
                            <div className="text-center text-foreground/50 py-12">
                                Loading comments...
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="text-center text-foreground/50 py-12">
                                No comments yet
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <div
                                        key={comment._id}
                                        className={`p-4 lg:p-6 rounded-lg transition-all ${comment.isPinned
                                            ? 'bg-primary/10 border-2 border-primary/30'
                                            : 'bg-foreground/5 border border-foreground/10'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                {comment.profilePhoto ? (
                                                    <img
                                                        src={comment.profilePhoto}
                                                        alt={comment.name}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                                                        {getInitials(comment.name)}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <div>
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="font-semibold">
                                                                {comment.name}
                                                            </span>
                                                            {comment.isPinned && (
                                                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-medium">
                                                                    📌 PINNED
                                                                </span>
                                                            )}
                                                            <span className="text-xs text-foreground/50">
                                                                {getTimeAgo(comment.createdAt)}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-foreground/80 mt-2 break-words">
                                                            {comment.message}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2 mt-4">
                                                    <button
                                                        onClick={() => handleTogglePin(comment._id)}
                                                        disabled={actionLoading === comment._id}
                                                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${comment.isPinned
                                                            ? 'bg-foreground/10 hover:bg-foreground/20 text-foreground'
                                                            : 'bg-primary/20 hover:bg-primary/30 text-primary'
                                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                        </svg>
                                                        {comment.isPinned ? 'Unpin' : 'Pin'}
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(comment._id)}
                                                        disabled={actionLoading === comment._id}
                                                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium text-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Animate>
            </div>
        </div>
    );
}

export default AdminComments;
