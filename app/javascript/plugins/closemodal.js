const closeModal = () => {
  let bodyClasses = document.querySelector('body').classList;
  if(bodyClasses.contains('modal-open'))
  {
    bodyClasses.remove('modal-open');
  }
  
  let modBdClasses = document.querySelector('.modal-backdrop.fade.show');
  if(modBdClasses != null && modBdClasses.classList != null) {
    modBdClasses.classList.remove('modal-backdrop');
    modBdClasses.classList.remove('fade');
    modBdClasses.classList.remove('show');
  }
  
  let modFsElement = document.querySelector('.modal.fade.show');
  if(modFsElement != null && modFsElement.classList != null) {
    let modFsClasses = modFsElement.classList;
    modFsElement.attributes.removeNamedItem('aria-modal');
    modFsElement.attributes.removeNamedItem('role');
    modFsElement.style = "display:none;";
    modFsElement.attributes["aria-hidden"] = true;
    modFsClasses.remove('show');
  }
}

export { closeModal };