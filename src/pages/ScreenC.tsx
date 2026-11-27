import { useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import { screenMeta, smilePeople, threePositions } from '../data/content'

type Mode = 'positions' | 'wall-float' | 'wall-text'

export function ScreenC() {
  const [mode, setMode] = useState<Mode>('positions')
  const [posId, setPosId] = useState(threePositions[0].id)
  const pos = threePositions.find((p) => p.id === posId)!
  const layout = useMemo(
    () => smilePeople.map((p, i) => ({ ...p, left: 4 + ((i * 17) % 88), top: 8 + ((i * 23) % 72), delay: (i % 6) * 0.35 })),
    [],
  )

  return (
    <Stage title={screenMeta.C.title} hint="预览 1920×1080 · 三大定位入口，笑脸墙拼 logo 暂缓">
      <div className="board board-c">
        <div className="c-head">
          <h2 className="title-cn">三大点位 · 笑脸墙</h2>
          <div className="seg">
            <button type="button" className={mode === 'positions' ? 'is-active' : undefined} onClick={() => setMode('positions')}>三大点位</button>
            <button type="button" className={mode === 'wall-float' ? 'is-active' : undefined} onClick={() => setMode('wall-float')}>飘动</button>
            <button type="button" className={mode === 'wall-text' ? 'is-active' : undefined} onClick={() => setMode('wall-text')}>拼字</button>
          </div>
        </div>

        {mode === 'positions' ? (
          <div className="c-grid">
            <div className="glass c-nav">
              {threePositions.map((p) => (
                <button key={p.id} type="button" className={posId === p.id ? 'btn-primary' : 'btn-ghost'} onClick={() => setPosId(p.id)}>
                  {p.title}
                </button>
              ))}
            </div>
            <div className="glass c-panel">
              <span className="chip">服务三大定位</span>
              <h2 className="title-cn">{pos.title}</h2>
              <ul>
                {pos.points.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        ) : (
          <div className="wall">
            {mode === 'wall-float' && layout.map((p) => (
              <div key={p.name} className="float-item" style={{ left: `${p.left}%`, top: `${p.top}%`, animationDelay: `${p.delay}s` }}>
                <div className="face">{p.name.slice(0, 1)}</div>
                <small>{p.name}</small>
              </div>
            ))}
            {mode === 'wall-text' && (
              <div className="word">
                <div>
                  <div className="word-row">
                    {'云南农商银行'.split('').map((ch, i) => (
                      <div key={`${ch}-${i}`}>
                        <div className="face" style={{ margin: '0 auto' }}>{smilePeople[i % smilePeople.length].name.slice(0, 1)}</div>
                        <div className="ch">{ch}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: 12 }}><span className="chip">正式版接入 66 张笑脸原图</span></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Stage>
  )
}
