// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
         production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
