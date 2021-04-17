const githubMembers: string[] = ['Alexk08', 'Kkasya', 'Alekseishkel', 'gtm003', '11alexey11', 'prgskk'];
const githubSrc: string = 'https://github.com/';
const urlBackend: string = 'https://react-rs-lang-words.herokuapp.com/';
console.log('a')
const navLink: any = {
  "Главная": "",
  "Учебник": "tutorial",
  "Мини-игры": "games",
  "Словарь": "dictionary",
  "Статистика": "statistics",
  "Настройка": "settings",
  "О команде": "team",
  "Войти": "log-in"
};

const titleGroup: any = {
  '0': 'Элементарный уровень.',
  '1': 'Предпороговый уровень.',
  '2': 'Средний уровень.',
  '3': 'Уровень выше среднего.',
  '4': 'Продвинутый уровень.',
  '5': 'Профессиональный уровень.',
};

const descriptionGroup: any = {
  '0': `Начало. Не фильм с ДиКаприо, конечно, но тоже очень увлекательно. :)<br />
        Самые ходовые и простые слова, которые точно пригодятся в повседневном общении.<br />
        Сможете сказать пару фраз о себе, об интересах, задать встречные вопросы и уж точно всегда спросить
        дорогу. Научитесь воспринимать на слух короткие предложения с элементарной лексикой.
        Можно будет писать открытки и заполнять анкеты!`,
  '1': `Пройдёте - соберёте слова, которые помогут в небольшом простом диалоге в типичной ситуации (в магазине, при знакомстве с людьми), вы без проблем расскажете о предпочтениях в музыке, еде. Будете улавливать на слух самые простые и наиболее часто употребляемые слова и фразы.<br />
        До среднего осталось совсем немного.`,
  '2': `Если вы хотите более подробно описывать события или опыт, выражать свое мнение, подкрепляя его примерами - вам сюда.<br />
        Отличный набор слов для использования в спонтанных диалогах.<br />
        Будете читать тексты без специальной тематики (письма, статьи), понимать основную идею текста, несмотря на наличие 10% незнакомой лексики. <br />
        Пройдя этот уровень, вы сможете расслабиться и понять, что также прошли и точку невозврата. :) А всё потому, что учить слова стало проще, а стремление - выше.`,
  '3': `Ощущаете прилив энергии, что “всё возможно!” и уже строите планы по использованию английского за рубежом?<br />
        Вы достигли неплохих результатов.<br />
        Пройдёте этот уровень и пробьете барьер неуверенности в общениии с носителями языка, сможете реагировать во всех типичных ситуациях; выражать, развивать и подверждать точку зрения, а если захотите - даже напишите сочинение.`,
  '4': `Финиш уже близко. <br />
        Слова этого уровня помогут вам наполнить речь сложными грамматическими структурами, синонимами. Коммуникация с носитлями не составит труда.<br />
        Читать станет легко, писать - тоже.`,
  '5': `Итак, finishная.<br />
        Сложнее этих слов только подъемы с утра.<br />
        Но вы справитесь. Бонусом будет прекрасное понимание и владение темой разговора без подготовки (включая узкоориентированные темы), свободное выражение мнения, чтение без услилий.<br />
        Давно мечтали поговорить о медицине, астрологии или юриспруденции? Теперь это не будет проблемой.`,
};

const menuLinks: string[] = ['Главная', 'Учебник', 'Мини-игры', 'Словарь', 'Статистика', 'Настройка', 'О команде', 'Войти'];

const dictionaryLinks: any[] = [
  {
    name: 'Изучаемые слова',
    link: 'learning'
  },
  {
    name: 'Сложные слова',
    link: 'hard'
  },
  {
    name: 'Удаленные слова',
    link: 'deleted'
  }
];

interface GamesProps {
  id: string;
  name: string;
  iconUrl: string;
  imgUrl: string;
  description: string;
}

const titleGames: GamesProps[] = [
  {
    id: 'constructor',
    name: 'Конструктор слов',
    iconUrl: '/images/games/constructor.svg',
    imgUrl: '/images/games/constructor.png',
    description: 'Учит быстро переводить с английского на ваш родной язык.',
  }, {
    id: 'savannah',
    name: 'Саванна',
    iconUrl: '/images/games/savannah.svg',
    imgUrl: '/images/games/savannah.png',
    description: 'Учит быстро переводить с английского на ваш родной язык.',
  }, {
    id: 'audio',
    name: 'Аудиовызов',
    iconUrl: '/images/games/audio.svg',
    imgUrl: '/images/games/audio.png',
    description: 'Учит быстро переводить с английского на ваш родной язык.',
  }, {
    id: 'sprint',
    name: 'Спринт',
    iconUrl: '/images/games/sprint.svg',
    imgUrl: '/images/games/sprint.png',
    description: 'Учит быстро переводить с английского на ваш родной язык.',
  },
]

const namesPath: any = {
  tutorial: 'Учебник',
  page: 'Страница',
  games: 'Игры',
  sprint: 'Спринт',
  team: 'О команде',
  dictionary: 'Словарь',
  hard: 'Сложные слова',
  deleted: 'Удаленные слова',
  learning: 'Изучаемые слова',
  statistics: 'Статистика',
}

const DICTIONARY_TITLES: any = {
  'hard': 'Сложные',
  'deleted': 'Удаленные',
  'learning': 'Изучаемые'
};

const WORDS_ON_PAGE = 20;

export {githubMembers, githubSrc, urlBackend, navLink, titleGroup, descriptionGroup, menuLinks, dictionaryLinks, titleGames, namesPath, DICTIONARY_TITLES, WORDS_ON_PAGE};
