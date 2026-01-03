import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validasi data
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // 1. Konfigurasi Transporter (Tukang Pos)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 2. Siapkan Suratnya
    const mailOptions = {
      from: `Portfolio Contact <${process.env.GMAIL_USER}>`, // Pengirim (harus email kamu)
      to: process.env.GMAIL_USER, // Penerima (kirim ke diri sendiri)
      replyTo: email, // Agar kalau kamu klik reply, langsung ke email pengirim
      subject: `[My Portfolio] Pesan Baru dari ${name}`,
      text: message, // Versi teks biasa
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb;">Pesan Baru dari Website Portfolio</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr/>
          <p><strong>Pesan:</strong></p>
          <p style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #2563eb;">${message}</p>
        </div>
      `,
    };

    // 3. Kirim Surat
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email berhasil dikirim!' });

  } catch (error) {
    console.error('Gagal kirim email:', error);
    return NextResponse.json({ error: 'Gagal mengirim email' }, { status: 500 });
  }
}