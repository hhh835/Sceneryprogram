// 简化测试版本
let currentIndex = 0;
const totalSlides = 6;
let isAnimating = false;

function openShanhe() {
    console.log('打开山河卷');
    currentIndex = 0;
    isAnimating = false;
    
    // 重置所有幻灯片
    document.querySelectorAll('.shanhe-bg').forEach(slide => {
        slide.classList.remove('active', 'fading');
    });
    
    // 显示第一张
    const firstSlide = document.querySelector('.shanhe-bg[data-index="0"]');
    if (firstSlide) {
        firstSlide.classList.add('active');
    }
    
    // 显示模态框
    document.getElementById('shanhe-modal').style.display = 'block';
    
    // 绑定滚动
    document.getElementById('shanhe-modal').addEventListener('wheel', handleWheel);
}

function closeShanhe() {
    document.getElementById('shanhe-modal').style.display = 'none';
    document.getElementById('shanhe-modal').removeEventListener('wheel', handleWheel);
}

function handleWheel(e) {
    e.preventDefault();
    if (isAnimating) return;
    
    if (e.deltaY > 0) {
        nextSlide();
    } else {
        prevSlide();
    }
}

function nextSlide() {
    if (isAnimating) return;
    console.log('当前索引:', currentIndex);
    
    if (currentIndex >= totalSlides - 1) {
        console.log('到达最后，触发回首页');
        fadeToHome();
        return;
    }
    
    isAnimating = true;
    
    // 隐藏当前
    const current = document.querySelector(`.shanhe-bg[data-index="${currentIndex}"]`);
    if (current) {
        current.classList.add('fading');
        setTimeout(() => {
            current.classList.remove('active', 'fading');
        }, 600);
    }
    
    // 显示下一张
    currentIndex++;
    setTimeout(() => {
        const next = document.querySelector(`.shanhe-bg[data-index="${currentIndex}"]`);
        if (next) {
            next.classList.add('active');
        }
        isAnimating = false;
        console.log('切换到索引:', currentIndex);
    }, 300);
}

function prevSlide() {
    if (isAnimating || currentIndex <= 0) return;
    
    isAnimating = true;
    
    const current = document.querySelector(`.shanhe-bg[data-index="${currentIndex}"]`);
    if (current) {
        current.classList.add('fading');
        setTimeout(() => {
            current.classList.remove('active', 'fading');
        }, 600);
    }
    
    currentIndex--;
    setTimeout(() => {
        const prev = document.querySelector(`.shanhe-bg[data-index="${currentIndex}"]`);
        if (prev) {
            prev.classList.add('active');
        }
        isAnimating = false;
    }, 300);
}

function fadeToHome() {
    isAnimating = true;
    const overlay = document.getElementById('fade-overlay');
    if (overlay) {
        overlay.style.opacity = '1';
    }
    
    setTimeout(() => {
        closeShanhe();
        if (overlay) {
            overlay.style.opacity = '0';
        }
        isAnimating = false;
    }, 1500);
}

// 绑定按钮
document.getElementById('enter-shanhe-btn').addEventListener('click', openShanhe);
document.getElementById('close-shanhe').addEventListener('click', closeShanhe);
