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

const cosmosStars = Array.from({ length: 72 }, (_, i) => ({
  left: ((i * 47) % 100) + (i % 7) * 0.3,
  top: ((i * 31) % 100) + (i % 5) * 0.4,
  size: 1.5 + (i % 4),
  delay: (i % 12) * 0.18,
}))

export function ScreenB() {
  const [mod, setMod] = useState<Module>('network')
  const [level, setLevel] = useState(0)
  const [branchId, setBranchId] = useState(specialtyBranches[0].id)
  const [borderIdx, setBorderIdx] = useState(-1)
  const [litCounties, setLitCounties] = useState<number[]>([])
  const [revType, setRevType] = useState<'national' | 'provincial'>('national')
  const [modal, setModal] = useState<null | { title: string; body: string }>(null)
  const [playing, setPlaying] = useState(false)
  const [borderPlayKey, setBorderPlayKey] = useState(0)
  const [autoLevel, setAutoLevel] = useState(false)
  const [reforming, setReforming] = useState(false)
  const [reformT, setReformT] = useState(0)
  const [peerId, setPeerId] = useState<'vn' | 'la' | 'mm' | 'api'>('vn')
  /** 宇宙星空 → 云南沙盘：intro 播放中 / done 已落地 */
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
    const toZoom = window.setTimeout(() => setCosmosPhase('zoom'), 1600)
    const toDone = window.setTimeout(() => {
      setCosmosPhase('done')
      setAutoLevel(true)
    }, 3400)
    return () => {
      window.clearTimeout(toZoom)
      window.clearTimeout(toDone)
    }
  }, [cosmosKey])

  /** 进入边境县 / 重播：沙盘自动跑马灯，依次高亮 25 县并在点位旁累计弹窗 */
  useEffect(() => {
    if (mod !== 'border') {
      setPlaying(false)
      return
    }
    setPlaying(true)
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
      i += 1
    }, 700)
    return () => window.clearInterval(timer)
  }, [mod, borderPlayKey])

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
        onClick: playing ? undefined : () => {
          const idx = borderCounties.findIndex((x) => x.name === c.name)
          if (idx >= 0) {
            setBorderIdx(idx)
            setLitCounties((prev) => (prev.includes(idx) ? prev : [...prev, idx]))
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

  const cosmosOn = cosmosPhase !== 'done'

  return (
    <Stage tone="viz">
      <div className={`bleed sand-bleed is-bright${cosmosOn ? ' cosmos-on' : ''}`}>
        <img
          className={`bleed-bg${cosmosPhase === 'intro' ? ' is-far' : ''}${cosmosPhase === 'zoom' ? ' is-arrive' : ''}`}
          src={`${base}maps/yunnan-sandtable-bright.jpg`}
          alt=""
        />
        <div className="bleed-wash sand-wash-bright" />

        {cosmosOn && (
          <div key={cosmosKey} className={`cosmos-layer phase-${cosmosPhase}`} aria-hidden>
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
                }}
              />
            ))}
            <p className="cosmos-caption">宇宙星空 · 切入云南沙盘</p>
          </div>
        )}

        <div className="sand-stage">
          {mod === 'network' && cosmosPhase === 'done' && radiationDots.map((d, i) => {
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
            const hot = mod === 'border' && borderIdx === i
            const showPop = mod === 'border' && lit
            return (
              <div
                key={p.name}
                className={`county-pin${lit ? ' lit' : ''}${hot ? ' hot' : ''}`}
                style={{ left: `${p.left}%`, top: `${p.top}%` }}
              >
                <i className="county-dot" />
                {hot ? <em className="county-pulse" /> : null}
                {showPop ? (
                  <div className={`county-pop${hot ? ' is-new' : ''}`}>
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
              <div className="glass-card glass-hero">
                <p className="glass-kicker">板块一 · 左右侧数据</p>
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
              </div>
            </>
          )}

          {mod === 'specialty' && (
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
          )}

          {mod === 'border' && (
            <>
              <div className="glass-card glass-hero">
                <p className="glass-kicker">板块三 · 边境概览</p>
                <div className="glass-kpi-row">
                  <div><span>边境县</span><strong className="num">{borderSide.counties}</strong></div>
                  <div><span>边境网点</span><strong className="num">约{borderSide.branches}</strong></div>
                </div>
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
                <p className="viz-miss">{borderSide.missing}</p>
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
              <div className="glass-card">
                <p className="glass-kicker">二级按钮 · 层级点亮</p>
                <h3>当前：{networkStats.levels[level].name}</h3>
                <p className="viz-note">总行向外辐射；分理处以星光示意。数量来自网点清单。</p>
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
                </div>
              </div>
              <div className="glass-card">
                <h3>沙盘演示</h3>
                <div className="viz-actions tight">
                  <button type="button" className="viz-cta ghost" onClick={replayCosmos}>重播星空切入</button>
                  <button type="button" className="viz-cta ghost" disabled={autoLevel || reforming || cosmosOn} onClick={() => setAutoLevel(true)}>
                    {autoLevel ? '点亮中…' : '自动依次点亮'}
                  </button>
                  <button type="button" className="viz-cta" disabled={reforming || autoLevel || cosmosOn} onClick={() => { setLevel(4); setReforming(true) }}>
                    {reforming ? '星光收束中…' : '农商行改制 · 星光收束'}
                  </button>
                </div>
              </div>
            </>
          )}

          {mod === 'specialty' && (
            <>
              <div className="glass-card spec-media">
                <p className="glass-kicker">右侧图片</p>
                <img src={`${base}${branch.photo}`} alt={branch.name} />
                {branch.id === 'dulong' ? <img src={`${base}${povertyPhoto}`} alt={povertyCase.title} /> : null}
              </div>
              <div className="glass-card">
                <p className="glass-kicker">五个二级按键</p>
                <div className="spec-switches">
                  {specialtyBranches.map((b) => (
                    <button key={b.id} type="button" className={branchId === b.id ? 'is-on' : undefined} onClick={() => setBranchId(b.id)}>
                      <b>{b.short}</b>
                      <em>{b.tag}</em>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {mod === 'border' && (
            <>
              <div className="glass-card">
                <p className="glass-kicker">沙盘跑马灯</p>
                <h3>{playing ? '依次高亮边境县' : '25 县已点亮完毕'}</h3>
                <p className="viz-note">
                  地图上逐县高亮选中；每到一县在点位旁弹出该县网点数，弹窗累计不消失。
                </p>
                <div className="glass-kpi-row">
                  <div><span>已高亮</span><strong className="num">{litCounties.length}<em>/25</em></strong></div>
                  <div><span>当前县</span><strong className="num" style={{ fontSize: 18 }}>
                    {borderCounties[borderIdx]?.name.replace('/芒市相关', '') || '—'}
                  </strong></div>
                </div>
                {!playing && litCounties.length >= borderCounties.length ? (
                  <button
                    type="button"
                    className="viz-cta ghost"
                    style={{ marginTop: 10 }}
                    onClick={() => setBorderPlayKey((k) => k + 1)}
                  >
                    重新播放跑马灯
                  </button>
                ) : null}
              </div>
              <div className="glass-card">
                <h3>分县网点 · Top8</h3>
                <HBars items={borderBars.slice(0, 8)} />
              </div>
            </>
          )}

          {mod === 'happy' && (
            <div className="glass-card">
              <p className="glass-kicker">沙盘说明</p>
              <h3>边境县亮起示意</h3>
              <p className="viz-lead">需求写明与边境县类似的跑马灯（地图依次高亮）。资料仅有幸福村网点 126、贷款余额 264.42 亿元；民族系列产品无分项表。</p>
              <button type="button" className="viz-cta ghost" onClick={() => switchMod('border')}>切到边境县看沙盘跑马灯</button>
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
