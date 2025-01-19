// Hent elementene fra HTML
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
 
// Legg til en ny task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();


  if (taskText === "") {
    alert("Vennligst skriv inn en task før du legger den til.");
    return;
  }


  // Opprett en ny task
  const li = document.createElement("li");
  li.textContent = taskText;


  // Legg til funksjonalitet for å fjerne task ved klikk
  li.addEventListener("click", () => {
    taskList.removeChild(li);
  });


  // Legg til listeelementet i ul
  taskList.appendChild(li);


  // Tøm input-feltet
  taskInput.value = "";
});
