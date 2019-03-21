using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RolGuardia.Entidad
{
    public class Personal
    {
        public int IdPersonal { get; set; }
        public GradoPersonal Grado { get; set; }
        public string Nombres { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public Departamento Departamento { get; set; }
        public string cip { get; set; }
    }
}