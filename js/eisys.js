var alreadyTranslated = false;

$(function() {
    
});

var goToTop = function(){
    $(window).scrollTop(0);
}

var selectKnowUsTab = function(){
    $('.conocenos-content').addClass('hidden');
    $('.conocenos-menu li').removeClass('active');

    switch(localStorage.getItem("letsKnowUsTab")){
        case("1"):
            $('.conocenos-menu li:nth-child(1)').addClass('active');
            $('.conocenos-content.about').removeClass('hidden');
            break;
        case("2"):
            $('.conocenos-menu li:nth-child(2)').addClass('active');
            $('.conocenos-content.philosophy').removeClass('hidden');
            break;
        case("3"):
            $('.conocenos-menu li:nth-child(3)').addClass('active');
            $('.conocenos-content.background').removeClass('hidden');
            break;
        case("4"):
            $('.conocenos-menu li:nth-child(3)').addClass('active');
            $('.conocenos-content.working').removeClass('hidden');
            break;
        case("5"):
            $('.conocenos-menu li:nth-child(3)').addClass('active');
            $('.conocenos-content.allies').removeClass('hidden');
            break;
        default:
            $('.conocenos-menu li:nth-child(1)').addClass('active');
            $('.conocenos-content.about').removeClass('hidden');
    }
}

$(function() {
    $("#header").load("header.html", function() {
        headerBehavior();
    });
});

$(function() {
    $("#footer").load("footer.html", function() {});
});

var goToContactus = function(){
    window.location = "contactanos.html";
}

var goToHome = function(){
    window.location = "index.html";
}

var goToServices = function(){
    window.location = "servicios.html";
}

var goToKnowUs = function(){
    window.location = "conocenos.html";
}

$(function() {
    translate();
});

var translate = function(){
    if (!localStorage.getItem("lang") || !aLangKeys[localStorage.getItem('lang')]){
        localStorage.setItem("lang", "es");
    }

    $('.tr').each(function(i) {
        $(this).text(aLangKeys[localStorage.getItem("lang")][$(this).attr('key')]);
    });

    $('.tr-as-html').each(function(i) {
        $(this).html(aLangKeys[localStorage.getItem("lang")][$(this).attr('key')]);
    });
};

var translateBehavior = function(){

    translate();

    $('li.language').click(function(e) {
        var lang2 = $(this).attr('id'); // obtain language id
        localStorage.setItem("lang", lang2);

        translate();
        onChooseLanguage(e);
    });
};

var translateFromHeaderBehavior = function () {
    translate();
}

var headerBehavior = function() {

    $('.language-dropdown').click(function() {
        $('.language-dropdown').toggleClass('closed');
        $('.language-dropdown').toggleClass('opened');
    });

    $('.language-dropdown').focusout(function(){
        $('.language-dropdown').removeClass('opened');
        $('.language-dropdown').addClass('closed');
    });

    translateFromHeaderBehavior();

    if (localStorage.getItem("lang")){
        if (localStorage.getItem("lang") === 'es'){
            $('#ddLang').text('ENGLISH');
            $('#ddCurrentLang').text('ESPAÑOL');        
        } else {
            $('#ddLang').text('ESPAÑOL');
            $('#ddCurrentLang').text('ENGLISH');
        }
    }
    
    $('#ddLang').click(function(){
        if ($('.language-dropdown').hasClass('opened')){
            var newSelected = $(this).text();
            var lang3 = newSelected.substring(0,2).toLowerCase();
            localStorage.setItem("lang", lang3);
            translate();

            var previousSelected = $('#ddCurrentLang').text();
            $(this).text(previousSelected)
            $('#ddCurrentLang').text(newSelected);
        }
    });
};

var changeButtonImgAndClick = function(){
    if ($(".menu-button").hasClass("menu-button-close")){

        $(".navbar .container").addClass("open");
        $(".navbar .container").removeClass("close");
  
        $(".menu-button").removeClass("menu-button-close");
        $(".menu-button").addClass("menu-button-open");
    } else {
        $(".navbar .container").removeClass("open");
        $(".navbar .container").addClass("close");

        $(".menu-button").removeClass("menu-button-open");
        $(".menu-button").addClass("menu-button-close");
    }
};

var onChooseLanguage = function(e){
    e.preventDefault();
    $(".navbar-toggle").toggleClass("open");
    $(".navbar-collapse").toggleClass("in");
    changeButtonImgAndClick();
};

var menuBehavior = function(active) {

    translateBehavior();

    $('.main ul.nav > li').removeClass('active');
    $(active).addClass('active');

};

/* END HEADER AND MENU */

$(function() {
    $(".conocenos-menu div a").click(function() {
        if (this.parentElement.className !== "active"){
            
            $('.conocenos-content').addClass('hidden');
            $('.conocenos-menu li').removeClass('active');
            $(this.parentElement).addClass('active');

            switch(this.attributes.key.value){
                case('nav.know.us.about'):
                    localStorage.setItem("letsKnowUsTab", 1);
                    $('.conocenos-content.about').removeClass('hidden');
                    break;
                case('nav.know.us.philosophy'):
                    localStorage.setItem("letsKnowUsTab", 2);
                    $('.conocenos-content.philosophy').removeClass('hidden');
                    break;
                case('nav.know.us.background'):
                    localStorage.setItem("letsKnowUsTab", 3);
                    $('.conocenos-content.background').removeClass('hidden');
                    break;
                case('nav.know.us.working'):
                    localStorage.setItem("letsKnowUsTab", 4);
                    $('.conocenos-content.working').removeClass('hidden');
                    break;
                case('nav.know.us.allies'):
                    localStorage.setItem("letsKnowUsTab", 5);
                    $('.conocenos-content.allies').removeClass('hidden');
                    break;
                default:
                    break;
            }
        }
    });
});

var hasError = function(e){
    return e.indexOf("Error") > 0 ||
           e.indexOf("error") > 0 || 
           e.indexOf("errno") > 0 || 
           e.indexOf("ndefined") > 0
}