import { useState } from 'react'
import { Stage } from '../components/Stage'
import { depositPanels, wealthProducts, screenMeta } from '../data/content'

type Tab = 'deposit' | 'wealth' | 'third'

function RateCard({
  title,
  rows,
  tip,
}: {
  title: string
  rows: { term: string; rate: string }[]
  tip: string
}) {
  return (
    <div className="glass" style={{ padding: '22px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div className="title-cn" style={{ fontSize: 28 }}>{title}</div>
        <span className="chip">{rows.length}</span>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>期限</th>
            <th>年利率</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.term}-${r.rate}`}>
              <td>{r.term}</td>
              <td className="num" style={{ fontSize: 22 }}>{r.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 10, fontSize: 13, color: 'var(--muted-2)' }}>{tip}</div>
    </div>
  )
}

export function ScreenA() {
  const [tab, setTab] = useState<Tab>('deposit')

  const left =
    tab === 'deposit'
      ? depositPanels.slice(0, 2)
      : wealthProducts.slice(0, 2).map((p) => ({
          title: p.name,
          rows: [
            { term: '期限', rate: p.term },
            { term: '风险', rate: p.risk },
            { term: '参考', rate: p.rate },
          ],
          tip: '示例数据，正式以产品说明书为准',
        }))

  const right =
    tab === 'deposit'
      ? depositPanels.slice(2)
      : wealthProducts.slice(2).map((p) => ({
          title: p.name,
          rows: [
            { term: '期限', rate: p.term },
            { term: '风险', rate: p.risk },
            { term: '参考', rate: p.rate },
          ],
          tip: '示例数据，正式以产品说明书为准',
        }))

  return (
    <Stage
      width={3584}
      height={1408}
      title={screenMeta.A.title}
      sizeLabel={screenMeta.A.size}
      hint="改稿核对：无底栏按钮、无屏内 logo、标题右置、数据加丰富。下方分段仅供演示切换。"
    >
      <div className="hud" style={{ padding: '56px 72px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 28 }}>
          <div style={{ textAlign: 'right' }}>
            <div className="title-cn" style={{ fontSize: 56, lineHeight: 1.1 }}>
              {tab === 'deposit' ? '存款利率' : tab === 'wealth' ? '自营理财' : '版面三'}
            </div>
            <div style={{ marginTop: 8, fontSize: 22, color: 'var(--muted)' }}>行内数据展示</div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.35fr 1fr',
            gap: 28,
            height: 980,
          }}
        >
          <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
            {tab === 'third' ? (
              <div className="glass" style={{ padding: 28, minHeight: 280 }}>
                <span className="chip warn">待确认</span>
                <div className="title-cn" style={{ fontSize: 32, marginTop: 16 }}>主题未定</div>
                <p style={{ marginTop: 12, fontSize: 20, lineHeight: 1.7, color: 'var(--muted)' }}>
                  请确认版面三内容主题与字段。
                </p>
              </div>
            ) : (
              left.map((p) => <RateCard key={p.title} {...p} />)
            )}
          </div>

          <div className="glass-strong" style={{ display: 'grid', placeItems: 'center', padding: 28 }}>
            {tab === 'third' ? (
              <div style={{ textAlign: 'center', maxWidth: 560 }}>
                <div className="title-cn" style={{ fontSize: 40 }}>版面三</div>
                <p style={{ marginTop: 16, fontSize: 22, lineHeight: 1.7, color: 'var(--muted)' }}>
                  PPT 仅标注「版面三」。可选项：贷款利率 / 绿色金融 / 手机银行指引等。
                </p>
              </div>
            ) : (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    borderRadius: 18,
                    border: '1px solid var(--line-strong)',
                    background:
                      'radial-gradient(circle at 50% 45%, rgba(243,226,180,0.18), transparent 42%), linear-gradient(135deg, rgba(224,179,90,0.16), rgba(0,0,0,0.35))',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 28,
                    color: 'var(--gold-soft)',
                  }}
                >
                  ▶ 品牌影像 / 视频位
                </div>
                <div style={{ marginTop: 16, fontSize: 18, color: 'var(--muted-2)' }}>正式成片待提供</div>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
            {tab === 'third'
              ? (
                <div className="glass" style={{ padding: 28 }}>
                  <div className="title-cn" style={{ fontSize: 28 }}>字段占位</div>
                  <p style={{ marginTop: 12, fontSize: 18, lineHeight: 1.7, color: 'var(--muted)' }}>
                    主题确认后放置指标卡或列表。
                  </p>
                </div>
                )
              : right.map((p) => <RateCard key={p.title} {...p} />)}
          </div>
        </div>

        <div style={{ position: 'absolute', left: 72, bottom: 40 }}>
          <div className="seg">
            <button type="button" className={tab === 'deposit' ? 'is-active' : undefined} onClick={() => setTab('deposit')}>
              存款利率
            </button>
            <button type="button" className={tab === 'wealth' ? 'is-active' : undefined} onClick={() => setTab('wealth')}>
              自营理财
            </button>
            <button type="button" className={tab === 'third' ? 'is-active' : undefined} onClick={() => setTab('third')}>
              版面三
            </button>
          </div>
        </div>
      </div>
    </Stage>
  )
}
