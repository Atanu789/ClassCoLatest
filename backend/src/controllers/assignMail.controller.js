import { createTransport } from "nodemailer";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

let transporter = createTransport({
  service: "gmail",
  auth: {
    user: "classco201@gmail.com",
    pass: "ekakxesrkgbjodlx",
  },
});

const sendAssignMail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: "classco201@gmail.com",
    to: email,
    subject: " Important: Assignment Announcement",
    text: "I trust this message finds you in good spirits. I'm writing to notify you that your teacher has posted an upcoming assignment on the platform. Kindly ensure you're adequately prepared by revising your course materials and gathering any required resources.For additional information, please log in to the platform and navigate to the assignment section. Should you have any inquiries or apprehensions, do not hesitate to contact your teacher directly.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred: " + error.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send email" });
    }

    console.log("Email sent successfully: " + info.response);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  });
});

export { sendAssignMail };
