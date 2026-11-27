/** 需求核对用的结构化内容。网点介绍、人员与照片来自资料包原件。 */
import real from './real.json'

export type ConfirmItem = {
  id: string
  q: string
  related: string
}

export const confirms: ConfirmItem[] = [
  { id: 'c1', q: '行内数据大屏与互动大屏是两块物理屏还是同一空间两块？', related: '总览 / A / B' },
  { id: 'c2', q: '「三大点位」是独立硬件，还是互动大屏底栏三定位入口？', related: 'C / B' },
  { id: 'c3', q: '笑脸墙是独立魔墙，还是互动大屏内板块？', related: 'C' },
  { id: 'c4', q: '版面三主题是什么？去底栏后版面如何切换（轮播时长）？', related: 'A' },
  { id: 'c5', q: '农商行改制弹窗正文谁提供？', related: 'B1' },
  { id: 'c6', q: '边境县「覆盖人群」等暂编数据谁终核？是否加口径脚注？', related: 'B3' },
  { id: 'c7', q: '账户服务 5 份：目录+详情，还是纯轮播？', related: 'D' },
  { id: 'c8', q: '理财销售人员照片及工号何时提供？', related: 'D-E05' },
  { id: 'c9', q: '拼字是否确定为「云南农商银行」？照片是否显示姓名+职务？', related: '笑脸墙' },
]

export const screenMeta = {
  A: { title: '行内数据大屏', size: '3584 × 1408', note: '改稿：删底栏按钮、丰富数据、去屏内logo、标题右置' },
  B: { title: '金融服务互动大屏', size: '3584 × 2048', note: '云南沙盘 + 六大板块；三维用示意图替代，逻辑可点' },
  C: { title: '三大点位 · 笑脸墙', size: '随点位 / 魔墙', note: '三定位文案 + 魔墙两态（拼logo暂缓）' },
  D: { title: '一楼电子屏公示', size: '按现场屏', note: '原表第4条已拆为5页；按区域排播' },
}

export const depositPanels = [
  {
    title: '活期',
    rows: [
      { term: '活期', rate: '0.05%' },
      { term: '活期', rate: '0.05%' },
    ],
    tip: '保障本息合计50万元以内全额偿付',
  },
  {
    title: '定期',
    rows: [
      { term: '3个月', rate: '0.65%' },
      { term: '6个月', rate: '0.85%' },
      { term: '1年', rate: '0.95%' },
      { term: '1年', rate: '0.65%' },
      { term: '3年', rate: '0.85%' },
      { term: '5年', rate: '0.85%' },
      { term: '3个月', rate: '0.65%' },
      { term: '6个月', rate: '0.85%' },
      { term: '1年', rate: '0.95%' },
    ],
    tip: '保障本息合计50万元以内全额偿付',
  },
  {
    title: '协定存款',
    rows: [{ term: '—', rate: '0.10%' }],
    tip: '保障本息合计50万元以内全额偿付',
  },
  {
    title: '通知存款',
    rows: [
      { term: '1天', rate: '0.10%' },
      { term: '7天', rate: '0.30%' },
      { term: '1天', rate: '0.10%' },
      { term: '7天', rate: '0.30%' },
    ],
    tip: '保障本息合计50万元以内全额偿付',
  },
  {
    title: '结构性存款',
    rows: [{ term: '1年', rate: '0.02%' }],
    tip: '保障本息合计50万元以内全额偿付',
  },
]

export const wealthProducts = [
  {
    series: '农信赢农盈系列',
    name: '农信赢农盈系列30天客户周期型开放式净值型理财产品',
    tag: '滚动周期',
    metrics: [
      { k: '风险等级', v: 'R1' },
      { k: '起购金额', v: '10,000元' },
      { k: '产品亮点', v: '最低持有30天' },
      { k: '收益类型', v: '成立以来年化' },
      { k: '业绩基准', v: '2.1%' },
      { k: '成立以来年化', v: '2.84%' },
      { k: '七日年化', v: '--' },
      { k: '销售状态', v: '在售' },
    ],
  },
  {
    series: '农信赢·金禧系列',
    name: '农信赢·金禧系列“1+1钱包”开放式净值型人民币理财产品',
    tag: '按日申赎',
    metrics: [
      { k: '风险等级', v: 'R1' },
      { k: '起购金额', v: '10,000元' },
      { k: '产品亮点', v: '活钱管理 申赎便利' },
      { k: '收益类型', v: '七日年化' },
      { k: '业绩基准', v: '2.1%' },
      { k: '成立以来年化', v: '2.84%' },
      { k: '七日年化', v: '1.06%' },
      { k: '销售状态', v: '在售' },
    ],
  },
]

