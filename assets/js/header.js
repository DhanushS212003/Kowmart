const root = window.location.origin;

const beforeLogin = `<header>
        <div class = "header_container">
          <div class = "d-flex align-items-center">
              <div class = "logo_container"> <a href = "${root}/index.html"> <img class = "logo" src = "${root}/assets/images/cattles/logo1.png" alt = "logo"> </a> </div>
              <a class = "primary-color" href = "${root}/index.html"> <h2> KowMart </h2> </a>
          </div>

          <div id = "mySidenav" class = "sidenav">
              <a href = "javascript:void(0)" class = "closebtn" onclick = "closeNav()">&times;</a> 
              <ul class = "navbar">
                  <li> <a href = "${root}/index.html"> Cattles </a> </li>
                  <li> <a href = "${root}/pages/about.html"> About Us </a> </li>
                  <li class = "btn_con"> <a href = "${root}/pages/signIn.html"> <button class = "login"> LOGIN </button> </a> </li>
              </ul>
          </div> 

          <span class = "navBar" style = "font-size:30px;cursor:pointer" onclick = "openNav()"> &#9776; </span>

          <div class = "d-flex column-gap-5">
            <a class = "nav_links" href = "${root}/index.html"> Cattles </a>
            <a class = "nav_links" href = "${root}/pages/about.html"> About Us </a>
          </div>
          
          <div> <button class = "primary-btn" onclick = "openSearch()"> LOGIN </button> </div>

          <div id="myOverlay" class="overlay">
              <span class="closebtn" onclick="closeSearch()" title="Close Overlay">×</span>
              <div class="overlay-content">
                  <div class="user_container">
                      <h2> <a href="${root}/pages/signIn.html?user=customer"> Customer </a> </h2>
                  </div>
                  <div class="user_container">
                      <h2> <a href="${root}/pages/signIn.html?user=rep"> Rep </a> </h2>
                  </div>
              </div>
          </div>
        </div>
    </header>`;

const afterLogin = `<header>
        <div class = "header_container">
          <div class = "d-flex align-items-center">
            <div class = "logo_container"> <a href = "${root}/index.html"> <img class = "logo" src = "${root}/assets/images/cattles/logo1.png" alt = "logo"> </a> </div>
            <a class = "primary-color" href = "${root}/index.html"> <h2> KowMart </h2> </a>
          </div>

          <div id = "mySidenav" class = "sidenav">
              <a href = "javascript:void(0)" class = "closebtn" onclick = "closeNav()">&times;</a>
              <ul class = "navbar">
                  <li> <a href = "${root}/index.html"> Cattles </a> </li>
                  <li> <a href = "${root}/pages/about.html"> About Us </a> </li>
                  <li class = "btn_con"> <a href = "${root}/pages/cattle/sell_details1.html"><button class = "login" id = "sell"> SELL </button> </a> </li>
                  <li class = "profile_icon"> <a href = "${root}/pages/buyer_profile.html"> <i class = "fa-solid fa-user"> </i> </a> </li>
                  <li> <a href = "${root}/pages/notification.html" class = "notification_nav"> Notification </a> </li>
              </ul>
          </div>

          <span class = "navBar" style = "font-size:30px;cursor:pointer" onclick = "openNav()"> &#9776; </span>

          <div class = "d-flex column-gap-5">
              <a class = "nav_links" href = "${root}/index.html"> Cattles </a>
              <a class = "nav_links notification_nav" href = "${root}/pages/notification.html"> Notification </a>
              <a class = "nav_links" href = "${root}/pages/about.html"> About Us </a>
          </div>

          <div class = "d-flex align-items-end column-gap-3">
              <button class = "primary-btn"> SELL </button>
              <a href = ${root}/pages/buyer_profile.html> <i class = "fa-regular fa-user primary-color" style = "font-size: 20px"> </i> </a>
          </div> 
        </div>
    </header>`;

const userDetails = JSON.parse(localStorage.getItem("userData"));
const cattle_detail = JSON.parse(localStorage.getItem("cattle_details")) || [];
const repDetail = JSON.parse(localStorage.getItem("rep_details"));
const phone_id = JSON.parse(localStorage.getItem("phone_no_id"));
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
      localStorage.removeItem("phone_no_id");
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
  document.body.insertAdjacentHTML("afterbegin", afterLogin);

  function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
  }

  function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
  }
}
