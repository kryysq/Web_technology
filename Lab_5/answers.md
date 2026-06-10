# Завдання 3 — «Каталог користувачів»

## Загальна ідея роботи

У цьому завданні сторінка завантажує користувачів із зовнішнього API:

```txt
https://jsonplaceholder.typicode.com/users
```

Після завантаження кожен користувач показується у вигляді окремої картки. У картці є ім'я, email, місто, компанія і кнопка `Завантажити пости`. Коли натиснути цю кнопку, виконується ще один запит:

```txt
https://jsonplaceholder.typicode.com/posts?userId=ID
```

Замість `ID` підставляється id конкретного користувача. Потім пости додаються під його картку.

## Пояснення `page.html`

Файл `page.html` — це основа сторінки. У ньому є розмітка, стилі та підключення JavaScript.

На початку стоїть:

```html
<!DOCTYPE html>
<html lang="uk">
```

`<!DOCTYPE html>` каже браузеру, що це сучасний HTML-документ. `lang="uk"` означає, що основна мова сторінки українська.

У блоці `<head>` є:

```html
<meta charset="UTF-8">
```

Це потрібно, щоб українські літери нормально відображались.

Далі є заголовок сторінки:

```html
<title>Task 3 — Каталог користувачів</title>
```

Він показується у вкладці браузера.

Усередині `<style>` записані прості стилі. Вони не відповідають за логіку, а тільки роблять сторінку охайнішою:

- `body` задає шрифт, ширину сторінки, відступи і міжрядкову відстань;
- `#users` робить контейнер для карток сіткою з проміжками;
- `.card` стилізує одну картку користувача;
- `.posts` оформлює блок постів під карткою;
- `.error` задає червоний колір для повідомлення про помилку;
- `button:disabled` робить неактивну кнопку візуально бліднішою.

### Чому в CSS пишемо `.card h3`

У CSS крапка перед назвою означає клас. Якщо в HTML є елемент:

```html
<article class="card">
  <h3>Leanne Graham</h3>
</article>
```

то в CSS до нього звертаються так:

```css
.card {
  background: #f6f8fa;
}
```

Запис `.card h3` означає: знайти всі теги `h3`, які знаходяться всередині елемента з класом `card`.

Тобто це не всі заголовки `h3` на сторінці, а тільки заголовки всередині карток користувачів.

Різниця така:

- `card` шукав би тег `<card>`, якого в нашому HTML немає;
- `.card` шукає елемент з `class="card"`;
- `#users` шукає елемент з `id="users"`;
- `.card h3` шукає `h3` всередині `class="card"`.

У `<body>` є три важливі елементи:

```html
<h1>Каталог користувачів</h1>
<p id="status">Завантаження...</p>
<div id="users"></div>
```

`h1` — заголовок сторінки.  
`#status` — місце для статусу, наприклад `Завантаження користувачів...` або повідомлення про помилку.  
`#users` — порожній контейнер, куди JavaScript додасть картки користувачів.

Внизу підключається файл:

```html
<script src="users.js"></script>
```

Саме в `users.js` написана вся логіка завантаження і рендеру.

## Пояснення `users.js`

### Константа API

```js
const API = "https://jsonplaceholder.typicode.com";
```

Тут зберігається базова адреса API. Це зручно, бо далі можна писати `${API}/users` або `${API}/posts?userId=1`, а не повторювати повну адресу щоразу.

### Пошук елементів на сторінці

```js
const usersContainer = document.querySelector("#users");
const statusElement = document.querySelector("#status");
```

`document.querySelector()` знаходить елемент у HTML за CSS-селектором.

`usersContainer` — це `<div id="users"></div>`, куди будуть додаватися картки.  
`statusElement` — це `<p id="status">...</p>`, де показується стан завантаження або помилка.

### Запуск коду після готовності HTML

```js
document.addEventListener("DOMContentLoaded", loadUsers);
```

Цей рядок означає: коли браузер прочитав HTML і створив DOM, викликати функцію `loadUsers`.

Це важливо, бо JavaScript працює з елементами сторінки. Якщо почати роботу занадто рано, потрібні елементи можуть ще не існувати.

## Функція `loadUsers`

