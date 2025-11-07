// ========== 动态粒子背景系统 ==========
// 高科技感山水粒子动画

class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.particleCount = 80;
        this.animationId = null;
        this.isActive = false;
    }

    init() {
        // 创建 canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;

        // 插入到 body 最前面
        document.body.insertBefore(this.canvas, document.body.firstChild);

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.createParticles();
        this.bindEvents();
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 180 // 蓝色到青色范围
            });
        }
    }

    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity;

        // 绘制渐变光晕
        const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        this.ctx.fill();

        // 绘制核心点
        this.ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, 1)`;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    updateParticle(particle) {
        // 基础移动
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // 鼠标交互
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = 100;

        if (distance < influenceRadius) {
            const force = (influenceRadius - distance) / influenceRadius;
            const angle = Math.atan2(dy, dx);
            particle.speedX += Math.cos(angle) * force * 0.02;
            particle.speedY += Math.sin(angle) * force * 0.02;
        }

        // 边界检测和环绕
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;

        // 速度衰减
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // 透明度动画
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity));
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.3;
                    this.ctx.save();
                    this.ctx.globalAlpha = opacity;
                    this.ctx.strokeStyle = `hsla(200, 70%, 60%, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制连接线
        this.drawConnections();

        // 更新和绘制粒子
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.animate();
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // 触摸事件
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouseX = e.touches[0].clientX;
                this.mouseY = e.touches[0].clientY;
            }
        });
    }

    destroy() {
        this.stop();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// 创建全局实例
const particleSystem = new ParticleSystem();

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    particleSystem.init();
    particleSystem.start();
});

// 导出以便手动控制
window.particleSystem = particleSystem;
