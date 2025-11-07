// 山河卷 - 自动从左到右移动（参考景区详情页逻辑）
class ShanheScroll {
    constructor() {
        this.totalSlides = 6;
        this.currentIndex = 0;
        this.scrollInterval = null;
        this.isModalOpen = false;
        this.init();
    }

    init() {
        console.log('山河卷全屏滚动已加载');

        // 初始化时清理所有 active 类
        document.querySelectorAll('.shanhe-bg.active').forEach(el => {
            el.classList.remove('active');
        });

        // 测试：3秒后自动创建星光效果（方便调试）
        setTimeout(() => {
            console.log('🧪 测试星光效果...');
            this.createStarEffect();

            // 额外测试：创建一个明显的红色星光
            const testStar = document.createElement('div');
            testStar.style.position = 'fixed';
            testStar.style.left = '100px';
            testStar.style.top = '100px';
            testStar.style.width = '20px';
            testStar.style.height = '20px';
            testStar.style.background = 'red';
            testStar.style.borderRadius = '50%';
            testStar.style.zIndex = '99999';
            testStar.style.animation = 'starFloat 2s ease-out forwards';
            testStar.style.boxShadow = '0 0 30px red';
            document.body.appendChild(testStar);
            console.log('🧪 红色测试星光已创建');

            setTimeout(() => {
                testStar.remove();
            }, 2000);
        }, 3000);

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
        console.log('========== 打开山河卷 ==========');

        // 重置状态
        this.currentIndex = 0;
        this.isModalOpen = true;

        // 移除所有 .active 类（如果存在）
        document.querySelectorAll('.shanhe-bg.active').forEach(el => {
            el.classList.remove('active');
        });

        // 显示模态框
        const modal = document.getElementById('shanhe-modal');
        if (modal) {
            modal.style.display = 'block';
        }

        // 重置到第一张位置
        this.resetPosition();

        // 开始自动滚动
        this.startAutoScroll();

        console.log('✅ 山河卷已打开，自动播放开始\n');
    }

    close() {
        console.log('========== 关闭山河卷 ==========');

        // 停止自动滚动
        this.stopAutoScroll();

        // 隐藏模态框
        const modal = document.getElementById('shanhe-modal');
        if (modal) {
            modal.style.display = 'none';
        }

        this.isModalOpen = false;

        console.log('✅ 山河卷已关闭\n');
    }

    resetPosition() {
        const content = document.querySelector('.shanhe-content');
        if (content) {
            content.style.transform = 'translateX(0px)';
            content.style.transition = 'transform 0.6s ease';
        }
    }

    // 开始自动滚动 - 参考景区详情页逻辑
    startAutoScroll() {
        // 显示第一张文字（如果需要）
        this.updateSlideText();

        // 每4秒切换一次
        this.scrollInterval = setInterval(() => {
            if (!this.isModalOpen) return;

            // 到达最后一张后，触发回首页
            if (this.currentIndex >= this.totalSlides - 1) {
                console.log('🏁 已到最后，触发回首页');
                this.fadeToHome();
                return;
            }

            // 移动到下一张
            this.currentIndex++;
            this.scrollToCurrent();

            // 触发星光效果
            this.createStarEffect();

            // 更新左下角文字
            this.updateSlideText();

        }, 4000); // 每4秒自动切换
    }

    // 停止自动滚动
    stopAutoScroll() {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
            console.log('⏹️ 自动滚动已停止');
        }
    }

    updateSlideText() {
        // 更新当前幻灯片的文字
        const slideTexts = document.querySelectorAll('.shanhe-bg .shanhe-text h2');
        if (slideTexts && slideTexts.length > 0) {
            console.log(`📝 当前显示: ${slideTexts[this.currentIndex].textContent}`);
        }
    }

    scrollToCurrent() {
        const content = document.querySelector('.shanhe-content');
        if (content) {
            // 计算移动距离：每一张图片占一屏宽度
            const translateX = -this.currentIndex * window.innerWidth;
            content.style.transform = `translateX(${translateX}px)`;
            console.log(`✅ 移动到索引: ${this.currentIndex}，translateX: ${translateX}px\n`);
        }
    }

    // 生成星光粒子效果
    createStarEffect() {
        const particleCount = 25; // 星光粒子数量
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        console.log('✨ 触发星光粒子效果！创建', particleCount, '个粒子');

        for (let i = 0; i < particleCount; i++) {
            const star = document.createElement('div');
            star.className = 'stars-particle';

            // 随机起点（屏幕中心附近）
            const startAngle = (Math.PI * 2 * i) / particleCount;
            const startRadius = Math.random() * 100;
            const startX = centerX + Math.cos(startAngle) * startRadius;
            const startY = centerY + Math.sin(startAngle) * startRadius;

            // 先设置基本样式
            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;

            // 随机大小
            const size = 5 + Math.random() * 8;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // 随机颜色 - 更亮
            const hue = Math.random() * 60 + 180; // 180-240度（青色到蓝色）
            star.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 100%, 1) 0%, hsla(${hue}, 100%, 70%, 0.9) 50%, hsla(${hue}, 100%, 50%, 0) 100%)`;

            // 添加到DOM
            document.body.appendChild(star);
            console.log('✨ 粒子已创建:', i + 1, '/', particleCount);

            // 1.5秒后移除粒子
            setTimeout(() => {
                if (star.parentNode) {
                    star.remove();
                }
            }, 1500);
        }
    }

    fadeToHome() {
        console.log('\n🎬 fadeToHome - 2秒后返回首页');

        // 停止自动滚动
        this.stopAutoScroll();

        const fadeOverlay = document.getElementById('fade-overlay');
        if (fadeOverlay) {
            fadeOverlay.style.opacity = '1';
        }

        setTimeout(() => {
            console.log('🚪 关闭模态框\n');
            this.close();

            if (fadeOverlay) {
                fadeOverlay.style.opacity = '0';
            }
        }, 2000);
    }
}

// 创建全局实例
const shanheScroll = new ShanheScroll();
