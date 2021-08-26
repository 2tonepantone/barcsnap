import * as ScanditSDK from "scandit-sdk";

const initScanditSDK = () => {
  ScanditSDK.configure("AZ2gXA72LkgGCmYs2x1QrzEMQWGoPfhngHkZJslQJ0DHb8jNHlaigvwarJZ4QiNkfH6VKVZJak8JVFuydU0MYr9YbCjyZCWQYmdLIaE26z92FRYOgxFjfN4CzvQpIomPLFvq9VbonxJjwCRmejq8xl/MxbetYGqQ6TuoosW36C5mpWDhMx3GpFJYahn6ikCUsxmklVoHlWSB9m0VnFwFE3mQ+RiKoNQbqYf2MkTO1wY7hhaLuxv8hD/XL+Qgfug6qx5KS3SiYNZDerI7o1e6oRdPi5CKOfA8Rn1rvu1HSyL53GYFaMtPsrHPUXt74QhvqUhD6OBWaH3F6HRYvGWIBnDh0JIk2b+Z0RqIynpGI9Y+ZB1NBQkT6HEGpnTQoHsUoJNixpoT35fvzsoJlQYUiSIKG2Tm4fBeYVpu7k5C+KAWSH2KblMHL5iGY4Z9qZ0y5TWzXOEG1UBQwcAmVsbQZt8uLJghIEra7Z9CrTl03SjT/Ujs9N0TVBzyqkCmbdb9MWciGH1Bu5YIkCc7qOlHmq3RU74Kt3r3IOo+gxFKBjYgc7jDphaYJqO1WAvoZ+Ma5KZCRCrjFef8tsgahN+AsWBVnnlVRYKvsDgSbLj7BEAkTa6vk5eJJw7fl4BiBTnOg54Kq4uhy5oh7qOummZ0VUipsB/Jt3eavjF/disj3K1tkRDh/qqGPNvTPmx4kmqQnd7AD/9N8u8COdKOrkcCYEJ+5CZkapeF5iT2JmziZ+4xKLsaAdNP2aNe0eMNjhkHPAML9quPyuoCxQxftwYN+mqHnBkV9D7pvKiFJwAZsw==", {
    engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
  })
    .then(() => {
      return ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
        // enable some common barcode symbologies
        scanSettings: new ScanditSDK.ScanSettings({ enabledSymbologies: ["ean8", "ean13", "upca", "upce"] }),
      });
    })
    .then((barcodePicker) => {
      // barcodePicker is ready here, show a message every time a barcode is scanned
      barcodePicker.on("scan", (scanResult) => {
        let barcode = scanResult.barcodes[0].data;
        const input = document.getElementById('barcodeInput');
        input.setAttribute('value', barcode)
        document.getElementById('barcodeSubmit').click()
      });
    });
}

export { initScanditSDK };
