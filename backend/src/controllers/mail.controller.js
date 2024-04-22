

import { createTransport } from "nodemailer";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

let transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'classco201@gmail.com',
        pass: 'ekakxesrkgbjodlx'
    }
});




const sendQuizMail = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'classco201@gmail.com',
        to: email,
        subject: "Important: Quiz Announcement",
        text: "I hope this email finds you well. I wanted to inform you that your teacher has uploaded an upcoming quiz onto the platform. Please ensure you're ready for it by reviewing your course materials and preparing any necessary resources. For more details, please log in to the platform and check the quiz section. If you have any questions or concerns, feel free to reach out to your teacher directly."
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred: ' + error.message);
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        }

        console.log('Email sent successfully: ' + info.response);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
});

// const sendAssignMail = expressAsyncHandler(async (req, res) => {
//     const { email } = req.body;

//     const mailOptions = {
//         from: 'classco201@gmail.com',
//         to: email,
//         subject: "Hi there",
//         text: "ha ha ha"
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Error occurred: ' + error.message);
//             return res.status(500).json({ success: false, message: 'Failed to send email' });
//         }

//         console.log('Email sent successfully: ' + info.response);
//         res.status(200).json({ success: true, message: 'Email sent successfully' });
//     });
// });

export { sendQuizMail };
