import { useEffect, useState } from 'react'
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

type Module = 'network' | 'specialty' | 'border' | 'happy' | 'revitalize' | 'overseas'

const modules: { id: Module; label: string }[] = [
  { id: 'network', label: '网点分布' },
  { id: 'specialty', label: '特色网点' },
  { id: 'border', label: '边境县' },
  { id: 'happy', label: '幸福村' },
  { id: 'revitalize', label: '帮扶县' },
  { id: 'overseas', label: '境外金融' },
]

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="glass" style={{ padding: '18px 20px' }}>
      <div style={{ fontSize: 16, color: 'var(--muted)' }}>{label}</div>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span className="num" style={{ fontSize: 40, lineHeight: 1 }}>{value}</span>
        {unit ? <span style={{ fontSize: 16, color: 'var(--muted-2)' }}>{unit}</span> : null}
      </div>
    </div>
  )
}

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
    }, 650)
    return () => window.clearInterval(timer)
  }, [playing, mod])

  return (
    <Stage
      width={3584}
      height={2048}
      title={screenMeta.B.title}
      sizeLabel={screenMeta.B.size}
      hint="沙盘为示意图。底部切换六大板块；弹窗与跑马灯用于核对交互逻辑。"
    >
      <div className="hud" style={{ padding: '40px 48px 36px', display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="title-cn" style={{ fontSize: 42 }}>金融服务展示</div>
            <div style={{ marginTop: 6, fontSize: 20, color: 'var(--muted)' }}>
              {modules.find((m) => m.id === mod)?.label}
              {mod === 'network' ? ` · 当前层级 ${networkStats.levels[level].name}` : ''}
              {mod === 'border' && borderCounties[borderIdx] ? ` · ${borderCounties[borderIdx].name}` : ''}
            </div>
          </div>
          <div className="chip">示意图替代三维沙盘</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '680px 1fr 680px', gap: 22, minHeight: 0 }}>
          {/* left */}
          <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
            {mod === 'network' && (
              <>
                <Stat label="营业网点" value={`${networkStats.outlets}`} unit="个" />
                <Stat label="覆盖乡镇" value={`${networkStats.townships}`} unit="个" />
                <Stat label="服务站 / 支付点" value={networkStats.serviceStations} unit={networkStats.payPoints} />
                <div className="glass" style={{ padding: 18 }}>
                  <div style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 10 }}>层级点亮</div>
                  {networkStats.levels.map((l, idx) => (
                    <button
                      key={l.name}
                      type="button"
                      onClick={() => setLevel(idx)}
                      style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        padding: '12px 4px',
                        borderBottom: '1px solid rgba(224,179,90,0.1)',
                        color: idx <= level ? 'var(--gold-soft)' : 'var(--muted-2)',
                        fontSize: 20,
                      }}
                    >
                      <span>{l.name}</span>
                      <span className="num">{l.count}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ width: '100%', marginTop: 14 }}
                    onClick={() =>
                      setModal({
                        title: '农商行改制',
                        body: '交互：全省网点星光收束至昆明总行后弹出。改制介绍正文待甲方提供。',
                      })
                    }
                  >
                    农商行改制
                  </button>
                </div>
              </>
            )}

            {mod === 'specialty' && (
              <div className="glass" style={{ padding: 24 }}>
                <span className="chip">{branch.tag}</span>
                <div className="title-cn" style={{ fontSize: 32, marginTop: 12 }}>{branch.name}</div>
                <p style={{ marginTop: 14, fontSize: 20, lineHeight: 1.75, color: 'var(--muted)' }}>{branch.text}</p>
                {branch.id === 'dulong' && (
                  <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.7, color: 'var(--gold-soft)' }}>
                    {povertyCase.title}：{povertyCase.paras[1]}
                  </p>
                )}
              </div>
            )}

            {mod === 'border' && (
              <>
                <Stat label="边境县" value={`${borderSide.counties}`} unit="个" />
                <Stat label="边境网点约" value={`${borderSide.branches}`} unit="个" />
                <div className="glass" style={{ padding: 20, fontSize: 18, lineHeight: 1.7, color: 'var(--muted)' }}>
                  <div>{borderSide.settlement}</div>
                  <div>{borderSide.usd}</div>
                  <div style={{ marginTop: 8 }} className="chip warn">{borderSide.note}</div>
                </div>
              </>
            )}

            {mod === 'happy' && (
              <>
                <Stat label="幸福村网点" value={`${happyVillage.total}`} unit="个" />
                <Stat label="贷款余额" value={happyVillage.loan} />
                <div className="glass" style={{ padding: 20, color: 'var(--muted)', fontSize: 18 }}>{happyVillage.note}</div>
              </>
            )}

            {mod === 'revitalize' && (
              <>
                <div className="seg">
                  <button type="button" className={revType === 'national' ? 'is-active' : undefined} onClick={() => setRevType('national')}>国家级</button>
                  <button type="button" className={revType === 'provincial' ? 'is-active' : undefined} onClick={() => setRevType('provincial')}>省级</button>
                </div>
                <Stat
                  label={revType === 'national' ? '国家重点帮扶县' : '省级帮扶县'}
                  value={`${revType === 'national' ? revitalization.national.counties : revitalization.provincial.counties}`}
                  unit="个"
                />
                <Stat
                  label="网点数"
                  value={`${revType === 'national' ? revitalization.national.branches : revitalization.provincial.branches}`}
                  unit="个"
                />
                <div className="glass" style={{ padding: 20, fontSize: 18, lineHeight: 1.7, color: 'var(--muted)' }}>
                  {revType === 'national' ? revitalization.national.tip : revitalization.provincial.tip}
                </div>
              </>
            )}

            {mod === 'overseas' && (
              <div className="glass" style={{ padding: 20, display: 'grid', gap: 12 }}>
                {overseas.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className="btn-ghost"
                    style={{ justifyContent: 'space-between' }}
                    onClick={() => setModal({ title: o.title, body: o.body })}
                  >
                    <span>{o.title}</span>
                    <span>→</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* map */}
          <div className="glass-strong" style={{ position: 'relative', overflow: 'hidden', minHeight: 980 }}>
            <img
              src="./maps/yunnan-map-sandtable.jpg"
              alt="云南沙盘示意图"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 48%, transparent 18%, rgba(8,5,2,0.55) 78%), linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.4))',
              }}
            />
            {Array.from({ length: 16 + level * 7 }).map((_, i) => (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  left: `${14 + ((i * 41) % 72)}%`,
                  top: `${20 + ((i * 47) % 58)}%`,
                  width: 7 + (i % 3) * 3,
                  height: 7 + (i % 3) * 3,
                  borderRadius: '50%',
                  background: i < 4 + level * 2 ? 'var(--gold-soft)' : 'rgba(224,179,90,0.3)',
                  boxShadow: i < 4 + level * 2 ? '0 0 14px rgba(224,179,90,0.85)' : 'none',
                }}
              />
            ))}
            {mod === 'border' && (
              <div style={{ position: 'absolute', right: 16, top: 16, display: 'grid', gap: 8, maxHeight: '72%', overflow: 'auto' }}>
                {popups.map((p) => (
                  <div key={p.name} className="glass" style={{ padding: '10px 14px', minWidth: 150 }}>
                    <div style={{ color: 'var(--gold-soft)' }}>{p.name}</div>
                    <div className="num">{p.n} 个</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', gap: 10 }}>
              {mod === 'network' && (
                <button type="button" className="btn-ghost" onClick={() => setLevel((v) => Math.min(v + 1, networkStats.levels.length - 1))}>
                  下一层级
                </button>
              )}
              {mod === 'border' && (
                <button type="button" className="btn-primary" disabled={playing} onClick={() => setPlaying(true)}>
                  {playing ? '演示中…' : '跑马灯演示'}
                </button>
              )}
            </div>
          </div>

          {/* right */}
          <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
            {mod === 'specialty' ? (
              <>
                <div className="glass" style={{ padding: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {specialtyBranches.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      className={branchId === b.id ? 'btn-primary' : 'btn-ghost'}
                      style={{ height: 36 }}
                      onClick={() => setBranchId(b.id)}
                    >
                      {b.name.replace('市农商行营业部', '').replace('信用社', '')}
                    </button>
                  ))}
                </div>
                <div
                  className="glass"
                  style={{
                    height: 560,
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                    padding: 24,
                    background: 'linear-gradient(135deg, rgba(224,179,90,0.14), rgba(0,0,0,0.35))',
                  }}
                >
                  <div>
                    <div className="title-cn" style={{ fontSize: 28 }}>网点实拍主图</div>
                    <div style={{ marginTop: 10, color: 'var(--muted)', fontSize: 18 }}>正式接入特色网点照片精修图</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="glass" style={{ padding: 24 }}>
                <div className="title-cn" style={{ fontSize: 24, marginBottom: 12 }}>本侧展示</div>
                <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--muted)', fontSize: 20, lineHeight: 1.8 }}>
                  {mod === 'network' && (
                    <>
                      <li>基础金融全覆盖说明</li>
                      <li>由总行向外辐射的动效说明</li>
                    </>
                  )}
                  {mod === 'border' && (
                    <>
                      <li>口岸与边民互市</li>
                      <li>信贷投放补充位</li>
                    </>
                  )}
                  {mod === 'happy' && <li>民族系列产品数据卡</li>}
                  {mod === 'revitalize' && <li>区县名单 / 高亮图例</li>}
                  {mod === 'overseas' && <li>中老 / 中越 / 缅甸方向示意</li>}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="seg">
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                className={mod === m.id ? 'is-active' : undefined}
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

        {modal && (
          <div className="modal-mask" onClick={() => setModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>{modal.title}</h3>
              <p>{modal.body}</p>
              <button type="button" className="btn-primary" style={{ marginTop: 18 }} onClick={() => setModal(null)}>
                关闭
              </button>
            </div>
          </div>
        )}
      </div>
    </Stage>
  )
}
