import { NavLink } from "react-router-dom"

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-logo">
        <NavLink exact to="/">Mr.BitCoin</NavLink>
      </div>
      <nav className="main-nav">
        <ul className="nav-links">
          <li className="nav-link"><NavLink exact to="/">Home</NavLink></li>
          <li className="nav-link"><NavLink to="/statistic">Statistics</NavLink></li>
          <li className="nav-link"><NavLink to="/contact">Contacts</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
