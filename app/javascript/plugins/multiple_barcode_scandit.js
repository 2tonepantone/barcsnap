// // This scanner scans and returns multiple barcodes at a time.
// import * as ScanditSDK from "scandit-sdk";
// import { SingleImageModeSettings } from "scandit-sdk";

// const initScanditSDKMultiple = () => {
//   ScanditSDK.configure("AelgfmP2Q/QqARqoCjtBkSsu6zcXPYf4bWyk7QUI+1CzX7wP7FMwArwsTKGIfFWCRHCcxgcNfk8OWtyhsWLDbj4BK8AGfNlBiBpWvnZsN2kvTdI0nG4yC0sH+75wCeBZdDR1iq8Y7xR+/Ob7EeB39dLgYbRgIcV2FO17/2knl+lxRSq+LdKwAaDhdKPn8/CXRpZiuwxJvmhOFlVO1zNxnVgoRFy6ifQbQNDbmIo8O+3ReKdEVld5qqdo0MqD2fC3nN93WGxRJHQOl1LmglKYLJ7ofITQtyS2nXLOsjPRkK/+xpYPQK33TWDHD9qzkkKhAjeVj0+MRT5y0FOp4g0thVBQ0RwiGGWVr5dGfFGvsYyUHYr+hPUwWL8HDlxmMrwVcVrPIIdXnnlTPICPkNAmd9WG8/gAGBCUNJCPpvgXCJJeGgJW/Yv96p7m21KpuInbvtSczQGzMJDUjNekPHv0N+zuO45aU5TNQI66wPpdXq8t6vs7S0tr8mDP8Hoe8SSgUDWphHj/+kP8E/WDOCMsZmKqkRuzrQa3JR7M6goUoCuyfCtQQKB83em5L5teMVcEvW9EduGEykfcpOW6uVl3OQKLf3fEikFlayV6Cs7sRVwoDYUxtreq1aEcRBWJ5088AzBpCTNWdBBFNreGlInw+6Hl8OWk8sGfgxOPaGIPWmdOqBIN/ca+/Jvf+xLPaH2sm28/Fg6trwOZSyUxlFBm0ZrZjlSBzRCqWZGlpJew+JNIDlg0hk+v5aid/NrWfy7aM++XDqCXWk69k+uNZFa9A7li46x6iNa2UqA49T+SJ+OxkcloYnbGUg==", {
//     engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
//   }).then(() => {
//     ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
//       accessCamera: false,
//       playSoundOnScan: false,
//       vibrateOnScan: true,
//       singleImageModeSettings: {
//         desktop: { usageStrategy: SingleImageModeSettings.UsageStrategy.ALWAYS },
//         mobile: { usageStrategy: SingleImageModeSettings.UsageStrategy.ALWAYS }
//       }
//     }).then(function (barcodePicker) {
//       const scanSettings = new ScanditSDK.ScanSettings({
//         enabledSymbologies: ["ean8", "ean13", "upca", "upce"],
//         // codeDuplicateFilter: 3000, // Minimum delay between allowing the same barcodes
//         maxNumberOfCodesPerFrame: 2,
//       });
//       // Hide scandit video element that white space below the sticky footer
//       document.querySelector(".scandit-video").classList.add("d-none");
//       // Check for navbar footer elements
//       if (document.querySelector('.scanner-new') && document.querySelector('.barcode-compare')) {
//         // Set "compare" value false when clicking "scan" button
//         document.querySelector('.scanner-new').addEventListener("click", () => {
//           document.getElementById("barcodeMultiple").setAttribute('value', false);
//         });
//         // Set "compare" value to true when clicking "compare" button
//         document.querySelector('.barcode-multiple').addEventListener("click", () => {
//           document.getElementById("barcodeMultiple").setAttribute('value', true);
//         });
//       }
//       // Close barcode scanner modal to pause scanning and camera access
//       document.querySelectorAll(".scanner-pause").forEach((pauseButton) => {
//         pauseButton.addEventListener("click", () => {
//           document.querySelector(".scandit-video").classList.add("d-none");
//           barcodePicker.pauseScanning(true);
//         });
//       });
//       // Click "Scan a barcode", "scan", "compare" buttons to start barcode scanner
//       barcodePicker.applyScanSettings(scanSettings);
//       document.querySelectorAll(".scanner-multiple-start").forEach((startButton) => {
//         startButton.addEventListener("click", () => {
//           document.querySelector(".scandit-video").classList.remove("d-none");
//           barcodePicker.accessCamera();
//           barcodePicker.resumeScanning();
//         });
//       });
//       // Send scanned barcode to hidden form and automatically submit it
//       barcodePicker.on("scan", (scanResult) => {
//         let barcodes = scanResult.barcodes.map(barcode => barcode.data);
//         console.log(barcodes);
//         console.log(scanResult);
//         // const input = document.getElementById('barcodeInput');
//         // input.setAttribute('value', barcode);
//         // document.getElementById('barcodeSubmit').click();
//       });
//     });
//   });
// }

