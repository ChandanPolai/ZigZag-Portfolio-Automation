interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export function generateVerificationEmail({ username, otp }: VerificationEmailProps): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verification Code</title>
            <style>
              body {
                font-family: 'Poppins', sans-serif;
                margin: 0;
                background: #ffffff;
                font-size: 14px;
              }
              .container {
                max-width: 680px;
                margin: 0 auto;
                padding: 45px 30px 60px;
                background: #f4f7ff;
                background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
                background-repeat: no-repeat;
                background-size: 800px 452px;
                background-position: top center;
                color: #1f1f1f;
              }
              header h1 {
                font-size: 28px;
                margin-bottom: 0;
              }
              main {
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #ffffff;
                border-radius: 30px;
                text-align: center;
              }
              h1 {
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
                margin-top: 0;
              }
              p {
                font-size: 16px;
                font-weight: 500;
                margin-top: 17px;
                letter-spacing: 0.56px;
                color:#1f1f1f;
              }
              .otp {
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #ba3d4f;
                margin-top: 60px;
              }
              footer {
                width: 100%;
                max-width: 490px;
                margin: 20px auto 0;
                text-align: center;
                border-top: 1px solid #e6ebf1;
              }
              footer p {
                font-size: 16px;
                font-weight: 600;
                color: #434343;
                margin-top: 40px;
              }
              footer p:last-child {
                margin-top: 16px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <header>
                <h1>Mystery Feedback</h1>
              </header>
              <main>
                <div>
                  <h1>Your OTP</h1>
                  <p>Hey ${username},</p>
                  <p>
                    Thank you for registering. Please use the following verification code to complete your registration.
                    OTP is valid for <span style="font-weight: 600; color: #1f1f1f">5 minutes</span>. Do not share this code with others.
                  </p>
                  <p class="otp">${otp}</p>
                </div>
              </main>
              <footer>
                <p>Mystery feedback</p>
                <p>Copyright © 2024 Company. All rights reserved.</p>
              </footer>
            </div>
          </body>
        </html>
      `;
  }
  