(function() {

  var list = document.querySelector(".page-nav__list");
  var toggler = document.getElementById("toggler");
  toggler.onclick = function(e){
    e.preventDefault();
    toggler.classList.toggle("toggler--close");
    list.classList.toggle("page-nav__list--hide-block");
  }

})();