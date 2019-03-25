var rolGuardia = rolGuardia || {};
rolGuardia.inicio = {};

rolGuardia.inicio.inicio = function ()
{
    localStorage.setItem("ListaTipoPapeleta", rolGuardia.generalData.listarData("/TipoPapeleta/listar"));
};

$(rolGuardia.inicio.inicio);