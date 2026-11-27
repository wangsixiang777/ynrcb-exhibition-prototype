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
      { term: '3年', rate: '0.85%' },
      { term: '5年', rate: '0.85%' },
    ],
    tip: '保障本息合计50万元以内全额偿付',
  },
  {
    title: '协定 / 通知',
    rows: [
      { term: '协定存款', rate: '0.10%' },
      { term: '1天通知', rate: '0.10%' },
      { term: '7天通知', rate: '0.30%' },
    ],
    tip: '保障本息合计50万元以内全额偿付',
  },
  {
    title: '结构性存款',
    rows: [{ term: '1年', rate: '0.02%' }],
    tip: '结构性存款收益具有不确定性，请详询网点',
  },
]

export const wealthProducts = [
  { name: '安鑫系列 · 示例产品A', term: '90天', risk: 'R2', rate: '2.1%~2.6%' },
  { name: '安鑫系列 · 示例产品B', term: '180天', risk: 'R2', rate: '2.3%~2.8%' },
  { name: '增利系列 · 示例产品C', term: '365天', risk: 'R3', rate: '业绩比较基准示意' },
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
    tag: '百佳示范',
    text: '全国银行业文明规范服务百佳示范单位，西部地区首家获评百佳的农信网点。以“耕耘苍洱，信守乡愁”为文化内核，打造有民族底蕴、生态底色、农信温度的标杆金融窗口。',
  },
  {
    id: 'dulong',
    photo: real.branches.dulong,
    name: '独龙江信用社',
    tag: '减贫案例',
    text: '全国唯一独龙族聚居乡内仅有的实体金融网点。传承“三水”精神，双语服务，整族授信，赋能草果、独龙牛等特色产业。2019年39天完成整族授信。',
  },
  {
    id: 'hekou',
    photo: real.branches.hekou,
    name: '河口信用社',
    tag: '海拔最低',
    text: '地处云南海拔最低河谷国门，紧邻河口口岸，服务边民互市、跨境商贸、口岸物流，畅通跨境结算，助力沿边开放、兴边富民。',
  },
  {
    id: 'penglai',
    photo: real.branches.penglai,
    name: '蓬莱信用社',
    tag: '云南第一家',
    text: '1952年云南省第一家信用合作社——宜良蓬莱乡信用社诞生，是云南农信星星之火。老一辈农信人肩背帆布包、手持算盘，开启深耕乡土征程。',
  },
  {
    id: 'yangla',
    photo: real.branches.yangla,
    name: '羊拉信用社',
    tag: '海拔最高',
    text: '坐落于云南北极、滇川藏交界羊拉乡，全省海拔最高农信网点。藏汉双语服务，上门金融服务，助力虫草、畜牧等高原特色产业。',
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
  mutual: '天保、畹町、河口、磨憨等 20 个边民互市点已上线贸易新业态综合服务系统',
  missing: '边境线长度、覆盖人群：需求列了字段，资料没有数字，不暂编',
}

export const happyVillage = {
  outlets: 126,
  loan: '264.42亿元',
  missing: '幸福村总数、覆盖人数：需求列了字段，清单只给了营业网点 126 个。民族系列产品没有分项表。',
}

export const revitalization = {
  national: { counties: 27, branches: 487, tip: '国家重点帮扶县贷款余额超1200亿元' },
  provincial: { counties: 39, branches: 534, tip: '投放全省97%脱贫人口小额信贷；建档农户941万户，建档面95%' },
}

export const overseas = [
  {
    id: 'peers',
    title: '服务境外同业',
    body: '畅通中老、中越结算渠道，承担连接中国内陆与老挝、越南的跨境结算中转行角色。目前越南6家、老挝1家、缅甸1家银行接入平台。',
  },
  {
    id: 'api',
    title: 'API直联接口',
    body: '2025年4月末，与老挝外贸大众银行联合开发的API直联接口上线，中老跨境资金实现实时结算，提升便捷性、安全性与时效性。',
  },
]

export const threePositions = [
  {
    id: 'unity',
    title: '民族团结进步示范区',
    points: [
      '整村授信 / 多民族整族授信',
      '民族系列信贷产品（兴边富民贷、民族繁荣贷、民族团结贷等）',
      '双语服务；2100网点、2604自助银行',
    ],
  },
  {
    id: 'ecology',
    title: '生态文明建设排头兵',
    points: [
      '绿色金融指引与行动计划',
      '碳汇质押、碳减排贷款、取水权质押等创新',
      '绿色信贷风险分类与一票否决',
    ],
  },
  {
    id: 'radiate',
    title: '面向南亚东南亚辐射中心',
    points: [
      '42家法人行社外汇资质，覆盖27个口岸',
      '边民互市全流程电子化',
      '多场景沿边金融平台 + API直联',
    ],
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
