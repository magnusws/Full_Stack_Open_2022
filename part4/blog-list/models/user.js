const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [3, 'userame must be at least 3 characters'],
    required: [true, 'username is required'],
    unique: [true, 'username is already taken']
  },
  passwordHash: String,
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)