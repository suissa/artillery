Feature: E2E Behaviors

  Scenario: User Adds Product to Cart and Completes Purchase
    Given A user exists in the system
    Given A product exists in the system
    When The user adds the product to the cart
    Then The user places an order
    And The user completes the payment
