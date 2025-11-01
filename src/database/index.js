const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  const connectionURL = process.env.MONGODB;

  mongoose
    .connect(connectionURL)
    .then(() => console.log("job board database connection is successfull"))
    .catch((error) => console.log(error));
};

export default connectToDB;