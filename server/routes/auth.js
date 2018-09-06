const router = require('express').Router();
const User = require('../models/User');
const mongoose = require('mongoose');


router.get('/', (req, res, next) => {
    User
        .find()
        .sort('-createdAt')
        .exec()
        .then(recipes => {
            // console.log(recipes);
            res.status(200).json(recipes);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.get('/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;
    console.log(id);

    Recipe.findById(id)
        .exec()
        .then(recipe => {
            // console.log(recipe);
            res.status(200).json(recipe);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.post('/', (req, res, next) => {
    console.log('add recipe');
    console.log(req.body);
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        category: req.body.category.value,
        duration: req.body.duration,
        steps: req.body.steps,
        // level: req.body.level,
        // cost: req.body.cost,
        // image: req.body.image,
        // quantity: req.body.quantity,
        createdAt: req.body.createdAt,
        ingredients: req.body.ingredients,
        // author: req.body.author
    })
    recipe
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:id', (req, res, next) => {
    console.log(req.body);
    const id = req.body._id;
    Recipe.update({ _id: id }, {
            $set: {
                name: req.body.name,
                category: req.body.category.value,
                ingredients: req.body.ingredients,
                steps: req.body.steps
            }
        })
        .exec()
        .then(result => {
            res.status(200).json(result)

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('delete ' + id);
    Recipe.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(error);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;