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

  return (
    <Stage title={screenMeta.B.title} hint="预览 1920×1080 · 实物屏 3584×2048 · 沙盘为示意图">
      <div className="board board-b">
        <div className="b-head">
          <div>
            <h2 className="title-cn">金融服务展示</h2>
            <p>{subtitle}</p>
          </div>
          <span className="chip">{mod === 'specialty' ? '资料包实拍' : '示意图替代三维沙盘'}</span>
        </div>

        <div className="b-grid">
          <div className="b-side">
            {mod === 'network' && (
              <>
                <Stat label="营业网点" value={`${networkStats.outlets}`} unit="个" />
                <Stat label="覆盖乡镇" value={`${networkStats.townships}`} unit="个" />
                <Stat label="服务站 / 支付点" value={networkStats.serviceStations} unit={networkStats.payPoints} />
                <div className="glass side-note">
                  <h3>层级点亮</h3>
                  {networkStats.levels.map((l, idx) => (
                    <button key={l.name} type="button" className={idx <= level ? 'level-row on' : 'level-row'} onClick={() => setLevel(idx)}>
                      <span>{l.name}</span><span className="num">{l.count}</span>
                    </button>
                  ))}
                  <button type="button" className="btn-primary" style={{ width: '100%', marginTop: 8 }} onClick={() => setModal({ title: '农商行改制', body: '全省网点星光收束至昆明总行后弹出。改制介绍正文待提供。' })}>
                    农商行改制
                  </button>
                </div>
              </>
            )}
            {mod === 'specialty' && (
              <div className="glass side-note">
                <span className="chip">{branch.tag}</span>
                <h3 style={{ marginTop: 8 }}>{branch.name}</h3>
                <p>{branch.text}</p>
                {branch.id === 'dulong' ? (
                  <>
                    <p>{povertyCase.title}：{povertyCase.paras[1]}</p>
                    <img className="photo-fill" style={{ height: 140, marginTop: 8 }} src={`${import.meta.env.BASE_URL}${povertyPhoto}`} alt="独龙江减贫案例" />
                  </>
                ) : null}
              </div>
            )}
            {mod === 'border' && (
              <>
                <Stat label="边境县" value={`${borderSide.counties}`} unit="个" />
                <Stat label="边境网点约" value={`${borderSide.branches}`} unit="个" />
                <div className="glass side-note">
                  <p>{borderSide.settlement}</p>
                  <p>{borderSide.usd}</p>
                  <span className="chip warn">{borderSide.note}</span>
                </div>
              </>
            )}
            {mod === 'happy' && (
              <>
                <Stat label="幸福村网点" value={`${happyVillage.total}`} unit="个" />
                <Stat label="贷款余额" value={happyVillage.loan} />
                <div className="glass side-note">{happyVillage.note}</div>
              </>
            )}
            {mod === 'revitalize' && (
              <>
                <div className="seg">
                  <button type="button" className={revType === 'national' ? 'is-active' : undefined} onClick={() => setRevType('national')}>国家级</button>
                  <button type="button" className={revType === 'provincial' ? 'is-active' : undefined} onClick={() => setRevType('provincial')}>省级</button>
                </div>
                <Stat label={revType === 'national' ? '国家重点帮扶县' : '省级帮扶县'} value={`${revType === 'national' ? revitalization.national.counties : revitalization.provincial.counties}`} unit="个" />
                <Stat label="网点数" value={`${revType === 'national' ? revitalization.national.branches : revitalization.provincial.branches}`} unit="个" />
                <div className="glass side-note">{revType === 'national' ? revitalization.national.tip : revitalization.provincial.tip}</div>
              </>
            )}
            {mod === 'overseas' && (
              <div className="glass side-note">
                {overseas.map((o) => (
                  <button key={o.id} type="button" className="btn-ghost" style={{ width: '100%', marginBottom: 8, justifyContent: 'space-between' }} onClick={() => setModal({ title: o.title, body: o.body })}>
                    {o.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="glass map-stage">
            {mod === 'specialty' ? (
              <img src={`${import.meta.env.BASE_URL}${branch.photo}`} alt={branch.name} />
            ) : (
              <img src="./maps/yunnan-map-sandtable.jpg" alt="云南沙盘示意图" />
            )}
            {mod === 'specialty' ? null : <div className="veil" />}
            {mod !== 'specialty' && Array.from({ length: 14 + level * 4 }).map((_, i) => (
              <span key={i} className="dot" style={{ left: `${16 + ((i * 37) % 68)}%`, top: `${22 + ((i * 29) % 54)}%`, width: 7, height: 7, opacity: i < 4 + level ? 1 : 0.35 }} />
            ))}
            {mod === 'border' && (
              <div className="popups">
                {popups.map((p) => (
                  <div key={p.name} className="popup"><div>{p.name}</div><div className="num">{p.n} 个</div></div>
                ))}
              </div>
            )}
            <div className="map-actions">
              {mod === 'network' && <button type="button" className="btn-ghost" onClick={() => setLevel((v) => Math.min(v + 1, networkStats.levels.length - 1))}>下一层级</button>}
              {mod === 'border' && <button type="button" className="btn-primary" disabled={playing} onClick={() => setPlaying(true)}>{playing ? '演示中' : '跑马灯演示'}</button>}
            </div>
          </div>

          <div className="b-side">
            {mod === 'specialty' ? (
              <div className="glass side-note" style={{ display: 'grid', gap: 8 }}>
                <h3>实拍网点</h3>
                {specialtyBranches.map((b) => (
                  <button key={b.id} type="button" className={branchId === b.id ? 'btn-primary' : 'btn-ghost'} style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setBranchId(b.id)}>
                    {b.name.replace('市农商行营业部', '').replace('信用社', '')}
                  </button>
                ))}
                <p>主图为资料包网点照片。独龙江另附全球减贫案例图。</p>
              </div>
            ) : (
              <div className="glass side-note">
                <h3>本侧展示</h3>
                {mod === 'network' && <p>基础金融全覆盖，由总行向外辐射。</p>}
                {mod === 'border' && <p>口岸、边民互市与信贷投放补充位。</p>}
                {mod === 'happy' && <p>民族系列产品数据卡，明细待补。</p>}
                {mod === 'revitalize' && <p>国家 / 省级区县高亮与名单摘要。</p>}
                {mod === 'overseas' && <p>中老、中越、缅甸方向示意。</p>}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="seg">
            {modules.map((m) => (
              <button key={m.id} type="button" className={mod === m.id ? 'is-active' : undefined} onClick={() => { setMod(m.id); setModal(null); setPlaying(false) }}>
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
              <button type="button" className="btn-primary" style={{ marginTop: 12 }} onClick={() => setModal(null)}>关闭</button>
            </div>
          </div>
        )}
      </div>
    </Stage>
  )
}
