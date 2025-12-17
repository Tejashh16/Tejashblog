import './style.css'

let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;
let mouseTimeout;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (!isMouseMoving) {
    isMouseMoving = true;
    updateMousePosition();
  }

  clearTimeout(mouseTimeout);
  mouseTimeout = setTimeout(() => {
    isMouseMoving = false;
  }, 100);
});

function updateMousePosition() {
  if (isMouseMoving) {
    document.body.style.setProperty('--mouse-x', `${mouseX}px`);
    document.body.style.setProperty('--mouse-y', `${mouseY}px`);
    requestAnimationFrame(updateMousePosition);
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#donate') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
  } else {
    header.style.backgroundColor = 'rgba(15, 15, 15, 0.8)';
    header.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

const themeToggle = document.querySelector('.theme-toggle');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;

  if (!isDarkMode) {
    document.documentElement.style.setProperty('--bg-primary', '#f5f5f5');
    document.documentElement.style.setProperty('--bg-secondary', '#e8e8e8');
    document.documentElement.style.setProperty('--bg-card', '#ffffff');
    document.documentElement.style.setProperty('--bg-card-hover', '#f9f9f9');
    document.documentElement.style.setProperty('--text-primary', '#1a1a1a');
    document.documentElement.style.setProperty('--text-secondary', '#4a4a4a');
    document.documentElement.style.setProperty('--text-tertiary', '#6b6b6b');
    document.documentElement.style.setProperty('--border-color', '#d4d4d4');

    themeToggle.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  } else {
    document.documentElement.style.setProperty('--bg-primary', '#0f0f0f');
    document.documentElement.style.setProperty('--bg-secondary', '#1a1a1a');
    document.documentElement.style.setProperty('--bg-card', '#141414');
    document.documentElement.style.setProperty('--bg-card-hover', '#1c1c1c');
    document.documentElement.style.setProperty('--text-primary', '#e8e8e8');
    document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
    document.documentElement.style.setProperty('--text-tertiary', '#6b6b6b');
    document.documentElement.style.setProperty('--border-color', '#2a2a2a');

    themeToggle.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="5" stroke-width="2"/>
        <line x1="12" y1="1" x2="12" y2="3" stroke-width="2" stroke-linecap="round"/>
        <line x1="12" y1="21" x2="12" y2="23" stroke-width="2" stroke-linecap="round"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke-width="2" stroke-linecap="round"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke-width="2" stroke-linecap="round"/>
        <line x1="1" y1="12" x2="3" y2="12" stroke-width="2" stroke-linecap="round"/>
        <line x1="21" y1="12" x2="23" y2="12" stroke-width="2" stroke-linecap="round"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke-width="2" stroke-linecap="round"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  document.body.style.transition = 'background-color 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.blog-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});

document.querySelectorAll('.continue-reading').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  });
});

const donateBtn = document.querySelector('.donate-btn');

donateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const ripple = document.createElement('span');
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255, 255, 255, 0.5)';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.animation = 'ripple 0.6s ease-out';

  const rect = donateBtn.getBoundingClientRect();
  ripple.style.left = `${e.clientX - rect.left - 10}px`;
  ripple.style.top = `${e.clientY - rect.top - 10}px`;

  donateBtn.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log('%c🔧 Zak\'s Electronics Blog', 'color: #b794f4; font-size: 24px; font-weight: bold;');
console.log('%cElectronics, experiments, and questionable ideas', 'color: #a0a0a0; font-size: 14px; font-style: italic;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 'color: #6b6b6b; font-size: 12px;');
