using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DTO = RolGuardia.Entidad;
using Model = RolGuardia.MVC.Models;
using AutoMapper;

namespace RolGuardia.MVC.App_Start
{
    public class AutoMapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<DTO.PapeletaMultiple, Model.PapeletaMultiple>()
                        .ForMember(dest => dest.IdPapeleta,
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

                cfg.CreateMap<DTO.GradoPersonal, Model.GradoPersonal>()
                        .ForMember(dest => dest.IdGrado,
                                    opt => opt.MapFrom(src => src.IdGrado))
                        .ForMember(dest => dest.Descripcion,
                                    opt => opt.MapFrom(src => src.Descripcion));

                cfg.CreateMap<DTO.Departamento, Model.Departamento>()
                        .ForMember(dest => dest.IdDepartamento,
                                    opt => opt.MapFrom(src => src.IdDepartamento))
                        .ForMember(dest => dest.Descripcion,
                                    opt => opt.MapFrom(src => src.Descripcion));

                cfg.CreateMap<DTO.Personal, Model.Personal>()
                        .ForMember(dest => dest.IdPersonal,
                                    opt => opt.MapFrom(src => src.IdPersonal))
                        .ForMember(dest => dest.Grado,
                                    opt => opt.MapFrom(src => src.Grado))
                        .ForMember(dest => dest.Nombres,
                                    opt => opt.MapFrom(src => src.Nombres))
                        .ForMember(dest => dest.ApellidoPaterno,
                                    opt => opt.MapFrom(src => src.ApellidoPaterno))
                        .ForMember(dest => dest.ApellidoMaterno,
                                    opt => opt.MapFrom(src => src.ApellidoMaterno))
                        .ForMember(dest => dest.Departamento,
                                    opt => opt.MapFrom(src => src.Departamento))
                        .ForMember(dest => dest.cip,
                                    opt => opt.MapFrom(src => src.cip));
            });
        }
    }
}