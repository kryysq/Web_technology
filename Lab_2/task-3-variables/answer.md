# CSS — Теоретичні питання та пояснення

## 1. Типи CSS селекторів

Селектори використовуються для вибору HTML-елементів, до яких будуть застосовуватись стилі.

### Селектор тегу

```css
p {
    color: blue;
}
```

Застосовується до всіх тегів `<p>`.

---

### Селектор класу

```css
.card {
    border: 1px solid black;
}
```

HTML:

```html
<div class="card"></div>
```

Клас можна використовувати багато разів.

---

### Селектор ID

```css
#header {
    background: gray;
}
```

HTML:

```html
<header id="header"></header>
```

ID має бути унікальним на сторінці.

---

### Універсальний селектор

```css
* {
    margin: 0;
}
```

Вибирає всі елементи.

---

### Групування селекторів

```css
h1, h2, h3 {
    color: red;
}
```

Один стиль для кількох елементів.

---

### Вкладені селектори

```css
nav a {
    color: green;
}
```

Вибирає всі посилання всередині nav.

---

### Дочірній селектор

```css
.container > p {
    color: blue;
}
```

Працює лише для безпосередніх дітей.

---

### Сусідній селектор

```css
h1 + p {
    color: red;
}
```

Вибирає перший p після h1.

---

### Атрибутний селектор

```css
input[type="email"] {
    border: 2px solid blue;
}
```

---

## 2. Пріоритетність селекторів (Specificity)

Якщо до елемента застосовано кілька стилів, браузер обирає найпріоритетніший.

### Порядок пріоритету

1. `!important`
2. Inline стиль
3. ID
4. Класи, атрибути, псевдокласи
5. Теги та псевдоелементи

### Приклад

```css
p {
    color: blue;
}

.text {
    color: green;
}

#title {
    color: red;
}
```

```html
<p id="title" class="text">Текст</p>
```

Результат:

```css
color: red;
```

Тому що ID має більший пріоритет.

---

## 3. Одиниці вимірювання в CSS

### Абсолютні

| Одиниця | Значення   |
| ------- | ---------- |
| px      | Пікселі    |
| cm      | Сантиметри |
| mm      | Міліметри  |
| in      | Дюйми      |

### Відносні

| Одиниця | Значення                   |
| ------- | -------------------------- |
| %       | Від батьківського елемента |
| em      | Від розміру шрифту батька  |
| rem     | Від розміру html           |
| vw      | % ширини вікна             |
| vh      | % висоти вікна             |

### Приклад

```css
body {
    font-size: 16px;
}

h1 {
    font-size: 2rem;
}
```

2rem = 32px.

---

## 4. Псевдокласи та псевдоелементи

### Псевдокласи

Змінюють стан елемента.

```css
button:hover {
    background: blue;
}
```

Популярні:

```css
:hover
:focus
:active
:first-child
:last-child
:nth-child()
```

---

### Псевдоелементи

Створюють або стилізують частину елемента.

```css
p::first-letter {
    font-size: 30px;
}
```

```css
::before
::after
::first-letter
::first-line
```

### Різниця

Псевдоклас → стан елемента.

Псевдоелемент → частина елемента.

---

## 5. Каскад та наслідування

### Каскад

CSS = Cascading Style Sheets.

Якщо є кілька правил:

```css
p {
    color: blue;
}

p {
    color: red;
}
```

Переможе останнє правило.

---

### Наслідування

Деякі властивості передаються від батька до дітей.

```css
body {
    color: black;
}
```

Весь текст стане чорним.

Успадковуються:

```css
color
font-size
font-family
line-height
```

Не успадковуються:

```css
margin
padding
border
width
height
```

---

## 6. Боксова модель (Box Model)

Кожен елемент складається з:

```text
+-------------------+
|      margin       |
| +---------------+ |
| |    border     | |
| | +-----------+ | |
| | | padding   | | |
| | | +-------+ | | |
| | | |content| | | |
| | | +-------+ | | |
| | +-----------+ | |
| +---------------+ |
+-------------------+
```

### Content

Вміст елемента.

### Padding

Внутрішній відступ.

### Border

Рамка.

### Margin

Зовнішній відступ.

---

### box-sizing

#### content-box (за замовчуванням)

```css
width: 300px;
padding: 20px;
```

Фактична ширина:

```text
300 + 20 + 20 = 340px
```

