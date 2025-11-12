  // Compact mobile navbar: apply to every .nav on the page (mobile only)
  (function setupCompactMobileNav(){
    try {
      if (!window.matchMedia) return;
      var mq = window.matchMedia('(max-width:700px)');

      function applyForNav(nav){
        var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
        if (links.length < 2) return;
        // Mark first two anchors so CSS will show them
        links[0].classList.add('main-nav-main');
        links[1].classList.add('main-nav-info');

        var baseId = nav.id || ('nav-' + Math.random().toString(36).slice(2,8));
        var moreBtnId = baseId + '-moreBtn';
        var popupId = baseId + '-morePopup';

        // If already created for this nav, skip
        if (document.getElementById(moreBtnId) || document.getElementById(popupId)) return;

        // Create more button
        var moreBtn = document.createElement('button');
        moreBtn.id = moreBtnId;document.addEventListener('DOMContentLoaded', function(){
  function wire(toggleId, navId){
    var btn = document.getElementById(toggleId);
    var nav = document.getElementById(navId);
    if(!btn || !nav) return;
    btn.addEventListener('click', function(){
      nav.classList.toggle('show');
    });
  }
  wire('navToggle','mainNav');
  wire('navToggle2','mainNav2');
  wire('navToggle3','mainNav3');
  wire('navToggle4','mainNav4');

  // Page loader handling
  var loader = document.getElementById('pageLoader');
  // If loader exists, show it until window load or timeout
  if(loader){
    // In case of very slow networks, keep loader visible until fully loaded
    var hideLoader = function(){
      loader.classList.add('loader-hidden');
      setTimeout(function(){ if(loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 450);
    };

    // Hide after window load
    window.addEventListener('load', function(){
      hideLoader();
    });

    // Fallback: hide loader after 6s to avoid permanent overlay
    setTimeout(function(){ hideLoader(); }, 6000);
  }

  // Animate key elements with a small stagger
  var animated = document.querySelectorAll('.animate.fade-up');
  animated.forEach(function(el, idx){
    var delay = 120 + idx * 80;
    el.style.animationDelay = delay + 'ms';
    // Force reflow then add class to start animation (if not already applied)
    requestAnimationFrame(function(){ el.style.opacity = ''; });
  });


        moreBtn.className = 'nav-more-btn';
        moreBtn.type = 'button';
        moreBtn.setAttribute('aria-expanded','false');
        // create three small bars inside the button (horizontal, side-by-side)
        for (var b = 0; b < 3; b++){
          var bar = document.createElement('span');
          bar.className = 'more-bar';
          moreBtn.appendChild(bar);
        }

        // Create popup container
        var popup = document.createElement('div');
        popup.id = popupId;
        popup.className = 'nav-more-popup';

        // Fill popup with remaining links (clone)
        for (var i = 2; i < links.length; i++){
          var a = links[i].cloneNode(true);
          a.addEventListener('click', function(){ popup.classList.remove('show'); moreBtn.setAttribute('aria-expanded','false'); });
          popup.appendChild(a);
        }

        // Insert moreBtn and popup after the second link
        var ref = links[1];
        ref.parentNode.insertBefore(moreBtn, ref.nextSibling);
        ref.parentNode.insertBefore(popup, moreBtn.nextSibling);

        moreBtn.addEventListener('click', function(e){
          e.stopPropagation();
          popup.classList.toggle('show');
          var expanded = popup.classList.contains('show');
          moreBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });

        // Close popup on outside click
        document.addEventListener('click', function(ev){
          if (!popup.contains(ev.target) && ev.target !== moreBtn){
            popup.classList.remove('show');
            moreBtn.setAttribute('aria-expanded','false');
          }
        });
      }

      function init(){
        var navs = document.querySelectorAll('.nav');
        navs.forEach(function(nav){ applyForNav(nav); });
      }

      // Init only on mobile; also when crossing breakpoint
      function checkAndInit(){
        if (mq.matches) init();
      }
      checkAndInit();
      mq.addEventListener ? mq.addEventListener('change', checkAndInit) : window.addEventListener('resize', checkAndInit);
    } catch (e){ console.error('Compact mobile nav init error', e); }
  })();
});

