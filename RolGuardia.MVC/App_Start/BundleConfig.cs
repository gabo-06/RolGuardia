using System.Web;
using System.Web.Optimization;

namespace RolGuardia.MVC
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region Bundle de JS
            #region Bundle de JS predeterminados
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));
            #endregion
            #region Bundle de JS para Northwind
            bundles.Add(new ScriptBundle("~/Scripts/Principal").Include(
                        "~/Scripts/jquery/jquery.min.js",
                        "~/Scripts/bootstrap/bootstrap.min.js"));
            #endregion
            #region Bundle de JS para la plantilla de AppStack
            bundles.Add(new ScriptBundle("~/Scripts/core").Include(
                        "~/Scripts/core/core.js",
                        "~/Scripts/core/general_data.js",
                        "~/Scripts/core/user_interface.js",
                        "~/Scripts/core/utilities.js"));
            #endregion
            #endregion

            #region Bundle de CSS
            #region Bundle de CSS predeterminados
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            #endregion
            #region Bundle de CSS para Northwind
            bundles.Add(new StyleBundle("~/Estilos/Principal").Include(
                      "~/Content/css/bootstrap/bootstrap.min.css",
                      "~/Content/css/bootstrap/bootstrap-theme.min.css",
                      "~/Content/css/bootstrap/all.min.css",
                      "~/Content/css/webarch/webarch.css"));
            #endregion
            #region Bundle de CSS para la plantilla de AppStack
            bundles.Add(new StyleBundle("~/Estilos/AppStack").Include(
                      "~/Content/css/app_stack/app_stack.css",
                      "~/Content/css/bootstrap/all.min.css",
                      "~/Content/css/mis_estilos/general.css"));
            #endregion
            #endregion
        }
    }
}