```js
async function loadUsers() {
  statusElement.textContent = "Завантаження користувачів...";

  try {
    const response = await fetch(`${API}/users`);

    if (!response.ok) {
      throw new Error("Не вдалося завантажити користувачів");
    }

    const users = await response.json();
    renderUsers(users);
    statusElement.textContent = "";
  } catch (error) {
    statusElement.textContent = "Помилка: користувачів не завантажено.";
  }
}
```

`async` означає, що всередині функції можна використовувати `await`.

Спочатку в статус записується текст `Завантаження користувачів...`, щоб користувач бачив, що сторінка не зависла, а чекає відповідь сервера.

`fetch(`${API}/users`)` робить HTTP-запит до API. `await` зупиняє виконання цієї функції, поки відповідь не прийде.

`response.ok` перевіряє, чи відповідь успішна. Наприклад, для `200 OK` буде `true`, а для `404` або `500` буде `false`.

Якщо відповідь погана, виконується:

```js
throw new Error("Не вдалося завантажити користувачів");
```

Це спеціально перекидає програму в `catch`.

Якщо все добре, цей рядок:

```js
const users = await response.json();
```

перетворює JSON-відповідь сервера на звичайний JavaScript-масив об'єктів.

Потім:

```js
renderUsers(users);
```

передає масив користувачів у функцію, яка створює картки.

Після успішного рендеру статус очищається:

```js
statusElement.textContent = "";
```

Якщо сталася помилка з мережею або сервером, спрацьовує `catch`, і на сторінці з'являється повідомлення:

```js
Помилка: користувачів не завантажено.
```

## Функція `renderUsers`

```js
function renderUsers(users) {
  usersContainer.textContent = "";

  users.forEach((user) => {
    const card = createUserCard(user);
    usersContainer.append(card);
  });
}
```

Ця функція отримує масив користувачів.

Спочатку контейнер очищається:

```js
usersContainer.textContent = "";
```

Це потрібно, щоб при повторному рендері старі картки не дублювалися.

Далі `forEach` проходиться по кожному користувачу. Для кожного об'єкта `user` створюється картка:

```js
const card = createUserCard(user);
```

Потім картка додається на сторінку:

```js
usersContainer.append(card);
```

## Функція `createUserCard`

Ця функція створює HTML-елементи для однієї картки користувача.

```js
const card = document.createElement("article");
card.className = "card";
```

`document.createElement("article")` створює новий HTML-елемент `<article>`. Клас `card` потрібен, щоб до нього застосувались CSS-стилі.

Далі створюється ім'я:

```js
const name = document.createElement("h3");
name.textContent = user.name;
```

`user.name` — це ім'я користувача з API. Воно вставляється через `textContent`.

Email:

```js
const email = document.createElement("p");
email.className = "meta";
email.textContent = `Email: ${user.email}`;
```

Тут створюється абзац, додається клас `meta`, а в текст записується email.

Місто:

```js
const city = document.createElement("p");
city.className = "meta";
city.textContent = `Місто: ${user.address.city}`;
```

В API місто лежить всередині вкладеного об'єкта `address`, тому шлях такий: `user.address.city`.

Компанія:

```js
const company = document.createElement("p");
company.className = "meta";
company.textContent = `Компанія: ${user.company.name}`;
```

Назва компанії лежить у `user.company.name`.

Кнопка:

```js
const button = document.createElement("button");
button.type = "button";
button.textContent = "Завантажити пости";
```

`type = "button"` вказує, що це звичайна кнопка, а не кнопка відправки форми.

Повідомлення про помилку:

```js
const message = document.createElement("p");
message.className = "error";
```

Цей елемент спочатку порожній. Якщо пости не завантажаться, сюди буде записана помилка.

Контейнер для постів:

```js
const postsContainer = document.createElement("div");
postsContainer.className = "posts";
postsContainer.hidden = true;
```

`hidden = true` означає, що блок спочатку прихований. Він стане видимим тільки після успішного завантаження постів.

Обробник кліку:

```js
button.addEventListener("click", () => {
  loadPosts(user.id, button, postsContainer, message);
});
```

Коли користувач натискає кнопку, викликається `loadPosts`. Туди передається:

- `user.id` — id користувача;
- `button` — сама кнопка, щоб змінювати її текст і стан;
- `postsContainer` — місце для постів;
- `message` — місце для помилки.

