import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/', async (req, res) => {
  const { productTitle, name, email, phone, message } = req.body;
  if (!productTitle || !name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Product Inquiry: ${productTitle}`,
      text: `
        Product: ${productTitle}
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Message: ${message}
      `,
    });
    res.json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send inquiry' });
  }
});

export default router;