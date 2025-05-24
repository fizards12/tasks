const tableHeaderHTML = document.createElement("div");
tableHeaderHTML.className = "table-header";
tableHeaderHTML.innerHTML = `
        <span>Product</span>
        <span>Description</span>
        <span>Price</span>
        <span>Final Price</span>
        <span>Image</span>`

let isTable = true;
let pricesinput = 1;

const tableParent = document.querySelector("#products");
const cardsParent = document.querySelector("#products-cards");
let products = [
    {
        id: 1,
        name: "Mobile",
        description: "This is a mobile phone",
        category: "electronics",
        price: 10.00,
        image: "./assets/auth_side.png",
    },
    {
        id: 2,
        name: "Iphone 15",
        description: "Iphone 15 is a smartphone",
        category: "electronics",
        price: 20.00,
        image: "./assets/auth_side.png",
    },
    {
        id: 3,
        name: "Sasmung Galaxy",
        description: "Android Smart",
        category: "electronics",
        price: 30.00,
        image: "./assets/auth_side.png",
    },
    {
        id: 4,
        name: "Laptop",
        description: "Can Play Games",
        category: "electronics",
        price: 40.00,
        image: "./assets/auth_side.png",
    },
];


// Related To Task 7: add finalPrice field to each product
products.forEach(product => {
    product.finalPrice = product.price * 1.14; // Calculate final price with tax
}); 


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
            <span>$${product.price}</span>
            <span>$${product.finalPrice.toFixed(2)}</span>
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
            <span>$${product.price}</span>
            <span>$${product.finalPrice.toFixed(2)}</span>
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
    event.target.innerText = isTable ? "View as Cards" : "View as Table";
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

// Task 6: Product Price Tool

// display products options in select dropdown
(()=>{
    const productSelect = document.querySelector(".product-name");
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
})();

// Task 7: Product Filtering System
function findAboveFinalPrice(event){
    const price = event.target.value;
    const filteredProducts = products.filter(product => {
        if(!price) return true;
        // Check if the product final price is greater than or equal to the input value
        return product.finalPrice >= price;
    });
    displayProducts(filteredProducts);
}


// Task 6 : Product Price Tool
function addPriceInput(){
    pricesinput++;
    const priceInputContainer = document.querySelector("#price-inputs");
    const formControlElement = document.createElement("div");
    formControlElement.className = "form-control";
    formControlElement.innerHTML = `
        <label for="price-input-${pricesinput}">Price ${pricesinput}</label>
        <input type="number" id="price-input-${pricesinput}" class="price-input" placeholder="Enter price">
    `;
    priceInputContainer.appendChild(formControlElement);
}


function calculateTotalPriceHandler(event){
    const priceInputs = document.querySelectorAll(".price-input");
    const productName = document.querySelector(".product-name")?.value || "";
    if (!productName) {
        displayMessage("Please enter a product name.", "error");
        return;
    }
    const prices = Array.from(priceInputs).map(input => parseFloat(input.value) || 0);
    const totalPrice = calculateTotalPrice(...prices);
    displayMessage(`Product Name:${productName}, Final Price: $${totalPrice.toFixed(2)}`);    
}

function calculateTotalPrice(...prices){
    return (prices.reduce((total, price) => total + price, 0) * 1.14);
}

function displayMessage(message,type = "success") {
    const messageElement = document.querySelector(".message");
    messageElement.classList.remove(type === "success" ? "message-error" : "message-success");
    messageElement.classList.add(`message-${type}`);
    messageElement.innerText = message;
}


