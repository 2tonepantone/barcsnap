const reviewMore = () => {
  let reviewMoreElement = document.querySelector("#btn-show-reviews");
  if (reviewMoreElement != null) {
    reviewMoreElement
    .addEventListener("click", (event) => {
      document.querySelector(".toggling2").classList.toggle("active");
      document.querySelector(".toggling3").classList.toggle("active");
    });
  }
  let reviewLessElement = document.querySelector("#btn-hide-reviews");
  if (reviewLessElement != null) {
    reviewLessElement
    .addEventListener("click", (event) => {
      document.querySelector(".toggling2").classList.toggle("active");
      document.querySelector(".toggling3").classList.toggle("active");
    });
  }
};

export { reviewMore };
