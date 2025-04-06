async function loadWallpaper() {
    const loading = document.querySelector('.loading');
    // const copyright = document.querySelector('.copyright');
    
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
