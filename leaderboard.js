PlayerList = new Meteor.Collection('players');

if (Meteor.isClient) {
  
  Template.leaderboard.player = function () {
    return PlayerList.find();
  };
  
  Template.leaderboard.events({
      'click li.player': function () {
        var playerId = this._id;
        Session.set('selectedPlayer', playerId);
        var selectedPlayer = Session.get('selectedPlayer');
        console.log(selectedPlayer);
      }
  });

Template.leaderboard.selectedClass = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    var playerId = this._id;
    if (selectedPlayer === playerId){
      return 'selected';
    }
  }
}
