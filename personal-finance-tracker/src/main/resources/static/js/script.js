document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form'); // Generic form ID
    const expenseIdInput = document.getElementById('expense-id'); // Hidden ID input
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const dateInput = document.getElementById('date');
    const submitButton = document.getElementById('submit-button'); // Submit button
    const cancelEditButton = document.getElementById('cancel-edit-button'); // New cancel button

    const expensesList = document.getElementById('expenses-list');
    const totalAmountSpan = document.getElementById('total-amount');
    const filterStartDateInput = document.getElementById('filter-start-date');
    const filterEndDateInput = document.getElementById('filter-end-date');
    const filterButton = document.getElementById('filter-button');
    const clearFilterButton = document.getElementById('clear-filter-button');

    const API_BASE_URL = 'http://localhost:8081/api/expenses';

    let isEditMode = false; // Flag to track if we are in edit mode

    // Function to fetch and display expenses
    async function fetchExpenses(startDate = null, endDate = null) {
        expensesList.innerHTML = '<tr><td colspan="4">Loading expenses...</td></tr>';
        let url = API_BASE_URL;
        const params = new URLSearchParams();

        if (startDate) {
            params.append('startDate', startDate);
        }
        if (endDate) {
            params.append('endDate', endDate);
        }

        if (startDate || endDate) {
            url += '/filter?' + params.toString();
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const expenses = await response.json();
            displayExpenses(expenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            expensesList.innerHTML = '<tr><td colspan="4" style="color: red;">Failed to load expenses.</td></tr>';
            totalAmountSpan.textContent = '$0.00';
        }
    }

    // Function to display expenses in the table
    function displayExpenses(expenses) {
        expensesList.innerHTML = '';
        let total = 0;

        if (expenses.length === 0) {
            expensesList.innerHTML = '<tr><td colspan="4">No expenses found for the selected period.</td></tr>';
            totalAmountSpan.textContent = '$0.00';
            return;
        }

        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.description}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.date}</td>
                <td class="actions-column">
                    <button class="edit-button" data-id="${expense.id}"
                            data-description="${expense.description}"
                            data-amount="${expense.amount}"
                            data-date="${expense.date}">Edit</button>
                    <button class="delete-button" data-id="${expense.id}">Delete</button>
                </td>
            `;
            expensesList.appendChild(row);
            total += expense.amount;
        });
        totalAmountSpan.textContent = `$${total.toFixed(2)}`;

        // Add event listeners to newly created buttons
        addEventListenersToButtons();
    }

    // Function to add event listeners to Edit and Delete buttons
    function addEventListenersToButtons() {
        document.querySelectorAll('.edit-button').forEach(button => {
            button.removeEventListener('click', handleEdit); // Prevent duplicate listeners
            button.addEventListener('click', handleEdit);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.removeEventListener('click', handleDelete); // Prevent duplicate listeners
            button.addEventListener('click', handleDelete);
        });
    }

    // Handle Edit button click
    function handleEdit(event) {
        const id = event.target.dataset.id;
        const description = event.target.dataset.description;
        const amount = event.target.dataset.amount;
        const date = event.target.dataset.date;

        // Populate the form with expense details
        expenseIdInput.value = id;
        descriptionInput.value = description;
        amountInput.value = amount;
        dateInput.value = date;

        // Change form button text and show cancel button
        submitButton.textContent = 'Update Expense';
        cancelEditButton.style.display = 'inline-block'; // Show cancel button
        isEditMode = true;

        // Scroll to the top of the page or the form for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle Delete button click
    async function handleDelete(event) {
        const id = event.target.dataset.id;
        if (confirm('Are you sure you want to delete this expense?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                console.log('Expense deleted:', id);
                fetchExpenses(filterStartDateInput.value, filterEndDateInput.value); // Refresh the list
            } catch (error) {
                console.error('Error deleting expense:', error);
                alert('Failed to delete expense. Please try again.');
            }
        }
    }

    // Handle Add/Update Expense Form Submission
    expenseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = expenseIdInput.value;
        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value; // Format 'YYYY-MM-DD'

        if (!description || isNaN(amount) || amount <= 0 || !date) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const expenseData = {
            description,
            amount,
            date
        };

        try {
            let response;
            if (isEditMode) {
                // Update existing expense
                response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(expenseData)
                });
            } else {
                // Add new expense
                response = await fetch(API_BASE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(expenseData)
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(isEditMode ? 'Expense updated:' : 'Expense added:', result);

            resetForm(); // Clear and reset the form
            fetchExpenses(filterStartDateInput.value, filterEndDateInput.value); // Refresh the list
        } catch (error) {
            console.error(isEditMode ? 'Error updating expense:' : 'Error adding expense:', error);
            alert(`Failed to ${isEditMode ? 'update' : 'add'} expense. Please try again.`);
        }
    });

    // Handle Cancel Edit button click
    cancelEditButton.addEventListener('click', resetForm);

    // Function to reset the form to "Add Expense" mode
    function resetForm() {
        expenseForm.reset(); // Clear form fields
        expenseIdInput.value = ''; // Clear hidden ID
        submitButton.textContent = 'Add Expense'; // Reset button text
        cancelEditButton.style.display = 'none'; // Hide cancel button
        isEditMode = false; // Reset edit mode flag
    }

    // Handle Filter Button Click
    filterButton.addEventListener('click', () => {
        const startDate = filterStartDateInput.value;
        const endDate = filterEndDateInput.value;
        fetchExpenses(startDate, endDate);
    });

    // Handle Clear Filter Button Click
    clearFilterButton.addEventListener('click', () => {
        filterStartDateInput.value = '';
        filterEndDateInput.value = '';
        fetchExpenses(); // Fetch all expenses
    });

    // Initial load of expenses when the page loads
    fetchExpenses();
});