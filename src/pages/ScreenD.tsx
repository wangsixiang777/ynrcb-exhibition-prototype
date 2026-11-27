import { useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import { eScreens, screenMeta } from '../data/content'

const zones = ['全部', '公众教育区', '客户体验与互动区', '理财销售专区低柜屏'] as const

export function ScreenD() {
  const [zone, setZone] = useState<(typeof zones)[number]>('全部')
  const [id, setId] = useState<string>(eScreens[0].id)
  const list = useMemo(
    () => eScreens.filter((e) => zone === '全部' || e.zone === zone),
    [zone],
  )
  const current = eScreens.find((e) => e.id === id) ?? list[0]

  return (
    <Stage
      width={2880}
      height={1620}
      title={screenMeta.D.title}
      sizeLabel={screenMeta.D.size}
      hint="左侧目录，右侧详情。原表第4条已拆为 E04-1～5；附件「9-x」为历史编号。"
    >
      <div className="hud" style={{ padding: 36, display: 'grid', gridTemplateColumns: '720px 1fr', gap: 20 }}>
        <aside className="glass" style={{ padding: 18, display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 14, minHeight: 0 }}>
          <div className="title-cn" style={{ fontSize: 28 }}>公示目录</div>
          <div className="seg" style={{ flexWrap: 'wrap', borderRadius: 16 }}>
            {zones.map((z) => (
              <button key={z} type="button" className={zone === z ? 'is-active' : undefined} onClick={() => setZone(z)}>
                {z === '理财销售专区低柜屏' ? '理财低柜' : z.replace('与互动区', '')}
              </button>
            ))}
          </div>
          <div style={{ overflow: 'auto', display: 'grid', gap: 8, alignContent: 'start' }}>
            {list.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setId(e.id)}
                className={current.id === e.id ? 'btn-primary' : 'btn-ghost'}
                style={{
                  height: 'auto',
                  minHeight: 56,
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  padding: '12px 14px',
                  display: 'grid',
                  gap: 4,
                }}
              >
                <span style={{ fontWeight: 700 }}>
                  {e.id} · {e.title}
                  {'blocked' in e && e.blocked ? ' · 缺素材' : ''}
                </span>
                <span style={{ fontSize: 12, opacity: 0.75 }}>{e.zone}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="glass-strong" style={{ padding: 32, display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="chip">{current.id}</span>
                {'blocked' in current && current.blocked ? <span className="chip danger">阻塞</span> : null}
              </div>
              <h2 className="title-cn" style={{ fontSize: 40, margin: '12px 0 0' }}>{current.title}</h2>
            </div>
            <div style={{ textAlign: 'right', fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
              <div>{current.dept}</div>
              <div>{current.zone}</div>
              <div>{current.basis}</div>
            </div>
          </div>

          <div
            style={{
              padding: 28,
              borderRadius: 16,
              border: '1px solid var(--line)',
              background: 'rgba(255,248,232,0.04)',
              fontSize: 26,
              lineHeight: 1.8,
              color: 'var(--cream)',
            }}
          >
            {current.body}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="glass" style={{ padding: 16 }}>
              <div style={{ color: 'var(--gold)', fontSize: 14 }}>素材</div>
              <div style={{ marginTop: 8, fontSize: 18, color: 'var(--muted)' }}>{current.asset}</div>
            </div>
            <div className="glass" style={{ padding: 16 }}>
              <div style={{ color: 'var(--gold)', fontSize: 14 }}>建议形态</div>
              <div style={{ marginTop: 8, fontSize: 18, color: 'var(--muted)' }}>
                教育区海报轮播；体验区目录 + 详情
              </div>
            </div>
          </div>
        </section>
      </div>
    </Stage>
  )
}
