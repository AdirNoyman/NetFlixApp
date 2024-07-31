import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './data/db.js';

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); // for parsing application/json payload to javascript object

app.use("/api/v1/auth", authRoutes);

app.get("/", (req,res) => {

    res.send("<h1>Home Page 😎</h1>");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🤓🤘 => http://localhost:${PORT}`);
  connectDB()
});

