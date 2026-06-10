## 1. Що таке DOM?

DOM — це Document Object Model, тобто об’єктна модель документа.

Коли браузер відкриває HTML-сторінку, він перетворює HTML-код у дерево об’єктів. Через це дерево JavaScript може знаходити елементи, змінювати текст, стилі, атрибути, додавати або видаляти елементи.

Простіше:

<h1>Hello</h1>
у DOM стає об’єктом, з яким можна працювати через JS.

## 2. Які елементи HTML-розмітки відображені в DOM, а які ні?

У DOM відображаються майже всі частини HTML-документа:

html
head
body
div
p
input
button
script
style
title
meta
Також у DOM можуть бути:

текстові вузли;
коментарі;
атрибути елементів.
Наприклад, коментар:

<!-- comment -->
на сторінці не видно, але в DOM він може існувати як вузол.

## 3. Які елементи HTML-розмітки відображені на сторінці, а які ні?

На сторінці відображаються елементи з body, які мають візуальний вигляд:

h1
p
div
button
input
img
a
table
Не відображаються напряму:

head
title
meta
script
style
link
Також не видно:

display: none;
або:

<input type="hidden">
Коментарі теж не видно на сторінці.

## 4. Який глобальний об’єкт використовується в JS для взаємодії з DOM?

Основний глобальний об’єкт — це:

document
Наприклад:

document.getElementById("title");
Також є глобальний об’єкт:

window
window — це вікно браузера, а document — сама HTML-сторінка всередині нього.

## 5. Які є функції для пошуку елементів в DOM?

Основні:

document.getElementById("id")
document.getElementsByClassName("class")
document.getElementsByTagName("div")
document.querySelector(".class")
document.querySelector("#id")
document.querySelectorAll("p")
Приклади:

document.getElementById("password");
document.querySelector(".btn");
document.querySelectorAll("input");
## 6. Що повертають querySelector і querySelectorAll?

querySelector()
повертає перший елемент, який підходить під CSS-селектор.

const button = document.querySelector("button");
querySelectorAll()
повертає список усіх елементів, які підходять під селектор.

const inputs = document.querySelectorAll("input");
querySelectorAll() повертає NodeList, не звичайний масив.

## 7. Як створити HTML-елемент за допомогою JS?

Через:

document.createElement()
Приклад:

const div = document.createElement("div");
div.innerText = "Hello";
Так створюється елемент, але він ще не з’явиться на сторінці. Його треба додати в DOM.

## 8. Що таке innerHTML, outerHTML, innerText?

innerHTML
це HTML-код всередині елемента.

div.innerHTML = "<b>Hello</b>";
Текст буде жирним, бо <b> сприймається як HTML.

innerText
це тільки текст всередині елемента.

div.innerText = "<b>Hello</b>";
На сторінці буде видно саме текст <b>Hello</b>, без жирного стилю.

outerHTML
це весь HTML елемента разом із самим елементом.

Наприклад:

<div>Hello</div>
Для цього div:

innerHTML
буде:

Hello
А:

outerHTML
буде:

<div>Hello</div>

## 9. Як видалити HTML-елемент з розмітки?

Найпростіше:

element.remove();
Приклад:

const box = document.querySelector(".box");
box.remove();
Ще можна через батьківський елемент:

parent.removeChild(child);
## 10. Як скопіювати існуючий HTML-елемент?

Через:

cloneNode()
Приклад:

const copy = element.cloneNode(true);
true означає скопіювати елемент разом з усіма дочірніми елементами.

const copy = element.cloneNode(false);
false означає скопіювати тільки сам елемент без дітей.

## 11. Як додати новий елемент до існуючого?

Основні методи:

append()
appendChild()
prepend()
before()
after()
Приклад:

const div = document.createElement("div");
div.innerText = "Новий елемент";

document.body.append(div);
Або додати всередину конкретного елемента:

parent.appendChild(div);
## 12. DOM-події для input, textarea, contenteditable

Основні події:

input
change
focus
blur
keydown
keyup
keypress
select
paste
copy
cut
Найважливіші:

input
спрацьовує одразу при зміні тексту.

change
спрацьовує після зміни, часто коли поле втратило фокус.

focus
коли користувач став у поле.

blur
коли користувач вийшов із поля.

## 13. DOM-події для мишки

Основні:

click
dblclick
mousedown
mouseup
mousemove
mouseover
mouseout
mouseenter
mouseleave
contextmenu
Приклад:

