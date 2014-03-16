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
    pages: {},
    user: new UserModel(),
    cookie : new CookieModel(),
    users: new UsersCollection(),
    projects: new ProjectsCollection(),
    namesProjectId: null, // the projectId that the names correspond to currently
    names: new NamesCollection(),
    votes: new VotesCollection()
  };
});
