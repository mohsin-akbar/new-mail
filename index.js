const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://mail-client-n.netlify.app/', // Replace with your Netlify domain
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: 'mohsin090898@gmail.com', // Replace with your email
      pass: 'nryd uuyt cffh oqzh', // Replace with your email password
    },
  });

  // Configure the email options
  const mailOptions = {
    from: 'mohsin090898@gmail.com',
    to:to,
    subject: subject,
    text: text,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
