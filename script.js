
// about page


// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.rectangle nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

// Sticky Navigation Shadow on Scroll
const navbar = document.querySelector('.rectangle');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Intersection Observer for Timeline Items
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
  observer.observe(item);
});

// Observe stat cards for animation
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
  observer.observe(card);
});

// Observe value cards for animation
const valueCards = document.querySelectorAll('.value-card');
valueCards.forEach(card => {
  observer.observe(card);
});

// Counter Animation for Statistics
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }
  }, 16);
};

// Trigger counter animation when stat cards are visible
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const numberElement = entry.target.querySelector('.stat-number');
      const text = numberElement.textContent;
      const hasPlus = text.includes('+');
      const hasK = text.includes('K');
      let number = parseInt(text.replace(/[^0-9]/g, ''));
      
      if (hasK) {
        number = number * 1000;
      }
      
      // Animate the counter
      let current = 0;
      const increment = number / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          let displayNumber = number;
          if (hasK) {
            displayNumber = (number / 1000) + 'K';
          }
          numberElement.textContent = displayNumber + (hasPlus ? '+' : '');
          clearInterval(timer);
        } else {
          let displayNumber = Math.floor(current);
          if (hasK) {
            displayNumber = Math.floor(current / 1000) + 'K';
          }
          numberElement.textContent = displayNumber + (hasPlus ? '+' : '');
        }
      }, 20);
    }
  });
}, { threshold: 0.5 });

statCards.forEach(card => {
  statObserver.observe(card);
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#home') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Add parallax effect to header
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector('.section');
  if (header && scrolled < 400) {
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effect to buttons with ripple
const buttons = document.querySelectorAll('.button, .div-wrapper');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
  .button, .div-wrapper {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id], article[id]');
const navLinks = document.querySelectorAll('.rectangle a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

console.log('TaxPro About Page - Interactive features loaded successfully!');
// count up number
const counters = document.querySelectorAll(".count");
let started = false;

window.addEventListener("scroll", () => {
  const section = document.querySelector(".stats-grid");
  const sectionTop = section.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight && !started) {
    started = true;

    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let count = 0;
      const increment = Math.ceil(target / 150);

      const update = () => {
        if (count < target) {
          count += increment;
          counter.innerText = count;
          setTimeout(update, 20);
        } else {
          counter.innerText = target;
        }
      };

      update();
    });
  }
});
  

