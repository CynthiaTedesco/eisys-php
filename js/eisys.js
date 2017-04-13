var alreadyTranslated = false;

$(function() {
    
});

var selectLetsKnowUsTab = function(){
    $('.conocenos-content').addClass('hidden');
    $('.conocenos-menu div').removeClass('active');

    switch(localStorage.getItem("letsKnowUsTab")){
        case("1"):
            $('.conocenos-menu div:nth-child(1)').addClass('active');
            $('.conocenos-content.acerca-de').removeClass('hidden');
            break;
        case("2"):
            $('.conocenos-menu div:nth-child(2)').addClass('active');
            $('.conocenos-content.trayectoria').removeClass('hidden');
            break;
        case("3"):
            $('.conocenos-menu div:nth-child(3)').addClass('active');
            $('.conocenos-content.forma-de-trabajo').removeClass('hidden');
            break;
        default:
            $('.conocenos-menu div:nth-child(1)').addClass('active');
            $('.conocenos-content.acerca-de').removeClass('hidden');
    }
}

var selectServicesTab = function(){
    $('.servicios-content').addClass('hidden');
    $('.servicios-menu div').removeClass('active');

    switch(localStorage.getItem("servicesTab")){
        case("1"):
            $('.servicios-menu div:nth-child(1)').addClass('active');
            $('.servicios-main-content div:nth-child(1)').removeClass('hidden');
            break;
        case("2"):
            $('.servicios-menu div:nth-child(3)').addClass('active');
            $('.servicios-main-content div:nth-child(2)').removeClass('hidden');
            break;
        case("3"):
            $('.servicios-menu div:nth-child(2)').addClass('active');
            $('.servicios-main-content div:nth-child(3)').removeClass('hidden');
            break;
        case("4"):
            $('.servicios-menu div:nth-child(4)').addClass('active');
            $('.servicios-main-content div:nth-child(4)').removeClass('hidden');
            break;
        default:
            $('.servicios-menu div:nth-child(1)').addClass('active');
            $('.servicios-main-content div:nth-child(1)').removeClass('hidden');
    }
    $('.servicios-menu div.active .servicios-menu-flecha').attr('src', 'images/servicios/servicios-flecha-on.png');
}

var selectSpecialityTab = function(){
    $('.especializaciones-items').addClass('hidden');
    $('.especializaciones-menu div').removeClass('active');

    switch(localStorage.getItem("specialityTab")){
        case("1"):
            $('.especializaciones-menu div:nth-child(1)').addClass('active');
            $('.especializaciones-content ul:nth-child(1)').removeClass('hidden');
            break;
        case("2"):
            $('.especializaciones-menu div:nth-child(2)').addClass('active');
            $('.especializaciones-content ul:nth-child(1)').removeClass('hidden');
            break;
        case("3"):
            $('.especializaciones-menu div:nth-child(3)').addClass('active');
            $('.especializaciones-content ul:nth-child(1)').removeClass('hidden');
            break;
        case("4"):
            $('.especializaciones-menu div:nth-child(4)').addClass('active');
            $('.especializaciones-content ul:nth-child(1)').removeClass('hidden');
            break;
        case("5"):
            $('.especializaciones-menu div:nth-child(5)').addClass('active');
            $('.especializaciones-content ul:nth-child(1)').removeClass('hidden');
            break;
        case("6"):
            $('.especializaciones-menu div:nth-child(6)').addClass('active');
            $('.especializaciones-content ul:nth-child(1)').removeClass('hidden');
            break;
        case("7"):
            $('.especializaciones-menu div:nth-child(7)').addClass('active');
            $('.especializaciones-content ul:nth-child(1)').removeClass('hidden');
            break;            
        default:
            $('.especializaciones-menu div:nth-child(1)').addClass('active');
            $('.especializaciones-content ul:nth-child(1)').removeClass('hidden');
    }
}

$(function() {
    $("#header").load("header.html", function() {
        headerBehavior();
    });
});

$(function() {
    $("#footer").load("footer.html", function() {
        footerBehavior();
    });
});

var goToContactus = function(){
    window.location = "contactanos.html";
}

var goToJoinUs = function(){
    window.location = "sumate.html";
}

var goToHome = function(){
    window.location = "index.html";
}

var goToServices = function(){
    window.location = "servicios.html";
}

var goToSpecializations = function(){
    window.location = "especializaciones.html";
}

var goToKnowUs = function(){
    window.location = "conocenos.html";
}

var goToQuotes = function(){
    window.location = "presupuestos.html";
}

$(function() {
    translate();
});

