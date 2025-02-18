// utils/emailService.js
import nodemailer from "nodemailer";

export const sendPasswordEmail = async (email, enrollmentNumber, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lasangad890@gmail.com",
      pass: "uvfs ycqn okik vycr",
    },
  });

  const mailOptions = {
    from: "lasangad890@gmail.com",
    to: email,
    subject: "University of Vavuniya Account creation",
    text: `Your student account has been approved.
           Enrollment Number: ${enrollmentNumber} 
           Default Password: ${password}
           Please change your password after logging in.`,
  };

  await transporter.sendMail(mailOptions);
};
