using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RolGuardia.MVC.Models
{
    public class Personal
    {
        public int IdPersonal { get; set; }
        public string NumeroPapeleta { get; set; }
        public string Grado { get; set; }
        public string Especialidad { get; set; }
        // public string Nombres { get; set; }
        // public string ApellidoPaterno { get; set; }
        // public string ApellidoMaterno { get; set; }
        public string NombreCompleto { get; set; }
        public string Departamento { get; set; }
        public Nullable<DateTime> FechaRegistro { get; set; }
    }
}