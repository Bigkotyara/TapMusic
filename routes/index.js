
/*
 * GET home page.
 */
var songs = require('../songs.json');
var emojis = require('../emojis.json');

exports.view = function(req, res){
  res.render('index', emojis);
};
