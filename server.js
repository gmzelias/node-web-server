const express = require('express');
const hbs = require ('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/Views/Partials');
app.set('view engine','hbs');


app.use((req, res, next)=>{
    var now = new Date().toString();
    var log =`${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('Server.log', log + '\n', (err)=>{
        if (err){
            console.log('Unable to create Server.log');
        }
    });
next();
});

/*app.use((req,res,next)=>{
res.render('maintence.hbs');
next();
});*/

app.use(express.static(__dirname+'/Public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
/*res.send('<h1>Hello Express!<h1>');
res.send({
    name: 'Elias',
    likes:[
       'Gin',
       'Baseball' 
    ]
});*/
res.render('home.hbs',{
    pageTitle : 'About Page',
    welcomeMessage:'Welcome to my website'

})
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
    pageTitle : 'About Page'
});
});

app.get('/bad',(req,res)=>{
    res.send({
        error:'Unable to fulfill request'
    });
    });

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle : 'Projects'
    });
        });

app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`)
});