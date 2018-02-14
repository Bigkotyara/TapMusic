
/*
 * GET home page.
 */
var songs = require('../songs.json');
var emojis = require('../emojis.json');

exports.view = function(req, res){
  console.log(emojis);
  res.render('index', emojis);
};
