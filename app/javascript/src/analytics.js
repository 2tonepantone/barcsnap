window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
console.log('GTAG LOADED');
document.addEventListener('turbolinks:load', (event) => {
  gtag('config', 'G-3Y3F3D53NG', {
    page_location: event.data.url,
    page_path: event.srcElement.location.pathname,
    page_title: event.srcElement.title,
    cookie_flags: 'max-age=7200;Secure;SameSite=none'
  });
});

export default gtag; 