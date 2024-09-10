import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database Already Connected...");
    return;
  }

  try {
    const connectionObj = await mongoose.connect(
      process.env.MONGODB_URI + "/truefeedback" || "",
      {}
    );
    connection.isConnected = connectionObj.connections[0].readyState;
    console.log("MONGODB CONNECTED...");
  } catch (error) {
    console.log("Database Connection Failed!!! : ", error);
    process.exit(1);
  }
}

export default dbConnect;
