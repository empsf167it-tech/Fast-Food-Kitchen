/**
 * BITECRAFT — FAST FOOD. BIG FLAVOR.
 * CORE JAVASCRIPT & MENU INTERACTION
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initThemeToggle();
  initMobileMenu();
  initStickyHeader();
  initScrollAnimations();
  initHeroParallax();
  initCountdown();
  initForms();
  initMenuFilters();
  initBackToTop();
});

/* ==========================================================================
   1. PAGE TRANSITIONS
   ========================================================================== */
function initPageTransition() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  // Trigger page reveal
  setTimeout(() => {
    overlay.classList.add('active');
  }, 100);

  // Intercept local link clicks for page transitions
  const localLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
  localLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Don't intercept if it's the mobile toggle or a specific non-page link
      if (link.classList.contains('mobile-nav-link') || link.getAttribute('href') === 'javascript:void(0)') return;

      const targetUrl = link.getAttribute('href');
      if (targetUrl) {
        e.preventDefault();
        overlay.classList.remove('active');
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 500);
      }
    });
  });
}

/* ==========================================================================
   2. LIGHT / DARK MODE SYSTEM
   ========================================================================== */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcons('light');
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'bi bi-sun';
      } else {
        icon.className = 'bi bi-moon-stars';
      }
    }
  });
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const openBtn = document.querySelector('.hamburger-menu');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!openBtn || !overlay) return;

  openBtn.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');
      if (targetUrl) {
        e.preventDefault();
        closeMenu();
        const transitionOverlay = document.querySelector('.page-transition-overlay');
        if (transitionOverlay) {
          transitionOverlay.classList.remove('active');
        }
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 500);
      }
    });
  });
}

/* ==========================================================================
   4. STICKY HEADER SCROLL TRANSITION
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.header-nav');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* ==========================================================================
   5. INTERSECTION OBSERVER SCROLL REVEALS
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-reveal, .animate-scale, .animate-slide-left, .animate-slide-right, .vertical-line');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed', 'reveal');
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Trigger hero load animations
  setTimeout(() => {
    const heroImgWrapper = document.querySelector('.hero-img-wrapper');
    const heroLeftImg = document.querySelector('.hero-left img');
    const heroTitles = document.querySelectorAll('.hero-title span span');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroActions = document.querySelector('.hero-actions');
    const heroEst = document.querySelector('.hero-est');

    if (heroImgWrapper) heroImgWrapper.style.clipPath = 'inset(0 0 0 0)';
    if (heroLeftImg) heroLeftImg.style.transform = 'scale(1)';
    
    heroTitles.forEach((title, idx) => {
      setTimeout(() => {
        title.style.transform = 'translateY(0)';
      }, 300 + (idx * 150));
    });

    if (heroSubtitle) {
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }, 800);
    }

    if (heroActions) {
      setTimeout(() => {
        heroActions.style.opacity = '1';
        heroActions.style.transform = 'translateY(0)';
      }, 1000);
    }

    if (heroEst) {
      setTimeout(() => {
        heroEst.style.opacity = '1';
      }, 1200);
    }
  }, 300);

  // Parallax scrolling for full-width sections
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      const sectionOffset = parallaxBg.parentElement.offsetTop;
      const sectionHeight = parallaxBg.parentElement.offsetHeight;
      const windowHeight = window.innerHeight;

      if (scrollPos + windowHeight > sectionOffset && scrollPos < sectionOffset + sectionHeight) {
        const yOffset = (scrollPos - sectionOffset) * 0.15;
        parallaxBg.style.transform = `translateY(${yOffset}px) scale(1.1)`;
      }
    });
  }
}

/* ==========================================================================
   6. HERO PARALLAX MOUSE EFFECT
   ========================================================================== */
function initHeroParallax() {
  const hero = document.querySelector('.hero-split');
  if (!hero) return;

  const leftImg = hero.querySelector('.hero-left img');

  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const moveX = (clientX - width / 2) / (width / 2);
    const moveY = (clientY - height / 2) / (height / 2);

    if (leftImg) {
      leftImg.style.transform = `scale(1.03) translate(${moveX * 10}px, ${moveY * 10}px)`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    if (leftImg) {
      leftImg.style.transform = 'scale(1) translate(0px, 0px)';
    }
  });
}

/* ==========================================================================
   7. COUNTDOWN TIMER (COMING SOON PAGE)
   ========================================================================== */
function initCountdown() {
  const countdownContainer = document.getElementById('coming-soon-countdown');
  if (!countdownContainer) return;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);

  const daysVal = document.getElementById('days');
  const hoursVal = document.getElementById('hours');
  const minutesVal = document.getElementById('minutes');
  const secondsVal = document.getElementById('seconds');

  const updateTimer = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      clearInterval(timerInterval);
      countdownContainer.innerHTML = '<h4>GRAND OPENING NOW!</h4>';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysVal) daysVal.innerText = String(days).padStart(2, '0');
    if (hoursVal) hoursVal.innerText = String(hours).padStart(2, '0');
    if (minutesVal) minutesVal.innerText = String(minutes).padStart(2, '0');
    if (secondsVal) secondsVal.innerText = String(seconds).padStart(2, '0');
  };

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

/* ==========================================================================
   8. MENU INTERACTIVE CATEGORY FILTERING
   ========================================================================== */
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  const menuCards = document.querySelectorAll('.menu-item-card');

  if (!filterBtns.length || !menuCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. FORM SUBMISSION FEEDBACK
   ========================================================================== */
function initForms() {
  const reservationForm = document.getElementById('reservation-form');
  const contactForm = document.getElementById('contact-form');
  
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerText = 'PROCESSING ORDER...';
      
      setTimeout(() => {
        const formParent = reservationForm.parentElement;
        formParent.innerHTML = `
          <div class="text-center py-5 animate-reveal revealed">
            <i class="bi bi-check-circle-fill text-danger display-1"></i>
            <h2 class="mt-4 mb-3 font-heading text-danger display-4">ORDER CONFIRMED!</h2>
            <p class="font-body mb-4" style="max-width: 500px; margin: 0 auto; opacity: 0.9;">
              Your BiteCraft order has been received! We are smashing and frying your food fresh right now. Details have been sent to your phone.
            </p>
            <a href="index.html" class="btn-premium btn-premium-solid mt-3 d-inline-block">RETURN HOME</a>
          </div>
        `;
      }, 1200);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerText = 'SENDING MESSAGE...';
      
      setTimeout(() => {
        const formParent = contactForm.parentElement;
        formParent.innerHTML = `
          <div class="text-center py-5 animate-reveal revealed">
            <i class="bi bi-envelope-check-fill text-danger display-1"></i>
            <h2 class="mt-4 mb-3 font-heading text-danger display-4">MESSAGE RECEIVED!</h2>
            <p class="font-body mb-4" style="max-width: 500px; margin: 0 auto; opacity: 0.9;">
              Thanks for reaching out to BiteCraft! A team member will respond to your message shortly.
            </p>
            <a href="index.html" class="btn-premium btn-premium-solid mt-3 d-inline-block">RETURN HOME</a>
          </div>
        `;
      }, 1200);
    });
  }
}

/* ==========================================================================
   10. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  let btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<i class="bi bi-chevron-up"></i>';
    document.body.appendChild(btn);
  }

  const handleScroll = () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

