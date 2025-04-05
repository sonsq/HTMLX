document.addEventListener('DOMContentLoaded', () => {
    let currentEngine = 'bing';
    const engineUrls = {
        bing: 'https://www.bing.com/search?q=',
        baidu: 'https://www.baidu.com/s?wd=',
        google: 'https://www.google.com/search?q=',
        '360': 'https://www.so.com/s?q=',
        zhihu: 'https://www.zhihu.com/search?q=',
        sogou: 'https://www.sogou.com/web?query=',
        toutiao: 'https://so.toutiao.com/search?keyword='
    };

    // 元素引用
    const searchInput = document.getElementById('searchInput');
    const engineList = document.getElementById('engineList');
    const currentIcon = document.getElementById('current-icon');
    const engineSelector = document.querySelector('.engine-selector');
    const searchBtn = document.querySelector('.search-btn');

    // 事件绑定
    engineSelector.addEventListener('click', toggleEngineList);
    searchBtn.addEventListener('click', doSearch);
    document.addEventListener('click', handleDocumentClick);
    searchInput.addEventListener('keypress', handleKeyPress);

    // 绑定引擎选项点击事件
    document.querySelectorAll('.engine-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const engine = this.dataset.engine;
            const iconUrl = this.querySelector('img').src;
            selectEngine(engine, iconUrl);
        });
    });

    function toggleEngineList() {
        engineList.classList.toggle('show');
        engineSelector.classList.toggle('active');
    }

    function selectEngine(engine, iconUrl) {
        currentEngine = engine;
        currentIcon.src = iconUrl;
        engineList.classList.remove('show');
        engineSelector.classList.remove('active');
    }

    function doSearch() {
        const query = searchInput.value.trim();
        if(query) {
            const searchUrl = engineUrls[currentEngine] + encodeURIComponent(query);
            window.open(searchUrl, '_blank');
        }
    }

    function handleDocumentClick(e) {
        if (!e.target.closest('.engine-selector') && !e.target.closest('.dropdown-list')) {
            engineList.classList.remove('show');
            engineSelector.classList.remove('active');
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            doSearch();
        }
    }
});