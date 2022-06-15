const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.brightCyan
        .underline.bold,
    )
  } catch (error) {
    console.log(`Error: ${error.message}.brightRed.underline.bold`)
    process.exit(1)
  }
}

module.exports = connectDB
