const params = new URLSearchParams(window.location.search);
const user = params.get("user");

function signUp(e) {
  e.preventDefault();

  if (user === "customer") {
    const name = document.getElementById("name").value;
    const phoneNo = document.getElementById("phoneNo").value;
    const userUniqueId = uuidv4();
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    const exist = userData.some((data) => data.phoneNo === phoneNo);

    if (!exist) {
      if (password === confirm_password) {
        userData.push({
          name,
          phoneNo,
          password,
          userUniqueId,
        });
        localStorage.setItem("userData", JSON.stringify(userData));
        document.querySelector("form").reset();
        alert("Account Created Successfully");
        window.location.href = "../../pages/signIn.html?user=customer";
      } else {
        alert("Password doesn't matched!");
      }
    } else {
      alert("Ooopppssss... Duplicate found! You have already signed up");
    }
  } else if (user === "rep") {
    const repId = document.getElementById("repId").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    const address = "";
    const district = "";
    const pincode = "";
    const phoneNo = "";

    const repData = JSON.parse(localStorage.getItem("repData")) || [];

    const exist = repData.some((data) => data.userId === repId);

    if (!exist) {
      if (password === confirm_password) {
        repData.push({
          repId,
          name,
          phoneNo,
          password,
          address,
          district,
          pincode,
          user,
        });
        localStorage.setItem("repData", JSON.stringify(repData));
        document.querySelector("form").reset();
        alert("Account Created Successfully");
        window.location.href = "../../pages/signIn.html?user=rep";
      } else {
        alert("Password doesn't matched!");
      }
    } else {
      alert("Ooopppssss... Duplicate found! You have already signed up");
    }
  }
}

document.getElementById("registerForm").addEventListener("submit", signUp);
