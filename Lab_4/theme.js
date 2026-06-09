// ============================================================
// Завдання 3 — Перемикач тем
// ============================================================
// Вимоги:
//   1. Toggle: додати/прибрати data-theme="dark" на <body>.
//   2. Текст кнопки: "🌙 Темна тема" ↔ "☀️ Світла тема".
//   3. Зберігати тему в localStorage.
//   4. При завантаженні відновлювати з localStorage.
//   5. Якщо localStorage порожній — взяти системну тему через
//      window.matchMedia('(prefers-color-scheme: dark)').
//   6. CSS transition додати в style (на body).
// ============================================================

const toggle = document.querySelector('#theme-toggle');

// "Коли користувач натисне на цю кнопку то виконай цей код"
toggle.addEventListener('click', () => {    
    const isDark = document.body.dataset.theme === 'dark'; // перевірка, чи дорівнює тема слову дарк
    if (isDark) {
        document.body.removeAttribute('data-theme');
        toggle.textContent = '🌙 Темна тема';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.dataset.theme = 'dark';
        toggle.textContent = '☀️ Світла тема';
        localStorage.setItem('theme', 'dark');
    }

});

// Відновлення теми при завантаженні сторінки
window.addEventListener('DOMContentLoaded', () => { // "html вже готовий, можна шукати елементи і працювати"
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
        toggle.textContent = savedTheme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема';
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; //збереженої теми нема - дивиться яка у користувача системна тема у користувача
        if (prefersDark) {
            document.body.dataset.theme = 'dark';
            toggle.textContent = '☀️ Світла тема';
        }
    }
});


