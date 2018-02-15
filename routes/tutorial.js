/*
 * GET home page.
 */

 var emojis = require('../emojis.json');

 exports.view = function(req, res){
   res.render('tutorial', emojis);
 };
