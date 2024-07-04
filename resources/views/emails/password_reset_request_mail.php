<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
            color: #101010 !important;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #ED1C1C;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            text-align: left;
        }

        .content p {
            margin: 0 0 10px;
            font-size: 16px;
            color: #101010 !important;
        }

        .button-container {
            text-align: center;
            margin: 20px 0;
        }

        .button {
            background-color: #ED1C1C;
            color: #ffffff !important;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            display: inline-block;
        }

        .footer {
            background-color: #f2f2f2;
            color: #777777 !important;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }

        .footer p {
            margin: 5px 0;
            color: #777777 !important;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password for your account. Please click the button below to reset your password:</p>
            <div class="button-container">
                <a href="<?php echo $url ?>" class="button">Reset Password</a>
            </div>
            <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
            <p>Thank you,</p>
            <img src="https://cdn.discordapp.com/attachments/834845279030214766/1257351972076650660/Layer_1.png?ex=668417c6&is=6682c646&hm=0990ace8010184add9c68d69a205bf709da3f022a7d11b7963c42f05c824b408&" alt="Company Logo">
        </div>
        <div class="footer">
            <p>&copy; <?php echo date('Y'); ?> Your Company. All rights reserved.</p>
            <p>If you’re having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
            <p><a href="<?php echo $url; ?>"> <?php echo $url; ?></a></p>
        </div>
    </div>
</body>

</html>