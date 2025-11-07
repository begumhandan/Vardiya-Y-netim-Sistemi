Feature: Personel model
  To ensure that a personnel can have assigned shifts

  Scenario: Create a new personnel and assign a shift
    Given the database has no personnel
    And I create a personnel with first name "Ali" and last name "Veli"
    And I assign a shift to this personnel from "2025-11-01 09:00" to "2025-11-01 17:00"
    Then the database should contain 1 shifts for personnel named "Ali" "Veli"

