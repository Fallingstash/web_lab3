import { Link, Outlet } from 'react-router';
import { useTodos } from '../state/TodoContext';

function Layout() {
  const { state } = useTodos();

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Боковая панель со списками */}
      <aside style={{ width: '200px', borderRight: '1px solid #333', paddingRight: '20px' }}>
        <h2>Списки</h2>
        <ul>
          {state.lists.map(list => (
            <li key={list.id} style={{ marginBottom: '10px' }}>
              {/* Link - это ссылка без перезагрузки */}
              <Link to={`/lists/${list.id}`} style={{ color: '#FF9303' }}>
                {list.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Сюда будет вставляться ListPage */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;