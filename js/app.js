/* ============================================================
   Spacewar.wiki — Interactive JS
   Retro terminal interactions, no frameworks
   ============================================================ */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Close menu when clicking a link
    var navAnchors = links.querySelectorAll('a');
    for (var i = 0; i < navAnchors.length; i++) {
      navAnchors[i].addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* ---- FAQ accordion ---- */
  function initFAQ() {
    var items = document.querySelectorAll('.faq-item');
    for (var i = 0; i < items.length; i++) {
      (function (item) {
        var question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function () {
          var isOpen = item.classList.contains('open');
          // Close all
          for (var j = 0; j < items.length; j++) {
            items[j].classList.remove('open');
          }
          // Toggle current
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      })(items[i]);
    }
  }

  /* ---- Back to top ---- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Active nav highlighting ---- */
  function initActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-links a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href && href === currentPage) {
        links[i].classList.add('active');
      }
    }
  }

  /* ---- Terminal typewriter effect (optional, for hero) ---- */
  function initTypewriter() {
    var el = document.querySelector('[data-typewriter]');
    if (!el) return;

    var text = el.getAttribute('data-typewriter');
    var speed = parseInt(el.getAttribute('data-speed') || '40', 10);
    var i = 0;

    el.textContent = '';
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  /* ---- Smooth scroll for anchor links ---- */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  /* ---- Footer year ---- */
  function initYear() {
    var els = document.querySelectorAll('[data-year]');
    var year = new Date().getFullYear();
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = year;
    }
  }

  /* ---- Initialize everything ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initFAQ();
    initBackToTop();
    initActiveNav();
    initTypewriter();
    initSmoothScroll();
    initYear();
  });
})();
