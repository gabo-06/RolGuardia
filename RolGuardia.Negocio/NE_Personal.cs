using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModeloDatos = RolGuardia.Datos.modelo;
using ModeloNegocio = RolGuardia.Entidad;

namespace RolGuardia.Negocio
{
    public class NE_Personal
    {
        ModeloDatos.BDMarinaConexion BD = new ModeloDatos.BDMarinaConexion();

        public List<ModeloNegocio.Personal> listar()
        {
            try
            {
                List<ModeloNegocio.Personal> enListaPersonal = (from papeletaMultiple in BD.PapeletaMultiple
                                                                join personal in BD.Personal on papeletaMultiple.IdPersonalEnturno equals personal.IdPersonal
                                                                join departamento in BD.Departamento on personal.Departamento equals departamento into GrupoDepartamento
                                                                join especialidad in BD.Especialidad on personal.Especialidad equals especialidad into GrupoEspecialidad
                                                                join gradoPersonal in BD.GradoPersonal on personal.GradoPersonal equals gradoPersonal into GrupoGradoPersonalTemporal
                                                                from grupoDepartamento in GrupoDepartamento.DefaultIfEmpty()
                                                                from grupoEspecialidad in GrupoEspecialidad.DefaultIfEmpty()
                                                                from grupoGradoPersonalTemporal in GrupoGradoPersonalTemporal.DefaultIfEmpty()
                                                                where personal.IdPersonal >= 14 && personal.IdPersonal <= 18
                                                                select new ModeloNegocio.Personal
                                                                {
                                                                    IdPersonal = personal.IdPersonal,
                                                                    NumeroPapeleta = papeletaMultiple.NumeroPapeleta,
                                                                    Grado = grupoGradoPersonalTemporal.Descripcion,
                                                                    Especialidad = grupoEspecialidad.Descripcion,
                                                                    Nombres = personal.Nombres,
                                                                    ApellidoPaterno = personal.ApellidoPaterno,
                                                                    ApellidoMaterno = personal.ApellidoMaterno,
                                                                    Departamento = grupoDepartamento.Descripcion,
                                                                    FechaRegistro = personal.FechaRegistro
                                                                }).ToList();

                return enListaPersonal;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


    }
}
