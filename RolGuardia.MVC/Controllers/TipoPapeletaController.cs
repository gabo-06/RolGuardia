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
    public class TipoPapeletaController : Controller
    {
        public JsonResult listar()
        {
            #region Variables
            Servicio.TipoPapeleta servicioTipoPapeleta = new Servicio.TipoPapeleta();
            List<DTO.TipoPapeleta> listaDtoTipoPapeleta;
            List<Model.TipoPapeleta> listaModeloTipoPapeleta;
            #endregion

            try
            {
                listaDtoTipoPapeleta = servicioTipoPapeleta.listar();
                listaModeloTipoPapeleta = Mapper.Map<List<DTO.TipoPapeleta>, List<Model.TipoPapeleta>>(listaDtoTipoPapeleta);

                return Json(listaModeloTipoPapeleta, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}