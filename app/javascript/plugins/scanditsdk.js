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
      const scanSettings = new ScanditSDK.ScanSettings({
        enabledSymbologies: ["ean8", "ean13", "upca", "upce"],
        // codeDuplicateFilter: 3000,
        maxNumberOfCodesPerFrame: 2,
      });
      // Apply scan settings described above
      barcodePicker.applyScanSettings(scanSettings);
      // Hide scandit video element that white space below the sticky footer
      if (document.querySelector(".scandit-video")) {
        document.querySelector(".scandit-video").classList.add("d-none");
      };
      // Select sticky footer navbar elements
      const scannerNewButton = document.querySelector('.scanner-new');
      const barcodeCompareButton = document.querySelector('.barcode-compare');
      const barcodeMultipleButton = document.querySelector('.barcode-multiple');
      // Select scanner form fields (barcode_scanner.html.erb)
      const multipleField = document.getElementById("multiple-field")
      // Set "compare" and "multiple" value to "false" when clicking "scan" button
      scannerNewButton.addEventListener("click", () => {
        document.getElementById("compare-field").setAttribute('value', false);
        document.getElementById("multiple-field").setAttribute('value', false);
      });
      // Set "compare" value to "true" when clicking "scan & compare" button (and "multiple" to "false")
      barcodeCompareButton.addEventListener("click", () => {
        document.getElementById("compare-field").setAttribute('value', true);
        document.getElementById("multiple-field").setAttribute('value', false);
      });
      // Set "multiple" value to "true" when clicking "multiple" button (and "compare" to "false")
      barcodeMultipleButton.addEventListener("click", () => {
        document.getElementById("multiple-field").setAttribute('value', true);
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
      // Click "scan & compare", "scan", "scan multiple" buttons to start barcode scanner
      document.querySelectorAll(".scanner-start").forEach((startButton) => {
        startButton.addEventListener("click", () => {
          if (document.querySelector(".scandit-video")) {
            document.querySelector(".scandit-video").classList.remove("d-none");
          };
          barcodePicker.accessCamera();
          barcodePicker.resumeScanning();
        });
      });
      // Send scanned barcode to hidden form and automatically submit it
      barcodePicker.on("scan", (scanResult) => {
        let barcodes = scanResult.barcodes.map(barcode => barcode.data);
        const barcodeField = document.getElementById('barcode-field');
        barcodeField.setAttribute('value', barcodes);
        // I
        if (multipleField.value == 'true' && barcodes.length == 2) {
          document.getElementById('barcodeSubmit').click();
        } else if (multipleField.value == 'false' && barcodes.length == 1) {
          document.getElementById('barcodeSubmit').click();
        }
      });
    });
  });
}

export { initScanditSDK };
