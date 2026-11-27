import { useEffect, useState } from 'react'
import { Stage } from '../components/Stage'
import { screenMeta, smilePeople, threePositions } from '../data/content'
import glyphPoints from '../data/glyphPoints.json'

type Mode = 'positions' | 'wall'

const points = glyphPoints as [number, number][]
const FLOAT_MS = 8000
const FORM_MS = 7000

export function ScreenC() {
  const [mode, setMode] = useState<Mode>('positions')
  const [formed, setFormed] = useState(false)
  const [posId, setPosId] = useState(threePositions[0].id)
  const pos = threePositions.find((p) => p.id === posId)!
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    if (mode !== 'wall') return
    setFormed(false)
    let alive = true
    let timer = 0
    const tick = (toFormed: boolean) => {
      timer = window.setTimeout(() => {
        if (!alive) return
        setFormed(toFormed)
        tick(!toFormed)
      }, toFormed ? FLOAT_MS : FORM_MS)
    }
    tick(true)
    return () => {
      alive = false
      window.clearTimeout(timer)
    }
  }, [mode])

  return (
    <Stage title={screenMeta.C.title} hint="预览 1920×1080 · 笑脸先飘动，约 8 秒聚成字，约 7 秒后再散开">
      <div className="board board-c">
        <div className="c-head">
          <h2 className="title-cn">三大点位 · 笑脸墙</h2>
          <div className="seg">
            <button type="button" className={mode === 'positions' ? 'is-active' : undefined} onClick={() => setMode('positions')}>三大点位</button>
            <button type="button" className={mode === 'wall' ? 'is-active' : undefined} onClick={() => setMode('wall')}>笑脸墙</button>
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
          <div className="magic-wall">
            <div className={formed ? 'mosaic formed' : 'mosaic'} aria-label={formed ? '员工照片组成云南农商银行六字' : '66 张员工照片漂浮'}>
              {points.map(([x, y], r) => {
                const person = smilePeople[r % smilePeople.length]
                const col = r % 11
                const row = Math.floor(r / 11) % 6
                const left = formed ? x : 5 + col * 8.9 + Math.sin(r * 1.7) * 1.2
                const top = formed ? 24 + y * 0.5 : 9 + row * 16 + Math.cos(r * 1.3) * 2
                return (
                  <div
                    key={r}
                    className={r < smilePeople.length ? 'tile' : 'tile copy'}
                    style={{ left: `${left}%`, top: `${top}%`, transitionDelay: `${(r % 19) * 11}ms` }}
                  >
                    <img alt={person.name} src={`${base}${person.photo}`} style={{ animationDelay: `${-(r % 13) * 0.43}s` }} />
                  </div>
                )
              })}
            </div>
            <div className="wallfoot">16 个州市 · 66 位员工 · {formed ? '照片聚字' : '自由飘动'}</div>
          </div>
        )}
      </div>
    </Stage>
  )
}
