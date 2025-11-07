// ========== 3D 风景展示页面 JavaScript ==========

// 景区数据 - 每个景区3张图片和3段文字
const regionData = {
    'north': {
        name: '燕赵之地',
        images: [
            '../assets/images/scenery-bg-1.jpg',
            '../assets/images/scenery-bg-2.jpg',
            '../assets/images/scenery-bg-3.jpg'
        ],
        texts: [
            '华北平原，承载着中华文明的厚重历史。万里长城蜿蜒起伏，如巨龙盘踞在群山之巅，见证着千年沧桑。这里有古都北京的皇家气派，有山西平遥的古城风韵，有内蒙草原的辽阔壮美。',
            '燕赵之地，自古为兵家必争之地。从秦皇汉武到唐宗宋祖，无数帝王在此建功立业。古都北京的天安门、故宫、颐和园，诉说着王朝的兴衰。山西平遥古城保存完好，是明清建筑的典范。',
            '现代的燕赵大地，经济发达，交通便利。北京作为首都，汇聚了全国的政治、经济、文化资源。天津港连通世界，河北山西的煤炭资源供应全国。这里是中国的政治文化中心，也是创新发展的前沿。'
        ]
    },
    'east': {
        name: '江南锦域',
        images: [
            '../assets/images/scenery-bg-2.jpg',
            '../assets/images/scenery-bg-3.jpg',
            '../assets/images/scenery-bg-4.jpg'
        ],
        texts: [
            '江南水乡，烟雨朦胧。苏州园林的精巧雅致，杭州西湖的诗情画意，南京古都的深厚底蕴，构成了江南最美的画卷。小桥流水、粉墙黛瓦、诗画般的意境，让人仿佛置身于古代文人墨客的诗词中。',
            '江南的园林艺术独步天下。苏州拙政园、留园，上海豫园，浙江西子湖畔的每一处景致都如诗如画。这里是诗词歌赋的故乡，是文人雅士的乐园，是中华文化中最柔美温婉的篇章。',
            '现代的江南，更是经济发达的前沿。上海作为国际金融中心，科技创新引领全球；杭州的电子商务改变世界；苏州的制造业誉满全球。这里既保持着古典的韵味，又展现着现代的活力。'
        ]
    },
    'south': {
        name: '南粤山海',
        images: [
            '../assets/images/scenery-bg-3.jpg',
            '../assets/images/scenery-bg-4.jpg',
            '../assets/images/scenery-bg-5.jpg'
        ],
        texts: [
            '南粤大地，山海相依。桂林山水甲天下，漓江如青罗带，山似碧玉簪。厦门鼓浪屿的浪漫海风，广东深圳的现代繁华，香港澳门的中西合璧，展现了这片土地的多姿多彩。',
            '这里是改革开放的前沿，是连接世界的桥梁。深圳从小渔村到国际大都市的蝶变，创造了人类城市发展史上的奇迹。珠海、佛山、东莞等城市各具特色，形成了珠三角城市群。',
            '南粤文化兼容并蓄，粤语、潮汕话、客家话在这里交融。广府文化、潮汕文化、客家文化交相辉映。粤菜享誉全球，功夫电影走向世界。这里是中国走向世界的窗口。'
        ]
    },
    'west': {
        name: '云岭高原',
        images: [
            '../assets/images/scenery-bg-4.jpg',
            '../assets/images/scenery-bg-5.jpg',
            '../assets/images/scenery-bg-6.jpg'
        ],
        texts: [
            '云贵高原，地貌奇绝。云南大理的苍山洱海，风花雪月美不胜收；贵州黄果树瀑布的磅礴气势，水声如雷震撼人心；四川九寨沟的童话世界，五彩斑斓如梦如幻。',
            '这里是多民族的聚居地，多彩的民族文化和壮美的自然风光交相辉映。彝族、白族、哈尼族、苗族等众多少数民族在这里繁衍生息，形成了独特的民族文化。丽江古城的东巴文化，大理的三坊一照壁，梵净山的佛教文化，都让人流连忘返。',
            '高原的生态保护尤为珍贵滇金丝猴、大熊猫在这里栖息繁衍。丽江古城列入世界文化遗产，香格里拉被誉为"世外桃源"。这里是中国生物多样性的宝库，是人与自然和谐共生的典范。'
        ]
    },
    'northeast': {
        name: '关东霜原',
        images: [
            '../assets/images/scenery-bg-5.jpg',
            '../assets/images/scenery-bg-6.jpg',
            '../assets/images/scenery-bg-1.jpg'
        ],
        texts: [
            '关东大地，霜原莽莽。长白山的天池，神秘而圣洁，如蓝宝石镶嵌在群山之巅；黑龙江的冰雪世界，纯美而壮丽，冰雕晶莹剔透；吉林雾凇的奇观，如诗如画，千树万树梨花开。这里是中国的大粮仓，肥沃的黑土地一望无际，孕育着丰收的希望。',
            '白山黑水间，工业重镇星罗棋布。沈阳的机械制造、大连的港口航运、哈尔滨的冰雪旅游，构成了东北老工业基地的坚实根基。一汽的解放卡车驶向四面八方，大连的船舶纵横四海，哈尔滨的机电产品誉满全国。这里是新中国工业的摇篮，为国家的现代化建设立下了不朽功勋。',
            '隆冬时节，银装素裹分外妖娆。亚布力滑雪场雪道蜿蜒，万科滑雪度假村设施完备，查干湖冬捕场面壮观。满族、朝鲜族等民族的文化在这里交融，二人转的诙谐幽默，俄罗斯风情的异域色彩，为这片黑土地增添了独特的魅力。森林、草原、湿地、湖泊，构成了东北最壮美的生态画卷。'
        ]
    },
    'central': {
        name: '楚泽云川',
        images: [
            '../assets/images/scenery-bg-6.jpg',
            '../assets/images/scenery-bg-1.jpg',
            '../assets/images/scenery-bg-2.jpg'
        ],
        texts: [
            '楚地云川，江河奔流。湖南张家界的奇峰异石，直插云霄；湖北三峡的雄伟壮丽，江水滔滔；江西庐山的秀美飘逸，云雾缭绕。这里是屈原的故乡，楚辞的浪漫在这里传承。',
            '岳阳楼、黄鹤楼、滕王阁，并称江南三大名楼。范仲淹的"先天下之忧而忧，后天下之乐而乐"体现了中华文人的家国情怀。庐山作为文人墨客的聚集地，李白、苏轼等都曾在此留下千古名篇。',
            '湖光山色、田园诗意，诠释着华中大地的无尽魅力。鄱阳湖是中国最大的淡水湖，洞庭湖八百里波涛，武汉三镇风光秀丽。湖北、湖南、江西三省各具特色，共同构成了华中地区独特的文化风貌。'
        ]
    }
};

