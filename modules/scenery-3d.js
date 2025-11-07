// ========== 景区详情 3D 效果 ==========

class Scenery3DViewer {
    constructor() {
        this.currentRegion = '';
        this.isDragging = false;
        this.rotationX = -10;
        this.rotationY = 20;
        this.currentZ = 50;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
    }

    init() {
        // 监听探索按钮点击
        const exploreBtns = document.querySelectorAll('.explore-btn');
        exploreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.info-card');
                if (card) {
                    const regionId = card.id.replace('virtual-card-', '');
                    this.open3DView(regionId);
                }
            });
        });

        console.log('景区3D查看器已初始化');
    }

    open3DView(regionId) {
        this.currentRegion = regionId;
        this.create3DModal();
    }

    create3DModal() {
        // 移除已存在的模态框
        const existingModal = document.getElementById('scenery-3d-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // 创建3D模态框
        const modal = document.createElement('div');
        modal.id = 'scenery-3d-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000000;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `;

        modal.innerHTML = `
            <div class="scenery-3d-content">
                <button class="back-btn-3d" id="back-btn-3d">← 返回地图</button>
                <div class="scenery-3d-container" id="scenery-3d-container">
                    <div class="scenery-3d-image" id="scenery-3d-image">
                        <div class="scenery-3d-text">
                            <h2>${this.getRegionName()}</h2>
                            <p>${this.getRegionDescription()}</p>
                        </div>
                    </div>
                    <div class="scenery-3d-indicators" id="scenery-3d-indicators">
                        <span class="scenery-dot active" data-index="0"></span>
                        <span class="scenery-dot" data-index="1"></span>
                        <span class="scenery-dot" data-index="2"></span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 应用3D效果
        this.apply3DEffect();

        // 绑定事件
        this.bind3DEvents();
    }

    getRegionName() {
        const names = {
            'north': '燕赵之地',
            'south': '南粤山海',
            'west': '云岭高原',
            'east': '江南锦城',
            'northeast': '关东霜原',
            'central': '楚泽云川'
        };
        return names[this.currentRegion] || '风景区';
    }

    getRegionDescription() {
        const descriptions = {
            'north': '华北平原，承载着中华文明的厚重历史。万里长城蜿蜒起伏，如巨龙盘踞在群山之巅。',
            'south': '南粤大地，山海相依。桂林山水甲天下，漓江如青罗带，山似碧玉簪。',
            'west': '西北地区以其壮阔的自然景观闻名于世，敦煌莫高窟艺术瑰宝，青海湖碧波荡漾。',
            'east': '江南水乡，烟雨朦胧。苏州园林的精巧雅致，杭州西湖的诗情画意。',
            'northeast': '关东大地，霜原莽莽。长白山的天池，神秘而圣洁，如蓝宝石镶嵌在群山之巅。',
            'central': '楚地云川，江河奔流。湖南张家界的奇峰异石，直插云霄。'
        };
        return descriptions[this.currentRegion] || '壮美风光，魅力无穷。';
    }

    apply3DEffect() {
        const imageEl = document.getElementById('scenery-3d-image');
        const textEl = document.querySelector('.scenery-3d-text');

        if (imageEl) {
            imageEl.style.cssText = `
                width: 90vw;
                height: 80vh;
                background: url('../../assets/images/region-${this.currentRegion}.jpg') center/cover,
                            linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 30px;
                box-shadow:
                    0 40px 100px rgba(0, 0, 0, 0.9),
                    0 0 80px rgba(0, 212, 255, 0.4),
                    inset 0 0 80px rgba(0, 0, 0, 0.3);
                transform: translateZ(50px) rotateX(-10deg) rotateY(20deg);
                position: relative;
                transition: transform 0.1s ease-out;
                cursor: grab;
                user-select: none;
            `;
        }

        if (textEl) {
            textEl.style.cssText = `
                position: absolute;
                bottom: 60px;
                left: 50%;
                transform: translateX(-50%) translateZ(80px);
                text-align: center;
                color: white;
                z-index: 10;
            `;
        }
    }

    bind3DEvents() {
        // 返回按钮
        const backBtn = document.getElementById('back-btn-3d');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                const modal = document.getElementById('scenery-3d-modal');
                if (modal) {
                    modal.remove();
                }
            });
        }

        const imageEl = document.getElementById('scenery-3d-image');
        if (!imageEl) return;

        // 鼠标拖拽
        imageEl.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            imageEl.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;

            const deltaX = e.clientX - this.lastMouseX;
            const deltaY = e.clientY - this.lastMouseY;

            this.rotationY += deltaX * 0.5;
            this.rotationX -= deltaY * 0.5;
            this.rotationX = Math.max(-80, Math.min(80, this.rotationX));

            this.update3DTransform();

            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            imageEl.style.cursor = 'grab';
        });

        // 鼠标移动视差
        imageEl.addEventListener('mousemove', (e) => {
            if (this.isDragging) return;

            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            this.rotationY = x * 30;
            this.rotationX = -y * 20;

            this.update3DTransform();
        });

        // 滚轮缩放
        imageEl.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.currentZ += e.deltaY * 0.1;
            this.currentZ = Math.max(20, Math.min(150, this.currentZ));
            this.update3DTransform();
        });

        // 鼠标离开重置
        imageEl.addEventListener('mouseleave', () => {
            if (!this.isDragging) {
                this.rotationY = 20;
                this.rotationX = -10;
                this.currentZ = 50;
                this.update3DTransform();
            }
        });

        // 圆点点击
        const dots = document.querySelectorAll('.scenery-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                // 这里可以添加切换图片的逻辑
            });
        });
    }

    update3DTransform() {
        const imageEl = document.getElementById('scenery-3d-image');
        const textEl = document.querySelector('.scenery-3d-text');
        const textOverlay = document.querySelector('.scenery-3d-text');

        if (imageEl) {
            imageEl.style.transform = `translateZ(${this.currentZ}px) rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg)`;
        }
        if (textOverlay) {
            textOverlay.style.transform = `translateX(-50%) translateZ(${this.currentZ + 30}px)`;
        }
    }
}

// 创建全局实例
const scenery3D = new Scenery3DViewer();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        scenery3D.init();
    }, 1000);
});
