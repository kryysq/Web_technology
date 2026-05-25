// ============================================================
// Завдання 4 — Валідатор паролів
// ============================================================

const WEAK_PASSWORDS = ["password", "12345678", "qwerty", "admin"];

function hasUppercase(password) {
  return /[A-Z]/.test(password);
}

function hasLowercase(password) {
  return /[a-z]/.test(password);
}

function hasDigit(password) {
  return /[0-9]/.test(password);
}

function hasSpecialCharacter(password) {
  return /[!@#$%^&*]/.test(password);
}

function hasSpaces(password) {
  return /\s/.test(password);
}

function isWeakPassword(password) {
  const normalizedPassword = password.toLowerCase();

  return WEAK_PASSWORDS.some((weakPassword) =>
    normalizedPassword.includes(weakPassword)
  );
}

/**
 * Перевіряє пароль за 7 правилами:
 *
 * 1. Довжина >= 8 символів
 * 2. Хоча б одна велика літера (A-Z)
 * 3. Хоча б одна мала літера (a-z)
 * 4. Хоча б одна цифра (0-9)
 * 5. Хоча б один спецсимвол !@#$%^&*
 * 6. Без пробілів
 * 7. Не зі списку WEAK_PASSWORDS (case-insensitive)
 *
 * Повертає об'єкт:
 *   { valid: boolean, errors: string[] }
 *
 * Якщо порушено кілька правил — у errors мають бути ВСІ повідомлення.
 */
function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push("Довжина < 8");
  }

  if (!hasUppercase(password)) {
    errors.push("Немає великих літер");
  }

  if (!hasLowercase(password)) {
    errors.push("Немає малих літер");
  }

  if (!hasDigit(password)) {
    errors.push("Немає цифр");
  }

  if (!hasSpecialCharacter(password)) {
    errors.push("Немає спецсимволів");
  }

  if (hasSpaces(password)) {
    errors.push("Не повинен містити пробіли");
  }

  if (isWeakPassword(password)) {
    errors.push("Це слабкий пароль");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================
// Тестові кейси
// ============================================================
console.log(validatePassword("Abc1!def"));
// { valid: true, errors: [] }
//
console.log(validatePassword("abc"));
// { valid: false, errors: ["Довжина < 8", "Немає великих літер", "Немає цифр", "Немає спецсимволів"] }
//
console.log(validatePassword("PASSWORD123!"));
// { valid: false, errors: ["Немає малих літер", "Це слабкий пароль"] }
//
console.log(validatePassword("MyPass 1!"));
// { valid: false, errors: ["Не повинен містити пробіли"] }
//
console.log(validatePassword(""));
// { valid: false, errors: ["Довжина < 8", "Немає великих літер", ...] }

module.exports = {
  validatePassword,
};