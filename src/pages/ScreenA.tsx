import { Stage } from '../components/Stage'
import { depositPanels, wealthProducts } from '../data/content'

const insure = '保障本息合计50万元以内全额偿付'

function RateTable({ title, rows }: { title: string; rows: { term: string; rate: string }[] }) {
  return (
    <section className="gold-table">
      <h3>{title}<em>（{rows.length}）</em></h3>
      <table>
        <thead>
          <tr><th>存款期限</th><th>年利率</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${title}-${i}`}>
              <td>{r.term}</td>
              <td>{r.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{insure}</p>
    </section>
  )
}

export function ScreenA() {
  const base = import.meta.env.BASE_URL
  const [demand, term, agreement, notice, structured] = depositPanels

  return (
    <Stage tone="viz">
      <div className="bleed hall-bleed">
        <img className="bleed-bg" src={`${base}hall/exhibition-hall.jpg`} alt="" />
        <div className="bleed-wash is-soft" />
        <div className="hall-board">
          <header className="hall-head">
            <span>存款利率 · 自营理财</span>
            <h2>行内数据</h2>
          </header>
          <aside className="hall-col">
            <RateTable title={demand.title} rows={demand.rows} />
            <RateTable title={term.title} rows={term.rows} />
          </aside>
          <section className="hall-stage">
            <div className="hall-wealth">
              {wealthProducts.map((item) => (
                <article key={item.series}>
                  <b>{item.series}</b>
                  <p>{item.name}</p>
                  <em>{item.tag}</em>
                  <div>
                    {item.metrics.map((m) => (
                      <span key={m.k}><strong className="num">{m.v}</strong><i>{m.k}</i></span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
          <aside className="hall-col">
            <RateTable title={agreement.title} rows={agreement.rows} />
            <RateTable title={notice.title} rows={notice.rows} />
            <RateTable title={structured.title} rows={structured.rows} />
          </aside>
        </div>
      </div>
    </Stage>
  )
}
