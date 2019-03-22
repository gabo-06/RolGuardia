var rolGuardia = rolGuardia || {};
rolGuardia.inicio = {};

rolGuardia.inicio.inicio = function ()
{
    localStorage.setItem("ListaCondicionesPapeleta", rolGuardia.generalData.listarData("/CondicionPapeleta/listar"));
};

$(rolGuardia.inicio.inicio);