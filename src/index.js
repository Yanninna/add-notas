 const express = require('express');
 const path = require('path');
 const exphbs = require('express-handlebars');
 const methodOverride = require('method-override');
 const session = require('express-session');


 //initiliazations 
 const app = express();
 require('./database');
 //settings index.js
 app.set('port', process.env.PORT || 3000);
 //aqui le digo con dirname que me concatene con la carpeta views
 app.set('views', path.join(__dirname, 'views'));
 app.engine('.hbs', exphbs({
     //se crea una especie de plantilla para el marco 
     defaultLayout:"main",
     layoutsDir: path.join(app.get('views'), 'layouts'),
     partialsDir: path.join(app.get('views'), 'partials'),
     extname: '.hbs'
 }));
 app.set('view engine', '.hbs');


 //middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
secret: 'misecretapp',
resave: true,
saveUninitialized: true
//aqui guardo los datos de el usuario
}));






 //global variables

 //rutes
app.use(require('./routes/index'));
app.use(require('./routes/note'));
app.use(require('./routes/users'));



 //statics files
app.use(express.static(path.join(__dirname, 'public')));

 //server is listenning
 app.listen(app.get('port'), () => {
     console.log('server on port', app.get('port'));
 });