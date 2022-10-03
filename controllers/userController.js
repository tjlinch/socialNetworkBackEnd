const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // get a single user
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No users with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // update user by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No users with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete user by ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message : 'No users with this ID' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: 'User & associated thoughts deleted' }))
            .catch((err) => res.status(500).json(err));
    },
    // add friends by ID
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $push: { friends: req.params.friendId }},
            { new: true },
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No users with this ID'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // remove friends by ID
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({message: 'No users with this ID'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};