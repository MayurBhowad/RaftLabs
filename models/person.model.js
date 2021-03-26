const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    relations: [
        {
            relation: {
                type: String
            },
            person_name: {
                type: String
            }
        }
    ]
})

module.exports = PersonSchema = mongoose.model('persons', personSchema);