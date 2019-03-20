using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RolGuardia.Negocio;
using ModeloNegocio = RolGuardia.Entidad;
using ModeloVista = RolGuardia.MVC.Models;
using Newtonsoft.Json;
using AutoMapper;

namespace RolGuardia.MVC.Controllers
{
    public class MetradoController : Controller
    {
        List<ModeloVista.Metrado> listaMetrado = new List<ModeloVista.Metrado>();
        List<ModeloVista.Metrado> listaMetradoTemporal = new List<ModeloVista.Metrado>();

        public ActionResult obtenerMetrado()
        {
            #region Variables
            List<ModeloNegocio.Metrado> enListaMetrado;
            NE_Metrado neMetrado = new NE_Metrado();
            string search = Request.Form.GetValues("search[value]")[0];
            string idMetrado = Request.Form.GetValues("columns[0][search][value]").FirstOrDefault();
            string draw = Request.Form.GetValues("draw")[0];
            string order = Request.Form.GetValues("order[0][column]")[0];
            string orderDir = Request.Form.GetValues("order[0][dir]")[0];
            int startRec = Convert.ToInt32(Request.Form.GetValues("start")[0]);
            int pageSize = Convert.ToInt32(Request.Form.GetValues("length")[0]);
            #endregion

            try
            {
                #region Obtención de data (ya).
                if (Session["ListaMetrado"] == null)
                {
                    if (this.listaMetrado.Count == 0)
                    {
                        enListaMetrado = neMetrado.listar();
                        this.listaMetrado = Mapper.Map<List<ModeloNegocio.Metrado>, List<ModeloVista.Metrado>>(enListaMetrado);
                        Session["ListaMetrado"] = this.listaMetrado;
                    }
                }
                else
                    this.listaMetrado = (List<ModeloVista.Metrado>)Session["ListaMetrado"];
                #endregion

                #region Cantidad total de registros. (ya)
                int recordsTotal = this.listaMetrado.Count();
                #endregion

                #region Clona la data en la variable temporal que se va a utilizar para manipular las búsquedas.
                if (search.Trim() == "" || this.listaMetradoTemporal.Count() == 0)
                {
                    this.listaMetradoTemporal = this.listaMetrado;
                }
                #endregion

                if (!string.IsNullOrEmpty(idMetrado))
                {
                    this.listaMetradoTemporal = this.listaMetrado.Where(p => p.IdMetrado.ToString().Trim().ToLower().Contains(idMetrado.Trim().ToLower())
                                                                                ).ToList();
                }


                #region Ordenación. (Aún no tiene nada).

                #endregion

                #region Obtiene cantidad de registro filtrados. (ya)
                int recordsFiltered = this.listaMetradoTemporal.Count();
                #endregion

                #region Aplica la paginación. (ya)
                this.listaMetradoTemporal = this.listaMetradoTemporal.Skip(startRec).Take(pageSize).ToList();
                #endregion

                #region Retorno de datos.
                return Json(new // (ya)
                {
                    draw = Convert.ToInt32(draw),
                    recordsTotal = recordsTotal,
                    recordsFiltered = recordsFiltered,
                    data = this.listaMetradoTemporal
                },
                JsonRequestBehavior.AllowGet);
                #endregion                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult Index()
        {
            ViewBag.IdMenuSeleccionado = "Metrado";

            return View();
        }
    }
}