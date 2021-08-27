// This scanner scans and returns multiple barcodes at a time.
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
      const scanSettings = new ScanditSDK.ScanSettings({
        enabledSymbologies: ["ean8", "ean13", "upca", "upce"],
        // codeDuplicateFilter: 3000, // Minimum delay between duplicate results
        maxNumberOfCodesPerFrame: 3,
      });
      barcodePicker.applyScanSettings(scanSettings);
      const startScanner = document.getElementById("start-scanner");
      startScanner.addEventListener("click", (event) => {
        barcodePicker.accessCamera();
      });
      document.querySelectorAll(".stop-scanner").forEach((stopButton) => {
        stopButton.addEventListener("click", (event) => {
          barcodePicker.pauseScanning(true)
        });
      });
      barcodePicker.on("scan", (scanResult) => {
        let barcodes = scanResult.barcodes.map(barcode => barcode.data);
        console.log(barcodes);
        console.log(scanResult);
        // const input = document.getElementById('barcodeInput');
        // input.setAttribute('value', barcode);
        // document.getElementById('barcodeSubmit').click();
      });
    });
  });
}



// const initScanditSDK = () => {
//   ScanditSDK.configure("AelgfmP2Q/QqARqoCjtBkSsu6zcXPYf4bWyk7QUI+1CzX7wP7FMwArwsTKGIfFWCRHCcxgcNfk8OWtyhsWLDbj4BK8AGfNlBiBpWvnZsN2kvTdI0nG4yC0sH+75wCeBZdDR1iq8Y7xR+/Ob7EeB39dLgYbRgIcV2FO17/2knl+lxRSq+LdKwAaDhdKPn8/CXRpZiuwxJvmhOFlVO1zNxnVgoRFy6ifQbQNDbmIo8O+3ReKdEVld5qqdo0MqD2fC3nN93WGxRJHQOl1LmglKYLJ7ofITQtyS2nXLOsjPRkK/+xpYPQK33TWDHD9qzkkKhAjeVj0+MRT5y0FOp4g0thVBQ0RwiGGWVr5dGfFGvsYyUHYr+hPUwWL8HDlxmMrwVcVrPIIdXnnlTPICPkNAmd9WG8/gAGBCUNJCPpvgXCJJeGgJW/Yv96p7m21KpuInbvtSczQGzMJDUjNekPHv0N+zuO45aU5TNQI66wPpdXq8t6vs7S0tr8mDP8Hoe8SSgUDWphHj/+kP8E/WDOCMsZmKqkRuzrQa3JR7M6goUoCuyfCtQQKB83em5L5teMVcEvW9EduGEykfcpOW6uVl3OQKLf3fEikFlayV6Cs7sRVwoDYUxtreq1aEcRBWJ5088AzBpCTNWdBBFNreGlInw+6Hl8OWk8sGfgxOPaGIPWmdOqBIN/ca+/Jvf+xLPaH2sm28/Fg6trwOZSyUxlFBm0ZrZjlSBzRCqWZGlpJew+JNIDlg0hk+v5aid/NrWfy7aM++XDqCXWk69k+uNZFa9A7li46x6iNa2UqA49T+SJ+OxkcloYnbGUg==", {
//     engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
//   })
//     .then(() => {
//       return ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
//         // playSoundOnScan: false,
//         // vibrateOnScan: true,
//         // enable some common barcode symbologies
//         scanSettings: new ScanditSDK.ScanSettings({ enabledSymbologies: ["ean8", "ean13", "upca", "upce"] }),
//       });
//     })
//     .then((barcodePicker) => {
//       // barcodePicker is ready here, show a message every time a barcode is scanned
//       barcodePicker.on("scan", (scanResult) => {
//         let barcode = scanResult.barcodes[0].data;
//         const input = document.getElementById('barcodeInput');
//         input.setAttribute('value', barcode)
//         document.getElementById('barcodeSubmit').click()
//       });
//     });
// }

export { initScanditSDK };
