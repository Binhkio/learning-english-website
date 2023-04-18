const { default: mongoose } = require('mongoose');

const connectDatabase = async (url) => {
  const connect_url = url || process.env.DB_HOST;
  console.log(`Connecting to ${connect_url}`);
  mongoose.connect(connect_url).then(
    () => {
      console.log(`Database connected...`);
    },
    (err) => {
      console.log(`Error when connecting`, err);
    }
  );
};

module.exports = connectDatabase;
