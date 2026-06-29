import { useMemo, useState } from "react";
import { data } from "./data";
import { countCat } from "./lib";
import { Sidebar, type NavItem } from "./components/Sidebar";
import {
  CategorySection,
  type RenderedCategory,
} from "./components/CategorySection";

export default function App() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");

  const view = useMemo(() => {
    const q = query.trim().toLowerCase();

    const total = data.reduce((n, c) => n + countCat(c), 0);

    const navItems: NavItem[] = [
      { name: "Todos", key: "all", count: total },
      ...data.map((c) => ({ name: c.name, key: c.name, count: countCat(c) })),
    ].map((it) => ({ ...it, active: it.key === active }));

    const cats: RenderedCategory[] = data
      .filter((cat) => active === "all" || cat.name === active)
      .map((cat) => {
        const groups = cat.groups
          .map((g) => {
            const links = g.links.map((l) => ({
              ...l,
              filled: !!l.url,
              matches:
                !q ||
                l.name.toLowerCase().includes(q) ||
                (l.url || "").toLowerCase().includes(q),
            }));
            const visible = q
              ? links.filter((l) => l.filled && l.matches)
              : links;
            return { name: g.name, hasName: !!g.name, links: visible };
          })
          .filter((g) => g.links.length > 0);

        const count = groups.reduce(
          (n, g) => n + g.links.filter((l) => !!l.url).length,
          0,
        );

        return {
          name: cat.name,
          cols: cat.groups.length > 1 ? cat.cols : "1fr 1fr",
          count,
          groups,
        };
      })
      .filter((c) => c.groups.length > 0);

    const shown = cats.reduce((n, c) => n + c.count, 0);

    return {
      navItems,
      cats,
      heading: active === "all" ? "Todos los links" : active,
      totalCount: total,
      shownCount: q ? shown : active === "all" ? total : shown,
      hasResults: cats.length > 0,
      noResults: cats.length === 0,
    };
  }, [query, active]);

  return (
    <div className="cz-shell">
      <Sidebar
        query={query}
        onSearch={setQuery}
        navItems={view.navItems}
        onSelect={setActive}
        totalCount={view.totalCount}
      />

      <main className="cz-main">
        <header className="cz-header">
          <h1 className="cz-heading">{view.heading}</h1>
          <span className="cz-header-count">
            {view.shownCount} de {view.totalCount}
          </span>
        </header>

        {view.hasResults && (
          <div className="cz-sections">
            {view.cats.map((cat) => (
              <CategorySection key={cat.name} cat={cat} />
            ))}
          </div>
        )}

        {view.noResults && (
          <div className="cz-empty-state">Sin resultados para "{query}"</div>
        )}
      </main>
    </div>
  );
}
