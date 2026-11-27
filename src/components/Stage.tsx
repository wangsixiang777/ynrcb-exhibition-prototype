import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  width: number
  height: number
  title: string
  sizeLabel: string
  hint?: string
  children: ReactNode
}

export function Stage({ width, height, title, sizeLabel, hint, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.28)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => {
      const availW = Math.max(320, el.clientWidth - 8)
      const availH = Math.max(240, window.innerHeight - 132)
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
      <div className="stage-toolbar">
        <div>
          <h1>{title}</h1>
          <div className="meta">
            {sizeLabel} · 缩放 {(scale * 100).toFixed(0)}%
          </div>
        </div>
        {hint ? <div className="hint">{hint}</div> : null}
      </div>
      <div className="stage-frame" style={{ width: width * scale, height: height * scale }}>
        <div className="stage-scaler" style={{ width, height, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  )
}
