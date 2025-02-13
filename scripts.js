// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Back-to-top button functionality
const backToTopButton = document.getElementById('back-to-top');

function toggleBackToTopButton() {
    if (window.scrollY > 200) { // Show button if scrolled more than 200px
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
}

window.addEventListener('scroll', toggleBackToTopButton);

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typing effect initialization
document.addEventListener('DOMContentLoaded', function() {
    new Typed('.typing-text', {
        strings: ["an engineering student", "a ML enthusiast", "a data enthusiast"], // Add more strings if needed
        loop: true, // Loop through the strings indefinitely
        typeSpeed: 55, // Speed of typing
        backSpeed: 35, // Speed of backspacing
        startDelay: 500, // Delay before typing starts
        backDelay: 1500, // Delay before backspacing starts
        cursorChar: '|', // Customize cursor character
        showCursor: true, // Show the blinking cursor
        loopCount: Infinity, // Loop infinitely
        smartBackspace: true, // This will only backspace what doesn't match the previous string
    });

    // Dark mode initialization
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }

    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('page-container');

    var hammer = new Hammer(container);

    // Page mapping
    var pageMapping = {
        'index.html': { next: 'projects.html', previous: 'index.html' },
        'projects.html': { next: 'experience.html', previous: 'index.html' },
        'experience.html': { next: 'projects.html', previous: 'resume.html' },
        'resume.html': { next: 'resume.html', previous: 'experience.html' },
    };

    // Get the current page from the URL
    var currentPage = window.location.pathname.split('/').pop(); // Get the current page file name

    // Determine the next and previous pages based on the mapping
    var nextPage = pageMapping[currentPage] ? pageMapping[currentPage].next : 'default-next.html';
    var previousPage = pageMapping[currentPage] ? pageMapping[currentPage].previous : 'default-previous.html';

    hammer.on('swipeleft', function () {
        // Navigate to the next page
        window.location.href = nextPage;
    });

    hammer.on('swiperight', function () {
        // Navigate to the previous page
        window.location.href = previousPage;
    });
});