import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { confirms } from '../data/content'

const links = [
  { to: '/screen-a', label: '行内数据' },
  { to: '/screen-b', label: '互动大屏' },
  { to: '/screen-c', label: '三大点位' },
  { to: '/screen-smile', label: '笑脸墙' },
  { to: '/screen-d', label: '电子屏公示' },
]

export function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden />
          <div>
            <strong>云南农商银行 · 展陈原型</strong>
            <span>需求核对 · 逻辑与数据可点验</span>
          </div>
        </div>
        <nav className="top-nav">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="topbar-actions">
          <button type="button" className="confirm-toggle" onClick={() => setOpen((v) => !v)}>
            待确认 {confirms.length}
          </button>
        </div>
      </header>
      {open ? (
        <aside className="confirm-drawer">
          <h3>与甲方核对清单</h3>
          <ol>
            {confirms.map((c) => (
              <li key={c.id}>
                <b>{c.q}</b>
                <div>关联：{c.related}</div>
              </li>
            ))}
          </ol>
        </aside>
      ) : null}
      <Outlet />
    </div>
  )
}
