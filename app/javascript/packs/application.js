// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
import "controllers"
import { initScanditSDK } from "../plugins/scanditsdk"
import { readMore } from "../plugins/readmore"
import { closeModal } from "../plugins/closemodal"
import { reviewMore } from "../plugins/reviewmore"
import gtag from "../src/analytics"
import { initQuagga } from "../plugins/quagga"

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
  initScanditSDK();
  initQuagga();
  readMore();
  reviewMore();
  closeModal();
});
