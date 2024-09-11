const params = new URLSearchParams(window.location.search);
const user = params.get("user");

function verifyPhone(phone) {
  const phoneFeedback = document.querySelector(".phone_feedback");

  if (phone.value.length > 0) {
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

  if (password.value.length > 0) {
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

function login(e) {
  e.preventDefault();

  if (user === "customer") {
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");

    const isValidPhone = verifyPhone(phone);
    const isValidPassword = verifyPassword(password);

    if (!isValidPhone)
      phone.addEventListener("input", () => verifyPhone(phone));
    if (!isValidPassword)
      password.addEventListener("input", () => verifyPassword(password));

    if (!(isValidPhone && isValidPassword)) return false;

    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    const exist = userData.some((data) => data.phone == phone);
    const matched = userData.some(
      (data) => data.phone == phone && data.password == password
    );

    if (exist) {
      if (matched) {
        localStorage.setItem("phoneNo", JSON.stringify(phone));
        alert("Successfully logined");
        window.location.href = "../../pages/buyer_profile.html";
      } else {
        alert("Incorrect login credentials");
      }
    } else {
      alert("Phone number not fond");
    }
  } else if (user === "rep") {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    const repDetail = JSON.parse(localStorage.getItem("repData"));

    if (repDetail) {
      const exist = repDetail.some(
        (data) => data.userId === userId && data.password === password
      );

      if (!exist) {
        alert("Incorrect login credentials");
      } else {
        localStorage.setItem("rep_id", JSON.stringify(userId));
        alert("Successfully logined");
        window.location.href = "../../pages/buyer_profile.html";
      }
    } else {
      alert("Incorrect login credentails");
    }
  }

  document.querySelector("form").reset();
}

document.getElementById("loginForm").addEventListener("submit", login);
