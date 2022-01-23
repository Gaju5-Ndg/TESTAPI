import mongoose from 'mongoose';

const mongoConnect = () => {
    mongoose.connect(`mongodb+srv://Gaju:le5102000@cluster0.5u1vx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
        usenewUrlParser:true,
        useUnifiedTopology: true,
    })
    mongoose.connection
        .once('open',() =>console.log('Database connected successfully'))
        .on('error', (error) => {
            console.log('Error',error);
        })
}

export default mongoConnect;
