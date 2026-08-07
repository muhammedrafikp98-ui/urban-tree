import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ 
      success: false, 
      error: 'RESEND_API_KEY is not configured in environment variables.' 
    });
  }

  try {
    const { 
      to = 'contact.urbanpots@gmail.com', 
      from = 'Urban Tree Website <onboarding@resend.dev>',
      replyTo,
      subject = 'New Website Submission', 
      text, 
      html 
    } = req.body || {};

    if (!text && !html) {
      return res.status(400).json({ success: false, error: 'Email content (text or html) is required.' });
    }

    const emailOptions = {
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      text: text || '',
      ...(html && { html }),
      ...(replyTo && { reply_to: replyTo })
    };

    const data = await resend.emails.send(emailOptions);

    if (data.error) {
      return res.status(400).json({ success: false, error: data.error.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend API Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
}
