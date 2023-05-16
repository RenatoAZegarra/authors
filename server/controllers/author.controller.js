
// import the model here
const Author = require("../models/author.model")


// READ ALL
module.exports.readAll = (req, res) => {
    Author.find()
        .then((allDaAuthors) => {
            res.json(allDaAuthors)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

// READ ONE
module.exports.readOne = (req, res) => {
    Author.findOne({ _id: req.params.id })
        .then(oneSingleAuthor => {
            res.json(oneSingleAuthor)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

// CREATE
module.exports.create = (req, res) => {
    Author.create(req.body)
        .then(newlyCreatedAuthor => {
            res.status(200).json(newlyCreatedAuthor)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}

// UPDATE
module.exports.update = (req, res) => {
    Author.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedAuthor => {
            res.status(200).json(updatedAuthor)
        })
        .catch((err) => {
            res.status(400).json(err);
        });}

// DELETE
module.exports.delete = (req, res) => {
    Author.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}