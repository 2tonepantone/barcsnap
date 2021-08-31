const footer = () => {
  document.querySelector(".item-drawer-button")
    .addEventListener("click", (event) => {
      document.querySelector(".item-drawer").classList.toggle("active");
      document.querySelector(".hidding1").classList.toggle("active")
      document.querySelector(".hidding2").classList.toggle("active")
      document.querySelector(".hidding3").classList.toggle("active")
      document.querySelector(".show-chevron").classList.toggle("active")

    });
};

export {footer};
