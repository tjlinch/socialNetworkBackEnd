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
    // update a thought by its ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thoughts with this ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // delete a thought by its ID
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thoughts with this ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: {thoughts: req.params.thoughtId }},
                        { new: true }
                    )
            )
            .catch((err) => res.status(500).json(err));
    },
    // add a reaction linked to the thought ID
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.params.reactionId }},
            { runValidators: true, new: true},
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thoughts with this ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // delete a reaction by the reaction's ID
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thoughts with this ID'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};