import express from "express";
import bodyParser from "body-parser";
import mongoConnect from "./config/db.config";
import UsersRoutes from './routes/user.routes';

const app = express(); 
const port = process.env.PORT||4500

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ type: "*/*"}));

app.use('/api', UsersRoutes);

app.get('/',(req,res) => {
    res.status(200) .json({
        message:'hollaa let get started on Test Api',
        status:200
    });
})

app.use((req,res) => {
    res.status(404).json({
    message: "Ooops, Endpoint not found!",
    status:404
    })
});

app.listen(port, console.log(`The server is running on http:/127.0.0.1:${port}`));
mongoConnect();
