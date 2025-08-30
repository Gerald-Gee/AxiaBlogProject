import bcrypt from "bcryptjs";
import User from "../../schemas/userSchema.js";
import { generateOTP, sendMail } from "../../utils/sendEmail.js";

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const { otp, otpExpires } = generateOTP();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      admin: false,
      otp,
      otpExpires,
      isVerified: false,
      profile: { country: "", Number: "", Street: "", Bio: "" },
    });

    await newUser.save();

    await sendMail({
      mailFrom: `Blog Platform <${process.env.EMAIL_USER}>`,
      mailTo: email,
      subject: "Account created! Verify your email",
      body: `<h1>Welcome ${username}</h1><p>Your OTP is ${otp}</p>`,
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