button.addEventListener("click", function () {
  console.log("Clicked");
});
## 14. DOM-події для взаємодії з HTML-елементами

Приклади:

click
input
change
submit
focus
blur
keydown
keyup
load
scroll
resize
Для форми часто використовують:

submit
Для кнопки:

click
Для поля вводу:

input
change
## 15. Як додати подію до HTML-елемента?

Є кілька способів.

Через HTML-атрибут:

<button onclick="sayHello()">Click</button>
Через властивість JS:

button.onclick = function () {
  console.log("Click");
};
Найкращий сучасний спосіб:

button.addEventListener("click", function () {
  console.log("Click");
});
addEventListener кращий, бо можна додати кілька обробників на одну подію.

## 16. Як взаємодіяти з дочірніми елементами?

Можна використовувати:

element.children
element.childNodes
element.firstElementChild
element.lastElementChild
Різниця:

children
повертає тільки HTML-елементи.

childNodes
повертає всі вузли: елементи, текст, коментарі.

Приклад:

const list = document.querySelector("ul");

console.log(list.children);
console.log(list.firstElementChild);
## 17. Як взаємодіяти з parent node та sibling nodes?

Батьківський елемент:

element.parentElement
element.parentNode
Сусідні елементи:

element.nextElementSibling
element.previousElementSibling
Також є:

element.nextSibling
element.previousSibling
Але вони можуть повернути текстовий вузол, наприклад пробіл або перенос рядка.

## 18. Чим HTMLCollection відрізняється від масиву і як перетворити її в масив?

HTMLCollection — це колекція елементів DOM, але це не справжній масив.

Наприклад:

const items = document.getElementsByClassName("item");
У неї немає всіх методів масиву, наприклад map.

Перетворити в масив можна так:

const array = Array.from(items);
або:

const array = [...items];
Після цього можна використовувати:

array.map()
array.filter()
array.forEach()
## 19. Як отримати стилі елемента і як додати стиль?

Отримати застосовані стилі:

getComputedStyle(element)
Приклад:

const styles = getComputedStyle(button);
console.log(styles.color);
Додати стиль можна так:

element.style.color = "red";
element.style.backgroundColor = "black";
Або через клас:

element.classList.add("active");
Це кращий спосіб, якщо стилів багато.

## 20. Як взаємодіяти з атрибутами і data-атрибутами?

Звичайні атрибути:

element.getAttribute("href");
element.setAttribute("href", "https://google.com");
element.removeAttribute("href");
element.hasAttribute("href");
Приклад:

const link = document.querySelector("a");
link.setAttribute("target", "_blank");
Data-атрибути:

<button data-id="15" data-role="admin"></button>
У JS:

button.dataset.id;
button.dataset.role;
Змінити:

button.dataset.id = "20";
## 21. Що таке bubbling події? Як його відмінити?

Bubbling або спливання події — це коли подія спочатку спрацьовує на внутрішньому елементі, а потім піднімається до батьківських.

Наприклад:

<div>
  <button>Click</button>
</div>
Якщо натиснути кнопку, подія click може спрацювати і на button, і на div.

Зупинити спливання можна так:

event.stopPropagation();
## 22. Різниця між target та currentTarget

event.target
це елемент, на який реально натиснули.

event.currentTarget
це елемент, на якому висить обробник події.

Приклад:

div.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.currentTarget);
});
Якщо натиснути кнопку всередині div:

target буде button;
currentTarget буде div.
## 23. Як отримати список елементів форми?

Через властивість:

form.elements
Приклад:

const form = document.querySelector("form");
console.log(form.elements);
Можна отримати конкретне поле:

form.elements["email"];
## 24. На які елементи можна додати події focus та blur?

На елементи, які можуть отримувати фокус:

input
textarea
select
button
a
Також на елементи з атрибутом:

<div tabindex="0"></div>
focus — коли елемент отримав фокус.
blur — коли елемент втратив фокус.

## 25. Якими способами можна відправити форму?

Через кнопку:

<button type="submit">Send</button>
Через input:

<input type="submit" value="Send">
Через JavaScript:

form.submit();
Або:

form.requestSubmit();
Також форма може відправитися при натисканні Enter у полі вводу.

## 26. Як змінити стандартну поведінку форми?

Стандартна поведінка форми — відправити дані на сервер і перезавантажити сторінку.

Щоб це зупинити, використовують:

event.preventDefault();
Приклад:

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log("Форма не відправилась стандартно");
});
Після цього можна самим обробити дані через JavaScript, наприклад перевірити поля або надіслати через fetch.