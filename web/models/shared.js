define([
  './cookie',
  './users',
  './projects',
  './votes',
  './names'
], function(CookieModel, UsersCollection, ProjectsCollection, VotesCollection, NamesCollection) {
  return {
    socket: null,
    cookie : new CookieModel(),
    users: new UsersCollection(),
    projects: new ProjectsCollection(),
    names: new NamesCollection(),
    votes: new VotesCollection()
  }
});
