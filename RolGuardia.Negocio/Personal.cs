using System;
using System.Collections.Generic;
using System.Linq;
using POCO = RolGuardia.Datos.modelo;
using DTO = RolGuardia.Entidad;

namespace RolGuardia.Negocio
{
    public class Personal
    {
        POCO.BDMarinaConexion BD = new POCO.BDMarinaConexion();

        public DTO.Personal leerPorCIP(string cip = "")
        {
            try
            {
                DTO.Personal enPersonal = (from personal in BD.Personal
                                           join gradoPersonal in BD.GradoPersonal on personal.GradoPersonal equals gradoPersonal into GrupoGradoPersonal // Left join de Personal con GradoPersonal.
                                           join gradoDepartamento in BD.Departamento on personal.Departamento equals gradoDepartamento into GrupoDepartamento // Left join de Personal con Departamento.
                                           from grupoGradoPersonal in GrupoGradoPersonal.DefaultIfEmpty()
                                           from grupoDepartamento in GrupoDepartamento.DefaultIfEmpty()
                                           where personal.Cip == cip
                                           select new DTO.Personal
                                           {
                                               IdPersonal = personal.IdPersonal,
                                               Grado = new Entidad.GradoPersonal
                                               {
                                                   IdGrado = grupoGradoPersonal.IdGrado,
                                                   Descripcion = grupoGradoPersonal.Descripcion
                                               },
                                               Nombres = personal.Nombres,
                                               ApellidoPaterno = personal.ApellidoPaterno,
                                               ApellidoMaterno = personal.ApellidoMaterno,
                                               Departamento = new Entidad.Departamento
                                               {
                                                   IdDepartamento = grupoDepartamento.IdDepartamento,
                                                   Descripcion = grupoDepartamento.Descripcion
                                               },
                                               cip = personal.Cip
                                           }).FirstOrDefault();

                return enPersonal;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
