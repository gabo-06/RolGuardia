/*
user_interface.js
----------------
Contiene métodos y funciones generales para controlar la interactividad 
de las páginas como cuadros de diálogo, notificaciones, mensajes de estado, menús, etc.
*/

var rolGuardia = rolGuardia || {}; // Comprueba si el espacio de nombres ya está creado, si no lo crea.
rolGuardia.userInterface = {}; // Crea el contexto de este archivo "UserInterface.js".
rolGuardia.userInterface.menuLateral = {};
rolGuardia.userInterface.menuLateral.menu = {};

rolGuardia.userInterface.menuLateral.menu.pintar = function ()
{
    var IdMenuSeleccionado = $("#IdMenuSeleccionado").val(); // Obtiene el id del menú seleccionado, el valor del id viene desde el controlador, donde se setea manualmente.

    if (IdMenuSeleccionado !== "")
    {
        $("#" + IdMenuSeleccionado).closest("ul").addClass("show");
        $("#" + IdMenuSeleccionado).closest("li").addClass("active");
    }
};
rolGuardia.userInterface.configurarComboSelect2 = function (combo, data, placeholder)
{
    combo.html('').select2({
        data: data,
        allowClear: true,
        placeholder: placeholder,
        language: {
            noResults: function ()
            {
                return "No hay datos";
            },
            searching: function ()
            {
                return "Buscando..";
            }
        }
    });
    combo.val(null).trigger('change');
};

rolGuardia.userInterface.configurarControlDeFecha = function (controlFecha, funcion)
{
    controlFecha.datepicker({
        autoclose: true,
        language: "es",
        // format: "yyyy-mm-dd"
        format: "dd/mm/yyyy",
        orientation: "bottom auto",
        // setDate: rolGuardia.utilities.convertiFecha(Date.now())
    }).on("changeDate", funcion);
};

rolGuardia.userInterface.menuLateral.menu.pintar();  // Se llama cada vez que se carga la página.