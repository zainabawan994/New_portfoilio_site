/**
 * ZA Portfolio - HIGH-FIDELITY VANILLA JAVASCRIPT
 * Handles typing animations, interactive 3D parallax elements, forms, and scroll interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Reveal body once DOM is fully interactive
    document.body.style.opacity = '1';

    // ==========================================================================
    // 1. MOBILE NAVBAR HAMBURGER MENU
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Keyboard Esc close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.click();
        }
    });

    // ==========================================================================
    // 2. STICKY NAVBAR SCROLL STATE & BACK TO TOP BUTTON
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Navbar shrink and border glow
        if (scrollPos > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollPos > 400) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Back to top click handler
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 3. DYNAMIC HERO MULTI-TEXT TYPING ANIMATION
    // ==========================================================================
    const typingText = document.getElementById('typingText');
    const words = [
        "intelligent solutions 🤖", 
        "Machine Learning pipelines 🧠", 
        "predictive ML classifiers 📊",
        "responsive full-stack apps 💻", 
        "dynamic BI data dashboards 📈"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function type() {
        if (!typingText) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete characters
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30; // Faster deletion
        } else {
            // Write characters
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 70; // Standard typing speed
        }

        // Word completed typing
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at the end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Run typing animation after a brief delay
    setTimeout(type, 1000);

    // ==========================================================================
    // 4. INTERACTIVE 3D MOUSE-PARALLAX CARD EFFECT
    // ==========================================================================
    const profileCard = document.getElementById('profileCard');

    if (profileCard) {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            
            // Get relative cursor positions inside the card (normalized from -1 to 1)
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Rotate intensity factor
            const rotateX = ((centerY - y) / centerY) * 12; // Max 12 degrees
            const rotateY = ((x - centerX) / centerX) * 12; 
            
            profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            profileCard.style.transition = 'transform 0.05s ease';
        });

        profileCard.addEventListener('mouseleave', () => {
            // Reset position smoothly
            profileCard.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            profileCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
        });
    }

    // ==========================================================================
    // 5. ACCURATE SCROLLSPY INTERSECTION OBSERVER
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${activeId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px' // Focus observer center-screen
    });

    sections.forEach(section => scrollSpyObserver.observe(section));

    // ==========================================================================
    // 6. DYNAMIC COUNTER ANIMATION (STATS GRID)
    // ==========================================================================
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds animation time
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current);
            }
        }, stepTime);
    };

    // Trigger counters when scrolled into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statCards = entry.target.querySelectorAll('.counter');
                statCards.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        });
    }, { threshold: 0.1 });

    const aboutSection = document.getElementById('about');
    if (aboutSection) counterObserver.observe(aboutSection);

    // ==========================================================================
    // 7. SMOOTH INTERACTION SCROLL-REVEAL OBSERVER
    // ==========================================================================
    const revealElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .info-card, .cert-card');
    
    // Set initial opacity and offset in JS as fallback so that non-JS loads fine
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Reveal shortly before appearing
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 8. PREMIUM GLASSMORPHIC CONTACT FORM SIMULATOR
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '❌ Please fill out all required fields.';
                return;
            }

            // Button status feedback state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;
            
            // Animate button into loading state
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fas fa-spinner fa-spin"></i>';
            
            // Clear status
            formStatus.style.display = 'none';

            // Simulate high-fidelity email sending
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check-circle"></i>';
                
                // Show gorgeous status message
                formStatus.className = 'form-status success';
                formStatus.textContent = `🎉 Thank you, ${name}! Your message has been sent successfully. Zainab will get back to you shortly.`;
                
                // Reset form
                contactForm.reset();

                // Reset button text after 4 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnContent;
                }, 4000);

            }, 1800); // Realistic server delay
        });
    }

    console.log('Premium Portfolio Engine initialized successfully!');
});
