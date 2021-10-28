Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
  },
  decoder: {
    readers: ["ean_reader", "ean_8_reader"]
  }
}, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log("Initialization finished. Ready to start");
  Quagga.start();
});
