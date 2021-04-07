interface Teams  {
  id: number,
  name: string,
  role: string,
  description: string
}

const TEAM: Teams[] =  [
  {
    id: 0,
    name: 'Александр Красильников',
    role: 'Team lead',
    description: 'Координировал команду. Разработал и поддерживал архитектуру приложения. Создал боковое меню, раздел Словарь.',
  },
  {
    id: 1,
    name: 'Анастасия Козловская',
    role: 'Developer',
    description: 'Создала раздел Учебник, настройки (с использованием редакса), навигацию "хлебные крошки", настроила роутинг.',
  },
  {
    id: 2,
    name: 'Алексей Январев',
    role: 'Developer',
    description: 'Настроил Бекенд и всю работу с ним, реализовал авторизацию и разавторизацию.',
  },
  {
    id: 3,
    name: 'Татьяна Григорович',
    role: 'Developer',
    description: 'Реализовала получение данных для игр, создала игры Спринт и Конструктор.',
  },
  {
    id: 4,
    name: 'Алексей Шкель',
    role: 'Developer',
    description: 'Создал главную страницу, игры Аудиовызов и Саванна, настроил получение данных в редакс из бекенда.',
  },
];

export {TEAM};