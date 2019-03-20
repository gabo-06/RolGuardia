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
    
    public partial class MetradoAvance
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MetradoAvance()
        {
            this.MetradoAvanceHito = new HashSet<MetradoAvanceHito>();
        }
    
        public long IdMetradoAvance { get; set; }
        public long IdMetrado { get; set; }
        public string IdTurno { get; set; }
        public string IdEstado { get; set; }
        public string IdUsuarioRegistro { get; set; }
        public string IdUsuarioModifico { get; set; }
        public System.DateTime FechaRegistro { get; set; }
        public System.DateTime FechaModifico { get; set; }
    
        public virtual Metrado Metrado { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MetradoAvanceHito> MetradoAvanceHito { get; set; }
    }
}
