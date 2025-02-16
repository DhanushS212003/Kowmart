function verifyName(name) {
  const nameFeedback = document.querySelector(".name_feedback");

  if (name.value.trim() === "") {
    name.classList.add("invalid_input");
    name.classList.remove("valid_input");
    nameFeedback.style.display = "block";
    return false;
  } else {
    name.classList.add("valid_input");
    name.classList.remove("invalid_input");
    nameFeedback.style.display = "none";
    return true;
  }
}

function verifyPhone(phone) {
  const phoneFeedback = document.querySelector(".phone_feedback");

  if (!/^[6789]\d{9}$/.test(phone.value)) {
    phone.classList.add("invalid_input");
    phone.classList.remove("valid_input");
    phoneFeedback.style.display = "block";
    return false;
  } else {
    phone.classList.add("valid_input");
    phone.classList.remove("invalid_input");
    phoneFeedback.style.display = "none";
    return true;
  }
}

function verifyPassword(password) {
  const passwordFeedback = document.querySelector(".password_feedback");

  if (
    !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,24}$/.test(
      password.value
    )
  ) {
    password.classList.add("invalid_input");
    password.classList.remove("valid_input");
    passwordFeedback.style.display = "block";
    return false;
  } else {
    password.classList.add("valid_input");
    password.classList.remove("invalid_input");
    passwordFeedback.style.display = "none";
    return true;
  }
}

function verifyConfirmPassword(confirmPassword) {
  const confirmPasswordFeedback = document.querySelector(
    ".confirm_password_feedback"
  );

  if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add("invalid_input");
    confirmPassword.classList.remove("valid_input");
    confirmPasswordFeedback.style.display = "block";
    return false;
  } else {
    confirmPassword.classList.add("valid_input");
    confirmPassword.classList.remove("invalid_input");
    confirmPasswordFeedback.style.display = "none";
    return true;
  }
}

function signUp(e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm_password");

  const isValidName = verifyName(name);
  const isValidPhone = verifyPhone(phone);
  const isValidPassword = verifyPassword(password);

  name.addEventListener("input", () => verifyName(name));
  phone.addEventListener("input", () => verifyPhone(phone));
  password.addEventListener("input", () => verifyPassword(password));

  if (!(isValidName && isValidPhone && isValidPassword)) return false;

  const isValidConfirmPassword = verifyConfirmPassword(confirmPassword);

  confirmPassword.addEventListener("input", () =>
    verifyConfirmPassword(confirmPassword)
  );

  if (!isValidConfirmPassword) return false;

  const exist = USER_LIST.some((data) => data.phone == phone.value);

  if (!exist) {
    USER_LIST.push({
      name: name.value.trim(),
      phone: phone.value,
      password: password.value,
    });
    localStorage.setItem("userData", JSON.stringify(USER_LIST));
    appendAlert("Account Created Successfully", "success");
    document.querySelector("form").reset();
    window.location.href = "../../pages/login.html?user=customer";
  } else {
    appendAlert("You have already signed up", "danger");
  }
}
