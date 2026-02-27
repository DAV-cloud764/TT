 // Initialize Lucide icons
        lucide.createIcons();

        // ============================================
        // IMPORTANT: Set your start date here!
        // Format: 'YYYY-MM-DD'
        // ============================================
        const START_DATE = '2024-01-14'; // <-- CHANGE THIS TO YOUR DATE

        // Days Counter with Animation
        function calculateDays() {
            const startDate = new Date(START_DATE);
            const today = new Date();
            const diffTime = Math.abs(today - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }

        function animateCounter() {
            const counter = document.getElementById('daysCounter');
            const targetDays = calculateDays();
            let currentDays = 0;
            const duration = 2000; // 2 seconds
            const increment = targetDays / (duration / 16); // 60fps

            const timer = setInterval(() => {
                currentDays += increment;
                if (currentDays >= targetDays) {
                    counter.textContent = targetDays;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(currentDays);
                }
            }, 16);
        }

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeText = document.getElementById('themeText');
        const html = document.documentElement;

        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme') || 'day';
        html.setAttribute('data-theme', currentTheme);
        themeText.textContent = currentTheme === 'night' ? 'Night Mode' : 'Day Mode';

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'day' ? 'night' : 'day';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeText.textContent = newTheme === 'night' ? 'Night Mode' : 'Day Mode';
        });

        // Carousel
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-image');
        const dotsContainer = document.getElementById('carouselDots');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carousel-dot');

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-advance carousel every 5 seconds
        setInterval(nextSlide, 5000);

        // Initialize counter animation on page load
        window.addEventListener('load', () => {
            animateCounter();
        });