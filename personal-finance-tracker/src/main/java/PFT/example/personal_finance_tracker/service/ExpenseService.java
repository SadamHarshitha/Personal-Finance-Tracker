package PFT.example.personal_finance_tracker.service;

import PFT.example.personal_finance_tracker.model.Expense;
import PFT.example.personal_finance_tracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public List<Expense> getExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetween(startDate, endDate);
    }

    // New: Update Expense
    public Expense updateExpense(Long id, Expense expenseDetails) {
        Optional<Expense> existingExpenseOptional = expenseRepository.findById(id);

        if (existingExpenseOptional.isPresent()) {
            Expense existingExpense = existingExpenseOptional.get();
            existingExpense.setDescription(expenseDetails.getDescription());
            existingExpense.setAmount(expenseDetails.getAmount());
            existingExpense.setDate(expenseDetails.getDate());
            return expenseRepository.save(existingExpense);
        } else {
            return null; // Expense not found
        }
    }

    // New: Delete Expense
    public boolean deleteExpense(Long id) {
        if (expenseRepository.existsById(id)) {
            expenseRepository.deleteById(id);
            return true;
        } else {
            return false; // Expense not found
        }
    }
}