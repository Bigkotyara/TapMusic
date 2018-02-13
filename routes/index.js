
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index', {
    'projects1': [
      { 'name': '😃 Happy',
        'icon' : 'em em-smiley',
        'id': 'project1'
      },
      { 'name': '😭 Sad',
        'icon' : 'em em-cry',
        'id': 'project2'
      },
      { 'name': '🧠 Study',
        'icon' : 'em em-brain',
        'id': 'project3'
      }],
    'projects': [
      { 'name': '💪 Workout',
        'icon' : 'em em-muscle',
        'id': 'project4'
      },
      { 'name': '🎲 Chance',
        'icon' : 'em em-game_die',
        'id': 'project5'
      }],
    'projects2': [
      { 'name': '❤️ Love',
        'icon' : 'em em-love_letter',
        'id': 'project6'
      },
      { 'name': '😌 Relax',
        'icon' : 'em em-relieved',
        'id': 'project7'
      }
    ]
  });
};
