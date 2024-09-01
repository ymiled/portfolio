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
        strings: ["an engineering student", "a quant enthusiast", "a data enthusiast"], // Add more strings if needed
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
    var container = document.getElementById('page-container'); // Replace with the ID of your container

    var hammer = new Hammer(container);

    hammer.on('swipeleft', function () {
        // Navigate to the next page
        window.location.href = 'next-page.html'; // Replace with your URL or navigation logic
    });

    hammer.on('swiperight', function () {
        // Navigate to the previous page
        window.location.href = 'previous-page.html'; // Replace with your URL or navigation logic
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var startX;
    var startY;
    var threshold = 100; // Minimum distance to detect swipe

    document.addEventListener('touchstart', function (e) {
        var touch = e.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    });

    document.addEventListener('touchend', function (e) {
        var touch = e.changedTouches[0];
        var endX = touch.pageX;
        var endY = touch.pageY;

        var diffX = endX - startX;
        var diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe right
                window.location.href = 'previous-page.html'; // Replace with your URL or navigation logic
            } else {
                // Swipe left
                window.location.href = 'next-page.html'; // Replace with your URL or navigation logic
            }
        }
    });
});

