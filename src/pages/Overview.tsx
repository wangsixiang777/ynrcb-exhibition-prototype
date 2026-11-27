import { Link } from 'react-router-dom'
import { screenMeta } from '../data/content'

const cards = [
  {
    to: '/screen-a',
    key: 'A' as const,
    desc: '存款利率 / 自营理财 / 版面三占位。体现改稿：无底栏、无屏内logo、标题右置、数据面板。',
  },
  {
    to: '/screen-b',
    key: 'B' as const,
    desc: '六大板块可切换：网点分布、特色网点、边境县、幸福村、帮扶县、境外金融。沙盘用示意图。',
  },
  {
    to: '/screen-c',
    key: 'C' as const,
    desc: '三个定位入口页 + 笑脸墙飘动/拼字两态。拼logo标记暂缓。',
  },
  {
    to: '/screen-d',
    key: 'D' as const,
    desc: '电子屏按区域目录；原表第4条拆为E04-1～5；E05素材阻塞已标红。',
  },
]

export function Overview() {
  return (
    <div className="overview">
      <h1>展陈内容交互原型 · 需求核对</h1>
      <p className="lead">
        本原型用于和甲方确认：有几块屏、每屏信息架构、交互路径、每页要展示的数据字段。
        视觉为金暖 HUD 高保真方向稿；地图三维以生成示意图替代，逻辑与文案可完整走查。
      </p>

      <div className="logic-note" style={{ marginBottom: 18 }}>
        使用方式：上方导航进入各屏 → 屏内按钮切换板块/页面 → 右上「待确认」查看未决问题。
        设计分辨率会自动缩放到当前窗口。
      </div>

      <div className="card-grid">
        {cards.map((c) => (
          <Link key={c.key} to={c.to} className="panel entry-card">
            <span className="tag">屏 {c.key}</span>
            <h2>{screenMeta[c.key].title}</h2>
            <div className="stat-num" style={{ fontSize: 14 }}>
              {screenMeta[c.key].size}
            </div>
            <p>{c.desc}</p>
            <p style={{ color: 'var(--gold-200)' }}>{screenMeta[c.key].note}</p>
            <span className="gold-btn" style={{ alignSelf: 'flex-start' }}>
              进入核对
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
