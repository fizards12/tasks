let counter = 0;
let list = [];
function addTask(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const title = formData.get("name");
  const description = formData.get("description");
  
  const item = {
    title,
    description,
    status: "To Do",
    id: `task-${counter}`,
  }
  list.push(item);

  const row = document.createElement("tr");
  row.setAttribute("id", `task-${counter}`);
  row.innerHTML = `
    <td>${title}</td>
    <td title="${item.description}">${item.description}</td>
    <td class="status"><span>${item.status}</span></td>
    <td>
      <button class="btn btn-text btn-danger" onclick="deleteRow('${item.id}')">
        X
      </button>
      <button class="btn btn-text btn-success" onclick="doneTask('${item.id}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </td>
    `;
  document.querySelector("tbody").appendChild(row);
  counter++;
  closePopup();
  form.reset();
}
function openPopup() {
  document.querySelector(".popup").setAttribute("open", "");
}
function closePopup() {
  document.querySelector(".popup").removeAttribute("open");
}


function deleteRow(id) {
  list = list.filter((task) => task.id !== id); 
  const row = document.getElementById(id);
  row.remove();
}

function doneTask(id){
  const item = list.find((task) => task.id === id);
  item.status = "Done";
  const row = document.getElementById(id);
  const status = row.querySelector(".status span");
  status.textContent = item.status;
}

function sortList(){
  const sortedList = [...list];
  sortedList.sort((a, b) => a.title.localeCompare(b.title));
  renderList(sortedList);
}

function renderList(list) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  list.forEach((item) => {
    const row = document.createElement("tr");
    row.setAttribute("id", item.id);
    row.innerHTML = `
      <td>${item.title}</td>
      <td title="${item.description}">${item.description}</td>
      <td class="status"><span>${item.status}</span></td>
      <td>
        <button class="btn btn-text btn-danger" onclick="deleteRow('${item.id}')">
          X
        </button>
        <button class="btn btn-text btn-success" onclick="doneTask('${item.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </td>
      `;
    tbody.appendChild(row);
  });
}