/*
user_interface.js
----------------

Contiene métodos y funciones para obtener en variable generales, data
que se va a consumir en los diferentes módulos del sistema, por ejemplo
en listas desplegables.
*/

var rolGuardia = rolGuardia || {};
rolGuardia.generalData = {};

rolGuardia.generalData.CondicionesCombo = null;

rolGuardia.generalData.listarDataCombo = function (claveLocalStorage)
{
    return $.map(JSON.parse(localStorage.getItem(claveLocalStorage)), function (objeto)
    {
        let claves = Object.keys(objeto);
        let id = objeto[claves[0].trim()];
        let text = objeto[claves[1].trim()].toUpperCase();
        return { "id": id, "text": text };
    });
};

rolGuardia.generalData.listarData = function (url)
{
    let data = null;
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        dataType: 'json'
    }).done(function (rpta)
    {
        data = JSON.stringify(rpta);
    });
    return data;
};



