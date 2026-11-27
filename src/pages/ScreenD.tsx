import { useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import { eScreens, screenMeta } from '../data/content'

const zones = ['全部', '公众教育区', '客户体验与互动区', '理财销售专区低柜屏'] as const

export function ScreenD() {
  const [zone, setZone] = useState<(typeof zones)[number]>('全部')
  const [id, setId] = useState<string>(eScreens[0].id)
  const list = useMemo(() => eScreens.filter((e) => zone === '全部' || e.zone === zone), [zone])
  const current = eScreens.find((e) => e.id === id) ?? list[0]

  return (
    <Stage title={screenMeta.D.title} hint="预览 1920×1080 · 原表第 4 条已拆为 E04-1 至 E04-5">
      <div className="board board-d">
        <aside className="glass d-list">
          <h2 className="title-cn">公示目录</h2>
          <div className="seg" style={{ flexWrap: 'wrap' }}>
            {zones.map((z) => (
              <button key={z} type="button" className={zone === z ? 'is-active' : undefined} onClick={() => setZone(z)}>
                {z === '理财销售专区低柜屏' ? '理财低柜' : z === '客户体验与互动区' ? '体验区' : z}
              </button>
            ))}
          </div>
          <div className="d-items">
            {list.map((e) => (
              <button key={e.id} type="button" className={current.id === e.id ? 'btn-primary' : 'btn-ghost'} onClick={() => setId(e.id)}>
                <span>{e.id} · {e.title}{'blocked' in e && e.blocked ? ' · 缺素材' : ''}</span>
                <small>{e.zone}</small>
              </button>
            ))}
          </div>
        </aside>
        <section className="glass d-detail">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <span className="chip">{current.id}</span>
              {'blocked' in current && current.blocked ? <span className="chip danger" style={{ marginLeft: 6 }}>阻塞</span> : null}
              <h2 className="title-cn">{current.title}</h2>
            </div>
            <div className="d-meta">
              <div>{current.dept}</div>
              <div>{current.zone}</div>
              <div>{current.basis}</div>
            </div>
          </div>
          <div className="d-body">{current.body}</div>
          <div className="d-foot">
            <div className="glass"><b>素材</b>{current.asset}</div>
            <div className="glass"><b>建议形态</b>教育区海报轮播；体验区目录加详情</div>
          </div>
        </section>
      </div>
    </Stage>
  )
}
