import { useEffect, useState } from 'react'
import { Stage } from '../components/Stage'
import { smilePeople } from '../data/content'
import glyphPoints from '../data/glyphPoints.json'

const points = glyphPoints as [number, number][]
const FLOAT_MS = 8000
const FORM_MS = 7000

export function ScreenSmile() {
  const [formed, setFormed] = useState(false)
  const base = import.meta.env.BASE_URL

  useEffect(() => {
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
  }, [])

  return (
    <Stage tone="viz">
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
    </Stage>
  )
}
