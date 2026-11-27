import { useState } from 'react'
import { Stage } from '../components/Stage'
import { screenMeta, smilePeople, threePositions } from '../data/content'

type Mode = 'positions' | 'wall-float' | 'wall-text'

const chars = '云南农商银行'.split('')

export function ScreenC() {
  const [mode, setMode] = useState<Mode>('positions')
  const [posId, setPosId] = useState(threePositions[0].id)
  const pos = threePositions.find((p) => p.id === posId)!
  const spelled = chars.map((ch, i) => ({
    ch,
    people: smilePeople.filter((_, idx) => idx % chars.length === i),
  }))

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
            {mode === 'wall-float' && (
              <div className="portrait-grid">
                {smilePeople.map((p, i) => (
                  <div key={`${p.city}-${p.name}`} className="portrait" style={{ animationDelay: `${(i % 8) * 0.12}s` }}>
                    <img src={`${import.meta.env.BASE_URL}${p.photo}`} alt={p.name} />
                    <small>{p.name}</small>
                    <em>{p.city}</em>
                  </div>
                ))}
              </div>
            )}
            {mode === 'wall-text' && (
              <div className="spell">
                {spelled.map((col) => (
                  <div key={col.ch} className="spell-col">
                    <div className="ch">{col.ch}</div>
                    <div className="spell-faces">
                      {col.people.map((p) => (
                        <img key={`${p.city}-${p.name}`} src={`${import.meta.env.BASE_URL}${p.photo}`} alt={p.name} title={`${p.name} · ${p.role}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Stage>
  )
}
