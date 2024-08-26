# VeliGames Backoffice Test Automation

## Overview

This project provides a test automation framework for the VeliGames Backoffice. It includes tests for various functionalities and e2e flows.


## Installation

1. **Install Node.js:**
    - Download and install Node.js from [nodejs.org](https://nodejs.org/en/download/package-manager).

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

3. **Navigate to the project directory:**
    ```bash
    cd GamesBackoffice
    ```

4. **Install required packages:**
    ```bash
    npm i
    ```

## Running the Tests

### Running All Tests

To run all tests:

```bash
npx cypress run --reporter mocha-allure-reporter
```

### Generate and see Allure report
```bash
allure generate allure-results --clean -o allure-report 
allure open  allure-report
```

### Running Tests on Different Browsers
To run tests on a different browser, provide the `--browser` command-line argument with the desired browser name:

**Firefox:**

```bash
npx cypress run --browser firefox --reporter mocha-allure-reporter
```
**Chrome:**

```bash
npx cypress run --browser chrome --reporter mocha-allure-reporter
```

### Contribution
Contributions are welcome! Please follow these steps to contribute:

 - Fork the repository.
 - Create a new branch (git checkout -b feature-branch).
 - Commit your changes (git commit -m 'Add some feature').
 - Push to the branch (git push origin feature-branch).
 - Open a pull request.

## Contact 
For any questions or support, please contact:  **vsenyk@velitech.com**
