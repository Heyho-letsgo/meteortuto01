PlayerList = new Meteor.Collection('players');

if (Meteor.isClient) {

    Meteor.subscribe('thePlayers');

    Template.leaderboard.player = function () {
        var currentUserId = Meteor.userId();
        return PlayerList.find(
            {createdBy: currentUserId},
            {sort: {score: -1, name: 1}});
    };

    Template.leaderboard.events({
        'click li.player': function () {
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
            var selectedPlayer = Session.get('selectedPlayer');

        },
        'click #increment': function () {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.update({_id: selectedPlayer}, {$inc: {score: 5}});
        },
        'click #decrement': function () {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.update({_id: selectedPlayer}, {$inc: {score: -5}});
        },
        'click #remove': function () {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.remove(selectedPlayer);
        }
    });

    Template.leaderboard.showSelectedPlayer = function () {
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayerList.findOne(selectedPlayer);
    };


    Template.leaderboard.selectedClass = function () {
        var selectedPlayer = Session.get('selectedPlayer');
        var playerId = this._id;
        if (selectedPlayer === playerId) {
            return 'selected';
        }
    };

    Template.addPlayerForm.events({
        'submit form': function (theEvent, theTemplate) {
            theEvent.preventDefault();
            var playerNameVar = theTemplate.find('#playerName').value;
            var currentUserId = Meteor.userId();
            PlayerList.insert({
                name: playerNameVar,
                score: 0,
                createdBy: currentUserId
            });
        }
    });


}


if (Meteor.isServer) {
   console.log(PlayerList.find().fetch());
    Meteor.publish('thePlayers', function(){
        var currentUserId = this.userId;
        return PlayerList.find({createdBy: currentUserId});
    });

}