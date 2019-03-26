﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DTO = RolGuardia.Entidad;
using Model = RolGuardia.MVC.Models;
using Servicio = RolGuardia.Negocio;
using Newtonsoft.Json;
using AutoMapper;

namespace RolGuardia.MVC.Controllers
{
    public class PapeletaMultipleController : Controller
    {
        List<Model.PapeletaMultiple> listaPapeleteMultiple = new List<Model.PapeletaMultiple>();
        List<Model.PapeletaMultiple> listaPapeleteMultipleTemporal = new List<Model.PapeletaMultiple>();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult listarPapeleta()
        {
            #region Variables
            Servicio.PapeletaMultiple sePapeletaMultiple = new Servicio.PapeletaMultiple();
            List<DTO.PapeletaMultiple> enListaPapeletaMultiple;
            string search = Request.Form.GetValues("search[value]")[0];
            string numeroPapeleta = Request.Form.GetValues("columns[2][search][value]").FirstOrDefault();
            string nombreCompleto = Request.Form.GetValues("columns[5][search][value]").FirstOrDefault();
            string draw = Request.Form.GetValues("draw")[0];
            string order = Request.Form.GetValues("order[0][column]")[0];
            string orderDir = Request.Form.GetValues("order[0][dir]")[0];
            int startRec = Convert.ToInt32(Request.Form.GetValues("start")[0]);
            int pageSize = Convert.ToInt32(Request.Form.GetValues("length")[0]);
            #endregion

            try
            {

                #region Obtención de data.
                if (this.listaPapeleteMultiple.Count == 0)
                {
                    enListaPapeletaMultiple = sePapeletaMultiple.listar();
                    this.listaPapeleteMultiple = Mapper.Map<List<DTO.PapeletaMultiple>, List<Model.PapeletaMultiple>>(enListaPapeletaMultiple);
                }
                #endregion

                #region Cantidad total de registros.
                int recordsTotal = this.listaPapeleteMultiple.Count();
                #endregion

                #region Clona la data en la variable temporal que se va a utilizar para manipular las búsquedas.
                if ((numeroPapeleta.Trim() == "" &&
                     nombreCompleto.Trim() == "") ||
                     this.listaPapeleteMultipleTemporal.Count() == 0)
                {
                    this.listaPapeleteMultipleTemporal = this.listaPapeleteMultiple;
                }
                #endregion

                #region Filtrado
                if (!string.IsNullOrEmpty(numeroPapeleta) || !string.IsNullOrEmpty(nombreCompleto))
                {
                    this.listaPapeleteMultipleTemporal = this.listaPapeleteMultiple.Where(p => (p.NumeroPapeleta = p.NumeroPapeleta ?? "").ToString().Trim().ToLower().Contains(numeroPapeleta.Trim().ToLower()) &&
                                                                                (p.NombreCompleto = p.NombreCompleto ?? "").ToString().Trim().ToLower().Contains(nombreCompleto.Trim().ToLower())
                                                                               ).ToList();
                }
                #endregion

                #region Ordenación. (Aún no tiene nada).

                #endregion

                #region Obtiene cantidad de registro filtrados.
                int recordsFiltered = this.listaPapeleteMultipleTemporal.Count();
                #endregion

                #region Aplica la paginación.
                this.listaPapeleteMultipleTemporal = this.listaPapeleteMultipleTemporal.Skip(startRec).Take(pageSize).ToList();
                #endregion

                #region Retorno de datos.
                return Json(new
                {
                    draw = Convert.ToInt32(draw),
                    recordsTotal = recordsTotal,
                    recordsFiltered = recordsFiltered,
                    data = this.listaPapeleteMultipleTemporal
                },
                JsonRequestBehavior.AllowGet);
                #endregion
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult leerPersonalPorCIP(string cip = "")
        {
            #region Variables
            Servicio.Personal servicioPersonal = new Servicio.Personal();
            DTO.Personal dtoPersonal;
            Model.Personal modeloPersonal;
            #endregion

            try
            {
                dtoPersonal = servicioPersonal.leerPorCIP(cip);
                modeloPersonal = Mapper.Map<DTO.Personal, Model.Personal>(dtoPersonal);

                return Json(modeloPersonal, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void registrarPapeleta(Model.PapeletaMultiple papeleta)
        {

            #region Variables
            Servicio.PapeletaMultiple sePapeletaMultiple = new Servicio.PapeletaMultiple();
            DTO.PapeletaMultiple dtoPapeleta;
            #endregion

            try
            {
                dtoPapeleta = Mapper.Map<Model.PapeletaMultiple, DTO.PapeletaMultiple>(papeleta);
                sePapeletaMultiple.registrar(dtoPapeleta);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void editarPapeleta(Model.PapeletaMultiple papeleta)
        {

            #region Variables
            Servicio.PapeletaMultiple sePapeletaMultiple = new Servicio.PapeletaMultiple();
            DTO.PapeletaMultiple dtoPapeleta;
            #endregion

            try
            {
                dtoPapeleta = Mapper.Map<Model.PapeletaMultiple, DTO.PapeletaMultiple>(papeleta);
                sePapeletaMultiple.editar(dtoPapeleta);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void aprobarPapeleta(int IdPapeleta = 0)
        {
            Servicio.PapeletaMultiple sePapeletaMultiple = new Servicio.PapeletaMultiple();

            try
            {
                sePapeletaMultiple.aprobar(IdPapeleta);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void rechazarPapeleta(int IdPapeleta = 0)
        {
            Servicio.PapeletaMultiple sePapeletaMultiple = new Servicio.PapeletaMultiple();

            try
            {            
                sePapeletaMultiple.rechazar(IdPapeleta);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void eliminarPapeleta(int IdPapeleta = 0)
        {
            Servicio.PapeletaMultiple sePapeletaMultiple = new Servicio.PapeletaMultiple();

            try
            {
                sePapeletaMultiple.eliminar(IdPapeleta);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult leerPapeletaPorId(int IdPapeleta = 0)
        {            
            Servicio.PapeletaMultiple sePapeletaMultiple = new Servicio.PapeletaMultiple();
            DTO.PapeletaMultiple dtoPapeleta;
            Model.PapeletaMultiple papeleta;

            try
            {
                dtoPapeleta = sePapeletaMultiple.leer(IdPapeleta);
                papeleta = Mapper.Map<DTO.PapeletaMultiple, Model.PapeletaMultiple>(dtoPapeleta);

                return Json(papeleta, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}