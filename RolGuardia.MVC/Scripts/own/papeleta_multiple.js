// #region Definición de Espacios de nombres.
// #region Definición de Espacios de nombres.
var rolGuardia = rolGuardia || {};
rolGuardia.papeletaMultiple = {};

rolGuardia.papeletaMultiple.listado = {};
rolGuardia.papeletaMultiple.listado.tabla = {};
rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada = {};
// rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas = [];
rolGuardia.papeletaMultiple.listado.tabla.fila = {};
rolGuardia.papeletaMultiple.listado.tabla.fila.botonAprobar = {};
rolGuardia.papeletaMultiple.listado.tabla.fila.botonRechazar = {};
rolGuardia.papeletaMultiple.listado.tabla.fila.botonEditar = {};
rolGuardia.papeletaMultiple.listado.tabla.fila.botonVer = {};
rolGuardia.papeletaMultiple.listado.tabla.fila.botonEliminar = {};
rolGuardia.papeletaMultiple.listado.tabla.fila.pintar = function ()
{
    $.each($("#tblPapeletaMultiple > tbody > tr"), function (indice, elemento)
    {
        $(this).removeClass("FilaSeleccionadaEdicion");
        $(this).removeClass("FilaSeleccionadaDetalle");
        if (rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id === parseInt($(elemento).attr("idpapeleta")))
        {
            if (rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.tipoOperacion === 'E')
                $(this).addClass("FilaSeleccionadaEdicion");
            if (rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.tipoOperacion === 'D')
                $(this).addClass("FilaSeleccionadaDetalle");
        }
    });
};

rolGuardia.papeletaMultiple.registro = {};
rolGuardia.papeletaMultiple.registro.formulario = {};
rolGuardia.papeletaMultiple.registro.formulario.controles = {};
// rolGuardia.papeletaMultiple.registro.formulario.tipoOperacion = {};
// rolGuardia.papeletaMultiple.registro.controles.NewCustomer = {};

// #endregion

rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal = function (control)
{
    if (control.hasClass("is-invalid"))
        control.removeClass("is-invalid");
};

