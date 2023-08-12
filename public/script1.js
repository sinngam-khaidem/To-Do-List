//Client side javascript
document.addEventListener("DOMContentLoaded", ()=>{
  var button1 = document.getElementById("enter-day");

  var input1 = document.getElementById("userinput-day");

  var ul1 = document.getElementById("task-list-day");


  //For day task page
  button1.addEventListener("click", async function(event) {
    //prevent form from redirecting
    event.preventDefault();
    //sending data to server
    const dataToSend = { task: input1.value };    
    try {
        await sendToServer(dataToSend, "/new-day-task");
        console.log("Data sent successfully!");
    } catch (error) {
        console.error("Error sending data:", error);
    }

    //adding new list 
    var li = document.createElement("li");
    li.className = 'list-group-item';
    var node = document.createTextNode(" " + input1.value);
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-1';
    li.appendChild(checkbox);
    li.appendChild(node);
    ul1.appendChild(li);

    //clearing the text input
    input1.value = "";
  });

  
  async function sendToServer(data, endpoint) {
    var target = endpoint;
    try {
        await fetch(target, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        throw error;
    }
  }
});