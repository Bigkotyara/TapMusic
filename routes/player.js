exports.view = function(req, res){
    var name = req.params.name; 
    console.log("The project name is: " + name);
    res.render('player', {
               'category': name
               });
};
