// #region Definición de Espacios de nombres.
var rolGuardia = rolGuardia || {};
rolGuardia.papeletaMultiple = {};

rolGuardia.papeletaMultiple.registro = {};
rolGuardia.papeletaMultiple.registro.controles = {};
// rolGuardia.papeletaMultiple.registro.controles.NewCustomer = {};

rolGuardia.papeletaMultiple.listado = {};
rolGuardia.papeletaMultiple.listado.tabla = {};
rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas = [];
rolGuardia.papeletaMultiple.listado.tabla.fila = {};
// #endregion

rolGuardia.papeletaMultiple.listado.tabla.configurarTabla = function ()
{
	rolGuardia.papeletaMultiple.listado.tabla.DataTable = $("#tblPapeletaMultiple").DataTable({
		"responsive": true,
		"processing": true,
        "serverSide": true,
        "dom": '<"top"i>rt<"bottom"lp><"clear">',
		"ajax": {
			// "async": false,
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
					return "<button class='btn ExpConFila'><i class='far fa-plus-square'></i></button>";
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
					// #region Control Switch 
                    return '<div class="custom-control custom-switch">' +
						'<input type="checkbox" class="custom-control-input" value="' + url.IdPersonal + '" id="' + url.IdPersonal + '" >' +
                        '<label class="custom-control-label FilaPapeleta" for="' + url.IdPersonal + '" style="cursor: pointer;"></label>' +
						'</div>';
					// #endregion

					// #region Control Checkbox
					// return "<label class='custom-control custom-checkbox' style='text-align: center! important; padding: 0! important; display: contents;'>" +
					// 	"<input type='checkbox' class='custom-control-input FilaPapeleta' id='" + full.IdPersonal + "' value='" + full.IdPersonal + "' name='validation-checkbox-custom'>" +
					// 	"<span class='custom-control-label' style='top: 12px'></span>" +
					// 	"</label>";
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
					return "<button type='button' class='btn btn-success' title='Aprobar'><i class='fas fa-check' aria-hidden='true'></i></button>&nbsp" +
						"<button type='button' class='btn btn-danger' title='Rechazar'><i class='far fa-times-circle' aria-hidden='true'></i></button>&nbsp" +
						"<button type='button' class='btn btn-dark' title='Editar'><i class='fas fa-edit' aria-hidden='true'></i></button>&nbsp" +
						"<button type='button' class='btn btn-dark' title='Eliminar'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>&nbsp";
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
					//data: "",
					//class: "text-center"
				},
				{
                    data: "NumeroPapeleta",
                    name: "NumeroPapeleta",
					class: "text-nowrap text-center"
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
		} ,
		initComplete: function ()
		{
			this.api().columns().every(function ()
			{
				var column = this;
				if (column.selector.cols === 4)
				{
					var select = $('<select><option value=""></option></select>')
						.appendTo($(column.footer()).empty())
						.on('change', function ()
						{
							var val = $.fn.dataTable.util.escapeRegex(
								$(this).val()
							);
		
							column
								.search(val ? '^' + val + '$' : '', true, false)
								.draw();
						});
		
					column.data().unique().sort().each(function (d, j)
					{
						select.append('<option value="' + d + '">' + d + '</option>');
					});
				}
			});
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

rolGuardia.papeletaMultiple.inicio = function ()
{
	// #region Configuraciones
	rolGuardia.papeletaMultiple.listado.tabla.configurarTabla();
	// #endregion

	// #region Eventos		
	$("#tblPapeletaMultiple > tbody").on("click", "tr > td > .ExpConFila", rolGuardia.papeletaMultiple.listado.tabla.fila.click);
	$("#tblPapeletaMultiple > tbody").on("click", "tr > td > .custom-control > .FilaPapeleta", function (e)
	{
		// #region Control Checkbox 
		// let idPersonal = parseInt($(this).val());
		// let indice = $.inArray(idPersonal, rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas);
		// 
		// if (this.checked && indice === -1)
		// 	rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas.push(idPersonal);
		// else if (!this.checked && indice !== -1)
		// 	rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas.splice(indice, 1);
		// #endregion
		// #region Control Switch 
		let contenedor = $(this).closest(".custom-switch");
        let inputSwitch = $(contenedor).find("input[type=checkbox]");
        let idPersonal = parseInt($(inputSwitch).attr("id"));
		let indice = $.inArray(idPersonal, rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas);
        let fila = $(inputSwitch).closest("tr");

        // #region Agrega el índice del registro seleccionado al arreglo de filas seleccionadas.
		if (!$(this)["0"].control.checked)
			rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas.push(idPersonal);
		else
            rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas.splice(indice, 1);
        // #endregion
        // #region Pintado de fila cuando selecciona el registro
        $(fila).toggleClass("bg-warning font-weight-bold");
        // #endregion
		// #endregion
	});

    $("#txtNumeroPapeletaF").on("keyup", function () {
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
};

$("#tblPapeletaMultiple").on('draw.dt', function ()
{
	for (var i = 0; i < rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas.length; i++)
	{
		checkboxId = rolGuardia.papeletaMultiple.listado.tabla.arregloDeFilasSeleccionadas[i];
		$('#' + checkboxId).attr('checked', true);
	}
});

$(rolGuardia.papeletaMultiple.inicio);