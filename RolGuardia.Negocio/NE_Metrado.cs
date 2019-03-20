using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModeloDatos = RolGuardia.Datos.modelo;
using ModeloNegocio = RolGuardia.Entidad;

namespace RolGuardia.Negocio
{
    public class NE_Metrado
    {
        ModeloDatos.ConexionAvance BD = new ModeloDatos.ConexionAvance();

        public List<ModeloNegocio.Metrado> listar()
        {
            try
            {
                List<ModeloNegocio.Metrado> enListaMetrado =
                    (from met in BD.Metrado  
                     select new ModeloNegocio.Metrado
                     {
                         IdMetrado = met.IdMetrado,
                         IdMilestone = met.IdMilestone,
                         IdEstado = met.IdEstado,
                         FechaRegistro = met.FechaRegistro,
                         FechaModifico = met.FechaModifico,                         
                         IdUsuarioRelevo = met.IdUsuarioRelevo,
                         IdUnidadMedida = met.IdUnidadMedida,
                         MetradoEstimado = met.MetradoEstimado,
                         IdUltimoMotivoEdicion = met.IdUltimoMotivoEdicion,
                         IdTipoOrigen = met.IdTipoOrigen
                     }).ToList();

                return enListaMetrado;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
