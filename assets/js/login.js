const params = new URLSearchParams(window.location.search);
const user = params.get("user");
const mapper = {};

if (user === "customer") {
  mapper["elementId"] = "phone";
  mapper["feebackId"] = "phone_feedback";
  mapper["data"] = "userData";
  mapper["key"] = "phone";
  mapper["message"] = "Phone Number";
} else {
  mapper["elementId"] = "repId";
  mapper["feebackId"] = "repId_feedback";
  mapper["data"] = "repData";
  mapper["key"] = "userId";
  mapper["message"] = "Rep ID";
}

function verifyData(e, className) {
  const feedback = document.querySelector(`.${className}`);

  if (e.value.length === 0) {
    e.classList.add("invalid_input");
    feedback.style.display = "block";
    return false;
  } else {
    e.classList.remove("invalid_input");
    feedback.style.display = "none";
    return true;
  }
}

function login(e) {
  e.preventDefault();

  const id = document.getElementById(mapper.elementId);
  const password = document.getElementById("password");

  const isValidId = verifyData(id, mapper.feebackId);
  const isValidPassword = verifyData(password, "password_feedback");

  id.addEventListener("input", () => verifyData(id, mapper.feebackId));
  password.addEventListener("input", () =>
    verifyData(password, "password_feedback")
  );

  if (!(isValidId && isValidPassword)) return false;

  const data = JSON.parse(localStorage.getItem(mapper.data)) || [];

  const exist = data.some((data) => data[mapper.key] == id.value);
  const matched = data.some(
    (data) => data[mapper.key] == id.value && data.password == password.value
  );

  if (exist) {
    if (matched) {
      localStorage.setItem(mapper.elementId, JSON.stringify(id.value));
      appendAlert("Logined Successfully", "success");
      document.querySelector("form").reset();
      window.location.href = "../../pages/profile.html";
    } else {
      appendAlert("Incorrect credentials", "danger");
    }
  } else {
    appendAlert(`${mapper.message} not found`, "danger");
  }
}
