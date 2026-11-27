import { useEffect, useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import { CompareBars, FlowBoard, HBars, MetricTiles } from '../components/VizBits'
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

/** 昆明 · 地图红点大致位置（object-fit: contain 下的舞台百分比） */
const HQ = { left: 56.5, top: 47.5 }

/** 边境县：按滇西—滇南—滇东南边境走向排布（示意，非测绘） */
const borderGeo: Record<string, { left: number; top: number }> = {
  贡山: { left: 38.5, top: 30.5 },
  福贡: { left: 39.2, top: 34.0 },
  腾冲: { left: 40.0, top: 42.5 },
  龙陵: { left: 41.2, top: 46.0 },
  盈江: { left: 38.8, top: 45.5 },
  陇川: { left: 38.2, top: 48.0 },
  瑞丽: { left: 37.5, top: 50.0 },
  '畹町/芒市相关': { left: 39.0, top: 49.2 },
  镇康: { left: 40.5, top: 52.5 },
  耿马: { left: 41.5, top: 55.0 },
  沧源: { left: 42.0, top: 57.5 },
  西盟: { left: 43.5, top: 60.0 },
  孟连: { left: 44.0, top: 62.0 },
  澜沧: { left: 45.5, top: 61.0 },
  勐海: { left: 47.5, top: 66.5 },
  景洪: { left: 50.5, top: 68.0 },
  勐腊: { left: 53.5, top: 69.0 },
  江城: { left: 54.5, top: 65.5 },
  绿春: { left: 57.0, top: 64.0 },
  金平: { left: 59.5, top: 65.5 },
  河口: { left: 63.5, top: 66.5 },
  元阳: { left: 58.5, top: 61.5 },
  麻栗坡: { left: 65.0, top: 60.0 },
  富宁: { left: 67.5, top: 56.5 },
  其他边境县: { left: 61.0, top: 58.0 },
}

const borderPins = borderCounties.map((c) => {
  const g = borderGeo[c.name] ?? { left: 52, top: 55 }
  return { name: c.name, n: c.n, left: g.left, top: g.top }
})

type RadDot = {
  left: number
  top: number
  dist: number
  star?: boolean
  hub?: boolean
  /** 中心支行抛物线抬升 */
  lift: number
  centerBranch?: boolean
}

/** 涟漪辐射点：由近到远依次显现；仅中心支行带抛物线 */
function makeRadiationDots(level: number): RadDot[] {
  const targets = [1, 17, 48, 130, 200] // 含总行：1 / 1+16 / +一级抽 / +支行抽 / +分理处星光
  const total = targets[Math.min(level, targets.length - 1)]
  const dots: RadDot[] = []
  for (let i = 0; i < total; i += 1) {
    if (i === 0) {
      dots.push({ left: HQ.left, top: HQ.top, dist: 0, hub: true, lift: 0 })
      continue
    }
    const isCenter = i <= 16
    const sector = (i * 2.399) % (Math.PI * 2)
    const a = -Math.PI * 0.55 + (sector / (Math.PI * 2)) * Math.PI * 1.7
    const dist = isCenter
      ? 8 + (i % 5) * 1.6 + (i % 3)
      : 10 + ((i - 16) % 6) * 2.2 + Math.floor((i - 16) / 8) * 3.4
    const left = Math.min(72, Math.max(34, HQ.left + Math.cos(a) * dist * 1.02))
    const top = Math.min(74, Math.max(26, HQ.top + Math.sin(a) * dist * 0.8))
    const realDist = Math.hypot(left - HQ.left, top - HQ.top)
    dots.push({
      left,
      top,
      dist: realDist,
      star: level >= 4 && i > 120,
      lift: isCenter ? 5 + (i % 4) * 1.2 : 0,
      centerBranch: isCenter,
    })
  }
  return dots
}

function quadPath(from: { left: number; top: number }, to: RadDot) {
  const midX = (from.left + to.left) / 2
  const midY = (from.top + to.top) / 2 - to.lift
  return `M ${from.left} ${from.top} Q ${midX} ${midY} ${to.left} ${to.top}`
}

const cosmosStars = Array.from({ length: 72 }, (_, i) => ({
  left: ((i * 53) % 100) + (i % 9) * 0.15,
  top: ((i * 37) % 100) + (i % 6) * 0.2,
  size: 1.2 + (i % 5) * 0.7,
  delay: (i % 16) * 0.14,
  drift: (i % 5) - 2,
}))

const shootingStars = Array.from({ length: 5 }, (_, i) => ({
  left: 10 + i * 18,
  top: 8 + (i % 3) * 12,
  delay: 0.4 + i * 0.55,
  len: 40 + i * 8,
}))

export function ScreenB() {
  const [mod, setMod] = useState<Module>('network')
  const [level, setLevel] = useState(0)
  const [branchId, setBranchId] = useState(specialtyBranches[0].id)
  const [borderIdx, setBorderIdx] = useState(-1)
  const [litCounties, setLitCounties] = useState<number[]>([])
  const [revType, setRevType] = useState<'national' | 'provincial'>('national')
  const [modal, setModal] = useState<null | { title: string; body: string }>(null)
  const [autoLevel, setAutoLevel] = useState(false)
  const [reforming, setReforming] = useState(false)
  const [peerId, setPeerId] = useState<'vn' | 'la' | 'mm' | 'api'>('vn')
  /** 宇宙星空 → 云南沙盘 */
  const [cosmosPhase, setCosmosPhase] = useState<'intro' | 'zoom' | 'done'>('intro')
  const [cosmosKey, setCosmosKey] = useState(0)
  const branch = specialtyBranches.find((b) => b.id === branchId)!
  const base = import.meta.env.BASE_URL

  const replayCosmos = () => {
    setCosmosPhase('intro')
    setCosmosKey((k) => k + 1)
    setLevel(0)
    setAutoLevel(false)
    setReforming(false)
  }

  useEffect(() => {
    setCosmosPhase('intro')
    const toZoom = window.setTimeout(() => setCosmosPhase('zoom'), 2200)
    const toDone = window.setTimeout(() => {
      setCosmosPhase('done')
      setAutoLevel(true)
    }, 4800)
    return () => {
      window.clearTimeout(toZoom)
      window.clearTimeout(toDone)
    }
  }, [cosmosKey])

  /** 边境县：每秒一县自动跑马灯，跑完清零循环 */
  useEffect(() => {
    if (mod !== 'border') {
      setBorderIdx(-1)
      setLitCounties([])
      return
    }
    setLitCounties([])
    setBorderIdx(-1)
    let i = 0
    const tick = () => {
      if (i >= borderCounties.length) {
        i = 0
        setLitCounties([])
      }
      const cur = i
      setBorderIdx(cur)
      setLitCounties((prev) => (prev.includes(cur) ? prev : [...prev, cur]))
      i += 1
    }
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [mod])

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
    }, 1400)
    return () => window.clearInterval(timer)
  }, [autoLevel, mod])

  /** 改制收束：纯 CSS 动画，结束后弹窗 */
  useEffect(() => {
    if (!reforming || mod !== 'network') return
    const timer = window.setTimeout(() => {
      setReforming(false)
      setModal({
        title: '农商行改制',
        body: '全省网点星光收束至昆明总行后弹出。改制介绍正文待提供。',
      })
    }, 1800)
    return () => window.clearTimeout(timer)
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
      })),
    [borderIdx],
  )

  const radiationDots = useMemo(() => makeRadiationDots(level), [level])
  const peer = overseas.find((o) => (peerId === 'api' ? o.id === 'api' : o.id === 'peers'))!

  const switchMod = (id: Module) => {
    setMod(id)
    setModal(null)
    setAutoLevel(false)
    setReforming(false)
  }

  const cosmosOn = cosmosPhase !== 'done'

  return (
    <Stage tone="viz">
      <div className={`bleed sand-bleed is-bright${cosmosOn ? ' cosmos-on' : ''}`}>
        <img
          className={`bleed-bg${cosmosPhase === 'intro' ? ' is-far' : ''}${cosmosPhase === 'zoom' ? ' is-arrive' : ''}`}
          src={`${base}maps/yunnan-map-official.png`}
          alt=""
        />
        <div className="bleed-wash sand-wash-bright" />

        {cosmosOn && (
          <div key={cosmosKey} className={`cosmos-layer phase-${cosmosPhase}`} aria-hidden>
            <div className="cosmos-nebula n1" />
            <div className="cosmos-nebula n2" />
            <div className="cosmos-glow" />
            {cosmosStars.map((s, i) => (
              <span
                key={i}
                className="cosmos-star"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: s.size,
                  height: s.size,
                  animationDelay: `${s.delay}s`,
                  ['--drift' as string]: `${s.drift}px`,
                }}
              />
            ))}
            {shootingStars.map((s, i) => (
              <span
                key={`shot-${i}`}
                className="cosmos-shot"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: s.len,
                  animationDelay: `${s.delay}s`,
                }}
              />
            ))}
            <p className="cosmos-caption">宇宙星空 · 切入云南沙盘</p>
          </div>
        )}

        <div className="sand-stage">
          {mod === 'network' && cosmosPhase === 'done' && (
            <>
              {level >= 1 && !reforming && (
                <div
                  key={`rip-${level}`}
                  className="ripple-ring"
                  style={{ left: `${HQ.left}%`, top: `${HQ.top}%` }}
                />
              )}
              {level >= 1 && !reforming && (
                <svg className="rad-arcs" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255,230,160,0)" />
                      <stop offset="55%" stopColor="rgba(255,200,100,0.55)" />
                      <stop offset="100%" stopColor="#fff6d0" />
                    </linearGradient>
                  </defs>
                  {radiationDots.filter((d) => d.centerBranch).map((d, i) => {
                    const dPath = quadPath(HQ, d)
                    const delay = `${(d.dist / 42) * 0.55 + i * 0.05}s`
                    return (
                      <g key={i} className="rad-arc-group" style={{ animationDelay: delay }}>
                        <path className="rad-arc-base" d={dPath} pathLength={1} />
                        <path
                          className="rad-arc-flow tail"
                          d={dPath}
                          pathLength={1}
                          style={{ animationDelay: `${i * 0.11}s` }}
                        />
                        <path
                          className="rad-arc-flow head"
                          d={dPath}
                          pathLength={1}
                          style={{ animationDelay: `${i * 0.11}s` }}
                        />
                      </g>
                    )
                  })}
                </svg>
              )}
              <div key={`dots-${level}`} className="sand-dots">
                {radiationDots.map((d, i) => (
                  <span
                    key={i}
                    className={`${d.star ? 'sand-dot star' : d.hub ? 'sand-dot hub' : 'sand-dot'}${reforming ? ' is-reform' : ' is-reveal'}`}
                    style={{
                      left: `${d.left}%`,
                      top: `${d.top}%`,
                      ['--hx' as string]: `${HQ.left}%`,
                      ['--hy' as string]: `${HQ.top}%`,
                      animationDelay: reforming ? `${(1 - d.dist / 45) * 0.5}s` : `${d.dist * 0.038}s`,
                    }}
                  />
                ))}
              </div>
            </>
          )}

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
            const hot = mod === 'border' && borderIdx === i
            return (
              <div
                key={p.name}
                className={`county-pin${lit ? ' lit' : ''}${hot ? ' hot' : ''}`}
                style={{ left: `${p.left}%`, top: `${p.top}%` }}
              >
                <i className="county-dot" />
                {hot ? <em className="county-pulse" /> : null}
                {hot ? (
                  <div className="county-pop is-new">
                    <b>{p.name.replace('/芒市相关', '')}</b>
                    <strong className="num">{p.n} 个网点</strong>
                  </div>
                ) : null}
              </div>
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
            <>
              <div className="glass-card">
                <p className="glass-kicker">二级按钮 · 层级点亮</p>
                <h3>当前：{networkStats.levels[level].name}</h3>
                <p className="viz-note">由昆明总行向外涟漪点亮；中心支行显示抛物线流光。</p>
                <div className="level-btns">
                  {levelBars.map((item, idx) => (
                    <button
                      key={item.label}
                      type="button"
                      className={item.active ? 'is-on' : undefined}
                      onClick={() => { setAutoLevel(false); setLevel(idx); setReforming(false) }}
                    >
                      <span>{item.label}</span>
                      <strong className="num">{item.value}</strong>
                    </button>
                  ))}
                  <button
                    type="button"
                    className={reforming ? 'is-on' : undefined}
                    disabled={reforming || autoLevel || cosmosOn}
                    onClick={() => { setLevel(4); setReforming(true) }}
                  >
                    <span>{reforming ? '星光收束中…' : '农商行改制'}</span>
                    <strong>收束</strong>
                  </button>
                </div>
              </div>
              <div className="glass-card">
                <p className="glass-kicker">沙盘演示</p>
                <div className="viz-actions tight">
                  <button type="button" className="viz-cta ghost" onClick={replayCosmos}>重播星空切入</button>
                  <button type="button" className="viz-cta ghost" disabled={autoLevel || reforming || cosmosOn} onClick={() => setAutoLevel(true)}>
                    {autoLevel ? '点亮中…' : '自动依次点亮'}
                  </button>
                </div>
              </div>
            </>
          )}

          {mod === 'specialty' && (
            <>
              <div className="glass-card">
                <p className="glass-kicker">板块二 · 网点介绍</p>
                <span className="chip">{branch.tag}</span>
                <h3>{branch.name}</h3>
                <p className="viz-lead">{branch.text}</p>
                <div className="viz-chips compact">
                  {branch.facts.slice(0, 4).map((f) => (
                    <div key={f.k} className="viz-chip"><b>{f.k}</b><span>{f.v}</span></div>
                  ))}
                </div>
              </div>
              <div className="glass-card spec-media">
                <p className="glass-kicker">网点照片</p>
                <img src={`${base}${branch.photo}`} alt={branch.name} />
                {branch.id === 'dulong' ? <img src={`${base}${povertyPhoto}`} alt={povertyCase.title} /> : null}
              </div>
            </>
          )}

          {mod === 'border' && (
            <>
              <div className="glass-card glass-hero">
                <p className="glass-kicker">板块三 · 边境概览</p>
                <div className="glass-kpi-row">
                  <div><span>边境县</span><strong className="num">{borderSide.counties}</strong></div>
                  <div><span>边境网点</span><strong className="num">约{borderSide.branches}</strong></div>
                </div>
                <p className="viz-miss" style={{ marginTop: 8 }}>{borderSide.missing}</p>
              </div>
              <div className="glass-card">
                <h3>跨境结算</h3>
                <MetricTiles
                  items={[
                    { label: '累计结算', value: '638亿+' },
                    { label: '美元规模', value: '8.8亿$' },
                    { label: '重点口岸', value: '3', tip: '磨憨勐满关累' },
                    { label: '签约边民', value: '3192' },
                    { label: '商家', value: '419' },
                    { label: '结算单', value: '21.76万', tip: '17.17亿元' },
                  ]}
                />
              </div>
            </>
          )}

          {mod === 'happy' && (
            <>
              <div className="glass-card glass-hero">
                <p className="glass-kicker">板块四 · 幸福村</p>
                <div className="glass-kpi-row">
                  <div><span>营业网点</span><strong className="num">{happyVillage.outlets}</strong></div>
                  <div><span>贷款余额</span><strong className="num">264.42<em>亿</em></strong></div>
                </div>
              </div>
              <div className="glass-card">
                <h3>待补字段</h3>
                <p className="viz-lead">{happyVillage.missing}</p>
              </div>
            </>
          )}

          {mod === 'revitalize' && (
            <>
              <div className="glass-card glass-hero">
                <p className="glass-kicker">板块五 · 帮扶成效</p>
                <MetricTiles
                  items={[
                    { label: '国家帮扶贷款', value: '1200亿+' },
                    { label: '脱贫小额信贷', value: '97%', tip: '全省投放占比' },
                    { label: '建档农户', value: '941万', tip: '建档面 95%' },
                  ]}
                />
              </div>
              <div className="glass-card">
                <h3>国家 / 省级对比</h3>
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
              </div>
            </>
          )}

          {mod === 'overseas' && (
            <div className="glass-card">
              <p className="glass-kicker">板块六 · 二级按钮</p>
              <h3>选择服务能力</h3>
              <div className="glass-btns">
                {overseas.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className={(o.id === 'api' ? peerId === 'api' : peerId !== 'api') ? 'is-on' : undefined}
                    onClick={() => {
                      setPeerId(o.id === 'api' ? 'api' : 'vn')
                      setModal({ title: o.title, body: o.body })
                    }}
                  >
                    {o.title}
                  </button>
                ))}
              </div>
              <FlowBoard
                center="云南农信"
                nodes={[
                  { id: 'vn', label: '越南', count: 6, active: peerId === 'vn', onClick: () => setPeerId('vn') },
                  { id: 'la', label: '老挝', count: 1, active: peerId === 'la', onClick: () => setPeerId('la') },
                  { id: 'mm', label: '缅甸', count: 1, active: peerId === 'mm', onClick: () => setPeerId('mm') },
                ]}
              />
            </div>
          )}
        </aside>

        <aside className="bleed-side bleed-right viz-panel">
          {mod === 'network' && (
            <>
              <div className="glass-card glass-hero">
                <p className="glass-kicker">数据看板</p>
                <div className="glass-kpi-row">
                  <div><span>营业网点</span><strong className="num">2100<em>个</em></strong></div>
                  <div><span>覆盖乡镇</span><strong className="num">1962<em>个</em></strong></div>
                </div>
              </div>
              <div className="glass-card">
                <h3>渠道覆盖</h3>
                <MetricTiles
                  items={[
                    { label: '自助银行', value: '2604' },
                    { label: '服务站', value: networkStats.serviceStations },
                    { label: '支付点', value: networkStats.payPoints },
                    { label: '基础金融', value: '全覆盖' },
                  ]}
                />
                <p className="viz-note" style={{ marginTop: 8 }}>沙盘点位为层级抽样示意；右侧数字为清单全量。</p>
              </div>
            </>
          )}

          {mod === 'specialty' && (
            <div className="glass-card">
              <p className="glass-kicker">二级按钮</p>
              <h3>特色网点切换</h3>
              <div className="spec-switches">
                {specialtyBranches.map((b) => (
                  <button key={b.id} type="button" className={branchId === b.id ? 'is-on' : undefined} onClick={() => setBranchId(b.id)}>
                    <b>{b.short}</b>
                    <em>{b.tag}</em>
                  </button>
                ))}
              </div>
            </div>
          )}

          {mod === 'border' && (
            <>
              <div className="glass-card">
                <h3>分县网点 · Top8</h3>
                <HBars items={borderBars.slice(0, 8)} />
              </div>
              <div className="glass-card">
                <p className="glass-kicker">边民互市</p>
                <p className="viz-lead">{borderSide.mutual}</p>
              </div>
            </>
          )}

          {mod === 'happy' && (
            <div className="glass-card">
              <p className="glass-kicker">沙盘说明</p>
              <h3>边境县亮起示意</h3>
              <p className="viz-lead">需求写明与边境县类似的跑马灯（地图依次高亮）。资料仅有幸福村网点 126、贷款余额 264.42 亿元；民族系列产品无分项表。</p>
              <button type="button" className="viz-cta ghost" onClick={() => switchMod('border')}>切到边境县看沙盘</button>
            </div>
          )}

          {mod === 'revitalize' && (
            <div className="glass-card">
              <p className="glass-kicker">二级按钮</p>
              <div className="seg wide">
                <button type="button" className={revType === 'national' ? 'is-active' : undefined} onClick={() => setRevType('national')}>国家级帮扶县</button>
                <button type="button" className={revType === 'provincial' ? 'is-active' : undefined} onClick={() => setRevType('provincial')}>省级帮扶县</button>
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
            <div className="glass-card">
              <p className="glass-kicker">说明弹窗内容</p>
              <h3>{peer.title}</h3>
              <p className="viz-lead">{peer.body}</p>
              <button type="button" className="viz-cta" onClick={() => setModal({ title: peer.title, body: peer.body })}>打开弹窗</button>
            </div>
          )}
        </aside>

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
