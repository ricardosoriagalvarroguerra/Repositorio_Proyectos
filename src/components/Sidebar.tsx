import { useState } from "react";

export interface NavItem {
  name: string;
  key: string;
  count: number;
  active: boolean;
}

interface SidebarProps {
  query: string;
  onSearch: (value: string) => void;
  navItems: NavItem[];
  onSelect: (key: string) => void;
  totalCount: number;
}

export function Sidebar({
  query,
  onSearch,
  navItems,
  onSelect,
  totalCount,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (key: string) => {
    onSelect(key);
    setMobileOpen(false);
  };

  return (
    <aside className="cz-side">
      <div className="cz-side-top">
        <div>
          <div className="cz-eyebrow">Centralizador</div>
          <div className="cz-title">Mis proyectos</div>
        </div>

        <button
          type="button"
          className="cz-mobile-toggle"
          aria-expanded={mobileOpen}
          aria-controls="cz-sidebar-panel"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Cerrar" : "Filtros"}
        </button>
      </div>

      <div
        id="cz-sidebar-panel"
        className={`cz-side-panel${mobileOpen ? " is-open" : ""}`}
      >
        <div className="cz-search">
          <span className="cz-search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            className="cz-search-input"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar…"
            aria-label="Buscar proyectos"
            spellCheck={false}
          />
        </div>

        <nav className="cz-nav" aria-label="Categorías de proyectos">
          <div className="cz-nav-label">Categorías</div>
          {navItems.map((item) => (
            <button
              type="button"
              key={item.key}
              className={`cz-nav-item${item.active ? " is-active" : ""}`}
              aria-pressed={item.active}
              onClick={() => handleSelect(item.key)}
            >
              <span className="cz-nav-dot" aria-hidden="true" />
              <span className="cz-nav-name">{item.name}</span>
              <span className="cz-nav-count">{item.count}</span>
            </button>
          ))}
        </nav>

        <div className="cz-side-foot">
          {totalCount} links · {navItems.length - 1} categorías
          <br />
          Centralizador de proyectos · FONPLATA
        </div>
      </div>
    </aside>
  );
}
