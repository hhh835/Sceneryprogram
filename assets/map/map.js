// ========== 地图页交互逻辑（6区域版）==========

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有地图区域元素
    const mapRegions = document.querySelectorAll('.map-region');

    // ========== 模式切换功能 ==========
    const modeTabs = document.querySelectorAll('.mode-tab');
    const virtualMode = document.getElementById('virtual-mode');
    const guardianMode = document.getElementById('guardian-mode');

    // 当前模式状态
    let currentMode = 'virtual'; // 默认虚拟中国模式
    // 当前选中区域
    let currentRegion = 'central'; // 默认选中华中地区

    // 模式切换事件
    modeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            switchMode(mode);
        });
    });

    /**
     * 切换模式
     * @param {string} mode - 'virtual' 或 'guardian'
     */
    function switchMode(mode) {
        // 更新标签页状态
        modeTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-mode') === mode) {
                tab.classList.add('active');
            }
        });

        // 切换模式内容
        if (mode === 'virtual') {
            virtualMode.classList.add('active');
            guardianMode.classList.remove('active');
            currentMode = 'virtual';
        } else {
            guardianMode.classList.add('active');
            virtualMode.classList.remove('active');
            currentMode = 'guardian';
        }

        // 保持当前区域状态，不移除激活状态
        const activeRegion = document.querySelector(`.map-region[data-region="${currentRegion}"]`);
        if (activeRegion) {
            activeRegion.classList.add('active');
        }

        // 根据当前模式和区域显示对应内容
        if (currentRegion && currentRegion !== null) {
            if (currentMode === 'virtual') {
                showVirtualCard(currentRegion);
            } else {
                showGuardianData(currentRegion);
            }
        }
    }

    // 为每个地图区域添加点击事件
    mapRegions.forEach(region => {
        region.addEventListener('click', function() {
            // 获取区域标识
            const regionId = this.getAttribute('data-region');
            currentRegion = regionId; // 更新当前选中区域

            // 移除所有区域和卡片的激活状态
            removeActiveStates();

            // 激活当前点击的区域
            this.classList.add('active');

            // 根据当前模式显示对应内容
            if (currentMode === 'virtual') {
                showVirtualCard(regionId);
            } else {
                showGuardianData(regionId);
            }

            // 添加点击动画效果
            addClickAnimation(this);
        });

        // 添加悬停效果 - 显示区域名称提示
        region.addEventListener('mouseenter', function() {
            const regionName = this.getAttribute('data-region-name');
            showTooltip(this, regionName);
        });

        region.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });

    /**
     * 移除所有区域的激活状态
     */
    function removeActiveStates() {
        // 移除所有地图区域的激活状态
        mapRegions.forEach(region => {
            region.classList.remove('active');
        });
    }

    /**
     * 显示虚拟中国模式的景区卡片
     * @param {string} regionId - 区域ID
     */
    function showVirtualCard(regionId) {
        // 显示景区容器
        const attractionsContainer = document.getElementById('attractions-container');
        if (attractionsContainer) {
            attractionsContainer.classList.add('active');
        }

        // 隐藏所有虚拟中国卡片
        const virtualCards = document.querySelectorAll('[id^="virtual-card-"]');
        virtualCards.forEach(card => {
            card.classList.remove('active');
        });

        // 显示对应的区域卡片
        const targetCard = document.getElementById(`virtual-card-${regionId}`);
        if (targetCard) {
            setTimeout(() => {
                targetCard.classList.add('active');
                // 滚动到对应的卡片
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 150);

            // 为卡片内容添加动画
            animateCardContent(targetCard);
        }
    }

    /**
     * 显示智慧守护模式的数据卡片
     * @param {string} regionId - 区域ID
     */
    function showGuardianData(regionId) {
        // 显示数据容器
        const dataCardsContainer = document.getElementById('data-cards-container');
        if (dataCardsContainer) {
            dataCardsContainer.classList.add('active');
        }

        // 隐藏所有区域数据
        const guardianData = document.querySelectorAll('[id^="guardian-data-"]');
        guardianData.forEach(data => {
            data.classList.remove('active');
        });

        // 显示对应的区域数据
        const targetData = document.getElementById(`guardian-data-${regionId}`);
        if (targetData) {
            setTimeout(() => {
                targetData.classList.add('active');
            }, 150);

            // 为数据卡片添加动画
            animateDataCards(targetData);
        }
    }

    /**
     * 为数据卡片添加动画效果
     * @param {HTMLElement} dataContainer - 数据容器元素
     */
    function animateDataCards(dataContainer) {
        const dataCards = dataContainer.querySelectorAll('.data-card');

        dataCards.forEach((card, index) => {
            // 重置动画
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            // 依次显示
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * 为卡片内容添加动画效果
     * @param {HTMLElement} card - 卡片元素
     */
    function animateCardContent(card) {
        const image = card.querySelector('.card-image');
        const title = card.querySelector('.card-title');
        const description = card.querySelector('.card-description');
        const highlights = card.querySelector('.card-highlights');
        const button = card.querySelector('.explore-btn');

        // 重置所有元素的动画
        const elements = [image, title, description, highlights, button];
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
            }
        });

        // 依次显示元素
        if (image) {
            setTimeout(() => {
                image.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                image.style.opacity = '1';
                image.style.transform = 'translateY(0)';
            }, 0);
        }

        if (title) {
            setTimeout(() => {
                title.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 100);
        }

        if (description) {
            setTimeout(() => {
                description.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                description.style.opacity = '1';
                description.style.transform = 'translateY(0)';
            }, 200);
        }

        if (highlights) {
            setTimeout(() => {
                highlights.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                highlights.style.opacity = '1';
                highlights.style.transform = 'translateY(0)';
            }, 300);
        }

        if (button) {
            setTimeout(() => {
                button.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, 400);
        }
    }

    /**
     * 添加点击动画效果
     * @param {HTMLElement} element - 地图区域元素
     */
    function addClickAnimation(element) {
        // 添加波纹效果
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transform = '';
        }, 100);
    }

    /**
     * 显示工具提示
     * @param {HTMLElement} element - 触发元素
     * @param {string} text - 提示文本
     */
    let tooltipElement = null;

    function showTooltip(element, text) {
        hideTooltip(); // 隐藏之前的提示

        // 创建提示元素
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'region-tooltip';
        tooltipElement.textContent = text;
        document.body.appendChild(tooltipElement);

        // 定位提示
        const rect = element.getBoundingClientRect();
        tooltipElement.style.left = rect.left + rect.width / 2 + 'px';
        tooltipElement.style.top = rect.top - 40 + 'px';

        // 添加动画
        setTimeout(() => {
            tooltipElement.style.opacity = '1';
            tooltipElement.style.transform = 'translate(-50%, 0)';
        }, 10);
    }

    /**
     * 隐藏工具提示
     */
    function hideTooltip() {
        if (tooltipElement) {
            tooltipElement.style.opacity = '0';
            tooltipElement.style.transform = 'translate(-50%, -10px)';
            setTimeout(() => {
                tooltipElement.remove();
                tooltipElement = null;
            }, 200);
        }
    }

    // 鼠标移动时更新提示位置
    document.addEventListener('mousemove', function(e) {
        if (tooltipElement) {
            tooltipElement.style.left = e.clientX + 'px';
            tooltipElement.style.top = (e.clientY - 40) + 'px';
        }
    });

    // 点击探索按钮的交互
    const exploreButtons = document.querySelectorAll('.explore-btn');
    exploreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取按钮所在的卡片
            const card = this.closest('.region-card');
            const regionName = card.querySelector('.card-title').textContent;

            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);

            // 这里可以添加跳转逻辑或弹窗逻辑
            alert(`即将进入 ${regionName} 深入探索...`);
            // 示例：window.location.href = `explore-${regionId}.html`;
        });
    });

    // 平滑滚动到顶部功能（如果有回到顶部按钮）
    const backToTopButtons = document.querySelectorAll('.back-to-top');
    backToTopButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // 添加键盘导航支持（支持6个区域）
    document.addEventListener('keydown', function(e) {
        // 使用方向键切换区域
        const activeRegion = document.querySelector('.map-region.active');
        const regions = Array.from(mapRegions);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const currentIndex = activeRegion ? regions.indexOf(activeRegion) : -1;
            const nextIndex = (currentIndex + 1) % regions.length;
            regions[nextIndex].click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const currentIndex = activeRegion ? regions.indexOf(activeRegion) : 0;
            const prevIndex = (currentIndex - 1 + regions.length) % regions.length;
            regions[prevIndex].click();
        }
    });

    // 添加触摸支持（移动端）- 支持6个区域
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // 检测滑动（最小滑动距离）
        if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
            const activeRegion = document.querySelector('.map-region.active');
            const regions = Array.from(mapRegions);

            // 向右或向下滑动：切换到下一个区域
            if (deltaX > 0 || deltaY > 0) {
                const currentIndex = activeRegion ? regions.indexOf(activeRegion) : -1;
                const nextIndex = (currentIndex + 1) % regions.length;
                regions[nextIndex].click();
            }
            // 向左或向上滑动：切换到上一个区域
            else {
                const currentIndex = activeRegion ? regions.indexOf(activeRegion) : 0;
                const prevIndex = (currentIndex - 1 + regions.length) % regions.length;
                regions[prevIndex].click();
            }
        }
    });

    // 页面加载完成后，默认选中华中地区
    // 直接初始化，不使用setTimeout
    const centralRegion = document.querySelector('.map-region[data-region="central"]');
    if (centralRegion) {
        centralRegion.classList.add('active');
    }

    // 监听窗口大小变化，调整布局
    window.addEventListener('resize', function() {
        // 重新计算tooltip位置（如果存在）
        if (tooltipElement) {
            const activeRegion = document.querySelector('.map-region.active');
            if (activeRegion) {
                const rect = activeRegion.getBoundingClientRect();
                tooltipElement.style.left = rect.left + rect.width / 2 + 'px';
                tooltipElement.style.top = rect.top - 40 + 'px';
            }
        }
    });
});

