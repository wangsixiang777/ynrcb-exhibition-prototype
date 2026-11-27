import { useState } from 'react'
import { Stage } from '../components/Stage'
import { depositPanels } from '../data/content'

type Tab = 'deposit' | 'wealth' | 'third'

const notice = depositPanels[2]
const agreement = notice.rows.filter((r) => r.term.includes('协定'))
const callDeposit = notice.rows.filter((r) => r.term.includes('通知'))

function RateTable({ title, rows, tip }: { title: string; rows: { term: string; rate: string }[]; tip: string }) {
  return (
    <section className="gold-table">
      <h3>{title}<em>{rows.length}</em></h3>
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
      <p>{tip}</p>
    </section>
  )
}

export function ScreenA() {
  const [tab, setTab] = useState<Tab>('deposit')
  const base = import.meta.env.BASE_URL

  return (
    <Stage tone="viz">
      <div className="bleed">
        <img className="bleed-bg" src={`${base}hall/exhibition-hall.jpg`} alt="" />
        <div className="bleed-wash is-soft" />
        <h2 className="bleed-title">{tab === 'deposit' ? '存款利率' : tab === 'wealth' ? '自营理财' : '版面三'}</h2>
        {tab === 'deposit' ? (
          <>
            <aside className="bleed-side bleed-left">
              <RateTable title="活期" rows={depositPanels[0].rows} tip={depositPanels[0].tip} />
              <RateTable title="定期" rows={depositPanels[1].rows} tip={depositPanels[1].tip} />
            </aside>
            <aside className="bleed-side bleed-right">
              <RateTable title="协定存款" rows={agreement} tip={notice.tip} />
              <RateTable title="通知存款" rows={callDeposit} tip={notice.tip} />
              <RateTable title="结构性存款" rows={depositPanels[3].rows} tip={depositPanels[3].tip} />
            </aside>
          </>
        ) : (
          <div className="bleed-note">
            <h2>{tab === 'wealth' ? '自营理财' : '版面三'}</h2>
            <p>
              {tab === 'wealth'
                ? '资料包没有自营理财产品表。需求只列了版面名称，这里不补产品名称和业绩。'
                : '需求只写了「版面三」，没有主题和字段。待甲方确认后再排。'}
            </p>
          </div>
        )}
        <div className="bleed-tabs">
          <button type="button" className={tab === 'deposit' ? 'is-on' : undefined} onClick={() => setTab('deposit')}>存款利率</button>
          <button type="button" className={tab === 'wealth' ? 'is-on' : undefined} onClick={() => setTab('wealth')}>自营理财</button>
          <button type="button" className={tab === 'third' ? 'is-on' : undefined} onClick={() => setTab('third')}>版面三</button>
        </div>
      </div>
    </Stage>
  )
}
