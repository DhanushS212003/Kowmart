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
                <a href="${root}/pages/login.html?user=customer">
                  <div class="type_container"> Customer </div>
                </a>
                <a href="${root}/pages/login.html?user=rep">
                  <div class="type_container"> Rep </div>
                </a>
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
                <a href = "${root}/pages/cattle/sellDetails1.html"><button class = "primary_btn sell_btn"> SELL </button> </a>
                <a href = "${root}/pages/profile.html"> <i class = "fa-regular fa-user primary_color" style = "font-size: 20px"> </i> </a>
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

          <div class = "d-flex align-items-center column-gap-3 nav_links_container">
              <a href = ${root}/pages/cattle/sellDetails1.html> <button class = "primary_btn sell_btn"> SELL </button> </a>
              <a href = ${root}/pages/profile.html> <i class = "fa-regular fa-user primary_color mt-1" style = "font-size: 20px"> </i> </a>
          </div> 
        </div>
    </header>`;

const USER_LIST = JSON.parse(localStorage.getItem("userData")) || [];
const CATTLE_LIST = JSON.parse(localStorage.getItem("cattleDetails")) || [];
const REP_LIST = JSON.parse(localStorage.getItem("repData")) || [];
const PHONE = JSON.parse(localStorage.getItem("phone"));
const REP_ID = JSON.parse(localStorage.getItem("repId"));
const REP_CATTLE_LIST = JSON.parse(localStorage.getItem("repCattleList")) || [];
const VERIFIED_CATTLE_LIST =
  JSON.parse(localStorage.getItem("verifiedCattles")) || [];
const REJECTED_CATTLE_LIST =
  JSON.parse(localStorage.getItem("rejectedCattles")) || [];
const NOTIFICATION_LIST =
  JSON.parse(localStorage.getItem("notificationList")) || [];
const VERIFICATIONS_CHECK = [];
const FAVOURITES = JSON.parse(localStorage.getItem("favourites")) || [];

if (PHONE || REP_ID) {
  document.body.insertAdjacentHTML("afterbegin", afterLogin);

  if (REP_ID)
    document
      .querySelectorAll(".sell_btn")
      .forEach((e) => (e.style.display = "none"));

  if (NOTIFICATION_LIST) {
    const list = NOTIFICATION_LIST.filter((e) =>
      e.receiver === PHONE ? PHONE : REP_ID
    );
    const newNote = list.find((e) => e.readStatus === false);

    if (newNote)
      document.querySelector(".notification_nav").style.borderBottom =
        "2px solid #00a651";
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
