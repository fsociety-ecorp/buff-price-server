import mongoose from 'mongoose';

const dbUri = 'mongodb+srv://ricardo-fcardoso:E1l9mBe77SqCjjQy@buff-cluster.s9uryfj.mongodb.net/?retryWrites=true&w=majority'

export default async function connectDatabase() {
    try {
        await mongoose.connect(dbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}