import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name');
    const company = formData.get('company');
    const post = formData.get('post');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const topic = formData.get('topic');
    const message = formData.get('message');
    const booking = formData.get('booking');
    const meetingDate = formData.get('meetingDate');
    const timeSlot = formData.get('timeSlot');
    const file = formData.get('file');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const meetingInfo =
      booking === 'yes'
        ? `<tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;">Встреча</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${meetingDate || '—'}, ${timeSlot || '—'}</td></tr>`
        : '';

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1a1a2e;border-bottom:2px solid #e94560;padding-bottom:10px;">Новая заявка с сайта CIS Energy</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;width:160px;">ФИО</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${name}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;">Компания</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${company || '—'}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;">Должность</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${post}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;">Email</td><td style="padding:8px 12px;border:1px solid #e0e0e0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;">Телефон</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${phone || '—'}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;">Направление</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${topic || '—'}</td></tr>
          ${meetingInfo}
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;">Сообщение</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${message || '—'}</td></tr>
        </table>
        ${file ? '<p style="margin-top:12px;color:#555;">📎 Документ прикреплён к письму</p>' : ''}
        <p style="color:#888;font-size:12px;margin-top:20px;">Отправлено с сайта cisenergy.org</p>
      </div>
    `;

    const attachments = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    await transporter.sendMail({
      from: `"CIS Energy Website" <${process.env.SMTP_USER}>`,
      to: 'ceo@cisenergy.org',
      replyTo: email,
      subject: `Заявка с сайта: ${name}`,
      html: htmlBody,
      attachments,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return Response.json(
      { success: false, error: 'Не удалось отправить заявку' },
      { status: 500 }
    );
  }
}
