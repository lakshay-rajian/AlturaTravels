// routes/booking.js
import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Package from "../models/Package.js";
import authMiddleware from "../middleware/auth.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Helper to dispatch email via HTTP APIs (Resend/Brevo) or Nodemailer SMTP
async function dispatchEmail({ to, subject, html }) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || "lakshayrajian@gmail.com";
  const recipientEmail = to || adminEmail;

  // 1. Brevo HTTP API (Port 443 - No recipient restrictions, 300 free emails/day)
  if (process.env.BREVO_API_KEY) {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Altura Travels Admin", email: process.env.BREVO_SENDER || adminEmail },
        to: [{ email: recipientEmail }],
        bcc: [{ email: adminEmail }],
        replyTo: { email: adminEmail },
        subject,
        htmlContent: html,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || JSON.stringify(data));
    return { provider: "Brevo HTTP API (Port 443)", messageId: data.messageId };
  }

  // 2. Resend HTTP API (Port 443 - Free tier restricted to owner's email only)
  if (process.env.RESEND_API_KEY) {
    const payload = {
      from: process.env.RESEND_FROM || "Altura Travels <onboarding@resend.dev>",
      to: [recipientEmail],
      reply_to: adminEmail,
      subject,
      html,
    };
    if (adminEmail && adminEmail.toLowerCase() !== recipientEmail.toLowerCase()) {
      payload.bcc = [adminEmail];
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      const errMsg = data.message || JSON.stringify(data);
      // If Resend free tier testing mode restriction occurs ("you can only send to your own email address")
      if (
        errMsg.toLowerCase().includes("only send to your own email") ||
        errMsg.toLowerCase().includes("testing mode") ||
        errMsg.toLowerCase().includes("validation_error")
      ) {
        console.warn(`⚠️ Resend free domain restricted recipient (${recipientEmail}). Redirecting email to Admin (${adminEmail}).`);
        delete payload.bcc;
        payload.to = [adminEmail];
        const resFallback = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify(payload),
        });
        const dataFallback = await resFallback.json();
        if (resFallback.ok) {
          return { provider: "Resend HTTP API (Admin Fallback)", messageId: dataFallback.id };
        }
      }
      throw new Error(errMsg);
    }
    return { provider: "Resend HTTP API (Port 443)", messageId: data.id };
  }

  // 3. Nodemailer SMTP (Gmail / Custom SMTP)
  const { transporter, isReal, sender } = await createMailTransporter();
  const fromHeader = `"Altura Travels Admin" <${sender}>`;

  const mailOptions = {
    to: recipientEmail,
    from: fromHeader,
    subject,
    html,
  };

  if (adminEmail) {
    mailOptions.replyTo = adminEmail;
    mailOptions.bcc = adminEmail;
  }

  const info = await transporter.sendMail(mailOptions);
  return {
    provider: isReal ? "Gmail SMTP" : "Ethereal Test SMTP",
    messageId: info.messageId,
    previewUrl: !isReal ? nodemailer.getTestMessageUrl(info) : null,
  };
}


// Helper to create mail transporter with fallback diagnostics
async function createMailTransporter() {
  const smtpUser = process.env.EMAIL_USER || process.env.ADMIN_EMAIL;
  const rawPass = process.env.EMAIL_PASS || "";
  const smtpPass = rawPass.replace(/\s+/g, "");

  if (smtpUser && smtpPass) {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = process.env.SMTP_SECURE === "true";

    const transportConfig = host
      ? {
          host,
          port,
          secure,
          auth: { user: smtpUser, pass: smtpPass },
          connectionTimeout: 8000,
          greetingTimeout: 8000,
          socketTimeout: 10000,
          tls: { rejectUnauthorized: false },
        }
      : {
          service: "gmail",
          auth: { user: smtpUser, pass: smtpPass },
          connectionTimeout: 8000,
          greetingTimeout: 8000,
          socketTimeout: 10000,
        };

    return {
      transporter: nodemailer.createTransport(transportConfig),
      isReal: true,
      sender: smtpUser,
    };
  } else {
    console.warn("⚠️ EMAIL_PASS environment variable is missing or empty. Falling back to Ethereal test email account.");
    const testAccount = await nodemailer.createTestAccount();
    return {
      transporter: nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
        connectionTimeout: 8000,
      }),
      isReal: false,
      sender: testAccount.user,
    };
  }
}

/**
 * @route   GET /api/bookings/test-email
 * @desc    Diagnostic test route to verify email sending configuration
 * @access  Public
 */
