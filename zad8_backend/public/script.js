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

function clearAllMessages() {
  successMessage.textContent = "";
  successMessage.className = "success";

  clearError(firstName, firstNameError);
  clearError(lastName, lastNameError);
  clearError(email, emailError);
  clearError(message, messageError);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let isValid = true;
  clearAllMessages();

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

  if (!isValid) {
    return;
  }

  const formData = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: emailValue,
    message: messageValue
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Nie udało się wysłać formularza.");
    }

    successMessage.textContent = result.message;
    successMessage.className = "success";
    form.reset();
  } catch (error) {
    successMessage.textContent = "Wystąpił błąd podczas wysyłania formularza.";
    successMessage.className = "error";
    console.error("Błąd:", error);
  }
});
