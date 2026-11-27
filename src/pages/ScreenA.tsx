import { useState } from 'react'
import { Stage } from '../components/Stage'
import { depositPanels, wealthProducts, screenMeta } from '../data/content'

type Tab = 'deposit' | 'wealth' | 'third'

function RateCard({ title, rows, tip }: { title: string; rows: { term: string; rate: string }[]; tip: string }) {
  return (
    <div className="glass rate-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <h3 className="title-cn">{title}</h3>
        <span className="chip">{rows.length}</span>
      </div>
      <table className="data-table">
        <thead>
          <tr><th>期限</th><th>年利率</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.term}-${r.rate}`}>
              <td>{r.term}</td>
              <td className="num">{r.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 6, fontSize: 11, color: 'var(--muted-2)' }}>{tip}</div>
    </div>
  )
}

export function ScreenA() {
  const [tab, setTab] = useState<Tab>('deposit')
  const left = tab === 'deposit'
    ? depositPanels.slice(0, 2)
    : wealthProducts.slice(0, 2).map((p) => ({
        title: p.name,
        rows: [{ term: '期限', rate: p.term }, { term: '风险', rate: p.risk }, { term: '参考', rate: p.rate }],
        tip: '示例数据，正式以产品说明书为准',
      }))
  const right = tab === 'deposit'
    ? depositPanels.slice(2)
    : wealthProducts.slice(2).map((p) => ({
        title: p.name,
        rows: [{ term: '期限', rate: p.term }, { term: '风险', rate: p.risk }, { term: '参考', rate: p.rate }],
        tip: '示例数据，正式以产品说明书为准',
      }))

  return (
    <Stage title={screenMeta.A.title} hint="预览 1920×1080 · 实物屏 3584×1408 · 无底栏、无屏内 logo、标题右置">
      <div className="board board-a">
        <div className="a-head">
          <div>
            <h2 className="title-cn">{tab === 'deposit' ? '存款利率' : tab === 'wealth' ? '自营理财' : '版面三'}</h2>
            <p>行内数据展示</p>
          </div>
        </div>
        <div className="a-grid">
          <div className="a-col">
            {tab === 'third' ? (
              <div className="glass rate-card">
                <span className="chip warn">待确认</span>
                <h3 className="title-cn" style={{ marginTop: 8 }}>主题未定</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13 }}>请确认版面三的内容主题与字段。</p>
              </div>
            ) : left.map((p) => <RateCard key={p.title} {...p} />)}
          </div>
          <div className="media">
            {tab === 'third' ? '版面三 · 主题待定' : '品牌影像 / 视频位'}
          </div>
          <div className="a-col">
            {tab === 'third' ? (
              <div className="glass rate-card"><h3 className="title-cn">字段占位</h3></div>
            ) : right.map((p) => <RateCard key={p.title} {...p} />)}
          </div>
        </div>
        <div>
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
