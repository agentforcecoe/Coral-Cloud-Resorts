/*!
 * Coral Cloud Concierge — chat widget (drop-in)
 * Include this on any page with:
 *   <script src="/assets/coral-chat-widget.js" defer></script>
 * That's the only line each page needs. Everything else (styles, markup,
 * open/close/dock behavior, and the Salesforce Embedded Messaging init)
 * is self-contained here so every page stays in sync automatically.
 */
(function () {
  if (window.__ccChatWidgetLoaded) return; // guard against double-include
  window.__ccChatWidgetLoaded = true;

  /* ---------- 1. Fonts (skipped if the page already loads them) ---------- */
  function ensureFonts() {
    if (document.getElementById('cc-widget-fonts')) return;
    var pre1 = document.createElement('link');
    pre1.rel = 'preconnect'; pre1.href = 'https://fonts.googleapis.com';
    var pre2 = document.createElement('link');
    pre2.rel = 'preconnect'; pre2.href = 'https://fonts.gstatic.com'; pre2.crossOrigin = '';
    var font = document.createElement('link');
    font.id = 'cc-widget-fonts';
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Manrope:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(pre1);
    document.head.appendChild(pre2);
    document.head.appendChild(font);
  }

  /* ---------- 2. Styles ---------- */
  function ensureStyles() {
    var css = ''
    + ':root{'
    + '  --cc-ink:#0B2E2A; --cc-teal-900:#0A3D39; --cc-teal-700:#0F5C56; --cc-teal-600:#146B62; --cc-teal-500:#1C8478;'
    + '  --cc-foam:#E7F3EF; --cc-sand:#FBF4E8; --cc-sand-deep:#F3E7D3;'
    + '  --cc-coral:#F2734B; --cc-coral-deep:#DD5A34; --cc-coral-soft:#F8AF8E;'
    + '  --cc-white:#FFFFFF; --cc-shadow:0 20px 50px -20px rgba(10,61,57,0.35); --cc-ease:cubic-bezier(.22,.61,.36,1);'
    + '}'
    + '.cc-chat-ring{ position:relative; display:flex; align-items:center; justify-content:center; flex:0 0 auto; }'
    + '.cc-chat-ring::before{ content:""; position:absolute; inset:-4px; border-radius:50%; background:conic-gradient(from 0deg, var(--cc-coral), var(--cc-teal-500), var(--cc-coral)); opacity:.55; animation:cc-spin 6s linear infinite; }'
    + '.cc-chat-ring .cc-core{ position:relative; z-index:1; border-radius:50%; background:var(--cc-coral); color:#fff; display:flex; align-items:center; justify-content:center; font-family:"Fraunces",serif; }'
    + '@keyframes cc-spin{ to{ transform:rotate(360deg); } }'
    + '@media (prefers-reduced-motion: reduce){ .cc-chat-ring::before{ animation:none; } }'
    + '#cc-chat-bar{ position:fixed; left:50%; bottom:26px; transform:translateX(-50%); z-index:9998; display:flex; align-items:center; gap:12px; background:var(--cc-white); border-radius:999px; padding:10px 12px 10px 14px; box-shadow:var(--cc-shadow); cursor:pointer; transition:transform .25s var(--cc-ease); max-width:92vw; }'
    + '#cc-chat-bar:hover{ transform:translateX(-50%) translateY(-3px); }'
    + '#cc-chat-bar .cc-chat-ring{ width:34px; height:34px; }'
    + '#cc-chat-bar .cc-core{ width:34px; height:34px; font-size:15px; }'
    + '#cc-chat-bar .cc-text{ flex:1; text-align:left; }'
    + '#cc-chat-bar .cc-eyebrow{ font-family:"Manrope",sans-serif; font-weight:700; font-size:.68rem; letter-spacing:.18em; text-transform:uppercase; color:var(--cc-coral); }'
    + '#cc-chat-bar .cc-prompt{ font-family:"Fraunces",serif; font-size:1rem; color:var(--cc-teal-900); }'
    + '#cc-chat-bar .cc-send{ width:34px; height:34px; border-radius:50%; background:var(--cc-teal-900); color:#fff; display:flex; align-items:center; justify-content:center; flex:0 0 auto; transition:background .2s; }'
    + '#cc-chat-bar:hover .cc-send{ background:var(--cc-teal-700); }'
    + '#cc-chat-bar .cc-dismiss{ width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--cc-teal-900); opacity:.5; flex:0 0 auto; transition:opacity .2s, background .2s; }'
    + '#cc-chat-bar .cc-dismiss:hover{ background:var(--cc-foam); opacity:1; }'
    + '#cc-chat-icon{ position:fixed; right:26px; bottom:26px; z-index:9998; width:64px; height:64px; cursor:pointer; display:none; }'
    + '#cc-chat-icon .cc-chat-ring{ width:64px; height:64px; }'
    + '#cc-chat-icon .cc-core{ width:64px; height:64px; font-size:26px; transition:transform .2s var(--cc-ease); }'
    + '#cc-chat-icon:hover .cc-core{ transform:scale(1.06); }'
    + '#cc-chat-overlay{ position:fixed; inset:0; z-index:9999; display:none; align-items:center; justify-content:center; background:rgba(10,46,42,.35); opacity:0; transition:opacity .25s var(--cc-ease), background .25s var(--cc-ease); }'
    + '#cc-chat-overlay.cc-open{ opacity:1; }'
    + '#cc-chat-overlay.cc-docked{ align-items:flex-end; justify-content:flex-end; background:transparent; padding:24px; }'
    + '#cc-chat-panel{ width:min(420px,92vw); height:min(640px,82vh); background:var(--cc-white); border-radius:24px; overflow:hidden; box-shadow:var(--cc-shadow); display:flex; flex-direction:column; transform:translateX(-50%) scale(.94) translateY(10px); left:50%; position:relative; transition:transform .3s var(--cc-ease); pointer-events:auto; }'
    + '#cc-chat-overlay.cc-open #cc-chat-panel{ transform:translateX(-50%) scale(1) translateY(0); }'
    + '#cc-chat-overlay.cc-docked #cc-chat-panel{ position:static; left:auto; width:min(380px,90vw); height:min(560px,72vh); transform:scale(.94) translateY(10px); }'
    + '#cc-chat-overlay.cc-docked.cc-open #cc-chat-panel{ transform:translateX(0) scale(1) translateY(0); }'
    + '#cc-chat-header{ display:flex; align-items:center; justify-content:flex-end; gap:4px; padding:8px 10px; background:linear-gradient(120deg, var(--cc-teal-900), var(--cc-teal-700)); color:#fff; flex:0 0 auto; box-shadow:inset 0 -1px 0 rgba(255,255,255,.1); }'
    + '#cc-chat-header .cc-icon-btn{ width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#fff; font-size:15px; transition:transform .15s ease; }'
    + '#cc-chat-header .cc-icon-btn:hover{ background:rgba(255,255,255,.16); }'
    + '#cc-chat-header .cc-icon-btn:active{ transform:scale(.9); }'
    + '.cc-expand-btn{ display:none; }'
    + '#cc-chat-overlay.cc-docked .cc-expand-btn{ display:flex; }'
    + '#cc-chat-overlay.cc-docked #cc-minimize{ display:none; }'
    + '#cc-chat-overlay.cc-docked #cc-chat-header{ cursor:pointer; }'
    + '#cc-chat-mount{ flex:1; min-height:0; background:var(--cc-sand); position:relative; }'
    + '#cc-chat-mount .cc-placeholder{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:"Manrope",sans-serif; color:var(--cc-teal-700); opacity:.7; transition:opacity .3s; }'
    + '@media (max-width:640px){ #cc-chat-overlay.cc-docked{ padding:0; } #cc-chat-overlay.cc-docked #cc-chat-panel{ width:100vw; height:100vh; border-radius:0; } }';

    var style = document.createElement('style');
    style.id = 'cc-widget-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- 3. Markup ---------- */
  function ensureMarkup() {
    var html = ''
    + '<div id="cc-chat-bar">'
    + '  <div class="cc-chat-ring"><div class="cc-core">\u2726</div></div>'
    + '  <div class="cc-text">'
    + '    <div class="cc-eyebrow">Concierge</div>'
    + '    <div class="cc-prompt">Ask about your stay\u2026</div>'
    + '  </div>'
    + '  <div class="cc-send">\u27A4</div>'
    + '  <div class="cc-dismiss" id="cc-collapse-to-icon" title="Minimize">\u2715</div>'
    + '</div>'
    + '<div id="cc-chat-icon" title="Chat with the concierge">'
    + '  <div class="cc-chat-ring"><div class="cc-core">\u2726</div></div>'
    + '</div>'
    + '<div id="cc-chat-overlay">'
    + '  <div id="cc-chat-panel">'
    + '    <div id="cc-chat-header">'
    + '      <div class="cc-icon-btn cc-expand-btn" id="cc-expand" title="Expand to full view">'
    + '        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>'
    + '      </div>'
    + '      <div class="cc-icon-btn" id="cc-minimize" title="Minimize to corner">\u2013</div>'
    + '      <div class="cc-icon-btn" id="cc-close" title="Close">\u2715</div>'
    + '    </div>'
    + '    <div id="cc-chat-mount">'
    + '      <div class="cc-placeholder">Loading your concierge\u2026</div>'
    + '    </div>'
    + '  </div>'
    + '</div>';

    var wrap = document.createElement('div');
    wrap.id = 'cc-chat-widget-root';
    wrap.innerHTML = html;
    document.body.appendChild(wrap);
  }

  /* ---------- 4. State machine (open / dock / minimize / close) ---------- */
  function initBehavior() {
    var bar = document.getElementById('cc-chat-bar');
    var icon = document.getElementById('cc-chat-icon');
    var overlay = document.getElementById('cc-chat-overlay');
    var header = document.getElementById('cc-chat-header');

    function hideOverlay() {
      overlay.classList.remove('cc-open');
      overlay.style.visibility = 'hidden';
      overlay.style.pointerEvents = 'none';
    }
    function showBar() {
      bar.style.display = 'flex';
      icon.style.display = 'none';
      overlay.classList.remove('cc-docked');
      hideOverlay();
    }
    function showIcon() {
      bar.style.display = 'none';
      icon.style.display = 'block';
      overlay.classList.remove('cc-docked');
      hideOverlay();
    }
    function showFullPage() {
      bar.style.display = 'none';
      icon.style.display = 'none';
      overlay.classList.remove('cc-docked');
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'auto';
      requestAnimationFrame(function () { overlay.classList.add('cc-open'); });
    }
    function showDocked() {
      bar.style.display = 'none';
      icon.style.display = 'none';
      overlay.classList.add('cc-docked');
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'none';
      requestAnimationFrame(function () { overlay.classList.add('cc-open'); });
    }

    bar.addEventListener('click', function (e) {
      if (e.target.id === 'cc-collapse-to-icon') return;
      showFullPage();
    });
    document.getElementById('cc-collapse-to-icon').addEventListener('click', function (e) {
      e.stopPropagation();
      showIcon();
    });
    icon.addEventListener('click', showFullPage);
    document.getElementById('cc-close').addEventListener('click', function () {
      try {
        if (window.embeddedservice_bootstrap && embeddedservice_bootstrap.userVerificationAPI) {
          embeddedservice_bootstrap.userVerificationAPI.clearSession();
        }
      } catch (err) { /* widget not ready yet */ }
      showIcon();
    });
    document.getElementById('cc-minimize').addEventListener('click', showDocked);
    document.getElementById('cc-expand').addEventListener('click', showFullPage);

    window.addEventListener('onEmbeddedMessagingConversationClosed', function () {
      showIcon();
    });

    header.addEventListener('click', function (e) {
      if (!overlay.classList.contains('cc-docked')) return;
      if (e.target.closest('.cc-icon-btn')) return;
      showFullPage();
    });

    overlay.style.display = 'flex';
    hideOverlay();
    showBar();

    window.addEventListener('onEmbeddedMessagingReady', function () {
      var ph = document.querySelector('#cc-chat-mount .cc-placeholder');
      if (ph) { ph.style.opacity = '0'; setTimeout(function () { ph.remove(); }, 300); }
    });
  }

  /* ---------- 5. Salesforce Embedded Messaging bootstrap ---------- */
  function initSalesforce() {
    window.initEmbeddedMessaging = function () {
      try {
        embeddedservice_bootstrap.settings.language = 'en_US';
        embeddedservice_bootstrap.settings.displayMode = 'inline';
        embeddedservice_bootstrap.settings.targetElement = document.getElementById('cc-chat-mount');

        embeddedservice_bootstrap.init(
          '00DKa00000Uxd6c',
          'Coral_Cloud_Agent_Agentforce_COE_Hospitality',
          'https://ap1763032291393.my.site.com/ESWCoralCloudAgentAgen1786514087670',
          { scrt2URL: 'https://ap1763032291393.my.salesforce-scrt.com' }
        );
      } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
      }
    };

    var s = document.createElement('script');
    s.src = 'https://ap1763032291393.my.site.com/ESWCoralCloudAgentAgen1786514087670/assets/js/bootstrap.min.js';
    s.onload = window.initEmbeddedMessaging;
    document.body.appendChild(s);
  }

  /* ---------- boot ---------- */
  function boot() {
    ensureFonts();
    ensureStyles();
    ensureMarkup();
    initBehavior();
    initSalesforce();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();