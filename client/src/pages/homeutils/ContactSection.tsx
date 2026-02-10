import { useState } from 'react';
import Animate from '../../utils/animations/Animate';
import Comments from './Comments';
import ParticleNetwork from '../../components/ParticleNetwork';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

function ContactSection() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('https://www.kzherdin.onesite.my.id/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus({
                    type: 'success',
                    message: data.message
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: data.message || 'Failed to send message'
                });
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Network error. Please make sure the backend server is running.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full px-4 py-12 relative overflow-hidden">
            {/* Background Animation */}
            <ParticleNetwork />

            {/* Content */}
            <div className="relative z-10">
                {/* Title */}
                <Animate delay={200} type="slideUp">
                    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-2">
                        Contact Me
                    </h2>
                    <p className="text-center text-foreground/70 mb-12">
                        Have something to discuss? Send me a message, and let's talk!
                    </p>
                </Animate>

                {/* Two Column Layout */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column - Comments */}
                    <Comments />

                    {/* Right Column - Contact Form */}
                    <Animate delay={400} type="slideUp">
                        <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-bold">Contact</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                                            placeholder="Your Name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                                        placeholder="What is this about?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2.5 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none text-sm"
                                        placeholder="Write your message here..."
                                    />
                                </div>

                                {submitStatus.type && (
                                    <div
                                        className={`p-4 rounded-lg text-sm ${submitStatus.type === 'success'
                                            ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                                            : 'bg-red-500/20 border border-red-500/50 text-red-400'
                                            }`}
                                    >
                                        {submitStatus.message}
                                    </div>
                                )}

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
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </Animate>
                </div>
            </div>
        </div>
    );
}

export default ContactSection;
