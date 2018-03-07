/*
 * GET home page.
 */

 var emojis = require('../emojis.json');

 exports.view = function(req, res){
   emojis["popped"] = false;
   res.render('tutorial', emojis);
 };

 exports.loginView = function(req, res){
   emojis["popped"] = true;
   res.render('tutorial', emojis);
 };
