const m = require('mongoose');
const {Schema} = require('mongoose');

const expenseSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

module.exports = m.model('expense', expenseSchema);