import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>404</h1>
      <h2>Страница не найдена</h2>
      <p>Возможно, вы ввели неверный адрес.</p>
      <Link to="/lists" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;