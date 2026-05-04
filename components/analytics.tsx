import Script from "next/script";

/**
 * Analytics loader. Renders nothing unless the relevant env vars are set.
 * All scripts load with strategy="afterInteractive" so they never block LCP.
 */
export function Analytics() {
  const pixelId = process.env["NEXT_PUBLIC_META_PIXEL_ID"];
  const ga4Id = process.env["NEXT_PUBLIC_GA4_ID"];

  return (
    <>
      {pixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              // One eventID per page load — used by both the browser PageView
              // and the server CAPI mirror so Meta can deduplicate the pair.
              var __sjlPvId = 'pv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
              try { console.log('[meta pixel] PageView eventId:', __sjlPvId); } catch (e) {}
              fbq('track', 'PageView', {}, { eventID: __sjlPvId });
              fetch('/api/pageview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId: __sjlPvId }),
                keepalive: true
              }).catch(function () {});
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', { transport_type: 'beacon' });
            `}
          </Script>
        </>
      )}
    </>
  );
}
