let form = document.querySelector(".add-form");
let input = document.querySelector(".add-form input");
let list = document.querySelector(".left-column");
let remainingSummary = document.querySelector(".remaining-summary");
let boughtSummary = document.querySelector(".bought-summary");

let savedList = localStorage.getItem("products");

if (savedList !== null) {
  list.innerHTML = form.outerHTML + savedList;
  form = document.querySelector(".add-form");
  input = document.querySelector(".add-form input");
}

updateAll();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let name = input.value.trim();

  if (name === "") {
    input.focus();
    return;
  }

  let item = createItem(name, 1, false);
  list.appendChild(item);

  input.value = "";
  input.focus();

  updateAll();
});

list.addEventListener("click", function (event) {
  let button = event.target;
  let item = button.closest(".item");

  if (item === null) {
    return;
  }

  if (button.classList.contains("plus")) {
    let count = item.querySelector(".count");
    count.textContent = Number(count.textContent) + 1;
  }

  if (button.classList.contains("minus")) {
    let count = item.querySelector(".count");

    if (Number(count.textContent) > 1) {
      count.textContent = Number(count.textContent) - 1;
    }
  }

  if (button.classList.contains("delete-btn")) {
    item.remove();
  }

  if (button.classList.contains("status-btn")) {
    item.classList.toggle("bought");
    drawItemButtons(item);
  }

  updateAll();
});

list.addEventListener("click", function (event) {
  if (!event.target.classList.contains("item-name")) {
    return;
  }

  let name = event.target;
  let item = name.closest(".item");

  if (item.classList.contains("bought")) {
    return;
  }

  let editInput = document.createElement("input");
  editInput.className = "item-name edit-input";
  editInput.value = name.textContent;

  name.replaceWith(editInput);
  editInput.focus();

  editInput.addEventListener("blur", function () {
    let newName = document.createElement("div");
    newName.className = "item-name";
    newName.textContent = editInput.value.trim() || name.textContent;

    editInput.replaceWith(newName);
    updateAll();
  });
});

function createItem(name, count, bought) {
  let item = document.createElement("div");
  item.className = "item";

  if (bought) {
    item.classList.add("bought");
  }

  item.innerHTML = `
    <div class="item-name">${name}</div>
    <div class="controls">
      <button class="circle-btn minus">−</button>
      <div class="count">${count}</div>
      <button class="circle-btn plus">+</button>
    </div>
    <div class="actions"></div>
  `;

  drawItemButtons(item);
  return item;
}

function drawItemButtons(item) {
  let actions = item.querySelector(".actions");
  let controls = item.querySelector(".controls");
  let count = item.querySelector(".count");

  if (item.classList.contains("bought")) {
    controls.remove();
    item.insertBefore(count, actions);
    actions.innerHTML = `<button class="status-btn">Не куплено</button>`;
  } else {
    if (controls === null) {
      controls = document.createElement("div");
      controls.className = "controls";
      controls.innerHTML = `
        <button class="circle-btn minus">−</button>
        <div class="count">${count.textContent}</div>
        <button class="circle-btn plus">+</button>
      `;
      count.remove();
      item.insertBefore(controls, actions);
    }

    actions.innerHTML = `
      <button class="status-btn">Куплено</button>
      <button class="delete-btn">×</button>
    `;
  }
}

function updateAll() {
  updateMinusButtons();
  updateSummary();
  saveList();
}

function updateMinusButtons() {
  let items = document.querySelectorAll(".item");

  items.forEach(function (item) {
    let minus = item.querySelector(".minus");
    let count = item.querySelector(".count");

    if (minus !== null) {
      minus.disabled = Number(count.textContent) === 1;
    }
  });
}

function updateSummary() {
  remainingSummary.innerHTML = "";
  boughtSummary.innerHTML = "";

  let items = document.querySelectorAll(".item");

  items.forEach(function (item) {
    let name = item.querySelector(".item-name").textContent;
    let count = item.querySelector(".count").textContent;
    let summaryItem = document.createElement("div");

    summaryItem.className = "summary-item";
    summaryItem.innerHTML = `${name} <span class="badge-count">${count}</span>`;

    if (item.classList.contains("bought")) {
      summaryItem.classList.add("bought");
      boughtSummary.appendChild(summaryItem);
    } else {
      remainingSummary.appendChild(summaryItem);
    }
  });
}

function saveList() {
  let items = document.querySelectorAll(".item");
  let html = "";

  items.forEach(function (item) {
    html += item.outerHTML;
  });

  localStorage.setItem("products", html);
}
