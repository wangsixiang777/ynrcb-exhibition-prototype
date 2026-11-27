import { Link } from 'react-router-dom'
import { screenMeta } from '../data/content'

const cards = [
  {
    to: '/screen-a',
    key: 'A' as const,
    desc: '存款利率、自营理财与版面三。标题右置、无屏内 logo、无底栏切换按钮。',
  },
  {
    to: '/screen-b',
    key: 'B' as const,
    desc: '云南沙盘 + 六大板块：网点分布、特色网点、边境县、幸福村、帮扶县、境外金融。',
  },
  {
    to: '/screen-c',
    key: 'C' as const,
    desc: '三大定位入口，以及笑脸墙飘动 / 拼字两态（拼 logo 暂缓）。',
  },
  {
    to: '/screen-d',
    key: 'D' as const,
    desc: '一楼电子屏按区域浏览；账户服务已拆为 5 页，缺素材项已标出。',
  },
]

export function Overview() {
  return (
    <div className="overview">
      <section className="overview-hero">
        <div className="overview-kicker">Yunnan Rural Commercial Bank</div>
        <h1>展陈交互原型</h1>
        <p className="lead">
          用于与甲方核对屏幕结构、交互路径与每页数据字段。视觉按金暖展陈方向；沙盘以示意图表达逻辑。
        </p>
      </section>

      <div className="entry-grid">
        {cards.map((c) => (
          <Link key={c.key} to={c.to} className="entry-card">
            <div>
              <div className="idx">SCREEN {c.key}</div>
              <h2>{screenMeta[c.key].title}</h2>
              <div className="size">{screenMeta[c.key].size}</div>
              <p>{c.desc}</p>
            </div>
            <span className="go">进入核对 →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
