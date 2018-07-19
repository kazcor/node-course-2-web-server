const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

//register a directory for partials
hbs.registerPartials(__dirname + '/views/partials');
//register data that is sent to every render
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
//our view-engine is hbs (could be ejs etc.)
app.set('view-engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n');
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

//static address middleware (using public directory)
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs',{
        welcomeMessage: "Herro!",
        pageTitle: "Welcome Home",
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong!'
    });
})

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});