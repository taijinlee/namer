define([
  './cookie',
  './user',
  './users',
  './projects',
  './votes',
  './names'
], function(CookieModel, UserModel, UsersCollection, ProjectsCollection, VotesCollection, NamesCollection) {
  return {
    socket: null,
    user: new UserModel(),
    cookie : new CookieModel(),
    users: new UsersCollection(),
    projects: new ProjectsCollection(),
    names: new NamesCollection(),
    votes: new VotesCollection()
  }
});
