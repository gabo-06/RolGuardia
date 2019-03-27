using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModeloDatos = RolGuardia.Datos.modelo;
using DTO = RolGuardia.Entidad;

namespace RolGuardia.Negocio
{
    public class PapeletaMultiple
    {
        public List<DTO.PapeletaMultiple> listar()
        {
            ModeloDatos.BDMarinaConexion BD = new ModeloDatos.BDMarinaConexion();

            try
            {
                List<DTO.PapeletaMultiple> enListaPapeletaMultiple =
                     // (from personal in BD.Personal
                     //  join papeletaMultiple in BD.PapeletaMultiple on personal.IdPersonal equals papeletaMultiple.IdPersonalEnturno into GrupoPapeletaMultiple // Left join de Personal con PapeletaMultiple.
                     //  join departamento in BD.Departamento on personal.Departamento equals departamento into GrupoDepartamento // Left join de Personal con departamento.
                     //  join especialidad in BD.Especialidad on personal.Especialidad equals especialidad into GrupoEspecialidad // Left join de Personal con Especialidad.
                     //  join gradoPersonal in BD.GradoPersonal on personal.GradoPersonal equals gradoPersonal into GrupoGradoPersonal // Left join de Personal con GradoPersonal.

                     (from papeletaMultiple in BD.PapeletaMultiples
                      join personal in BD.Personals on papeletaMultiple.IdPersonalEnturno equals personal.IdPersonal into GrupoPersonal

                      from grupoPersonal in GrupoPersonal.DefaultIfEmpty()
                      join grado in BD.GradoPersonals on grupoPersonal.GradoPersonal equals grado into GrupoGrado
                      join especialidad in BD.Especialidads on grupoPersonal.Especialidad equals especialidad into GrupoEspecialidad
                      join departamento in BD.Departamentoes on grupoPersonal.Departamento equals departamento into GrupoDepartamento

                      // from grupoPapeletaMultiple in GrupoPapeletaMultiple.DefaultIfEmpty()
                      from grupoGrado in GrupoGrado.DefaultIfEmpty()
                      from grupoEspecialidad in GrupoEspecialidad.DefaultIfEmpty()
                      from grupoDepartamento in GrupoDepartamento.DefaultIfEmpty()

                      where papeletaMultiple.Estado != "INA"

                      select new DTO.PapeletaMultiple
                      {
                          IdPapeleta = papeletaMultiple.IdPapeleta,
                          NumeroPapeleta = papeletaMultiple.NumeroPapeleta,
                          Grado = grupoGrado.Descripcion,
                          Especialidad = grupoEspecialidad.Descripcion,
                          Nombres = grupoPersonal.Nombres,
                          ApellidoPaterno = grupoPersonal.ApellidoPaterno,
                          ApellidoMaterno = grupoPersonal.ApellidoMaterno,
                          Departamento = grupoDepartamento.Descripcion,
                          FechaRegistro = papeletaMultiple.FechaRegistro,
                          Estado = papeletaMultiple.Estado
                      }).ToList();

                return enListaPapeletaMultiple;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void registrar(DTO.PapeletaMultiple papeleta)
        {
            #region Variables
            int IDPapeletaMayor = 0;
            int cantidadPapeletas = 0;
            string numeroPapeleta = String.Empty;
            #endregion

            try
            {
                using (ModeloDatos.BDMarinaConexion BD = new ModeloDatos.BDMarinaConexion())
                {
                    // IDPapeletaMayor = ((from papeleta in BD.PapeletaMultiple
                    //                     select new Entidad.PapeletaMultiple { IdPapeleta = papeleta.IdPapeleta }).Take(0).
                    //                        Max(papeleta => papeleta.IdPapeleta) ?? 0);
                    IDPapeletaMayor = ((from pap in BD.PapeletaMultiples
                                        select new Entidad.PapeletaMultiple { IdPapeleta = pap.IdPapeleta }).
                                        Max(pap => pap.IdPapeleta) ?? 0);

                    int cantidad = 0;
                    // cantidadPapeletas = (from papeleta in BD.PapeletaMultiple select papeleta).Take(cantidad).Count();
                    cantidadPapeletas = (from pap in BD.PapeletaMultiples select pap).Count();

                    if (cantidadPapeletas == 0)
                        numeroPapeleta = "P00001";
                    else
                        numeroPapeleta = "P" + (cantidadPapeletas + 1).ToString().PadLeft(5, '0');


                    ModeloDatos.PapeletaMultiple papeletaMultiple = new ModeloDatos.PapeletaMultiple()
                    {
                        NumeroPapeleta = numeroPapeleta,
                        IdPersonalRegistro = papeleta.personalRegistro.IdPersonal,
                        IdPersonalEnturno = papeleta.personalEnTurno.IdPersonal,
                        IdPersonalRemplazo = papeleta.personalReemplazo.IdPersonal,
                        // IdTipoPapeleta = null,
                        Estado = "ACT",
                        Observacion = papeleta.Observacion,
                        FechaCubrir = papeleta.FechaCubrir,
                        FechaDevolverTurno = papeleta.FechaDevolverTurno,
                        FechaRegistro = DateTime.Today,
                    };

                    BD.PapeletaMultiples.Add(papeletaMultiple);
                    BD.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public void editar(DTO.PapeletaMultiple papeleta)
        {
            #region Variables
            int IDPapeletaMayor = 0;
            int cantidadPapeletas = 0;
            string numeroPapeleta = String.Empty;
            #endregion

            try
            {
                using (ModeloDatos.BDMarinaConexion BD = new ModeloDatos.BDMarinaConexion())
                {
                    ModeloDatos.PapeletaMultiple papeletaAEditar =
                        (ModeloDatos.PapeletaMultiple)(from pap in BD.PapeletaMultiples
                                                       where pap.IdPapeleta == papeleta.IdPapeleta
                                                       select pap).FirstOrDefault();

                    if (papeletaAEditar != null)
                    {
                        papeletaAEditar.IdPersonalRegistro = papeleta.personalRegistro.IdPersonal;
                        papeletaAEditar.IdPersonalEnturno = (papeleta.personalEnTurno.IdPersonal == 0) ? null : papeleta.personalEnTurno.IdPersonal;
                        papeletaAEditar.IdPersonalRemplazo = (papeleta.personalReemplazo.IdPersonal == 0) ? null : papeleta.personalReemplazo.IdPersonal; ;
                        papeletaAEditar.IdTipoPapeleta = papeleta.tipoPapeleta.IdTipoPapeleta;
                        papeletaAEditar.FechaCubrir = (papeleta.FechaCubrir.Value == papeleta.FechaCubrir.GetValueOrDefault())  ? null: papeleta.FechaCubrir  ;
                        papeletaAEditar.FechaDevolverTurno = (papeleta.FechaDevolverTurno.Value == papeleta.FechaDevolverTurno.GetValueOrDefault()) ? null : papeleta.FechaDevolverTurno;
                        papeletaAEditar.Observacion = papeleta.Observacion;
                    }

                    BD.SaveChanges();
                }
            }

            // return 0;
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public void aprobar(int IdPapeleta = 0)
        {
            try
            {
                using (var BD = new ModeloDatos.BDMarinaConexion())
                {
                    ModeloDatos.PapeletaMultiple papeletaMultiple = (ModeloDatos.PapeletaMultiple)BD.PapeletaMultiples.Where(p => p.IdPapeleta == IdPapeleta).FirstOrDefault();
                    papeletaMultiple.Estado = "APR";
                    BD.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public void rechazar(int IdPapeleta = 0)
        {
            try
            {
                using (var BD = new ModeloDatos.BDMarinaConexion())
                {
                    ModeloDatos.PapeletaMultiple papeletaMultiple = (ModeloDatos.PapeletaMultiple)BD.PapeletaMultiples.Where(p => p.IdPapeleta == IdPapeleta).FirstOrDefault();
                    papeletaMultiple.Estado = "REC";
                    BD.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DTO.PapeletaMultiple leer(int IdPapeleta = 0)
        {
            DTO.PapeletaMultiple papeletaMultiple;

            try
            {
                using (var BD = new ModeloDatos.BDMarinaConexion())
                {
                    papeletaMultiple =
                        (DTO.PapeletaMultiple)
                        (from pap in BD.PapeletaMultiples
                         join perReg in BD.Personals on pap.IdPersonalRegistro equals perReg.IdPersonal into GrpPerReg
                         join perTur in BD.Personals on pap.IdPersonalEnturno equals perTur.IdPersonal into GrpPerTur
                         join perRem in BD.Personals on pap.IdPersonalRemplazo equals perRem.IdPersonal into GrpPerRem

                         from grpPerReg in GrpPerReg.DefaultIfEmpty()
                         from grpPerTur in GrpPerTur.DefaultIfEmpty()
                         from grpPerRem in GrpPerRem.DefaultIfEmpty()

                         join gra in BD.GradoPersonals on grpPerReg.GradoPersonal equals gra into GrpGra
                         from grpGra in GrpGra.DefaultIfEmpty()
                         join dep in BD.Departamentoes on grpPerReg.Departamento equals dep into GrpDep
                         from grpDep in GrpDep.DefaultIfEmpty()
                         join tip in BD.TipoPaleletas on pap.TipoPaleleta equals tip into GrpTip
                         from grpTip in GrpTip.DefaultIfEmpty()


                         where pap.IdPapeleta == IdPapeleta

                         select new DTO.PapeletaMultiple
                         {
                             IdPapeleta = IdPapeleta,
                             NumeroPapeleta = pap.NumeroPapeleta,
                             personalRegistro = new DTO.Personal
                             {
                                 Grado = new DTO.GradoPersonal
                                 {
                                     Descripcion = grpGra.Descripcion
                                 },
                                 IdPersonal = grpPerReg.IdPersonal,
                                 Nombres = grpPerReg.Nombres,
                                 ApellidoPaterno = grpPerReg.ApellidoPaterno,
                                 ApellidoMaterno = grpPerReg.ApellidoMaterno,
                                 cip = grpPerReg.Cip,
                                 Departamento = new DTO.Departamento
                                 {
                                     Descripcion = grpDep.Descripcion
                                 }
                             },
                             personalEnTurno = new DTO.Personal
                             {
                                 Grado = new DTO.GradoPersonal
                                 {
                                     Descripcion = grpGra.Descripcion
                                 },
                                 IdPersonal = grpPerTur.IdPersonal,
                                 Nombres = grpPerTur.Nombres,
                                 ApellidoPaterno = grpPerTur.ApellidoPaterno,
                                 ApellidoMaterno = grpPerTur.ApellidoMaterno,
                                 cip = grpPerTur.Cip,
                                 Departamento = new DTO.Departamento
                                 {
                                     Descripcion = grpDep.Descripcion
                                 }
                             },
                             personalReemplazo = new DTO.Personal
                             {
                                 Grado = new DTO.GradoPersonal
                                 {
                                     Descripcion = grpGra.Descripcion
                                 },
                                 IdPersonal = grpPerRem.IdPersonal,
                                 Nombres = grpPerRem.Nombres,
                                 ApellidoPaterno = grpPerRem.ApellidoPaterno,
                                 ApellidoMaterno = grpPerRem.ApellidoMaterno,
                                 cip = grpPerRem.Cip,
                                 Departamento = new DTO.Departamento
                                 {
                                     Descripcion = grpDep.Descripcion
                                 }
                             },
                             tipoPapeleta = new DTO.TipoPapeleta
                             {
                                 IdTipoPapeleta = grpTip.IdTipoPapeleta,
                                 Descripcion = grpTip.Descripción
                             },
                             FechaCubrir = pap.FechaCubrir,
                             FechaDevolverTurno = pap.FechaDevolverTurno,
                             Observacion = pap.Observacion
                         }).FirstOrDefault();

                    return papeletaMultiple;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public void eliminar(int IdPapeleta = 0)
        {
            try
            {
                using (var BD = new ModeloDatos.BDMarinaConexion())
                {
                    ModeloDatos.PapeletaMultiple papeletaMultiple = (ModeloDatos.PapeletaMultiple)BD.PapeletaMultiples.Where(p => p.IdPapeleta == IdPapeleta).FirstOrDefault();
                    papeletaMultiple.Estado = "INA";
                    BD.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}