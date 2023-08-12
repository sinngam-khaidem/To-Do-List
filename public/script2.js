//Client side javascript
document.addEventListener("DOMContentLoaded", ()=>{
 
    var button2 = document.getElementById("enter-work");

    var input2 = document.getElementById("userinput-work");

    var ul2 = document.getElementById("task-list-work");
  
    //For work task page
    button2.addEventListener("click", async function(event) {
      //prevent form from redirecting
      event.preventDefault();
      //sending data to server
      const dataToSend = { task: input2.value };    
      try {
          await sendToServer(dataToSend, "/new-work-task");
          console.log("Data sent successfully!");
      } catch (error) {
          console.error("Error sending data:", error);
      }
  
      //adding new list 
      var li = document.createElement("li");
      li.className = 'list-group-item';
      var node = document.createTextNode(" " + input2.value);
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'form-check-input me-1';
      li.appendChild(checkbox);
      li.appendChild(node);
      ul2.appendChild(li);
  
      //clearing the text input
      input2.value = "";
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