export const networkStats = {
  outlets: 2100,
  selfBanks: 2604,
  serviceStations: '1.3万+',
  payPoints: '1.15万+',
  townships: 1962,
  levels: [
    { name: '总行', count: 1 },
    { name: '中心支行', count: 16 },
    { name: '一级支行', count: 114 },
    { name: '支行', count: 1578 },
    { name: '分理处', count: 331 },
    { name: '服务站', count: 60 },
  ],
}

export const realAssets = real

export const specialtyBranches = [
  {
    id: 'dali',
    photo: real.branches.dali,
    name: '大理市农商行营业部',
    short: '大理营业部',
    tag: '百佳示范',
    pin: { left: '45%', top: '43%' },
    text: '全国银行业文明规范服务百佳示范单位，西部地区首家获评百佳的农信网点。以“耕耘苍洱，信守乡愁”为文化内核。',
    facts: [
      { k: '荣誉', v: '全国银行业文明规范服务百佳示范单位' },
      { k: '首位', v: '新标准下西部地区首家获评百佳的农信网点' },
      { k: '文化', v: '耕耘苍洱，信守乡愁' },
      { k: '定位', v: '扎根大理、深耕白州的标杆金融窗口' },
    ],
  },
  {
    id: 'dulong',
    photo: real.branches.dulong,
    name: '怒江农商行贡山独龙江支行',
    short: '独龙江',
    tag: '减贫案例',
    pin: { left: '38%', top: '31%' },
    text: '全国唯一独龙族聚居乡内仅有的实体金融网点。汉语、独龙语双语，整族授信，服务草果、独龙牛等产业。',
    facts: [
      { k: '定位', v: '全国唯一独龙族聚居乡内仅有的实体金融网点' },
      { k: '荣誉', v: '支部 2026 年获全国先进基层党组织' },
      { k: '服务', v: '汉语、独龙语双语；背包精神、三水精神' },
      { k: '授信', v: '率先实现独龙族整族授信' },
      { k: '产业', v: '草果、独龙牛' },
      { k: '挂牌', v: '2010年11月24日，当地长期唯一金融机构' },
      { k: '服务人群', v: '4000余名独龙族同胞' },
      { k: '整族授信', v: '2019年，39天完成' },
      { k: '民族', v: '我国28个人口较少民族、云南9个直过民族之一' },
      { k: '带动产业', v: '草果、重楼、羊肚菌、独龙牛、独龙鸡、文旅' },
    ],
  },
  {
    id: 'hekou',
    photo: real.branches.hekou,
    name: '河口农商行营业部',
    short: '河口',
    tag: '海拔最低',
    pin: { left: '63.5%', top: '66%' },
    text: '地处云南海拔最低的河谷国门，紧邻河口口岸，服务边民互市、跨境商贸和口岸物流。',
    facts: [
      { k: '区位', v: '云南海拔最低的河谷国门' },
      { k: '口岸', v: '紧邻河口口岸' },
      { k: '业态', v: '边民互市、跨境商贸、口岸物流' },
      { k: '作用', v: '畅通跨境结算，服务沿边开放、兴边富民' },
    ],
  },
  {
    id: 'penglai',
    photo: real.branches.penglai,
    name: '蓬莱信用社',
    short: '蓬莱',
    tag: '云南第一家',
    pin: { left: '58%', top: '49%' },
    text: '1952年成立，是云南省第一家信用合作社，云南农信的星星之火。',
    facts: [
      { k: '时间', v: '1952年' },
      { k: '首位', v: '云南省第一家信用合作社' },
      { k: '地点', v: '宜良蓬莱乡' },
      { k: '意义', v: '云南农信星星之火，信用合作自此在云岭燎原' },
    ],
  },
  {
    id: 'yangla',
    photo: real.branches.yangla,
    name: '迪庆农商行德钦羊拉支行',
    short: '羊拉',
    tag: '海拔最高',
    pin: { left: '47%', top: '27%' },
    text: '坐落于云南北极、滇川藏交界羊拉乡，是全省海拔最高的农信营业网点。',
    facts: [
      { k: '区位', v: '云南北极，滇川藏交界羊拉乡' },
      { k: '海拔', v: '全省海拔最高的农信营业网点' },
      { k: '服务', v: '藏汉双语，上门金融服务' },
      { k: '产业', v: '虫草、畜牧等高原特色产业' },
    ],
  },
]

