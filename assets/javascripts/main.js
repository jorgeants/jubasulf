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
    };

    //Mascarás
    var masks = ['(00)00000-0000', '(00)0000-00000'],
        maskBehavior = function(val, e, field, options) {
        return val.length > 14 ? masks[0] : masks[1];
    };
    $('.telefone').mask(maskBehavior, {onKeyPress: 
        function(val, e, field, options) {
            field.mask(maskBehavior(val, e, field, options), options);
        }
    });
    $('.data').mask('99/99/9999');
    $('.cep').mask('99999-999');
    $('.cpf').mask('000.000.000-00');
    $('.rg').mask('00.000.000-0');

    //Validações
    $("#juba").change(function(){
        if($(this).val()!="JUBASULF"){
            $("#igreja").attr("disabled", "disabled");
        }else{
            $("#igreja").removeAttr("disabled", "disabled");
        }
    });
    $("input[name='estado']").click(function(){
        if($(this).val()!="RJ"){
            $("#cidade").val('');
            $("#cidade").attr("disabled", "disabled");
        }else{
            $("#cidade").removeAttr("disabled", "disabled");
        }
    });
    $("input[name='necessidade_especial']").click(function(){
        if($(this).val()!="Sim"){
            $("textarea[name='necessidades']").val('');
            $("textarea[name='necessidades']").attr("disabled", "disabled");
        }else{
            $("textarea[name='necessidades']").removeAttr("disabled", "disabled");
        }
    });
    $('#transForm').bootstrapValidator({
        fields: {
            senderName: {
                validators: {
                    notEmpty: {
                        message: 'Este campo não pode ficar vazio'
                    },
                }
            },
            senderCPF: {
                validators: {
                    notEmpty: {
                        message: 'Este campo não pode ficar vazio'
                    },
                }
            },
            senderBornDate: {
                validators: {
                    notEmpty: {
                        message: 'Este campo não pode ficar vazio'
                    },
                }
            },
            senderEmail: {
                validators: {
                    notEmpty: {
                        message: 'Este campo não pode ficar vazio'
                    },
                    emailAddress: {
                        message: 'Insira um e-mail válido'
                    }
                }
            },
            telefone: {
                validators: {
                    notEmpty: {
                        message: 'Este campo não pode ficar vazio'
                    },
                }
            }
        }
    });

    var config = {
        apiKey: "AIzaSyBfFlNqnW-0iqc0Y7MTHk8yKRA3XKP5S18",
        authDomain: "project-4129121910130028046.firebaseapp.com",
        databaseURL: "https://project-4129121910130028046.firebaseio.com",
        storageBucket: "project-4129121910130028046.appspot.com",
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $('#transForm').submit(function(event){

        var cpf = $("input[name='senderCPF']").val();
        cpf = cpf.replace(/[^0-9]+/g,'');

        var d = new Date();
        var n = d.getTime();
        
        database.ref('usuarios/'+cpf).set({
            id: n,
            nome: $("input[name='senderName']").val(),
            cpf: $("input[name='senderCPF']").val(),
            data_nascimento: $("input[name='senderBornDate']").val(),
            sexo: $("input[name='sexo']").val(),
            email: $("input[name='senderEmail']").val(),
            telefone: $("input[name='telefone']").val(),
            juba: $( "#juba option:selected" ).val(),
            igreja: $("#igreja option:selected").val(),
            estado: $("input[name='shippingAddressState']:checked").val(),
            cidade: $("#shippingAddressCity option:selected").val(),
            responsavel: $("input[name='responsavel']").val(),
            necessidade: $("textarea[name='necessidades']").val(),
            forma_pagamento: $("input[name='pagamento']:checked").val()
        });

        if($("input[name='pagamento']:checked").val() == 'pagseguro'){

            var telefoneForPS = $("input[name='telefone']").val().replace(/[^0-9]+/g,'');
            var telefoneForPSArea = telefoneForPS.substr(0,2);
            var telefoneForPSPhone = (telefoneForPS>10) ? telefoneForPS.substr(-9) : telefoneForPS.substr(-8);


            $("input[name='senderAreaCode']").val(telefoneForPSArea);
            $("input[name='senderPhone']").val(telefoneForPSPhone);

            $("#transForm").attr('action','https://pagseguro.uol.com.br/v2/checkout/payment.html');
            return true;

        }else{

            if(cpf.length == 11)
                window.location.href = '/transformados8-concluido';

        }

        event.preventDefault();

    });

});
