import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { confirms } from '../data/content'

const links = [
  { to: '/', label: '总览', end: true },
  { to: '/screen-a', label: 'A 行内数据' },
  { to: '/screen-b', label: 'B 互动大屏' },
  { to: '/screen-c', label: 'C 点位/笑脸墙' },
  { to: '/screen-d', label: 'D 电子屏公示' },
]

export function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <strong>云南农商银行 · 展陈交互原型</strong>
          <span>需求核对版 · 三维以示意图替代 · 数据与逻辑可点验</span>
        </div>
        <nav className="top-nav">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="confirm-toggle" onClick={() => setOpen((v) => !v)}>
          待确认 {confirms.length}
        </button>
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
