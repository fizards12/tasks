let counter = 0;
function addTask(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const title = formData.get("name");
  const description = formData.get("description");
  const row = document.createElement("tr");
  row.setAttribute("id", `task-${counter}`);
  row.innerHTML = `
    <td>${title}</td>
    <td title="${description}">${description}</td>
    <td class="status"><span>To Do</span></td>
    <td>
      <button class="btn btn-text btn-danger" onclick="deleteRow('${row.id}')">
        X
      </button>
      <button class="btn btn-text btn-success" onclick="doneTask('${row.id}')">
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
  const row = document.getElementById(id);
  row.remove();
}

function doneTask(id){
  const row = document.getElementById(id);
  const status = row.querySelector(".status span");
  status.textContent = "Done";
}