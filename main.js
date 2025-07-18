// Mobile nav menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Optional: Close menu when a nav link is clicked (mobile UX)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    }
  });
});
// HERO SLIDESHOW WITH DOTS

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector('.hero-bg-video');
  const images = document.querySelectorAll('.hero-bg-image');
  const slides = [video, ...images];
  const dots = document.querySelectorAll('.hero-dot');
  let current = 0;
  let timeoutId = null;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      if (slide.tagName === 'VIDEO') {
        if (i === idx) {
          slide.classList.add('active');
          slide.currentTime = 0;
          slide.play();
        } else {
          slide.classList.remove('active');
          slide.pause();
        }
      } else {
        if (i === idx) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  function getDuration(idx) {
    // You can set custom durations per slide if needed
    if (slides[idx].tagName === 'VIDEO') return 8000; // ms
    return 5000;
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
    timeoutId = setTimeout(nextSlide, getDuration(current));
  }

  // Dots click: jump to that slide
  dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
      clearTimeout(timeoutId);
      current = i;
      showSlide(current);
      timeoutId = setTimeout(nextSlide, getDuration(current));
    });
  });

  // Start with first slide
  showSlide(0);
  timeoutId = setTimeout(nextSlide, getDuration(0));
});