---

#### border-box

```css
* {
    box-sizing: border-box;
}
```

Padding входить у width.

---

## 7. Margin, Padding, Border та Margin Collapse

### Margin

Зовнішній відступ.

```css
margin: 20px;
```

---

### Padding

Внутрішній відступ.

```css
padding: 20px;
```

---

### Border

Рамка.

```css
border: 1px solid black;
```

---

### Margin Collapse

Вертикальні margin можуть об'єднуватися.

```html
<div></div>
<div></div>
```

```css
div {
    margin: 20px 0;
}
```

Між блоками буде не 40px, а 20px.

---

## 8. Потік документу. Float та Clear

### Нормальний потік

Елементи розташовуються зверху вниз.

---

### Float

```css
img {
    float: left;
}
```

Текст обтікає зображення.

---

### Clear

```css
footer {
    clear: both;
}
```

Прибирає обтікання.

---

## 9. Позиціонування та z-index

### Static

За замовчуванням.

```css
position: static;
```

---

### Relative

```css
position: relative;
top: 20px;
```

Зсуває елемент відносно себе.

---

### Absolute

```css
position: absolute;
top: 0;
right: 0;
```

Відносно найближчого батька з position.

---

### Fixed

```css
position: fixed;
```

Закріплений на екрані.

---

### Sticky

```css
position: sticky;
top: 0;
```

Прилипає під час прокрутки.

---

### z-index

Керує шарами.

```css
.modal {
    z-index: 999;
}
```

Чим більше значення — тим вище елемент.

---

## 10. Flexbox

Одновимірна система розташування.

### Контейнер

```css
.container {
    display: flex;
}
```

---

### Основні властивості

```css
justify-content
align-items
flex-direction
gap
flex-wrap
```

---

### Приклад

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
```

---

## 11. CSS Grid

Двовимірна система.

### Контейнер

```css
.container {
    display: grid;
}
```

---

### Колонки

```css
grid-template-columns: 1fr 1fr 1fr;
```

---

### Рядки

```css
grid-template-rows: 100px 100px;
```

---

### Відступ

```css
gap: 20px;
```

---

### Приклад

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
```

---

## 12. Responsive Design

Підлаштування сайту під різні пристрої.

### Основні принципи

* Гумові блоки
* Flexbox/Grid
* Відносні одиниці
* Media Queries
* Mobile First

---

### Не так

```css
width: 1200px;
```

---

### Так

```css
width: 100%;
max-width: 1200px;
```

---

## 13. Media Queries

Змінюють стилі залежно від ширини екрану.

```css
@media (max-width: 768px) {
    .menu {
        flex-direction: column;
    }
}
```

---

### Популярні брейкпоінти

```css
576px
768px
992px
1200px
```

---

## 14. Meta Viewport

Без нього мобільні браузери масштабують сторінку.

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1">
```

### width=device-width

Ширина сторінки = ширині пристрою.

### initial-scale=1

Початковий масштаб 100%.

---

# Розбір твого коду (legacy.css)

## :root

```css
:root {
  --color-primary: #2050a0;
}
```

Створення CSS-змінної.

Використання:

```css
background: var(--color-primary);
```

---

## Темна тема

```css
[data-theme="dark"] {
  --color-bg: #1a1a1a;
}
```

Коли в HTML:

```html
<body data-theme="dark">
```

усі змінні автоматично змінюються.

---

## Universal Selector

```css
* {
  box-sizing: border-box;
}
```

Щоб padding не збільшував ширину елементів.

---

## Hero

```css
.hero {
  text-align: center;
  padding: 64px 32px;
}
```

* text-align → вирівнювання тексту
* padding → внутрішні відступи

---

## Grid

```css
.features .grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

Створює 3 однакові колонки.

---

## Flexbox (якби був)

```css
display: flex;
justify-content: center;
align-items: center;
```

* justify-content → по горизонталі
* align-items → по вертикалі

---

## Hover

```css
.site-header nav a:hover {
  color: var(--color-link-hover);
}
```

Зміна кольору при наведенні.

---

## Focus

```css
input:focus {
  outline: 2px solid blue;
}
```

Показує активне поле форми.

---

## Accessibility

У твоєму HTML є:

```html
<label for="email">
```

та

```html
<input id="email">
```

Це дозволяє натискати на текст label для активації поля вводу та допомагає скрінрідерам.
