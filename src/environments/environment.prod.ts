export const environment = {
  production: true,
   apiUrl: 'https://feeds-backend-mft.herokuapp.com/api/v1/'
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
