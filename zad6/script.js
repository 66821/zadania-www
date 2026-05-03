const form = document.getElementById("contactForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

function showError(input, errorElement, text) {
  input.classList.add("error-input");
  errorElement.textContent = text;
}

function clearError(input, errorElement) {
  input.classList.remove("error-input");
  errorElement.textContent = "";
}

function containsDigits(text) {
  return /\d/.test(text);
}

function validateEmail(emailValue) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;
  successMessage.textContent = "";

  clearError(firstName, firstNameError);
  clearError(lastName, lastNameError);
  clearError(email, emailError);
  clearError(message, messageError);

  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  if (firstNameValue === "") {
    showError(firstName, firstNameError, "Pole imię jest wymagane.");
    isValid = false;
  } else if (containsDigits(firstNameValue)) {
    showError(firstName, firstNameError, "Imię nie może zawierać cyfr.");
    isValid = false;
  }

  if (lastNameValue === "") {
    showError(lastName, lastNameError, "Pole nazwisko jest wymagane.");
    isValid = false;
  } else if (containsDigits(lastNameValue)) {
    showError(lastName, lastNameError, "Nazwisko nie może zawierać cyfr.");
    isValid = false;
  }

  if (emailValue === "") {
    showError(email, emailError, "Pole e-mail jest wymagane.");
    isValid = false;
  } else if (!validateEmail(emailValue)) {
    showError(email, emailError, "Podaj poprawny adres e-mail.");
    isValid = false;
  }

  if (messageValue === "") {
    showError(message, messageError, "Pole wiadomość jest wymagane.");
    isValid = false;
  }

  if (isValid) {
    successMessage.textContent = "Formularz został poprawnie wypełniony.";
    form.reset();
  }
});

fetch("data.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Nie udało się pobrać danych z pliku JSON.");
    }

    return response.json();
  })
  .then(function (data) {
    const skillsList = document.getElementById("skillsList");
    const projectsList = document.getElementById("projectsList");

    data.skills.forEach(function (skill) {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    data.projects.forEach(function (project) {
      const li = document.createElement("li");
      li.textContent = project;
      projectsList.appendChild(li);
    });
  })
  .catch(function (error) {
    console.error("Błąd:", error);
  });
