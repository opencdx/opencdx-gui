// SendReport.ts
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Configure the SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email provider
  auth: {
    user: 'surendra.kumar@safehealth.me', 
    pass: '',
  },
});

// Prepare the email content
const mailOptions = {
  from: 'surendra.kumar@safehealth.me',
  to: 'surendra.kumar@safehealth.me',
  subject: 'Playwright Test Execution Report',
  text: 'Please find the attached Playwright test execution HTML report.',
  attachments: [
    {
      filename: 'playwright-report.html',
      path: path.join(__dirname, '..', '..', 'test-results', 'index.html'),
      encoding: 'base64',
    },
  ],
};

// Function to send report
export const sendReport = () => {
  const reportPath = path.join(__dirname, '..', '..', 'test-results', 'index.html');
  
  // Check if the report file exists
  if (!fs.existsSync(reportPath)) {
    console.log('Report file not found!');
    return;
  }

  // Send the email with the report if file exists
  transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
    if (error) {
      console.log('Error sending email: ', error);
      return;
    }
    console.log('Email sent: ' + info.response);
  });
};