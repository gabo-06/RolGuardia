using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using RolGuardia.Negocio;
using ModeloNegocio = RolGuardia.Entidad;
using ModeloVista = RolGuardia.MVC.Models;
using Newtonsoft.Json;
using AutoMapper;

namespace APIRest.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            #region Variables
            List<ModeloNegocio.Metrado> enListaMetrado;
            NE_Metrado neMetrado = new NE_Metrado();            
            #endregion

            try
            {
                /*
                #region Obtención de data (ya).
                if (Session["ListaMetrado"] == null)
                {
                    if (this.listaMetrado.Count == 0)
                    {
                        enListaMetrado = neMetrado.listar();
                        this.listaMetrado = Mapper.Map<List<ModeloNegocio.Metrado>, List<ModeloVista.Metrado>>(enListaMetrado);
                        Session["ListaMetrado"] = this.listaMetrado;
                    }
                }
                else
                    this.listaMetrado = (List<ModeloVista.Metrado>)Session["ListaMetrado"];
                #endregion

                #region Cantidad total de registros. (ya)
                int recordsTotal = this.listaMetrado.Count();
                #endregion
                */


            }
            catch (Exception ex )
            {

                throw ex;
            }
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //public void Delete(int id)
        //{
        //}
    }
}
