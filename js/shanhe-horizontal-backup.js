// ========== 山河卷 - 全屏滚动版本 ==========

class ShanheScrollView {
    constructor() {
        this.totalSlides = 6;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        console.log('山河卷全屏滚动已加载');
        this.bindEvents();
    }

    bindEvents() {
        // 监听模态框打开
        const enterBtn = document.getElementById('enter-shanhe-btn');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => this.open());
        }

        // 关闭按钮
        const closeBtn = document.getElementById('close-shanhe');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
    }

    open() {
        // 重置状态
        this.currentIndex = 0;

        // 隐藏所有图片
        const allSlides = document.querySelectorAll('.shanhe-bg');
        allSlides.forEach(slide => {
            slide.style.display = 'none';
        });

        // 显示第一张
        const firstSlide = document.querySelector('.shanhe-bg[data-index="0"]');
        if (firstSlide) {
            firstSlide.style.display = 'block';
        }

        // 显示模态框
        const modal = document.getElementById('shanhe-modal');
        if (modal) {
            modal.style.display = 'block';
        }

        // 绑定滚动事件
        this.bindScrollEvents();
    }

    close() {
        const modal = document.getElementById('shanhe-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.unbindScrollEvents();
    }

    bindScrollEvents() {
        this.handleWheel = this.handleWheel.bind(this);
        document.getElementById('shanhe-modal').addEventListener('wheel', this.handleWheel, { passive: false });
    }

    unbindScrollEvents() {
        if (this.handleWheel) {
            document.getElementById('shanhe-modal').removeEventListener('wheel', this.handleWheel);
        }
    }

    handleWheel(e) {
        e.preventDefault();

        if (e.deltaY > 0) {
            this.next();
        } else {
            this.prev();
        }
    }

    next() {
        console.log('next() called, currentIndex:', this.currentIndex);

        // 到达最后一张后再滚动，触发回首页
        if (this.currentIndex >= this.totalSlides - 1) {
            console.log('Reached end, fading to home');
            this.fadeToHome();
            return;
        }

        console.log('Switching to next slide:', this.currentIndex + 1);

        // 当前图片隐藏
        const currentSlide = document.querySelector(`.shanhe-bg[data-index="${this.currentIndex}"]`);
        if (currentSlide) {
            currentSlide.style.display = 'none';
        }

        // 切换到下一张
        this.currentIndex++;

        // 显示下一张图片
        const nextSlide = document.querySelector(`.shanhe-bg[data-index="${this.currentIndex}"]`);
        if (nextSlide) {
            nextSlide.style.display = 'block';
        }
    }

    prev() {
        if (this.currentIndex <= 0) return;

        // 当前图片隐藏
        const currentSlide = document.querySelector(`.shanhe-bg[data-index="${this.currentIndex}"]`);
        if (currentSlide) {
            currentSlide.style.display = 'none';
        }

        // 切换到上一张
        this.currentIndex--;

        // 显示上一张图片
        const prevSlide = document.querySelector(`.shanhe-bg[data-index="${this.currentIndex}"]`);
        if (prevSlide) {
            prevSlide.style.display = 'block';
        }
    }

    fadeToHome() {
        const fadeOverlay = document.getElementById('fade-overlay');
        if (fadeOverlay) {
            fadeOverlay.style.opacity = '1';
        }

        setTimeout(() => {
            this.close();
            if (fadeOverlay) {
                fadeOverlay.style.opacity = '0';
            }
        }, 2000);
    }
}

// 创建全局实例
const shanheScroll = new ShanheScrollView();
