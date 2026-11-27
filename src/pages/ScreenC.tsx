import { useState } from 'react'
import { Stage } from '../components/Stage'
import { specialtyBranches, threePositions } from '../data/content'

const yangla = specialtyBranches.find((b) => b.id === 'yangla')!

export function ScreenC() {
  const [posId, setPosId] = useState(threePositions[0].id)
  const pos = threePositions.find((p) => p.id === posId)!
  const base = import.meta.env.BASE_URL

  return (
    <Stage tone="viz">
      <div className="bleed sand-bleed is-bright">
        <img className="bleed-bg" src={`${base}maps/yunnan-map-official.png`} alt="" />
        <div className="bleed-wash sand-wash-bright" />
        <div className="sand-stage">
          {pos.pins.map((pin) => (
            <span key={pin.name} className="help-pin" style={{ left: `${pin.left}%`, top: `${pin.top}%` }}>
              <em>{pin.name}</em>
            </span>
          ))}
        </div>

        <aside className="bleed-side bleed-left viz-panel">
          {posId === 'unity' && (
            <>
              <div className="glass-card">
                <p className="glass-kicker">信用乡</p>
                <h3>怒江州贡山县独龙江乡</h3>
                <p className="mutual-copy">
                  2019年，原独龙江信用社用39天走完全乡农户，评定6个信用村、386户信用户，整体授信6000万元，建成怒江州首个“信用乡”。
                </p>
                <div className="bank-row" style={{ marginTop: 10 }}>
                  <div><span>信用村</span><strong className="num">6个</strong></div>
                  <div><span>信用户</span><strong className="num">386户</strong></div>
                  <div><span>整体授信</span><strong className="num">6000万</strong></div>
                </div>
              </div>
            </>
          )}
          {posId === 'radiate' && (
            <>
              <div className="glass-card glass-hero">
                <p className="glass-kicker">沿边开放</p>
                <h3>辐射中心</h3>
                <div className="glass-kpi-row">
                  <div><span>外汇资质行社</span><strong className="num">42<em>家</em></strong></div>
                  <div><span>覆盖口岸</span><strong className="num">27<em>个</em></strong></div>
                </div>
              </div>
              <div className="glass-card">
                <h3>接入银行</h3>
                <div className="bank-row">
                  <div><span>越南</span><strong className="num">6家</strong></div>
                  <div><span>老挝</span><strong className="num">1家</strong></div>
                  <div><span>缅甸</span><strong className="num">1家</strong></div>
                </div>
              </div>
            </>
          )}
          {posId === 'ecology' && (
            <div className="glass-card">
              <p className="glass-kicker">绿色金融</p>
              <h3>生态文明建设</h3>
              <div className="rev-facts">
                <div className="rev-fact"><span>制度</span><strong className="num">指引</strong><em>绿色金融指引与行动计划</em></div>
                <div className="rev-fact"><span>创新</span><strong className="num">质押</strong><em>碳汇质押、碳减排贷款、取水权质押</em></div>
                <div className="rev-fact"><span>风控</span><strong className="num">否决</strong><em>绿色信贷风险分类，环境违法一票否决</em></div>
              </div>
            </div>
          )}
        </aside>

        <aside className="bleed-side bleed-right viz-panel">
          {posId === 'unity' && (
            <>
              <div className="glass-card glass-hero">
                <p className="glass-kicker">营业网点覆盖</p>
                <div className="glass-kpi-row single">
                  <div><span>营业网点</span><strong className="num">2113<em>个</em></strong></div>
                </div>
              </div>
              <div className="glass-card">
                <h3>基础金融全覆盖</h3>
                <div className="glass-kpi-row">
                  <div><span>乡镇</span><strong className="num">1962<em>个</em></strong></div>
                  <div><span>行政村</span><strong className="num">5000+</strong></div>
                  <div><span>边境县（市）</span><strong className="num">25<em>个</em></strong></div>
                  <div><span>沿边行政村</span><strong className="num">374<em>个</em></strong></div>
                </div>
              </div>
              <div className="glass-card spec-media">
                <p className="glass-kicker">特色网点</p>
                <h3>羊拉信用社</h3>
                <img src={`${base}${yangla.photo}`} alt="羊拉信用社" />
              </div>
            </>
          )}
          {posId === 'radiate' && (
            <div className="glass-card">
              <p className="glass-kicker">中老直联</p>
              <h3>API直联接口</h3>
              <div className="rev-facts">
                <div className="rev-fact"><span>上线</span><strong className="num">2025.4</strong><em>与老挝外贸大众银行联合上线</em></div>
                <div className="rev-fact"><span>结算</span><strong className="num">实时</strong><em>中老跨境资金实时结算</em></div>
              </div>
              <p className="mutual-copy" style={{ marginTop: 10 }}>
                边民互市在天保、畹町、河口、磨憨等口岸实现自动化数据传输、跨境人民币结算和数据申报。
              </p>
            </div>
          )}
          {posId === 'ecology' && (
            <div className="glass-card">
              <p className="glass-kicker">作用范围</p>
              <h3>全省绿色信贷</h3>
              <p className="mutual-copy">
                绿色金融覆盖信贷投放、风险分类和产品创新，服务高原特色农业、生态修复和节水项目。
              </p>
            </div>
          )}
        </aside>

        <div className="bleed-tabs">
          {threePositions.map((item) => (
            <button key={item.id} type="button" className={posId === item.id ? 'is-on' : undefined} onClick={() => setPosId(item.id)}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </Stage>
  )
}
