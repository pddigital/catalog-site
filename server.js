const express = require('express')
const path = require('path')
const sessions = require('express-session');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const keys = require('./keys');
const port = 3000;
const cors = require('cors');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const User = require('./server/login/User');
const masterRoutes = require('./server/masterRoutes');
const passwd = require('password-hash-and-salt');
const mongoStoreFactory = require('connect-mongo');
const helmet = require('helmet');

let corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4200'],
  default: 'http://localhost:4200'
}

const mongoUri = `mongodb://${keys.mongoUser}:${keys.mongoPass}@ds121980.mlab.com:21980/tagcatalog`;

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri);
mongoose.connection.once('open', () => {
  console.log(`Connected to mongo...`);
});

const app = express();

app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/uploads`));

app.use(bodyParser());

const MongoStore = mongoStoreFactory(sessions);

app.use(sessions({
   proxy: true,
   store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: (1* 60 * 60) }),
   secret: 'spanktacular12',
   name: "id",
   maxAge: 1*60.60*1000,
   resave: false,
   cookie: {
     path: "/",
     httpOnly: true,
     secure: false,
     sameSite: true
   }}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true,
  force: true
}));

app.use(helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: ["'self'", "https"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://maxcdn.bootstrapcdn.com', 'https://npmcdn.com'],
          imgSrc: ["'self'", "https", "data:"],
          fontSrc: ["'self'", "https", "https://fonts.gstatic.com", 'https://maxcdn.bootstrapcdn.com', "data:"],
          connectSrc: ["'self'", "https"],
          objectSrc: ["'self'"]
      }
  }));

masterRoutes(app);

app.get('/uploads/:file', (request, response)=> {
  response.sendFile(path.resolve(__dirname, 'uploads', request.params.file));
})

app.get('*', (request, response)=> {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
})


passport.use(new LocalStrategy(
  (username, password, done)=> {
    console.log(username, password)
    User.findOne({ username: username }, (err, user)=> {
      if (err) { return done(err); }
      else if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
        passwd(password).verifyAgainst(user.password, (error, verified)=> {
           if(error)
               throw new Error('Something went wrong!');
           if(!verified) {
             return done(null, false, { message: 'Incorrect password.' });
           } else {
             return done(null, user);
           }
       });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.listen(port, () => console.log(`Express is listening on port ${port}`));
