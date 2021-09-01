import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ['items','form'];

  connect() {
    console.log("test stimulus");
    console.log(this.itemsTarget);
    console.log(this.formTarget);
  }
  send(event) {
    console.log(this.itemsTarget);
    console.log(this.formTarget);
    event.preventDefault();
    console.log(this.formTarget.href);
    // fetch(this.formTarget.action)
      // .then()
  }
}
