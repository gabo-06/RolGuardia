// #region Definición de Espacios de nombres.
var rolGuardia = rolGuardia || {};
rolGuardia.papeletaMultiple = {};

rolGuardia.papeletaMultiple.registro = {};
rolGuardia.papeletaMultiple.registro.controles = {};
// rolGuardia.papeletaMultiple.registro.controles.NewCustomer = {};

rolGuardia.papeletaMultiple.tabla = {};
rolGuardia.papeletaMultiple.tabla.fila = {};
// #endregion

rolGuardia.papeletaMultiple.tabla.configurarTabla = function ()
{
	rolGuardia.papeletaMultiple.tabla = $("#tblPapeletaMultiple").DataTable({
		"responsive": true,
		"proccessing": true,
		"serverSide": true,
		"ajax": {
			"url": "/PapeletaMultiple/obtenerPersonal",
			"type": "POST",
			"dataType": "JSON"
		},
		// order: [[1, 'asc']],
		"columnDefs": [
			{
				"targets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				"orderable": false,
				"class": "text-nowrap"
			},
			{
				"targets": [0],
				"orderable": false,
				"class": "text-nowrap",
				"render": function (url, type, full)
				{
					return '<label class="custom-control custom-checkbox d-block" style="left: 2em"><input type="checkbox" class="custom-control-input" name="validation-checkbox-custom"><span class="custom-control-label"></span></label>';
				}
			},
			{
				"targets": [1],
				"orderable": false,
				"class": "text-nowrap text-center",
				"render": function (url, type, full)
				{
					return full.NumeroPapeleta;
				}
			},
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
					return "<button type='button' class='btn btn-success' title='Aprobar'><i class='fas fa-check' aria-hidden='true'></i></button>";
				}
			},
			{
				"targets": [8],
				"orderable": false,
				"class": "text-nowrap",
				"render": function (url, type, full)
				{
					return "<button type='button' class='btn btn-danger' title='Rechazar'><i class='far fa-times-circle' aria-hidden='true'></i></button>";
				}
			},
			{
				"targets": [9],
				"orderable": false,
				"class": "text-nowrap",
				"render": function (url, type, full)
				{
					return "<button type='button' class='btn btn-dark' title='Editar'><i class='fas fa-edit' aria-hidden='true'></i></button>";
				}
			},
			{
				"targets": [10],
				"orderable": false,
				"class": "text-nowrap",
				"render": function (url, type, full)
				{
					return "<button type='button' class='btn btn-dark' title='Eliminar'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>";
				}
			}
		],
		"columns":
			[
				{ data: "" },
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
				{ data: "" },
				{ data: "" },
				{ data: "" },
				{ data: "" }
			],
		"language": {
			"processing": "Cargando datos..."
		}
	});
};

rolGuardia.papeletaMultiple.inicio = function ()
{
	// #region Configuraciones
	rolGuardia.papeletaMultiple.tabla.configurarTabla();
	// #endregion

	// #region Eventos
	// #endregion
};

$(rolGuardia.papeletaMultiple.inicio);