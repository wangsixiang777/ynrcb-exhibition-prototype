import { useMemo, useState } from 'react'
import { Stage } from '../components/Stage'
import { screenMeta, smilePeople, threePositions } from '../data/content'

type Mode = 'positions' | 'wall-float' | 'wall-text'

export function ScreenC() {
  const [mode, setMode] = useState<Mode>('positions')
  const [posId, setPosId] = useState(threePositions[0].id)
  const pos = threePositions.find((p) => p.id === posId)!

  const layout = useMemo(
    () =>
      smilePeople.map((p, i) => ({
        ...p,
        left: 8 + ((i * 17) % 84),
        top: 12 + ((i * 29) % 70),
        delay: (i % 7) * 0.35,
      })),
    [],
  )

  return (
    <Stage
      width={3200}
      height={1800}
      label={screenMeta.C.title}
      note={screenMeta.C.note}
    >
      <div className="hud-screen" style={{ padding: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
          <div>
            <div className="hud-title" style={{ fontSize: 42 }}>三大点位 · 笑脸墙</div>
            <div style={{ color: 'var(--text-dim)', fontSize: 20, marginTop: 6 }}>
              先按「三定位入口」做高保真壳；若实为独立物理点位，结构可复用、仅改载体说明。
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <button type="button" className={mode === 'positions' ? 'gold-btn' : 'ghost-btn'} onClick={() => setMode('positions')}>
              三大点位
            </button>
            <button type="button" className={mode === 'wall-float' ? 'gold-btn' : 'ghost-btn'} onClick={() => setMode('wall-float')}>
              笑脸墙 · 飘动
            </button>
            <button type="button" className={mode === 'wall-text' ? 'gold-btn' : 'ghost-btn'} onClick={() => setMode('wall-text')}>
              笑脸墙 · 拼字
            </button>
            <span className="tag warn">拼 logo 暂缓</span>
          </div>
        </div>

        {mode === 'positions' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 24, height: 1500 }}>
            <div className="panel" style={{ padding: 20, display: 'grid', gap: 12, alignContent: 'start' }}>
              {threePositions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={posId === p.id ? 'gold-btn' : 'ghost-btn'}
                  style={{ textAlign: 'left' }}
                  onClick={() => setPosId(p.id)}
                >
                  {p.title}
                </button>
              ))}
              <div className="logic-note">
                待确认：此三者是互动大屏底栏，还是展厅三个独立点位屏？甲供「五篇大文章/科创」截图是否并入某一入口？
              </div>
            </div>
            <div className="panel" style={{ padding: 36 }}>
              <div className="tag">服务三大定位</div>
              <h2 style={{ fontSize: 48, color: 'var(--gold-100)', margin: '16px 0' }}>{pos.title}</h2>
              <ul style={{ margin: 0, paddingLeft: 22, fontSize: 28, lineHeight: 1.8, color: 'var(--text-dim)' }}>
                {pos.points.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div style={{ marginTop: 28 }} className="logic-note">
                详细段落来自《服务三大定位.doc》，正式视觉可再拆指标卡与案例卡。
              </div>
            </div>
          </div>
        ) : (
          <div className="panel panel-strong" style={{ position: 'relative', height: 1500, overflow: 'hidden' }}>
            <div className="logic-note" style={{ position: 'absolute', left: 20, top: 20, zIndex: 2, maxWidth: 720 }}>
              {mode === 'wall-float'
                ? '状态一：照片自由飘动，间歇放大缩小。下图用姓名头像占位（正式接入 66 张笑脸原图）。'
                : '状态二：图片拼成文字「云南农商银行」。下方为拼字示意，正式用照片马赛克实现。'}
            </div>

            {mode === 'wall-float' &&
              layout.map((p) => (
                <div
                  key={p.name}
                  className="float-item"
                  style={{ left: `${p.left}%`, top: `${p.top}%`, animationDelay: `${p.delay}s` }}
                  title={`${p.name} · ${p.role}`}
                >
                  <div className="face">{p.name.slice(0, 1)}</div>
                  <div style={{ marginTop: 6, fontSize: 14, textAlign: 'center', color: 'var(--cream)' }}>
                    {p.name}
                    <div style={{ color: 'var(--text-dim)', fontSize: 12 }}>{p.city}</div>
                  </div>
                </div>
              ))}

            {mode === 'wall-text' && (
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 88px)',
                    gap: 14,
                    justifyContent: 'center',
                  }}
                >
                  {'云南农商银行'.split('').map((ch, i) => (
                    <div key={ch + i} style={{ textAlign: 'center' }}>
                      <div className="face" style={{ width: 88, height: 88, margin: '0 auto', fontSize: 28 }}>
                        {smilePeople[i % smilePeople.length].name.slice(0, 1)}
                      </div>
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 42,
                          fontWeight: 700,
                          color: 'var(--gold-100)',
                          textShadow: '0 0 18px rgba(232,184,74,0.55)',
                        }}
                      >
                        {ch}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28 }} className="tag">
                  人员表 66 人已齐 · 原型抽样展示 {smilePeople.length} 人
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Stage>
  )
}
