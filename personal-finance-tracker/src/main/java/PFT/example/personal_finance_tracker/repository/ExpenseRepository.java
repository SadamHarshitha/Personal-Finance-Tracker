package PFT.example.personal_finance_tracker.repository;
import PFT.example.personal_finance_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    // Custom query method to find expenses within a date range
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
