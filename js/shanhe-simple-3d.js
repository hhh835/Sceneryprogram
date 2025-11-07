// ========== 简化版山河卷 3D 效果 ==========
// 纯 CSS 3D 实现，无需复杂配置

class Simple3DCarousel {
    constructor() {
        this.currentIndex = 0;
        this.slides = [];
        this.init();
    }

    init() {
        const modal = document.getElementById('shanhe-modal');
        if (!modal) return;

        // 等待模态框打开
        this.waitForModalOpen();

        // 监听模态框显示
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'style') {
                    if (modal.style.display !== 'none' && this.slides.length === 0) {
                        setTimeout(() => this.setup3D(), 300);
                    } else if (modal.style.display === 'none') {
                        this.cleanup();
                    }
                }
            });
        });

        observer.observe(modal, { attributes: true });
    }

    waitForModalOpen() {
        const enterBtn = document.getElementById('enter-shanhe-btn');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                setTimeout(() => this.setup3D(), 500);
            });
        }
    }

    setup3D() {
        const modalContent = document.querySelector('#shanhe-modal .shanhe-content');
        if (!modalContent) return;

        // 隐藏原有内容
        const existingSlides = document.querySelectorAll('.shanhe-slide');
        existingSlides.forEach(slide => {
            slide.style.display = 'none';
        });

        // 创建 3D 容器
        let threeContainer = document.getElementById('three-container');
        if (!threeContainer) {
            threeContainer = document.createElement('div');
            threeContainer.id = 'three-container';
            threeContainer.className = 'three-container';
            modalContent.insertBefore(threeContainer, modalContent.firstChild.nextSibling);

            // 添加 3D 效果
            this.create3DEffect(threeContainer, existingSlides);
            this.createControls(threeContainer);
        }
    }

    create3DEffect(container, slides) {
        const dataContainer = document.createElement('div');
        dataContainer.className = 'shanhe-slides-data';
        dataContainer.style.display = 'none';
        dataContainer.innerHTML = Array.from(slides).map(slide => slide.outerHTML).join('');
        container.appendChild(dataContainer);

        // 创建 3D 展示区域
        const displayArea = document.createElement('div');
        displayArea.className = 'three-display-area';
        container.appendChild(displayArea);

        // 创建进度指示器
        const progressDots = document.createElement('div');
        progressDots.className = 'three-progress-dots';
        progressDots.innerHTML = Array.from(slides).map((_, i) =>
            `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
        ).join('');
        container.appendChild(progressDots);

        // 绑定事件
 progressDots.addEventListener('click', (e) => {
            const dot = e.target.closest('.dot');
            if (dot) {
                const index = parseInt(dot.dataset.index);
                this.goToSlide(index, displayArea, progressDots);
            }
        });

        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.next(displayArea, progressDots);
            } else if (e.key === 'ArrowLeft') {
                this.prev(displayArea, progressDots);
            }
        });

        // 鼠标控制
        let mouseX = 0;
        container.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            displayArea.style.transform = `perspective(1000px) rotateY(${mouseX * 5}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            displayArea.style.transform = 'perspective(1000px) rotateY(0deg)';
        });

        // 显示第一张
        this.showSlide(0, displayArea, slides);
    }

    createControls(container) {
        const controlsHint = document.createElement('div');
        controlsHint.className = 'three-controls-hint';
        controlsHint.innerHTML = `
            <div class="control-tip">
                <span>← →</span> 切换图片
            </div>
            <div class="control-tip">
                <span>鼠标移动</span> 3D视差效果
            </div>
        `;
        container.appendChild(controlsHint);
    }

    showSlide(index, displayArea, slides) {
        const slideData = Array.from(slides)[index];
        if (!slideData) return;

        const img = slideData.querySelector('img');
        const title = slideData.querySelector('.slide-title');
        const desc = slideData.querySelector('.slide-description');

        displayArea.innerHTML = `
            <div class="slide-3d-wrapper">
                <div class="slide-3d-image">
                    <img src="${img.src}" alt="${img.alt}">
                </div>
                <div class="slide-3d-text">
                    <h2>${title.textContent}</h2>
                    <p>${desc.textContent}</p>
                </div>
            </div>
        `;

        // 添加 3D 动画
        const wrapper = displayArea.querySelector('.slide-3d-wrapper');
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(30px) scale(0.95)';
        setTimeout(() => {
            wrapper.style.transition = 'all 0.5s ease';
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'translateY(0) scale(1)';
        }, 50);
    }

    goToSlide(index, displayArea, progressDots) {
        if (index < 0 || index >= 5) return;

        this.currentIndex = index;

        // 更新进度指示器
        progressDots.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // 重新显示
        const slides = document.querySelectorAll('.shanhe-slide');
        this.showSlide(index, displayArea, slides);
    }

    next(displayArea, progressDots) {
        const next = (this.currentIndex + 1) % 5;
        this.goToSlide(next, displayArea, progressDots);
    }

    prev(displayArea, progressDots) {
        const prev = (this.currentIndex - 1 + 5) % 5;
        this.goToSlide(prev, displayArea, progressDots);
    }

    cleanup() {
        const container = document.getElementById('three-container');
        if (container) {
            container.remove();
        }
        this.slides = [];
    }
}

// 简化初始化
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new Simple3DCarousel();
    }, 1000);
});

console.log('简化3D轮播已加载');
