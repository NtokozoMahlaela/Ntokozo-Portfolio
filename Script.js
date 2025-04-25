  // Current year for footer
  document.getElementById('year').textContent = new Date().getFullYear();
        
  // Create floating particles
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration between 10s and 20s
      const duration = Math.random() * 10 + 10;
      particle.style.animationDuration = `${duration}s`;
      
      // Random delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
  }
  
  // Back to top button
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
          backToTopButton.classList.add('visible');
      } else {
          backToTopButton.classList.remove('visible');
      }
  });
  
  backToTopButton.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
  
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
  
  // Animate elements when they come into view
  const animateOnScroll = () => {
      const elements = document.querySelectorAll('.timeline-item, .project-card, .interest-card');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
              element.classList.add('visible');
          }
      });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Animate skill bars on scroll
  const animateSkills = () => {
      const skillBars = document.querySelectorAll('.skill-progress');
      const skillsSection = document.getElementById('skills');
      const sectionPosition = skillsSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (sectionPosition < screenPosition) {
          skillBars.forEach(bar => {
              const width = bar.style.width;
              bar.style.width = '0';
              setTimeout(() => {
                  bar.style.width = width;
              }, 100);
          });
          
          // Remove event listener after animation
          window.removeEventListener('scroll', animateSkills);
      }
  };
  
  window.addEventListener('scroll', animateSkills);

  // Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

mobileOverlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Optimize animations for mobile
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || window.innerWidth < 768) {
    // Disable or simplify animations for mobile or users who prefer reduced motion
    document.querySelectorAll('[class*="animation"], [class*="transition"]').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
    
    // Simplify particle animation
    document.querySelectorAll('.particle').forEach(particle => {
        particle.style.animation = 'none';
        particle.style.opacity = '0.2';
    });
}


// Contact Form 
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const submitMessage = document.getElementById('submitMessage');
    
    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        const response = await fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            this.reset();
            submitMessage.style.display = 'block';
            submitMessage.innerHTML = '<div style="color: green; padding: 15px;">Thank you! Your message has been sent successfully.</div>';
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        submitMessage.style.display = 'block';
        submitMessage.innerHTML = '<div style="color: red; padding: 15px;">Sorry, there was an error sending your message. Please try again.</div>';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        
        // Hide the message after 5 seconds
        setTimeout(() => {
            submitMessage.style.display = 'none';
        }, 5000);
    }
});