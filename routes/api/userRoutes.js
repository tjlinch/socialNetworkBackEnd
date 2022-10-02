const router = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/users: get and post for all users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id selects user by id to get 1 user, edit 1 user, or delete 1 user
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/user/:id/friends/:friendId for friends post and delete
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;