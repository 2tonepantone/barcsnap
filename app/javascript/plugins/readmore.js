const readMore = () => {
  let readMoreElement = document.querySelector("#btn-read-more");
  if (readMoreElement != null) {
    readMoreElement.addEventListener("click", (event) => {
      document.querySelector(".more").classList.toggle("active");
      document.querySelector(".dots").classList.toggle("active");
      console.log(readMoreElement.classList);
      if (readMoreElement.classList.contains("toggle-read-more") == false) {
        console.log('Read More');
        readMoreElement.innerText = "Read more";
        readMoreElement.classList.add('toggle-read-more')
      } else {
        console.log('Read Less');
        readMoreElement.innerText = "Read less";
        readMoreElement.classList.remove('toggle-read-more')

      }
    });
  }
}

export { readMore };
