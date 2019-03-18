// #region Definición de Espacios de nombres.
var rolGuardia = rolGuardia || {};
rolGuardia.papeletaMultiple = {};

rolGuardia.papeletaMultiple.registro = {};
rolGuardia.papeletaMultiple.registro.controles = {};
// rolGuardia.papeletaMultiple.registro.controles.NewCustomer = {};

rolGuardia.papeletaMultiple.listado = {};
rolGuardia.papeletaMultiple.listado.tabla = {};
rolGuardia.papeletaMultiple.listado.tabla.fila = {};
// #endregion

rolGuardia.papeletaMultiple.listado.tabla.configurarTabla = function ()
{
	rolGuardia.papeletaMultiple.listado.tabla.DataTable = $("#tblPapeletaMultiple").DataTable({
		"responsive": true,
		"proccessing": true,
		"serverSide": true,
		"ajax": {
			"url": "/PapeletaMultiple/obtenerPersonal",
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
				"targets": [0],
				"orderable": false,
				"class": "text-nowrap",
				"render": function (url, type, full)
				{
					return "<button class='btn '><i class='far fa-plus-square'></i></button>";
				},
				"createdCell": function (column, cellData, rowData, rowIndex, columnIndex)
				{
					var row;
					row = $(column).parent();
					$(column).addClass("OrderID text-center");
					// $(row).attr("Order-ID", rowData.orderID);
					// $(row).attr("Customer-ID", rowData.customer.CustomerID);
				}
			},
			{
				"targets": [1],
				"orderable": false,
				"class": "text-nowrap",
				"render": function (url, type, full)
				{
					return '<div class="custom-control custom-switch">' +
						'<input type="checkbox" class="custom-control-input" id="customSwitch1">' +
						'<label class="custom-control-label" for="customSwitch1"></label>' +
						'</div>';

					// return "<label class='custom-control custom-checkbox' style='text-align: center! important; padding: 0! important; display: contents;'>" +
					//	"<input type='checkbox' class='custom-control-input' name='validation-checkbox-custom'>" +
					//	"<span class='custom-control-label' style='top: 12px'></span>" +
					//	"</label>";
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
					return "<button type='button' class='btn btn-success' title='Aprobar'><i class='fas fa-check' aria-hidden='true'></i></button>&nbsp" +
						"<button type='button' class='btn btn-danger' title='Rechazar'><i class='far fa-times-circle' aria-hidden='true'></i></button>&nbsp" +
						"<button type='button' class='btn btn-dark' title='Editar'><i class='fas fa-edit' aria-hidden='true'></i></button>&nbsp" +
						"<button type='button' class='btn btn-dark' title='Eliminar'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>&nbsp";
				}
			}
		],
		"columns":
			[
				{
					data: null
				},
				{
					data: null
					//data: "",
					//class: "text-center"
				},
				{
					data: "NumeroPapeleta",
					class: "text-nowrap text-center"
				},
				{
					data: "Grado",
					class: "text-nowrap text-center"
				},
				{
					data: "Especialidad",
					class: "text-nowrap text-center"
				},
				{
					data: "NombreCompleto",
					class: "text-nowrap text-center"
				},
				{
					data: "Departamento",
					class: "text-nowrap text-center"
				},
				{
					data: "FechaRegistro",
					class: "text-nowrap text-center"
				},
				{
					data: "",
					class: "text-nowrap text-center"
				}
			],
		"language": {
			"processing": "Cargando datos...",
			"info": "<span class='badge badge-primary text-light'><span class='font-weight-bold'>_START_</span> - <span class='font-weight-bold'>_END_</span></span>&nbsp" +
				"<span class='badge badge-primary text-light'>Total de registros: <span class='font-weight-bold'>_TOTAL_</span></span>"
		}
	});
};

rolGuardia.papeletaMultiple.listado.tabla.fila.expandeContenidoCompleto = function (e)
{
	const boton = $(e.currentTarget);
	const icono = $(boton).find("svg");

	icono.toggleClass("fa-plus-square").toggleClass("fa-minus-square");
};

rolGuardia.papeletaMultiple.listado.tabla.fila.click = function (e)
{
	rolGuardia.papeletaMultiple.listado.tabla.fila.expandeContenidoCompleto(e);
};

rolGuardia.papeletaMultiple.inicio = function ()
{
	// #region Configuraciones
	rolGuardia.papeletaMultiple.listado.tabla.configurarTabla();
	// #endregion

	// #region Eventos		
	$("#tblPapeletaMultiple > tbody").on("click", "tr > td > button", rolGuardia.papeletaMultiple.listado.tabla.fila.click);
	// #endregion
};

$(rolGuardia.papeletaMultiple.inicio);