Наприкінці всі створені частини додаються в картку:

```js
card.append(name, email, city, company, button, message, postsContainer);
```

Після цього функція повертає готову картку:

```js
return card;
```

## Функція `loadPosts`

```js
async function loadPosts(userId, button, postsContainer, message) {
  button.disabled = true;
  button.textContent = "Завантаження...";
  message.textContent = "";

  try {
    const response = await fetch(`${API}/posts?userId=${userId}`);

    if (!response.ok) {
      throw new Error("Не вдалося завантажити пости");
    }

    const posts = await response.json();
    renderPosts(posts, postsContainer);
    button.textContent = "Пости завантажено";
  } catch (error) {
    message.textContent = "Помилка завантаження постів. Спробуйте ще раз.";
    button.disabled = false;
    button.textContent = "Завантажити пости";
  }
}
```

Ця функція завантажує пости конкретного користувача.

На початку кнопка блокується:

```js
button.disabled = true;
```

Це потрібно, щоб користувач не натиснув її кілька разів поспіль і не запустив багато однакових запитів.

Текст кнопки змінюється:

```js
button.textContent = "Завантаження...";
```

Так видно, що дія вже виконується.

Стара помилка очищається:

```js
message.textContent = "";
```

Потім іде запит:

```js
const response = await fetch(`${API}/posts?userId=${userId}`);
```

Наприклад, якщо `userId` дорівнює `3`, адреса буде:

```txt
https://jsonplaceholder.typicode.com/posts?userId=3
```

Параметр `userId` у запиті означає: дай тільки пости цього користувача.

Після успішної відповіді JSON перетворюється на масив:

```js
const posts = await response.json();
```

Потім пости передаються у `renderPosts`:

```js
renderPosts(posts, postsContainer);
```

Якщо все успішно, кнопка отримує текст:

```js
Пости завантажено
```

Кнопка лишається неактивною. Це нормально, бо пости вже завантажені і повторно натискати не потрібно.

Якщо сталася помилка, `catch` показує текст помилки на конкретній картці:

```js
message.textContent = "Помилка завантаження постів. Спробуйте ще раз.";
```

Після помилки кнопка знову стає активною:

```js
button.disabled = false;
```

Це дає можливість спробувати ще раз.

## Функція `renderPosts`

```js
function renderPosts(posts, postsContainer) {
  postsContainer.textContent = "";
  postsContainer.hidden = false;

  const title = document.createElement("h4");
  title.textContent = "Пости користувача";

  const list = document.createElement("ul");

  posts.forEach((post) => {
    const item = document.createElement("li");
    item.textContent = post.title;
    list.append(item);
  });

  postsContainer.append(title, list);
}
```

Ця функція відповідає тільки за показ постів.

Спочатку контейнер очищається:

```js
postsContainer.textContent = "";
```

Потім він стає видимим:

```js
postsContainer.hidden = false;
```

Створюється заголовок:

```js
const title = document.createElement("h4");
title.textContent = "Пости користувача";
```

Далі створюється список:

```js
const list = document.createElement("ul");
```

Для кожного поста створюється пункт списку:

```js
const item = document.createElement("li");
item.textContent = post.title;
```

`post.title` — це назва поста з API. Вона теж вставляється через `textContent`.

У кінці заголовок і список додаються в контейнер:

```js
postsContainer.append(title, list);
```

## Чому використовується `textContent`

У завданні спеціально сказано уникати XSS. XSS — це ситуація, коли на сторінку може потрапити чужий небезпечний код.

`textContent` вставляє дані як звичайний текст. Навіть якщо в даних буде щось схоже на HTML-тег, браузер не виконає це як HTML.

Тому для даних з API використано:

```js
name.textContent = user.name;
item.textContent = post.title;
```

Це безпечніше для такого завдання.

## Для чого потрібні окремі функції

Код поділений на функції, щоб він був зрозумілішим:

- `loadUsers` завантажує користувачів;
- `renderUsers` показує список користувачів;
- `createUserCard` створює одну картку;
- `loadPosts` завантажує пости одного користувача;
- `renderPosts` показує список постів.

