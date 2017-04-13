var esTraduccion = function () {
	return $('.selecciona-menu div.active').attr('id') === 'menu-traduccion';
}
var esInterpretacion = function () {
	return $('.selecciona-menu div.active').attr('id') === 'menu-interpretacion';
}
var esCorreccion = function () {
	return $('.selecciona-menu div.active').attr('id') === 'menu-correccion';
}
var esSubtitulado = function () {
	return $('.selecciona-menu div.active').attr('id') === 'menu-subtitulado';
}

var isInvalid = function(formId){
	return !$(formId)[0].checkValidity();
}

$(function() { 
    $("div.presupuestos-content button.send-button").click(function(e){

		var data='subject=NUEVA SOLICITUD DE PRESUPUESTO';

		var name = $('#presupuestos-completa-name').val();
		var tel_fijo = $('#presupuestos-completa-tel-fijo').val();
		var tel_movil = $('#presupuestos-completa-tel-movil').val();
		var email = $('#presupuestos-completa-email').val();

		data = data.concat('&nombre='+name+'&email='+email);
		data = data.concat(tel_fijo ? '&tel_fijo=' + tel_fijo : '');
		data = data.concat(tel_movil ? '&tel_movil=' + tel_movil : '');

		if (esTraduccion()){

			var publica = ['Si', 'No', 'No sé'];

			if(isInvalid('#presupuestos-form')){
				return;
			} else {
				$(this).button('loading');
			}

			data = data.concat('&tipo=Traduccion');

			var tr_idioma_origen = $('#tr_idioma_origen').val();
			var tr_idioma_llegada = $('#tr_idioma_llegada').val(); 
			var tr_cantidad_palabras = $('#tr_cantidad_palabras').val(); 
			var tr_plazo_entrega = $('#tr_plazo_entrega').val(); 
			var tr_formato_entrega = $('#tr_formato_entrega').val(); 
			var tr_es_publica = $('#tr_es_publica').val(); 
			var tr_comentarios = $('#tr_comentarios').val(); 

			data = data.concat('&idioma_origen=' + tr_idioma_origen);
			data = data.concat('&idioma_llegada=' + tr_idioma_llegada);
			data = data.concat('&es_publica=' + publica[tr_es_publica]);

			data = data.concat(tr_cantidad_palabras ? '&cantidad_palabras=' + tr_cantidad_palabras : '');
			data = data.concat(tr_plazo_entrega ? '&plazo_entrega=' + tr_plazo_entrega : '');
			data = data.concat(tr_formato_entrega ? '&formato_entrega=' + tr_formato_entrega : '');
			data = data.concat(tr_comentarios ? '&comentarios=' + tr_comentarios : '');
		}

		if (esInterpretacion()){

			var tipos = ['Consecutiva', 'Simultánea', 'Acompañamiento'];

			if(isInvalid('#presupuestos-form')){
				return;
			} else {
				$(this).button('loading');
			}

			data = data.concat('&tipo=Interpretacion');

			var in_idioma_origen = $('#in_idioma_origen').val();
			var in_idioma_llegada = $('#in_idioma_llegada').val(); 
			var in_fecha_interpretacion = $('#in_fecha_interpretacion').val(); 
			var in_tipo = $('#in_tipo').val(); 
			var in_horas_interpretacion = $('#in_horas_interpretacion').val(); 
			var in_lugar_interpretacion = $('#in_lugar_interpretacion').val(); 
			var in_etiqueta = $('#in_etiqueta').val(); 
			var in_comentarios = $('#in_comentarios').val(); 

			data = data.concat('&idioma_origen=' + in_idioma_origen);
			data = data.concat('&idioma_llegada=' + in_idioma_llegada);
			data = data.concat('&fecha_interpretacion=' + in_fecha_interpretacion);
			data = data.concat('&tipo_interpretacion=' + tipos[in_tipo]);
			data = data.concat('&horas_interpretacion=' + in_horas_interpretacion);
			data = data.concat('&lugar_interpretacion=' + in_lugar_interpretacion);

			data = data.concat(in_etiqueta ? '&etiqueta=' + in_etiqueta : '');
			data = data.concat(in_comentarios ? '&comentarios=' + in_comentarios : '');
		}
		if (esCorreccion()){

			var tipos = ['De estilo','Ortográfica, gramatical y sintáctica','Ortotipográfica','De traducciones'];

			if(isInvalid('#presupuestos-form')){
				return;
			} else {
				$(this).button('loading');
			}

			data = data.concat('&tipo=Correccion');

			var co_idioma = $('#co_idioma').val();
			var co_tipo = $('#co_tipo').val(); 
			var co_formato = $('#co_formato').val(); 
			var co_plazo_entrega = $('#co_plazo_entrega').val(); 
			var co_cantidad = $('#co_cantidad').val(); 
			var co_comentarios = $('#co_comentarios').val(); 

			data = data.concat('&idioma=' + co_idioma);
			data = data.concat('&tipo_correccion=' + tipos[co_tipo]);
			data = data.concat('&formato=' + co_formato);
			data = data.concat('&plazo_entrega=' + co_plazo_entrega);

			data = data.concat(co_cantidad ? '&cantidad=' + co_cantidad : '');
			data = data.concat(co_comentarios ? '&comentarios=' + co_comentarios : '');
		}
		if (esSubtitulado()){

			var tipos = ['Doblaje', 'Subtitulado'];
			var sino = ['','Si', 'No', 'No sé'];
			
			if(isInvalid('#presupuestos-form')){
				return;
			} else {
				$(this).button('loading');
			}

			data = data.concat('&tipo=Subtitulado');

			var su_idioma = $('#su_idioma').val();
			var su_doblaje_o_subt = $('#su_doblaje_o_subt').val(); 
			var su_duracion = $('#su_duracion').val(); 
			var su_sincronizacion = $('#su_sincronizacion').val(); 
			var su_temporizacion = $('#su_temporizacion').val(); 
			var su_plazo_entrega = $('#su_plazo_entrega').val(); 
			var su_cantidad = $('#su_cantidad').val(); 
			var su_formato = $('#su_formato').val(); 
			
			var su_comentarios = $('#su_comentarios').val(); 

			data = data.concat('&idioma=' + su_idioma);
			data = data.concat('&doblaje_o_subt=' + tipos[su_doblaje_o_subt]);
			data = data.concat('&duracion=' + su_duracion);
			data = data.concat('&formato=' + su_formato);
			data = data.concat('&plazo_entrega=' + su_plazo_entrega);

			data = data.concat(su_sincronizacion>0 ? '&sincronizacion=' + sino[su_sincronizacion] : '');
			data = data.concat(su_temporizacion>0 ? '&temporizacion=' + sino[su_temporizacion] : '');
			data = data.concat(su_cantidad ? '&cantidad=' + su_cantidad : '');
			data = data.concat(su_comentarios ? '&comentarios=' + su_comentarios : '');
		}

		e.preventDefault();
		$.ajax({
			type:'POST',
			url: 'php/presupuestos-email-sender.php',
			data: data,
			success: function(e) {
				$("button.send-button").button('reset');
				clearQuotesFields();
				if (hasError(e)){
					$("div.error-message").removeClass('hidden');
					if (e.indexOf("security issue")){
						$("div.error-message2").removeClass('hidden');
					}
				} else {
					$("div.success-message").removeClass('hidden');	
				}
			},
            error: function (textStatus, errorThrown) {
                console.debug("Error getting the data");
            }
		});

    });
}); 

