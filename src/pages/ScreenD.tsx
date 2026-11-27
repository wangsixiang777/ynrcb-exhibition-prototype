import { useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import { eNotices, type NoticeBlock } from '../data/escreen'

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
  const [id, setId] = useState(eNotices[0].id)
  const current = useMemo(() => eNotices.find((item) => item.id === id) ?? eNotices[0], [id])
  const base = import.meta.env.BASE_URL

  return (
    <Stage tone="viz">
      <div className="notice-wall">
        <aside className="notice-nav">
          <p className="glass-kicker">客户体验与互动区</p>
          <h2>公示目录</h2>
          <div className="notice-list">
            {eNotices.map((item) => (
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
