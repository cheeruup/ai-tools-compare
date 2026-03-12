(function(){
  const cfg = window.SITE_CONFIG || {};
  function injectMeta(name, content) {
    if (!content) return;
    const m = document.createElement('meta');
    m.setAttribute('name', name);
    m.setAttribute('content', content);
    document.head.appendChild(m);
  }
  if (cfg.googleSiteVerification && cfg.googleSiteVerification !== 'REPLACE_WITH_SEARCH_CONSOLE_TOKEN') {
    injectMeta('google-site-verification', cfg.googleSiteVerification);
  }
  if (cfg.googleAdsenseAccount && cfg.googleAdsenseAccount !== 'ca-pub-XXXXXXXXXXXXXXXX') {
    injectMeta('google-adsense-account', cfg.googleAdsenseAccount);
    const s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(cfg.googleAdsenseAccount);
    document.head.appendChild(s);
  }
  if (cfg.googleAnalyticsId && cfg.googleAnalyticsId !== 'G-XXXXXXXXXX') {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.googleAnalyticsId);
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', cfg.googleAnalyticsId);

    window.trackAffiliateClick = function(network, label, url){
      try {
        gtag('event', 'select_item', {
          item_list_name: network,
          item_name: label,
          item_category: 'affiliate_click',
          destination: url
        });
      } catch (e) {}
    };
  } else {
    window.trackAffiliateClick = function(){};
  }

  if (cfg.enableConsentBanner) {
    const accepted = localStorage.getItem('site-consent-v1');
    if (!accepted) {
      const bar = document.createElement('div');
      bar.style.cssText = "position:fixed;left:16px;right:16px;bottom:16px;z-index:50;background:#0e1631;border:1px solid #273158;border-radius:18px;padding:16px;color:#eaf0ff;box-shadow:0 18px 50px rgba(0,0,0,.35)";
      bar.innerHTML = '<div style="display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div style="max-width:800px;color:#b7c1df">We use cookies and similar technologies for analytics, ad delivery, and affiliate attribution. Update this text to match your legal requirements and CMP choice.</div><div style="display:flex;gap:10px"><button id="consent-ok" style="padding:10px 14px;border-radius:12px;border:0;background:#79a8ff;font-weight:700">Accept</button><button id="consent-later" style="padding:10px 14px;border-radius:12px;border:1px solid #273158;background:#121932;color:#fff">Later</button></div></div>';
      document.body.appendChild(bar);
      document.getElementById('consent-ok').onclick = function(){localStorage.setItem('site-consent-v1','accepted'); bar.remove();};
      document.getElementById('consent-later').onclick = function(){bar.remove();};
    }
  }

  document.addEventListener('click', function(e){
    const link = e.target.closest('[data-affiliate-network]');
    if (!link) return;
    trackAffiliateClick(link.dataset.affiliateNetwork, link.dataset.affiliateLabel || link.textContent.trim(), link.href);
  });
})();