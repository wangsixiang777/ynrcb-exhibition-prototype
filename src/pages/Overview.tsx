import { Link } from 'react-router-dom'
import { ChevronRight } from '../components/Icon'
import { screenMeta } from '../data/content'

const base = import.meta.env.BASE_URL

const cards = [
  { to: '/screen-a', key: 'A' as const, img: `${base}mockups/A-data.jpg`, desc: '存款利率、自营理财与版面三。标题右置。' },
  { to: '/screen-b', key: 'B' as const, img: `${base}mockups/B-map.jpg`, desc: '云南沙盘与六大板块：网点、边境、帮扶与境外金融。' },
  { to: '/screen-c', key: 'C' as const, img: `${base}mockups/C-positions.jpg`, desc: '三大定位入口，以及笑脸墙飘动与拼字。' },
  { to: '/screen-d', key: 'D' as const, img: `${base}mockups/D-notice.jpg`, desc: '一楼电子屏公示目录，账户服务已拆为 5 页。' },
]

export function Overview() {
  return (
    <div className="overview">
      <section>
        <div className="overview-kicker">Yunnan Rural Commercial Bank</div>
        <h1>展陈交互原型</h1>
        <p className="lead">按 1920×1080 预览。暖白底、农商红、淡金细线，用于核对结构、路径和数据字段。</p>
      </section>
      <div className="entry-grid">
        {cards.map((c) => (
          <Link key={c.key} to={c.to} className="entry-card">
            <img src={c.img} alt={`${screenMeta[c.key].title}首页`} />
            <div className="copy">
              <div className="idx">SCREEN {c.key}</div>
              <h2>{screenMeta[c.key].title}</h2>
              <p>{c.desc}</p>
              <span className="go">
                进入核对
                <ChevronRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
