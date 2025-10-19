document.addEventListener('DOMContentLoaded', function(){
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
});

