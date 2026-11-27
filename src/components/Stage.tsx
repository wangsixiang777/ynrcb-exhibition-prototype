import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  width: number
  height: number
  label: string
  note?: string
  children: ReactNode
}

/** 按视口等比缩放的大屏舞台，便于笔记本演示超宽分辨率 */
export function Stage({ width, height, label, note, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => {
      const pad = 36
      const availW = Math.max(320, el.clientWidth - pad)
      const availH = Math.max(240, window.innerHeight - 140)
      setScale(Math.min(availW / width, availH / height, 1))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [width, height])

  return (
    <div className="stage-wrap" ref={wrapRef}>
      <div className="stage-meta">
        <div>
          <strong style={{ color: 'var(--gold-100)' }}>{label}</strong>
          <div>
            设计分辨率 {width}×{height} · 当前缩放 {(scale * 100).toFixed(0)}%
          </div>
        </div>
        {note ? <div style={{ textAlign: 'right', maxWidth: 520 }}>{note}</div> : null}
      </div>
      <div className="stage-frame" style={{ width: width * scale, height: height * scale }}>
        <div className="stage-scaler" style={{ width, height, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  )
}
