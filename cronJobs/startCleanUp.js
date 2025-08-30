import User from "../schemas/userSchema.js";
import { scheduleCron } from "../utils/cron.js"
import { sendMail } from "../utils/sendEmail.js";

export const startCleanUp = () => {
  // Delete unverified users every hour
  scheduleCron("0 * * * *", async () => {
    const cutoff = new Date(Date.now() - 6 * 60 * 60 * 1000); // 6 hours ago
    try {
      const deleted = await User.deleteMany({ isVerified: false, createdAt: { $lt: cutoff } });
      console.log(`Deleted ${deleted.deletedCount} unverified users`);
    } catch (error) {
      console.log(error);
    }
  });
};

// Send reminder emails to unverified users daily
export const sendMailReminder = () => {
  scheduleCron("0 0 * * *", async () => {
    try {
      const users = await User.find({
        isVerified: false,
        createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // older than 1 day
      });

      for (const user of users) {
        const mailObj = {
          mailFrom: `Blog Platform <${process.env.EMAIL_USER}>`,
          mailTo: user.email,
          subject: "Verify your account",
          body: `<h1>Welcome ${user.username}</h1>
                 <p>Please verify your account using this OTP: ${user.otp}</p>`,
        };
        await sendMail(mailObj);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
