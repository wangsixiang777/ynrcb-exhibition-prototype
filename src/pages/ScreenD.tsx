import { useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import { eNotices, eZones, type NoticeBlock } from '../data/escreen'

function BlockView({ block, base }: { block: NoticeBlock; base: string }) {
  if (block.kind === 'h') return <h3>{block.text}</h3>
  if (block.kind === 'p') return <p>{block.text}</p>
  if (block.kind === 'list') return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
  if (block.kind === 'rows') {
    return (
      <div className="notice-rows">
        {block.rows.map((row) => (
          <div key={row.k}><b>{row.k}</b><span>{row.v}</span></div>
        ))}
      </div>
    )
  }
  return <img className="notice-poster" src={`${base}${block.src}`} alt={block.alt} />
}

export function ScreenD() {
  const [zone, setZone] = useState<(typeof eZones)[number]>(eZones[0])
  const [id, setId] = useState(eNotices[0].id)
  const list = useMemo(() => eNotices.filter((item) => item.zone === zone), [zone])
  const current = list.find((item) => item.id === id) ?? list[0]
  const base = import.meta.env.BASE_URL

  const pickZone = (next: (typeof eZones)[number]) => {
    setZone(next)
    const first = eNotices.find((item) => item.zone === next)
    if (first) setId(first.id)
  }

  return (
    <Stage tone="viz">
      <div className="notice-wall">
        <aside className="notice-nav">
          <p className="glass-kicker">一楼电子屏</p>
          <h2>公示目录</h2>
          <div className="notice-zones">
            {eZones.map((item) => (
              <button key={item} type="button" className={zone === item ? 'is-on' : undefined} onClick={() => pickZone(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="notice-list">
            {list.map((item) => (
              <button key={item.id} type="button" className={current.id === item.id ? 'is-on' : undefined} onClick={() => setId(item.id)}>
                <b>{item.title}</b>
                <span>{item.dept}</span>
              </button>
            ))}
          </div>
        </aside>
        <article className="notice-sheet">
          <header>
            <p>{current.zone} · {current.basis}</p>
            <h2>{current.title}</h2>
          </header>
          {current.blocks.map((block, index) => (
            <BlockView key={`${current.id}-${index}`} block={block} base={base} />
          ))}
        </article>
      </div>
    </Stage>
  )
}