// 当前幻灯片索引
let currentSlide = 0;
const totalSlides = 3; // 三张图片
let scrollInterval;

// DOM 元素
const scrollingImages = document.getElementById('scrolling-images');
const backBtn = document.getElementById('back-btn');
const progressDots = document.querySelectorAll('.dot');
const slideTexts = document.querySelectorAll('.slide-text');
const slideImgs = [
    document.getElementById('slide-img-0'),
    document.getElementById('slide-img-1'),
    document.getElementById('slide-img-2')
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加body class以隐藏导航栏
    document.body.classList.add('scenery-page');

    // 根据URL参数加载对应景区内容
    loadRegionContent();

    // 开始自动滚动
    startAutoScroll();

    // 绑定事件
    bindEvents();
});

// 加载景区内容
function loadRegionContent() {
    // 检查 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region') || 'north';

    // 获取景区数据
    const data = regionData[region] || regionData['north'];

    // 加载图片和文字
    for (let i = 0; i < totalSlides; i++) {
        if (slideImgs[i]) {
            slideImgs[i].src = data.images[i];
            slideImgs[i].alt = `风景${i + 1}`;
        }
        if (slideTexts[i]) {
            slideTexts[i].textContent = data.texts[i];
        }
    }
}

// 开始自动滚动
function startAutoScroll() {
    // 显示第一张文字
    if (slideTexts[0]) {
        slideTexts[0].classList.add('active');
    }

    // 每5秒切换一次
    scrollInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;

        // 移动图片
        const translateX = -currentSlide * 100;
        scrollingImages.style.transform = `translateX(${translateX}%)`;

        // 更新进度指示器
        progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // 切换文字
        slideTexts.forEach((text, index) => {
            text.classList.toggle('active', index === currentSlide);
        });
    }, 5000);
}

// 绑定事件
function bindEvents() {
    // 返回按钮
    backBtn.addEventListener('click', () => {
        window.location.href = 'map.html';
    });

    // 进度指示器点击事件
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // 清除自动滚动
            clearInterval(scrollInterval);

            // 移动到指定幻灯片
            currentSlide = index;
            const translateX = -currentSlide * 100;
            scrollingImages.style.transform = `translateX(${translateX}%)`;

            // 更新进度指示器
            progressDots.forEach((d, i) => {
                d.classList.toggle('active', i === currentSlide);
            });

            // 切换文字
            slideTexts.forEach((text, i) => {
                text.classList.toggle('active', i === currentSlide);
            });

            // 3秒后重新开始自动滚动
            setTimeout(() => {
                startAutoScroll();
            }, 3000);
        });
    });

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            backBtn.click();
        } else if (e.key === 'ArrowRight') {
            clearInterval(scrollInterval);
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            clearInterval(scrollInterval);
            prevSlide();
        }
    });

    // 鼠标移动视差效果
    const display = document.querySelector('.scenery-display');
    display.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const rotateX = (y - 0.5) * 10;
        const rotateY = (x - 0.5) * 10;

        display.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    display.addEventListener('mouseleave', () => {
        display.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// 下一张幻灯片
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}

// 上一张幻灯片
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
}

// 更新幻灯片显示
function updateSlide() {
    const translateX = -currentSlide * 100;
    scrollingImages.style.transform = `translateX(${translateX}%)`;

    // 更新进度指示器
    progressDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // 切换文字
    slideTexts.forEach((text, index) => {
        text.classList.toggle('active', index === currentSlide);
    });
}

// 添加加载动画
window.addEventListener('load', () => {
    const display = document.querySelector('.scenery-display');
    display.style.opacity = '0';
    display.style.transform = 'scale(0.9)';
    setTimeout(() => {
        display.style.transition = 'all 0.8s ease';
        display.style.opacity = '1';
        display.style.transform = 'scale(1)';
    }, 100);
});
