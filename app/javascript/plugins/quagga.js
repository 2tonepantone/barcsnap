import Quagga from '@ericblade/quagga2';

Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector('#barcode-scanner')
  },
  decoder: {
    readers: ['ean_reader', 'ean_8_reader']
  }
}, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log("Initialization finished. Ready to start");
  Quagga.start();

  Quagga.onDetected(function (data) {
    console.log(data.codeResult.code);
  });
});
