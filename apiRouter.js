const express = require ('express')
const apiRouter = express.Router ()


const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder produtos.
 *     description: Retrieve a list of produtos from JSONPlaceholder. Can be used to populate a list of fake produtos when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of produtos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       descricao:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       valor:
 *                         type: decimal
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       marca:
 *                         type: string
 *                         description: marca do produto.
 *                         example: nestle
 */
apiRouter.get ('/produtos', (req, res, next) => {
    res.status(200).json (lista_produtos);
   
})
/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder produtos.
 *     description: Retrieve a list of produtos from JSONPlaceholder. Can be used to populate a list of fake produtos when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of produtos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:                  
 *                   produto:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       descricao:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       valor:
 *                         type: decimal
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       marca:
 *                         type: string
 *                         description: marca do produto.
 *                         example: nestle
 */
apiRouter.get ('/produtos/:id', (req, res, next) => {
    let id= parseInt(req.params.id)
    let idx = lista_produtos.produtos.findIndex ((elem) => elem.id ==id)
    if(id && idx > -1){
        res.status(200).json (lista_produtos.produtos[idx])
    }
    else {
        res.status(404).json ({message: "Produto não encontrado."})

    }
   
})

apiRouter.post ('/produtos', express.json(), (req, res, next) => {
    try {
        const maxId = lista_produtos.produtos.reduce((prev, current) => {
            return (prev.id > current.id) ? prev.id : current.id
        })
        req.body.id = maxId + 1;
        lista_produtos.produtos.push (req.body)
        res.status(201).json({message: "Produto inserido com sucesso!"})

    }
    catch (err) {
        res.status (404).json ({message: "Erro ao inserir produto"})
    }
})


apiRouter.put ('/produtos/:id', express.json(), (req, res, next) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    const list = lista_produtos.produtos.find((elem) => elem.id === id);
    const idx = lista_produtos.produtos.indexOf(list);

    if(!list){
    
        res.status(404).send('Produto nâo encontrado');

    }
       else{
         
        const updateList = {...list, ...body};
        lista_produtos.produtos[idx] = updateList;

        res.status(200).send('Atualizado com sucesso!');

    }
})

apiRouter.delete ('/produtos/:id', express.json(), (req, res, next) => {
    
    const id = parseInt(req.params.id);
    const body = req.body;
    const list = lista_produtos.produtos.find((elem) => elem.id === id);

    if(!list){
    
        res.status(404).send('Produto nâo encontrado');

    }
       else{
        const idx = lista_produtos.produtos.indexOf(list);
        lista_produtos.produtos.splice(idx, 1);

        res.status(200).send('Deletado com sucesso');

    }
})


module.exports = apiRouter