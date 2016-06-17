$(document).ready(function() {
  
  function getText(element) {
    var ret = '';
    var length = element.childNodes.length;
    for (var i = 0; i < length; i++) {
      var node = element.childNodes[i];
      if (node.nodeType != 8) {
        ret += node.nodeType != 1 ? node.nodeValue : getText(node);
      }
    }
    return ret;
  }

  var config = {
    apiKey: "AIzaSyBfFlNqnW-0iqc0Y7MTHk8yKRA3XKP5S18",
    authDomain: "project-4129121910130028046.firebaseapp.com",
    databaseURL: "https://project-4129121910130028046.firebaseio.com",
    storageBucket: "project-4129121910130028046.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var submitTransForm = function(){

    // var jsonUser = {
    //   name: "",
    //   cpf: "",
    //   data_nascimento: "",
    //   sexo: "",
    //   email: "",
    //   telefone: "",
    //   juba: "",
    //   igreja: "",
    //   estado: "",
    //   cidade: "",
    //   responsavel: "",
    //   necessidade: "",
    //   farma_pagamento: ""
    // }

    var jsonUser = {
      name: "Jorge",
      cpf: "1111",
      data_nascimento: "3232",
      sexo: "M",
      email: "jorgeants@gmail.com",
      telefone: "5345345",
      juba: "sulf",
      igreja: "igreja",
      estado: "RJ",
      cidade: "Volta",
      responsavel: "Eu",
      necessidade: "Sim",
      farma_pagamento: "1"
    }

    database.ref('usuarios/1').set({
      nome: jsonUser.name,
      email: jsonUser.email,
      data_nascimento: jsonUser.data_nascimento,
      sexo: jsonUser.sexo,
    });

  };

  $("#transForm").submit(function(event){
    submitTransForm();
    event.preventDefault();
  });

});
