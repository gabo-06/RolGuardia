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
rolGuardia.papeletaMultiple.listado.tabla.fila.botonEliminar = {};

rolGuardia.papeletaMultiple.registro = {};
rolGuardia.papeletaMultiple.registro.formulario = {};
rolGuardia.papeletaMultiple.registro.formulario.controles = {};
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
                "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8],
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
            },
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
            },
            {
                "targets": [7],
                "orderable": false,
                "class": "text-nowrap",
                "render": function (url, type, full)
                {
                    return rolGuardia.utilities.convertiFecha(full.FechaRegistro);
                }
            },
            {
                "targets": [8],
                "orderable": false,
                "class": "text-nowrap",
                "render": function (url, type, full)
                {
                    return "<button type='button' class='btn btn-success btnAprobarPapeleta' IdPapeleta='" + full.IdPapeleta + "' title='Aprobar' data-toggle='modal' data-target='#ConfirmacionAprobacion' data-toggle='tooltip' data-placement='top' title='' data-original-title='Aprobar papeleta'><i class='fas fa-check' aria-hidden='true'></i></button>&nbsp" +
                        "<button type='button' class='btn btn-danger btnRechazarPapeleta' IdPapeleta='" + full.IdPapeleta + "' title='Rechazar' data-toggle='modal' data-target='#ConfirmacionRechazo' data-toggle='tooltip' data-placement='top' title='' data-original-title='Rechazar papeleta'><i class='far fa-times-circle' aria-hidden='true'></i></button>&nbsp" +
                        "<button type='button' class='btn btn-warning btnEditarPapeleta' IdPapeleta='" + full.IdPapeleta + "' title='Editar' data-toggle='tooltip' data-placement='top' title='' data-original-title='Editar papeleta'><i class='fas fa-edit' aria-hidden='true'></i></button>&nbsp" +
                        "<button type='button' class='btn btn-dark btnEliminarPapeleta' IdPapeleta='" + full.IdPapeleta + "' title='Eliminar' data-toggle='modal' data-target='#ConfirmacionEliminacion' data-toggle='tooltip' data-placement='top' title='' data-original-title='Eliminar papeleta'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>&nbsp";
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
                {
                    data: null
                },
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
            "info": "<span class='badge badge-dark text-light'><span class='font-weight-bold'>_START_</span> - <span class='font-weight-bold'>_END_</span></span>&nbsp" +
                "<span class='badge badge-dark text-light'>Total de registros: <span class='font-weight-bold'>_TOTAL_</span></span>"
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
    // #region Cambia el título del formulario de Registro
    $("#TituloRegistroPapeleta").removeClass("d-block").addClass("d-none");
    $("#TituloEdicionPapeleta").removeClass("d-none").addClass("d-block");
    $("#TituloDetallePapeleta").removeClass("d-block").addClass("d-none");
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
    // #endregion 

    rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = parseInt($(this).attr("IdPapeleta").toString().trim());
    let data = { "IdPapeleta": rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id };
    $.ajax({
        url: "/PapeletaMultiple/leerPapeletaPorId",
        async: true,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json'
    }).done(function (papeleta)
    {
        // #region Deshabilitar controles de escritura
        $("#txtCIPF").attr("readonly", false).toggleClass("bg-light");
        $("#txtCIPCubriraF").attr("readonly", false).toggleClass("bg-light");
        $("#txtCIPDevolveraF").attr("readonly", false).toggleClass("bg-light");
        $("#cmbTipoPapeleta").attr("disabled", false).toggleClass("bg-light");
        $("#cmbTipoPapeleta").val(papeleta.tipoPapeleta.IdTipoPapeleta).trigger('change');
        if (papeleta.tipoPapeleta.Descripcion === rolGuardia.enumeraciones.TipoPapeleta["CAMBIO DE GUARDIA"])
            $("#AsigancionGuardia").removeClass("d-none").addClass("d-block");
        else
            $("#AsigancionGuardia").removeClass("d-block").addClass("d-none");
        $("#txtMotivo").attr("readonly", false).toggleClass("bg-light");
        $("#txtFechaCubrira").attr("readonly", false).toggleClass("bg-light");
        $("#txtFechaDevolvera").attr("readonly", false).toggleClass("bg-light");
        // #endregion
        // #region Carga los datos
        $(".TituloNumeroPapeleta").text(papeleta.NumeroPapeleta);
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
        $("#txtCIPCubriraF").val(papeleta.personalEnTurno.cip);
        $("#hdIdPersonalCubrira").val(papeleta.personalEnTurno.IdPersonal);
        $("#txtGradoNombreCubrira").val(papeleta.personalEnTurno.Grado.Descripcion + " " +
            papeleta.personalEnTurno.Nombres + " " +
            papeleta.personalEnTurno.ApellidoPaterno + " " +
            papeleta.personalEnTurno.ApellidoMaterno);
        $("#txtFechaCubrira").datepicker('setDate', rolGuardia.utilities.convertiFecha(papeleta.FechaCubrir));
        // #endregion
        // #region Carga los datos del personal que devuelve
        $("#txtCIPDevolveraF").val(papeleta.personalReemplazo.cip);
        $("#hdIdPersonalDevolvera").val(papeleta.personalReemplazo.IdPersonal);
        $("#txtGradoNombreDevolvera").val(papeleta.personalReemplazo.Grado.Descripcion + " " +
            papeleta.personalReemplazo.Nombres + " " +
            papeleta.personalReemplazo.ApellidoPaterno + " " +
            papeleta.personalReemplazo.ApellidoMaterno);
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

rolGuardia.papeletaMultiple.registro.formulario.controles.limpiar = function ()
{
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
    // #region Configuraciones
    rolGuardia.papeletaMultiple.listado.tabla.configurarTabla();
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
    rolGuardia.userInterface.configurarComboSelect2($("#cmbTipoPapeleta"), data, "Seleccione");
    // #endregion

    // #region Eventos		
    $("#tblPapeletaMultiple > tbody").on("click", "tr > td > .ExpConFila", rolGuardia.papeletaMultiple.listado.tabla.fila.click);
    $("#tblPapeletaMultiple > tbody").on("change", "tr > td > .custom-control > .SeleccionFilaPapeleta", function (e)
    {
        // #region Cambia el título del formulario de Registro
        $("#TituloRegistroPapeleta").removeClass("d-block").addClass("d-none");
        $("#TituloEdicionPapeleta").removeClass("d-block").addClass("d-none");
        $("#TituloDetallePapeleta").addClass("d-block").removeClass("d-none");
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
        // #endregion
        rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = parseInt($(this).attr("IdPapeleta").toString().trim());
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
            $("#txtCIPF").attr("readonly", true).toggleClass("bg-light");
            $("#txtCIPCubriraF").attr("readonly", true).toggleClass("bg-light");
            $("#txtCIPDevolveraF").attr("readonly", true).toggleClass("bg-light");
            $("#cmbTipoPapeleta").attr("disabled", true).toggleClass("bg-light");
            $("#cmbTipoPapeleta").val(papeleta.tipoPapeleta.IdTipoPapeleta).trigger('change');
            if (papeleta.tipoPapeleta.Descripcion === rolGuardia.enumeraciones.TipoPapeleta["CAMBIO DE GUARDIA"])
                $("#AsigancionGuardia").removeClass("d-none").addClass("d-block");
            else
                $("#AsigancionGuardia").removeClass("d-block").addClass("d-none");
            $("#txtMotivo").attr("readonly", true).toggleClass("bg-light");
            $("#txtFechaCubrira").attr("readonly", true).toggleClass("bg-light");
            $("#txtFechaDevolvera").attr("readonly", true).toggleClass("bg-light");
            // #endregion
            // #region Carga los datos
            $(".TituloNumeroPapeleta").text(papeleta.NumeroPapeleta);
            // #region Carga los datos del personal que registra
            $("#txtGradoNombre").val(papeleta.personalRegistro.Grado.Descripcion + " " +
                papeleta.personalRegistro.Nombres + " " +
                papeleta.personalRegistro.ApellidoPaterno + " " +
                papeleta.personalRegistro.ApellidoMaterno);
            $("#txtCIP").val(papeleta.personalRegistro.cip);
            $("#txtDepartamento").val(papeleta.personalRegistro.Departamento.Descripcion);
            // #endregion
            // #region Carga los datos del personal que cubre
            $("#txtGradoNombreCubrira").val(papeleta.personalEnTurno.Grado.Descripcion + " " +
                papeleta.personalEnTurno.Nombres + " " +
                papeleta.personalEnTurno.ApellidoPaterno + " " +
                papeleta.personalEnTurno.ApellidoMaterno);
            $("#txtFechaCubrira").datepicker('setDate', rolGuardia.utilities.convertiFecha(papeleta.FechaCubrir));
            // #endregion
            // #region Carga los datos del personal que devuelve
            $("#txtGradoNombreDevolvera").val(papeleta.personalReemplazo.Grado.Descripcion + " " +
                papeleta.personalReemplazo.Nombres + " " +
                papeleta.personalReemplazo.ApellidoPaterno + " " +
                papeleta.personalReemplazo.ApellidoMaterno);
            $("#txtFechaDevolvera").datepicker('setDate', rolGuardia.utilities.convertiFecha(papeleta.FechaDevolverTurno));
            // #endregion
            $("#txtMotivo").val(papeleta.Observacion);
            // #endregion
        });
    });
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
    $('#SeleccionarPapeletasTodas').change(function ()
    {
        var cells = rolGuardia.papeletaMultiple.listado.tabla.DataTable.cells().nodes();
        $(cells).find(':checkbox').prop('checked', $(this).is(':checked'));
    });
    $("#tblPapeletaMultiple > tbody").on("click", ".btnAprobarPapeleta", rolGuardia.papeletaMultiple.listado.tabla.fila.botonAprobar.click);
    $("#tblPapeletaMultiple > tbody").on("click", ".btnRechazarPapeleta", rolGuardia.papeletaMultiple.listado.tabla.fila.botonRechazar.click);
    $("#tblPapeletaMultiple > tbody").on("click", ".btnEditarPapeleta", rolGuardia.papeletaMultiple.listado.tabla.fila.botonEditar.click);
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
        if ($("#cmbTipoPapeleta option:selected").text().trim().toUpperCase() === rolGuardia.enumeraciones.TipoPapeleta["CAMBIO DE GUARDIA"])
            $("#AsigancionGuardia").removeClass("d-none").addClass("d-block");
        else
            $("#AsigancionGuardia").removeClass("d-block").addClass("d-none");
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
                txtGradoNombre: {
                    required: true
                },
                txtCIP: {
                    required: true
                },
                txtDepartamento: {
                    required: true
                },
                txtGradoNombreCubrira: {
                    required: true
                },
                txtFechaCubrira: {
                    required: true
                },
                txtGradoNombreDevolvera: {
                    required: true
                },
                txtFechaDevolvera: {
                    required: true
                }
            },
            messages: {
                txtGradoNombre: "¡Cargue el personal que registra!",
                txtCIP: "¡Cargue el personal que registra!",
                txtDepartamento: "¡Cargue el personal que registra!",

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
                {
                    return;
                }
                $parent.append(
                    error.addClass('jquery-validation-error small form-text invalid-feedback')
                );
            },
            highlight: function (element)
            {
                var $el = $(element);
                var $parent = $el.parents('.form-group');
                $el.addClass('is-invalid');
                // Select2 and Tagsinput
                if ($el.hasClass('select2-hidden-accessible') || $el.attr('data-role') === 'tagsinput')
                {
                    $el.parent().addClass('is-invalid');
                }
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

        if (cipCubrira === cipDevolvera)
        {
            alert("El CIP que cubirá no puede ser igual al CIP que devolverá");
            return false;
        }
        else
        {
            let papeleta = {
                personalRegistro: {
                    IdPersonal: parseInt($("#hdIdPersonal").val().trim())
                },
                personalEnTurno: {
                    IdPersonal: parseInt($("#hdIdPersonalCubrira").val().trim())
                },
                personalReemplazo: {
                    IdPersonal: parseInt($("#hdIdPersonalDevolvera").val().trim())
                },
                // "IdPersonalRegistro": parseInt($("#hdIdPersonal").val().trim()),
                // "IdPersonalEnturno": parseInt($("#hdIdPersonalCubrira").val().trim()),
                // "IdPersonalRemplazo": parseInt($("#hdIdPersonalDevolvera").val().trim()),
                "Observacion": $("#txtMotivo").val().trim(),
                "FechaCubrir": $("#txtFechaCubrira").val().trim(),
                "FechaDevolverTurno": $("#txtFechaDevolvera").val().trim()
            };
            $.ajax({
                url: "/PapeletaMultiple/registrarPapeleta",
                async: false,
                type: "POST",
                data: JSON.stringify(papeleta),
                contentType: "application/json",
                dataType: 'json'
            }).done(function ()
            {
                rolGuardia.papeletaMultiple.listado.tabla.DataTable.ajax.reload();
            });
            // #region Cambia el título del formulario de Registro
            $("#TituloRegistroPapeleta").removeClass("d-block").addClass("d-none");
            $("#TituloEdicionPapeleta").removeClass("d-block").addClass("d-none");
            $("#TituloDetallePapeleta").removeClass("d-block").addClass("d-none");
            // #endregion
            rolGuardia.papeletaMultiple.registro.formulario.controles.limpiar();
            $("#CabeceraPestañaListado").toggleClass("active");
            $("#CabeceraPestañaRegistro").toggleClass("active");

            if ($("#CuerpoPestañaRegistro").hasClass("show"))
            {
                $("#CuerpoPestañaListado").toggleClass("active show");
                $("#CuerpoPestañaRegistro").toggleClass("active show");
            }
            else
            {
                $("#CuerpoPestañaListado").toggleClass("active ");
                $("#CuerpoPestañaRegistro").toggleClass("active ");
            }
        }
    });
    $("#txtCIPDevolveraF").on("change", function ()
    {
        $("#hdIdPersonalDevolvera").val("");
        $("#txtGradoNombreDevolvera").val("");
    });
    $("#btnCancelarRegistroPapeleta").on("click", function ()
    {
        rolGuardia.papeletaMultiple.registro.formulario.controles.limpiar();
        rolGuardia.papeletaMultiple.registro.formulario.controles.eliminarErrores();
        /*
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
        */
    });
    $("#btnNuevaPapeleta").on("click", function ()
    {
        // #region Cambia el título del formulario de Registro
        $("#TituloRegistroPapeleta").removeClass("d-none").addClass("d-block");
        $("#TituloEdicionPapeleta").removeClass("d-block").addClass("d-none");
        $("#TituloDetallePapeleta").removeClass("d-block").addClass("d-none");
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
        // #region Habilitar controles de escritura
        $("#txtCIPF").attr("readonly", false).toggleClass("bg-light");
        $("#txtCIPCubriraF").attr("readonly", false).toggleClass("bg-light");
        $("#txtCIPDevolveraF").attr("readonly", false).toggleClass("bg-light");
        $("#cmbTipoPapeleta").attr("disabled", false).toggleClass("bg-light");
        $("#cmbTipoPapeleta").val(null).trigger('change');
        $("#AsigancionGuardia").removeClass("d-block").addClass("d-none");
        $("#txtMotivo").attr("readonly", false).toggleClass("bg-light");
        $("#txtFechaCubrira").attr("readonly", false).toggleClass("bg-light");
        $("#txtFechaDevolvera").attr("readonly", false).toggleClass("bg-light");
        // #endregion
        // #region Cuando se quiere crear una nueva papeleta ya no hay una papeleta seleccionada por tanto la variable se limpia
        $("#" + rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id).prop('checked', false);
        rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id = null;
        // #endmregion
    });
};

$("#tblPapeletaMultiple").on('draw.dt', function ()
{
    // for (var i = 0; i < rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas.length; i++)
    // {
    if (rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id !== null)
    {
        checkboxId = rolGuardia.papeletaMultiple.listado.tabla.papeletaSeleccionada.id;
        $('#' + checkboxId).prop('checked', true);
    }

    // if ($("#SeleccionarPapeletasTodas").is(':checked'))

    // }

    // Si el checkbox general está activado, se activan todos los checks.
    // if ($("#SeleccionarPapeletasTodas").is(':checked'))
    // {
    //     var cells = rolGuardia.papeletaMultiple.listado.tabla.DataTable.cells().nodes();
    //     $(cells).find(':checkbox').prop('checked', true);
    //     $(cells).find(':checkbox').trigger("change");
    // }
});

$(rolGuardia.papeletaMultiple.inicio);