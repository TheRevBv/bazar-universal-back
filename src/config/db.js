import dotenv from "dotenv";
import moongose from "mongoose";

const connectDB = async () => {
  try {
    dotenv.config();
    const conn = await moongose.connect(process.env.MONGO_URI, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
      // useCreateIndex: true,
      //Usando los nuevos parametros de conexion debido que estan deprecados los anteriores
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host} con puerto ${conn.connection.port} and database ${conn.connection.name}`
    );
    console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
