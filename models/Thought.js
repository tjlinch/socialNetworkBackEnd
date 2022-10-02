const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: createdAtFormat => moment(createdAtFormat).format('MMMM Do YYYY, h:mm:ss a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [],
    }
)

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId(),
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: createdAtFormat => moment(createdAtFormat).format('MMMM Do YYYY, h:mm:ss a'),
        },
    }
)