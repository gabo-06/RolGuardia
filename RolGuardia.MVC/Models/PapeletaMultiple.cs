using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RolGuardia.MVC.Models
{
    public class PapeletaMultiple
    {
        public int IdPapeleta { get; set; }
        public string NumeroPapeleta { get; set; }
        public string Grado { get; set; }
        public string Especialidad { get; set; }
        public Personal personalRegistro { get; set; }
        public Personal personalEnTurno { get; set; }
        public Personal personalReemplazo { get; set; }
        public string NombreCompleto { get; set; }
        public string Departamento { get; set; }
        public TipoPapeleta tipoPapeleta { get; set; }
        public DateTime FechaCubrir { get; set; }
        public DateTime FechaDevolverTurno { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string Estado { get; set; }
        public string Observacion { get; set; }
    }
}