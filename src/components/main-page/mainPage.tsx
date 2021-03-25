import React from 'react';

const MainPage = () => {
  let mainPageNav: string[];
  const isAuth: boolean = false;

  isAuth ?
    mainPageNav = ["Учебник", "Мини-игры", "Словарь", "Статистика", "Настройка"] :
    mainPageNav = ["Учебник", "Мини-игры", "Статистика", "Настройка"];

  return (
    <main className="main-page">
      <h1 className="visually-hidden">Главная страница</h1>
      <section className="main-page__promo">
        <h2 className="main-page__title">
          Увеличь словарный запас с RSLang
        </h2>
        <p className="main-page__description">
          Традиционные и новые эффективные подходы к изучению слов, мотивация в виде статистики,
          различные уровни сложности - все это ты найдешь в RSLang.
        </p>
        <button className="main-page__video-btn btn">Смотреть видео</button>
      </section>
      <div className="main-page__bg-wrapper">
        <nav className="main-page__nav">
          <ul className="main-page__nav-list">
            {mainPageNav.map((item) => {
              return (
                <li className="main-page__nav-item">
                  <a href="/">
                    {item}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </main>
  );
}

export { MainPage };
