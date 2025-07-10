// Tab Switching Logic
function showTab(tabId) {
  document.getElementById("todo").style.display = "none";
  document.getElementById("products").style.display = "none";
  document.getElementById(tabId).style.display = "block";
}

// To-Do App Logic
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };
    taskList.appendChild(li);
  });
}

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
  }
}

// Load tasks on start
loadTasks();

// Product Listing Logic
const products = [
  { image:"images/laptop.jpg",name: "Laptop", category: "electronics", price: 70000, rating: 4.5 },
  { image:"images/phone.avif",name: "Smartphone", category: "electronics", price: 30000, rating: 4.2 },
  { image:"images/watch.webp",name: "smartwatch", category: "books", price: 500, rating: 4.8 },
  { image:"images/book.jpeg",name: "Book ", category: "books", price: 300, rating: 4.1 },
];

const container = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");
const sortOption = document.getElementById("sortOption");

function displayProducts(filteredProducts) {
  container.innerHTML = '';
  filteredProducts.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐ ${p.rating}</p>
    `;
    container.appendChild(div);
  });
}


function filterAndSort() {
  let filtered = [...products];

  if (categoryFilter.value !== "all") {
    filtered = filtered.filter(p => p.category === categoryFilter.value);
  }

  if (sortOption.value === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption.value === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filtered);
}

categoryFilter.onchange = filterAndSort;
sortOption.onchange = filterAndSort;

// Initial load of products
displayProducts(products);