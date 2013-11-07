define([
  './users',
  './projects',
  './votes',
  './names'
], function(UsersCollection, ProjectsCollection, VotesCollection, NamesCollection) {

  return {
    users: new UsersCollection(),
    projects: new ProjectsCollection(),
    names: new NamesCollection(),
    votes: new VotesCollection()
  }

});
