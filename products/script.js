const tableHeaderHTML = document.createElement("div");
tableHeaderHTML.className = "table-header";
tableHeaderHTML.innerHTML = `
        <span>Product</span>
        <span>Description</span>
        <span>Price</span>
        <span>Image</span>`

let isTable = true;
const tableParent = document.querySelector("#products");
const cardsParent = document.querySelector("#products-cards");
let products = [
    {
        id: 1,
        name: "Mobile",
        description: "This is a mobile phone",
        price: 10.00,
        image: "./assets/auth_side.png",
    },
    {
        id: 2,
        name: "Iphone 15",
        description: "Iphone 15 is a smartphone",
        price: 20.00,
        image: "./assets/auth_side.png",
    },
    {
        id: 3,
        name: "Sasmung Galaxy",
        description: "Android Smart",
        price: 30.00,
        image: "./assets/auth_side.png",
    },
    {
        id: 4,
        name: "Laptop",
        description: "Can Play Games",
        price: 40.00,
        image: "./assets/auth_side.png",
    },
];

function displayProducts(products = []) {
    if (isTable) {
        tableParent.innerHTML = "";
        tableParent.appendChild(tableHeaderHTML);
        
        const tableBody = document.createElement("ul");
        tableBody.className = "table-body";
        products.forEach(product => {
            const productCard = document.createElement("li");
            productCard.className = "row";
            productCard.innerHTML = `
            <span>${product.name}</span>
            <span>${product.description}</span>
            <span>${product.price}</span>
            <div>
                <img src="${product.image}" alt="${product.name}">
            </div>
            `;
            tableBody.appendChild(productCard);
        });
        
        tableParent.appendChild(tableBody);
    } else {
        cardsParent.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "card";
            productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>${product.price}</span>
            `;
            cardsParent.appendChild(productCard);
        });
    }
}

displayProducts(products);

function toggleView(event){
    isTable = !isTable;
    if(isTable){
        tableParent.style.display = "block";
        cardsParent.style.display = "none";
    }else{
        tableParent.style.display = "none";
        cardsParent.style.display = "grid";
    }
    displayProducts(products);
    event.target.innerText = isTable ? "View as Table" : "View as Cards";
    event.target.classList.toggle("btn-secondary");
}

function searchHandler(event){
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        if(!searchTerm) return true;
        // Check if the product name or description includes the search term
        return product.name.toLowerCase().includes(searchTerm) ||
               product.description.toLowerCase().includes(searchTerm);
    });
    displayProducts(filteredProducts);
}


function findBelowPrice(event){
    const price = event.target.value;
    const filteredProducts = products.filter(product => {
        if(!price) return true;
        // Check if the product price is less than or equal to the input value
        return product.price <= price;
    });
    displayProducts(filteredProducts);
}