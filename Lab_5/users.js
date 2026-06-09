// ============================================================
// Завдання 3 — Каталог користувачів
// ============================================================
// API:
//   GET https://jsonplaceholder.typicode.com/users          — масив користувачів
//   GET https://jsonplaceholder.typicode.com/posts?userId=X — пости юзера
//
// Важливо:
// - Дані з API вставляємо через textContent.
// - Так ми не даємо випадковому HTML або script виконатися на сторінці.
// ============================================================

const API = "https://jsonplaceholder.typicode.com";

const usersContainer = document.querySelector("#users");
const statusElement = document.querySelector("#status");

document.addEventListener("DOMContentLoaded", loadUsers);

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

function renderUsers(users) {
  usersContainer.textContent = "";

  users.forEach((user) => {
    const card = createUserCard(user);
    usersContainer.append(card);
  });
}

function createUserCard(user) {
  const card = document.createElement("article");
  card.className = "card";

  const name = document.createElement("h3");
  name.textContent = user.name;

  const email = document.createElement("p");
  email.className = "meta";
  email.textContent = `Email: ${user.email}`;

  const city = document.createElement("p");
  city.className = "meta";
  city.textContent = `Місто: ${user.address.city}`;

  const company = document.createElement("p");
  company.className = "meta";
  company.textContent = `Компанія: ${user.company.name}`;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Завантажити пости";

  const message = document.createElement("p");
  message.className = "error";

  const postsContainer = document.createElement("div");
  postsContainer.className = "posts";
  postsContainer.hidden = true;

  button.addEventListener("click", () => {
    loadPosts(user.id, button, postsContainer, message);
  });

  card.append(name, email, city, company, button, message, postsContainer);

  return card;
}

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
