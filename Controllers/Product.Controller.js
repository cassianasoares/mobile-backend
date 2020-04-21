const createError = require('http-errors');
const mongoose = require('mongoose');

const Product = require('../Models/Product.model');

module.exports = {
    getAllProducts: async (req, res, next) => {
        //next(new Error("cannot get a list of all products"));
        //res.send('getting a list of all products...');
        try{
            //Tirar o "__v: 0" de aparecer no json
            const results = await Product.find({}, {__v: 0});
    
            //Mostrar só nome e preco no json
            //const results = await Product.find({}, {name: 1, _id: 0, price: 1});
    
            //Mostrar só produtos que tenham determinado preco
            //const results = await Product.find({ price: 999 }, {});
    
            res.send(results);
        }catch(error){
            console.log(error.message);
        }
    },


    createNewProduct: async (req, res, next) => {
    
        try{
            const product = new Product(req.body);
            const result = await product.save();
            res.send(result);
        }catch(error){
            console.log(error.message);
            if(error.name === 'ValidationError'){
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    
        //Using Promisses:
        //console.log(req.body);
       // const product = new Product({
         //   name: req.body.name,
        //    price: req.body.price
       // })
      //  product
      //      .save()
       //     .then(result => {
       //         console.log(result);
        //        res.send(result);
     //      })
      //      .catch(err => {
      //          console.log(err.message);
      //      });
    },


    findProductById: async (req, res, next) => {
        const id = req.params.id;
        try{
            //const product = await Product.findById(id);
            const product = await Product.findOne({_id: id}, {__v: 0});
            if(!product){
                throw createError(404, 'Product does not exist!')
            }
            res.send(product);
        }catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                //Se o id não for do "tamanho" ou  modelo certo
                next(createError(400, 'Invalid Product id.'))
                return;
            }
            //Se algum caracter do id estiver errado
            next(error);
        }
    },


    updateAProduct: async (req, res, next) => {
        try{
            const id = req.params.id;
            const updates = req.body;
            //Para update das  informacoes em tempo real
            const options = {new: true};
            const result = await Product.findByIdAndUpdate(id, updates, options);
            if(!result){
                throw createError(404, 'Product does not exist!');
            }
            res.send(result);
        }catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                //Se o id não for do "tamanho" ou  modelo certo
                return next(createError(400, 'Invalid Product id.'));
            }
            //Se algum caracter do id estiver errado
            next(error);
        }
    },


    deleteAProduct: async (req, res, next) => {
        const id = req.params.id;
        try{
            const result = await Product.findByIdAndDelete(id);
            if(!result){
                throw createError(404, 'Product does not exist!')
            }
            res.send(result);
        }catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                //Se o id não for do "tamanho" ou  modelo certo
                next(createError(400, 'Invalid Product id.'))
                return;
            }
            //Se algum caracter do id estiver errado
            next(error);
        }
    }

};