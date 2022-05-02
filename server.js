const express = require ('express')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express ()
const morgan = require ('morgan')
const cors = require ('cors')
const apiRouter = require ('./apiRouter')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for JSONPlaceholder',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  };

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./apiRouter.js'],
};

const swaggerSpec = swaggerJSDoc(options);
    


// Log do app
app.use (morgan ('common'))

app.set ('view engine', 'ejs')
app.set ('views','views')


app.use ('/site', express.static('site', {index: ['app.html', 'index.html']}))

app.use ('/app' , (req, res, next) => {
    res.status(200).render('index', {message: "Olá mundo"})
})

app.use ('/api', apiRouter)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use ((req, res) => {
    res.status (404).send ('Recurso não existente')
})

port = process.env.PORT || 3000
app.listen (port, () => {
    console.log (`servidor rodando em http://localhost:${port}`)
})