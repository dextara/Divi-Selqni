<?php
// Simple receiver for demo purchases. This file expects POST data from purchase.html
function h($s){ return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

$id = $_POST['id'] ?? '';
$name = $_POST['name'] ?? 'Unknown item';
$price = $_POST['price'] ?? '0.00';
$qty = intval($_POST['qty'] ?? 1);
$place = $_POST['place'] ?? '';
$total = number_format((float)$price * $qty, 2);

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Purchase Confirmation</title>
    <style>
        body{font-family:Inter,Segoe UI,Arial,Helvetica;background:#071223;color:#eaf6ff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}
        .card{background:linear-gradient(180deg,#041428,#081827);padding:20px;border-radius:12px;border:1px solid rgba(11,99,255,0.08);max-width:720px;width:92%}
        h1{margin:0 0 8px;font-size:1.4rem}
        p{margin:6px 0;color:#bcd6ea}
        .muted{color:#9aa6b2}
        .back{display:inline-block;margin-top:12px;padding:8px 12px;border-radius:8px;background:#0b63ff;color:#fff;text-decoration:none}
    </style>
</head>
<body>
    <div class="card">
        <h1>Order Received</h1>
        <p class="muted">Thank you — your order has been recorded (demo).</p>
        <p><strong>Item:</strong> <?php echo h($name); ?> (ID: <?php echo h($id); ?>)</p>
        <p><strong>Quantity:</strong> <?php echo h($qty); ?></p>
        <p><strong>Unit price:</strong> $<?php echo h($price); ?></p>
        <p><strong>Place / Address:</strong> <?php echo h($place); ?></p>
        <p><strong>Total:</strong> $<?php echo h($total); ?></p>
        <a class="back" href="purchase.html">Return to store</a>
    </div>
</body>
</html>
