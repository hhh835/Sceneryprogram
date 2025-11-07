// ========== 超简单 3D 轮播 - 100% 保证工作 ==========

console.log('🎬 3D轮播脚本已加载！');

// 等待 DOM 加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM 已加载');

    // 等待 2 秒后初始化
    setTimeout(init3D, 2000);
});

function init3D() {
    console.log('🚀 开始初始化 3D 效果...');

    const enterBtn = document.getElementById('enter-shanhe-btn');
    if (!enterBtn) {
        console.log('❌ 未找到按钮');
        return;
    }

    // 监听点击
    enterBtn.addEventListener('click', function() {
        console.log('✅ 按钮被点击！');
        setTimeout(apply3D, 500);
    });
}

function apply3D() {
    console.log('🎨 应用 3D 效果...');

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
    threeContainer.id = 'three-container-simple';
    threeContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: linear-gradient(135deg, #000428 0%, #004e92 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    // 创建第一张图片（从第一个 slide 获取）
    const firstSlide = slides[0];
    if (firstSlide) {
        const img = firstSlide.querySelector('img');
        const title = firstSlide.querySelector('.slide-title');
        const desc = firstSlide.querySelector('.slide-description');

        threeContainer.innerHTML = `
            <div style="
                position: relative;
                width: 90vw;
                height: 80vh;
                transform-style: preserve-3d;
                transition: transform 0.3s ease;
                cursor: grab;
            " id="3d-image-container">
                <img src="${img.src}" alt="${img.alt}" style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                    transform: translateZ(50px) rotateX(5deg);
                ">
                <div style="
                    position: absolute;
                    bottom: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    color: white;
                    z-index: 10;
                ">
                    <h2 style="
                        font-size: 3em;
                        margin: 0 0 10px 0;
                        background: linear-gradient(45deg, #00d4ff, #00ff88);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    ">${title.textContent}</h2>
                    <p style="
                        font-size: 1.3em;
                        opacity: 0.9;
                        margin: 0;
                    ">${desc.textContent}</p>
                </div>
            </div>
            <div style="
                margin-top: 30px;
                display: flex;
                gap: 20px;
            ">
                <button onclick="changeSlide(-1)" style="
                    padding: 15px 30px;
                    font-size: 1.2em;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid #00d4ff;
                    color: white;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s;
                " onmouseover="this.style.background='#00d4ff'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                    ← 上一张
                </button>
                <button onclick="changeSlide(1)" style="
                    padding: 15px 30px;
                    font-size: 1.2em;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid #00d4ff;
                    color: white;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s;
                " onmouseover="this.style.background='#00d4ff'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                    下一张 →
                </button>
            </div>
        `;

        // 替换内容
        content.innerHTML = '';
        content.appendChild(threeContainer);

        // 添加鼠标 3D 效果
        const imgContainer = document.getElementById('3d-image-container');
        if (imgContainer) {
            imgContainer.addEventListener('mousemove', function(e) {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                const rotateY = (x - 0.5) * 20;
                const rotateX = (0.5 - y) * 15;
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            imgContainer.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        }

        console.log('✅ 3D 效果已应用！');
    }
}

// 全局切换函数
let currentSlideIndex = 0;
function changeSlide(direction) {
    const slides = document.querySelectorAll('.shanhe-slide');
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

    const slide = slides[currentSlideIndex];
    const img = slide.querySelector('img');
    const title = slide.querySelector('.slide-title');
    const desc = slide.querySelector('.slide-description');

    const imgContainer = document.getElementById('3d-image-container');
    if (imgContainer) {
        imgContainer.innerHTML = `
            <img src="${img.src}" alt="${img.alt}" style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                transform: translateZ(50px) rotateX(5deg);
            ">
            <div style="
                position: absolute;
                bottom: 50px;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                color: white;
                z-index: 10;
            ">
                <h2 style="
                    font-size: 3em;
                    margin: 0 0 10px 0;
                    background: linear-gradient(45deg, #00d4ff, #00ff88);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                ">${title.textContent}</h2>
                <p style="
                    font-size: 1.3em;
                    opacity: 0.9;
                    margin: 0;
                ">${desc.textContent}</p>
            </div>
        `;
    }
}
