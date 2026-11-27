import type { ReactNode } from 'react'

type Props = {
  title: string
  hint?: string
  children: ReactNode
}

/** 预览固定按 1920×1080 铺满，不再缩放超大画布 */
export function Stage({ title, hint, children }: Props) {
  return (
    <section className="screen">
      <header className="screen-head">
        <h1>{title}</h1>
        {hint ? <p>{hint}</p> : null}
      </header>
      <div className="screen-body">{children}</div>
    </section>
  )
}
