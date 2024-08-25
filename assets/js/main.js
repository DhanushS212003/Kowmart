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
