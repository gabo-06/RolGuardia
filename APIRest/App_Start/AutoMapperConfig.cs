using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ModeloNegocio = RolGuardia.Entidad;
using ModeloVista = RolGuardia.MVC.Models;
using AutoMapper;

namespace RolGuardia.MVC.App_Start
{
    public class AutoMapperConfigS
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<ModeloNegocio.Personal, ModeloVista.Personal>()
                        .ForMember(dest => dest.IdPersonal,
                                    opt => opt.MapFrom(src => src.IdPersonal))
                        .ForMember(dest => dest.Grado,
                                    opt => opt.MapFrom(src => src.Grado))
                        .ForMember(dest => dest.Especialidad,
                                    opt => opt.MapFrom(src => src.Especialidad))
                        .ForMember(dest => dest.NombreCompleto,
                                    opt => opt.MapFrom(src => src.ApellidoPaterno + " " + src.ApellidoMaterno + " " + src.Nombres))
                        .ForMember(dest => dest.Departamento,
                                    opt => opt.MapFrom(src => src.Departamento))
                        .ForMember(dest => dest.FechaRegistro,
                                    opt => opt.MapFrom(src => src.FechaRegistro));
                //.ForMember(dest => dest.IdPersonal,
                //            opt => opt.MapFrom(src => src.IdPersonal))
                //.ForMember(dest => dest.Grado,
                //            opt => opt.NullSubstitute("Sin grado"))
                //.ForMember(dest => dest.Especialidad,
                //            opt => opt.NullSubstitute("Sin especialidad"))
                //.ForMember(dest => dest.NombreCompleto,
                //            opt => opt.MapFrom(src => src.Nombres + " " + src.ApellidoPaterno + " " + src.ApellidoMaterno))
                //.ForMember(dest => dest.Departamento,
                //            opt => opt.NullSubstitute("Sin departamento"))
                //.ForMember(dest => dest.FechaRegistro,
                //            opt => opt.NullSubstitute("Sin fecha de registro"));

                cfg.CreateMap<ModeloNegocio.Metrado, ModeloVista.Metrado>()
                    .ForMember(dest => dest.IdMetrado,
                                opt => opt.MapFrom(src => src.IdMetrado))
                    .ForMember(dest => dest.IdMilestone,
                                opt => opt.MapFrom(src => src.IdMilestone))
                    .ForMember(dest => dest.IdEstado,
                                opt => opt.MapFrom(src => src.IdEstado))
                    .ForMember(dest => dest.FechaRegistro,
                                opt => opt.MapFrom(src => src.FechaRegistro))
                    .ForMember(dest => dest.FechaModifico,
                                opt => opt.MapFrom(src => src.FechaModifico))
                    .ForMember(dest => dest.IdUsuarioRelevo,
                                opt => opt.MapFrom(src => src.IdUsuarioRelevo))
                    .ForMember(dest => dest.IdUnidadMedida,
                                opt => opt.MapFrom(src => src.IdUnidadMedida));
                    // .ForMember(dest => dest.MetradoEstimado,
                    //             opt => opt.MapFrom(src => src.MetradoEstimado))
                    // .ForMember(dest => dest.IdUltimoMotivoEdicion,
                    //             opt => opt.MapFrom(src => src.IdUltimoMotivoEdicion))
                    // .ForMember(dest => dest.IdTipoOrigen,
                    //             opt => opt.MapFrom(src => src.IdTipoOrigen));
            });
        }
    }
}