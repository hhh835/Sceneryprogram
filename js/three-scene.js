// ========== WebGL 3D 图片轮播系统 ==========
// 山水图片3D展示效果

class ThreeDImageCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.planes = [];
        this.currentIndex = 0;
        this.isAnimating = false;
        this.images = [];
        this.texts = [];
        this.controls = null;
        this.animationId = null;

        this.init();
    }

    init() {
        // 准备图片和文字数据
        this.prepareData();

        // 初始化 Three.js 场景
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initLights();
        this.createPlanes();

        // 绑定事件
        this.bindEvents();

        // 开始渲染
        this.animate();

        console.log('3D Image Carousel initialized');
    }

    prepareData() {
        // 从模态框中提取数据
        const slides = document.querySelectorAll('.shanhe-slide');
        this.images = Array.from(slides).map(slide => {
            const img = slide.querySelector('img');
            return img ? img.src : null;
        });
        this.texts = Array.from(slides).map(slide => {
            const title = slide.querySelector('.slide-title')?.textContent || '';
            const desc = slide.querySelector('.slide-description')?.textContent || '';
            return { title, desc };
        });
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 10, 50);
    }

    initCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
        this.camera.position.z = 15;
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
    }

    initLights() {
        // 环境光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // 主光源
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 5, 10);
        this.scene.add(mainLight);

        // 辅助光源
        const辅助Light = new THREE.DirectionalLight(0x4466ff, 0.3);
        辅助Light.position.set(-5, -5, -5);
        this.scene.add(辅助Light);

        // 点光源
        const pointLight = new THREE.PointLight(0x66ccff, 0.5, 20);
        pointLight.position.set(0, 0, 10);
        this.scene.add(pointLight);
    }

    createPlanes() {
        const loader = new THREE.TextureLoader();

        this.images.forEach((imgSrc, index) => {
            if (!imgSrc) return;

            const texture = loader.load(imgSrc);
            const geometry = new THREE.PlaneGeometry(8, 4.5);
            const material = new THREE.MeshPhongMaterial({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: index === 0 ? 1 : 0.3,
                shininess: 30
            });

            const plane = new THREE.Mesh(geometry, material);
            plane.position.x = (index - this.images.length / 2) * 10;
            plane.position.y = 0;
            plane.position.z = index === 0 ? 0 : -5;
            plane.userData = { index, text: this.texts[index] };
            plane.userData.originalX = plane.position.x;
            plane.userData.targetX = plane.position.x;
            plane.userData.targetZ = plane.position.z;
            plane.userData.targetOpacity = index === 0 ? 1 : 0.3;

            this.scene.add(plane);
            this.planes.push(plane);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // 更新动画
        this.planes.forEach((plane, index) => {
            // 平滑移动
            plane.position.x += (plane.userData.targetX - plane.position.x) * 0.05;
            plane.position.z += (plane.userData.targetZ - plane.position.z) * 0.05;

            // 更新透明度
            plane.material.opacity += (plane.userData.targetOpacity - plane.material.opacity) * 0.05;

            // 3D 旋转效果
            plane.rotation.y = Math.sin(Date.now() * 0.0003 + index) * 0.05;
            plane.rotation.x = Math.cos(Date.now() * 0.0002 + index) * 0.02;

            // 悬停时放大
            if (index === this.currentIndex) {
                const targetScale = 1 + Math.sin(Date.now() * 0.003) * 0.02;
                plane.scale.set(targetScale, targetScale, targetScale);
            } else {
                plane.scale.set(1, 1, 1);
            }
        });

        // 渲染
        this.renderer.render(this.scene, this.camera);
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        if (index < 0 || index >= this.planes.length) return;

        this.isAnimating = true;
        this.currentIndex = index;

        // 更新所有平面目标位置
        this.planes.forEach((plane, i) => {
            const offset = i - index;
            plane.userData.targetX = offset * 10;
            plane.userData.targetZ = Math.abs(offset) * -5;
            plane.userData.targetOpacity = i === index ? 1 : 0.3;
        });

        // 更新文字显示
        this.updateTextDisplay();

        // 动画完成标志
        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.planes.length;
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.planes.length) % this.planes.length;
        this.goToSlide(nextIndex);
    }

    updateTextDisplay() {
        // 可以在这里添加文字覆盖层更新逻辑
        const currentText = this.texts[this.currentIndex];
        if (currentText) {
            // 更新 DOM 中的文字显示（如果需要）
            console.log('Current slide:', currentText);
        }
    }

    bindEvents() {
        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.next();
            } else if (e.key === 'ArrowLeft') {
                this.prev();
            }
        });

        // 窗口大小调整
        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        });

        // 鼠标移动视差效果
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            this.camera.position.x = (x - 0.5) * 2;
            this.camera.position.y = (0.5 - y) * 2;
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
        this.scene = null;
        this.camera = null;
        this.planes = [];
    }
}

// 导出类
window.ThreeDImageCarousel = ThreeDImageCarousel;
