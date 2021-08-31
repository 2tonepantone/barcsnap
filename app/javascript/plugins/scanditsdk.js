// This scanner scans and returns one barcode at a time.
import * as ScanditSDK from "scandit-sdk";
import { SingleImageModeSettings } from "scandit-sdk";

const initScanditSDK = () => {
  ScanditSDK.configure("AelgfmP2Q/QqARqoCjtBkSsu6zcXPYf4bWyk7QUI+1CzX7wP7FMwArwsTKGIfFWCRHCcxgcNfk8OWtyhsWLDbj4BK8AGfNlBiBpWvnZsN2kvTdI0nG4yC0sH+75wCeBZdDR1iq8Y7xR+/Ob7EeB39dLgYbRgIcV2FO17/2knl+lxRSq+LdKwAaDhdKPn8/CXRpZiuwxJvmhOFlVO1zNxnVgoRFy6ifQbQNDbmIo8O+3ReKdEVld5qqdo0MqD2fC3nN93WGxRJHQOl1LmglKYLJ7ofITQtyS2nXLOsjPRkK/+xpYPQK33TWDHD9qzkkKhAjeVj0+MRT5y0FOp4g0thVBQ0RwiGGWVr5dGfFGvsYyUHYr+hPUwWL8HDlxmMrwVcVrPIIdXnnlTPICPkNAmd9WG8/gAGBCUNJCPpvgXCJJeGgJW/Yv96p7m21KpuInbvtSczQGzMJDUjNekPHv0N+zuO45aU5TNQI66wPpdXq8t6vs7S0tr8mDP8Hoe8SSgUDWphHj/+kP8E/WDOCMsZmKqkRuzrQa3JR7M6goUoCuyfCtQQKB83em5L5teMVcEvW9EduGEykfcpOW6uVl3OQKLf3fEikFlayV6Cs7sRVwoDYUxtreq1aEcRBWJ5088AzBpCTNWdBBFNreGlInw+6Hl8OWk8sGfgxOPaGIPWmdOqBIN/ca+/Jvf+xLPaH2sm28/Fg6trwOZSyUxlFBm0ZrZjlSBzRCqWZGlpJew+JNIDlg0hk+v5aid/NrWfy7aM++XDqCXWk69k+uNZFa9A7li46x6iNa2UqA49T+SJ+OxkcloYnbGUg==", {
    engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
  }).then(() => {
    ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
      accessCamera: false,
      playSoundOnScan: false,
      vibrateOnScan: true,
      singleImageModeSettings: {
        desktop: { usageStrategy: SingleImageModeSettings.UsageStrategy.ALWAYS },
        mobile: { usageStrategy: SingleImageModeSettings.UsageStrategy.FALLBACK }
      }
    }).then(function (barcodePicker) {
      let scanSettings = new ScanditSDK.ScanSettings({
        enabledSymbologies: ["ean8", "ean13", "upca", "upce"],
        // codeDuplicateFilter: 3000,
        maxNumberOfCodesPerFrame: 2,
      });
      // Hide scandit video element that white space below the sticky footer
      document.querySelector(".scandit-video").classList.add("d-none");
      // Select sticky footer navbar elements
      const scannerNew = document.querySelector('.scanner-new');
      const barcodeCompare = document.querySelector('.barcode-compare');
      const barcodeMultiple = document.querySelector('.barcode-multiple');

      // Set "compare" and "multiple" value to false when clicking "scan" button
      scannerNew.addEventListener("click", () => {
        document.getElementById("barcodeCompare").setAttribute('value', false);
        document.getElementById("barcodeMultiple").setAttribute('value', false);
      });
      // Set "compare" value to true when clicking "compare" button (and "multiple" to false)
      barcodeCompare.addEventListener("click", () => {
        document.getElementById("barcodeCompare").setAttribute('value', true);
        document.getElementById("barcodeMultiple").setAttribute('value', false);
      });
      // Set "multiple" value to true when clicking "multiple" button (and "compare" to false)
      barcodeMultiple.addEventListener("click", () => {
        document.getElementById("barcodeMultiple").setAttribute('value', true);
        scanSettings = new ScanditSDK.ScanSettings({
          enabledSymbologies: ["ean8", "ean13", "upca", "upce"],
          maxNumberOfCodesPerFrame: 2
        });
      });
      // Close barcode scanner modal to pause scanning and camera access
      document.querySelectorAll(".scanner-pause").forEach((pauseButton) => {
        pauseButton.addEventListener("click", () => {
          document.querySelector(".scandit-video").classList.add("d-none");
          barcodePicker.pauseScanning(true);
        });
      });
      // Click "Scan a barcode", "scan", "compare" buttons to start barcode scanner
      document.querySelectorAll(".scanner-start").forEach((startButton) => {
        startButton.addEventListener("click", () => {
          document.querySelector(".scandit-video").classList.remove("d-none");
          barcodePicker.accessCamera();
          barcodePicker.resumeScanning();
        });
      });
      // if (scanMultiple == false) {
      //   console.log(scanMultiple);
      //   console.log("hello!")
      //     scanSettings = new ScanditSDK.ScanSettings({
      //     enabledSymbologies: ["ean8", "ean13", "upca", "upce"],
      //     maxNumberOfCodesPerFrame: 2,
      //   });
      // }
      console.log("hello! above applyscansettings");
      console.log(scanSettings);
      barcodePicker.applyScanSettings(scanSettings); // need to appyScanSettings for each type of scan?
      // Send scanned barcode to hidden form and automatically submit it
      barcodePicker.on("scan", (scanResult) => {
          let barcodes = scanResult.barcodes.map(barcode => barcode.data);
          if (barcodes.length == 2) {
            console.log(barcodes)
          }
          // console.log(scanResult);
            // console.log(barcodes);
        //  else {
        //   let barcodes = scanResult.barcodes[0].data;
        // console.log(scanResult);
        // const input = document.getElementById('barcodeInput');
        // input.setAttribute('value', barcode);
        // document.getElementById('barcodeSubmit').click();
      });
    });
  });
}

export { initScanditSDK };
