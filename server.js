"use strict";


/* Ces lignes de code importent le module Express et créent une instance de l'application Express. La
variable `app` est utilisée pour configurer et exécuter le serveur. */

var express = require('express');
var app = express();



/* importe le module Node.js intégré `path`, qui fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires. */
const path =require('path');



// Ces lignes de code importent les modules `index` et `contact` des fichiers `./routes/index` et`./routes/contact`.
const index = require('./routes/index');
const contact = require('./routes/contact');


// Ces lignes de code servent des fichiers statiques du répertoire "public".

app.use("/public", express.static(path.join(__dirname + "/public/")));
app.use(express.static(path.join(__dirname, 'public')));



// Importe les articles
const { posts } = require('./utiles/articles');


// Déclaration d'un parser pour analyser "le corps (body)" d'une requête entrante avec POST  
// Permet donc d'analyser

app.use(express.urlencoded({ extended: false }));


// set the view engine to ejs
app.set('view engine', 'ejs');





// post page

app.use('/contact', contact);
app.use(index)




// page erreur 404

app.use((req,res) =>{
  res.render('pages/erreur404');
})

 
const SERVER = "http://localhost:4000/" 

app.listen(4000);
console.log('Server is listening on port 4000  '+ SERVER);

