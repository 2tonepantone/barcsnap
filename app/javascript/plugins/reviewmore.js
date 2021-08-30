const reviewMore = () => {
  document.querySelector(".toggling")
    .addEventListener("click", (event) => {
      document.querySelector(".toggling2").classList.toggle("active");
      document.querySelector(".toggling3").classList.toggle("active");
    });
  document.querySelector(".toggling4")
    .addEventListener("click", (event) => {
      document.querySelector(".toggling2").classList.toggle("active");
      document.querySelector(".toggling3").classList.toggle("active");
    });
};

export { reviewMore };
