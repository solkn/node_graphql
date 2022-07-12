const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const { buildSchema } = require("graphql");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Movie = require('./model/movie');


dotenv.config();

//const movies = [];
app.use(bodyParser.json());



app.use(
  "/graphql", graphqlHttp({
    schema: buildSchema(`
         
         type Movie {
           _id:ID!
           title:String!
           description:String!
           director:String!
         }
         type User {
           _id:ID!
           firstName:String!
           lastName:String!
           email:String!
           password:String!
           
         }
         input MovieInput {
          title:String!
          description:String!
          director:String!
         }
         input UserInput {
          firstName:String!
          lastName:String!
          email:String!
          password:String!
         }
         type RootQuery {
           movies:[Movie!]!

         }
         type RootMutation {
           createMovie(movieInput:MovieInput):Movie

         }

         schema {
           query:RootQuery
           mutation:RootMutation
         }
  `),
    rootValue: {
      movies:()=>{
        return Movie.find()
        .then(movies =>{
          return movies.map(movie =>{
            return {...movie._doc};
          });
        })
        .catch(err =>{
          throw err;
        })
      },
      createMovie:(args)=>{
        // const movie = {
        //   _id:Math.random().toString(),
        //   title:args.movieInput.title,
        //   description:args.movieInput.description,
        //   director:args.movieInput.director

        // };
        const movie = new Movie({
          title:args.movieInput.title,
          description:args.movieInput.description,
          director:args.movieInput.director
      });
     return movie.save()
      .then(result =>{
        console.log(result);
        return {...result._doc};

      })
      .catch(err =>{
        console.log(err);
        throw err;
      });
        //movies.push(movie);
      }
    },
    graphiql:true
  
  }));

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
  app.listen(3000,async () =>{
    console.log('server is running on port:',3000)
  })
})
  .catch(err=>{
    console.log(err);
  });