export const povertyCase = {
  title: '全球减贫案例 · 独龙江',
  paras: [
    '独龙族世居怒江州贡山县独龙江乡。独龙江信用社2010年挂牌，长期是当地唯一金融机构，将现代金融服务送到4000余名独龙族同胞手中。',
    '2019年仅用39天完成独龙族“整族授信”，群众有了“信用身份证”，用于发展草果、重楼、羊肚菌等，并带动独龙牛、文旅等产业。',
  ],
}

export const borderCounties = [
  { name: '沧源', n: 9 },
  { name: '福贡', n: 7 },
  { name: '富宁', n: 17 },
  { name: '耿马', n: 15 },
  { name: '贡山', n: 5 },
  { name: '河口', n: 9 },
  { name: '江城', n: 8 },
  { name: '金平', n: 15 },
  { name: '景洪', n: 19 },
  { name: '澜沧', n: 25 },
  { name: '龙陵', n: 17 },
  { name: '陇川', n: 12 },
  { name: '绿春', n: 11 },
  { name: '孟连', n: 8 },
  { name: '勐海', n: 14 },
  { name: '勐腊', n: 13 },
  { name: '瑞丽', n: 10 },
  { name: '腾冲', n: 18 },
  { name: '畹町/芒市相关', n: 16 },
  { name: '西盟', n: 7 },
  { name: '盈江', n: 14 },
  { name: '元阳', n: 12 },
  { name: '镇康', n: 8 },
  { name: '麻栗坡', n: 11 },
  { name: '其他边境县', n: 10 },
]

export const borderSide = {
  counties: 25,
  branches: 368,
  settlement: '沿边跨境结算累计超638亿元',
  usd: '结算规模8.8亿美元',
  portsNamed: '磨憨、勐满、关累 3 个口岸',
  signedResidents: '签约边民 3192 人',
  merchants: '境内外商家 419 家',
  orders: '累计结算 21.76 万单，总额 17.17 亿元',
  mutual:
    '云南农信充分发挥网点覆盖沿边所有乡镇的渠道布局优势，在天保口岸、畹町口岸、河口口岸、磨憨口岸等20个边民互市点上线了云南农信贸易新业态综合服务系统（支持边民互市、市场采购贸易等），全流程实现自动化数据传输、跨境人民币结算、数据申报等环节，有效提升了边民互市结算效率。',
  /** 边民互市排版：原文拆段，不改事实 */
  mutualBoard: {
    advantage: '充分发挥网点覆盖沿边所有乡镇的渠道布局优势',
    ports: ['天保口岸', '畹町口岸', '河口口岸', '磨憨口岸'],
    portNote: '等 20 个边民互市点已上线',
    system: '云南农信贸易新业态综合服务系统',
    supports: ['边民互市', '市场采购贸易'],
    steps: ['自动化数据传输', '跨境人民币结算', '数据申报'],
    result: '有效提升了边民互市结算效率',
  },
  missing: '边境线长度、覆盖人群：需求列了字段，资料没有数字，不暂编',
  mutualMetrics: [
    { label: '跨境结算', value: '638亿+' },
    { label: '美元规模', value: '8.8亿$' },
    { label: '开通口岸', value: '3', tip: '磨憨·勐满·关累' },
    { label: '签约边民', value: '3192' },
    { label: '境内外商家', value: '419' },
    { label: '结算订单', value: '21.76万', tip: '总额 17.17 亿元' },
  ],
  /** 信贷数据占位：模拟示意，待客户填写正式数 */
  creditPlaceholders: [
    { label: '边境县贷款余额', value: '—', tip: '待客户填写' },
    { label: '边贸企业授信', value: '—', tip: '待客户填写' },
    { label: '惠边 / 安居类产品', value: '—', tip: '待客户填写' },
    { label: '当年累放笔数', value: '—', tip: '待客户填写' },
  ],
}

