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
    public class PapeletaMultipleController : Controller
    {
        List<ModeloVista.Personal> listaPersonal = new List<ModeloVista.Personal>();
        List<ModeloVista.Personal> listaPersonalTemporal = new List<ModeloVista.Personal>();

        public ActionResult obtenerPersonal()
        {
            try
            {
                #region Variables
                List<ModeloNegocio.Personal> enListaPersonal;
                NE_Personal nePersonal = new NE_Personal();
                string search = Request.Form.GetValues("search[value]")[0];
                string numeroPapeleta = Request.Form.GetValues("columns[2][search][value]").FirstOrDefault();
                string nombreCompleto = Request.Form.GetValues("columns[5][search][value]").FirstOrDefault();
                string draw = Request.Form.GetValues("draw")[0];
                string order = Request.Form.GetValues("order[0][column]")[0];
                string orderDir = Request.Form.GetValues("order[0][dir]")[0];
                int startRec = Convert.ToInt32(Request.Form.GetValues("start")[0]);
                int pageSize = Convert.ToInt32(Request.Form.GetValues("length")[0]);
                #endregion

                #region Obtención de data (ya).
                if (this.listaPersonal.Count == 0)
                {
                    enListaPersonal = nePersonal.listar();
                    this.listaPersonal = Mapper.Map<List<ModeloNegocio.Personal>, List<ModeloVista.Personal>>(enListaPersonal);
                }
                #endregion

                #region Cantidad total de registros. (ya)
                int recordsTotal = this.listaPersonal.Count();
                #endregion

                #region Clona la data en la variable temporal que se va a utilizar para manipular las búsquedas.
                if ((numeroPapeleta.Trim() == "" &&
                     nombreCompleto.Trim() == "") ||
                     this.listaPersonalTemporal.Count() == 0)
                {
                    this.listaPersonalTemporal = this.listaPersonal;
                }
                #endregion

                #region Filtrado
                // if (!string.IsNullOrEmpty(search) && !string.IsNullOrWhiteSpace(search))
                // {
                //     this.listaPersonalTemporal = this.listaPersonal.Where(p => (p.NumeroPapeleta = p.NumeroPapeleta ?? "").ToString().ToLower().Contains(search.ToLower()) ||
                //                                                                 (p.NombreCompleto = p.NombreCompleto ?? "").ToString().ToLower().Contains(search.Replace(" ", "").ToLower())
                //                                                         ).ToList();
                // }
                #endregion

                if (!string.IsNullOrEmpty(numeroPapeleta) || !string.IsNullOrEmpty(nombreCompleto))
                {
                    this.listaPersonalTemporal = this.listaPersonal.Where(p => (p.NumeroPapeleta = p.NumeroPapeleta ?? "").ToString().Trim().ToLower().Contains(numeroPapeleta.Trim().ToLower()) &&
                                                                                (p.NombreCompleto = p.NombreCompleto ?? "").ToString().Trim().ToLower().Contains(nombreCompleto.Trim().ToLower())
                                                                               ).ToList();
                }

                // if (!string.IsNullOrEmpty(nombreCompleto))
                // {
                //     this.listaPersonalTemporal = this.listaPersonal.Where(p => (p.NombreCompleto = p.NombreCompleto ?? "").ToString().Trim().ToLower().Contains(nombreCompleto.Trim().ToLower())
                //                                                                ).ToList();
                // }

                #region Ordenación. (Aún no tiene nada).

                #endregion

                #region Obtiene cantidad de registro filtrados. (ya)
                int recordsFiltered = this.listaPersonalTemporal.Count();
                #endregion

                #region Aplica la paginación. (ya)
                this.listaPersonalTemporal = this.listaPersonalTemporal.Skip(startRec).Take(pageSize).ToList();
                #endregion

                #region Retorno de datos.
                return Json(new // (ya)
                {
                    draw = Convert.ToInt32(draw),
                    recordsTotal = recordsTotal,
                    recordsFiltered = recordsFiltered,
                    data = this.listaPersonalTemporal
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
            ViewBag.IdMenuSeleccionado = "PapeletaMultiple"; // Envía el Id del menú seleccionado para saber que menú se eligió y así poder pintarlo.

            return View();
        }


    }
}