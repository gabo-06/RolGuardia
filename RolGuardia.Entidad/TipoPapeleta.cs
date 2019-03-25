using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RolGuardia.Entidad
{
    public class TipoPapeleta
    {
        public int IdTipoPapeleta { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public string RequiereAprobacion { get; set; }
    }
}
