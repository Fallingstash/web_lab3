import { Link, Outlet } from 'react-router';
import { useTodos } from '../state/TodoContext';

function Layout() {
  const { state } = useTodos();

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
    </div>
  );
}

export default Layout;