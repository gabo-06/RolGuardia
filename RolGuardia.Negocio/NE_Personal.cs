using System;
using System.Collections.Generic;
using System.Linq;
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
                List<ModeloNegocio.Personal> enListaPersonal =
                    (from personal in BD.Personal
                     join papeletaMultiple in BD.PapeletaMultiple on personal.IdPersonal equals papeletaMultiple.IdPersonalEnturno into GrupoPapeletaMultiple // Left join de Personal con PapeletaMultiple.
                     join departamento in BD.Departamento on personal.Departamento equals departamento into GrupoDepartamento // Left join de Personal con departamento.
                     join especialidad in BD.Especialidad on personal.Especialidad equals especialidad into GrupoEspecialidad // Left join de Personal con Especialidad.
                     join gradoPersonal in BD.GradoPersonal on personal.GradoPersonal equals gradoPersonal into GrupoGradoPersonal // Left join de Personal con GradoPersonal.

                     from grupoPapeletaMultiple in GrupoPapeletaMultiple.DefaultIfEmpty()
                     from grupoDepartamento in GrupoDepartamento.DefaultIfEmpty()
                     from grupoEspecialidad in GrupoEspecialidad.DefaultIfEmpty()
                     from grupoGradoPersonal in GrupoGradoPersonal.DefaultIfEmpty()
                     
                     select new ModeloNegocio.Personal
                     {
                         IdPersonal = personal.IdPersonal,
                         NumeroPapeleta = grupoPapeletaMultiple.NumeroPapeleta,
                         Grado = grupoGradoPersonal.Descripcion,
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
