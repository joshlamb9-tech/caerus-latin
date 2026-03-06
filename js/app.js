'use strict';

// --- Nav toggle ---
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Dropdown group toggles (primarily for mobile)
  siteNav.querySelectorAll('.nav-group-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const group = toggle.closest('.nav-group');
      const isOpen = group.classList.toggle('open');
      // On desktop, close other open groups
      if (window.innerWidth >= 768) {
        siteNav.querySelectorAll('.nav-group').forEach(g => {
          if (g !== group) g.classList.remove('open');
        });
      }
    });
  });

  // Close nav when a non-toggle link is tapped (mobile)
  siteNav.querySelectorAll('a:not(.nav-group-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target)) {
      siteNav.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));
    }
  });
}

// --- Service Worker registration + update banner ---
if ('serviceWorker' in navigator) {
  // pageWasControlled guards against showing the banner on first install.
  // If controller is null at this point, the first controllerchange is the
  // initial install — not an update. Capture the flag before registering.
  const pageWasControlled = !!navigator.serviceWorker.controller;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('[CE Latin] SW registered, scope:', reg.scope))
      .catch(err => console.warn('[CE Latin] SW registration failed:', err));
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (pageWasControlled) {
      showUpdateBanner();
    }
  });
}

function showUpdateBanner() {
  // Prevent duplicate banners
  if (document.getElementById('update-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'update-banner';
  banner.className = 'update-banner';
  banner.innerHTML =
    '<span>Site updated.</span>' +
    '<button class="update-banner-btn" onclick="window.location.reload()">Reload</button>';
  document.body.appendChild(banner);
}