export const happyVillage = {
  /** 网点、贷款余额为资料数；村数、覆盖人数及产品拆分为实例 */
  villages: 486,
  outlets: 126,
  people: '87.6',
  loan: '264.42',
  products: [
    { label: '兴边富民贷', value: '98.60亿' },
    { label: '民族繁荣贷', value: '86.25亿' },
    { label: '民族团结贷', value: '79.57亿' },
  ],
}

export const revitalization = {
  national: { counties: 27, branches: 487 },
  provincial: { counties: 39, branches: 534 },
  facts: [
    { label: '国家重点帮扶县', value: '27', note: '贷款余额超 1200 亿元' },
    { label: '脱贫人口小额信贷', value: '97%', note: '占全省投放' },
    { label: '农户经济档案', value: '941万户', note: '建档面 95%' },
  ],
}

/** 2026 年版国家和省级重点帮扶县清单，点位按沙盘示意排布 */
export const helpCounties: { name: string; level: 'national' | 'provincial'; n: number; left: number; top: number }[] = [
  { name: '东川', level: 'national', n: 21, left: 58, top: 42 },
  { name: '禄劝', level: 'provincial', n: 21, left: 54, top: 40 },
  { name: '寻甸', level: 'provincial', n: 22, left: 60, top: 44 },
  { name: '昭阳', level: 'national', n: 31, left: 62, top: 32 },
  { name: '鲁甸', level: 'national', n: 14, left: 60, top: 35 },
  { name: '巧家', level: 'national', n: 24, left: 58, top: 37 },
  { name: '镇雄', level: 'national', n: 36, left: 67, top: 31 },
  { name: '彝良', level: 'national', n: 19, left: 64, top: 34 },
  { name: '盐津', level: 'national', n: 15, left: 63, top: 28 },
  { name: '大关', level: 'national', n: 14, left: 61, top: 30 },
  { name: '永善', level: 'national', n: 19, left: 59, top: 27 },
  { name: '威信', level: 'provincial', n: 15, left: 68, top: 28 },
  { name: '绥江', level: 'provincial', n: 7, left: 60, top: 25 },
  { name: '宣威', level: 'national', n: 34, left: 65, top: 40 },
  { name: '会泽', level: 'national', n: 29, left: 62, top: 43 },
  { name: '富源', level: 'provincial', n: 15, left: 67, top: 44 },
  { name: '师宗', level: 'provincial', n: 14, left: 66, top: 48 },
  { name: '施甸', level: 'provincial', n: 17, left: 38, top: 49 },
  { name: '龙陵', level: 'provincial', n: 17, left: 41, top: 46 },
  { name: '武定', level: 'national', n: 16, left: 52, top: 44 },
  { name: '双柏', level: 'provincial', n: 9, left: 50, top: 51 },
  { name: '红河', level: 'national', n: 14, left: 56, top: 60 },
  { name: '元阳', level: 'national', n: 19, left: 58.5, top: 61.5 },
  { name: '金平', level: 'national', n: 15, left: 59.5, top: 65 },
  { name: '绿春', level: 'national', n: 11, left: 57, top: 64 },
  { name: '屏边', level: 'provincial', n: 9, left: 62, top: 62 },
  { name: '马关', level: 'national', n: 19, left: 66, top: 58 },
  { name: '广南', level: 'national', n: 23, left: 68, top: 52 },
  { name: '西畴', level: 'provincial', n: 11, left: 67, top: 56 },
  { name: '麻栗坡', level: 'provincial', n: 16, left: 65, top: 60 },
  { name: '丘北', level: 'provincial', n: 16, left: 64, top: 52 },
  { name: '富宁', level: 'provincial', n: 17, left: 67.5, top: 56 },
  { name: '澜沧', level: 'national', n: 25, left: 45.5, top: 61 },
  { name: '墨江', level: 'provincial', n: 17, left: 51, top: 58 },
  { name: '景东', level: 'provincial', n: 19, left: 46, top: 56 },
  { name: '西盟', level: 'provincial', n: 7, left: 43.5, top: 60 },
  { name: '孟连', level: 'provincial', n: 10, left: 44, top: 63 },
  { name: '江城', level: 'provincial', n: 8, left: 54.5, top: 65.5 },
  { name: '景谷', level: 'provincial', n: 16, left: 48, top: 58 },
  { name: '镇沅', level: 'provincial', n: 12, left: 47, top: 54 },
  { name: '勐腊', level: 'provincial', n: 19, left: 53.5, top: 69 },
  { name: '弥渡', level: 'provincial', n: 11, left: 46, top: 49 },
  { name: '巍山', level: 'provincial', n: 14, left: 44, top: 51 },
  { name: '南涧', level: 'provincial', n: 9, left: 45, top: 53 },
  { name: '洱源', level: 'provincial', n: 11, left: 44, top: 44 },
  { name: '剑川', level: 'provincial', n: 10, left: 43, top: 42 },
  { name: '云龙', level: 'provincial', n: 12, left: 41, top: 46 },
  { name: '永平', level: 'provincial', n: 9, left: 42, top: 49 },
  { name: '梁河', level: 'provincial', n: 10, left: 37, top: 51 },
  { name: '盈江', level: 'provincial', n: 22, left: 38.5, top: 45 },
  { name: '陇川', level: 'provincial', n: 12, left: 38, top: 48 },
  { name: '宁蒗', level: 'national', n: 17, left: 53, top: 34 },
  { name: '永胜', level: 'provincial', n: 19, left: 50, top: 37 },
  { name: '凤庆', level: 'provincial', n: 18, left: 42, top: 54 },
  { name: '永德', level: 'provincial', n: 16, left: 40, top: 57 },
  { name: '镇康', level: 'provincial', n: 9, left: 40.5, top: 53 },
  { name: '耿马', level: 'provincial', n: 15, left: 41.5, top: 55 },
  { name: '沧源', level: 'provincial', n: 9, left: 42, top: 58 },
  { name: '元江', level: 'provincial', n: 14, left: 54, top: 56 },
  { name: '泸水', level: 'national', n: 12, left: 40, top: 38 },
  { name: '福贡', level: 'national', n: 7, left: 39, top: 34 },
  { name: '兰坪', level: 'national', n: 10, left: 43, top: 36 },
  { name: '贡山', level: 'national', n: 5, left: 38.5, top: 30 },
  { name: '香格里拉', level: 'national', n: 17, left: 48, top: 28 },
  { name: '德钦', level: 'national', n: 11, left: 46, top: 24 },
  { name: '维西', level: 'national', n: 10, left: 50, top: 32 },
]

