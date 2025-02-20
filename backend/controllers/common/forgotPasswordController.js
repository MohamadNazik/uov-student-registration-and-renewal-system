import adminModel from "../../models/adminModel.js";
import userModel from "../../models/userModel.js";
import nodemailer  from 'nodemailer';
import  bcrypt  from 'bcrypt';

export const forgotPAsswordController = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      let user = await adminModel.findOne({ email });
    if (!user) {
      user = await userModel.findOne({ email }); 
    }

    if (!user) {
      return res.status(400).json({ message: "User or admin not found" });
    }

  
      await sendOTPVerificationEmail(user, res);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Error in  forgot password",
        error,
      });
    }
  };
  const otpEmail = process.env.APP_EMAIL;
  const otpPassword = process.env.APP_EMAIL_PASSWORD;
  
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: otpEmail,
      pass: otpPassword,
    },
  });



  export const sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const mailOption = {
        from: process.env.APP_EMAIL,
        to: email,
        subject: "Verify your email",
        html: `<p>Enter <b>${otp}</b> to verify your email address and complete the task.</p>
            <p>This code will expire in 5 minutes.</p>`,
      };
  
      const saltRounds = 10;
      const hashedOTP = await bcrypt.hash(otp, saltRounds);
  
      const newOTPVerification = new UserOTPVerification({
        staffId: _id,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30000,
      });
  
      await newOTPVerification.save();
  
      transporter.sendMail(mailOption, (err, info) => {
        if (err) {
          console.log("Error while sending email:", err);
          return res.status(500).send({
            success: false,
            message: "Error in sending OTP email",
            error: err,
          });
        }
  
        res.status(200).send({
          status: "PENDING",
          message: "Verification OTP email sent",
          data: {
            staffId: _id,
            email,
          },
        });
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error in OTP",
        error: error.message || error,
      });
    }
  };
  