import type { ReactNode } from 'react'

type Props = {
  tone?: 'paper' | 'viz'
  children: ReactNode
}

/** 菜单以下只留一块 16:9 内容，不再加说明条。 */
export function Stage({ tone = 'paper', children }: Props) {
  return (
    <section className={tone === 'viz' ? 'screen screen-viz' : 'screen'}>
      <div className="screen-body">{children}</div>
    </section>
  )
}