export const overseas = [
  {
    id: 'peers',
    title: '服务境外同业',
    body: '畅通中老、中越结算渠道，除办理自营跨境人民币结算业务外，还承担了连接中国内陆地区与老挝、越南的跨境结算中转行的角色，目前已有越南6家银行、老挝1家银行、缅甸1家银行接入该平台。',
    banks: [
      { label: '越南', value: '6家' },
      { label: '老挝', value: '1家' },
      { label: '缅甸', value: '1家' },
    ],
  },
  {
    id: 'api',
    title: 'API直联接口',
    body: '2025年4月末，云南农信与老挝外贸大众银行联合开发的API直联接口上线，中老跨境资金实现实时结算，进一步提升了跨境资金清算的便捷性、安全性和时效性，受到从事边民互市业务客群和边贸企业的好评。',
    banks: [
      { label: '上线时间', value: '2025年4月末' },
      { label: '对接银行', value: '老挝外贸大众银行' },
      { label: '结算方式', value: '实时结算' },
    ],
  },
]

export const threePositions = [
  {
    id: 'unity',
    title: '民族团结进步示范区',
    pins: [
      { name: '独龙江乡', left: 38, top: 31 },
      { name: '司莫拉佤族村', left: 40, top: 42.5 },
    ],
  },
  {
    id: 'radiate',
    title: '面向南亚东南亚辐射中心',
    pins: [
      { name: '瑞丽', left: 37.5, top: 50 },
      { name: '河口', left: 63.5, top: 66.5 },
      { name: '磨憨', left: 53.5, top: 69 },
    ],
  },
  {
    id: 'ecology',
    title: '生态文明建设排头兵',
    pins: [] as { name: string; left: number; top: number }[],
  },
]

