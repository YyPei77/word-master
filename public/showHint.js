// INSERT JS HERE

// SOCIAL PANEL JS
document.addEventListener("DOMContentLoaded", function(event) {
  const floating_btn_right = document.querySelector(".floating-btn-right");

  const close_btn_right = document.querySelector(".close-btn-right");
  const social_panel_container_right = document.querySelector(
    ".social-panel-container-right"
  );
  console.log(document.querySelector(".floating-btn"));

  floating_btn_right.addEventListener("click", () => {
    social_panel_container_right.classList.toggle("visible");
  });

  close_btn_right.addEventListener("click", () => {
    social_panel_container_right.classList.remove("visible");
  });
});