$(function() { 
    $("div.contact-buttons button.send-button").click(function(e){

		var data='subject=NUEVO MENSAJE';

		var name = $('#contacto-nombre').val();
		var tel_fijo = $('#contacto-tel-fijo').val();
		var tel_movil = $('#contacto-tel-movil').val();
		var email = $('#contacto-email').val();

		data = data.concat('&nombre='+name+'&email='+email);
		data = data.concat(tel_fijo ? '&tel_fijo=' + tel_fijo : '');
		data = data.concat(tel_movil ? '&tel_movil=' + tel_movil : '');

		if(isInvalid('#contacto-form')){
			return;
		} else {
			$(this).button('loading');
		}

		var mensaje = $('#contacto_mensaje').val(); 
		data = data.concat(mensaje ? '&mensaje=' + mensaje : '');

		e.preventDefault();
		$.ajax({
			type:'POST',
			url: 'php/contactanos-email-sender.php',
			data: data,
			success: function(e) {
				$("div.contact-buttons button.send-button").button('reset');
				clearContactFields();
				if (hasError(e)){
					$("div.error-message-contactanos").removeClass('hidden');	
				} else {
					$("div.success-message-contactanos").removeClass('hidden');	
				}
			}
		});
    });
});

$(function() { 
    $("div.sumate-buttons button.send-button").click(function(e){

		var data='subject=ALGUIEN QUIERE SUMARSE AL EQUIPO';

		var name = $('#sumate-nombre').val();
		var tel_fijo = $('#sumate-tel-fijo').val();
		var tel_movil = $('#sumate-tel-movil').val();
		var email = $('#sumate-email').val();

		data = data.concat('&nombre='+name+'&email='+email);
		data = data.concat(tel_fijo ? '&tel_fijo=' + tel_fijo : '');
		data = data.concat(tel_movil ? '&tel_movil=' + tel_movil : '');

		if(isInvalid('#sumate-form')){
			return;
		} else {
			$(this).button('loading');
		}

		var profesion = $('#sumate_profesion').val();
		var idiomas = $('#sumate_idioma-trabajo').val();
		var especializacion = $('#sumate_especializacion').val();
		var mensaje = $('#sumate_mensaje').val(); 
		
		data = data.concat(profesion ? '&profesion=' + profesion : '');
		data = data.concat(idiomas ? '&idiomas=' + idiomas : '');
		data = data.concat(especializacion ? '&especializacion=' + especializacion : '');
		data = data.concat(mensaje ? '&mensaje=' + mensaje : '');

		e.preventDefault();
		$.ajax({
			type:'POST',
			url: 'php/sumate-email-sender.php',
			data: data,
			success: function(e) {
				$("button.send-button").button('reset');
				clearTeamFields();
				if (hasError(e)){
					$("div.error-message-sumate").removeClass('hidden');	
					if (e.indexOf("security issue")){
						$("div.error-message2").removeClass('hidden');
					}
				} else {
					$("div.success-message-sumate").removeClass('hidden');	
				}
			}
		});
    });
});

var clearContactFields = function(){
	$('div.contacto-content input, div.contacto-content textarea').val('');
}