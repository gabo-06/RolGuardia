using System.Web;
using System.Web.Optimization;

namespace RolGuardia.MVC
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region Scripts
            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            
            bundles.Add(new ScriptBundle("~/Scripts").Include(
                        "~/Scripts/ext/core.js",
                        "~/Scripts/own/general_data.js",
                        "~/Scripts/own/user_interface.js",
                        "~/Scripts/own/utilities.js",
                        "~/Scripts/own/enumeraciones.js"));
            #endregion
            
            #region Styles
            bundles.Add(new StyleBundle("~/Styles").Include(
                      "~/Content/css/ext/core.css",
                      "~/Content/css/ext/all.min.css",
                      "~/Content/css/own/principal.css"));
            #endregion
        }
    }
}