export const smilePeople = real.people.map((p) => ({
  name: p.name,
  city: p.city,
  org: p.org,
  role: `${p.org} · ${p.role}`,
  photo: p.photo,
}))

export const povertyPhoto = real.poverty

export const eScreens = [
  {
    id: 'E01',
    zone: '公众教育区',
    dept: '内控合规部',
    title: '反洗钱法 · 第十条',
    body: '任何单位和个人不得从事洗钱活动或者为洗钱活动提供便利，并应当配合金融机构和特定非金融机构依法开展的客户尽职调查。',
    basis: '非监管强制规定',
    asset: '需求表原文',
  },
  {
    id: 'E02',
    zone: '公众教育区',
    dept: '内控合规部',
    title: '反洗钱法 · 第十一条',
    body: '任何单位和个人发现洗钱活动，有权向反洗钱行政主管部门、公安机关或者其他有关国家机关举报。接受举报的机关应当对举报人和举报内容保密。',
    basis: '非监管强制规定',
    asset: '需求表原文',
  },
  {
    id: 'E03',
    zone: '公众教育区',
    dept: '运行管理部',
    title: '网点反诈宣传',
    body: '银行不会要求您将资金转入“安全账户”；客服不会索要短信验证码；公检法不会在电话里查冻扣；陌生二维码、远程控制、屏幕共享=高风险。咨询96500；被骗拨打96110。',
    basis: '人民银行监管要求',
    asset: '需求表原文',
  },
  {
    id: 'E04-1',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    title: '企业银行账户服务公示',
    body: '展示企业开户服务标准与流程要点（以附件图文为准）。',
    basis: '人民银行监管要求',
    asset: '附件9-1.jpg',
  },
  {
    id: 'E04-2',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    title: '个人银行账户服务公示',
    body: '展示个人开户服务标准与流程要点（原表漏写，已按附件补回）。',
    basis: '人民银行监管要求',
    asset: '附件9-2.jpg',
  },
  {
    id: 'E04-3',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    title: '开户服务规范（负面清单）',
    body: '云南农信银行账户开户服务规范负面清单（名称已按附件纠正）。',
    basis: '人民银行监管要求',
    asset: '附件9-3.docx',
  },
  {
    id: 'E04-4',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    title: '境外人员个人账户开户指引',
    body: '中英双语证件与开户指引。',
    basis: '人民银行监管要求',
    asset: '附件9-4.docx',
  },
  {
    id: 'E04-5',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    title: '个人银行账户服务公示（英文版）',
    body: 'Personal Bank Account Service Publicity',
    basis: '人民银行监管要求',
    asset: '附件9-5.docx',
  },
  {
    id: 'E05',
    zone: '理财销售专区低柜屏',
    dept: '个人金融部',
    title: '理财销售人员照片及工号',
    body: '素材未提供，本页为占位。',
    basis: '内外部管理/监管要求',
    asset: '阻塞：缺名单照片',
    blocked: true,
  },
  {
    id: 'E06',
    zone: '客户体验与互动区',
    dept: '信贷管理部',
    title: '七不准 · 四公开',
    body: '信贷业务七不准 + 服务收费四公开全文公示。',
    basis: '外部监管要求',
    asset: '附件2.docx',
  },
  {
    id: 'E07',
    zone: '客户体验与互动区',
    dept: '信贷管理部',
    title: '明示企业贷款融资成本公告',
    body: '按附件公告样式展示融资成本明示内容。',
    basis: '监管+内部管理',
    asset: '附件3.doc',
  },
  {
    id: 'E08',
    zone: '公众教育区',
    dept: '银行卡中心',
    title: '银行卡安全用卡宣传',
    body: '按附件样式做安全用卡宣传页。',
    basis: '金监局、人行+内部',
    asset: '附件4.doc',
  },
  {
    id: 'E09',
    zone: '客户体验与互动区',
    dept: '银行卡中心',
    title: '信用卡/借记卡章程改版公告',
    body: '按附件样式展示章程改版公告。注意：勿与附件1内「附件9-x」历史编号混淆。',
    basis: '金监局、人行+内部',
    asset: '附件5.doc',
  },
] as const
