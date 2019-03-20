using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RolGuardia.MVC.Models
{
    public class Metrado
    {
        public long IdMetrado { get; set; }
        public int IdMilestone { get; set; }
        public string IdEstado { get; set; }
        public string IdUsuarioRegistro { get; set; }
        public string IdUsuarioModifico { get; set; }
        public System.DateTime FechaRegistro { get; set; }
        public System.DateTime FechaModifico { get; set; }
        public string IdUsuarioRelevo { get; set; }
        public string IdUnidadMedida { get; set; }
        // public Nullable<decimal> MetradoEstimado { get; set; }
        // public string IdUltimoMotivoEdicion { get; set; }
        // public string IdTipoOrigen { get; set; }
    }
}