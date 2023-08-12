import express from "express";
//import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


function dateFormat(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var followUp = "th";
    if(date != 11 && date != 12 && date != 13){
        if(date % 10 == 1){
            followUp = "st";
        }
        else if(date % 10 == 2){
            followUp = "nd";
        }
        else if(date % 10 == 3){
            followUp = "rd";
        }
    }
    var result = {
        ourDate : date,
        ourFollowUp: followUp,
        ourMonth : monthNames[month],
        ourYear : year
    }
    return result;
}

//Tasks arrays
var dayTasks = ["Watch Movie", "Take a nap", "Take another nap", "Take a third nap."];
var workRelated = ["Complete the assignment", "Write a blog.", "Read papers", "Nap at work"];

app.get("/", (req, res)=>{
    var today = dateFormat();
    var data = {
        ourDate: today["ourDate"],
        ourFollowUp: today["ourFollowUp"],
        ourMonth: today["ourMonth"],
        ourYear: today["ourYear"],
        tasks: dayTasks 
    }
    res.render("day-tasks.ejs", data);
});

app.get("/day-tasks.ejs", (req, res)=>{
    var today = dateFormat();
    var data = {
        ourDate: today["ourDate"],
        ourFollowUp: today["ourFollowUp"],
        ourMonth: today["ourMonth"],
        ourYear: today["ourYear"],
        tasks: dayTasks 
    }
    res.render("day-tasks.ejs", data);
});

app.get("/work-related.ejs", (req, res)=>{
    var today = dateFormat();
    var data = {
        ourDate: today["ourDate"],
        ourFollowUp: today["ourFollowUp"],
        ourMonth: today["ourMonth"],
        ourYear: today["ourYear"],
        tasks: workRelated, 
    }
    res.render("work-related.ejs", data);
});

app.post("/new-day-task", (req, res) => {
    const receivedData = req.body; // Extract the JSON data from the request body
    console.log("Received data:", receivedData);
    dayTasks.push(receivedData["task"]);
    res.sendStatus(200);
});

app.post("/new-work-task", (req, res) => {
    const receivedData = req.body; // Extract the JSON data from the request body
    console.log("Received data:", receivedData);
    workRelated.push(receivedData["task"]);
    res.sendStatus(200);
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});