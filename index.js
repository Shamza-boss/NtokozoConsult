var port = process.env.PORT || 1337;
var express = require("express");

//Handles sitemap requests
const routesSitemap = require('./Routes/Sitemap.js')

//Handles all email requests 
const routesEmail = require('./Routes/Email.js')

var app = express();

app.use(express.static(__dirname + '/public'));//allows access to public folder containing pics and other documents
app.use(express.urlencoded({ extended: true }));//initialises port
app.use(express.json())


app.set("view engine", "ejs");

app.get('/', (req, res) => {
    //landing page
    res.status(200).render('Home.ejs')
})

app.get('/Home', (req, res) => {
    //Home page redirect
    res.status(200).redirect('/')
})
app.get('/About', (req, res) => {
    //About page
    res.status(200).render('About.ejs')
})
app.get('/ContactUS', (req, res) => {
    //Contact page
    res.status(200).render('contact.ejs')
})

//anything related to the email is handled by routesEmail
app.use('/mail', routesEmail)
//anything related to the Sitemap is handled by routesSitemap
app.use('/Sitemap.xml', routesSitemap)

app.use((req, res) => {
    //404 section here
    res.status(404).render('404.ejs')
})
app.listen(port, () =>{
    //port listening on 3000 see env or 1337 
    console.log('Server listening on port ' + port)
});