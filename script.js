// ========== script.js ==========

// 3-Second Preloader
(function() {
    const preloader = document.getElementById('preloader');
    const progressFill = document.getElementById('progressFill');
    const terminalLines = [
        document.getElementById('terminal-line-1'),
        document.getElementById('terminal-line-2'),
        document.getElementById('terminal-line-3'),
        document.getElementById('terminal-line-4'),
        document.getElementById('terminal-line-5'),
        document.getElementById('terminal-line-6'),
        document.getElementById('terminal-line-7'),
        document.getElementById('terminal-line-8')
    ];

    const terminalMessages = [
        "root@saimoon:~$ ping -c 3 127.0.0.1",
        "PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.",
        "64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.034 ms",
        "64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.028 ms",
        "64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.025 ms",
        "--- 127.0.0.1 ping statistics ---",
        "3 packets transmitted, 3 received, 0% packet loss, time 2032ms",
        "rtt min/avg/max/mdev = 0.025/0.029/0.034/0.003 ms"
    ];

    // Ultra-fast 3-second preloader
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1.67; // 100% in 3000ms / 60 updates = ~1.67% per update
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            // Immediate fade out
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 200);
            }, 100);
        }
        progressFill.style.width = progress + '%';
    }, 50); // Update every 50ms

    // Typewriter-style typing animation
    function startTypingAnimation() {
        let lineIndex = 0;
        let charIndex = 0;
        
        function typeNextLine() {
            if (lineIndex >= terminalLines.length) return;
            
            const line = terminalLines[lineIndex];
            const message = terminalMessages[lineIndex];
            
            function typeChar() {
                if (charIndex < message.length) {
                    line.textContent += message.charAt(charIndex);
                    charIndex++;
                    
                    // Typewriter effect timing
                    const typingSpeed = Math.random() * 2 + 2; // 40-70ms for realistic typing
                    setTimeout(typeChar, typingSpeed);
                } else {
                    // Move to next line after a pause
                    lineIndex++;
                    charIndex = 0;
                    
                    if (lineIndex < terminalLines.length) {
                        // Pause between lines
                        const linePause = lineIndex === 1 ? 200 : 300;
                        setTimeout(typeNextLine, linePause);
                    }
                }
            }
            
            typeChar();
        }
        
        // Start typing animation
        setTimeout(typeNextLine, 500);
    }

    // Start typing immediately
    startTypingAnimation();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Typing Animation for Hero Section - Typewriter style
    const typingText = document.getElementById('typed-text');
    const phrases = [
        "Enterprise Network Specialist",
        "Windows Server Administrator",
        "Security Remediation Expert",
        "Virtualization Platform Manager",
        "Cisco & MikroTik Configurator"
    ];
    
    if (typingText) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function typeHeroText() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Delete text
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 50; // Faster deletion
            } else {
                // Type text
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100 + Math.random() * 50; // Natural typing variation
            }
            
            // Check if we've finished typing the phrase
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at the end of the phrase
                typingDelay = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting, move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingDelay = 500; // Pause before typing next phrase
            }
            
            setTimeout(typeHeroText, typingDelay);
        }

        // Start hero typing animation after preloader
        setTimeout(typeHeroText, 300);
    }

    // Animated Counter with Background Animation
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target, 2000);
        });
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        // Hero text animation (delayed until after preloader)
        setTimeout(() => {
            gsap.from('.hero-subtitle', {duration: 1, y: 30, opacity: 0, delay: 0.3});
            gsap.from('.hero-title', {duration: 1, y: 40, opacity: 0, delay: 0.5});
            gsap.from('.hero-description', {duration: 1, y: 40, opacity: 0, delay: 0.7});
            gsap.from('.hero-buttons', {duration: 1, y: 40, opacity: 0, delay: 0.9});
        }, 300);

        // Section title animations
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                },
                y: 50,
                opacity: 0,
                duration: 1
            });
        });

        // Education card animations
        gsap.utils.toArray('.education-card, .training-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2
            });
        });

        // Experience item animation
        gsap.from('.experience-item', {
            scrollTrigger: {
                trigger: '.experience-item',
                start: 'top 90%',
            },
            x: -50,
            opacity: 0,
            duration: 1
        });

        // Skill category animations
        gsap.utils.toArray('.skill-category').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1
            });
        });

        // Certification card animations
        gsap.utils.toArray('.certification-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2
            });
        });

        // Trigger animations on scroll
        ScrollTrigger.create({
            trigger: '.counter-section',
            start: 'top 70%',
            onEnter: animateStats
        });
    } else {
        // Fallback if GSAP not loaded
        window.addEventListener('load', animateStats);
    }

    // Form submission (basic)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. I will get back to you soon!');
            this.reset();
        });
    }
})();