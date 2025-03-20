const home = document.querySelector(".home");

home.addEventListener("click", function(event) {
    window.scrollTo({ top: 0, behavior: "smooth" });
}) 

const about = document.querySelector(".about");

about.addEventListener("click", function(event) {
    window.scrollTo({ top: 500, behavior: "smooth" });
})

const project = document.querySelector(".project");
const projectsText = document.querySelector(".projectsText");

project.addEventListener("click", function(event) {
    projectsText.scrollIntoView({behavior: "smooth" });
})

const contact = document.querySelector(".contact")
const contactMeText = document.querySelector(".contactMeText")
contact.addEventListener("click", function() {
    contactMeText.scrollIntoView({behavior: "smooth"})
})

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