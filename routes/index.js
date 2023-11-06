"use strict";

/* Ces lignes de code importent le framework Express et créent un nouvel objet routeur. L'objet routeur
est utilisé pour définir des routes pour gérer les requêtes HTTP dans l'application. */

const express = require('express');
const router = express.Router();


// Importe les articles
const { posts } = require('../utiles/articles');

// Importe la fonction sendEmail du fichier nodemailer.js
const { sendEmail } = require("../config/nodemailer");



/* Ce code définit une route pour la méthode GET sur le chemin '/post/:id', où ':id' est un paramètre
qui peut être n'importe quelle valeur. Lorsqu'une demande est faite à cette route, le code récupère
la valeur du paramètre 'id' de l'objet de requête, recherche une publication avec cet identifiant
dans le tableau 'posts' et affiche la vue 'pages/post' avec le publier les données et le titre de la
page. Si aucun message n'est trouvé avec l'identifiant donné, il affiche la vue 'pages/erreur404' à
la place. */

router.get('/post/:id', (req, res) => {
  const id = req.params.id;
  const post = posts.find(post => post.id == id);

  if (post === undefined) {
    res.render('pages/erreur404');
  };

  res.render('pages/post', {
    post: post,
    pageTitle : post.name
  
});
});


// portfolio page
router.get('/portfolio', (req, res) => {
  
  
  res.render('pages/portfolio', {
    posts: posts,
    
  });
});

// contact page

router.get('/contact', (req, res) => {
  res.render('pages/contact',{
    messageError: ""
  });

});

// accueil page
router.get('/', (req, res) => {
  res.render('pages/accueil');

});



// Reçoit les données d'un formulaire de contact
// avec un titre et un contenu
router.post('/donnees', (req, res) => {
  
  const { name, email,message } = req.body;
  
  // Envoie un courriel avec le titre et le contenu
  sendEmail(name,email, message);

  

  // Redirige vers la page d'accueil
  res.redirect('/');
});

router.post('/contact', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message; 

  
  if (!name || !email || !message) {
    res.render('pages/contact',{
      messageError : "Veuillez remplir tous les champs requis SVP...!"
    });
  } else {
    res.render('pages/donnees', {
      name: name,
      email: email,
      message: message,
      messageSuccess: "Votre message a bien été envoyé."
    });
    sendEmail(name,email, message);
  }
});


// exporte l'objet `router` afin qu'il puisse être utilisé dans d'autres fichiers. Cela permet à d'autres fichiers d'accéder et d'utiliser les routes définies dans ce fichier.
module.exports = router;



