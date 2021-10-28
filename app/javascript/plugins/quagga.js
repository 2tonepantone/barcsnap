import Quagga from '@ericblade/quagga2';

Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector('#barcode-scanner')
  },
  decoder: {
    readers: ['ean_reader']
  }
}, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log("Initialization finished. Ready to start");
  Quagga.start();

  let codes = [];
  Quagga.onDetected(function (data) {
    codes.push(data.codeResult.code);
    console.log(codes.length);
    if (codes.length >= 8) {
      const barcode = mostFrequent(codes, codes.length);
      console.log(barcode);
      codes = [];
    }
  });
});

function mostFrequent(arr, n) {
  // Sort the array
  arr.sort();

  // find the max frequency using linear
  // traversal
  let max_count = 1, res = arr[0];
  let curr_count = 1;

  for (let i = 1; i < n; i++) {
    if (arr[i] == arr[i - 1])
      curr_count++;
    else {
      if (curr_count > max_count) {
        max_count = curr_count;
        res = arr[i - 1];
      }
      curr_count = 1;
    }
  }

  // If last element is most frequent
  if (curr_count > max_count) {
    max_count = curr_count;
    res = arr[n - 1];
  }
  return res;
}
