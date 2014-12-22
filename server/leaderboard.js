/**
 * Created by andrew on 22/12/14.
 */
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
});