router.get("/test-email", async (req, res) => {
  try {
    const smtpUser = process.env.EMAIL_USER || process.env.ADMIN_EMAIL;
    const rawPass = process.env.EMAIL_PASS || "";
    const smtpPass = rawPass.replace(/\s+/g, "");

    const configStatus = {
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || "Not set",
      EMAIL_USER: process.env.EMAIL_USER || "Not set",
      EMAIL_PASS_CONFIGURED: Boolean(smtpPass),
      RESEND_API_KEY_CONFIGURED: Boolean(process.env.RESEND_API_KEY),
      BREVO_API_KEY_CONFIGURED: Boolean(process.env.BREVO_API_KEY),
      RECOMMENDED_FOR_RENDER: Boolean(process.env.RESEND_API_KEY || process.env.BREVO_API_KEY),
    };

    const targetEmail = req.query.to || process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    if (!targetEmail) {
      return res.status(400).json({
        message: "No recipient email available to send test email.",
        configStatus,
      });
    }

    const result = await dispatchEmail({
      to: targetEmail,
      subject: "Test Email - Altura Travels System",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Altura Travels Email System Diagnostic Test</h2>
          <p>This is a test email sent from Altura Travels backend.</p>
          <p><strong>Recipient:</strong> ${targetEmail}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: `Test email dispatched via ${result.provider}`,
      configStatus,
      result,
    });
  } catch (err) {
    console.error("❌ Test email failed:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: err.message,
      code: err.code,
      command: err.command,
      renderNote: "Render free tier blocks SMTP ports (25/465/587). Add RESEND_API_KEY or BREVO_API_KEY in Render to use HTTP Port 443.",
    });
  }
});

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking and send confirmation email
 * @access  Private (only logged-in users)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { packageId, travelers, date } = req.body;

    if (!packageId || !travelers || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const selectedPackage = await Package.findById(packageId);
    if (!selectedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBooking = new Booking({
      userId: req.user.id,
      packageId,
      packageName: selectedPackage.name,
      travelers,
      date,
      status: "pending",
    });

    await newBooking.save();

    // Optional: link booking to user document
    try {
      user.bookings.push(newBooking._id);
      await user.save();
    } catch (_) {}

    // Send HTTP response immediately
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });

    // Send confirmation email asynchronously in the background
    (async () => {
      try {
        const result = await dispatchEmail({
          to: user.email,
          subject: "Your Booking Confirmation - Altura Travels",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
              <div style="background-color: #2E4D38; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Altura Travels</h1>
              </div>
              <div style="padding: 20px;">
                <h2 style="color: #2E4D38;">Hi ${user.name},</h2>
                <p>Thank you for choosing Altura Travels! Your booking request has been received and is currently being processed.</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Booking Details</h3>
                  <p><strong>Package:</strong> ${selectedPackage.name}</p>
                  <p><strong>Location:</strong> ${selectedPackage.location}</p>
                  <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
                  <p><strong>Travelers:</strong> ${travelers}</p>
                  <p><strong>Total Price:</strong> ₹${selectedPackage.price * travelers}</p>
                  <p><strong>Status:</strong> <span style="color: #f39c12; font-weight: bold;">Pending Confirmation</span></p>
                </div>
                
                <p>Our travel experts will contact you shortly with the next steps and payment details.</p>
                <p>If you have any questions, feel free to reply to this email or contact us on WhatsApp.</p>
              </div>
              <div style="background-color: #f1f1f1; color: #777; padding: 10px; text-align: center; font-size: 12px;">
                <p>© 2026 Altura Travels. All rights reserved.</p>
              </div>
            </div>
          `,
        });
        console.log(`✅ Booking confirmation email sent via ${result.provider} to ${user.email}`);
      } catch (emailErr) {
        console.error("❌ Email send failed:", emailErr.message || emailErr);
      }
    })();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/bookings/my
 * @desc    Get all bookings for logged-in user
 * @access  Private
 */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("packageId");
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/bookings/:id/cancel
 * @desc    Cancel a user's own booking
 * @access  Private
 */
router.put("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ _id: id, userId: req.user.id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin-only middleware
function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}

/**
 * @route   GET /api/bookings/admin
 * @desc    Get all bookings (admin)
 * @access  Admin
 */
router.get("/admin", authMiddleware, adminOnly, async (_req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate({ path: "packageId", model: "Package" })
      .populate({ path: "userId", model: "User", select: "name email" });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/bookings/:id/status
 * @desc    Update booking status (admin)
 * @access  Admin
 */
router.put("/:id/status", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Status updated", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
