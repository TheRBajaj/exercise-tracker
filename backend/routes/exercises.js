//require express router
const router = require('express').Router();
//require mongoose DB model
let Exercise = require('../models/exercise.model');

//if route is /exercises/, then get all exercises from DB in JSON format
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises)) // return exercises in JSON format
        .catch(err => res.status(400).json('Error: ' + err)); //else error
});

//if route is /exercises/add, then 
router.route('/add').post((req, res) => {
    //add all exercise field to DB
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    //save to DB
    newExercise.save()
        .then(() => res.json('Exercise added')) //if saved to DB
        .catch(err => res.status(400).json('Error: ' + err)); //if error is caught
});

//return info about tuple depending on id of /exercises/id
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

//deletes exercise based on id
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//updates exercise based on given parameters in JSON format
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
});

//export the router
module.exports = router;