// 添加 CSS 动画样式（通过 JavaScript 动态注入）
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }

    .region-tooltip {
        position: fixed;
        background: var(--text-dark);
        color: var(--white);
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transform: translate(-50%, -10px);
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        white-space: nowrap;
    }

    .region-tooltip::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid var(--text-dark);
    }

    /* 地图区域波纹效果 */
    .map-region::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--primary-color);
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        transition: all 0.4s ease;
        z-index: -1;
    }

    .map-region.active::before {
        opacity: 0.2;
        transform: translate(-50%, -50%) scale(1.5);
        animation: ripple 2s ease-out infinite;
    }

    @keyframes ripple {
        0% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1.5);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
        }
    }

    /* 加载动画 - 支持6个区域 */
    .map-region {
        animation: regionFadeIn 0.5s ease forwards;
        opacity: 0;
    }

    .map-region:nth-child(1) { animation-delay: 0.1s; }
    .map-region:nth-child(2) { animation-delay: 0.2s; }
    .map-region:nth-child(3) { animation-delay: 0.3s; }
    .map-region:nth-child(4) { animation-delay: 0.4s; }
    .map-region:nth-child(5) { animation-delay: 0.5s; } /* 东北区域 */
    .map-region:nth-child(6) { animation-delay: 0.6s; } /* 华中区域 */

    @keyframes regionFadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
