package PFT.example.personal_finance_tracker.controller;

import PFT.example.personal_finance_tracker.model.Expense;
import PFT.example.personal_finance_tracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:8081") // Allow requests from your frontend port (adjust if needed)
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        if (expense.getDate() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Date is mandatory
        }
        Expense newExpense = expenseService.addExpense(expense);
        return new ResponseEntity<>(newExpense, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Expense>> getExpensesByDateRange(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {

        List<Expense> expenses;
        if (startDate != null && endDate != null) {
            expenses = expenseService.getExpensesByDateRange(startDate, endDate);
        } else {
            // If no dates provided, fetch all expenses (or handle as per business logic)
            expenses = expenseService.getAllExpenses();
        }
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // New: Update Expense (PUT)
    @PutMapping("/{id}") // Path variable to identify the expense to update
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails) {
        Expense updatedExpense = expenseService.updateExpense(id, expenseDetails);
        if (updatedExpense != null) {
            return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Expense with given ID not found
        }
    }

    // New: Delete Expense (DELETE)
    @DeleteMapping("/{id}") // Path variable to identify the expense to delete
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        boolean deleted = expenseService.deleteExpense(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content for successful deletion
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Expense with given ID not found
        }
    }
}