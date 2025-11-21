const fields = {
    firstName: {
        regex: /^[A-ZА-ЯІЇЄ][a-zA-Zа-яА-ЯіІїЇєЄ]+$/,
        error: "Ім'я має починатися з великої літери та містити лише українські або англійські літери."
    },
    lastName: {
        regex: /^[A-ZА-ЯІЇЄ][a-zA-Zа-яА-ЯіІїЇєЄ]+$/,
        error: "Прізвище має починатися з великої літери та містити лише українські або англійські літери."
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        error: "Невірний формат e-mail."
    },
    password: {
        regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        error: "Пароль не відповідає всім вимогам вище."
    }
};

const form = document.getElementById("loginForm");
const submitBtn = document.getElementById("submitBtn");

Object.keys(fields).forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("input", () => validateField(id));
});

function validateField(id) {
    const input = document.getElementById(id);
    const small = input.nextElementSibling;

    if (!fields[id].regex.test(input.value)) {
        input.classList.add("invalid");
        input.classList.remove("valid");
        small.textContent = fields[id].error;
    } else {
        input.classList.remove("invalid");
        input.classList.add("valid");
        small.textContent = "";
    }

    if (id === "password") {
        updatePasswordPanel(input.value);
    }

    validateForm();
}

function updatePasswordPanel(value) {
    const rules = {
        length: value.length >= 8,
        upper: /[A-Z]/.test(value),
        lower: /[a-z]/.test(value),
        digit: /\d/.test(value),
        special: /[\W_]/.test(value)
    };

    Object.keys(rules).forEach(rule => {
        const li = document.querySelector(`.password-panel li[data-rule="${rule}"]`);
        if (!li) return;
        li.classList.toggle("valid", rules[rule]);
        li.classList.toggle("invalid", !rules[rule]);
    });
}

function validateForm() {
    const allValid = Object.keys(fields).every(id =>
        fields[id].regex.test(document.getElementById(id).value)
    );
    submitBtn.disabled = !allValid;
}

document.getElementById("showPassword").addEventListener("change", e => {
    document.getElementById("password").type = e.target.checked ? "text" : "password";
});

form.addEventListener("submit", e => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    const userData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    alert("Дані успішно відправлені!\n" +
        `Ім'я: ${userData.firstName}\n` +
        `Прізвище: ${userData.lastName}\n` +
        `Email: ${userData.email}`);
    console.log(userData);
});
