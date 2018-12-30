const express = require('express'); //remettre sur chaque fichier .js
const router  = express.Router(); //remettre sur chaque fichier .js
const Movie = require("../models/movie")

router.get('/movies', (req, res, next) => {
    Movie.find()
      .then(movies => {
        res.render("movies", { movies });
    })
      .catch(error => {
        console.log(error)
      })
  });

  //Add new movies 
  router.get('/movies/new',(req, res, next)=>{
    res.render ('movies/new');
});

router.post('/movies/new', (req, res, next) => { //pour prendre les valeurs du formulaire pour les ajouter à notre bdd mongo
    const { title, genre, plot } = req.body; //obligatoire pour passer ensuite les valeurs à Celeb
    const newMovie = new Movie ({ title, genre, plot})
    newMovie.save()
    .then((movie) => {
      res.redirect('/movies');
    })
    .catch((error) => {
      console.log(error);
    })
  });
 
 //TOUJOURS PLACER LES req.params en fin de code (avant le module.exports) 

router.get('/movies/:id', (req, res, next) => {  //pour afficher le detail par movie dans show.hbs
  let movieId = req.params.id;
  Movie.findOne({_id: movieId}) 
    .then(movie => {
      res.render("movies/show", { movie }) //attention syntaxe , ici vert = url et movie = info bdd
    })
    .catch(error => {
      console.log(error)
    })
});

module.exports = router; //toujours mettre en fin de fichier .js
