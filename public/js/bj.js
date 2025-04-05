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

    <script>
        async function loadWallpaper() {
            const loading = document.querySelector('.loading');
            const copyright = document.querySelector('.copyright');
            
            try {
                loading.style.display = 'block';
                
                // 添加随机参数避免缓存问题
                const response = await fetch('/.netlify/functions/bing-proxy?t=' + Date.now());
                if (!response.ok) throw new Error(`HTTP错误 ${response.status}`);
                
                const data = await response.json();

                // 预加载所有分辨率图片
                await Promise.all([
                    preloadImage(data.pc),
                    preloadImage(data.pad),
                    preloadImage(data.mobile),
                    preloadImage(data.uhd)
                ]);

                // 设置CSS变量
                document.documentElement.style.setProperty('--pc-bg', `url('${data.pc}')`);
                document.documentElement.style.setProperty('--pad-bg', `url('${data.pad}')`);
                document.documentElement.style.setProperty('--mobile-bg', `url('${data.mobile}')`);
                
                copyright.textContent = data.copyright;
            } catch (error) {
                console.error('加载失败:', error);
                document.body.style.background = '#1a1a1a';
                copyright.textContent = '壁纸加载失败，请刷新重试';
            } finally {
                loading.style.display = 'none';
            }
        }

        // 图片预加载函数
        function preloadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
                img.onerror = reject;
            });
        }

        // 设备检测优化
        function getDeviceType() {
            const width = window.innerWidth;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) return 'mobile';
            if (width >= 1024) return 'pc';
            return 'pad';
        }

        // 初始化加载
        window.addEventListener('load', loadWallpaper);
        // 窗口大小变化时重新检测
        window.addEventListener('resize', () => {
            document.body.style.backgroundImage = getComputedStyle(document.documentElement)
                .getPropertyValue(`--${getDeviceType()}-bg`);
        });
    </script>
</body>
</html>
