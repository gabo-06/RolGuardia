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
    public class InicioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

    }
}