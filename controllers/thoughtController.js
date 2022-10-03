const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // get a single thought
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions')
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No user matching this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    updateThought(req, res) {

    },
    
    deleteThought(req, res) {

    },
    
    createReaction(req, res) {

    },
    
    deleteReaction(req, res) {

    },
};