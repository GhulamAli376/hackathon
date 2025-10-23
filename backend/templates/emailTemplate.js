export const SignupEmailTemplate = (user, otp) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your HealthMate Account</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 30px;
      border: 1px solid #eaeaea;
    }
    .header {
      text-align: center;
      padding-bottom: 15px;
    }
    .header img {
      width: 70px;
      margin-bottom: 10px;
    }
    .header h2 {
      color: #d32f2f;
      margin: 0;
      font-size: 22px;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 20px 0;
    }
    .content p {
      font-size: 15px;
      color: #444;
      line-height: 1.6;
    }
    .otp-box {
      background-color: #fdecea;
      color: #c62828;
      font-size: 30px;
      font-weight: bold;
      padding: 14px;
      text-align: center;
      border-radius: 10px;
      letter-spacing: 5px;
      margin: 25px 0;
      box-shadow: inset 0 0 5px rgba(211,47,47,0.2);
    }
    .footer {
      font-size: 12px;
      color: #999;
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
    .highlight {
      color: #d32f2f;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://cdn-icons-png.flaticon.com/512/2966/2966488.png" alt="HealthMate Logo" />
      <h2>Welcome to HealthMate ❤️‍🩹</h2>
    </div>
    <div class="content">
      <p>Hello <strong>${user.fullName}</strong>,</p>
      <p>We’re excited to have you join <span class="highlight">HealthMate</span> — your smart companion for better health management.</p>
      <p>To complete your signup and access personalized health features, please verify your email:</p>

      <div class="otp-box">${otp}</div>

      <p>This OTP is valid for <strong>10 minutes</strong>.</p>
      <p>If you did not create this account, you can safely ignore this message.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} HealthMate. All rights reserved.  
      <br />
      <span style="color:#d32f2f;">“Your Health, Our Priority.”</span>
    </div>
  </div>
</body>
</html>`;
};