rolGuardia.papeletaMultiple.listado.tabla.configurarTabla = function ()
{
    rolGuardia.papeletaMultiple.listado.tabla.DataTable = $("#tblPapeletaMultiple").DataTable({
        "responsive": true,
        "processing": true,
        "serverSide": true,
        "dom": '<"top"i>rt<"bottom"lp><"clear">',
        "ajax": {
            "url": "/PapeletaMultiple/listarPapeleta",
            "type": "POST",
            "dataType": "JSON"
        },
        "searching": true,
        "lengthChange": false,
        "pageLength": 10,
        "destroy": true,
        "retrieve": true,
        "info": true,
        // order: [[1, 'asc']],
        "columnDefs": [
            {
                "targets": [0, 1, 2, 3, 4, 5, 6, 7],
                "orderable": false,
                "class": "text-nowrap"
            },
            {
                "targets": [0],
                "orderable": false,
                "class": "text-nowrap",
                "render": function (url, type, full)
                {
                    return "<button class='btn ExpConFila'><i class='far fa-plus-square'></i></button>";
                },
                "createdCell": function (column, cellData, rowData, rowIndex, columnIndex)
                {
                    var row;
                    row = $(column).parent();
                    $(column).addClass("OrderID text-center").css({ "background-color": "#f2f1f6" });
                    // $(row).attr("Order-ID", rowData.orderID);
                    $(row).addClass("FilaPapeleta");
                    $(row).attr("IdPapeleta", rowData.IdPapeleta);
                }
            },/*
            {
                "targets": [1],
                "orderable": false,
                "class": "text-nowrap",
                "render": function (url, type, full)
                {
                    // #region Control Switch 
                    // return '<div class="custom-control custom-switch">' +
                    //     '<input type="checkbox" class="custom-control-input" value="' + url.IdPapeleta + '" id="' + url.IdPapeleta + '" >' +
                    //     '<label class="custom-control-label SeleccionFilaPapeleta" for="' + url.IdPapeleta + '" style="cursor: pointer;"></label>' +
                    //     '</div>';
                    // #endregion

                    // #region Control Checkbox
                    // return "<label class='custom-control custom-checkbox' style='text-align: center! important; padding: 0! important; display: contents;'>" +
                    //     "<input type='checkbox' class='custom-control-input SeleccionFilaPapeleta' id='" + full.IdPapeleta + "' value='" + full.IdPapeleta + "' name='validation-checkbox-custom'>" +
                    //     "<span class='custom-control-label' style='top: 12px'></span>" +
                    //     "</label>";
                    // #endregion

                    // #region Control Radio button
                    return "<label class='custom-control custom-radio' style='' >" +
                        "<input type='radio' name='custom-radio' class='custom-control-input SeleccionFilaPapeleta' IdPapeleta='" + full.IdPapeleta + "' id='" + full.IdPapeleta + "' value='" + full.IdPapeleta + "' >" +
                        "<span class='custom-control-label' style='cursor: pointer; top: 5px' title='Ver Detalle'></span>" +
                        "</label>";
                    // #endregion
                },
                "createdCell": function (column, cellData, rowData, rowIndex, columnIndex)
                {
                    var row;
                    row = $(column).parent();
                    $(column).css({ "padding": "0 4px" });
                }
            },*/
            {
                "targets": [6],
                "orderable": false,
                "class": "text-nowrap",
                "render": function (url, type, full)
                {
                    return rolGuardia.utilities.convertiFecha(full.FechaRegistro);
                }
            },
            {
                "targets": [7],
                "orderable": false,
                "class": "text-nowrap",
                "render": function (url, type, full)
                {
                    return "<button type='button' class='btn btn-outline-success btnAprobarPapeleta' IdPapeleta='" + full.IdPapeleta + "' title='Aprobar' data-toggle='modal' data-target='#ConfirmacionAprobacion' data-toggle='tooltip' data-placement='top' title='' data-original-title='Aprobar papeleta'><i class='fas fa-check' aria-hidden='true'></i></button>&nbsp" +
                        "<button type='button' class='btn btn-outline-danger btnRechazarPapeleta' IdPapeleta='" + full.IdPapeleta + "' title='Rechazar' data-toggle='modal' data-target='#ConfirmacionRechazo' data-toggle='tooltip' data-placement='top' title='' data-original-title='Rechazar papeleta'><i class='far fa-times-circle' aria-hidden='true'></i></button>&nbsp" +
                        "<button type='button' class='btn btn-outline-info btnEditarPapeleta' IdPapeleta='" + full.IdPapeleta + "' title='Editar' data-toggle='tooltip' data-placement='top' title='' data-original-title='Editar papeleta'><i class='fas fa-edit' aria-hidden='true'></i></button>&nbsp" +
                        "<button type='button' class='btn btn-outline-secondary btnVerPapeleta' IdPapeleta='" + full.IdPapeleta + "' title='Ver' data-toggle='tooltip' data-placement='top' title='' data-original-title='Ver papeleta'><i class='far fa-eye' aria-hidden='true'></i></button>&nbsp" +
                        "<button type='button' class='btn btn-outline-dark btnEliminarPapeleta' IdPapeleta='" + full.IdPapeleta + "' title='Eliminar' data-toggle='modal' data-target='#ConfirmacionEliminacion' data-toggle='tooltip' data-placement='top' title='' data-original-title='Eliminar papeleta'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>&nbsp";
                }
            }
        ],
        'select': {
            'style': 'api'
        },
        "columns":
            [
                {
                    data: null
                },
                //{
                //    data: null
                //},
                {
                    // data: "NumeroPapeleta",
                    // name: "NumeroPapeleta",
                    class: "text-nowrap text-center",
                    "render": function (url, type, full)
                    {
                        let resultado = "";
                        switch (full.Estado)
                        {
                            case rolGuardia.enumeraciones.EstadoPapeleta.ACTIVA:
                                resultado = "<span class='text-info'><i class='fas fa-square' aria-hidden='true'></i></span>&nbsp;&nbsp;" + full.NumeroPapeleta;
                                break;
                            case rolGuardia.enumeraciones.EstadoPapeleta.APROBADA:
                                resultado = "<span class='text-success'><i class='fas fa-square' aria-hidden='true'></i></span>&nbsp;&nbsp;" + full.NumeroPapeleta;
                                break;
                            case rolGuardia.enumeraciones.EstadoPapeleta.RECHAZADA:
                                resultado = "<span class='text-danger'><i class='fas fa-square' aria-hidden='true'></i></span>&nbsp;&nbsp;" + full.NumeroPapeleta;
                                break;
                            case rolGuardia.enumeraciones.EstadoPapeleta.INACTIVA:
                                resultado = "<span class='text-dark'><i class='fas fa-square' aria-hidden='true'></i></span>&nbsp;&nbsp;" + full.NumeroPapeleta;
                                break;
                        }
                        return resultado;
                    }
                },
                {
                    data: "Grado",
                    name: "Grado",
                    class: "text-nowrap text-center"
                },
                {
                    data: "Especialidad",
                    name: "Especialidad",
                    class: "text-nowrap text-center"
                },
                {
                    data: "NombreCompleto",
                    name: "NombreCompleto",
                    class: "text-nowrap text-center"
                },
                {
                    data: "Departamento",
                    name: "Departamento",
                    class: "text-nowrap text-center"
                },
                {
                    data: "FechaRegistro",
                    name: "FechaRegistro",
                    class: "text-nowrap text-center"
                },
                {
                    data: "",
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
};

rolGuardia.papeletaMultiple.listado.tabla.fila.expandeContenidoCompleto = function (e)
{
    let boton = $(e.currentTarget);
    let icono = $(boton).find("svg");

    icono.toggleClass("fa-plus-square").toggleClass("fa-minus-square");
};

rolGuardia.papeletaMultiple.listado.tabla.fila.click = function (e)
{
    rolGuardia.papeletaMultiple.listado.tabla.fila.expandeContenidoCompleto(e);
};

rolGuardia.papeletaMultiple.listado.tabla.fila.botonAprobar.click = function ()
{
    rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = parseInt($(this).attr("IdPapeleta").toString().trim());
};

rolGuardia.papeletaMultiple.listado.tabla.fila.botonRechazar.click = function ()
{
    rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = parseInt($(this).attr("IdPapeleta").toString().trim());
};

rolGuardia.papeletaMultiple.listado.tabla.fila.botonEditar.click = function ()
{
    rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = parseInt($(this).attr("IdPapeleta").toString().trim());
    rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.tipoOperacion = 'E';
    rolGuardia.papeletaMultiple.listado.tabla.fila.pintar();
    $("#btnGuardarPapeleta").attr("disabled", false);
    $("#btnImprimirPapeleta").attr("disabled", true);
    $("#btnCancelarRegistroPapeleta").attr("disabled", false);
    // #region Cambio de pestaña
    $("#CabeceraPestañaListado").toggleClass("active");
    $("#CabeceraPestañaRegistro").toggleClass("active");

    if (!$("#CuerpoPestañaRegistro").hasClass("show"))
    {
        $("#CuerpoPestañaListado").toggleClass("active show");
        $("#CuerpoPestañaRegistro").toggleClass("active show");
    }
    else
    {
        $("#CuerpoPestañaListado").toggleClass("active ");
        $("#CuerpoPestañaRegistro").toggleClass("active ");
    }
    // #endregion     
    let data = {
        "IdPapeleta": rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id
    };
    $.ajax({
        url: "/PapeletaMultiple/leerPapeletaPorId",
        async: false,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json'
    }).done(function (papeleta)
    {
        // #region Habilitar controles de escritura
        $("#txtCIPF").attr("disabled", false);
        $("#txtCIPF").closest(".row").find("button").attr("disabled", false);
        $("#cmbTipoPapeleta").attr("disabled", false);
        $("#cmbTipoPapeleta").val(papeleta.tipoPapeleta.IdTipoPapeleta).trigger('change');
        $("#txtCIPCubriraF").attr("disabled", false);
        $("#txtCIPCubriraF").closest(".row").find("button").attr("disabled", false);
        $("#txtCIPDevolveraF").attr("disabled", false);
        $("#txtCIPDevolveraF").closest(".row").find("button").attr("disabled", false);
        if (papeleta.tipoPapeleta.Descripcion === rolGuardia.enumeraciones.TipoPapeleta["CAMBIO DE GUARDIA"])
            $("#AsigancionGuardia").removeClass("d-none").addClass("d-block");
        else
            $("#AsigancionGuardia").removeClass("d-block").addClass("d-none");
        $("#txtMotivo").attr("disabled", false);
        $("#txtFechaCubrira").attr("disabled", false);
        $("#txtFechaDevolvera").attr("disabled", false);
        // #endregion
        // #region Carga los datos
        // #region Cambia el título del formulario de Registro
        $(".TituloOperacionPapeleta > strong").html("Papeleta: " + papeleta.NumeroPapeleta + " ( <i class='fas fa-edit'></i> Edición )");
        // #endregion
        $("#hdIdPapeleta").val(papeleta.IdPapeleta);
        // #region Carga los datos del personal que registra
        $("#txtCIPF").val(papeleta.personalRegistro.cip);
        $("#hdIdPersonal").val(papeleta.personalRegistro.IdPersonal);
        $("#txtGradoNombre").val(papeleta.personalRegistro.Grado.Descripcion + " " +
            papeleta.personalRegistro.Nombres + " " +
            papeleta.personalRegistro.ApellidoPaterno + " " +
            papeleta.personalRegistro.ApellidoMaterno);
        $("#txtCIP").val(papeleta.personalRegistro.cip);
        $("#txtDepartamento").val(papeleta.personalRegistro.Departamento.Descripcion);
        // #endregion
        // #region Carga los datos del personal que cubre
        if (papeleta.personalEnTurno.IdPersonal !== 0)
        {
            $("#hdIdPersonalCubrira").val(papeleta.personalEnTurno.IdPersonal);
            $("#txtCIPCubriraF").val(papeleta.personalEnTurno.cip);
            $("#txtGradoNombreCubrira").val(papeleta.personalEnTurno.Grado.Descripcion + " " +
                papeleta.personalEnTurno.Nombres + " " +
                papeleta.personalEnTurno.ApellidoPaterno + " " +
                papeleta.personalEnTurno.ApellidoMaterno);
            $("#txtFechaCubrira").datepicker('setDate', rolGuardia.utilities.convertiFecha(papeleta.FechaCubrir));
        }
        else
            $("#txtFechaCubrira").datepicker('setDate', null);
        // #endregion        
        // #region Carga los datos del personal que devuelve
        if (papeleta.personalReemplazo.IdPersonal !== 0)
        {
            $("#hdIdPersonalDevolvera").val(papeleta.personalReemplazo.IdPersonal);
            $("#txtCIPDevolveraF").val(papeleta.personalReemplazo.cip);
            $("#txtGradoNombreDevolvera").val(papeleta.personalReemplazo.Grado.Descripcion + " " +
                papeleta.personalReemplazo.Nombres + " " +
                papeleta.personalReemplazo.ApellidoPaterno + " " +
                papeleta.personalReemplazo.ApellidoMaterno);
            $("#txtFechaDevolvera").datepicker('setDate', rolGuardia.utilities.convertiFecha(papeleta.FechaDevolverTurno));
        }
        else
            $("#txtFechaDevolvera").datepicker('setDate', null);
        // #endregion
        $("#txtMotivo").val(papeleta.Observacion);
        // #endregion
    });
};



rolGuardia.papeletaMultiple.listado.tabla.fila.botonVer.click = function ()
{
    rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = parseInt($(this).attr("IdPapeleta").toString().trim());
    rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.tipoOperacion = 'D';
    rolGuardia.papeletaMultiple.listado.tabla.fila.pintar();
    $("#btnGuardarPapeleta").attr("disabled", true);
    $("#btnImprimirPapeleta").attr("disabled", false);
    $("#btnCancelarRegistroPapeleta").attr("disabled", true);
    // #region Cambio de pestaña
    $("#CabeceraPestañaListado").toggleClass("active");
    $("#CabeceraPestañaRegistro").toggleClass("active");

    if (!$("#CuerpoPestañaRegistro").hasClass("show"))
    {
        $("#CuerpoPestañaListado").toggleClass("active show");
        $("#CuerpoPestañaRegistro").toggleClass("active show");
    }
    else
    {
        $("#CuerpoPestañaListado").toggleClass("active ");
        $("#CuerpoPestañaRegistro").toggleClass("active ");
    }
    // #endregion
    $.ajax({
        url: "/PapeletaMultiple/leerPapeletaPorId",
        async: true,
        type: "POST",
        data: JSON.stringify({ "IdPapeleta": rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id }),
        contentType: "application/json",
        dataType: 'json'
    }).done(function (papeleta)
    {
        // #region Deshabilitar controles de escritura
        $("#txtCIPF").attr("disabled", true);
        $("#txtCIPF").closest(".row").find("button").attr("disabled", true);
        $("#cmbTipoPapeleta").attr("disabled", true);
        $("#cmbTipoPapeleta").val(papeleta.tipoPapeleta.IdTipoPapeleta).trigger('change');
        $("#txtCIPCubriraF").attr("disabled", true);
        $("#txtCIPCubriraF").closest(".row").find("button").attr("disabled", true);
        $("#txtCIPDevolveraF").attr("disabled", true);
        $("#txtCIPDevolveraF").closest(".row").find("button").attr("disabled", true);
        if (papeleta.tipoPapeleta.Descripcion === rolGuardia.enumeraciones.TipoPapeleta["CAMBIO DE GUARDIA"])
            $("#AsigancionGuardia").removeClass("d-none").addClass("d-block");
        else
            $("#AsigancionGuardia").removeClass("d-block").addClass("d-none");
        $("#txtMotivo").attr("disabled", true);
        $("#txtFechaCubrira").attr("disabled", true);
        $("#txtFechaDevolvera").attr("disabled", true);
        // #endregion
        // #region Carga los datos
        // #region Cambia el título del formulario de Registro
        $(".TituloOperacionPapeleta > strong").html("Papeleta: " + papeleta.NumeroPapeleta + " ( <i class='far fa-eye'></i> Detalle ) ");
        // #endregion
        // #region Carga los datos del personal que registra
        $("#txtGradoNombre").val(papeleta.personalRegistro.Grado.Descripcion + " " +
            papeleta.personalRegistro.Nombres + " " +
            papeleta.personalRegistro.ApellidoPaterno + " " +
            papeleta.personalRegistro.ApellidoMaterno);
        $("#txtCIP").val(papeleta.personalRegistro.cip);
        $("#txtDepartamento").val(papeleta.personalRegistro.Departamento.Descripcion);
        // #endregion
        // #region Carga los datos del personal que cubre
        if (papeleta.personalEnTurno.IdPersonal !== 0)
        {
            $("#txtGradoNombreCubrira").val(papeleta.personalEnTurno.Grado.Descripcion + " " +
                papeleta.personalEnTurno.Nombres + " " +
                papeleta.personalEnTurno.ApellidoPaterno + " " +
                papeleta.personalEnTurno.ApellidoMaterno);
        }
        $("#txtFechaCubrira").datepicker('setDate', rolGuardia.utilities.convertiFecha(papeleta.FechaCubrir));
        // #endregion
        // #region Carga los datos del personal que devuelve
        if (papeleta.personalReemplazo.IdPersonal !== 0)
        {
            $("#txtGradoNombreDevolvera").val(papeleta.personalReemplazo.Grado.Descripcion + " " +
                papeleta.personalReemplazo.Nombres + " " +
                papeleta.personalReemplazo.ApellidoPaterno + " " +
                papeleta.personalReemplazo.ApellidoMaterno);
        }
        $("#txtFechaDevolvera").datepicker('setDate', rolGuardia.utilities.convertiFecha(papeleta.FechaDevolverTurno));
        // #endregion
        $("#txtMotivo").val(papeleta.Observacion);
        // #endregion
    });
};

rolGuardia.papeletaMultiple.listado.tabla.fila.botonEliminar.click = function ()
{
    rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = parseInt($(this).attr("IdPapeleta").toString().trim());
};

rolGuardia.papeletaMultiple.registro.formulario.controles.eliminarErrores = function ()
{
    if ($("#txtGradoNombre").hasClass("is-invalid")) $("#txtGradoNombre").removeClass("is-invalid");
    if ($("#txtCIP").hasClass("is-invalid")) $("#txtCIP").removeClass("is-invalid");
    if ($("#txtDepartamento").hasClass("is-invalid")) $("#txtDepartamento").removeClass("is-invalid");

    if ($("#txtGradoNombreCubrira").hasClass("is-invalid")) $("#txtGradoNombreCubrira").removeClass("is-invalid");

    rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal($("#txtFechaCubrira"));
    $("#txtFechaCubrira-error").css({ "display": "none" });

    if ($("#txtGradoNombreDevolvera").hasClass("is-invalid")) $("#txtGradoNombreDevolvera").removeClass("is-invalid");

    rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal($("#txtFechaDevolvera"));
    $("#txtFechaDevolvera-error").css({ "display": "none" });
};

rolGuardia.papeletaMultiple.inicio = function ()
{
    // #region CONFIGURACIONES
    rolGuardia.papeletaMultiple.listado.tabla.configurarTabla();
    // rolGuardia.papeletaMultiple.registro.formulario.tipoOperacion = rolGuardia.enumeraciones.TipoOperacion.DETALLE; // Establece el tipo de operación de la papeleta en "Ver Detalle" mientras que no se elija otro tipo de operación como "Registrar" o "Editar".
    rolGuardia.userInterface.configurarControlDeFecha($("#txtFechaCubrira"), function ()
    {
        rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal($("#txtFechaCubrira"));
        $("#" + $(this).attr("id").trim() + "-error").css({ "display": "none" });
    });
    rolGuardia.userInterface.configurarControlDeFecha($("#txtFechaDevolvera"), function ()
    {
        rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal($("#txtFechaDevolvera"));
        $("#" + $(this).attr("id").trim() + "-error").css({ "display": "none" });
    });
    let data = rolGuardia.generalData.listarDataCombo("ListaTipoPapeleta");
    rolGuardia.userInterface.configurarComboSelect2($("#cmbTipoPapeleta"), data, "Tipo de Papeleta");
    // #endregion
    // #region EVENTOS
    $("#tblPapeletaMultiple > tbody").on("click", "tr > td > .ExpConFila", rolGuardia.papeletaMultiple.listado.tabla.fila.click);

    $("#txtNumeroPapeletaF").on("keyup", function ()
    {
        rolGuardia.papeletaMultiple.listado.tabla.DataTable
            .columns(2)
            .search(this.value)
            .draw();
    });
    $("#txtApellidosNombresF").on("keyup", function ()
    {
        rolGuardia.papeletaMultiple.listado.tabla.DataTable
            .columns(5)
            .search(this.value)
            .draw();
    });
    $("#txtCIPF").closest(".row").find("button").on("click", function ()
    {
        let cipFiltro = $("#txtCIPF").val().trim();

        if (cipFiltro.length !== 0)
        {
            let data = { "cip": $("#txtCIPF").val().trim() };

            $.ajax({
                url: "/PapeletaMultiple/leerPersonalPorCIP",
                async: true,
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: 'json'
            }).done(function (personal)
            {
                $("#hdIdPersonal").val(personal.IdPersonal);
                $("#txtGradoNombre").val(personal.Grado.Descripcion + ' ' + personal.Nombres + ' ' + personal.ApellidoPaterno + ' ' + personal.ApellidoMaterno);
                $("#txtCIP").val(personal.cip);
                $("#txtDepartamento").val(personal.Departamento.Descripcion);
                $("#txtCIPF").closest(".row").closest(".form-group").next().find(".alert-warning").removeClass("d-flex").addClass("d-none");
                $("#txtCIPF").closest(".row").closest(".form-group").next().find(".alert-danger").removeClass("d-flex").addClass("d-none");
                rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal($("#txtGradoNombre"));
                rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal($("#txtCIP"));
                rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal($("#txtDepartamento"));
            }).fail(function ()
            {
                $("#hdIdPersonal, #txtGradoNombre, #txtCIP, #txtDepartamento").val("");
                $("#txtCIPF").closest(".row").closest(".form-group").next().find(".alert-warning").removeClass("d-flex").addClass("d-none");
                $("#txtCIPF").closest(".row").closest(".form-group").next().find(".alert-danger").addClass("d-flex").removeClass("d-none");
            });
        }
        else
        {
            $("#hdIdPersonal, #txtGradoNombre, #txtCIP, #txtDepartamento").val("");
            $("#txtCIPF").closest(".row").closest(".form-group").next().find(".alert-warning").addClass("d-flex").removeClass("d-none");
            $("#txtCIPF").closest(".row").closest(".form-group").next().find(".alert-danger").removeClass("d-flex").addClass("d-none");
        }
    });
    $("#txtCIPCubriraF").closest(".row").find("button").on("click", function ()
    {
        let cipFiltro = $("#txtCIPCubriraF").val().trim();

        if (cipFiltro.length !== 0)
        {
            let data = { "cip": $("#txtCIPCubriraF").val().trim() };

            $.ajax({
                url: "/PapeletaMultiple/leerPersonalPorCIP",
                async: true,
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: 'json'
            }).done(function (personal)
            {
                $("#hdIdPersonalCubrira").val(personal.IdPersonal);
                $("#txtGradoNombreCubrira").val(personal.Grado.Descripcion + ' ' + personal.Nombres + ' ' + personal.ApellidoPaterno + ' ' + personal.ApellidoMaterno);
                $("#txtCIPCubriraF").closest(".row").closest(".form-group").next().find(".alert-warning").removeClass("d-flex").addClass("d-none");
                $("#txtCIPCubriraF").closest(".row").closest(".form-group").next().find(".alert-danger").removeClass("d-flex").addClass("d-none");
                rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal($("#txtGradoNombreCubrira"));
            }).fail(function ()
            {
                $("#hdIdPersonalCubrira, #txtGradoNombreCubrira").val("");
                $("#txtCIPCubriraF").closest(".row").closest(".form-group").next().find(".alert-warning").removeClass("d-flex").addClass("d-none");
                $("#txtCIPCubriraF").closest(".row").closest(".form-group").next().find(".alert-danger").addClass("d-flex").removeClass("d-none");
            });
        }
        else
        {
            $("#hdIdPersonalCubrira, #txtGradoNombreCubrira").val("");
            $("#txtCIPCubriraF").closest(".row").closest(".form-group").next().find(".alert-warning").addClass("d-flex").removeClass("d-none");
            $("#txtCIPCubriraF").closest(".row").closest(".form-group").next().find(".alert-danger").removeClass("d-flex").addClass("d-none");
        }
    });
    $("#txtCIPDevolveraF").closest(".row").find("button").on("click", function ()
    {
        let cipFiltro = $("#txtCIPDevolveraF").val().trim();

        if (cipFiltro.length !== 0)
        {
            let data = { "cip": $("#txtCIPDevolveraF").val().trim() };

            $.ajax({
                url: "/PapeletaMultiple/leerPersonalPorCIP",
                async: true,
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: 'json'
            }).done(function (personal)
            {
                $("#hdIdPersonalDevolvera").val(personal.IdPersonal);
                $("#txtGradoNombreDevolvera").val(personal.Grado.Descripcion + ' ' + personal.Nombres + ' ' + personal.ApellidoPaterno + ' ' + personal.ApellidoMaterno);
                $("#txtCIPDevolveraF").closest(".row").closest(".form-group").next().find(".alert-warning").removeClass("d-flex").addClass("d-none");
                $("#txtCIPDevolveraF").closest(".row").closest(".form-group").next().find(".alert-danger").removeClass("d-flex").addClass("d-none");
                rolGuardia.papeletaMultiple.registro.formulario.controles.devolverEstadoOriginal($("#txtGradoNombreDevolvera"));
            }).fail(function ()
            {
                $("#hdIdPersonalDevolvera, #txtGradoNombreDevolvera").val("");
                $("#txtCIPDevolveraF").closest(".row").closest(".form-group").next().find(".alert-warning").removeClass("d-flex").addClass("d-none");
                $("#txtCIPDevolveraF").closest(".row").closest(".form-group").next().find(".alert-danger").addClass("d-flex").removeClass("d-none");
            });
        }
        else
        {
            $("#hdIdPersonalDevolvera, #txtGradoNombreDevolvera").val("");
            $("#txtCIPDevolveraF").closest(".row").closest(".form-group").next().find(".alert-warning").addClass("d-flex").removeClass("d-none");
            $("#txtCIPDevolveraF").closest(".row").closest(".form-group").next().find(".alert-danger").removeClass("d-flex").addClass("d-none");
        }
    });
    $("#tblPapeletaMultiple > tbody").on("click", ".btnAprobarPapeleta", rolGuardia.papeletaMultiple.listado.tabla.fila.botonAprobar.click);
    $("#tblPapeletaMultiple > tbody").on("click", ".btnRechazarPapeleta", rolGuardia.papeletaMultiple.listado.tabla.fila.botonRechazar.click);
    $("#tblPapeletaMultiple > tbody").on("click", ".btnEditarPapeleta", rolGuardia.papeletaMultiple.listado.tabla.fila.botonEditar.click);
    $("#tblPapeletaMultiple > tbody").on("click", ".btnVerPapeleta", rolGuardia.papeletaMultiple.listado.tabla.fila.botonVer.click);
    $("#tblPapeletaMultiple > tbody").on("click", ".btnEliminarPapeleta", rolGuardia.papeletaMultiple.listado.tabla.fila.botonEliminar.click);
    $("#btnSiAprobarPapeleta").on("click", function ()
    {
        let data = { "IdPapeleta": rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id };
        $.ajax({
            url: "/PapeletaMultiple/aprobarPapeleta",
            async: false,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json'
        });
        rolGuardia.papeletaMultiple.listado.tabla.DataTable.ajax.reload();
    });
    $("#btnSiRechazarPapeleta").on("click", function ()
    {
        let data = { "IdPapeleta": rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id };
        $.ajax({
            url: "/PapeletaMultiple/rechazarPapeleta",
            async: false,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json'
        });
        rolGuardia.papeletaMultiple.listado.tabla.DataTable.ajax.reload();
    });
    $("#btnSiEliminarPapeleta").on("click", function ()
    {
        let data = { "IdPapeleta": rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id };
        $.ajax({
            url: "/PapeletaMultiple/eliminarPapeleta",
            async: false,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json'
        });
        rolGuardia.papeletaMultiple.listado.tabla.DataTable.ajax.reload();
    });
    $("#cmbTipoPapeleta").on("change", function ()
    {
        $(".select2-selection--single").removeClass("Error");
        $("#cmbTipoPapeleta-error").css({ "display": "none" });

        if ($("#cmbTipoPapeleta option:selected").text().trim().toUpperCase() === rolGuardia.enumeraciones.TipoPapeleta["CAMBIO DE GUARDIA"])
            $("#AsigancionGuardia").removeClass("d-none").addClass("d-block");
        else
        {
            $("#AsigancionGuardia").removeClass("d-block").addClass("d-none");
            // #region Limpiar los controles de Asignación de Guardia
            $("#txtCIPCubriraF").val("");
            $("#hdIdPersonalCubrira").val("");
            $("#txtGradoNombreCubrira").val("");
            $("#txtFechaCubrira").datepicker('setDate', null);
            $("#txtCIPDevolveraF").val("");
            $("#hdIdPersonalDevolvera").val("");
            $("#txtGradoNombreDevolvera").val("");
            $("#txtFechaDevolvera").datepicker('setDate', null);
            // #endregion
            // 
            if ($("#txtGradoNombreCubrira").hasClass("is-invalid")) $("#txtGradoNombreCubrira").removeClass("is-invalid");
            if ($("#txtGradoNombreDevolvera").hasClass("is-invalid")) $("#txtGradoNombreDevolvera").removeClass("is-invalid");
        }
    });
    $("#frmRegistroPapeleta").on("submit", function (e)
    {
        e.preventDefault();
        var form = $("#frmRegistroPapeleta");
        if (form.valid())
        {
            // let opciones = {
            //     focus: true
            // };
            // $('#ConfirmacionRegistro').modal(options);
            $('#ConfirmacionRegistro').modal('toggle');
        }
    });
    $("#btnGuardarPapeleta").on("click", function (e)
    {
        $('#frmRegistroPapeleta').validate({
            rules: {
                txtGradoNombre: { required: true },
                txtCIP: { required: true },
                txtDepartamento: { required: true },
                cmbTipoPapeleta: { required: true },
                txtGradoNombreCubrira: { required: true },
                txtFechaCubrira: { required: true },
                txtGradoNombreDevolvera: { required: true },
                txtFechaDevolvera: { required: true }
            },
            messages: {
                txtGradoNombre: "¡Cargue el personal que registra!",
                txtCIP: "¡Cargue el personal que registra!",
                txtDepartamento: "¡Cargue el personal que registra!",
                cmbTipoPapeleta: "¡Seleccione un tipo de papeleta!",
                txtGradoNombreCubrira: "¡Cargue el personal que cubrirá!",
                txtFechaCubrira: "¡Seleccione en que fecha cubrirá!",
                txtGradoNombreDevolvera: "¡Cargue el personal que devolverá!",
                txtFechaDevolvera: "¡Seleccione en que fecha devolverá!"
            },
            errorPlacement: function errorPlacement(error, element)
            {
                var $parent = $(element).parents('.form-group');
                // Do not duplicate errors
                if ($parent.find('.jquery-validation-error').length)
                    return;
                $parent.append(error.addClass('jquery-validation-error small form-text invalid-feedback'));
            },
            highlight: function (element)
            {
                var $el = $(element);
                var $parent = $el.parents('.form-group');
                $el.addClass('is-invalid');
                // Select2 and Tagsinput                
                if ($el.hasClass('select2-hidden-accessible') || $el.attr('data-role') === 'tagsinput')
                    $(".select2-selection--single").addClass("Error");
            },
            unhighlight: function (element)
            {
                $(element).parents('.form-group').find('.is-invalid').removeClass('is-invalid');
            }
        });
    });
    $("#btnSiGuardarPapeleta").on("click", function ()
    {
        let cipCubrira = $("#txtCIPCubriraF").val().trim();
        let cipDevolvera = $("#txtCIPDevolveraF").val().trim();

        if (($("#cmbTipoPapeleta option:selected").text().trim().toUpperCase() === rolGuardia.enumeraciones.TipoPapeleta["CAMBIO DE GUARDIA"])
            && (cipCubrira === cipDevolvera))
        {
            alert("El CIP que cubirá no puede ser igual al CIP que devolverá");
            return false;
        }
        else
        {
            // #region Llena la papeleta
            let papeleta =
            {
                IdPapeleta: $("#hdIdPapeleta").val().trim() === "" ? null : parseInt($("#hdIdPapeleta").val().trim()),
                tipoPapeleta:
                {
                    IdTipoPapeleta: ($("#cmbTipoPapeleta").val().trim() === "") ? null : parseInt($("#cmbTipoPapeleta").val().trim())
                },
                personalRegistro: {
                    IdPersonal: parseInt($("#hdIdPersonal").val().trim())
                },
                personalEnTurno:
                {
                    IdPersonal: ($("#hdIdPersonalCubrira").val().trim() === "") ? null : parseInt($("#hdIdPersonalCubrira").val().trim())
                },
                personalReemplazo:
                {
                    IdPersonal: ($("#hdIdPersonalDevolvera").val().trim() === "") ? null : parseInt($("#hdIdPersonalDevolvera").val().trim())
                },
                FechaCubrir: $("#txtFechaCubrira").val().trim() === "" ? null : $("#txtFechaCubrira").val().trim(),
                FechaDevolverTurno: $("#txtFechaDevolvera").val().trim() === "" ? null : $("#txtFechaDevolvera").val().trim(),
                Observacion: $("#txtMotivo").val().trim()
            };
            // #endregion
            // #region Guarda/Modifica la papeleta
            if (papeleta.IdPapeleta === null)
            {
                $.ajax({
                    url: "/PapeletaMultiple/registrarPapeleta",
                    async: false,
                    type: "POST",
                    data: JSON.stringify(papeleta),
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
            else
            {
                $.ajax({
                    url: "/PapeletaMultiple/editarPapeleta",
                    async: false,
                    type: "POST",
                    data: JSON.stringify(papeleta),
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
            // #endregion
            // #region Cambia el título del formulario de Registro
            $("#TituloRegistroPapeleta").addClass("d-block").removeClass("d-none");
            $("#TituloEdicionPapeleta").removeClass("d-block").addClass("d-none");
            $("#TituloDetallePapeleta").removeClass("d-block").addClass("d-none");
            // #endregion
            // #region Limpiar los controles del formulario
            rolGuardia.papeletaMultiple.registro.formulario.controles.limpiar();
            // #endregion            // #region Cambia de pestaña
            $("#CabeceraPestañaListado").addClass("active");
            $("#CabeceraPestañaRegistro").removeClass("active");

            // if ($("#CuerpoPestañaRegistro").hasClass("show"))
            // {
            $("#CuerpoPestañaListado").addClass("active show");
            $("#CuerpoPestañaRegistro").removeClass("active show");
            // }
            // else
            // {
            //     $("#CuerpoPestañaListado").toggleClass("active ");
            //     $("#CuerpoPestañaRegistro").toggleClass("active ");
            // }
            // #endregion
            // #region Actualiza la tabla
            rolGuardia.papeletaMultiple.listado.tabla.DataTable.ajax.reload();
            // #endregion
        }
    });

    $("#txtCIPDevolveraF").on("change", function ()
    {
        $("#hdIdPersonalDevolvera").val("");
        $("#txtGradoNombreDevolvera").val("");
    });

    rolGuardia.papeletaMultiple.registro.formulario.controles.limpiar = function ()
    {
        $("#hdIdPapeleta").val("");
        $("#txtCIPF").val("");
        $("#hdIdPersonal").val("");
        $("#txtGradoNombre").val("");
        $("#txtCIP").val("");
        $("#txtDepartamento").val("");
        $("#cmbTipoPapeleta").val(null).trigger('change');
        $("#txtCIPCubriraF").val("");
        $("#hdIdPersonalCubrira").val("");
        $("#txtGradoNombreCubrira").val("");
        $("#txtFechaCubrira").val("");
        $("#txtCIPDevolveraF").val("");
        $("#hdIdPersonalDevolvera").val("");
        $("#txtGradoNombreDevolvera").val("");
        $("#txtFechaDevolvera").val("");
        $("#txtMotivo").val("");
    };

    $("#btnCancelarRegistroPapeleta").on("click", function ()
    {
        // #region Cambia el título del formulario de Registro
        $(".TituloOperacionPapeleta > strong").html("Papeleta");
        // #endregion
        rolGuardia.papeletaMultiple.registro.formulario.controles.limpiar();
        rolGuardia.papeletaMultiple.registro.formulario.controles.eliminarErrores();
        // #region Deshabilitar controles de escritura
        $("#txtCIPF").attr("disabled", true);
        $("#txtCIPCubriraF").attr("disabled", true);
        $("#txtCIPDevolveraF").attr("disabled", true);
        $("#cmbTipoPapeleta").attr("disabled", true);
        $("#AsigancionGuardia").removeClass("d-block").addClass("d-none");
        $("#txtMotivo").attr("disabled", true);
        $("#txtFechaCubrira").attr("disabled", true);
        $("#txtFechaDevolvera").attr("disabled", true);
        // #endregion
        $("#CabeceraPestañaListado").addClass("active");
        $("#CabeceraPestañaRegistro").removeClass("active");

        $("#CuerpoPestañaListado").addClass("active show");
        $("#CuerpoPestañaRegistro").removeClass("active show");
        // #region Cancela la fila seleccionada
        rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = null;
        rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.tipoOperacion = null;
        rolGuardia.papeletaMultiple.listado.tabla.fila.pintar();
        // #endregion
    });
    $("#btnNuevaPapeleta").on("click", function ()
    {
        // #region Cancela la fila seleccionada
        rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = null;
        rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.tipoOperacion = null;
        rolGuardia.papeletaMultiple.listado.tabla.fila.pintar();
        // #endregion
        $("#btnGuardarPapeleta").attr("disabled", false);
        $("#btnImprimirPapeleta").attr("disabled", true);
        $("#btnCancelarRegistroPapeleta").attr("disabled", false);
        // #region Cambia el título del formulario de Registro
        $(".TituloOperacionPapeleta > strong").html("Papeleta ( <i class='fas fa-file'></i> Registro )");
        // #endregion
        // #region Cambio de pestaña
        $("#CabeceraPestañaListado").toggleClass("active");
        $("#CabeceraPestañaRegistro").toggleClass("active");

        if (!$("#CuerpoPestañaRegistro").hasClass("show"))
        {
            $("#CuerpoPestañaListado").toggleClass("active show");
            $("#CuerpoPestañaRegistro").toggleClass("active show");
        }
        else
        {
            $("#CuerpoPestañaListado").toggleClass("active ");
            $("#CuerpoPestañaRegistro").toggleClass("active ");
        }
        // #endregion        // #region Limpia los valores y los errores que puedan tener los controles del formulario.
        rolGuardia.papeletaMultiple.registro.formulario.controles.limpiar();
        rolGuardia.papeletaMultiple.registro.formulario.controles.eliminarErrores();
        // #endregion
        // #region Habilitación de controles
        $("#txtCIPF").attr("disabled", false);
        $("#txtCIPF").closest(".row").find("button").attr("disabled", false);
        $("#cmbTipoPapeleta").attr("disabled", false);
        $("#cmbTipoPapeleta").val(null).trigger('change');
        $("#txtCIPCubriraF").attr("disabled", false);
        $("#txtCIPCubriraF").closest(".row").find("button").attr("disabled", false);
        $("#txtCIPDevolveraF").attr("disabled", false);
        $("#txtCIPDevolveraF").closest(".row").find("button").attr("disabled", false);
        $("#AsigancionGuardia").removeClass("d-block").addClass("d-none");
        $("#txtMotivo").attr("disabled", false);
        $("#txtFechaCubrira").attr("disabled", false);
        $("#txtFechaDevolvera").attr("disabled", false);
        // #endregion
    });
    // #endregion
};

$("#tblPapeletaMultiple").on('draw.dt', function ()
{
    rolGuardia.papeletaMultiple.listado.tabla.fila.pintar();
    /////////////// for (var i = 0; i < rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas.length; i++)
    /////////////// {
    // if (rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id !== null)
    // {
    //     checkboxId = rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id;
    //     $('#' + checkboxId).prop('checked', true);
    // }

    /////////////// if ($("#SeleccionarPapeletasTodas").is(':checked'))

    /////////////// }

    /////////////// Si el checkbox general está activado, se activan todos los checks.
    /////////////// if ($("#SeleccionarPapeletasTodas").is(':checked'))
    /////////////// {
    ///////////////     var cells = rolGuardia.papeletaMultiple.listado.tabla.DataTable.cells().nodes();
    ///////////////     $(cells).find(':checkbox').prop('checked', true);
    ///////////////     $(cells).find(':checkbox').trigger("change");
    /////////////// }
});

$(rolGuardia.papeletaMultiple.inicio);