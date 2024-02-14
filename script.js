// script.js

// Sample data (replace with your actual data)
const salesData = [];

// Function to display sales data in the table
function displaySalesData() {
    const tableBody = document.getElementById('salesTableBody');
    const totalAmountPaidCell = document.getElementById('totalAmountPaid');
    const totalCreditCell = document.getElementById('totalCredit');
    const totalSaleCell = document.getElementById('totalSale');
    let totalAmountPaid = 0;
    let totalCredit = 0;
    let totalSale = 0;

    // Clear existing rows
    tableBody.innerHTML = '';

    // Populate the table with sales data
    salesData.forEach((sale, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = sale.date;
        row.insertCell(1).textContent = sale.person;
        row.insertCell(2).textContent = sale.product;
        row.insertCell(3).textContent = sale.tons;
        const amountPaidCell = row.insertCell(4);
        const creditCell = row.insertCell(5);
        const totalSaleCell = row.insertCell(6);

        // Display Amount Paid if defined
        if (sale.amountPaid) {
            amountPaidCell.textContent = sale.amountPaid.toFixed(2);
            totalAmountPaid += sale.amountPaid;
        }

        // Display Credit if defined
        if (sale.credit) {
            creditCell.textContent = sale.credit.toFixed(2);
            totalCredit += sale.credit;
        }

        // Display Total Sale (sum of Amount Paid and Credit)
        const totalSaleValue = sale.amountPaid + sale.credit;
        totalSaleCell.textContent = totalSaleValue.toFixed(2);
        totalSale += totalSaleValue;

        // Add delete button to each row
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSale(index);
        row.insertCell(7).appendChild(deleteButton);
    });

    // Display total amounts in the Total row
    totalAmountPaidCell.textContent = totalAmountPaid.toFixed(2);
    totalCreditCell.textContent = totalCredit.toFixed(2);
    totalSaleCell.textContent = totalSale.toFixed(2);
}

// Function to add a new sale
function addSale() {
    const dateInput = document.getElementById('dateInput').value;
    const personInput = document.getElementById('personInput').value;
    const productInput = document.getElementById('productInput').value;
    const tonsInput = parseFloat(document.getElementById('tonsInput').value) || 0; // Default to 0 if not a valid number
    const amountPaidInput = parseFloat(document.getElementById('amountPaidInput').value) || 0; // Default to 0 if not a valid number
    const creditInput = parseFloat(document.getElementById('creditInput').value) || 0; // Default to 0 if not a valid number

    if (dateInput && personInput && productInput) {
        const newSale = { date: dateInput, person: personInput, product: productInput, tons: tonsInput, amountPaid: amountPaidInput, credit: creditInput };
        salesData.push(newSale);
        displaySalesData();

        // Clear form inputs
        document.getElementById('dateInput').value = '';
        document.getElementById('personInput').value = '';
        document.getElementById('productInput').value = '';
        document.getElementById('tonsInput').value = '';
        document.getElementById('amountPaidInput').value = '';
        document.getElementById('creditInput').value = '';
    } else {
        alert('Please fill in all required fields with valid values.');
    }
}

// Function to delete a sale
function deleteSale(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        salesData.splice(index, 1);
        displaySalesData();
    }
}

// Function to download the balance sheet as a .xlsx file
function downloadBalanceSheet() {
    const worksheet = XLSX.utils.json_to_sheet(salesData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Balance_Sheet');
    XLSX.writeFile(workbook, 'balance_sheet.xlsx');
}

// Call the function to display initial data
displaySalesData();

