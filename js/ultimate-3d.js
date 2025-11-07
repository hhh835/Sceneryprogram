// ========== 终极 3D 轮播 - 带占位图和拖拽功能 ==========

console.log('🚀 终极 3D 轮播已加载！');

// 全局变量
let isDragging = false;
let rotationX = -10;
let rotationY = 20;
let currentZ = 50;
let lastMouseX = 0;
let lastMouseY = 0;
let currentSlide = 0;

const slidesData = [
    {
        title: '关东霜原',
        desc: '万里河山尽收眼底',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        title: '燕赵之地',
        desc: '科技与自然的融合',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        title: '江南锦域',
        desc: '沉浸式山河体验',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        title: '南粤山海',
        desc: '每一帧都是风景',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        title: '云岭高原',
        desc: '大美中国，震撼呈现',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM 加载完成');

    const enterBtn = document.getElementById('enter-shanhe-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            console.log('✅ 按钮被点击！');
            setTimeout(create3DScene, 500);
        });
    }
});

function create3DScene() {
    console.log('🎨 创建 3D 场景...');

    const modal = document.getElementById('shanhe-modal');
    const content = document.querySelector('#shanhe-modal .shanhe-content');

    if (!modal || !content) {
        console.log('❌ 未找到模态框');
        return;
    }

    // 隐藏原有幻灯片
    const slides = document.querySelectorAll('.shanhe-slide');
    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    // 创建 3D 容器
    const threeContainer = document.createElement('div');
    threeContainer.id = 'ultimate-3d-container';
    threeContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        overflow: hidden;
        cursor: grab;
    `;

    // 3D 图片容器
    const image3D = document.createElement('div');
    image3D.id = 'image-3d-wrapper';
    image3D.style.cssText = `
        position: relative;
        width: 90vw;
        height: 85vh;
        transform-style: preserve-3d;
        transition: transform 0.1s ease-out;
        cursor: grab;
        user-select: none;
    `;

    // 实际图片
    const img = document.createElement('div');
    img.id = 'main-3d-image';
    img.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 30px;
        background: url('assets/images/shanhe-gallery-${currentSlide + 1}.jpg') center/cover,
                    linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow:
            0 40px 100px rgba(0, 0, 0, 0.9),
            0 0 80px rgba(0, 212, 255, 0.4),
            inset 0 0 80px rgba(0, 0, 0, 0.3);
        transform: translateZ(50px) rotateX(${rotationX}deg) rotateY(${rotationY}deg);
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // 添加一些装饰元素让效果更明显
    img.innerHTML = `
        <div style="
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
            animation: shine 3s ease-in-out infinite;
        "></div>
        <div style="
            position: absolute;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        "></div>
    `;

    // 标题文字
    const textOverlay = document.createElement('div');
    textOverlay.style.cssText = `
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%) translateZ(80px);
        text-align: center;
        color: white;
        z-index: 100;
        pointer-events: none;
    `;

    textOverlay.innerHTML = `
        <h1 style="
            font-size: 4em;
            margin: 0 0 20px 0;
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
            font-weight: bold;
            letter-spacing: 2px;
        ">${slidesData[0].title}</h1>
        <p style="
            font-size: 1.5em;
            margin: 0;
            opacity: 0.9;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        ">${slidesData[0].desc}</p>
    `;

    // 组合
    image3D.appendChild(img);
    image3D.appendChild(textOverlay);
    threeContainer.appendChild(image3D);

    // 进度指示器（五个小圆圈）
    const indicators = document.createElement('div');
    indicators.style.cssText = `
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 15px;
        z-index: 1000;
    `;

    indicators.innerHTML = slidesData.map((_, index) => `
        <div class="indicator-dot" data-index="${index}" style="
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: ${index === 0 ? '#00d4ff' : 'rgba(255, 255, 255, 0.3)'};
            border: 2px solid ${index === 0 ? '#00d4ff' : 'rgba(255, 255, 255, 0.5)'};
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: ${index === 0 ? '0 0 20px rgba(0, 212, 255, 0.8)' : 'none'};
        " onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform='scale(1)'"></div>
    `).join('');

    // 绑定点击事件
    indicators.addEventListener('click', function(e) {
        const dot = e.target.closest('.indicator-dot');
        if (dot) {
            const index = parseInt(dot.dataset.index);
            goToSlide(index);
        }
    });

    threeContainer.appendChild(indicators);

    // 添加提示
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: absolute;
        top: 30px;
        right: 30px;
        color: white;
        font-size: 1.1em;
        text-align: right;
        background: rgba(0, 0, 0, 0.5);
        padding: 15px 25px;
        border-radius: 15px;
        backdrop-filter: blur(10px);
    `;
    hint.innerHTML = `
        <div>🖱️ 拖拽旋转</div>
        <div>🖱️ 鼠标移动改变视角</div>
        <div>🖱️ 滚轮缩放</div>
        <div>⭕ 点击圆圈跳转</div>
    `;
    threeContainer.appendChild(hint);

    // 替换内容
    content.innerHTML = '';
    content.appendChild(threeContainer);

    // 添加动画CSS
    addAnimationStyles();

    // 绑定事件
    bind3DEvents(image3D, img, textOverlay);

    console.log('✅ 3D 场景创建完成！');
}

