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
