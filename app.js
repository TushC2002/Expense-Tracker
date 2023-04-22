// Get UI Elements
const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalExpense = document.getElementById('total-expense');
const clearExpenses = document.querySelector('.clear-expenses');

//These are used to get the required UI elements from the HTML document. 
// The document.getElementById() method is used to get elements by their id attribute, 
// while document.querySelector() method is used to get an element by its CSS selector.

// Initialize Expenses
let expenses = [];
// creates an empty array called expenses to store the expense objects.

// Event Listeners
expenseForm.addEventListener('submit', addExpense);
expenseList.addEventListener('click', deleteExpense);
clearExpenses.addEventListener('click', clearAllExpenses);
document.addEventListener('DOMContentLoaded', loadExpensesFromLocalStorage);
// The addExpense function will be executed when the user submits the form.
// The deleteExpense function will be executed when the user clicks on the delete button.
// The clearAllExpenses function will be executed when the user clicks on the clear button.
// The loadExpensesFromLocalStorage function will be executed when the page is loaded.

// Add Expense
function addExpense(e) {
    e.preventDefault();

    // Create Expense Object
    const expense = {
        id: Date.now(),
        name: expenseName.value.trim(),
        amount: parseFloat(expenseAmount.value)
    }

    // Add Expense to Expenses
    expenses.push(expense);

    // Add Expense to UI
    addExpenseToUI(expense);

    // Calculate Total Expense
    calculateTotalExpense();

    // Store Expenses in Local Storage
    storeExpensesInLocalStorage(expenses);

    // Clear Form Fields
    expenseForm.reset();
    expenseName.focus();
}
// This function is executed when the user submits the form.
// It creates an expense object with the id, name, and amount entered by the user.
// The expense object is added to the expenses array.
// The addExpenseToUI function is called to add the expense to the UI.
// The calculateTotalExpense function is called to calculate the total expense.
// The storeExpensesInLocalStorage function is called to store the expenses in local storage.

// Add Expense to UI
function addExpenseToUI(expense) {
    // Create List Item
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        ${expense.name}
        <span class="badge badge-primary badge-pill">$${expense.amount.toFixed(2)}</span>
        <a href="#" class="delete-item"><i class="fas fa-trash-alt"></i></a>
    `;
// This function is called from the addExpense function to add the expense to the UI.
// It creates a list item with the name and amount of the expense and a delete button.
// The list item is appended to the expenseList element.

    // Append List Item to Expense List
    expenseList.appendChild(li);
}

// Delete Expense
function deleteExpense(e) {
    if (e.target.classList.contains('fa-trash-alt')) {  
        if (confirm('Are you sure you want to delete this expense?')) {
            const listItem = e.target.parentElement.parentElement;
            const id = parseInt(listItem.getAttribute('data-id'));

            // Remove Expense from Expenses
            expenses = expenses.filter(expense => expense.id !== id);

            // Remove Expense from UI
            listItem.remove();

            // Calculate Total Expense
            calculateTotalExpense();

            // Store Expenses in Local Storage
            storeExpensesInLocalStorage(expenses);
        }
    }
}

// Clear All Expenses
function clearAllExpenses() {
    if (confirm('Are you sure you want to delete all expenses?')) {
        // Remove All Expenses from Expenses
        expenses = [];

        // Remove All Expenses from UI
        while (expenseList.firstChild) {
            expenseList.removeChild(expenseList.firstChild);
        }
        // This removes all child elements from the expenseList element. 
        // The while loop will continue to run as long as there is a first child element to remove.

        // Calculate Total Expense
        calculateTotalExpense();

        // Clear Local Storage
        localStorage.removeItem('expenses');
    }
}

// Calculate Total Expense
function calculateTotalExpense() {
    let total = 0;
    if (expenses.length > 0) {
        total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    }
    totalExpense.textContent = total.toFixed(2);
}

// Store Expenses in Local Storage
function storeExpensesInLocalStorage(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load Expenses from Local Storage
function loadExpensesFromLocalStorage() {
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        expenses.forEach(expense => addExpenseToUI(expense));
        calculateTotalExpense();
    }
}
