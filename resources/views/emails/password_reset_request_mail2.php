<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
            border-radius: 8px;
        }

        .email-header {
            background-color: #ED1C1C;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }

        .email-content {
            padding: 20px;
            text-align: center;
        }

        .email-content p {
            font-size: 16px;
            color: #333333;
            margin: 10px 0;
        }

        .email-button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #ED1C1C;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }

        .email-footer {
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #999999;
        }

        .email-footer p {
            margin: 5px 0;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="email-content">
            <p>Hi,</p>
            <p>We received a request to reset your password for your account. Click the link below to reset your password:</p>
            <a href="{{ $url }}" class="email-button">Reset Password</a>
            <p>If you did not request a password reset, no further action is required.</p>
        </div>
        <div class="email-footer">
            <p>Thanks,</p>
            <p>Your Application Team</p>
        </div>
    </div>
</body>

</html>