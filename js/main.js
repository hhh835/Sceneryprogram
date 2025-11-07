// ========== 新闻卡片展开功能 ==========
document.addEventListener('DOMContentLoaded', function() {
    const newsCards = document.querySelectorAll('.news-card.expandable');
    
    newsCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const expandedContent = card.querySelector('.news-expanded-content');
        const expandText = expandBtn.querySelector('.expand-text');
        
        expandBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isExpanded = card.classList.contains('expanded');
            
            // 切换展开/收起状态
            if (isExpanded) {
                card.classList.remove('expanded');
                expandText.textContent = '展开阅读';
                expandBtn.setAttribute('aria-expanded', 'false');
            } else {
                card.classList.add('expanded');
                expandText.textContent = '收起';
                expandBtn.setAttribute('aria-expanded', 'true');
            }
        });
        
        // 点击卡片头部也可以展开
        const cardHeader = card.querySelector('.news-header');
        cardHeader.addEventListener('click', function() {
            expandBtn.click();
        });
    });
    
    // ========== 平滑滚动到锚点 ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== 滚动时 Header 效果 ==========
    let lastScrollTop = 0;
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏 header
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示 header
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // ========== 回到顶部按钮 ==========
    const backToTopBtns = document.querySelectorAll('.back-to-top');
    backToTopBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // ========== 新闻详情展开区的回到顶部按钮 ==========
    const backToTopBtns2 = document.querySelectorAll('.back-to-top-btn');
    backToTopBtns2.forEach(btn => {
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // ========== 图片轮播自动切换 ==========
    const carouselImages = document.querySelectorAll('.carousel-image');
    const indicators = document.querySelectorAll('.indicator');
    const titleItems = document.querySelectorAll('.title-item');
    let currentIndex = 0;
    const totalImages = carouselImages.length;

    function showImage(index) {
        // 隐藏所有图片
        carouselImages.forEach(img => img.classList.remove('active'));
        // 移除所有指示器的活动状态
        indicators.forEach(ind => ind.classList.remove('active'));
        // 移除所有标题项的活动状态
        titleItems.forEach(item => item.classList.remove('active'));

        // 显示当前图片
        carouselImages[index].classList.add('active');
        // 激活当前指示器
        indicators[index].classList.add('active');
        // 激活当前标题项
        titleItems[index].classList.add('active');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    // 点击指示器切换图片
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    // 点击标题项切换图片
    titleItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    // 每5秒自动切换 - 已禁用
    // setInterval(nextImage, 5000);

    // ========== 山河卷模态框功能 ==========
    const enterBtn = document.getElementById('enter-shanhe-btn');
    const shanheModal = document.getElementById('shanhe-modal');
    const closeBtn = document.getElementById('close-shanhe');
    const fadeOverlay = document.getElementById('fade-overlay');
    const slides = document.querySelectorAll('.shanhe-slide');
    let currentSlide = 0;
    let isModalOpen = false;
    let scrollTimeout;

    function openShanheModal() {
        isModalOpen = true;
        shanheModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeShanheModal() {
        isModalOpen = false;
        shanheModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showNextSlide() {
        if (currentSlide < slides.length - 1) {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.add('fade-out');

            setTimeout(() => {
                slides[currentSlide].classList.remove('fade-out');
                currentSlide++;
                slides[currentSlide].classList.add('active');
            }, 300);
        } else {
            // 最后一张图，黑屏退出
            fadeOverlay.classList.add('active');
            setTimeout(() => {
                closeShanheModal();
                setTimeout(() => {
                    fadeOverlay.classList.remove('active');
                    currentSlide = 0;
                    slides.forEach((slide, index) => {
                        slide.classList.remove('active', 'fade-out');
                        if (index === 0) slide.classList.add('active');
                    });
                }, 500);
            }, 1500);
        }
    }

    // 点击进入山河卷按钮 - 已禁用，由 shanhe-horizontal.js 处理
    // enterBtn.addEventListener('click', openShanheModal);

    // 点击关闭按钮 - 已禁用，由 shanhe-horizontal.js 处理
    // closeBtn.addEventListener('click', closeShanheModal);

    // 滚动事件监听 - 已禁用，由 shanhe-horizontal.js 处理
    // window.addEventListener('wheel', function(e) {
    //     if (!isModalOpen) return;
    //
    //     clearTimeout(scrollTimeout);
    //     scrollTimeout = setTimeout(() => {
    //         if (e.deltaY > 0) {
    //             showNextSlide();
    //         }
    //     }, 100);
    // }, { passive: true });

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeShanheModal();
        }
    });
});
