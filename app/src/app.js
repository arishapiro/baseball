// Android back button: on a tool page go back to the home screen; on the home screen close the app.
// Uses the @capacitor/app plugin when running inside the native app; does nothing in a browser.
(function () {
  var C = window.Capacitor;
  var App = C && C.Plugins && C.Plugins.App;
  if (!App || !App.addListener) return;
  var onHome = !document.body.hasAttribute("data-dc-tool");
  App.addListener("backButton", function () {
    if (onHome) App.exitApp();
    else location.href = "index.html";
  });
})();

