# Smart Payroll

Smart Payroll is a School Employee Payroll Management System developed using Spring Boot, JPA/Hibernate, MySQL, and React.

The application is designed to manage employee records and payroll-related information for different categories of school employees.

## 🚀 Technologies Used

### Backend
- Java 25
- Spring Boot
- Spring Data JPA
- Hibernate
- Spring Security
- REST API
- Maven
- Swagger / OpenAPI

### Database
- MySQL

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

## 👥 Employee Categories

The system currently supports:

- Teachers
- Principal
- Support Staff
- Accounts Staff

## 📋 Employee Information

The system manages information such as:

- Employee ID
- Name
- Aadhaar Number
- PAN Number
- Email
- Phone Number
- Father's Name
- Mother's Name
- Husband's Name
- Basic Salary
- HRA
- Daily Allowance
- Travel Allowance
- Bonus
- Incentive
- Miscellaneous
- TA Liability
- Tax Liability
- Total Salary
- Financial Year
- Month
- Joining Date
- Leaving Date
- Employee Role

## 🗄️ Database Design

The project uses MySQL with JPA/Hibernate.

Employee inheritance is implemented using the **SINGLE_TABLE** inheritance strategy.

All employee types are stored in a common table:

```text
school_management_record
