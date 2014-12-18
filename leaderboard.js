PlayerList = new Meteor.Collection('players');

if (Meteor.isClient) {
  Template.leaderboard.player = function () {
    return PlayerList.find();
  };
  Template.leaderboard.events(
    {
      'click li.player': function () {
        console.log("You clicked a player's list item");
        Session.set('selectedPlayer', 'session value test');
      }
  });
}