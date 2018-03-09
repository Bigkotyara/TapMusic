
/*
 * GET home page.
 */
var emojis = require('../emojis.json');

exports.view = function(req, res){
  emojis["viewAlt"] = true;
  res.render('index', emojis);
};

exports.viewA = function(req, res){
  emojis["viewAlt"] = true;
  res.render('index', emojis);
};

exports.viewAlt = function(req, res){
	emojis["viewAlt"] = false;
	console.log("alternate view    ");
	res.render('index', emojis);
};

exports.viewB = function(req, res){
	emojis["viewAlt"] = false;
	console.log("alternate view    ");
	res.render('index', emojis);
};

exports.LoggedInLanding = function(req, res){
	emojis["loggedIn"] = true;
	return res.redirect('/');
};

