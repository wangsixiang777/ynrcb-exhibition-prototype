import { useState } from 'react'
import { Stage } from '../components/Stage'
import { depositPanels, realAssets } from '../data/content'

type Tab = 'deposit' | 'wealth' | 'third'

function RatePanel({ title, rows, tip, scaleMax }: { title: string; rows: { term: string; rate: string }[]; tip: string; scaleMax: number }) {
  const max = scaleMax
  return (
    <section className="viz-panel">
      <header>
        <h3>{title}</h3>
        <span>PPT示意</span>
      </header>
      <ul>
        {rows.map((r, i) => (
          <li key={`${title}-${i}`}>
            <span>{r.term}</span>
            <i><b style={{ width: `${(Number.parseFloat(r.rate) / max) * 100}%` }} /></i>
            <strong>{r.rate}</strong>
          </li>
        ))}
      </ul>
      <p>{tip}</p>
    </section>
  )
}

export function ScreenA() {
  const [tab, setTab] = useState<Tab>('deposit')
  const left = depositPanels.slice(0, 2)
  const right = depositPanels.slice(2)
  const scaleMax = Math.max(...depositPanels.flatMap((p) => p.rows.map((r) => Number.parseFloat(r.rate) || 0)), 0.01)

  return (
    <Stage tone="viz">
      <div className="board viz viz-a">
        <header className="viz-title">
          <span>云南省农村商业银行</span>
          <h2>{tab === 'deposit' ? '存款利率' : tab === 'wealth' ? '自营理财' : '版面三'}</h2>
        </header>
        <div className="viz-a-grid">
          <div className="viz-col">
            {tab === 'deposit' ? left.map((p) => <RatePanel key={p.title} {...p} scaleMax={scaleMax} />) : (
              <section className="viz-panel viz-empty">
                <h3>{tab === 'wealth' ? '自营理财清单' : '版面三'}</h3>
                <p>{tab === 'wealth' ? '资料包没有产品表，这里不编造产品名称和业绩。' : '主题和字段尚未确认。'}</p>
              </section>
            )}
          </div>
          <figure className="viz-hero">
            {tab === 'deposit' ? (
              <img src={`${import.meta.env.BASE_URL}${realAssets.branches.dali}`} alt="大理市农商行营业部" />
            ) : (
              <div className="viz-hold">{tab === 'wealth' ? '待补产品表' : '主题待定'}</div>
            )}
            <figcaption>{tab === 'deposit' ? '大理市农商行营业部 · 资料包实拍' : '核对位'}</figcaption>
          </figure>
          <div className="viz-col">
            {tab === 'deposit' ? right.map((p) => <RatePanel key={p.title} {...p} scaleMax={scaleMax} />) : (
              <section className="viz-panel viz-empty">
                <h3>待补字段</h3>
                <p>正式数据到位后再排这一侧。</p>
              </section>
            )}
          </div>
        </div>
        <div className="viz-foot">
          <p>利率取自需求 PPT 版式，不是正式挂牌。自营理财无清单。版面三主题待确认。</p>
          <div className="seg">
            <button type="button" className={tab === 'deposit' ? 'is-active' : undefined} onClick={() => setTab('deposit')}>存款利率</button>
            <button type="button" className={tab === 'wealth' ? 'is-active' : undefined} onClick={() => setTab('wealth')}>自营理财</button>
            <button type="button" className={tab === 'third' ? 'is-active' : undefined} onClick={() => setTab('third')}>版面三</button>
          </div>
        </div>
      </div>
    </Stage>
  )
}
