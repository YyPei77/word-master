document.addEventListener("DOMContentLoaded", function(event) {
  var input = document.getElementById("test");
  console.log("test!!!!!!@@@@@@@@@");
  input.addEventListener("keyup", function(event1) {
    if (event1.keyCode === 13) {
      event1.preventDefault();
      console.log(document);
      console.log(document.getElementById("inputButton"));
      document.getElementById("inputButton").click();
    }
  });
});
