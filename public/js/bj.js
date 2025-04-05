<!-- public/index.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>必应壁纸展示</title>
    <style>
        :root {
            --pc-bg: url('');
            --pad-bg: url('');
            --mobile-bg: url('');
        }

        body {
            margin: 0;
            height: 100vh;
            background-size: cover;
            background-position: center;
            background-color: #000; /* 默认黑色背景 */
            transition: background-image 0.5s;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .loading {
            color: white;
            font-size: 24px;
            display: none;
        }

        .copyright {
            position: fixed;
            bottom: 10px;
            right: 10px;
            color: white;
            background: rgba(0,0,0,0.5);
            padding: 5px 10px;
            border-radius: 5px;
        }

        @media (min-width: 1024px) {
            body { background-image: var(--pc-bg); }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
            body { background-image: var(--pad-bg); }
        }
        @media (max-width: 767px) {
            body { background-image: var(--mobile-bg); }
        }
    </style>
</head>
<body>
    <div class="loading">正在加载壁纸...</div>
    <div class="copyright"></div>

    // <script src="js/data&time.js"></script>
    // <script src="js/script.js"></script>
    <script src="js/bj.js"></script>
</body>
</html>
