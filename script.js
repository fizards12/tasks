const links = [
    { folderPath: 'user-msg', label: 'User Message' },
    { folderPath: 'calculator', label: 'calculator' },
    { folderPath: 'planner', label: 'Planner' },
    { folderPath: 'ToDo', label: 'To Do List' }
];

const container = document.querySelector('.list');

links.forEach(link => {
    const listItem = document.createElement('a');
    listItem.classList.add('list-item');
    const anchor = document.createElement('a');
    listItem.appendChild(anchor);
    anchor.href = `./${link.folderPath}/index.html`;
    anchor.classList.add('btn');
    anchor.textContent = link.label;
    container.appendChild(listItem);
});

