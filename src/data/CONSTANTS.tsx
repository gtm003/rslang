interface Links {
  "Учебник": string,
  "Мини-игры": string,
  "Словарь": string,
  "Статистика" : string,
  "Настройка" : string,
}

const githubMembers: string[] = ['Alekseishkel', 'Kkasya', "Alexk08", '11alexey11', 'gtm003'];
const githubSrc: string = 'https://github.com/';
const urlBackend: string = 'https://react-learnwords-example.herokuapp.com/';
const navLink: any = {
  "Учебник": "tutorial",
  "Мини-игры": "games",
  "Словарь": "dictionary",
  "Статистика" : "statistics",
  "Настройка" : "settings",
}

export {githubMembers, githubSrc, urlBackend, navLink};