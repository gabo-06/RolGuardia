using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using POCO = RolGuardia.Datos.modelo;
using DTO = RolGuardia.Entidad;

namespace RolGuardia.Negocio
{
    public class TipoPapeleta
    {
        POCO.BDMarinaConexion BD = new POCO.BDMarinaConexion();

        public List<DTO.TipoPapeleta> listar()
        {
            try
            {
                List<DTO.TipoPapeleta> dtoListaTipoPapeleta = (from tipoPapeleta in BD.TipoPaleletas
                                                               select new DTO.TipoPapeleta
                                                               {
                                                                   IdTipoPapeleta = tipoPapeleta.IdTipoPapeleta,
                                                                   Descripcion = tipoPapeleta.Descripción,
                                                                   Estado = tipoPapeleta.Estado,
                                                                   RequiereAprobacion = tipoPapeleta.RequiereAprobacion
                                                               }).ToList();

                return dtoListaTipoPapeleta;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
