function dummyClick() {
    alert("Sorry, your request is not avaliable yet. We will update it as soon as possible!");
};

function removeLoader(){
    $("#loader").fadeOut(800, function() {
        $("#loader").remove();
    }); 
} 

$(document).ready(function(){

    $(".nav-link, .navbar-brand, .get-started-button").click(function(){
        var sectionTo = $(this).attr('href');
        $('html, body').stop().animate({
          scrollTop: $(sectionTo).offset().top
        }, 2700, 'easeInOutQuart');
    });

    $(window).scroll(function(){
        $('#navbar a').toggleClass('scrolled', $(this).scrollTop() > 700);
        $('nav').toggleClass('scrolled', $(this).scrollTop() > 700);
        $('li a:hover').toggleClass('scrolled', $(this).scrollTop() > 700);
        $('.custom-toggle-icon').toggleClass('scrolled', $(this).scrollTop() > 700);
    });

    $('i').not(".fa-angle-down, .custom-toggle-icon").hover(
        function(){
            $(this).addClass('fa-spin')
        },
        function(){
            $(this).removeClass('fa-spin')
        }
    );

});


