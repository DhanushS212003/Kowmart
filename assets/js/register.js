const params = new URLSearchParams(window.location.search);
const user = params.get("user");

function signUp(e) {
  e.preventDefault();

  if (user === "customer") {
    const name = document.getElementById("name").value;
    const phoneNo = document.getElementById("phoneNo").value;
    const user_uniqueId = uuidv4();
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    const address = "";
    const district = "";
    const pincode = "";
    const user = "customer";

    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    const exist = userData.some((data) => data.phone_no === phoneNo);

    if (!exist) {
      if (password === confirm_password) {
        userData.push({
          name,
          phoneNo,
          password,
          address,
          district,
          pincode,
          user_uniqueId,
          user,
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
    const userId = document.getElementById("userId").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    const address = "";
    const district = "";
    const pincode = "";
    const user = "rep";
    // const notification = [];
    const phoneNo = "";

    const rep_details = JSON.parse(localStorage.getItem("rep_details")) || [];

    const exist = rep_details.some((data) => data.userId === userId);

    if (!exist) {
      if (password === confirm_password) {
        rep_details.push({
          userId,
          name,
          phoneNo,
          password,
          address,
          district,
          pincode,
          user,
        });
        localStorage.setItem("rep_details", JSON.stringify(rep_details));
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
