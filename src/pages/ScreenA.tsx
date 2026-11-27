import { useEffect, useState } from 'react'
import { Stage } from '../components/Stage'
import { depositPanels, wealthProducts } from '../data/content'

type Board = 'deposit' | 'wealth'

const notice = depositPanels[2]
const demand = depositPanels[0].rows.filter((r, i, list) => list.findIndex((x) => x.term === r.term && x.rate === r.rate) === i)
const term = depositPanels[1].rows
const agreement = notice.rows.filter((r) => r.term.includes('协定'))
const callDeposit = notice.rows.filter((r) => r.term.includes('通知'))
const headline = [
  { label: '活期', value: demand[0]?.rate ?? '—' },
  { label: '定期1年', value: term.find((r) => r.term === '1年')?.rate ?? '—' },
  { label: '协定', value: agreement[0]?.rate ?? '—' },
  { label: '7天通知', value: callDeposit.find((r) => r.term.includes('7'))?.rate ?? '—' },
  { label: '结构性1年', value: depositPanels[3].rows[0]?.rate ?? '—' },
]

function RateTable({ title, rows, tip }: { title: string; rows: { term: string; rate: string }[]; tip: string }) {
  return (
    <section className="gold-table">
      <h3>{title}<em>{rows.length}档</em></h3>
      <table>
        <thead>
          <tr><th>存款期限</th><th>年利率</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${title}-${r.term}`}>
              <td>{r.term}</td>
              <td>{r.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{tip}</p>
    </section>
  )
}

export function ScreenA() {
  const [board, setBoard] = useState<Board>('deposit')
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBoard((cur) => (cur === 'deposit' ? 'wealth' : 'deposit'))
    }, 8000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <Stage tone="viz">
      <div className="bleed hall-bleed">
        <img className="bleed-bg" src={`${base}hall/exhibition-hall.jpg`} alt="" />
        <div className="bleed-wash is-soft" />
        <h2 className="bleed-title">{board === 'deposit' ? '存款利率' : '自营理财'}</h2>
        {board === 'deposit' ? (
          <>
            <aside className="bleed-side bleed-left">
              <RateTable title="活期存款" rows={demand} tip={depositPanels[0].tip} />
              <RateTable title="定期存款" rows={term} tip={depositPanels[1].tip} />
            </aside>
            <div className="hall-center">
              {headline.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong className="num">{item.value}</strong>
                </div>
              ))}
            </div>
            <aside className="bleed-side bleed-right">
              <RateTable title="协定存款" rows={agreement} tip={notice.tip} />
              <RateTable title="通知存款" rows={callDeposit} tip={notice.tip} />
              <RateTable title="结构性存款" rows={depositPanels[3].rows} tip={depositPanels[3].tip} />
            </aside>
          </>
        ) : (
          <div className="hall-wealth">
            {wealthProducts.map((item) => (
              <article key={item.name}>
                <b>{item.name.replace(/ · 示例产品[A-Z]$/, '')}</b>
                <span>期限 {item.term}</span>
                <span>风险 {item.risk}</span>
                <strong className="num">{item.rate}</strong>
              </article>
            ))}
          </div>
        )}
      </div>
    </Stage>
  )
}
