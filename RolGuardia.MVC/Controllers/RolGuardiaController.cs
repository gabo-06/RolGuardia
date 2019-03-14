using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RolGuardia.MVC.Controllers
{
    public class RolGuardiaController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.IdMenuSeleccionado = "MenuRolGuardia"; // Envía el Id del menú seleccionado para saber que menú se eligió y así poder pintarlo.
            return View();
        }
    }
}