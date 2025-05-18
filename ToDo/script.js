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
    <td><button class="btn btn-text btn-danger" onclick="deleteRow('${row.id}')">X</button></td>
    `;
  document.querySelector("tbody").appendChild(row);
  counter++;
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