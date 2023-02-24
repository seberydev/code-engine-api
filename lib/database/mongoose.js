const { connect, connection } = require("mongoose");

const conn = {
  isConnected: false,
};

const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URL);

  conn.isConnected = db.connections[0].readyState;
};

connection.on("connected", () => {
  console.log("connected to database");
});

connection.on("error", (err) => {
  console.log(err);
});

module.exports = dbConnect;
