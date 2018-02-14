
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index', {
    'projects1': [
      { 'name': 'Happy',
        'icon' : 'em-svg em-smiley',
        'id': 'project1'
      },
      { 'name': 'Sad',
        'icon' : 'em-svg em-cry',
        'id': 'project2'
      },
      { 'name': 'Study',
        'icon' : 'em-svg em-books',
        'id': 'project3'
      }],
    'projects': [
      { 'name': 'Workout',
        'icon' : 'em-svg em-muscle',
        'id': 'project4'
      },
      { 'name': 'Chance',
        'icon' : 'em-svg em-game_die',
        'id': 'project5'
      }],
    'projects2': [
      { 'name': 'Love',
        'icon' : 'em-svg em-sparkling_heart',
        'id': 'project6'
      },
      { 'name': 'Relax',
        'icon' : 'em-svg em-relieved',
        'id': 'project7'
      }
    ]
  });
};
