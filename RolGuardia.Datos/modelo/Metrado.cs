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
    
    public partial class Metrado
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Metrado()
        {
            this.MetradoHito = new HashSet<MetradoHito>();
            this.MetradoCampo = new HashSet<MetradoCampo>();
            this.MetradoAvance = new HashSet<MetradoAvance>();
        }
    
        public long IdMetrado { get; set; }
        public int IdMilestone { get; set; }
        public string IdEstado { get; set; }
        public string IdUsuarioRegistro { get; set; }
        public string IdUsuarioModifico { get; set; }
        public System.DateTime FechaRegistro { get; set; }
        public System.DateTime FechaModifico { get; set; }
        public string IdUsuarioRelevo { get; set; }
        public string IdUnidadMedida { get; set; }
        public Nullable<decimal> MetradoEstimado { get; set; }
        public string IdUltimoMotivoEdicion { get; set; }
        public string IdTipoOrigen { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MetradoHito> MetradoHito { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MetradoCampo> MetradoCampo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MetradoAvance> MetradoAvance { get; set; }
    }
}