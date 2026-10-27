# Маршруты
- `/` — Главная (выбор списка)
- `/lists/:listId` — Страница списка (фильтры в query params: ?filter=active)
- `/lists/:listId/tasks/:taskId` — Карточка задачи (вложенный маршрут)
- `*` — 404