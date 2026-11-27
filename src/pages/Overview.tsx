import { Link } from 'react-router-dom'
import { screenMeta } from '../data/content'

const base = import.meta.env.BASE_URL

const cards = [
  {
    to: '/screen-a',
    key: 'A' as const,
    img: `${base}mockups/A-data.jpg`,
    desc: '存款利率、自营理财与版面三。标题右置、无屏内 logo。',
  },
  {
    to: '/screen-b',
    key: 'B' as const,
    img: `${base}mockups/B-map.jpg`,
    desc: '云南沙盘 + 六大板块：网点分布、特色网点、边境县、幸福村、帮扶县、境外金融。',
  },
  {
    to: '/screen-c',
    key: 'C' as const,
    img: `${base}mockups/C-positions.jpg`,
    desc: '三大定位入口，以及笑脸墙飘动 / 拼字两态。',
  },
  {
    to: '/screen-d',
    key: 'D' as const,
    img: `${base}mockups/D-notice.jpg`,
    desc: '一楼电子屏按区域浏览；账户服务已拆为 5 页。',
  },
]

export function Overview() {
  return (
    <div className="overview">
      <section className="overview-hero">
        <div className="overview-kicker">Yunnan Rural Commercial Bank</div>
        <h1>展陈交互原型</h1>
        <p className="lead">
          当前为新版首页效果：暖白底、农商红、淡金细线。点进各屏可继续核对交互与数据。
        </p>
      </section>

      <div className="entry-grid">
        {cards.map((c) => (
          <Link key={c.key} to={c.to} className="entry-card shot-card">
            <img src={c.img} alt={`${screenMeta[c.key].title}首页`} />
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
