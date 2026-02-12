import { useState } from 'react';
import Animate from '../../utils/animations/Animate';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
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

        // Web3Forms Payload
        const payload = {
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE", // Replace with your Web3Forms Access Key
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            subject: `[Portfolio] New Message from ${formData.name}` // Optional: Internal subject for email
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Message sent successfully! (Pesan terkirim!)'
                });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: data.message || 'Failed to send message.'
                });
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setSubmitStatus({
                type: 'error',
                message: 'Connection error. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-8">
            <Animate delay={200} type="slideUp">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
                    Get In Touch
                </h2>
            </Animate>

            <Animate delay={400} type="slideUp">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="Your phone number..."
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                            placeholder="Your message here..."
                        />
                    </div>

                    {submitStatus.type && (
                        <div
                            className={`p-4 rounded-lg ${submitStatus.type === 'success'
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
                        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${isSubmitting
                            ? 'bg-foreground/20 cursor-not-allowed'
                            : 'bg-primary hover:bg-primary/90 hover:scale-105 text-black'
                            }`}
                    >
                        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                    </button>
                </form>
            </Animate>
        </div>
    );
}

export default ContactForm;
