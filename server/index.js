const express = require("express");
const routes = require("./router/routes.js");
const { default: mongoose } = require("mongoose");
const cors=require('cors');
const app = express();
const PORT=5000

app.use(cors({
  origin:'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['*']
}))

app.use(express.json());
app.use("/", routes);
app.get("/", (req, res) => {
  return res.send("hi from server");
});
mongoose.connect("mongodb+srv://ashwanix2749:7985@cluster3.xnlgkkt.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));
