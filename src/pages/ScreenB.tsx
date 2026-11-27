import { useEffect, useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import {
  borderCounties,
  borderSide,
  happyVillage,
  networkStats,
  overseas,
  povertyCase,
  revitalization,
  screenMeta,
  specialtyBranches,
} from '../data/content'

type Module =
  | 'network'
  | 'specialty'
  | 'border'
  | 'happy'
  | 'revitalize'
  | 'overseas'

const modules: { id: Module; label: string }[] = [
  { id: 'network', label: '一 · 网点分布' },
  { id: 'specialty', label: '二 · 特色网点' },
  { id: 'border', label: '三 · 边境县' },
  { id: 'happy', label: '四 · 幸福村' },
  { id: 'revitalize', label: '五 · 帮扶县' },
  { id: 'overseas', label: '六 · 境外金融' },
]

export function ScreenB() {
  const [mod, setMod] = useState<Module>('network')
  const [level, setLevel] = useState(0)
  const [branchId, setBranchId] = useState(specialtyBranches[0].id)
  const [borderIdx, setBorderIdx] = useState(0)
  const [popups, setPopups] = useState<{ name: string; n: number }[]>([])
  const [revType, setRevType] = useState<'national' | 'provincial'>('national')
  const [modal, setModal] = useState<null | { title: string; body: string }>(null)
  const [playing, setPlaying] = useState(false)

  const branch = specialtyBranches.find((b) => b.id === branchId)!

  useEffect(() => {
    if (!playing || mod !== 'border') return
    setPopups([])
    setBorderIdx(0)
    let i = 0
    const timer = window.setInterval(() => {
      const item = borderCounties[i]
      if (!item) {
        window.clearInterval(timer)
        setPlaying(false)
        return
      }
      setBorderIdx(i)
      setPopups((prev) => [...prev, { name: item.name, n: item.n }])
      i += 1
    }, 700)
    return () => window.clearInterval(timer)
  }, [playing, mod])

  const levelLabel = networkStats.levels[level]?.name ?? ''

  const mapBadge = useMemo(() => {
    if (mod === 'network') return `当前演示层级：${levelLabel}（点位为示意抽样，非 GIS 真坐标）`
    if (mod === 'specialty') return `聚焦特色网点：${branch.name}`
    if (mod === 'border') return `边境县跑马灯：${borderCounties[borderIdx]?.name ?? ''}（弹窗不消失）`
    if (mod === 'happy') return `边境幸福村网点 ${happyVillage.total} 个`
    if (mod === 'revitalize')
      return revType === 'national'
        ? `国家级帮扶县 ${revitalization.national.counties} 个`
        : `省级帮扶县 ${revitalization.provincial.counties} 个`
    return '云南版图缩小，示意周边国家方向'
  }, [mod, levelLabel, branch.name, borderIdx, revType])

  return (
    <Stage width={3584} height={2048} label={screenMeta.B.title} note={screenMeta.B.note}>
      <div className="hud-screen" style={{ padding: '40px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div className="hud-title" style={{ fontSize: 44 }}>云南农商银行 · 金融服务展示</div>
            <div style={{ color: 'var(--text-dim)', fontSize: 20, marginTop: 6 }}>{mapBadge}</div>
          </div>
          <div className="logic-note" style={{ maxWidth: 900 }}>
            沙盘三维用示意图替代。本页核对：六大板块入口、左右栏字段、弹窗文案与动效逻辑（辐射点亮 / 跑马灯 /
            收束改制）。
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '760px 1fr 760px', gap: 24, height: 1680 }}>
          {/* left */}
          <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
            {mod === 'network' && (
              <>
                <SideStat title="营业网点总数" value={`${networkStats.outlets}`} unit="个" />
                <SideStat title="自助银行" value={`${networkStats.selfBanks}`} unit="个" />
                <SideStat title="服务站 / 支付点" value={networkStats.serviceStations} unit={`/ ${networkStats.payPoints}`} />
                <SideStat title="覆盖乡镇" value={`${networkStats.townships}`} unit="个" />
                <div className="panel" style={{ padding: 20 }}>
                  <div style={{ color: 'var(--gold-100)', marginBottom: 8, fontSize: 22 }}>层级点亮逻辑</div>
                  {networkStats.levels.map((l, idx) => (
                    <button
                      key={l.name}
                      type="button"
                      onClick={() => setLevel(idx)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '12px 10px',
                        borderBottom: '1px solid rgba(232,184,74,0.12)',
                        color: idx <= level ? 'var(--gold-100)' : 'var(--text-dim)',
                        fontSize: 22,
                      }}
                    >
                      <span>
                        {idx + 1}. {l.name}
                      </span>
                      <span className="stat-num">{l.count}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="gold-btn"
                    style={{ marginTop: 14, width: '100%' }}
                    onClick={() =>
                      setModal({
                        title: '农商行改制（弹窗示意）',
                        body: '交互：全省星光点点收束汇聚至昆明总行后弹出。正文待甲方提供改制介绍。',
                      })
                    }
                  >
                    二级按钮 · 农商行改制
                  </button>
                </div>
              </>
            )}

            {mod === 'specialty' && (
              <div className="panel" style={{ padding: 22 }}>
                <div className="tag">{branch.tag}</div>
                <h3 style={{ fontSize: 34, color: 'var(--gold-100)', margin: '10px 0' }}>{branch.name}</h3>
                <p style={{ fontSize: 22, lineHeight: 1.7, color: 'var(--text-dim)' }}>{branch.text}</p>
                {branch.id === 'dulong' && (
                  <div style={{ marginTop: 16 }} className="logic-note">
                    {povertyCase.title}
                    <br />
                    {povertyCase.paras[0]}
                  </div>
                )}
              </div>
            )}

            {mod === 'border' && (
              <>
                <SideStat title="边境县数量" value={`${borderSide.counties}`} unit="个" />
                <SideStat title="边境网点约" value={`${borderSide.branches}`} unit="个" />
                <div className="panel" style={{ padding: 20, fontSize: 22, lineHeight: 1.6, color: 'var(--text-dim)' }}>
                  <div style={{ color: 'var(--gold-100)', marginBottom: 8 }}>跨境相关数据</div>
                  <div>{borderSide.settlement}</div>
                  <div>{borderSide.usd}</div>
                  <div>{borderSide.mutual}</div>
                  <div className="tag warn" style={{ marginTop: 10 }}>
                    {borderSide.note}
                  </div>
                </div>
              </>
            )}

            {mod === 'happy' && (
              <>
                <SideStat title="边境幸福村网点" value={`${happyVillage.total}`} unit="个" />
                <SideStat title="贷款余额" value={happyVillage.loan} unit="" />
                <div className="logic-note">{happyVillage.note}；覆盖人数待编/待核</div>
              </>
            )}

            {mod === 'revitalize' && (
              <>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" className={revType === 'national' ? 'gold-btn' : 'ghost-btn'} onClick={() => setRevType('national')}>
                    国家级
                  </button>
                  <button type="button" className={revType === 'provincial' ? 'gold-btn' : 'ghost-btn'} onClick={() => setRevType('provincial')}>
                    省级
                  </button>
                </div>
                <SideStat
                  title={revType === 'national' ? '国家重点帮扶县' : '省级帮扶县'}
                  value={`${revType === 'national' ? revitalization.national.counties : revitalization.provincial.counties}`}
                  unit="个"
                />
                <SideStat
                  title="对应网点数"
                  value={`${revType === 'national' ? revitalization.national.branches : revitalization.provincial.branches}`}
                  unit="个"
                />
                <div className="panel" style={{ padding: 18, fontSize: 22, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                  {revType === 'national' ? revitalization.national.tip : revitalization.provincial.tip}
                </div>
              </>
            )}

            {mod === 'overseas' && (
              <div className="panel" style={{ padding: 22 }}>
                <div style={{ color: 'var(--gold-100)', fontSize: 24, marginBottom: 12 }}>二级按钮</div>
                {overseas.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className="ghost-btn"
                    style={{ display: 'block', width: '100%', marginBottom: 12, textAlign: 'left' }}
                    onClick={() => setModal({ title: o.title, body: o.body })}
                  >
                    {o.title} →
                  </button>
                ))}
                <div className="logic-note">箭头动效示意：指向老挝 / 越南 / 缅甸；API 强调中老直联。</div>
              </div>
            )}
          </div>

          {/* center map */}
          <div className="panel panel-strong" style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src="./maps/yunnan-map-sandtable.jpg"
              alt="云南沙盘示意图"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 45%, transparent 20%, rgba(8,5,2,0.55) 75%), linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.45))',
              }}
            />

            {/* decorative points */}
            {Array.from({ length: 18 + level * 8 }).map((_, i) => (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  left: `${12 + ((i * 37) % 76)}%`,
                  top: `${18 + ((i * 53) % 64)}%`,
                  width: 8 + (i % 3) * 3,
                  height: 8 + (i % 3) * 3,
                  borderRadius: '50%',
                  background: i < 3 + level * 2 ? 'var(--gold-200)' : 'rgba(232,184,74,0.35)',
                  boxShadow: i < 3 + level * 2 ? '0 0 16px rgba(232,184,74,0.9)' : 'none',
                }}
              />
            ))}

            {mod === 'border' && (
              <div style={{ position: 'absolute', right: 20, top: 20, display: 'grid', gap: 8, maxHeight: '70%', overflow: 'auto' }}>
                {popups.map((p) => (
                  <div key={p.name} className="panel" style={{ padding: '10px 14px', minWidth: 180 }}>
                    <div style={{ color: 'var(--gold-100)' }}>{p.name}</div>
                    <div className="stat-num">{p.n} 个网点</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ position: 'absolute', left: 20, bottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {mod === 'border' && (
                <button type="button" className="gold-btn" onClick={() => setPlaying(true)} disabled={playing}>
                  {playing ? '跑马灯演示中…' : '演示：25县依次亮起'}
                </button>
              )}
              {mod === 'network' && (
                <button type="button" className="ghost-btn" onClick={() => setLevel((v) => Math.min(v + 1, networkStats.levels.length - 1))}>
                  下一层级点亮
                </button>
              )}
              <span className="tag">示意图 · 非实景三维</span>
            </div>
          </div>

          {/* right */}
          <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
            {mod === 'specialty' ? (
              <>
                <div className="panel" style={{ padding: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {specialtyBranches.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      className={branchId === b.id ? 'gold-btn' : 'ghost-btn'}
                      onClick={() => setBranchId(b.id)}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
                <div
                  className="panel"
                  style={{
                    height: 520,
                    display: 'grid',
                    placeItems: 'center',
                    background:
                      'linear-gradient(135deg, rgba(232,184,74,0.15), rgba(0,0,0,0.4))',
                    fontSize: 24,
                    color: 'var(--gold-100)',
                    textAlign: 'center',
                    padding: 24,
                  }}
                >
                  右侧网点实拍图位
                  <div style={{ fontSize: 18, color: 'var(--text-dim)', marginTop: 10 }}>
                    正式版接入「五个特色网点图文/网点照片」精修主图
                  </div>
                </div>
              </>
            ) : (
              <div className="panel" style={{ padding: 22 }}>
                <div style={{ color: 'var(--gold-100)', fontSize: 24, marginBottom: 12 }}>本板块右侧展示建议</div>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-dim)', fontSize: 22, lineHeight: 1.7 }}>
                  {mod === 'network' && (
                    <>
                      <li>基础金融全覆盖说明</li>
                      <li>辐射动效说明文案</li>
                      <li>改制入口说明</li>
                    </>
                  )}
                  {mod === 'border' && (
                    <>
                      <li>边境线长度（待数）</li>
                      <li>口岸覆盖与边民互市</li>
                      <li>信贷投放补充位</li>
                    </>
                  )}
                  {mod === 'happy' && <li>民族系列产品数据卡（待补）</li>}
                  {mod === 'revitalize' && <li>区县名单摘要 / 高亮图例</li>}
                  {mod === 'overseas' && <li>中老中越缅方向示意</li>}
                </ul>
              </div>
            )}

            <div className="panel" style={{ padding: 18 }}>
              <div style={{ color: 'var(--gold-100)', marginBottom: 8 }}>板块导航</div>
              <div style={{ display: 'grid', gap: 8 }}>
                {modules.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={mod === m.id ? 'gold-btn' : 'ghost-btn'}
                    style={{ textAlign: 'left' }}
                    onClick={() => {
                      setMod(m.id)
                      setModal(null)
                      setPlaying(false)
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {modal && (
          <div className="modal-mask" onClick={() => setModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: 28 }}>{modal.title}</h3>
              <p style={{ fontSize: 18 }}>{modal.body}</p>
              <button type="button" className="gold-btn" style={{ marginTop: 16 }} onClick={() => setModal(null)}>
                关闭
              </button>
            </div>
          </div>
        )}
      </div>
    </Stage>
  )
}

function SideStat({ title, value, unit }: { title: string; value: string; unit: string }) {
  return (
    <div className="panel" style={{ padding: '18px 20px' }}>
      <div style={{ color: 'var(--text-dim)', fontSize: 18 }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <span className="stat-num" style={{ fontSize: 42 }}>
          {value}
        </span>
        <span style={{ color: 'var(--text-dim)', fontSize: 18 }}>{unit}</span>
      </div>
    </div>
  )
}
