import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    description: String,
    type: String,
    where: String,
    obs: String,
    started: Boolean,
    finished: Boolean,
    important: Boolean,
    canceled: Boolean,
})

const itemModel = mongoose.model('item', itemSchema); //->O mongoose irá usar esse modelo de dados e definimos o nome do modelo como 'item';

export default itemModel;