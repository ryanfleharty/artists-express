const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const albumSchema = new mongoose.Schema({
    name: {type: String, required: true},
    artist: {type: Schema.Types.ObjectId, ref: 'Artist'}
})

module.exports = mongoose.model('Album', albumSchema)   