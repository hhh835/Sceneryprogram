// ========== 山河卷 3D 效果初始化脚本 ==========

let threeDCarousel = null;

function initShanhe3D() {
    // 检查 Three.js 是否已加载
    if (typeof THREE === 'undefined') {
        console.error('Three.js 未加载！请先引入 Three.js 库');
        return;
    }

    const modal = document.getElementById('shanhe-modal');
    if (!modal) return;

    // 监听模态框打开事件
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style') {
                if (modal.style.display !== 'none' && !threeDCarousel) {
                    // 模态框打开，初始化 3D 效果
                    setTimeout(init3DCarousel, 300);
                } else if (modal.style.display === 'none' && threeDCarousel) {
                    // 模态框关闭，销毁 3D 效果
                    threeDCarousel.destroy();
                    threeDCarousel = null;
                }
            }
        });
    });

    observer.observe(modal, { attributes: true });

    // 立即检查是否已经打开
    if (modal.style.display !== 'none') {
        setTimeout(init3DCarousel, 300);
    }
}

function init3DCarousel() {
    const threeContainer = document.getElementById('three-container');
    if (!threeContainer) {
        // 如果容器不存在，先创建它
        create3DContainer();
    }

    if (!threeDCarousel) {
        threeDCarousel = new ThreeDImageCarousel('three-container');
    }
}

function create3DContainer() {
    const modalContent = document.querySelector('#shanhe-modal .shanhe-content');
    if (!modalContent) return;

    // 隐藏原有的 shanhe-slide 元素（将它们移到隐藏容器）
    const slides = document.querySelectorAll('.shanhe-slide');
    if (slides.length > 0) {
        // 创建隐藏数据容器
        const dataContainer = document.createElement('div');
        dataContainer.className = 'shanhe-slides-data';
        dataContainer.style.display = 'none';
        dataContainer.innerHTML = Array.from(slides).map(slide => slide.outerHTML).join('');
        modalContent.insertBefore(dataContainer, modalContent.firstChild);

        // 移除原有的幻灯片
        slides.forEach(slide => slide.remove());
    }

    // 创建 3D 容器
    const threeContainer = document.createElement('div');
    threeContainer.id = 'three-container';
    threeContainer.className = 'three-container';
    modalContent.insertBefore(threeContainer, modalContent.firstChild.nextSibling);

    // 添加控制提示
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
    threeContainer.insertAdjacentElement('afterend', controlsHint);

    // 添加进度指示器
    const progressDots = document.createElement('div');
    progressDots.className = 'three-progress-dots';
    progressDots.id = 'three-progress-dots';
    progressDots.innerHTML = Array.from({ length: 5 }).map((_, i) =>
        `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
    ).join('');
    controlsHint.insertAdjacentElement('afterend', progressDots);

    // 绑定进度指示器点击事件
    progressDots.addEventListener('click', (e) => {
        const dot = e.target.closest('.dot');
        if (dot && threeDCarousel) {
            const index = parseInt(dot.dataset.index);
            threeDCarousel.goToSlide(index);
        }
    });
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保其他脚本已加载
    setTimeout(initShanhe3D, 500);
});

// 导出函数
window.initShanhe3D = initShanhe3D;
