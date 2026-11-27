import { useState } from 'react'
import { Stage } from '../components/Stage'
import { depositPanels, wealthProducts, screenMeta } from '../data/content'

type Tab = 'deposit' | 'wealth' | 'third'

export function ScreenA() {
  const [tab, setTab] = useState<Tab>('deposit')

  return (
    <Stage width={3584} height={1408} label={screenMeta.A.title} note={screenMeta.A.note}>
      <div className="hud-screen" style={{ padding: '48px 64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="logic-note" style={{ maxWidth: 980 }}>
            改稿核对点：①下方切换按钮已删除（改由演示条切换）②数据面板加丰富示意③屏内 logo
            已去掉，请结合墙面实体 logo 整体看④主标题在右侧。
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="hud-title" style={{ fontSize: 54, marginBottom: 8 }}>
              {tab === 'deposit' ? '存款利率' : tab === 'wealth' ? '自营理财' : '版面三'}
            </div>
            <div style={{ color: 'var(--text-dim)', fontSize: 22 }}>云南农商银行 · 行内数据展示</div>
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.4fr 1.1fr',
            gap: 28,
            height: 980,
          }}
        >
          <div style={{ display: 'grid', gap: 18 }}>
            {(tab === 'deposit' ? depositPanels.slice(0, 2) : wealthProducts.slice(0, 2).map((p) => ({
              title: p.name,
              rows: [
                { term: '期限', rate: p.term },
                { term: '风险', rate: p.risk },
                { term: '业绩/利率', rate: p.rate },
              ],
              tip: '示例数据，正式以产品说明书为准',
            }))).map((panel) => (
              <div key={panel.title} className="panel" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <strong style={{ fontSize: 28, color: 'var(--gold-100)' }}>{panel.title}</strong>
                  <span className="tag">数据区</span>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>项目</th>
                      <th>数值</th>
                    </tr>
                  </thead>
                  <tbody>
                    {panel.rows.map((r) => (
                      <tr key={r.term + r.rate}>
                        <td style={{ fontSize: 22 }}>{r.term}</td>
                        <td className="stat-num" style={{ fontSize: 26 }}>
                          {r.rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: 10, color: 'var(--text-dim)', fontSize: 16 }}>{panel.tip}</div>
              </div>
            ))}
          </div>

          <div className="panel panel-strong" style={{ padding: 28, display: 'grid', placeItems: 'center' }}>
            {tab === 'third' ? (
              <div style={{ textAlign: 'center', maxWidth: 640 }}>
                <div className="tag warn">待甲方确认</div>
                <h3 style={{ fontSize: 42, color: 'var(--gold-100)' }}>版面三主题未定</h3>
                <p style={{ fontSize: 22, lineHeight: 1.7, color: 'var(--text-dim)' }}>
                  PPT 仅写「版面三」，未给内容。请确认主题（如贷款利率 / 绿色金融 / 手机银行指引等）及字段清单。
                </p>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 920,
                    height: 560,
                    borderRadius: 18,
                    border: '1px solid var(--line-strong)',
                    background:
                      'linear-gradient(135deg, rgba(232,184,74,0.12), rgba(0,0,0,0.35)), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 55%)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 28,
                    color: 'var(--gold-100)',
                  }}
                >
                  ▶ 中部视频 / 品牌影像位
                </div>
                <p style={{ marginTop: 18, color: 'var(--text-dim)', fontSize: 20 }}>
                  对应现稿中央媒体区；成片素材待提供
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            {tab === 'deposit'
              ? depositPanels.slice(2).map((panel) => (
                  <div key={panel.title} className="panel" style={{ padding: 22 }}>
                    <strong style={{ fontSize: 28, color: 'var(--gold-100)' }}>{panel.title}</strong>
                    <table className="table" style={{ marginTop: 10 }}>
                      <tbody>
                        {panel.rows.map((r) => (
                          <tr key={r.term + r.rate}>
                            <td style={{ fontSize: 22 }}>{r.term}</td>
                            <td className="stat-num" style={{ fontSize: 26 }}>
                              {r.rate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ marginTop: 10, color: 'var(--text-dim)', fontSize: 16 }}>{panel.tip}</div>
                  </div>
                ))
              : tab === 'wealth'
                ? wealthProducts.slice(2).map((p) => (
                    <div key={p.name} className="panel" style={{ padding: 22 }}>
                      <strong style={{ fontSize: 26, color: 'var(--gold-100)' }}>{p.name}</strong>
                      <div style={{ marginTop: 12, fontSize: 22, color: 'var(--text-dim)' }}>
                        期限 {p.term} · 风险 {p.risk}
                      </div>
                      <div className="stat-num" style={{ fontSize: 34, marginTop: 8 }}>
                        {p.rate}
                      </div>
                    </div>
                  ))
                : (
                    <div className="panel" style={{ padding: 22 }}>
                      <strong style={{ fontSize: 26, color: 'var(--gold-100)' }}>字段占位</strong>
                      <p style={{ fontSize: 20, color: 'var(--text-dim)', lineHeight: 1.7 }}>
                        主题确认后，这里放指标卡 / 列表 / 公告摘要。
                      </p>
                    </div>
                  )}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 64,
            bottom: 36,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <span className="tag">演示切换（正式屏无底栏按钮）</span>
          {(
            [
              ['deposit', '版面一 · 存款利率'],
              ['wealth', '版面二 · 自营理财'],
              ['third', '版面三 · 待定'],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              className={tab === k ? 'gold-btn' : 'ghost-btn'}
              onClick={() => setTab(k)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </Stage>
  )
}
