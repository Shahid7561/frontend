
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
  } from "angular5-social-login";
  
// export function getAuthServiceConfigs() {
//     let config = new AuthServiceConfig(
//         [
//           {
//             id: FacebookLoginProvider.PROVIDER_ID,
//             provider: new FacebookLoginProvider("Your-Facebook-app-id")
//           },
//           {
//             id: GoogleLoginProvider.PROVIDER_ID,
//             provider: new GoogleLoginProvider("744015190107-se7m1n0mfdqe4o8o5n5n3uo5ag54kt2k.apps.googleusercontent.com")
//           },
//         ]
//     );
//     return config;
//   }

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '740296820697-j5fhg24a1617t6vpbkvdp1t937lcju4a.apps.googleusercontent.com'
      )
    },
  ]);

  return config;
}