// export { initScanditSDKMultiple };

// // This scanner scans and returns multiple barcodes at a time.
// // import * as ScanditSDK from "scandit-sdk";
// // import { SingleImageModeSettings } from "scandit-sdk";

// // const initScanditSDK = () => {
// //   ScanditSDK.configure("AelgfmP2Q/QqARqoCjtBkSsu6zcXPYf4bWyk7QUI+1CzX7wP7FMwArwsTKGIfFWCRHCcxgcNfk8OWtyhsWLDbj4BK8AGfNlBiBpWvnZsN2kvTdI0nG4yC0sH+75wCeBZdDR1iq8Y7xR+/Ob7EeB39dLgYbRgIcV2FO17/2knl+lxRSq+LdKwAaDhdKPn8/CXRpZiuwxJvmhOFlVO1zNxnVgoRFy6ifQbQNDbmIo8O+3ReKdEVld5qqdo0MqD2fC3nN93WGxRJHQOl1LmglKYLJ7ofITQtyS2nXLOsjPRkK/+xpYPQK33TWDHD9qzkkKhAjeVj0+MRT5y0FOp4g0thVBQ0RwiGGWVr5dGfFGvsYyUHYr+hPUwWL8HDlxmMrwVcVrPIIdXnnlTPICPkNAmd9WG8/gAGBCUNJCPpvgXCJJeGgJW/Yv96p7m21KpuInbvtSczQGzMJDUjNekPHv0N+zuO45aU5TNQI66wPpdXq8t6vs7S0tr8mDP8Hoe8SSgUDWphHj/+kP8E/WDOCMsZmKqkRuzrQa3JR7M6goUoCuyfCtQQKB83em5L5teMVcEvW9EduGEykfcpOW6uVl3OQKLf3fEikFlayV6Cs7sRVwoDYUxtreq1aEcRBWJ5088AzBpCTNWdBBFNreGlInw+6Hl8OWk8sGfgxOPaGIPWmdOqBIN/ca+/Jvf+xLPaH2sm28/Fg6trwOZSyUxlFBm0ZrZjlSBzRCqWZGlpJew+JNIDlg0hk+v5aid/NrWfy7aM++XDqCXWk69k+uNZFa9A7li46x6iNa2UqA49T+SJ+OxkcloYnbGUg==", {
// //     engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
// //   }).then(() => {
// //     ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
// //       accessCamera: false,
// //       playSoundOnScan: false,
// //       vibrateOnScan: true,
// //       singleImageModeSettings: {
// //         desktop: { usageStrategy: SingleImageModeSettings.UsageStrategy.ALWAYS },
// //         mobile: { usageStrategy: SingleImageModeSettings.UsageStrategy.FALLBACK }
// //       }
// //     }).then(function (barcodePicker) {
// //       const scanSettings = new ScanditSDK.ScanSettings({
// //         enabledSymbologies: ["ean8", "ean13", "upca", "upce"],
// //         // codeDuplicateFilter: 3000, // Minimum delay between duplicate results
// //         maxNumberOfCodesPerFrame: 2,
// //       });
// //       document.querySelectorAll(".stop-scanner").forEach((stopButton) => {
// //         stopButton.addEventListener("click", (event) => {
// //           barcodePicker.pauseScanning(true)
// //         });
// //       });
// //       barcodePicker.applyScanSettings(scanSettings);
// //       const startScanner = document.getElementById("start-scanner");
// //       startScanner.addEventListener("click", (event) => {
// //         barcodePicker.accessCamera();
// //       });
// //       barcodePicker.on("scan", (scanResult) => {
// //         let barcodes = scanResult.barcodes.map(barcode => barcode.data);
// //         console.log(barcodes);
// //         console.log(scanResult);
// //         // const input = document.getElementById('barcodeInput');
// //         // input.setAttribute('value', barcode);
// //         // document.getElementById('barcodeSubmit').click();
// //       });
// //     });
// //   });
// // }

// // export { initScanditSDK };
