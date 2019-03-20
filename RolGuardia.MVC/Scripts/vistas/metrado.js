var rolGuardia = rolGuardia || {};
rolGuardia.metrado = {};

function llenarTabla()
    {
    rolGuardia.metrado.tabla = $("#tblMetrado").DataTable({
        "responsive": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
            // "async": false,
            "url": "/Metrado/obtenerMetrado",
            "type": "POST",
            "dataType": "JSON"
        },
        "searching": true,
        "lengthChange": false,
        "pageLength": 8,
        "destroy": true,
        "retrieve": true,
        "info": true,
        // order: [[1, 'asc']],
        "columnDefs": [
            {
                "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8],
                "orderable": false,
                "class": "text-nowrap"
            },
            {
                "targets": [5],
                "orderable": false,
                "class": "text-nowrap",
                "render": function (url, type, full) {
                    return rolGuardia.utilities.convertiFecha(full.FechaRegistro);
                }
            },
            {
                "targets": [6],
                "orderable": false,
                "class": "text-nowrap",
                "render": function (url, type, full) {
                    return rolGuardia.utilities.convertiFecha(full.FechaRegistro);
                }
            }
        ],
        // 'select': {
        //     'style': 'single'
        // },
        "columns":
            [
                {
                    data: "IdMetrado",
                    name: "IdMetrado",
                    class: "text-nowrap text-center"
                },
                {
                    data: "IdMilestone",
                    name: "IdMilestone",
                    class: "text-nowrap text-center"
                },
                {
                    data: "IdEstado",
                    name: "IdEstado",
                    class: "text-nowrap text-center"
                },
                {
                    data: "IdUsuarioRegistro",
                    name: "IdUsuarioRegistro",
                    class: "text-nowrap text-center"
                },
                {
                    data: "IdUsuarioModifico",
                    name: "IdUsuarioModifico",
                    class: "text-nowrap text-center"
                },
                {
                    data: "FechaRegistro",
                    name: "FechaRegistro",
                    class: "text-nowrap text-center"
                },
                {
                    data: "FechaModifico",
                    name: "FechaModifico",
                    class: "text-nowrap text-center"
                },
                {
                    data: "IdUsuarioRelevo",
                    name: "IdUsuarioRelevo",
                    class: "text-nowrap text-center"
                },
                {
                    data: "IdUnidadMedida",
                    name: "IdUnidadMedida",
                    class: "text-nowrap text-center"
                }
            ],
        "language": {
            "emptyTable": "No hay datos",
            "paginate": {
                "previous": "<i class='fas fa-angle-double-left'></i>",
                "next": "<i class='fas fa-angle-double-right'></i>"
            },
            "processing": "Cargando datos...",
            "info": "<span class='badge badge-primary text-light'><span class='font-weight-bold'>_START_</span> - <span class='font-weight-bold'>_END_</span></span>&nbsp" +
                "<span class='badge badge-primary text-light'>Total de registros: <span class='font-weight-bold'>_TOTAL_</span></span>"
        }
    });
    }

function inicio()
{
    llenarTabla();
    // $("#btnBuscar")
    $("#btnBuscar").on("click", function () {
        var table = $("#tblMetrado").DataTable();
        table.columns(0).search($("#txtIDMetradoF").val().trim());
        table.draw();
    });

    // $("#txtIDEstadoF").on("keyup", function () {
    //     rolGuardia.metrado.tabla
    //         .columns(2)
    //         .search(this.value)
    //         .draw();
    // });
}

$(inicio);