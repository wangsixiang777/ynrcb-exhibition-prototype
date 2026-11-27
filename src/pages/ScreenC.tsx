import { useState } from 'react'
import { Stage } from '../components/Stage'
import { threePositions } from '../data/content'

export function ScreenC() {
  const [posId, setPosId] = useState(threePositions[0].id)
  const pos = threePositions.find((p) => p.id === posId)!

  return (
    <Stage>
      <div className="board board-c">
        <div className="c-grid">
          <div className="glass c-nav">
            <h2 className="title-cn">三大点位</h2>
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
      </div>
    </Stage>
  )
}
