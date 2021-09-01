const readMore = () => {
  let readMoreElement = document.querySelector("#btn-read-more");
  if (readMoreElement != null) {
    readMoreElement.addEventListener("click", (event) => {
      document.querySelector(".more").classList.toggle("active");
      document.querySelector(".dots").classList.toggle("active");
      if (readMoreElement.classList.contains("toggle-read-more") == false) {
        readMoreElement.innerText = "Read more";
        readMoreElement.classList.add('toggle-read-more')
      } else {
        readMoreElement.innerText = "Read less";
        readMoreElement.classList.remove('toggle-read-more')

      }
    });
  }
}

export { readMore };
