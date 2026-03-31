document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        // Once shown, stop observing
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  // Header background change on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '10px 0';
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
      header.style.padding = '0';
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Automatic Carousel Logic
  const track = document.getElementById('carousel-track');
  if (track) {
    const slides = Array.from(track.children);
    let currentIndex = 0;

    const moveSlide = () => {
      const visibleSlides = window.innerWidth <= 768 ? 1 : 3;
      currentIndex++;
      if (currentIndex > slides.length - visibleSlides) {
        currentIndex = 0;
      }
      const amountToMove = slides[currentIndex].offsetWidth * currentIndex;
      track.style.transform = `translateX(-${amountToMove}px)`;
    };

    // Slide every 3 seconds
    setInterval(moveSlide, 3000);

    // Handle window resize to keep alignment
    window.addEventListener('resize', () => {
      const amountToMove = slides[currentIndex].offsetWidth * currentIndex;
      track.style.transform = `translateX(-${amountToMove}px)`;
    });
  }
});
