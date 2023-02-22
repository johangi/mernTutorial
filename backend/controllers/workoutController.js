const Workout = require('../models/workoutModel'); // get workout model
const mongoose = require('mongoose'); // get mongoose from node_modules

const errorMssg = { error: 'No such workout' }; // standard error to use when there is an invalid ID requested
// get all workouts
const getWorkouts = async (req, res) => {
    // get all workouts and sort in descending order
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    // send all workouts with an 'OK' status
    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params; // get the 'id' property from the request parameters

    // check if id is a valid mongoose type
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(errorMssg); //send error if invalid ID is provided
    }

    const workout = await Workout.findById(id); // find ID in DB using id property

    // check if 'workout' is assigned a value
    if (!workout) {
        return res.status(400).json(errorMssg); //send error if 'workout' is not assigned a value
    }

    // send workout back to browser as json with 'OK' status
    res.status(200).json(workout);
}

// create new workout
const createWorkout = async (req, res) => {
    // deconstruct request and get 'title', 'load', and 'reps'
    const { title, load, reps } = req.body;

    // Create array for fields that are empty when user tries to submit a form
    let emptyFields = [];

    // Check if fields have a value, if not then add those fields to array
    if (!title) {
        emptyFields.push('title');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    // If 'emptyFields' has a length greater than zero, send an error back to client
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields});
    }

    // add doc to db
    try {
        const workout = await Workout.create({ title, load, reps }); // attempt to create a Workout in DB
        res.status(200).json(workout); // send back doc and status if workout is successfully created
    } catch (error) {
        res.status(400).json({ error: error.message }); // catch error and send back to user
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params; // get the 'id' property from the request parameters

    // check if id is a valid mongoose type
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(errorMssg); //send error if invalid ID is provided
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    // check if 'workout' is assigned a value
    if (!workout) {
        return res.status(400).json(errorMssg); //send error if 'workout' is not assigned a value
    }

    // send deleted workout with 'OK' status
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params; // get the 'id' property from the request parameters

    // check if id is a valid mongoose type
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(errorMssg); //send error if invalid ID is provided
    }

    // find designated workout and update in DB
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body //get object from request and spread in new object
    });

    // check if 'workout' is assigned a value
    if (!workout) {
        return res.status(400).json(errorMssg); //send error if 'workout' is not assigned a value
    }

    res.status(200).json(workout);
}

// export all functions
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}