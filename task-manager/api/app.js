const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

//loading the mongoose models
const { List, Task} = require('./db/models');
//load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

//routes hadlers

app.get('/lists',(req, res)=>{
// We want to return an array of all the lists that belong to the authenticated user
List.find().then((lists)=>{
    res.send(lists);
}).catch((e)=>{
    res.send(e);
});
})

app.post('/lists',(req,res)=>{
// We want to create a new list and return the new list document back to the user (which includes the id)
// The list information (fields) will be passed in via the JSON request body   
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })
});
  
app.patch('/lists/:id',(req,res)=>{
// We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
    List.findOneAndUpdate({ _id: req.params.id},{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    });
});


app.delete('/lists/:id',(req,res)=>{
// We want to delete the specified list (document with id in the URL)
List.findOneAndRemove({
    _id: req.params.id
}).then((removedListDoc) => {
    res.send(removedListDoc);
})
});

app.get('/lists/:listId/tasks',(req,res)=>{

    Task.find({
        _listId: req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    })
});


app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOne({
        _Id: req.params.taskId,
        _listId:req.params.listId
    }).then((task)=>{
        res.send(task);
    })
});

app.post('/lists/:listId/tasks',(req,res)=>{

    let newTask = new Task({
        title: req.body.title,
        _listId:req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    });
});

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{

    Task.findOneAndUpdate({
        _id:req.params.taskId,
        _listId:req.params.listId
    },{
        $set:req.body
    }).then(()=>{
        res.sendStatus(200);
    })
});

app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndRemove({
        _id:req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removeTaskDoc);
    })
});


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})