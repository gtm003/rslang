import React from 'react';

const MainPage = () => {
  let mainPageNav: string[];
  const isAuth: boolean = false;

  isAuth === false ?
    mainPageNav = ["Учебник", "Мини-игры", "Статистика", "Настройка"] :
    mainPageNav = ["Учебник", "Мини-игры", "Словарь", "Статистика", "Настройка"];

  return (
    <main className="main">
      <h1 className="visually-hidden">Главная страница</h1>
      <section className="promo">
        <h2 className="promo__title">
          Увеличь словарный запас с RSLang
        </h2>
        <p className="promo__description">
          Традиционные и новые эффективные подходы к изучению слов, мотивация в виде статистики,
          различные уровни сложности - все это ты найдешь в RSLang.
        </p>
        <button className="btn promo__btn">Смотреть видео</button>
      </section>
      <nav className="main-page-nav">
        <ul className="main-page-nav__list">
          {mainPageNav.map((item) => {
            return (
              <li className="main-page-nav__item">
                <a href="/">
                  {item}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </main>
  );
}

export { MainPage };
