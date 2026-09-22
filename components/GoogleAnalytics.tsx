import Script from "next/script";

const configuredId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const measurementId =
  configuredId && /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : undefined;

export function GoogleAnalytics() {
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });

document.addEventListener('click', function(event) {
  var link = event.target instanceof Element ? event.target.closest('a') : null;
  if (!link) return;
  var href = link.getAttribute('href') || '';
  var text = (link.textContent || '').trim();
  var eventName = href.indexOf('wa.me') !== -1 ? 'click_whatsapp'
    : href.indexOf('tel:') === 0 ? 'click_phone'
    : href.indexOf('mailto:') === 0 ? 'click_email'
    : text.indexOf('Discutăm 10 minute') !== -1 ? 'cta_contact'
    : '';
  if (eventName) gtag('event', eventName, { link_url: link.href, link_text: text });
});

window.addEventListener('bridal:analytics', function(event) {
  if (event.detail && event.detail.name) {
    gtag('event', event.detail.name, event.detail.parameters || {});
  }
});`}
      </Script>
    </>
  );
}
