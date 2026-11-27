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
    <Stage width={2880} height={1620} label={screenMeta.D.title} note={screenMeta.D.note}>
      <div className="hud-screen" style={{ padding: 40, display: 'grid', gridTemplateColumns: '760px 1fr', gap: 20 }}>
        <div className="panel" style={{ padding: 18, overflow: 'auto' }}>
          <div className="hud-title" style={{ fontSize: 28, marginBottom: 12 }}>电子屏目录</div>
          <div className="logic-note" style={{ marginBottom: 14 }}>
            原表序号问题：第4条企业公示重复、漏个人版；附件文件夹内「附件9-x」为历史编号，对应本表 E04
            组，不是第9条。
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {zones.map((z) => (
              <button key={z} type="button" className={zone === z ? 'gold-btn' : 'ghost-btn'} onClick={() => setZone(z)}>
                {z}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {list.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setId(e.id)}
                className={current.id === e.id ? 'gold-btn' : 'ghost-btn'}
                style={{ textAlign: 'left', display: 'grid', gap: 4 }}
              >
                <span>
                  {e.id} · {e.title}
                  {'blocked' in e && e.blocked ? ' ⚠' : ''}
                </span>
                <span style={{ fontSize: 12, opacity: 0.8 }}>{e.zone}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="panel panel-strong" style={{ padding: 36, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div className="tag">{current.id}</div>
              {'blocked' in current && current.blocked ? <span className="tag danger" style={{ marginLeft: 8 }}>阻塞</span> : null}
              <h2 style={{ fontSize: 42, color: 'var(--gold-100)', margin: '12px 0' }}>{current.title}</h2>
            </div>
            <div style={{ textAlign: 'right', color: 'var(--text-dim)', fontSize: 18 }}>
              <div>部门：{current.dept}</div>
              <div>区域：{current.zone}</div>
              <div>依据：{current.basis}</div>
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              padding: 28,
              minHeight: 680,
              borderRadius: 16,
              border: '1px solid var(--line)',
              background: 'rgba(255,248,232,0.04)',
              fontSize: 28,
              lineHeight: 1.75,
              color: 'var(--cream)',
            }}
          >
            {current.body}
          </div>

          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="panel" style={{ padding: 16 }}>
              <div style={{ color: 'var(--gold-100)' }}>素材 / 附件</div>
              <div style={{ marginTop: 8, fontSize: 20, color: 'var(--text-dim)' }}>{current.asset}</div>
            </div>
            <div className="panel" style={{ padding: 16 }}>
              <div style={{ color: 'var(--gold-100)' }}>制作形态</div>
              <div style={{ marginTop: 8, fontSize: 20, color: 'var(--text-dim)' }}>
                公示页 / 可目录进入详情；公众教育区建议海报轮播，体验区建议目录+详情。
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  )
}
