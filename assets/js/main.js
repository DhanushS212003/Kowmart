function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
  document.querySelector("i.bars_icon").style.display = "none";
  document.querySelector("i.close_icon").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector("i.close_icon").style.display = "none";
  document.querySelector("i.bars_icon").style.display = "block";
}

let bannerIndex = "0";
let bannerLastIndex = "";

function moveBanners(banners) {
  bannerLastIndex = banners.length - 1 + "";

  setBanner("0");

  document.querySelectorAll(".banner_dots").forEach((each) => {
    each.addEventListener("click", (event) => {
      setBanner(each.id);
    });
  });
}

function setBanner(index) {
  bannerIndex = index + "";

  document.querySelectorAll(".banner_slide").forEach((slide, i) => {
    slide.style.transform = `translateX(-${index * 100}%)`;
    slide.style.backgroundImage = `url(${banners[i]})`;
  });

  document.querySelectorAll(".banner_dots").forEach((dot, i) => {
    dot.classList.toggle("active_dot", i == index);
  });
}

function movePreviousBanner() {
  bannerIndex == 0
    ? setBanner(bannerLastIndex)
    : setBanner(parseInt(bannerIndex) - 1);
}

function moveNextBanner() {
  bannerIndex == bannerLastIndex
    ? setBanner("0")
    : setBanner(parseInt(bannerIndex) + 1);
}
