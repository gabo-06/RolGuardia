﻿/*
user_interface.js
----------------
Contiene métodos y funciones generales para controlar la interactividad 
de las páginas como cuadros de diálogo, notificaciones, mensajes de estado, menús, etc.
*/

var rolGuardia = rolGuardia || {}; // Comprueba si el espacio de nombres ya está creado, si no lo crea.
rolGuardia.userInterface = {}; // Crea el contexto de este archivo "UserInterface.js".
rolGuardia.userInterface.menuLateral = {};
rolGuardia.userInterface.menuLateral.menu = {};

// #region Función que pinta el menú seleccionado al terminar de cargarse.
rolGuardia.userInterface.menuLateral.menu.pintar = function ()
{
	var IdMenuSeleccionado = $("#IdMenuSeleccionado").val(); // Obtiene el id del menú seleccionado, el valor del id viene desde el controlador, donde se setea manualmente.

	if (IdMenuSeleccionado !== "")
	{
		$("#" + IdMenuSeleccionado).closest("ul").addClass("show");
		$("#" + IdMenuSeleccionado).closest("li").addClass("active");
	}
};
// #endregion

rolGuardia.userInterface.menuLateral.menu.pintar();  // Se llama cada vez que se carga la página.