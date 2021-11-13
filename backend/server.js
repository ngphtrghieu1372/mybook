import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const uri = 'mongodb://localhost/websitecnm';
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://admin:admin@cluster0.tcomx.mongodb.net/mybook?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.connect(uri);
// mongoose.createConnection(uri, { useNewUrlParser: true });
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/api/config/paypal", (req, res) => {
  // eslint-disable-next-line no-undef
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
// deploy heroku
app.use(express.static(path.join(__dirname, '/frontend-website/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend-website/build/index.html'))
);
// app.get("/", (req, res) => {
//   res.send("server is already");
// });
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