Так простіше читати код і легше знайти помилку. Якщо не працюють пости, дивимось `loadPosts` або `renderPosts`. Якщо не показуються користувачі, дивимось `loadUsers` або `renderUsers`.

## Питання для захисту

### Чому `textContent`, а не `innerHTML`?

Бо `textContent` вставляє саме текст і не виконує HTML-код. Це захищає сторінку від XSS, якщо з API прийдуть небезпечні або неочікувані дані.

### Що буде, якщо клацнути на кнопку двічі швидко?

Після першого кліку кнопка одразу стає `disabled`, тому другий швидкий клік не запустить ще один `fetch`. Якщо запит завершиться помилкою, кнопка знову стане активною, щоб можна було повторити спробу.

### Де ловляться помилки `fetch`?

У функціях `loadUsers` і `loadPosts` є блоки `try...catch`. Сам запит виконується в `try`, а помилки обробляються в `catch`. Додатково перевіряється `response.ok`, бо `fetch` не завжди сам кидає помилку на відповіді типу `404` або `500`.

# Контрольні запитання 5

## Блоки

Блок — це окрема частина сторінки або програми. У цьому завданні можна виділити блок статусу, блок списку користувачів, картку користувача і блок постів.

## Умови завершення

Умови завершення — це список того, що має працювати, щоб завдання вважалося виконаним. Тут це: користувачі завантажуються, картки створюються через DOM, пости вантажаться по кліку, є стан завантаження і помилки.

## Контрольні запитання

Контрольні запитання потрібні, щоб перевірити розуміння теми: HTTP, API, JSON, AJAX, Promise і роботу з асинхронним кодом.

## 1. Що таке HTTP, HTTPS?

HTTP — це протокол обміну даними між клієнтом, наприклад браузером, і сервером. HTTPS — це HTTP із шифруванням. HTTPS безпечніший, бо дані передаються захищено.

## 2. Які порти за замовчуванням використовує HTTP?

HTTP зазвичай використовує порт `80`, а HTTPS — порт `443`.

## 3. Загальна структура HTTP-повідомлення

HTTP-повідомлення має стартовий рядок, заголовки і тіло. У запиті стартовий рядок містить метод і шлях, наприклад `GET /users`. У відповіді він містить код статусу, наприклад `200 OK`.

## 4. Методи HTTP

`GET` отримує дані. `POST` створює нові дані. `PUT` повністю замінює ресурс. `PATCH` частково оновлює ресурс. `DELETE` видаляє ресурс. `HEAD` отримує тільки заголовки. `OPTIONS` показує, які можливості доступні для ресурсу.

## 5. Коди стану HTTP-відповідей

`2xx` означає успіх, наприклад `200 OK`. `3xx` означає перенаправлення. `4xx` означає помилку клієнта, наприклад `404 Not Found`. `5xx` означає помилку сервера, наприклад `500 Internal Server Error`.

## 6. Що таке HTTP cookie?

Cookie — це невеликі дані, які сайт зберігає в браузері. Їх використовують для сесій, авторизації, налаштувань сайту або аналітики.

## 7. Що таке AJAX?

AJAX — це підхід, коли сторінка отримує або відправляє дані без повного перезавантаження. У сучасному JavaScript для цього часто використовують `fetch`.

## 8. З якою метою використовується AJAX?

AJAX робить сайт швидшим і зручнішим. Наприклад, у цьому завданні пости користувача завантажуються після кліку, а вся сторінка не перезавантажується.

## 9. Що таке JSON?

JSON — це текстовий формат для передачі даних. Він схожий на об'єкти JavaScript і часто використовується в API.

```json
{
  "name": "Leanne Graham",
  "email": "Sincere@april.biz"
}
```

## 10. Що таке CORS?

CORS — це механізм безпеки браузера для запитів між різними доменами. Якщо сайт звертається до API на іншому домені, сервер має дозволити такий запит спеціальними CORS-заголовками.

## 11. Що таке Promise? Методи Promise?

Promise — це об'єкт, який представляє асинхронну операцію. Вона може завершитись успішно або з помилкою.

Основні методи: `then()` для успішного результату, `catch()` для помилки, `finally()` для дії після завершення. Також є `Promise.all()`, `Promise.race()`, `Promise.allSettled()` і `Promise.any()`.
