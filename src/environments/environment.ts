// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://feeds-backend-mft.herokuapp.com/api/v1/',
  apiUrl: 'http://localhost:3000/api/v1/',
};

export const account = {
  register: environment.apiUrl + "users/register",
  login: environment.apiUrl + "users/login",
  socialLogin: environment.apiUrl + "users/social/login",
  searchUser: environment.apiUrl + "users/searchuser",
  getUserById: environment.apiUrl + "users/"
}

export const post = {
  create: environment.apiUrl + "posts/create",
  list: environment.apiUrl + "posts",
}

export const comment = {
  create: environment.apiUrl + "comment/create",
  byPostId: environment.apiUrl + "comment/",
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
