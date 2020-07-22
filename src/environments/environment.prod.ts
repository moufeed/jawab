export const environment = {
         production: true,
         authConfig: {
           url: "https://jawab-dev-identity.azurewebsites.net",
           client_id: "Jawab_Test_App",
           client_secret:
             "p3s6v9y$B&E)H@McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeSh",
           grant_type: "client_credentials",
           scope: "jawab.Identity.api"
         },
         translate: {
           langs: ["en", "ar"],
           default: "en",
           match: /en|ar/
         }
       };
