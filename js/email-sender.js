var isInvalid = function(formId){
	return !$(formId)[0].checkValidity();
}

$(function() { 
    $("button.send-button").click(function(e){

        if(isInvalid('#form')){
            return;
        } else {
            $(this).button('loading');
        }

        var data='subject=Eisys web message';

		var name = $('#name').val();
		var company = $('#company').val();
		var position = $('#position').val();
        var phone = $('#phone').val();
        var cellphone = $('#cellphone').val();
        var email = $('#email').val();

		data = data.concat('&name='+name+'&email='+email);
		data = data.concat(company ? '&company=' + company : '');
		data = data.concat(position ? '&position=' + position : '');
        data = data.concat(phone ? '&phone=' + phone : '');
        data = data.concat(cellphone ? '&cellphone=' + cellphone : '');

		var message = $('#comments').val();
        message = message.replace(new RegExp(String.fromCharCode(10), 'g'), '<br/>');
        message = message.replace(new RegExp(String.fromCharCode(13), 'g'), '<br/>');
		data = data.concat(message ? '&message=' + message : '');

		e.preventDefault();
		$.ajax({
			type:'POST',
			url: 'php/email-sender.php',
			data: data,
			success: function(e) {
				$("button.send-button").button('reset');
				clearContactFields();
				if (hasError(e)){
					$("div.error-message").removeClass('hidden');
				} else {
					$("div.success-message").removeClass('hidden');
				}
			}
		});
    });
});

var clearContactFields = function(){
	$('form input, form textarea').val('');
}