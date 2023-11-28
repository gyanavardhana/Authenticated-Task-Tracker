const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

// ...


const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tasktracker', {});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,

});


const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/register.html');
})

////////////////////////////////////////

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(200).send('registration success');
    } catch(err) {
        console.log(err);
        res.status(500).send('registration failed');
    }
})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            
            res.status(200).send('Success');
        } else {
            res.status(500).send("not allowed");
        }
    } catch {
        res.status(500).send();
    }
})

///////////////////////////


const taskSchema = new mongoose.Schema({
    title: String,
    user: String,
});
const Task = mongoose.model('Task', taskSchema);

app.get('/tasks/:user', async (req, res) => {
    const { user } = req.params;
    try{
        const tasks = await Task.find({user: user});
        res.json(tasks);
    }
    catch(err){
        console.log(err);
    }
});

app.post('/tasks', async (req, res) => {
    const { title, user } = req.body;
    
    try{
        const task = new Task({ title , user});
        await task.save();
        res.json(task);
    }
    catch(err){
        console.log(err);
    }
   
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const task = await Task.findById(id);
        task.title = title;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// delete a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        res.json(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

///////////////


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
