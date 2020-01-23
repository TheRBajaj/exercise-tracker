//require express router
const router = require('express').Router();
//require mongoose DB model
let User = require('../models/user.model');

//if route is /users/, then get all usernames from DB in JSOn format
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users)) // return users in JSON format
        .catch(err => res.status(400).json('Error: ' + err)); //else error
});

//if route is /users/add, then 
router.route('/add').post((req, res) => {
    //add username to DB
    const username = req.body.username;
    const newUser = new User({ username });

    //save to DB
    newUser.save()
        .then(() => res.json('User added')) //if saved to DB
        .catch(err => res.status(400).json('Error: ' + err)); //if error is caught
});

//export the router
module.exports = router;