const params = new URLSearchParams(window.location.search);
const user = params.get("user");
const repDetail = JSON.parse(localStorage.getItem("repData"));

function signIn(e) {
  e.preventDefault();

  if (user === "customer") {
    const phoneNo = document.getElementById("phoneNo").value;
    const password = document.getElementById("password").value;

    const userDetails = JSON.parse(localStorage.getItem("userData"));

    if (userDetails) {
      const exist = userDetails.some(
        (data) => data.phoneNo === phoneNo && data.password === password
      );

      if (!exist) {
        alert("Incorrect login credentials");
      } else {
        localStorage.setItem("phoneNo_id", JSON.stringify(phoneNo));
        alert("Successfully logined");
        window.location.href = "../../pages/buyer_profile.html";
      }
    } else {
      alert("Incorrect login credentials");
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

document.getElementById("loginForm").addEventListener("submit", signIn);
