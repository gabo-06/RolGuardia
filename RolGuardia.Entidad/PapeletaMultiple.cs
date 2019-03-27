using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RolGuardia.Entidad
{
    public class PapeletaMultiple
    {
        public Nullable<int> IdPapeleta { get; set; }
        public string NumeroPapeleta { get; set; }
        public string Grado { get; set; }
        public string Especialidad { get; set; }
        public Personal personalRegistro { get; set; }
        public Personal personalEnTurno { get; set; }
        public Personal personalReemplazo { get; set; }
        public string Nombres { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Departamento { get; set; }
        public TipoPapeleta tipoPapeleta { get; set; }
        public Nullable<DateTime> FechaRegistro { get; set; }
        public DateTime? FechaCubrir { get; set; }
        public DateTime? FechaDevolverTurno { get; set; }
        public string Estado { get; set; }
        public string Observacion { get; set; }
    }
}
