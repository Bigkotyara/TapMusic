
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index', {
    'projects1': [
      { 'name': '😃',
        'icon' : 'em em-smiley',
        'image': 'lorempixel.people.1.jpeg',
        'id': 'project1'
      },
      { 'name': '😭',
        'icon' : 'em em-cry',
        'image': 'lorempixel.city.1.jpeg',
        'id': 'project2'
      },
      { 'name': '🧠',
        'icon' : 'em em-brain',
        'image': 'lorempixel.technics.1.jpeg',
        'id': 'project3'
      }],
    'projects': [
      { 'name': '💪',
        'icon' : 'em em-muscle',
        'image': 'lorempixel.abstract.1.jpeg',
        'id': 'project4'
      },
      { 'name': '🎲',
        'icon' : 'em em-game_die',
        'image': 'lorempixel.abstract.8.jpeg',
        'id': 'project5'
      }],
    'projects2': [
      { 'name': '🎲',
        'icon' : 'em em-game_die',
        'image': 'lorempixel.people.2.jpeg',
        'id': 'project6'
      },
      { 'name': '🎲',
        'icon' : 'em em-game_die',
        'image': 'lorempixel.technics.2.jpeg',
        'id': 'project7'
      }
    ]  
  });
};
