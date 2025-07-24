document.addEventListener('dblclick', function (e) {
  e.preventDefault();
});

  setTimeout(() => {
    document.querySelector('.all').style.display = "block"; // this will allow scrolling AFTER the first animation
  }, 5500);


document.querySelector('.firstScene').addEventListener('animationend', () => {
  setTimeout(() => {
    document.documentElement.style.overflowY = 'auto';
  }, 1000);
});

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Always scroll to top when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
});


const home = document.querySelector(".home");

home.addEventListener("click", function(event) {
    const startPosition = window.scrollY;
    const targetPosition = 0; // Scroll to the top of the page
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration of the scroll in ms
    let startTime = null;

    // Easing function (ease-in-out)
    function easeInOut(t, b, c, d) {
        let x = t / (d / 2);
        if (x < 1) return (c / 2) * x * x + b;
        x--;
        return (-c / 2) * (x * (x - 2) - 1) + b;
    }

    function animateScroll(time) {
        if (!startTime) startTime = time;
        let progress = time - startTime;
        let scrollY = easeInOut(progress, startPosition, distance, duration);

        window.scrollTo({
            top: scrollY,
            left: 0, // Ensure no horizontal scroll
            behavior: "auto" // Disable the default smooth scroll, as we are animating manually
        });

        if (progress < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
});


const about = document.querySelector(".about");

about.addEventListener("click", function(event) {
    const startPosition = window.scrollY;
    const targetPosition = 500; // Scroll to the top of the page
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration of the scroll in ms
    let startTime = null;

    // Easing function (ease-in-out)
    function easeInOut(t, b, c, d) {
        let x = t / (d / 2);
        if (x < 1) return (c / 2) * x * x + b;
        x--;
        return (-c / 2) * (x * (x - 2) - 1) + b;
    }

    function animateScroll(time) {
        if (!startTime) startTime = time;
        let progress = time - startTime;
        let scrollY = easeInOut(progress, startPosition, distance, duration);

        window.scrollTo({
            top: scrollY,
            left: 0, // Ensure no horizontal scroll
            behavior: "auto" // Disable the default smooth scroll, as we are animating manually
        });

        if (progress < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
});

const project = document.querySelector(".project");
const projectsText = document.querySelector(".projectsText");

project.addEventListener("click", function(event) {
    const startPosition = window.scrollY;
    const rect = projectsText.getBoundingClientRect();
    const targetPosition = rect.top + window.scrollY;  // Calculate position relative to the document
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration of the scroll in ms
    let startTime = null;

    // Easing function (ease-in-out)
    function easeInOut(t, b, c, d) {
        let x = t / (d / 2);
        if (x < 1) return (c / 2) * x * x + b;
        x--;
        return (-c / 2) * (x * (x - 2) - 1) + b;
    }

    function animateScroll(time) {
        if (!startTime) startTime = time;
        let progress = time - startTime;
        let scrollY = easeInOut(progress, startPosition, distance, duration);

        window.scrollTo({
            top: scrollY,
            left: 0, // Ensure no horizontal scroll
            behavior: "auto" // Disable the default smooth scroll, as we are animating manually
        });

        if (progress < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
});


const contact = document.querySelector(".contact");

contact.addEventListener("click", function() {
    // Get the position of the target element relative to the document
    const rect = getInTouch.getBoundingClientRect();
    const targetPosition = rect.top + window.scrollY;  // Add scrollY to get position in document

    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration of the scroll in ms
    let startTime = null;

    // Easing function (ease-in-out)
    function easeInOut(t, b, c, d) {
        let x = t / (d / 2);
        if (x < 1) return (c / 2) * x * x + b;
        x--;
        return (-c / 2) * (x * (x - 2) - 1) + b;
    }

    function animateScroll(time) {
        if (!startTime) startTime = time;
        let progress = time - startTime;
        let scrollY = easeInOut(progress, startPosition, distance, duration);

        window.scrollTo({
            top: scrollY,
            left: 0, // Ensure no horizontal scroll
            behavior: "auto" // Disable the default smooth scroll, as we are animating manually
        });

        if (progress < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
});


const header = document.querySelector(".header")
const menuBtn = document.querySelector(".menuBtn")
const buttonClass = document.querySelectorAll(".button")
const menuContainer = document.querySelector(".menuContainer")

menuBtn.addEventListener("click", function() {
    const currentVisibility = getComputedStyle(menuContainer).visibility;

    if (currentVisibility === "hidden") {
        menuContainer.style.visibility = "visible";
        buttonClass.forEach(btn => {
            btn.style.display = "block";
        });

    } else {
        menuContainer.style.visibility = "hidden";
        buttonClass.forEach(btn => {
            btn.style.display = "none";
        });
    }

    buttonClass.forEach(btn => {
        btn.addEventListener("click", function() {
            menuContainer.style.visibility = "hidden";

            // Disable the button for 1 second
            menuBtn.disabled = true;
                setTimeout(() => {
                    menuBtn.disabled = false; // re-enable after 1 second
                }, 1000);

            buttonClass.forEach(btn => {
                btn.style.display = "none";
            });
        });
    });

});
const explore = document.querySelector(".explore");

explore.addEventListener("click", function(event) {
    window.scrollTo({ top: 500, behavior: "smooth" });
})

const aboutMeText = document.querySelector(".aboutMeText");

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity');
        }
        else {
            entry.target.classList.remove('opacity');
        }
    });
}, {
    threshold: 0.4
})

observer2.observe(aboutMeText);

const aboutMe = document.querySelectorAll(".about-me_1");

const observer3 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aboutMeAnimation');
        }
        else {
            entry.target.classList.remove('aboutMeAnimation');
        }
    });
}, {
    threshold: 0.4
});

aboutMe.forEach(element => observer3.observe(element));


const containerImages = document.querySelectorAll(".containerImages");

const observer4 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animationForProjects');
        }
    });
}, {
    threshold: 0.4
});

containerImages.forEach(element => observer4.observe(element));

const myProjectText = document.querySelector(".myProjectText");
const projectP = document.querySelector(".projectP");

const observer6 = new IntersectionObserver((entries) => {   
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity');
            projectsText.classList.add('opacity');
            myProjectText.classList.add('opacityMyProject');
        }
        else {
            entry.target.classList.remove('opacity');
            projectsText.classList.remove('opacity');
            myProjectText.classList.remove('opacityMyProject');
        }
    });
}, {
    threshold: 0.4
});

observer6.observe(projectP);

const getInTouch = document.querySelector(".getInTouch");
const containerContact = document.querySelector(".containerContact");

const observer7 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            containerContact.classList.add('opacityContact');
        }
    });
}, {
    threshold: 0.5
});

observer7.observe(getInTouch);

const computerDiv = document.querySelector(".computerDiv");

const observer8 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            computerDiv.classList.add('opacity');
        }
    });
}, {
    threshold: 0.5
});

observer8.observe(computerDiv);

const nodeDiv = document.querySelector(".nodeDiv");

const observer9 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            nodeDiv.classList.add('opacity');
        }
    });
}, {
    threshold: 0.5
});

observer9.observe(nodeDiv);