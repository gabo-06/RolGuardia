using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DTO = RolGuardia.Entidad;
using Model = RolGuardia.MVC.Models;
using Servicio = RolGuardia.Negocio;
using AutoMapper;
using Newtonsoft.Json;

namespace RolGuardia.MVC.Controllers
{
    public class CondicionPapeletaController : Controller
    {
        public JsonResult listar()
        {
            #region Variables
            Servicio.CondicionPapeleta servicioCondicionPapeleta = new Servicio.CondicionPapeleta();
            List<DTO.CondicionPapeleta> listaDtoCondicionPapeleta;
            List<Model.CondicionPapeleta> listaModeloCondicionPapeleta;
            #endregion

            try
            {
                listaDtoCondicionPapeleta = servicioCondicionPapeleta.listar();
                listaModeloCondicionPapeleta = Mapper.Map<List<DTO.CondicionPapeleta>, List<Model.CondicionPapeleta>>(listaDtoCondicionPapeleta);

                return Json(listaModeloCondicionPapeleta, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}