function bind3DEvents(imageWrapper, imageEl, textEl) {
    // 鼠标拖拽
    imageWrapper.addEventListener('mousedown', function(e) {
        isDragging = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        imageWrapper.style.cursor = 'grabbing';
        console.log('🖱️ 开始拖拽');
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;

        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;

        rotationX = Math.max(-80, Math.min(80, rotationX));

        update3DTransform(imageEl, textEl);

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        imageWrapper.style.cursor = 'grab';
    });

    // 鼠标移动视差效果
    imageWrapper.addEventListener('mousemove', function(e) {
        if (isDragging) return;

        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;

        rotationY = x * 30;
        rotationX = -y * 20;

        update3DTransform(imageEl, textEl);
    });

    // 滚轮缩放
    imageWrapper.addEventListener('wheel', function(e) {
        e.preventDefault();
        currentZ += e.deltaY * 0.1;
        currentZ = Math.max(20, Math.min(150, currentZ));
        update3DTransform(imageEl, textEl);
    });

    // 鼠标离开重置
    imageWrapper.addEventListener('mouseleave', function() {
        if (!isDragging) {
            rotationY = 20;
            rotationX = -10;
            currentZ = 50;
            update3DTransform(imageEl, textEl);
        }
    });
}

function update3DTransform(imageEl, textEl) {
    imageEl.style.transform = `translateZ(${currentZ}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    textEl.style.transform = `translateX(-50%) translateZ(${currentZ + 30}px)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slidesData.length;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
    updateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

function updateSlide() {
    const img = document.getElementById('main-3d-image');
    const textEl = document.querySelector('#image-3d-wrapper > div:last-child');
    const dots = document.querySelectorAll('.indicator-dot');

    if (img && textEl) {
        // 淡出
        img.style.transition = 'all 0.3s ease';
        img.style.opacity = '0';
        textEl.style.transition = 'all 0.3s ease';
        textEl.style.opacity = '0';

        setTimeout(() => {
            // 更新内容 - 使用占位图
            img.style.background = `url('assets/images/shanhe-gallery-${currentSlide + 1}.jpg') center/cover, ${slidesData[currentSlide].gradient}`;
            textEl.innerHTML = `
                <h1 style="
                    font-size: 4em;
                    margin: 0 0 20px 0;
                    text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
                    font-weight: bold;
                    letter-spacing: 2px;
                ">${slidesData[currentSlide].title}</h1>
                <p style="
                    font-size: 1.5em;
                    margin: 0;
                    opacity: 0.9;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                ">${slidesData[currentSlide].desc}</p>
            `;

            // 更新圆圈状态
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.style.background = '#00d4ff';
                    dot.style.border = '2px solid #00d4ff';
                    dot.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
                } else {
                    dot.style.background = 'rgba(255, 255, 255, 0.3)';
                    dot.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                    dot.style.boxShadow = 'none';
                }
            });

            // 淡入
            img.style.opacity = '1';
            textEl.style.opacity = '1';
        }, 300);
    }
}

function addAnimationStyles() {
    if (document.getElementById('3d-animations')) return;

    const style = document.createElement('style');
    style.id = '3d-animations';
    style.textContent = `
        @keyframes shine {
            0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }

        body {
            cursor: grab;
        }

        body.dragging {
            cursor: grabbing;
        }
    `;
    document.head.appendChild(style);
}

// 键盘控制
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});
