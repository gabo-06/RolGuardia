//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RolGuardia.Datos.modelo
{
    using System;
    using System.Collections.Generic;
    
    public partial class CondicionPapeleta
    {
        public int IdCondicionP { get; set; }
        public int IdPapeleta { get; set; }
        public Nullable<int> IdPersonalAprobador { get; set; }
        public string EstadoAprobacion { get; set; }
        public Nullable<System.DateTime> FechaRegistro { get; set; }
        public string Observacion { get; set; }
    
        public virtual PapeletaMultiple PapeletaMultiple { get; set; }
        public virtual Personal Personal { get; set; }
    }
}
