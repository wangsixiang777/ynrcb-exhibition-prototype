import { useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import { screenMeta, smilePeople, threePositions } from '../data/content'

type Mode = 'positions' | 'wall-float' | 'wall-text'

export function ScreenC() {
  const [mode, setMode] = useState<Mode>('positions')
  const [posId, setPosId] = useState(threePositions[0].id)
  const pos = threePositions.find((p) => p.id === posId)!

  const layout = useMemo(
    () =>
      smilePeople.map((p, i) => ({
        ...p,
        left: 6 + ((i * 19) % 86),
        top: 16 + ((i * 31) % 68),
        delay: (i % 6) * 0.4,
      })),
    [],
  )

  return (
    <Stage
      width={3200}
      height={1800}
      title={screenMeta.C.title}
      sizeLabel={screenMeta.C.size}
      hint="三大点位先按「三定位入口」表达；笑脸墙提供飘动 / 拼字两态，拼 logo 暂缓。"
    >
      <div className="hud" style={{ padding: 48, display: 'grid', gridTemplateRows: 'auto 1fr', gap: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div className="title-cn" style={{ fontSize: 40 }}>三大点位 · 笑脸墙</div>
          <div className="seg">
            <button type="button" className={mode === 'positions' ? 'is-active' : undefined} onClick={() => setMode('positions')}>三大点位</button>
            <button type="button" className={mode === 'wall-float' ? 'is-active' : undefined} onClick={() => setMode('wall-float')}>飘动</button>
            <button type="button" className={mode === 'wall-text' ? 'is-active' : undefined} onClick={() => setMode('wall-text')}>拼字</button>
          </div>
        </div>

        {mode === 'positions' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 22, minHeight: 0 }}>
            <div className="glass" style={{ padding: 18, display: 'grid', gap: 10, alignContent: 'start' }}>
              {threePositions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={posId === p.id ? 'btn-primary' : 'btn-ghost'}
                  style={{ justifyContent: 'flex-start', textAlign: 'left', height: 'auto', padding: '14px 16px' }}
                  onClick={() => setPosId(p.id)}
                >
                  {p.title}
                </button>
              ))}
            </div>
            <div className="glass-strong" style={{ padding: 40 }}>
              <span className="chip">服务三大定位</span>
              <h2 className="title-cn" style={{ fontSize: 44, margin: '18px 0 20px' }}>{pos.title}</h2>
              <ul style={{ margin: 0, paddingLeft: 22, fontSize: 26, lineHeight: 1.85, color: 'var(--muted)' }}>
                {pos.points.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="glass-strong" style={{ position: 'relative', overflow: 'hidden' }}>
            {mode === 'wall-float' &&
              layout.map((p) => (
                <div
                  key={p.name}
                  className="float-item"
                  style={{ left: `${p.left}%`, top: `${p.top}%`, animationDelay: `${p.delay}s` }}
                  title={`${p.name} · ${p.role}`}
                >
                  <div className="face">{p.name.slice(0, 1)}</div>
                  <div style={{ marginTop: 6, textAlign: 'center', fontSize: 14, color: 'var(--cream)' }}>
                    {p.name}
                    <div style={{ color: 'var(--muted-2)', fontSize: 12 }}>{p.city}</div>
                  </div>
                </div>
              ))}

            {mode === 'wall-text' && (
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 100px)', gap: 16 }}>
                  {'云南农商银行'.split('').map((ch, i) => (
                    <div key={`${ch}-${i}`} style={{ textAlign: 'center' }}>
                      <div className="face" style={{ width: 92, height: 92, margin: '0 auto', fontSize: 28 }}>
                        {smilePeople[i % smilePeople.length].name.slice(0, 1)}
                      </div>
                      <div className="title-cn" style={{ marginTop: 10, fontSize: 40 }}>{ch}</div>
                    </div>
                  ))}
                </div>
                <div className="chip" style={{ marginTop: 28 }}>正式版接入 66 张笑脸原图</div>
              </div>
            )}
          </div>
        )}
      </div>
    </Stage>
  )
}
