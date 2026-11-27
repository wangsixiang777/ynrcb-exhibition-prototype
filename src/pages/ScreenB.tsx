import { useEffect, useState } from 'react'
import { Stage } from '../components/Stage'
import {
  borderCounties,
  povertyPhoto,
  borderSide,
  happyVillage,
  networkStats,
  overseas,
  povertyCase,
  revitalization,
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
    <div className="glass stat">
      <span>{label}</span>
      <strong className="num">
        {value}
        {unit ? <em>{unit}</em> : null}
      </strong>
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

  const subtitle = [
    modules.find((m) => m.id === mod)?.label,
    mod === 'network' ? `当前层级 ${networkStats.levels[level].name}` : '',
    mod === 'border' && borderCounties[borderIdx] ? borderCounties[borderIdx].name : '',
  ].filter(Boolean).join(' · ')

  const base = import.meta.env.BASE_URL

  return (
    <Stage tone="viz">
      <div className="bleed">
        <img className="bleed-bg" src={`${base}hall/exhibition-hall.jpg`} alt="" />
        <div className="bleed-wash is-soft" />
        <div className="stage-well">
          <img className="stage-map" src="./maps/yunnan-map-sandtable.jpg" alt="云南沙盘示意图" />
          {mod !== 'specialty' && Array.from({ length: 10 + level * 6 }).map((_, i) => (
            <span key={i} className="dot" style={{ left: `${22 + ((i * 37) % 56)}%`, top: `${28 + ((i * 29) % 46)}%`, opacity: i < 3 + level ? 1 : 0.4 }} />
          ))}
          {mod === 'overseas' && (
            <div className="stage-dirs">
              <span>越南</span>
              <span>老挝</span>
              <span>缅甸</span>
            </div>
          )}
        </div>

        <aside className="bleed-side bleed-left">
          {mod === 'network' && (
            <>
              <Stat label="营业网点" value={`${networkStats.outlets}`} unit="个" />
              <Stat label="自助银行" value={`${networkStats.selfBanks}`} unit="个" />
              <Stat label="覆盖乡镇" value={`${networkStats.townships}`} unit="个" />
              <Stat label="服务站" value={networkStats.serviceStations} />
              <Stat label="支付点" value={networkStats.payPoints} />
            </>
          )}
          {mod === 'specialty' && (
            <div className="gold-card">
              <span className="chip">{branch.tag}</span>
              <h3>{branch.name}</h3>
              <p>{branch.text}</p>
              {branch.id === 'dulong' ? <p>{povertyCase.title}：{povertyCase.paras[1]}</p> : null}
            </div>
          )}
          {mod === 'border' && (
            <>
              <Stat label="边境县" value={`${borderSide.counties}`} unit="个" />
              <Stat label="边境网点" value={`${borderSide.branches}`} unit="个" />
              <div className="gold-card">
                <p>{borderSide.settlement}</p>
                <p>{borderSide.usd}</p>
                <p>{borderSide.portsNamed}</p>
                <p>{borderSide.signedResidents}</p>
                <p>{borderSide.merchants}</p>
                <p>{borderSide.orders}</p>
                <p>{borderSide.mutual}</p>
                <span className="chip warn">{borderSide.missing}</span>
              </div>
            </>
          )}
          {mod === 'happy' && (
            <>
              <Stat label="幸福村网点" value={`${happyVillage.outlets}`} unit="个" />
              <Stat label="贷款余额" value={happyVillage.loan} />
              <div className="gold-card"><p>{happyVillage.missing}</p></div>
            </>
          )}
          {mod === 'revitalize' && (
            <>
              <div className="seg">
                <button type="button" className={revType === 'national' ? 'is-active' : undefined} onClick={() => setRevType('national')}>国家级</button>
                <button type="button" className={revType === 'provincial' ? 'is-active' : undefined} onClick={() => setRevType('provincial')}>省级</button>
              </div>
              <Stat label={revType === 'national' ? '国家重点帮扶县' : '省级帮扶县'} value={`${revType === 'national' ? revitalization.national.counties : revitalization.provincial.counties}`} unit="个" />
              <Stat label="网点" value={`${revType === 'national' ? revitalization.national.branches : revitalization.provincial.branches}`} unit="个" />
              <div className="gold-card"><p>{revType === 'national' ? revitalization.national.tip : revitalization.provincial.tip}</p></div>
            </>
          )}
          {mod === 'overseas' && overseas.map((o) => (
            <button key={o.id} type="button" className="gold-card gold-btn" onClick={() => setModal({ title: o.title, body: o.body })}>
              <h3>{o.title}</h3>
              <p>{o.body}</p>
            </button>
          ))}
        </aside>

        <aside className="bleed-side bleed-right">
          {mod === 'network' && (
            <div className="gold-card">
              <h3>层级点亮 · {networkStats.levels[level].name}</h3>
              {networkStats.levels.map((l, idx) => (
                <button key={l.name} type="button" className={idx <= level ? 'level-row on' : 'level-row'} onClick={() => setLevel(idx)}>
                  <span>{l.name}</span><span className="num">{l.count}</span>
                </button>
              ))}
              <button type="button" className="btn-primary" style={{ width: '100%', marginTop: 8 }} onClick={() => setModal({ title: '农商行改制', body: '全省网点星光收束至昆明总行后弹出。改制介绍正文待提供。' })}>
                农商行改制
              </button>
            </div>
          )}
          {mod === 'specialty' && (
            <div className="gold-card">
              <h3>右侧实拍</h3>
              <img className="photo-fill" style={{ height: 168, marginTop: 8 }} src={`${base}${branch.photo}`} alt={branch.name} />
              {branch.id === 'dulong' ? (
                <img className="photo-fill" style={{ height: 110, marginTop: 8 }} src={`${base}${povertyPhoto}`} alt="独龙江减贫案例" />
              ) : null}
              {specialtyBranches.map((b) => (
                <button key={b.id} type="button" className={branchId === b.id ? 'btn-primary' : 'btn-ghost'} style={{ width: '100%', marginTop: 6, justifyContent: 'flex-start' }} onClick={() => setBranchId(b.id)}>
                  {b.name}
                </button>
              ))}
            </div>
          )}
          {mod === 'border' && (
            <div className="gold-card">
              <h3>边境县网点</h3>
              <div className="county-list">
                {borderCounties.map((c) => (
                  <div key={c.name} className={borderCounties[borderIdx]?.name === c.name ? 'on' : undefined}><span>{c.name}</span><b>{c.n}</b></div>
                ))}
              </div>
              <button type="button" className="btn-primary" style={{ width: '100%', marginTop: 8 }} disabled={playing} onClick={() => setPlaying(true)}>{playing ? '演示中' : '跑马灯'}</button>
            </div>
          )}
          {mod === 'happy' && (
            <div className="gold-card">
              <h3>待补维度</h3>
              <p>资料只有网点总数和贷款余额。民族系列产品明细没有单独表格。</p>
            </div>
          )}
          {mod === 'revitalize' && (
            <div className="gold-card">
              <h3>{revType === 'national' ? '国家级' : '省级'}</h3>
              <p>{revType === 'national' ? `${revitalization.national.counties} 个县、${revitalization.national.branches} 个网点` : `${revitalization.provincial.counties} 个县、${revitalization.provincial.branches} 个网点`}</p>
              <p>{revType === 'national' ? revitalization.national.tip : revitalization.provincial.tip}</p>
            </div>
          )}
          {mod === 'overseas' && (
            <div className="gold-card">
              <h3>已接入同业</h3>
              <p>越南 6 家、老挝 1 家、缅甸 1 家银行接入平台。</p>
              <p>API 直联为 2025 年 4 月末与老挝外贸大众银行上线。</p>
            </div>
          )}
        </aside>

        {mod === 'border' && popups.length > 0 && (
          <div className="bleed-popups">
            {popups.map((p) => (
              <div key={p.name} className="popup"><div>{p.name}</div><div className="num">{p.n} 个</div></div>
            ))}
          </div>
        )}

        <div className="bleed-tabs">
          {modules.map((m) => (
            <button key={m.id} type="button" className={mod === m.id ? 'is-on' : undefined} onClick={() => { setMod(m.id); setModal(null); setPlaying(false) }}>
              {m.label}
            </button>
          ))}
        </div>
        <p className="bleed-caption">{subtitle}{mod === 'specialty' ? ' · 资料包实拍' : ' · 沙盘为示意图'}</p>

        {modal && (
          <div className="modal-mask" onClick={() => setModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>{modal.title}</h3>
              <p>{modal.body}</p>
              <button type="button" className="btn-primary" style={{ marginTop: 12 }} onClick={() => setModal(null)}>关闭</button>
            </div>
          </div>
        )}
      </div>
    </Stage>
  )
}
