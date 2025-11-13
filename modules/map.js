// ========== ECharts地图实现 - 6大区域 + 省份数据可视化 ==========

// 等待所有依赖加载完成
function waitForDependencies(callback) {
    let attempts = 0;
    const maxAttempts = 50;

    const check = setInterval(() => {
        attempts++;

        if (typeof echarts !== 'undefined' && typeof window.CHINA_MAP_DATA !== 'undefined') {
            clearInterval(check);
            console.log('所有依赖加载完成，开始初始化');
            callback();
        } else if (attempts >= maxAttempts) {
            clearInterval(check);
            console.error('依赖加载超时');
            console.log('ECharts:', typeof echarts !== 'undefined');
            console.log('地图数据:', typeof window.CHINA_MAP_DATA !== 'undefined');
            // 尝试继续执行，但使用备用方案
            callback();
        } else {
            console.log(`等待依赖加载... (${attempts}/${maxAttempts})`);
        }
    }, 100);
}

// 等待DOM加载完成
waitForDependencies(() => {
    // ========== 数据定义 ==========

    // 省份森林覆盖率数据（%）- 使用全称匹配china.json
    const forestData = [
        {name: '北京市', value: 35.8},
        {name: '天津市', value: 28.3},
        {name: '河北省', value: 26.8},
        {name: '山西省', value: 23.1},
        {name: '内蒙古自治区', value: 22.1},
        {name: '辽宁省', value: 38.2},
        {name: '吉林省', value: 43.7},
        {name: '黑龙江省', value: 46.2},
        {name: '上海市', value: 16.8},
        {name: '江苏省', value: 23.5},
        {name: '浙江省', value: 59.7},
        {name: '安徽省', value: 30.3},
        {name: '福建省', value: 66.8},
        {name: '江西省', value: 61.5},
        {name: '山东省', value: 22.7},
        {name: '河南省', value: 24.8},
        {name: '湖北省', value: 41.6},
        {name: '湖南省', value: 49.8},
        {name: '广东省', value: 57.3},
        {name: '广西壮族自治区', value: 62.4},
        {name: '海南省', value: 55.3},
        {name: '重庆市', value: 43.2},
        {name: '四川省', value: 38.7},
        {name: '贵州省', value: 50.1},
        {name: '云南省', value: 52.3},
        {name: '西藏自治区', value: 12.1},
        {name: '陕西省', value: 43.5},
        {name: '甘肃省', value: 13.4},
        {name: '青海省', value: 7.2},
        {name: '宁夏回族自治区', value: 13.8},
        {name: '新疆维吾尔自治区', value: 6.8},
        {name: '台湾省', value: 60.5},
        {name: '香港特别行政区', value: 42.3},
        {name: '澳门特别行政区', value: 38.1}
    ];

    // 省份水资源丰富度数据（毫米/年）- 使用全称匹配china.json
    const waterData = [
        {name: '北京市', value: 572},
        {name: '天津市', value: 524},
        {name: '河北省', value: 531},
        {name: '山西省', value: 518},
        {name: '内蒙古自治区', value: 278},
        {name: '辽宁省', value: 686},
        {name: '吉林省', value: 623},
        {name: '黑龙江省', value: 524},
        {name: '上海市', value: 1166},
        {name: '江苏省', value: 1008},
        {name: '浙江省', value: 1452},
        {name: '安徽省', value: 1170},
        {name: '福建省', value: 1680},
        {name: '江西省', value: 1596},
        {name: '山东省', value: 676},
        {name: '河南省', value: 772},
        {name: '湖北省', value: 1215},
        {name: '湖南省', value: 1428},
        {name: '广东省', value: 1774},
        {name: '广西壮族自治区', value: 1538},
        {name: '海南省', value: 1759},
        {name: '重庆市', value: 1251},
        {name: '四川省', value: 1031},
        {name: '贵州省', value: 1178},
        {name: '云南省', value: 1279},
        {name: '西藏自治区', value: 573},
        {name: '陕西省', value: 672},
        {name: '甘肃省', value: 327},
        {name: '青海省', value: 391},
        {name: '宁夏回族自治区', value: 289},
        {name: '新疆维吾尔自治区', value: 154},
        {name: '台湾省', value: 2515},
        {name: '香港特别行政区', value: 2214},
        {name: '澳门特别行政区', value: 2098}
    ];

    // 6大区域信息
    const regionInfo = {
        'north': {
            name: '华北地区',
            title: '燕赵之地·华北',
            desc: '华北地区作为中华文明的发源地之一，拥有丰富的历史文化底蕴。从万里长城到古都北京，从山西平遥到内蒙草原，每一处都诉说着千年历史。',
            highlights: ['历史文化', '古都风貌', '自然风光'],
            image: 'region-north.jpg',
            scenery: {
                images: [
                    { src: '../assets/images/north-scenery-1.jpg', text: '万里长城蜿蜒在燕山山脉之上，如巨龙腾空，见证着中华民族的坚韧与智慧。这段长城建于明代，至今依然雄伟壮观。' },
                    { src: '../assets/images/north-scenery-2.jpg', text: '紫禁城红墙金瓦，承载着六百年王朝兴衰。午门、太和殿、乾清宫，每一处都诉说着帝王的威严与历史的厚重。' },
                    { src: '../assets/images/north-scenery-3.jpg', text: '草原天路在内蒙古高原上延伸，蓝天白云下，牛羊成群，牧歌悠扬。这里是游牧民族世代生息的家园。' }
                ]
            }
        },
        'south': {
            name: '华南地区',
            title: '南粤山海·华南',
            desc: '华南地区以亚热带风光著称，桂林山水甲天下，厦门鼓浪屿浪漫迷人，广东深圳现代繁华，香港澳门中西合璧，构成一幅多元文化的美丽画卷。',
            highlights: ['山水甲天下', '现代都市', '海岛风情'],
            image: 'region-south.jpg',
            scenery: {
                images: [
                    { src: '../assets/images/south-scenery-1.jpg', text: '桂林山水如诗如画，漓江两岸奇峰倒影，如千军万马排兵布阵。泛舟江上，如在画中游，人间仙境不过如此。' },
                    { src: '../assets/images/south-scenery-2.jpg', text: '鼓浪屿小岛碧海环绕，钢琴之岛音乐悠扬。万国建筑博览诉说百年历史，海风习习，浪漫如诗。' },
                    { src: '../assets/images/south-scenery-3.jpg', text: '深圳湾公园夜色迷人，现代化高楼灯火辉煌。从小渔村到国际都市，深圳用四十年创造了世界奇迹。' }
                ]
            }
        },
        'west': {
            name: '西北地区',
            title: '云岭高原·西部',
            desc: '西北地区以其壮阔的自然景观闻名于世，敦煌莫高窟艺术瑰宝，青海湖碧波荡漾，新疆天山雪峰巍峨，这里是大自然的鬼斧神工与人类文明的完美融合。',
            highlights: ['丝绸之路', '大漠风光', '民族风情'],
            image: 'region-west.jpg',
            scenery: {
                images: [
                    { src: '../assets/images/west-scenery-1.jpg', text: '莫高窟千佛洞内壁画精美绝伦，飞天反弹琵琶，诉说着丝路辉煌。这里是世界文化遗产的璀璨明珠。' },
                    { src: '../assets/images/west-scenery-2.jpg', text: '青海湖碧波万顷，候鸟翔集。高原明珠镶嵌在青藏高原之上，湖水与雪山相映，美如仙境。' },
                    { src: '../assets/images/west-scenery-3.jpg', text: '天山雪峰巍峨壮丽，博格达峰终年积雪。冰川融水滋养着这片土地，造就了独特的西域风光。' }
                ]
            }
        },
        'east': {
            name: '华东地区',
            title: '江南锦城·华东',
            desc: '华东地区是中国的经济文化中心之一，黄山归来不看岳，西湖烟雨蒙蒙，苏州园林精巧雅致，上海外滩繁华璀璨，展现着江南水乡与现代都市的双重魅力。',
            highlights: ['江南水乡', '现代都市', '文化古迹'],
            image: 'region-east.jpg',
            scenery: {
                images: [
                    { src: '../assets/images/east-scenery-1.jpg', text: '黄山五岳归来不看岳，黄山归来不看岳，奇松怪石云海温泉，四绝景观冠绝天下，登临如入仙境。' },
                    { src: '../assets/images/east-scenery-2.jpg', text: '西湖烟雨蒙蒙，苏堤春晓、断桥残雪、雷锋夕照、南屏晚钟，诗情画意醉了千年时光。' },
                    { src: '../assets/images/east-scenery-3.jpg', text: '上海外滩万国建筑博览，夜色璀璨迷人。黄浦江畔摩天大楼与历史建筑交相辉映，见证东方明珠的辉煌。' }
                ]
            }
        },
        'northeast': {
            name: '东北地区',
            title: '关东霜原·东北',
            desc: '东北地区冬季银装素裹，长白山天池神秘莫测，黑龙江畔冰封千里，这里既是工业重镇，也是旅游胜地，独特的东北文化魅力十足。',
            highlights: ['林海雪原', '工业重镇', '民俗文化'],
            image: 'region-northeast.jpg',
            scenery: {
                images: [
                    { src: '../assets/images/northeast-scenery-1.jpg', text: '长白山天池神秘莫测，高山湖泊镶嵌在火山口之上。云雾缭绕中，传说天女下凡沐浴的神话在此流传。' },
                    { src: '../assets/images/northeast-scenery-2.jpg', text: '松花江畔哈尔滨，冬季冰灯节晶莹剔透。冰雕艺术巧夺天工，夜色中如梦如幻童话世界。' },
                    { src: '../assets/images/northeast-scenery-3.jpg', text: '大兴安岭林海雪原，原始森林苍茫壮美。参天大树与皑皑白雪共同绘就北国风光的壮丽画卷。' }
                ]
            }
        },
        'central': {
            name: '华中地区',
            title: '楚泽云川·华中',
            desc: '华中地区位于中国中部，黄鹤楼千年矗立，武汉三镇风光秀丽，湖南岳阳楼千古风流，张家界奇峰峻岭，展现着中华大地的壮美与深邃。',
            highlights: ['历史文化', '名楼古迹', '自然奇观'],
            image: 'region-central.jpg',
            scenery: {
                images: [
                    { src: '../assets/images/central-scenery-1.jpg', text: '黄鹤楼千年古楼临江而建，蛇山之巅俯瞰江汉。昔人已乘黄鹤去，此地空余黄鹤楼，诗韵流传千古。' },
                    { src: '../assets/images/central-scenery-2.jpg', text: '张家界奇峰三千，秀水八百。阿凡达的悬浮山原型地，奇峰怪石云雾缭绕，如仙境降临人间。' },
                    { src: '../assets/images/central-scenery-3.jpg', text: '岳阳楼洞庭湖畔，衔远山吞长江。范仲淹"先天下之忧而忧，后天下之乐而乐"，千古名篇光照日月。' }
                ]
            }
        }
    };

    // 6大区域数据
    const regionData = {
        'north': { forest: 25.8, water: 548 },
        'south': { forest: 59.5, water: 1624 },
        'west': { forest: 10.2, water: 312 },
        'east': { forest: 41.2, water: 1189 },
        'northeast': { forest: 42.7, water: 611 },
        'central': { forest: 44.9, water: 1168 }
    };

    // ========== 初始化ECharts ==========
    let mapChart = null; // 延迟初始化
    let currentVisualization = 'none'; // 'forest', 'water', 'region', 或 'none'

    // 当前模式状态
    let currentMode = 'virtual';

    /**
     * 初始化地图（显示6大区域）
     */
    function initMap() {
        console.log('initMap() 被调用');
        // 检查ECharts是否加载
        if (typeof echarts === 'undefined') {
            console.error('ECharts库未加载');
            return;
        }

        // 检查地图数据是否加载
        if (!window.CHINA_MAP_DATA) {
            console.error('地图数据未加载');
            const mapContainer = document.getElementById('china-map');
            if (mapContainer) {
                mapContainer.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;background:#f5f5f5;border-radius:12px;">地图数据加载失败，请刷新页面重试</div>';
            }
            return;
        }

        // 检查地图是否已注册
        if (!echarts.getMap('china')) {
            console.log('注册地图数据');
            try {
                // 注册地图
                echarts.registerMap('china', window.CHINA_MAP_DATA);
                console.log('地图注册成功');
                // 创建地图
                createMapChart();
            } catch (error) {
                console.error('地图注册失败:', error);
                const mapContainer = document.getElementById('china-map');
                if (mapContainer) {
                    mapContainer.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;background:#f5f5f5;border-radius:12px;">地图数据格式错误</div>';
                }
            }
            return;
        }

        console.log('地图数据已存在，创建地图');
        createMapChart();
    }

    /**
     * 创建地图图表
     */
    function createMapChart() {
        console.log('createMapChart() 被调用');

        // 获取地图容器
        const mapContainer = document.getElementById('china-map');
        if (!mapContainer) {
            console.error('地图容器未找到');
            return;
        }

        // 确保默认模式为virtual
        if (!currentMode) {
            currentMode = 'virtual';
            console.log('设置默认模式为virtual');
        }

        // 初始化ECharts实例
        if (!mapChart) {
            mapChart = echarts.init(mapContainer);
        } else {
            console.log('使用已有的ECharts实例');
        }

        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    const name = params.name;
                    if (currentVisualization === 'forest') {
                        const data = forestData.find(d => d.name === name);
                        return data ? `${name}<br/>森林覆盖率: ${data.value}%` : name;
                    } else if (currentVisualization === 'water') {
                        const data = waterData.find(d => d.name === name);
                        return data ? `${name}<br/>年均降水量: ${data.value}mm` : name;
                    } else if (currentVisualization === 'region') {
                        const region = Object.keys(regionInfo).find(r => {
                            return regionInfo[r].name === name || regionNameMap[name] === r;
                        });
                        if (region) {
                            return `${regionInfo[region].name}<br/>点击查看详情`;
                        }
                        return name;
                    }
                    return name;
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: 'rgba(139, 115, 85, 0.5)',
                borderWidth: 1,
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                padding: 10
            },
            series: [{
                name: '中国地图',
                type: 'map',
                map: 'china',
                roam: true,
                zoom: 1.2,
                itemStyle: {
                    areaColor: '#CCCCCC', // 使用亮灰色作为初始颜色
                    borderColor: '#8B7355',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: {
                        areaColor: 'rgba(139, 115, 85, 0.6)',
                        borderColor: '#6B5D47',
                        borderWidth: 2,
                        shadowColor: 'rgba(139, 115, 85, 0.4)',
                        shadowBlur: 10
                    },
                    label: {
                        show: true,
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                select: {
                    itemStyle: {
                        areaColor: 'rgba(139, 115, 85, 0.8)',
                        borderColor: '#4A3F35',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                data: []
            }]
        };

        try {
            // 先设置初始选项
            console.log('设置地图初始选项');
            mapChart.setOption(option);

            // 绑定地图点击事件
            console.log('绑定地图点击事件');
            mapChart.off('click'); // 移除旧的事件监听器
            mapChart.on('click', function(params) {
                console.log('地图被点击:', params.name);
                const provinceName = params.name;
                const region = provinceToRegion[provinceName];

                if (region) {
                    console.log('找到区域:', region);
                    if (currentMode === 'virtual') {
                        showRegionCard(region);
                    } else {
                        showRegionData(region);
                    }
                } else {
                    console.log('未找到对应区域');
                }
            });

            // 直接应用区域颜色
            console.log('应用区域颜色...');
            const data = [];
            for (const [province, region] of Object.entries(provinceToRegion)) {
                const color = regionColors[region] || '#CCCCCC';
                data.push({
                    name: province,
                    value: 1,
                    itemStyle: {
                        areaColor: color,
                        borderColor: '#8B7355',
                        borderWidth: 1
                    }
                });
            }

            const regionColorOption = {
                series: [{
                    name: '中国地图',
                    type: 'map',
                    map: 'china',
                    roam: true,
                    zoom: 1.2,
                    data: data,
                    emphasis: {
                        itemStyle: {
                            areaColor: function(params) {
                                const region = provinceToRegion[params.name];
                                const colors = {
                                    'northeast': '#2980B9',
                                    'north': '#C0392B',
                                    'east': '#27AE60',
                                    'south': '#D68910',
                                    'central': '#7D3C98',
                                    'west': '#16A085'
                                };
                                return colors[region] || '#CCCCCC';
                            },
                            borderColor: '#6B5D47',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    }
                }]
            };
            mapChart.setOption(regionColorOption);
            console.log('区域颜色应用完成');
        } catch (error) {
            console.error('地图初始化失败:', error);
        }
    }

    // 省份名称到区域的映射
    const provinceToRegion = {
        // 华北
        '北京市': 'north', '天津市': 'north', '河北省': 'north', '山西省': 'north', '内蒙古自治区': 'north',
        // 华南
        '广东省': 'south', '广西壮族自治区': 'south', '海南省': 'south', '香港特别行政区': 'south', '澳门特别行政区': 'south', '台湾省': 'south',
        // 西北
        '陕西省': 'west', '甘肃省': 'west', '青海省': 'west', '宁夏回族自治区': 'west', '新疆维吾尔自治区': 'west', '西藏自治区': 'west',
        // 华东
        '上海市': 'east', '江苏省': 'east', '浙江省': 'east', '安徽省': 'east', '福建省': 'east', '江西省': 'east', '山东省': 'east',
        // 东北
        '辽宁省': 'northeast', '吉林省': 'northeast', '黑龙江省': 'northeast',
        // 华中
        '河南省': 'central', '湖北省': 'central', '湖南省': 'central', '重庆市': 'central', '四川省': 'central', '贵州省': 'central', '云南省': 'central'
    };

    // 6大区域边界多边形数据（更精确的边界点）
    const regionBoundaries = {
        'northeast': [ // 关东霜原 - 东北（黑龙江、吉林、辽宁）
            [118.0, 51.0], [120.0, 51.0], [122.0, 50.0], [124.0, 49.0], [126.0, 47.0], [128.0, 45.0], [130.0, 43.0], [132.0, 44.0], [133.0, 46.0], [134.0, 48.0], [133.0, 50.0], [131.0, 52.0], [128.0, 53.0], [125.0, 53.0], [122.0, 53.0], [120.0, 52.0], [118.0, 51.0]
        ],
        'north': [ // 燕赵之地 - 华北（北京、天津、河北、山西、内蒙古）
            [110.0, 42.0], [112.0, 40.0], [114.0, 40.0], [116.0, 40.0], [118.0, 40.0], [120.0, 40.0], [122.0, 39.0], [121.0, 37.0], [118.0, 36.0], [115.0, 35.0], [112.0, 34.0], [109.0, 35.0], [106.0, 36.0], [104.0, 38.0], [104.0, 40.0], [106.0, 42.0], [108.0, 44.0], [110.0, 43.0], [110.0, 42.0]
        ],
        'east': [ // 江南锦域 - 华东（上海、江苏、浙江、安徽、江西、山东、福建、台湾）
            [114.0, 31.0], [116.0, 32.0], [118.0, 32.0], [120.0, 32.0], [122.0, 31.0], [123.0, 29.0], [124.0, 27.0], [123.0, 25.0], [121.0, 24.0], [119.0, 25.0], [117.0, 26.0], [115.0, 28.0], [114.0, 30.0], [114.0, 31.0]
        ],
        'south': [ // 南粤山海 - 华南（广东、广西、海南、香港、澳门、台湾）
            [108.0, 18.0], [110.0, 20.0], [112.0, 22.0], [114.0, 23.0], [116.0, 23.0], [118.0, 24.0], [119.0, 22.0], [118.0, 20.0], [116.0, 19.0], [114.0, 19.0], [112.0, 19.0], [110.0, 19.0], [108.0, 18.0]
        ],
        'central': [ // 楚泽云川 - 华中（河南、湖北、湖南、重庆、四川、贵州、云南）
            [106.0, 32.0], [108.0, 31.0], [110.0, 30.0], [112.0, 30.0], [114.0, 31.0], [115.0, 30.0], [116.0, 29.0], [116.0, 27.0], [115.0, 25.0], [113.0, 24.0], [111.0, 25.0], [109.0, 26.0], [108.0, 28.0], [107.0, 30.0], [106.0, 31.0], [106.0, 32.0]
        ],
        'west': [ // 云岭高原 - 西北（陕西、甘肃、青海、宁夏、新疆、西藏）
            [80.0, 45.0], [85.0, 42.0], [88.0, 40.0], [90.0, 38.0], [92.0, 36.0], [95.0, 34.0], [98.0, 33.0], [100.0, 31.0], [102.0, 29.0], [104.0, 27.0], [105.0, 25.0], [106.0, 23.0], [105.0, 21.0], [103.0, 22.0], [100.0, 23.0], [98.0, 25.0], [96.0, 27.0], [94.0, 29.0], [92.0, 31.0], [90.0, 33.0], [88.0, 35.0], [85.0, 37.0], [82.0, 39.0], [80.0, 41.0], [80.0, 43.0], [80.0, 45.0]
        ]
    };

    // 区域颜色配置
    const regionColors = {
         'northeast': '#536D61',
        'north': '#864F28',
        'east': '#762E16',
        'south': '#ECA35C',
        'central': '#CFC6BC',
        'west': '#5C5C2D'
    };

    // 区域边界线颜色
    const regionLineColors = {
        'northeast': '#536D61',
        'north': '#864F28',
        'east': '#5C5C2D',
        'south': '#ECA35C',
        'central': '#762E16',
        'west': '#CFC6BC'
    };

    const regionNameMap = {
        'north': '华北地区',
        'south': '华南地区',
        'west': '西北地区',
        'east': '华东地区',
        'northeast': '东北地区',
        'central': '华中地区'
    };

    /**
     * 显示6大区域视图
     */
    function showRegionView() {
        currentVisualization = 'region';
        // 清空省份选中状态
        mapChart.dispatchAction({ type: 'unselect' });

        // 虚拟中国模式：给每个省份填充对应区域颜色
        if (currentMode === 'virtual') {
            // 生成省份数据，每个省份包含其区域颜色
            const data = [];
            for (const [province, region] of Object.entries(provinceToRegion)) {
                const color = regionColors[region] || '#CCCCCC';
                data.push({
                    name: province,
                    value: 1,
                    itemStyle: {
                        areaColor: color,
                        borderColor: '#8B7355',
                        borderWidth: 1
                    }
                });
            }

            // 高亮颜色配置
            const emphasisColors = {
                'northeast': '#2980B9',
                'north': '#C0392B',
                'east': '#27AE60',
                'south': '#D68910',
                'central': '#7D3C98',
                'west': '#16A085'
            };

            mapChart.setOption({
                series: [{
                    name: '中国地图',
                    type: 'map',
                    map: 'china',
                    roam: true,
                    zoom: 1.2,
                    data: data,
                    emphasis: {
                        itemStyle: {
                            areaColor: function(params) {
                                const region = provinceToRegion[params.name];
                                return emphasisColors[region] || '#CCCCCC';
                            },
                            borderColor: '#6B5D47',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    }
                }]
            });
        } else {
            // 智慧守护模式：使用默认颜色
            mapChart.setOption({
                series: [{
                    name: '中国地图',
                    type: 'map',
                    map: 'china',
                    roam: true,
                    zoom: 1.2,
                    itemStyle: {
                        areaColor: '#E0E0E0', // 亮灰色
                        borderColor: '#8B7355',
                        borderWidth: 1
                    },
                    emphasis: {
                        itemStyle: {
                            areaColor: 'rgba(139, 115, 85, 0.6)',
                            borderColor: '#6B5D47',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    },
                    data: []
                }]
            });
        }
    }

    /**
     * 更新地图可视化（省份级别）
     */
    function updateMapVisualization(type) {
        let dataSource = [];
        let min, max;

        if (type === 'forest') {
            dataSource = forestData;
            min = Math.min(...dataSource.map(d => d.value));
            max = Math.max(...dataSource.map(d => d.value));
        } else if (type === 'water') {
            dataSource = waterData;
            min = Math.min(...dataSource.map(d => d.value));
            max = Math.max(...dataSource.map(d => d.value));
        }

        currentVisualization = type;

        // 为每个省份计算颜色
        const data = dataSource.map(item => {
            const ratio = (item.value - min) / (max - min);
            let color;

            if (type === 'forest') {
                // 绿色渐变：从浅绿到深绿
                const colors = [
                    {r: 227, g: 246, b: 234},  // 很浅绿
                    {r: 174, g: 238, b: 213},  // 浅绿
                    {r: 120, g: 230, b: 190},  // 中浅绿
                    {r: 50, g: 205, b: 50},    // 中绿
                    {r: 34, g: 139, b: 34}     // 深绿
                ];
                const index = Math.floor(ratio * (colors.length - 1));
                const selectedColor = colors[Math.min(index, colors.length - 1)];
                color = `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, 0.7)`;
            } else if (type === 'water') {
                // 蓝色渐变：从浅蓝到深蓝
                const colors = [
                    {r: 227, g: 246, b: 250},  // 很浅蓝
                    {r: 174, g: 238, b: 238},  // 浅蓝
                    {r: 79, g: 208, b: 231},   // 中浅蓝
                    {r: 0, g: 154, b: 205},    // 中蓝
                    {r: 0, g: 105, b: 148}     // 深蓝
                ];
                const index = Math.floor(ratio * (colors.length - 1));
                const selectedColor = colors[Math.min(index, colors.length - 1)];
                color = `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, 0.7)`;
            } else {
                color = '#E0E0E0';
            }

            return {
                name: item.name,
                value: item.value,
                itemStyle: {
                    areaColor: color,
                    borderColor: '#8B7355',
                    borderWidth: 1
                }
            };
        });

        mapChart.setOption({
            series: [{
                data: data
            }]
        });
    }

    /**
     * 显示区域信息卡片
     */
    function showRegionCard(regionId) {
        // 隐藏默认卡片
        const defaultCard = document.getElementById('default-card');
        if (defaultCard) {
            defaultCard.classList.remove('active');
        }

        // 隐藏其他区域卡片
        const container = document.getElementById('attractions-container');
        const existingCards = container.querySelectorAll('.info-card');
        existingCards.forEach(card => {
            if (card.id !== `card-${regionId}`) {
                card.classList.remove('active');
            }
        });

        // 创建或显示当前区域卡片
        let card = document.getElementById(`card-${regionId}`);
        if (!card) {
            card = createRegionCard(regionId);
            container.appendChild(card);
        }

        setTimeout(() => {
            card.classList.add('active');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    /**
     * 创建区域卡片
     */
    function createRegionCard(regionId) {
        const info = regionInfo[regionId];
        if (!info) return null;

        const card = document.createElement('div');
        card.className = 'info-card region-card';
        card.id = `card-${regionId}`;
        card.innerHTML = `
            <div class="card-image">
                <img src="../../assets/images/${info.image}" alt="${info.name}">
            </div>
            <div class="card-content">
                <h4 class="card-title">${info.title}</h4>
                <p class="card-description">${info.desc}</p>
                <div class="card-highlights">
                    ${info.highlights.map(tag => `<span class="highlight-tag">${tag}</span>`).join('')}
                </div>
                <button class="explore-btn" data-region="${regionId}">景区详情 →</button>
            </div>
        `;

        // 为按钮添加点击事件
        const btn = card.querySelector('.explore-btn');
        if (btn) {
            btn.addEventListener('click', function() {
                const region = this.getAttribute('data-region');
                showSceneryDetail(region);
            });
        }

        return card;
    }

    /**
     * 显示区域数据信息
     */
    function showRegionData(regionId) {
        // 隐藏默认卡片
        const defaultCard = document.getElementById('guardian-default-card');
        if (defaultCard) {
            defaultCard.classList.remove('active');
        }

        const container = document.getElementById('data-cards-container');
        // 移除旧数据
        container.innerHTML = '';

        // 获取数据
        const data = regionData[regionId];

        if (data) {
            const dataDiv = document.createElement('div');
            dataDiv.className = 'region-data active';
            dataDiv.innerHTML = `
                <div class="data-card">
                    <div class="data-icon">🌲</div>
                    <div class="data-label">森林覆盖率</div>
                    <div class="data-value">${data.forest}%</div>
                    <div class="data-trend trend-up">↑ ${data.forest > 30 ? '良好' : '需改善'}</div>
                </div>
                <div class="data-card">
                    <div class="data-icon">☁️</div>
                    <div class="data-label">空气质量</div>
                    <div class="data-value">${regionId === 'north' || regionId === 'west' ? '良' : '优'}</div>
                    <div class="data-trend trend-${regionId === 'north' || regionId === 'west' ? 'stable' : 'up'}">${regionId === 'north' || regionId === 'west' ? '→ 季节性波动' : '↑ 持续优化'}</div>
                </div>
                <div class="data-card">
                    <div class="data-icon">💧</div>
                    <div class="data-label">水质变化</div>
                    <div class="data-value">${data.forest > 30 ? 'Ⅱ类' : 'Ⅳ类'}</div>
                    <div class="data-trend trend-up">↑ ${data.forest > 30 ? '显著提升' : '改善中'}</div>
                </div>
            `;
            container.appendChild(dataDiv);
        }
    }

    // ========== 事件监听 ==========

    // 地图点击事件 - 在createMapChart中绑定

    // 模式切换
    const modeTabs = document.querySelectorAll('.mode-tab');
    modeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            currentMode = mode;

            // 更新标签状态
            modeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 切换模式内容
            const virtualMode = document.getElementById('virtual-mode');
            const guardianMode = document.getElementById('guardian-mode');
            const vizControls = document.getElementById('data-viz-controls');
            const attractionsContainer = document.getElementById('attractions-container');
            const dataCardsContainer = document.getElementById('data-cards-container');

            if (mode === 'virtual') {
                virtualMode.classList.add('active');
                guardianMode.classList.remove('active');
                vizControls.classList.remove('visible');
                attractionsContainer.classList.add('active'); // 显示景区容器
                dataCardsContainer.classList.remove('active'); // 隐藏数据容器
                showRegionView(); // 显示6大区域
            } else {
                guardianMode.classList.add('active');
                virtualMode.classList.remove('active');
                vizControls.classList.add('visible');
                dataCardsContainer.classList.add('active'); // 显示数据容器
                attractionsContainer.classList.remove('active'); // 隐藏景区容器
                showRegionView(); // 智慧模式下默认显示区域
            }
        });
    });

    // 数据可视化按钮
    const vizButtons = document.querySelectorAll('.data-viz-btn');
    vizButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const vizType = this.getAttribute('data-viz');
            vizButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (vizType === 'forest') {
                updateMapVisualization('forest');
            } else if (vizType === 'water') {
                updateMapVisualization('water');
            }
        });
    });

    /**
     * 显示景区详情页（跳转到全屏页面）
     */
    function showSceneryDetail(regionId) {
        // 跳转到全屏景区详情页
        window.location.href = `scenery-detail.html?region=${regionId}`;
    }

    // 地图初始化函数
    function init() {
        console.log('========== 开始初始化地图 ==========');
        console.log('ECharts是否加载:', typeof echarts !== 'undefined');
        console.log('地图数据是否加载:', typeof window.CHINA_MAP_DATA !== 'undefined');
        console.log('地图数据键值对数量:', window.CHINA_MAP_DATA ? Object.keys(window.CHINA_MAP_DATA).length : 0);

        // 默认激活虚拟模式的容器
        const attractionsContainer = document.getElementById('attractions-container');
        if (attractionsContainer) {
            attractionsContainer.classList.add('active');
        }

        initMap();
        // 默认显示华中区域的卡片
        showRegionCard('central');
    }

    // 窗口大小变化时重新调整地图
    window.addEventListener('resize', function() {
        if (mapChart && !mapChart.isDisposed()) {
            mapChart.resize();
        }
    });

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM加载完成，开始初始化');
            init();
        });
    } else {
        console.log('DOM已加载完成，开始初始化');
        init();
    }
});
