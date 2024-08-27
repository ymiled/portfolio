document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


    // Get the button element
    const backToTopButton = document.getElementById('back-to-top');

    // Function to show or hide the button based on scroll position
    function toggleBackToTopButton() {
        if (window.scrollY > 200) { // Show button if scrolled more than 200px
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }

    // Add event listener for scrolling
    window.addEventListener('scroll', toggleBackToTopButton);

    // Scroll to top function
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });



function toggleMode() {
    document.body.classList.toggle('light-mode');
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkmode-toggle');
    const body = document.body;

    // Check the stored mode and apply it
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        toggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        toggle.checked = false;
    }

    // Toggle dark mode on click
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});


// Typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed('.typing-text', {
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
});

