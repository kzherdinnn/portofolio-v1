const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Check if email credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️ Email credentials not found in .env. Email sending skipped.');
        console.log('To enable email: Add EMAIL_USER and EMAIL_PASS to backend .env file');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Standard Gmail settings
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
        to: options.to,
        replyTo: options.replyTo, // Allow replying to the sender
        subject: options.subject,
        text: options.text,
        html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
