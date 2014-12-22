PlayersList = new Meteor.Collection('players');

if (Meteor.isClient) {

    Meteor.subscribe('thePlayers');

    Template.leaderboard.player = function () {
        var currentUserId = Meteor.userId();
        return PlayersList.find(
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
                Meteor.call('modifyPlayerScore', selectedPlayer,5);
        },
        'click #decrement': function () {
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('modifyPlayerScore', selectedPlayer,-5);
        },
        'click #remove': function () {
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('removePlayer', selectedPlayer);
        }
    });
    Template.leaderboard.showSelectedPlayer = function () {
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne(selectedPlayer);
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
            Meteor.call('insertPlayerData',playerNameVar);
        }
    });
}


if (Meteor.isServer) {
    //console.log(PlayersList.find().fetch());
    Meteor.publish('thePlayers', function () {
        var currentUserId = this.userId;
        return PlayersList.find({createdBy: currentUserId});
    });
    Meteor.methods({
        'insertPlayerData': function (nom) {
            var currentUserId = Meteor.userId();
            PlayersList.insert({
                name: nom,
                score: 0,
                createdBy: currentUserId
            })
        },
        'removePlayer': function (selectedPlayer) {
            PlayersList.remove(selectedPlayer);
        },
        'modifyPlayerScore': function(selectedPlayer, scoreValue){
            PlayersList.update(
                {_id: selectedPlayer},
                {$inc: {score: scoreValue}})
        }
    })

}