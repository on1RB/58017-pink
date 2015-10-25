(function() {
  if (!("FormData" in window) || !("FileReader" in window)) {
    return;
  }

  var DAY_VALUE = "10 дней";
  var DAY_MIN = 1;
  var DAY_MAX = 30;
  var PEOPLE_VALUE = "2 чел";
  var PEOPLE_MIN = 1;
  var PEOPLE_MAX = 10;

  var form = document.querySelector(".main-form");
  if (!form) {
    return;
  }
  var area = form.querySelector(".main-form__photos-list");
  var template = document.querySelector("#image-template").innerHTML;
  var queue = [];

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var data = new FormData(form);

    request(data, function (response) {
      console.log(response);
    });
  });

  function request(data, fn) {
    var xhr = new XMLHttpRequest();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + (new Date()).getTime());
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });

    xhr.send(data);
  }

  form.querySelector("#upload_photo").addEventListener("change", function() {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
      preview(files[i]);
    }
    this.value = "";
  });

  function preview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function(event) {
      var html = Mustache.render(template, {
        "image": event.target.result,
        "name": file.name
      });

      var li = document.createElement("li");
      li.classList.add("main-form__photos-list-item");
      li.innerHTML = html;
      area.appendChild(li);

      li.querySelector(".main-form__photo-remove-link").addEventListener("click", function(event) {
        event.preventDefault();
        removePreview(li);
      });

      queue.push({
        "file": file,
        "li": li
      });
    });

    reader.readAsDataURL(file);
  }

    function removePreview(li) {
      queue = queue.filter(function(element) {
        return element.li !=li;
      });

      li.parentNode.removeChild(li);
    }

  var day = document.getElementById("countTravelDays");

  day.value = DAY_VALUE;
  day.min = DAY_MIN;
  day.max = DAY_MAX;
  day.setAttribute("data-min", DAY_MIN);
  day.setAttribute("data-max", DAY_MAX);
  day.setAttribute("data-endline", " дней");

  day.addEventListener("change", function(event) {
    event.preventDefault();

    day.value = validateValue(day);
  });

  var people = document.getElementById("countTravelers");

  people.value = PEOPLE_VALUE;
  people.setAttribute("data-min", PEOPLE_MIN);
  people.setAttribute("data-max", PEOPLE_MAX);
  people.setAttribute("data-endline", " чел");

  people.addEventListener("change", function(event) {
    event.preventDefault();

    people.value = validateValue(people);

  });

  function validateValue(input) {
    if (isNaN(input.value)) {
      return 1 + input.dataset.endline;
    }
    return Math.min(Math.max(parseInt(input.value), +input.dataset.min), +input.dataset.max) + input.dataset.endline;
  }

  var elements = document.querySelectorAll(".field-text--counter");

  for (var i = 0; i < elements.length; i++) {
    initNumberFiled(elements[i]);
  }

  function initNumberFiled(parent) {
    var input = parent.querySelector("input");
    var minus = parent.querySelector(".field-text__minus");
    var plus = parent.querySelector(".field-text__plus");

    minus.addEventListener("click", function() {
      changeNumber(false, input);
    });

    plus.addEventListener("click", function() {
      changeNumber(true, input);
    });
  }

  function changeNumber(operation, input) {
    var value = parseInt(input.value);
    if (isNaN(value)) {
      value = 0;
    }
    if (operation) {
      input.value = parseInt(input.value) + 1;
    } else {
      input.value = parseInt(input.value) - 1;
    }
    input.value = validateValue(input);
  }
})();