
$(document).ready(function () {
    let texts = ["",
        "Some days are just too long",
        "Some days are just too short",
        "Some days are tiring",
        "Some days are difficult",
        "Some days are bright",
        "Some days are low",
        "Some days are worth remembering",
        "Some days are worth forgetting",
        "Everyday with you is a new journey",
        "I want to share a million more journeys with you everyday ",
        ": ANES Quate :   hating you is a challenge for me but i don't need more challenges so i am loving you .",
        "NOW click the red button ..."
    ];
    let index = 0;

    $("#btn").click(function () {

        index = (index + 1) % texts.length;
        $("#txt").text(texts[index]);
    });


    // $("#btn2").click(function () {

    //    $("#btn2").hide();
    //    $("#btn").hide();
    //    $("#txt").hide();


    // });




});

let info1 = document.getElementById('info1');
let info2 = document.getElementById('info2');
let btn2 = document.getElementById('btn2');

btn2.addEventListener('click', function () {
    info1.style.display = "none";
    info2.style.display = "block";
});




