import { Link, Outlet } from 'react-router';
import { useTheme } from '../state/ThemeContext';
import { useTodos } from '../state/TodoContext';

function Layout() {
  const { state } = useTodos();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Списки</h2>
        <ul>
          {state.lists.map(list => (
            <li key={list.id}>
              <Link to={`/lists/${list.id}`}>{list.title}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
        <button onClick={toggleTheme} style={{ height: '20%', marginTop: '706px' }}>
          {theme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
        </button>
    </div>
  );
}

export default Layout;