const root = window.location.origin;

const beforeLogin = `<header>
        <div class = "header_container">
          <div class = "d-flex align-items-center">
              <div class = "logo_container"> <a href = "${root}/index.html"> <img class = "logo" src = "${root}/assets/images/cattles/logo1.png" alt = "logo"> </a> </div>
              <a class = "primary_color" href = "${root}/index.html"> <h2> KowMart </h2> </a>
          </div>

          <div id = "mySidenav" class = "sidenav">
              <div class = "d-flex flex-column row-gap-3 ps-4 py-3">
                <a href = "${root}/index.html"> Cattles </a>
                <a href = "${root}/pages/about.html"> About Us </a>
                <a onclick = "openCustomerSelection()"><button class = "primary_btn"> LOGIN </button> </a>
              </div>
          </div>

          <div class = "nav_icons_container">
              <i class="fa-solid fa-bars bars_icon pointer" onclick = "openNav()"></i>
              <i class="fa-solid fa-xmark close_icon pointer" onclick = "closeNav()"></i>
          </div>

          <div class = "d-flex column-gap-5 nav_links_container">
            <a class = "nav_links" href = "${root}/index.html"> Cattles </a>
            <a class = "nav_links" href = "${root}/pages/about.html"> About Us </a>
          </div>
          
          <div class = "nav_links_container"> <button class = "primary_btn" onclick = "openCustomerSelection()"> LOGIN </button> </div>

          <div class="overlay">
              <span class="closebtn" onclick="closeCustomerSelection()" title="close">×</span>
              <div class="overlay_content">
                  <div class="type_container">
                     <a href="${root}/pages/signIn.html?user=customer"> Customer </a>
                  </div>
                  <div class="type_container">
                     <a href="${root}/pages/signIn.html?user=rep"> Rep </a>
                  </div>
              </div>
          </div>
        </div>
    </header>`;

const afterLogin = `<header>
        <div class = "header_container">
          <div class = "d-flex align-items-center">
            <div class = "logo_container"> <a href = "${root}/index.html"> <img class = "logo" src = "${root}/assets/images/cattles/logo1.png" alt = "logo"> </a> </div>
            <a class = "primary_color" href = "${root}/index.html"> <h2> KowMart </h2> </a>
          </div>

          <div id = "mySidenav" class = "sidenav">
              <div class = "d-flex flex-column row-gap-3 ps-4 py-3">
                <a href = "${root}/index.html"> Cattles </a>
                <a href = "${root}/pages/about.html"> About Us </a>
                <a href = "${root}/pages/cattle/sell_details1.html"><button class = "primary_btn"> SELL </button> </a>
                <a href = "${root}/pages/buyer_profile.html"> <i class = "fa-regular fa-user primary_color" style = "font-size: 20px"> </i> </a>
                <a href = "${root}/pages/notification.html" class = "notification_nav"> Notification </a>
              </div>
          </div>

          <div class = "nav_icons_container">
              <i class="fa-solid fa-bars bars_icon pointer" onclick = "openNav()"></i>
              <i class="fa-solid fa-xmark close_icon pointer" onclick = "closeNav()"></i>
          </div>

          <div class = "d-flex column-gap-5 nav_links_container">
              <a class = "nav_links" href = "${root}/index.html"> Cattles </a>
              <a class = "nav_links notification_nav" href = "${root}/pages/notification.html"> Notification </a>
              <a class = "nav_links" href = "${root}/pages/about.html"> About Us </a>
          </div>

          <div class = "d-flex align-items-end column-gap-3 nav_links_container">
              <button class = "primary_btn"> SELL </button>
              <a href = ${root}/pages/buyer_profile.html> <i class = "fa-regular fa-user primary_color" style = "font-size: 20px"> </i> </a>
          </div> 
        </div>
    </header>`;

const userDetails = JSON.parse(localStorage.getItem("userData"));
const cattle_detail = JSON.parse(localStorage.getItem("cattleDetails")) || [];
const repDetail = JSON.parse(localStorage.getItem("rep_details"));
const phone_id = JSON.parse(localStorage.getItem("phoneNo_id"));
const rep_id = JSON.parse(localStorage.getItem("rep_id"));
const repCattleDetails =
  JSON.parse(localStorage.getItem("repCattleList")) || [];
const verifiedCattleLists =
  JSON.parse(localStorage.getItem("verifiedCattles")) || [];
const rejectedCattleLists =
  JSON.parse(localStorage.getItem("rejectedCattles")) || [];
const notificationList =
  JSON.parse(localStorage.getItem("notificationList")) || [];
const verificationDetails = JSON.parse(
  localStorage.getItem("verificationDetails")
);
const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

if (phone_id) {
  document.body.insertAdjacentHTML("afterbegin", afterLogin);

  const customerLogOutBtn = document.querySelector("#customerLogOut");
  customerLogOutBtn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout")) {
      localStorage.removeItem("phoneNo_id");
      document.body.innerHTML = beforeLogin;
      window.location.href = "../../index.html";
    }
  });

  if (notificationList) {
    const userNotificationList = notificationList.filter(
      (e) => e.receiver === phone_id
    );
    const newNote = userNotificationList.find((e) => e.status === false);

    if (newNote) {
      document.querySelector(".notification_nav").style.borderBottom =
        "2px solid #00a651";
    }
  }
} else if (rep_id) {
  document.body.insertAdjacentHTML("afterbegin", afterLogin);
  document.getElementById("sellBtn").style.display = "none";
  const repLogOutBtn = document.querySelector("#repLogOut");
  repLogOutBtn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout")) {
      localStorage.removeItem("rep_id");
      document.body.innerHTML = beforeLogin;
      window.location.href = "../../index.html";
    }
  });

  if (notificationList) {
    const repNotificationList = notificationList.filter(
      (e) => e.receiver === rep_id
    );
    const newNote = repNotificationList.find((e) => e.readStatus === false);

    if (newNote) {
      document.querySelector(".notification_nav").style.borderBottom =
        "2px solid #00a651";
    }
  }
} else {
  document.body.insertAdjacentHTML("afterbegin", beforeLogin);

  function openCustomerSelection() {
    document.querySelector(".overlay").classList.add("show_overlay");
  }

  function closeCustomerSelection() {
    document.querySelector(".overlay").classList.remove("show_overlay");
  }

  document.addEventListener("keydown", (event) => handleKeyDown(event));

  function handleKeyDown(event) {
    if (
      document.querySelector(".overlay").classList.contains("show_overlay") &&
      event.key === "Escape"
    ) {
      closeCustomerSelection();
    }
  }
}
