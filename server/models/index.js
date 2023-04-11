const { mongoose } = require('mongoose');

const connectDatabase = async (url) => {
  const connect_url = url || process.env.DB_HOST;
  console.log(`Connecting to ${connect_url}`);
    mongoose.connect(connect_url).then((response) => {
      console.log(`Database connected...`);
    }).catch((error) => {
      console.log(`Error when connecting`, error);
      process.exit()
    })
};

module.exports = connectDatabase;
