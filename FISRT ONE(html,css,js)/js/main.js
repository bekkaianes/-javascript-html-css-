// select skills selector

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    // skills ofset top


    let skillsOffsetTop = ourSkills.offsetTop;

    //  skills outer height

    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height

    let windowHeight = this.innerHeight;


    // window scroll top 


    let windowScrollTop = this.pageYOffset;


    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }

}


// create popup with image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // create overlay element

        let overlay = document.createElement("div");
        // add class to overlay

        overlay.className = 'popup-overlay';
        // append overlay to body

        document.body.appendChild(overlay);

        //  create popup 

        let popupBox = document.createElement("div");

        // add class

        popupBox.className = 'popup-box';



        if (img.alt !== null) {
            // create heding

            let imgHeading = document.createElement("h3");

            // create text fr heading

            let imgText = document.createTextNode(img.alt);

            // append the text to heading

            imgHeading.appendChild(imgText);

            //  append the h3 to popupbox

            popupBox.appendChild(imgHeading);



        }

        // create image

        let popupImage = document.createElement("img");


        // set image src


        popupImage.src = img.src;

        // add image to popupbox


        popupBox.appendChild(popupImage);

        // append popup to body 

        document.body.appendChild(popupBox);

        // create close span

        let closeButton = document.createElement("span");

        // create close button

        let closeButtonText = document.createTextNode("X");


        // append text to close button 

        closeButton.appendChild(closeButtonText);


        // add class to close button


        closeButton.className = 'close-button';

        // add close button to the popup box 

        popupBox.appendChild(closeButton);



    });
});

//  CLOSE POPUP

document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {

        e.target.parentNode.remove();

        // remove overlay 
        document.querySelector(".popup-overlay").remove();
    }
});



// scrool from links and from bullets ---------


const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const alllinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(alllinks);


// HANDLE ACTIVE STATE

function handleActive(ev) {
    // remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove(".active");
    });

    // add active class on self
    ev.target.classList.add(".active");
}


//  togle menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");


toggleBtn.onclick = function (e) {
    // stop propagation
    e.stopPropagation();

    // toggle class menu-active on  button 
    this.classList.toggle("menu-active");

    // toggle class "open" on Links

    tLinks.classList.toggle("open");


};

// click anywhere outside l menu and toggle button

document.addEventListener("click", (e) => {


    if (e.target !== toggleBtn && e.target !== tLinks) {

        // check meni is open 

        if (tLinks.classList.contains("open")) {
             // toggle class menu-active on  button 
                    toggleBtn.classList.toggle("menu-active");

                // toggle class "open" on Links

                  tLinks.classList.toggle("open");        
        }
    }
});

//  stop propagation on menu 


tLinks.onclick = function (e) {
    e.stopPropagation();
}