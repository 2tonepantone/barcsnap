const readMore = () => {
  document.querySelector(".read-more")
    .addEventListener("click", (event) => {
      document.querySelector(".more").classList.toggle("active");
      document.querySelector(".dots").classList.toggle("active");
      if (document.querySelector(".read-more").innerHTML === 'Read more') {
        document.querySelector(".read-more").innerHTML = "Read less";
      } else {
        document.querySelector(".read-more").innerHTML = "Read more";
      }
    });
}

export { readMore };
