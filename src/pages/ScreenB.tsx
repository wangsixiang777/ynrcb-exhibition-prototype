import { useEffect, useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import { CompareBars, FlowBoard, HBars, MetricTiles, RingStat } from '../components/VizBits'
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

/** 昆明示意中心 */
const HQ = { left: 52, top: 48 }

/** 边境县示意点位（非测绘，沿滇西—滇南边境排布） */
const borderPins = borderCounties.map((c, i) => {
  const t = i / Math.max(borderCounties.length - 1, 1)
  const arc = (t - 0.5) * Math.PI * 0.95
  return {
    name: c.name,
    n: c.n,
    left: 28 + Math.sin(arc) * 26 + (i % 3) * 1.2,
    top: 34 + Math.cos(arc) * 18 + (i % 5) * 1.4,
  }
})

function makeRadiationDots(level: number) {
  const counts = [1, 8, 22, 48, 90]
  const total = counts[Math.min(level, counts.length - 1)]
  const dots: { left: number; top: number; star?: boolean }[] = []
  for (let i = 0; i < total; i += 1) {
    const ring = Math.floor(i / 6) + (i === 0 ? 0 : 1)
    const a = (i * 2.4 + ring * 0.35) % (Math.PI * 2)
    const r = i === 0 ? 0 : 4 + ring * 5.2 + (i % 3) * 1.1
    const left = HQ.left + Math.cos(a) * r
    const top = HQ.top + Math.sin(a) * r * 0.78
    dots.push({
      left: Math.min(86, Math.max(14, left)),
      top: Math.min(82, Math.max(18, top)),
      star: level >= 4 && i > 40,
    })
  }
  return dots
}

export function ScreenB() {
  const [mod, setMod] = useState<Module>('network')
  const [level, setLevel] = useState(0)
  const [branchId, setBranchId] = useState(specialtyBranches[0].id)
  const [borderIdx, setBorderIdx] = useState(-1)
  const [litCounties, setLitCounties] = useState<number[]>([])
  const [popups, setPopups] = useState<{ name: string; n: number }[]>([])
  const [revType, setRevType] = useState<'national' | 'provincial'>('national')
  const [modal, setModal] = useState<null | { title: string; body: string }>(null)
  const [playing, setPlaying] = useState(false)
  const [autoLevel, setAutoLevel] = useState(false)
  const [reforming, setReforming] = useState(false)
  const [reformT, setReformT] = useState(0)
  const [peerId, setPeerId] = useState<'vn' | 'la' | 'mm' | 'api'>('vn')
  const branch = specialtyBranches.find((b) => b.id === branchId)!
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    if (!playing || mod !== 'border') return
    setPopups([])
    setLitCounties([])
    setBorderIdx(-1)
    let i = 0
    const timer = window.setInterval(() => {
      const item = borderCounties[i]
      if (!item) {
        window.clearInterval(timer)
        setPlaying(false)
        return
      }
      setBorderIdx(i)
      setLitCounties((prev) => [...prev, i])
      setPopups((prev) => [...prev, { name: item.name, n: item.n }])
      i += 1
    }, 520)
    return () => window.clearInterval(timer)
  }, [playing, mod])

  useEffect(() => {
    if (!autoLevel || mod !== 'network') return
    setLevel(0)
    setReforming(false)
    let i = 0
    const timer = window.setInterval(() => {
      i += 1
      if (i > 4) {
        window.clearInterval(timer)
        setAutoLevel(false)
        return
      }
      setLevel(i)
    }, 900)
    return () => window.clearInterval(timer)
  }, [autoLevel, mod])

  useEffect(() => {
    if (!reforming || mod !== 'network') return
    setReformT(0)
    let t = 0
    const timer = window.setInterval(() => {
      t += 1
      setReformT(t)
      if (t >= 16) {
        window.clearInterval(timer)
        setReforming(false)
        setModal({
          title: '农商行改制',
          body: '全省网点星光收束至昆明总行后弹出。改制介绍正文待提供。',
        })
      }
    }, 120)
    return () => window.clearInterval(timer)
  }, [reforming, mod])

  const levelBars = useMemo(
    () => networkStats.levels
      .filter((l) => l.name !== '服务站')
      .map((l, idx) => ({
        label: l.name,
        value: l.count,
        active: idx === level,
        onClick: () => { setAutoLevel(false); setLevel(idx); setReforming(false) },
      })),
    [level],
  )

  const borderBars = useMemo(
    () => [...borderCounties]
      .sort((a, b) => b.n - a.n)
      .slice(0, 12)
      .map((c) => ({
        label: c.name.replace('/芒市相关', ''),
        value: c.n,
        active: borderCounties[borderIdx]?.name === c.name,
        onClick: () => {
          const idx = borderCounties.findIndex((x) => x.name === c.name)
          if (idx >= 0) {
            setBorderIdx(idx)
            setLitCounties((prev) => (prev.includes(idx) ? prev : [...prev, idx]))
            setPopups((prev) => (prev.some((p) => p.name === c.name) ? prev : [...prev, { name: c.name, n: c.n }]))
          }
        },
      })),
    [borderIdx],
  )

  const radiationDots = useMemo(() => makeRadiationDots(level), [level])
  const peer = overseas.find((o) => (peerId === 'api' ? o.id === 'api' : o.id === 'peers'))!

  const switchMod = (id: Module) => {
    setMod(id)
    setModal(null)
    setPlaying(false)
    setAutoLevel(false)
    setReforming(false)
  }

  return (
    <Stage tone="viz">
      <div className="bleed sand-bleed is-bright">
        <img className="bleed-bg" src={`${base}maps/yunnan-sandtable-bright.jpg`} alt="" />
        <div className="bleed-wash sand-wash-bright" />

        <div className="sand-stage">
          {mod === 'network' && radiationDots.map((d, i) => {
            const converge = reforming ? reformT / 16 : 0
            const left = d.left + (HQ.left - d.left) * converge
            const top = d.top + (HQ.top - d.top) * converge
            return (
              <span
                key={i}
                className={d.star ? 'sand-dot star' : i === 0 ? 'sand-dot hub' : 'sand-dot'}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  opacity: reforming ? 0.35 + (1 - converge) * 0.65 : 1,
                  transition: reforming ? 'left 0.12s linear, top 0.12s linear, opacity 0.12s linear' : 'opacity 0.35s ease',
                }}
              />
            )
          })}

          {mod === 'specialty' && specialtyBranches.map((b) => (
            <button
              key={b.id}
              type="button"
              className={branchId === b.id ? 'map-pin on' : 'map-pin'}
              style={{ left: b.pin.left, top: b.pin.top }}
              onClick={() => setBranchId(b.id)}
            >
              <i />
              <span>{b.short}</span>
              <em>{b.tag}</em>
            </button>
          ))}

          {(mod === 'border' || mod === 'happy') && borderPins.map((p, i) => {
            const lit = litCounties.includes(i) || (mod === 'happy' && i < 14)
            const hot = borderIdx === i
            return (
              <button
                key={p.name}
                type="button"
                className={`county-pin${lit ? ' lit' : ''}${hot ? ' hot' : ''}`}
                style={{ left: `${p.left}%`, top: `${p.top}%` }}
                onClick={() => {
                  if (mod !== 'border') return
                  setBorderIdx(i)
                  setLitCounties((prev) => (prev.includes(i) ? prev : [...prev, i]))
                  setPopups((prev) => (prev.some((x) => x.name === p.name) ? prev : [...prev, { name: p.name, n: p.n }]))
                }}
              >
                <i />
                {hot ? <span>{p.name.replace('/芒市相关', '')}</span> : null}
              </button>
            )
          })}

          {mod === 'revitalize' && radiationDots.slice(0, revType === 'national' ? 20 : 28).map((d, i) => (
            <span key={i} className="sand-dot soft" style={{ left: `${d.left}%`, top: `${d.top}%` }} />
          ))}

          {mod === 'overseas' && (
            <div className="sand-arrows" aria-hidden>
              <span className="arr vn">越南</span>
              <span className="arr la">老挝</span>
              <span className="arr mm">缅甸</span>
            </div>
          )}
        </div>

        <aside className="bleed-side bleed-left viz-panel">
          {mod === 'network' && (
            <div className="viz-card">
              <h3>覆盖规模</h3>
              <div className="viz-rings">
                <RingStat label="营业网点" value="2100" percent={100} />
                <RingStat label="覆盖乡镇" value="1962" percent={100} />
              </div>
              <MetricTiles
                items={[
                  { label: '自助银行', value: '2604' },
                  { label: '服务站', value: networkStats.serviceStations },
                  { label: '支付点', value: networkStats.payPoints },
                  { label: '基础金融', value: '全覆盖' },
                ]}
              />
            </div>
          )}

          {mod === 'specialty' && (
            <div className="viz-card">
              <div className="viz-head">
                <span className="chip">{branch.tag}</span>
                <h3>{branch.name}</h3>
              </div>
              <p className="viz-lead">{branch.text}</p>
              <div className="viz-chips">
                {branch.facts.slice(0, 6).map((f) => (
                  <div key={f.k} className="viz-chip">
                    <b>{f.k}</b>
                    <span>{f.v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mod === 'border' && (
            <div className="viz-card">
              <h3>边境金融服务</h3>
              <div className="viz-rings">
                <RingStat label="边境县" value={`${borderSide.counties}`} percent={100} />
                <RingStat label="边境网点" value={`约${borderSide.branches}`} percent={100} />
              </div>
              <MetricTiles
                items={[
                  { label: '跨境结算', value: '638亿+', tip: '累计' },
                  { label: '结算规模', value: '8.8亿$', tip: '美元' },
                  { label: '口岸', value: '3', tip: '磨憨勐满关累' },
                  { label: '签约边民', value: '3192' },
                  { label: '商家', value: '419' },
                  { label: '结算笔数', value: '21.76万', tip: '17.17亿元' },
                  { label: '互市点', value: '20', tip: '新业态系统' },
                ]}
              />
              <p className="viz-miss">{borderSide.missing}</p>
            </div>
          )}

          {mod === 'happy' && (
            <div className="viz-card">
              <h3>边境幸福村网点</h3>
              <div className="viz-rings">
                <RingStat label="营业网点" value={`${happyVillage.outlets}`} percent={100} />
                <RingStat label="贷款余额" value="264.42" percent={100} sub="亿元" />
              </div>
              <div className="viz-gauge">
                <div className="viz-gauge-lab">贷款余额</div>
                <div className="viz-gauge-track"><i style={{ width: '100%' }} /></div>
                <strong className="num">264.42 亿元</strong>
              </div>
              <p className="viz-miss">{happyVillage.missing}</p>
            </div>
          )}

          {mod === 'revitalize' && (
            <div className="viz-card">
              <h3>帮扶县对比</h3>
              <CompareBars
                rows={[
                  {
                    label: '县数',
                    a: revitalization.national.counties,
                    b: revitalization.provincial.counties,
                    aLab: `${revitalization.national.counties}`,
                    bLab: `${revitalization.provincial.counties}`,
                  },
                  {
                    label: '网点',
                    a: revitalization.national.branches,
                    b: revitalization.provincial.branches,
                    aLab: `${revitalization.national.branches}`,
                    bLab: `${revitalization.provincial.branches}`,
                  },
                ]}
              />
              <MetricTiles
                items={[
                  { label: '国家帮扶贷款', value: '1200亿+' },
                  { label: '脱贫小额信贷', value: '97%', tip: '全省投放占比' },
                  { label: '建档农户', value: '941万', tip: '建档面 95%' },
                ]}
              />
            </div>
          )}

          {mod === 'overseas' && (
            <div className="viz-card">
              <h3>境外同业接入</h3>
              <FlowBoard
                center="云南农信"
                nodes={[
                  { id: 'vn', label: '越南银行', count: 6, active: peerId === 'vn', onClick: () => setPeerId('vn') },
                  { id: 'la', label: '老挝银行', count: 1, active: peerId === 'la', onClick: () => setPeerId('la') },
                  { id: 'mm', label: '缅甸银行', count: 1, active: peerId === 'mm', onClick: () => setPeerId('mm') },
                ]}
              />
              <button
                type="button"
                className={peerId === 'api' ? 'viz-cta on' : 'viz-cta'}
                onClick={() => setPeerId('api')}
              >
                API 直联 · 中老实时结算
              </button>
            </div>
          )}
        </aside>

        <aside className="bleed-side bleed-right viz-panel">
          {mod === 'network' && (
            <div className="viz-card">
              <h3>层级点亮 · {networkStats.levels[level].name}</h3>
              <p className="viz-note">由昆明总行向外辐射；分理处为星光点。点层级或点「自动点亮」演示。</p>
              <HBars items={levelBars} />
              <div className="viz-actions">
                <button
                  type="button"
                  className="viz-cta ghost"
                  disabled={autoLevel || reforming}
                  onClick={() => setAutoLevel(true)}
                >
                  {autoLevel ? '点亮中…' : '自动点亮'}
                </button>
                <button
                  type="button"
                  className="viz-cta"
                  disabled={reforming || autoLevel}
                  onClick={() => { setLevel(4); setReforming(true) }}
                >
                  {reforming ? '星光收束中…' : '农商行改制 · 星光收束'}
                </button>
              </div>
              <p className="viz-note">服务站 60 为清单口径，与「1.3万+服务站」不同口径</p>
            </div>
          )}

          {mod === 'specialty' && (
            <div className="viz-card spec-media">
              <h3>网点实拍</h3>
              <img src={`${base}${branch.photo}`} alt={branch.name} />
              {branch.id === 'dulong' ? (
                <img src={`${base}${povertyPhoto}`} alt={povertyCase.title} />
              ) : null}
              <div className="spec-switches">
                {specialtyBranches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={branchId === b.id ? 'is-on' : undefined}
                    onClick={() => setBranchId(b.id)}
                  >
                    <b>{b.short}</b>
                    <em>{b.tag}</em>
                  </button>
                ))}
              </div>
            </div>
          )}

          {mod === 'border' && (
            <div className="viz-card">
              <h3>分县网点量 · Top12</h3>
              <p className="viz-note">沙盘 25 县示意点依次亮起；弹窗累计不消失</p>
              <HBars items={borderBars} />
              <button type="button" className="viz-cta" disabled={playing} onClick={() => setPlaying(true)}>
                {playing ? `跑马灯 ${litCounties.length}/25` : '跑马灯依次点亮'}
              </button>
            </div>
          )}

          {mod === 'happy' && (
            <div className="viz-card">
              <h3>清单口径</h3>
              <div className="viz-stack">
                <div className="viz-stack-item">
                  <span>边境幸福村营业网点</span>
                  <strong className="num">126</strong>
                </div>
                <div className="viz-stack-item">
                  <span>贷款余额</span>
                  <strong className="num">264.42 亿</strong>
                </div>
              </div>
              <p className="viz-note">幸福村总数、覆盖人数、民族系列产品：资料未给分项，不编造。</p>
            </div>
          )}

          {mod === 'revitalize' && (
            <div className="viz-card">
              <div className="seg">
                <button type="button" className={revType === 'national' ? 'is-active' : undefined} onClick={() => setRevType('national')}>国家级</button>
                <button type="button" className={revType === 'provincial' ? 'is-active' : undefined} onClick={() => setRevType('provincial')}>省级</button>
              </div>
              <div className="viz-stack">
                <div className="viz-stack-item">
                  <span>{revType === 'national' ? '国家重点帮扶县' : '省级帮扶县'}</span>
                  <strong className="num">{revType === 'national' ? revitalization.national.counties : revitalization.provincial.counties}</strong>
                </div>
                <div className="viz-stack-item">
                  <span>网点</span>
                  <strong className="num">{revType === 'national' ? revitalization.national.branches : revitalization.provincial.branches}</strong>
                </div>
              </div>
              <p className="viz-lead">{revType === 'national' ? revitalization.national.tip : revitalization.provincial.tip}</p>
            </div>
          )}

          {mod === 'overseas' && (
            <div className="viz-card">
              <h3>{peer.title}</h3>
              <p className="viz-lead">{peer.body}</p>
              <button type="button" className="viz-cta" onClick={() => setModal({ title: peer.title, body: peer.body })}>
                展开说明弹窗
              </button>
            </div>
          )}
        </aside>

        {mod === 'border' && popups.length > 0 && (
          <div className="bleed-popups">
            {popups.map((p) => (
              <div key={p.name} className="popup">
                <div>{p.name.replace('/芒市相关', '')}</div>
                <div className="num">{p.n} 个</div>
              </div>
            ))}
          </div>
        )}

        <div className="bleed-tabs">
          {modules.map((m) => (
            <button
              key={m.id}
              type="button"
              className={mod === m.id ? 'is-on' : undefined}
              onClick={() => switchMod(m.id)}
            >
              {m.label}
            </button>
          ))}
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
