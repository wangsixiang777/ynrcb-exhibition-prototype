export type NoticeBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'rows'; rows: { k: string; v: string }[] }
  | { kind: 'poster'; src: string; alt: string }

export type EScreen = {
  id: string
  zone: '客户体验与互动区'
  dept: string
  basis: string
  title: string
  blocks: NoticeBlock[]
}

export const eNotices: EScreen[] = [
  {
    id: 'E04-1',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    basis: '人民银行监管要求',
    title: '企业银行账户服务公示',
    blocks: [
      { kind: 'poster', src: 'notices/enterprise.jpg', alt: '企业银行账户服务公示' },
      { kind: 'h', text: '服务标准' },
      { kind: 'p', text: '我社为企业法人、非法人企业、个体工商户提供开立企业账户服务，审核开户证明文件的真实性、完整性、有效性和合规性，以及开户意愿的真实性。开户申请人应与身份证明文件所属人一致，并对开立基本存款账户唯一性进行审核。' },
      { kind: 'h', text: '开户证明文件清单' },
      { kind: 'rows', rows: [
        { k: '基本存款账户', v: '营业执照；法定代表人有效身份证件。小微企业凭以上材料可以办理简易开户。' },
        { k: '一般存款账户', v: '营业执照；法定代表人有效身份证件；基本存款账户开户许可证或信息表；借款合同或办理其他结算需要说明。' },
        { k: '授权非法定代表人', v: '还需提供授权书和经办人有效身份证件。' },
        { k: '辅助性证明文件', v: '其他可证明企业注册、办公、经营等信息的材料，由企业自愿提供。' },
        { k: '反洗钱身份识别', v: '公司章程；控股股东、最终受益人有效身份证件；大额联系人有效身份证件。' },
      ] },
      { kind: 'h', text: '资费标准' },
      { kind: 'p', text: '50元人民币/户（暂免）。服务价格发生变化时，以我社最新的公示服务价格目录为准。' },
      { kind: 'h', text: '办理时限' },
      { kind: 'p', text: '满足开户条件的，3个工作日内完成开户（从预约开户之日起至完成账户开立）。企业账户自正式开立之日起可办理资金收付业务。' },
      { kind: 'h', text: '服务监督电话' },
      { kind: 'p', text: '云南农信服务热线 96500。人民银行昆明中心支行服务电话 0871-63212786、63212285。' },
    ],
  },
  {
    id: 'E04-2',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    basis: '人民银行监管要求',
    title: '个人银行账户服务公示',
    blocks: [
      { kind: 'poster', src: 'notices/personal.jpg', alt: '个人银行账户服务公示' },
      { kind: 'h', text: '服务标准' },
      { kind: 'p', text: '我社为个人客户提供便捷安全的开户服务。申请人须提供本人有效身份证件，我社对其真实性、有效性、合规性以及账户开户用途审查后即可办理。' },
      { kind: 'h', text: '有效身份证件' },
      { kind: 'list', items: [
        '境内已登记常住户口的中国公民：居民身份证；不满十六周岁的，可使用居民身份证或户口簿。',
        '香港、澳门居民：港澳居民来往内地通行证或港澳居民居住证。',
        '台湾居民：台湾居民来往大陆通行证或台湾居民居住证。',
        '定居国外的中国公民：中国护照。',
        '外国公民：护照或外国人永久居留证。外国边民按照边贸结算有关规定办理。',
        '法律、行政法规规定的其他身份证明文件。',
        '紧急和必要时，可以使用临时居民身份证在本社柜面开立个人账户。',
      ] },
      { kind: 'h', text: '资费标准' },
      { kind: 'list', items: [
        '免收个人储蓄账户开户和销户费。',
        '免收个人银行结算账户开户和销户费。',
        '服务价格发生变化时，以我社最新公示的服务价格目录为准。',
      ] },
      { kind: 'p', text: '依据《商业银行服务价格管理办法》《商业银行收费行为执法指南》及国务院价格主管部门、人民银行、原银保监会等规定，结合业务实际制定《云南农信服务收费标准》。以上为 2021 年版个人开户相关收费标准。' },
      { kind: 'h', text: '办理时限' },
      { kind: 'p', text: '符合开立条件的客户，申请当日即可完成个人账户开立，该账户自开立之日起即可办理业务。' },
      { kind: 'h', text: '服务监督电话' },
      { kind: 'p', text: '云南农信服务热线 96500。人民银行昆明中心支行服务电话 0871-63212786、63212285。' },
    ],
  },
  {
    id: 'E04-3',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    basis: '人民银行监管要求',
    title: '账户开户服务规范（负面清单）',
    blocks: [
      { kind: 'p', text: '人民银行昆明中心支行发布银行账户开户负面清单，规范银行在为小微企业提供开户服务时可能出现的明显不合理行为。清单列明四大类、共 14 项。' },
      { kind: 'h', text: '开户条件' },
      { kind: 'list', items: [
        '不得将存入大额存款、达到一定经营规模或绑定销售相关产品及服务作为开户条件。',
        '不得将相关产品或服务绑定销售与开户成功率挂钩。',
        '不得将已经实际开展经营活动作为初创企业开立基本账户的条件。',
        '不得将法定代表人必须至网点亲见亲签作为开户条件。',
        '不得将拥有固定的专门营业场所作为开户条件。',
      ] },
      { kind: 'h', text: '开户资料' },
      { kind: 'list', items: [
        '不得要求初创或小微企业提供与建立已久或大型企业同样详细、完备的经营情况资料。',
        '不得简单、片面要求户籍地为异地的个人提供辅助身份证明资料。',
      ] },
      { kind: 'h', text: '开户审核与尽职调查' },
      { kind: 'list', items: [
        '不得因授信业务尽职调查影响开户尽职调查时间和结果。',
        '不得以预留印鉴启用等银行内部流程影响账户即开即用。',
        '不得通过设置复杂繁琐的开户审核或尽职调查程序规避事中事后风险管理责任。',
      ] },
      { kind: 'h', text: '拒绝开户理由' },
      { kind: 'list', items: [
        '不得以集中登记地作为注册地址、以自有或租赁房屋作为经营地址、办公物料较为简单、雇佣人员较少等理由拒绝开户。',
        '不得简单以企业为异地注册、法定代表人居住地为异地等原因拒绝开户。',
        '不得简单、片面套用可疑特征拒绝开户。',
        '不得以账户风险防控为名，实际上出于客户成本收益等其他因素拒绝开户。',
      ] },
    ],
  },
  {
    id: 'E04-4',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    basis: '人民银行监管要求',
    title: '境外人员个人账户开户指引',
    blocks: [
      { kind: 'p', text: 'Guide for Foreign Individuals to Open a Private Account' },
      { kind: 'h', text: '01 办理个人开户需要携带的材料' },
      { kind: 'list', items: [
        '香港、澳门特别行政区居民：来往内地通行证或港澳居民居住证。',
        '台湾地区居民：台湾居民来往大陆通行证或台湾居民居住证。',
        '外国公民：外国人永久居留身份证或护照。',
      ] },
      { kind: 'p', text: '因工作或学习等原因长期居住在中国境内的，建议同时提供工作证明、收入证明或学生证，以提升开户审核效率。' },
      { kind: 'h', text: '02 开户流程' },
      { kind: 'p', text: '携带上述材料，到云南农信网点按需填写开户申请书，签署相关产品协议并提供个人信息授权。审核完毕后完成开户。' },
      { kind: 'h', text: '03 办理时限' },
      { kind: 'p', text: '请配合完成身份识别和尽职调查。开户理由合理，资料真实、完整、合规的，原则上当时即可完成开户。' },
      { kind: 'h', text: '04 温馨提示' },
      { kind: 'p', text: '我社按照账户分类分级管理要求，根据身份、职业、年龄、交易等特征，提供与账户风险等级相匹配的账户功能，并可根据正常合理需求或临时需求动态调整。' },
      { kind: 'p', text: '服务监督热线 Service Supervision Hot-line：96500' },
    ],
  },
  {
    id: 'E04-5',
    zone: '客户体验与互动区',
    dept: '运行管理部',
    basis: '人民银行监管要求',
    title: '个人银行账户服务公示（英文）',
    blocks: [
      { kind: 'h', text: 'Service Standards' },
      { kind: 'p', text: 'Our company provides convenient and secure account opening services for individual customers. The applicant must provide valid identification documents. The company reviews authenticity, validity, compliance, and intended use before processing.' },
      { kind: 'h', text: 'Valid identification documents' },
      { kind: 'list', items: [
        'Resident identification for Chinese citizens with registered permanent residence in China. Those under 16 may use resident identification or household registration.',
        'Mainland Travel Permit or Residence Permit for Hong Kong and Macau residents.',
        'Mainland Travel Permit or Residence Permit for Taiwan residents.',
        'Chinese passport for Chinese citizens residing abroad.',
        'Passport or permanent residence permit for foreign citizens. Border residents follow border trade settlement regulations.',
        'Other identity documents specified by laws and regulations.',
        'In urgent and necessary situations, a temporary resident identification may be used at the branch.',
      ] },
      { kind: 'h', text: 'Expenses Standards' },
      { kind: 'list', items: [
        'No fees for opening and closing personal savings accounts.',
        'No fees for opening and closing personal settlement accounts.',
        'If service prices change, the latest publicly announced service price catalog prevails.',
      ] },
      { kind: 'p', text: 'The 2021 edition of Yunnan Rural Credit Cooperatives Service Fee Standards applies to personal account opening, and is updated with business development and regulatory pricing rules.' },
      { kind: 'h', text: 'Processing Time' },
      { kind: 'p', text: 'For eligible customers, a personal account can be opened on the day of application and used from the opening date.' },
      { kind: 'h', text: 'Service Supervision Hot-line' },
      { kind: 'p', text: 'Yunnan Rural Credit Cooperatives: 96500. Branch and legal-entity telephone numbers are filled in by the outlet.' },
    ],
  },
  {
    id: 'E06',
    zone: '客户体验与互动区',
    dept: '信贷管理部',
    basis: '外部监管要求',
    title: '七不准、四公开',
    blocks: [
      { kind: 'p', text: '国家金融监督管理总局“七不准、四公开”' },
      { kind: 'h', text: '信贷业务“七不准”' },
      { kind: 'list', items: [
        '不准以贷转存。坚持实贷实付和受托支付，不得强制或约定将部分贷款转为存款。',
        '不准存贷挂钩。贷款业务和存款业务严格分离，不得以存款作为审批和发放贷款的前提。',
        '不准以贷收费。不得借发放贷款或提供融资之机，要求客户接受不合理中间业务或其他服务并收费。',
        '不准浮利分费。严格区分收息和收费，不得将利息分解为费用，不得变相提高利率。',
        '不准借贷搭售。不得在发放贷款或提供融资时强制捆绑、搭售理财、保险、基金等产品。',
        '不准一浮到顶。贷款定价应反映资金、风险和管理成本，不得笼统上浮至最高限额。',
        '不准转嫁成本。尽职调查、押品评估等相关成本由银行依法承担，不得以费用形式转嫁给客户。',
      ] },
      { kind: 'h', text: '服务收费“四公开”' },
      { kind: 'list', items: [
        '合规收费：收费项目公开。同一收费项目使用统一名称和要素，由法人机构统一定价；政府指导价据实收费并公布依据，市场调节价调整前公示并上网公布。',
        '以质定价：服务质价公开。未提供实质性服务、未带来实质性收益或效率提升的，不得收费。',
        '公开透明：效用功能公开。服务必须明码标价，告知内容、方式、功能、效果和收费标准。',
        '减费让利：优惠政策公开。明确小微企业、“三农”、弱势群体、社会公益等领域的优惠对象、方式及额度。',
      ] },
    ],
  },
  {
    id: 'E07',
    zone: '客户体验与互动区',
    dept: '信贷管理部',
    basis: '外部监管要求及内部管理要求',
    title: '明示企业贷款融资成本的公告',
    blocks: [
      { kind: 'p', text: '为落实党的二十届三中全会和中央金融工作会议精神，按照人民银行关于开展明示企业贷款综合融资成本工作的部署，我行已开展相关工作。现公告如下：' },
      { kind: 'list', items: [
        '自 2026 年 4 月 30 日起，新发放企业贷款、小微企业主贷款及个体工商户经营性贷款，在签订贷款合同时，需与我行共同填写《企业贷款综合融资成本清单》。',
        '清单列明贷款利息支出和各项非利息支出，便于企业知悉全部成本，保障知情权，约束不规范收费。',
        '清单仅作为明示综合融资成本的参考，不影响授信审批，不作为贷款要素的确认或约定。实际融资成本可能因贷款行为变动而与明示成本不同，不影响正常履约。',
      ] },
      { kind: 'p', text: '云南农村商业银行' },
      { kind: 'p', text: '20XX年XX月XX日' },
    ],
  },
  {
    id: 'E09',
    zone: '客户体验与互动区',
    dept: '银行卡中心',
    basis: '金监局、人民银行及内部管理要求',
    title: '信用卡、借记卡章程改版公告',
    blocks: [
      { kind: 'p', text: '为提供更为优质的服务，我行对现行《云南农村商业银行股份有限公司信用卡/借记卡章程（20XX版）》进行了修订，形成新《章程》，现予公告。' },
      { kind: 'p', text: '新《章程》自 20XX 年 X 月 X 日起正式生效。我行此前及此后发行的信用卡、借记卡均适用新《章程》。' },
      { kind: 'p', text: '若有疑问，请拨打客户服务热线 96500。' },
      { kind: 'p', text: '附件：《云南农村商业银行股份有限公司信用卡/借记卡章程（20XX版）》' },
      { kind: 'p', text: '云南农村商业银行股份有限公司' },
    ],
  },
]