$(function() {
    $("#radio-facebook").click(function() {
        window.open('https://www.facebook.com/EntredichosOK', '_blank');
    });
    $("#radio-twitter").click(function() {
        window.open('https://www.twitter.com/EntredichosOK', '_blank');
    });
    $("#radio-youtube-logo").click(function() {
        window.open('https://www.youtube.com/channel/UC0k7cSxwAvvKRUrwhC3bjQA', '_blank');
    });
    $("#radio-cienradios-logo").click(function() {
        window.open('http://ar.cienradios.com/player/palermo_fm939/', '_blank');
    });
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

    var langg = localStorage.getItem("lang");
    $('.tooltip1').prop('title', aLangKeys[langg]['tooltip']);

    if (langg === 'es'){
        $('#seguinos').attr("src", "../images/seguinosenlasredes.png");
        $('.presu-completa').attr("src", "../images/presupuestos/presu-titulo1.png");
        $('.presu-selecciona').attr("src", '../images/presupuestos/presu-titulo2.png');
    } else if (langg === 'en'){
        $('#seguinos').attr("src", "../images/seguinosenlasredes-eng.png");
        $('.presu-completa').attr("src", "../images/presupuestos/presu-titulo1-eng.png");
        $('.presu-selecciona').attr("src", '../images/presupuestos/presu-titulo2-eng.png');
    }
    
    $(".language").removeClass("selected-language");
    $("ul.nav li#"+langg).addClass("selected-language");

    $(".hidden-en").css('display', (langg === 'en') ? 'none' : 'block');
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

    $("#facebook").click(function() {
        window.open('https://www.facebook.com/LexarTD', '_blank');
    });

    $("#twitter").click(function() {
        window.open('https://twitter.com/LexarTD', '_blank');
    });

    $("#linkedin").click(function() {
        window.open('https://www.linkedin.com/company/lexar', '_blank');
    });

    $("#main-logo").click(function() {
        $('ul.nav > li').removeClass('active');
        $('#menu-inicio').addClass('active');
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

    $('ul.nav > li').removeClass('active');
    $(active).addClass('active');

};

/* END HEADER AND MENU */

/* FOOTER */
var footerBehavior = function() {
    $("#facebook-footer").click(function() {
        window.open('https://www.facebook.com/LexarTD', '_blank');
    });

    $("#twitter-footer").click(function() {
        window.open('https://twitter.com/LexarTD', '_blank');
    });

    $("#linkedin-footer").click(function() {
        window.open('https://www.linkedin.com/company/lexar', '_blank');
    });

};

/* END FOOTER */

var homeBehavior = function() {};

$(function() {
    $(".conocenos-menu div a").click(function() {
        if (this.parentElement.className !== "active"){
            
            $('.conocenos-content').addClass('hidden');
            $('.conocenos-menu div').removeClass('active');
            $(this.parentElement).addClass('active');

            switch(this.attributes.key.value){
                case('acerca-de'):
                    localStorage.setItem("letsKnowUsTab", 1);
                    $('.conocenos-content.acerca-de').removeClass('hidden');
                    break;
                case('trayectoria'):
                    localStorage.setItem("letsKnowUsTab", 2);
                    $('.conocenos-content.trayectoria').removeClass('hidden');
                    break;
                case('forma-de-trabajo'):
                    localStorage.setItem("letsKnowUsTab", 3);
                    $('.conocenos-content.forma-de-trabajo').removeClass('hidden');
                    break;
            }
        }
    });
});

//manual image-changing to work with mozilla
$(function() {
    if ($(window).width() < 750){
        $('.conocenos-content .footer-aboutus img').attr('src', 'images/conocenos/acercade-back-filosofia-responsive.jpg');
    } else {
        $('.conocenos-content .footer-aboutus img').attr('src', 'images/conocenos/acercade-back-filosofia.jpg');
    }

    $('.servicios-menu div').mouseover(function() {
        $(this.children[3]).attr('src', 'images/servicios/servicios-flecha-over.png');
    });

    $(".servicios-menu div").mouseleave(function() {
        if ($(this).hasClass('active')){
            $(this.children[3]).attr('src', 'images/servicios/servicios-flecha-on.png');
        } else {
            $(this.children[3]).attr('src', 'images/servicios/servicios-flecha-off.png');
        }
    });

    $('.servicios-menu div:nth-child(1)').mouseover(function() {
        $("#traduccion-menu").attr('src', 'images/servicios/servicios-lapiz-traduccion-over.png');
    });
    $(".servicios-menu div:nth-child(1)").mouseleave(function() {
        $("#traduccion-menu").attr('src', 'images/servicios/servicios-lapiz-traduccion.png');
    });

    $('.servicios-menu div:nth-child(2)').mouseover(function() {
        $("#interpretacion-menu").attr('src', 'images/servicios/servicios-lapiz-interp-over.png');
    });
    $(".servicios-menu div:nth-child(2)").mouseleave(function() {
        $("#interpretacion-menu").attr('src', 'images/servicios/servicios-lapiz-interp.png');
    });

    $('.servicios-menu div:nth-child(3)').mouseover(function() {
        $("#correccion-menu").attr('src', 'images/servicios/servicios-lapiz-correccion-over.png');
    });
    $(".servicios-menu div:nth-child(3)").mouseleave(function() {
        $("#correccion-menu").attr('src', 'images/servicios/servicios-lapiz-correccion.png');
    });

    $('.servicios-menu div:nth-child(4)').mouseover(function() {
        $("#subtitulado-menu").attr('src', 'images/servicios/servicios-lapiz-subtitulado-over.png');
    });
    $(".servicios-menu div:nth-child(4)").mouseleave(function() {
        $("#subtitulado-menu").attr('src', 'images/servicios/servicios-lapiz-subtitulado.png');
    });
});

$(function() {
    $(".servicios-menu div").click(function() {
        if (this.className !== "active"){
            
            $('.servicios-content').addClass('hidden');
            $('.servicios-menu div').removeClass('active');
            $(this).addClass('active');
            $('.servicios-menu div .servicios-menu-flecha').attr('src', 'images/servicios/servicios-flecha-off.png');
            switch(this.firstElementChild.attributes.key.value){
                case('servicios-traduccion-menu'):
                    localStorage.setItem("servicesTab", 1);
                    $('.servicios-content.traduccion').removeClass('hidden');
                    break;
                case('servicios-correccion-menu'):
                    localStorage.setItem("servicesTab", 2);
                    $('.servicios-content.correccion').removeClass('hidden');
                    break;
                case('servicios-interpretacion-menu'):
                    localStorage.setItem("servicesTab", 3);
                    $('.servicios-content.interpretacion').removeClass('hidden');
                    break;
                case('servicios-subtitulado-menu'):
                    localStorage.setItem("servicesTab", 4);
                    $('.servicios-content.subtitulado').removeClass('hidden');
                    break;
            }
            $('.servicios-menu div.active .servicios-menu-flecha').attr('src', 'images/servicios/servicios-flecha-on.png');
        }
    });
});

$(function() {
    $(".especializaciones-menu div").click(function() {
        if (this.className !== "active"){
            
            $('.especializaciones-items').addClass('hidden');
            $('.especializaciones-menu div').removeClass('active');
            $(this).addClass('active');

            switch(this.firstElementChild.attributes.key.value){
                case('especializaciones-juridicas'):
                    localStorage.setItem("specialityTab", 1);
                    $('.especializaciones-content ul.juridicas').removeClass('hidden');
                    break;
                case('especializaciones-finanzas'):
                    localStorage.setItem("specialityTab", 2);
                    $('.especializaciones-content ul.finanzas').removeClass('hidden');
                    break;
                case('especializaciones-politica'):
                    localStorage.setItem("specialityTab", 3);
                    $('.especializaciones-content ul.politica').removeClass('hidden');
                    break;
                case('especializaciones-frutos'):
                    localStorage.setItem("specialityTab", 4);
                    $('.especializaciones-content ul.frutos').removeClass('hidden');
                    break;
                case('especializaciones-inmobiliario'):
                    localStorage.setItem("specialityTab", 5);
                    $('.especializaciones-content ul.inmobiliario').removeClass('hidden');
                    break;
                case('especializaciones-it'):
                    localStorage.setItem("specialityTab", 6);
                    $('.especializaciones-content ul.it').removeClass('hidden');
                    break;
                case('especializaciones-rrhh'):
                    localStorage.setItem("specialityTab", 7);
                    $('.especializaciones-content ul.rrhh').removeClass('hidden');
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

var clearQuotesFields = function(){
    $('.presupuestos-content.selecciona input, .presupuestos-content.selecciona textarea').val('');
    $.post("php/clearUploads.php");
    $('.file-upload-statusbar').hide();
};

var clearTeamFields = function(){
    $('#sumate-form input, #sumate-form textarea').val('');
    $.post("php/clearUploads.php");
    $('.file-upload-statusbar').hide();
}

$(function() {
    $(".selecciona-menu div").click(function() {
        if (this.className !== "active"){
            
            clearQuotesFields();
            $('.selecciona-content>div').addClass('hidden');
            $('.selecciona-menu div').removeClass('active');
            $(this).addClass('active');

            switch(this.firstElementChild.attributes.key.value){
                case('seleccion-traduccion'):
                    $('.selecciona-content div.traduccion-form').removeClass('hidden');
                    break;
                case('seleccion-correccion'):
                    $('.selecciona-content div.correccion-form').removeClass('hidden');
                    break;
                case('seleccion-interpretacion'):
                    $('.selecciona-content div.interpretacion-form').removeClass('hidden');
                    break;
                case('seleccion-subtitulado'):
                    $('.selecciona-content div.subtitulado-form').removeClass('hidden');
                    break;
            }

            $('.selecciona-content>div input.required-if-visible').prop('required',true);
            $('.selecciona-content>div textarea.required-if-visible').prop('required',true);
            
            $('.selecciona-content>div:hidden input.required-if-visible').prop('required',false);
            $('.selecciona-content>div:hidden textarea.required-if-visible').prop('required',false);
        }
    });
});