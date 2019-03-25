using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using POCO = RolGuardia.Datos.modelo;
using DTO = RolGuardia.Entidad;

namespace RolGuardia.Negocio
{
    public class CondicionPapeleta
    {
        POCO.BDMarinaConexion BD = new POCO.BDMarinaConexion();

        public List<DTO.CondicionPapeleta> listar()
        {
            try
            {
                List<DTO.CondicionPapeleta> dtoListaCondicionPapeleta = (from condicionPapeleta in BD.CondicionPapeletas
                                                                         select new DTO.CondicionPapeleta
                                                                         {
                                                                             IdCondicionP = condicionPapeleta.IdCondicionP,
                                                                             EstadoAprobacion = condicionPapeleta.EstadoAprobacion,
                                                                             Observacion = condicionPapeleta.Observacion
                                                                         }).ToList();

                return dtoListaCondicionPapeleta;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
