type BarItem = { label: string; value: number; active?: boolean; onClick?: () => void }

export function HBars({ items, max }: { items: BarItem[]; max?: number }) {
  const peak = max ?? Math.max(...items.map((i) => i.value), 1)
  return (
    <div className="viz-hbars">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className={item.active ? 'viz-hbar on' : 'viz-hbar'}
          onClick={item.onClick}
          disabled={!item.onClick}
        >
          <span className="viz-hbar-lab">{item.label}</span>
          <span className="viz-hbar-track">
            <i style={{ width: `${Math.max(6, (item.value / peak) * 100)}%` }} />
          </span>
          <strong className="num">{item.value}</strong>
        </button>
      ))}
    </div>
  )
}

export function RingStat({
  label,
  value,
  sub,
  percent,
}: {
  label: string
  value: string
  sub?: string
  percent: number
}) {
  const p = Math.max(0, Math.min(100, percent))
  const r = 34
  const c = 2 * Math.PI * r
  const dash = (p / 100) * c
  return (
    <div className="viz-ring">
      <svg viewBox="0 0 84 84" aria-hidden>
        <circle cx="42" cy="42" r={r} className="viz-ring-bg" />
        <circle
          cx="42"
          cy="42"
          r={r}
          className="viz-ring-fg"
          strokeDasharray={`${dash} ${c - dash}`}
          transform="rotate(-90 42 42)"
        />
      </svg>
      <div className="viz-ring-txt">
        <strong className="num">{value}</strong>
        <span>{label}</span>
        {sub ? <em>{sub}</em> : null}
      </div>
    </div>
  )
}

export function CompareBars({
  rows,
}: {
  rows: { label: string; a: number; b: number; aLab: string; bLab: string }[]
}) {
  const peak = Math.max(...rows.flatMap((r) => [r.a, r.b]), 1)
  return (
    <div className="viz-compare">
      {rows.map((row) => (
        <div key={row.label} className="viz-compare-row">
          <div className="viz-compare-lab">{row.label}</div>
          <div className="viz-compare-pair">
            <div className="viz-compare-bar a" style={{ width: `${(row.a / peak) * 100}%` }}>
              <span>{row.aLab}</span>
            </div>
            <div className="viz-compare-bar b" style={{ width: `${(row.b / peak) * 100}%` }}>
              <span>{row.bLab}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="viz-legend">
        <i className="a" />国家级 <i className="b" />省级
      </div>
    </div>
  )
}

export function FlowBoard({
  center,
  nodes,
}: {
  center: string
  nodes: { id: string; label: string; count: number; active?: boolean; onClick?: () => void }[]
}) {
  return (
    <div className="viz-flow">
      <div className="viz-flow-hub">{center}</div>
      <div className="viz-flow-nodes">
        {nodes.map((n) => (
          <button
            key={n.id}
            type="button"
            className={n.active ? 'viz-flow-node on' : 'viz-flow-node'}
            onClick={n.onClick}
          >
            <strong className="num">{n.count}</strong>
            <span>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function MetricTiles({
  items,
}: {
  items: { label: string; value: string; tip?: string }[]
}) {
  return (
    <div className="viz-tiles">
      {items.map((item) => (
        <div key={item.label} className="viz-tile">
          <span>{item.label}</span>
          <strong className="num">{item.value}</strong>
          {item.tip ? <em>{item.tip}</em> : null}
        </div>
      ))}
    </div>
  )
}
