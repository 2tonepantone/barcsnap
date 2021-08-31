const closeModal = () => {
  let bodyClasses = document.querySelector('body').classList;
  if(bodyClasses.contains('modal-open'))
  {
    bodyClasses.remove('modal-open');
    console.log(document.querySelector('body').classList);
    console.log('bodyClasses');
    console.log(bodyClasses);
  }
  
  let modBdClasses = document.querySelector('.modal-backdrop.fade.show');
  if(modBdClasses != null && modBdClasses.classList != null) {
    modBdClasses.classList.remove('modal-backdrop');
    modBdClasses.classList.remove('fade');
    modBdClasses.classList.remove('show');
    console.log('modBdClasses');
    console.log(modBdClasses);
  }
  
  let modFsElement = document.querySelector('.modal.fade.show');
  if(modFsElement != null && modFsElement.classList != null) {
    let modFsClasses = modFsElement.classList;
    console.log(modFsElement)
    modFsElement.attributes.removeNamedItem('aria-modal');
    modFsElement.attributes.removeNamedItem('role');
    modFsElement.style = "display:none;";
    modFsElement.attributes["aria-hidden"] = true;
    modFsClasses.remove('show');
    console.log('modFsElement');
    console.log(modFsElement);
    console.log(modFsElement.style);
    console.log(modFsClasses);
  }
}

export { closeModal };