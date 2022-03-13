const Task = require("../models/Task")
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../error/custom-error')

const getAllTask = asyncWrapper (async function(req, res) {
        const tasks = await Task.find({})
        res
        .status(200)
        .json({ status: 'success', data: { tasks, nbHits: tasks.lenght } })
})

const createTask = asyncWrapper (async function(req, res) {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
})

const getTask = asyncWrapper (async function(req, res, next) {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`,404))
        }
        res.status(200).json({ task })
})

const updateTask = asyncWrapper (async function(req, res) {
        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate({ _id:taskID}, req.body, {
            new: true,
            runValidators: true
        })

        if(!task) {
            return next(createCustomError(`No task with id: ${taskID}`,404))
        }
        res.status(200).json({ task })
})

const deleteTask = asyncWrapper (async function(req, res) {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`,404))
        }
        res.status(200).json({ task })
})



module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask
}