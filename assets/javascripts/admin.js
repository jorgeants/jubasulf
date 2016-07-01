//$(document).ready(function() {

	var config = {
	    apiKey: "AIzaSyBfFlNqnW-0iqc0Y7MTHk8yKRA3XKP5S18",
	    authDomain: "project-4129121910130028046.firebaseapp.com",
	    databaseURL: "https://project-4129121910130028046.firebaseio.com",
	    storageBucket: "project-4129121910130028046.appspot.com",
	};
	firebase.initializeApp(config);

	firebase.database().ref('usuarios').once('value').then(function(usuarios) {

		usuarios = $.map(usuarios.val(), function(el) {return el;});

		var tr;
		for(var i = 0, total = usuarios.length; i < total;i++){
			//console.log(usuarios[i]);
			tr = tr + "<tr>";
				tr += "<td>"+usuarios[i].nome+"</td>";
				tr += "<td>"+usuarios[i].cpf+"</td>";
				tr += "<td>"+usuarios[i].email+"</td>";
				tr += "<td>"+usuarios[i].data_nascimento+"</td>";
				tr += "<td>"+usuarios[i].igreja+"</td>";
				tr += "<td>"+usuarios[i].telefone+"</td>";
				tr += "<td>"+usuarios[i].forma_pagamento+"</td>";
			tr = tr + "</tr>";
		}

		$(".table").append("<tbody>"+tr+"</tbody>");

	});

//});