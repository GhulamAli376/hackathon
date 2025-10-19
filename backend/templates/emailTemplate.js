export const SignupEmailTemplate = (user, otp) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your Foodie Account</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #fdfcfb;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      padding: 30px;
      border: 1px solid #f0f0f0;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header img {
      width: 60px;
      margin-bottom: 10px;
    }
    .header h2 {
      color: #e63946;
      margin: 0;
    }
    .content {
      padding: 20px 0;
    }
    .content p {
      font-size: 16px;
      color: #444;
      line-height: 1.6;
    }
    .otp-box {
      background-color: #ffe8e8;
      color: #d62828;
      font-size: 28px;
      font-weight: bold;
      padding: 15px;
      text-align: center;
      border-radius: 8px;
      letter-spacing: 4px;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #aaa;
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="Food Logo" />
      <h2>Welcome to Foodie Express!</h2>
    </div>
    <div class="content">
      <p>Hello <strong>${user.fullName}</strong>,</p>
      <p>Thanks for joining <strong>Foodie Express</strong> 🍕🍔🍜</p>
      <p>To complete your signup and start ordering your favorite meals, please verify your email:</p>
      
      <div class="otp-box">${otp}</div>

      <p>This OTP is valid for <strong>10 minutes</strong>.</p>
      <p>If you did not sign up for this account, please ignore this email.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Foodie Express. All rights reserved.
    </div>
  </div>
</body>
</html>`;
};
