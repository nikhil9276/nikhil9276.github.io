// script.js

document.addEventListener('DOMContentLoaded', () => {
    const typedTextSpan = document.getElementById("typed-text");
    const scrollToTopButton = document.getElementById("scroll-to-top");
    const themeToggleButton = document.getElementById("theme-toggle");
    const currentYearSpan = document.getElementById("current-year");
    const body = document.body;
    const themeIcon = themeToggleButton.querySelector('i'); // Get the icon inside the button

    // --- Set Current Year in Footer ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Typed.js Initialization ---
    if (typedTextSpan) {
        new Typed("#typed-text", {
            strings: [
                "Future Data Analyst",
                "Python Enthusiast",
                "AI Explorer",
                "Data Visualizer",
                "Problem Solver" // Added another title
            ],
            typeSpeed: 70, // Slightly faster
            backSpeed: 50,
            backDelay: 1500,
            startDelay: 500, // Small delay before starting
            loop: true,
            smartBackspace: true // More natural backspacing
        });
    }

    // --- Scroll-to-Top Button Logic ---
    if (scrollToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) { // Show after scrolling down 300px
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        scrollToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- Theme Toggle Logic ---
    if (themeToggleButton) {
        // Function to set theme (updates class, icon, and localStorage)
        const setTheme = (isDark) => {
            body.classList.toggle('dark-theme', isDark);
            themeIcon.classList.toggle('fa-moon', isDark); // Moon icon for dark
            themeIcon.classList.toggle('fa-sun', !isDark); // Sun icon for light
            themeToggleButton.setAttribute('aria-pressed', isDark);
            themeToggleButton.setAttribute('aria-label', isDark ? 'Activate Light Mode' : 'Activate Dark Mode');
            localStorage.setItem('darkMode', isDark); // Store preference
        };

        // Check localStorage for saved preference on load
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Check OS preference
        const savedTheme = localStorage.getItem('darkMode');
        let initialThemeIsDark;

        if (savedTheme !== null) {
            initialThemeIsDark = savedTheme === 'true'; // Use saved preference
        } else {
            initialThemeIsDark = prefersDark; // Use OS preference if no save
        }
        setTheme(initialThemeIsDark); // Set initial theme

        // Toggle theme on button click
        themeToggleButton.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-theme');
            setTheme(!isDarkMode); // Toggle the theme
        });
    }


    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.section-animated, .skill-bar, .project-card');

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Apply animation class for sections and project cards
                if (element.classList.contains('section-animated') || element.classList.contains('project-card')) {
                     // Add staggered delay for project cards using CSS variable
                     if (element.classList.contains('project-card')) {
                        element.style.setProperty('--card-index', index % 3); // Adjust grid columns if needed
                    }
                    element.classList.add('active');
                }
                // Animate skill bars
                else if (element.classList.contains('skill-bar')) {
                    const skillLevel = element.dataset.skill;
                    element.style.width = skillLevel + '%';
                }

                observer.unobserve(element); // Stop observing once animated
            }
        });
    };

    const observerOptions = {
        root: null, // Use the viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Basic Mobile Navigation Toggle (Example) ---
    // This is a placeholder. A real implementation would need more CSS for the menu reveal.
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('header nav ul'); // Get the nav list

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
             // Example: Toggle a class on the nav or header to show/hide the menu
             // document.querySelector('header nav').classList.toggle('mobile-nav-active');
             console.log("Nav toggle clicked - implement menu reveal logic here.");
             // You'd typically add CSS rules for `.mobile-nav-active ul`
        });
    }

}); // End DOMContentLoaded
