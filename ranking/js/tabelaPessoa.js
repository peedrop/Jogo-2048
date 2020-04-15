$(document).ready(function () {

    pessoas = JSON.parse(localStorage.getItem('dadosjogo'));

    //https://datatables.net/plug-ins/i18n/Portuguese-Brasil
    $('#tabelaPessoa').DataTable({

        //exemplo adaptado: https://datatables.net/examples/advanced_init/footer_callback.html
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove formatação (R$) quando for o caso
            //Operadores == e ===  https://www.devmedia.com.br/javascript-como-e-quando-utilizar-os-operadores-e/37782
            var somarColuna = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\R$,]/g, '') * 1 :
                    typeof i === 'number' ?
                    i : 0;
            };

            totalPontuacao = api
                .column(1, {
                    page: 'current'
                })
                .data()
                .reduce(function (a, b) {
                        return somarColuna(a) + somarColuna(b);
                    },
                    0
                );

            // atualizar footer da tabela
            $(api.column(1).footer()).html(totalPontuacao);
        },

        "oLanguage": {
            "sProcessing": "Processando...",
            "sLengthMenu": "Mostrar _MENU_",
            "sZeroRecords": "N&atilde;o foram encontrados resultados",
            "sInfo": "Mostrando de _START_ at&eacute; _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando de 0 at&eacute; 0 de 0 registros",
            "sInfoFiltered": "(filtrado de _MAX_ registros no total)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "Primeiro",
                "sPrevious": "Anterior",
                "sNext": "Seguinte",
                "sLast": "&Uacute;ltimo"
            }
        },
        "aaData": pessoas,
        "aoColumns": [
            {
                "data": "usuario"
            },
            {
                "data": "pontuacao"
            },
            {
                "data": "total_min"
            },
            {
                "data": "total_seg"
            }
		]
    });

    var tabelaPessoa = $('#tabelaPessoa').DataTable();

        

    $('#botaoNovo').on('click', function (e) {
       

        $(location).attr('href', '../html/2048.html');
    });

    $('select').material_select();

});
