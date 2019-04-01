/*
user_interface.js
----------------
Contiene métodos y funciones generales para resolver problemas específicos como conversiones, etc.
*/

var rolGuardia = rolGuardia || {}; // Comprueba si el espacio de nombres ya está creado, si no lo crea.
rolGuardia.utilities = {}; // Crea el contexto de este archivo "UserInterface.js".

rolGuardia.utilities.paddy = function (num, padlen, padchar)
{
	var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
	var pad = new Array(1 + padlen).join(pad_char);

	return (pad + num).slice(-pad.length);
};

rolGuardia.utilities.convertiFecha = function (fechaCadena)
{
	var fechaObjeto = new Date(parseInt(fechaCadena.replace('/Date(', '')));
	var mes = rolGuardia.utilities.paddy(fechaObjeto.getMonth() + 1, 2);
	var dia = rolGuardia.utilities.paddy(fechaObjeto.getDate(), 2);
	var año = fechaObjeto.getFullYear();
	var nuevaFechaCadena = dia + "/" + mes + "/" + año;

	return nuevaFechaCadena;
}