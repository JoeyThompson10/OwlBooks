# OwlBooks

https://owlbooks-swe4713.netlify.app/

OwlBooks is a web-based application developed for a class project. It serves as a financial management tool, allowing users to log in, manage accounts, view financial ratios, and perform various other accounting tasks.

## Features

- User authentication with role-based access (administrator, manager, regular user).
- Dashboard displaying financial ratios with color coding (green, yellow, red) based on predefined thresholds.
- Ability to manage user accounts, including creation, editing, and deactivation.
- Financial management features including adding and editing accounts, viewing account event logs, journal entries, and trial balances.

## Prerequisites

Before running OwlBooks, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)

## Installation

To set up OwlBooks on your local machine:

1. Clone the repository to your local machine:
```git clone https://github.com/JoeyThompson10/OwlBooks.git```

2. Navigate to the project directory:
```cd OwlBooks```

3. Install the required dependencies:
```npm install```

## Running the Application

After installing the dependencies, you can start the application by running:

```npm start```

This will start the development server, and the application should be accessible at `http://localhost:3000` in your web browser.

## Usage

Upon launching the application, you'll be presented with a login screen. Use the following credentials to log in as different users:

- **User**: username: `user1`, password: `user1`
- **Manager**: username: `manager1`, password: `manager1`
- **Admin**: username: `admin1`, password: `admin1`

Different user roles have access to different features within the application.

## Testing

To ensure the reliability of OwlBooks, follow these steps to run the automated test suite:

1. Navigate to the project directory:
```cd OwlBooks```

2. Run the test command:
```npm test```

## Components

OwlBooks is structured with a focus on modularity and clarity. Below are the components organized by folder:

### src
- **App.js**:
  - App.js sets up the main React component with routing configuration.
  - Uses React Router for navigation between different components and pages.
  - Implements conditional rendering for headers and organizes application routes.
- **MongoDbClient**:
  - Connects to MongoDB serverless functions, interacting with a NoSQL database.
  - Facilitates user authentication, account management, and data retrieval.
  - Exports various asynchronous functions like CreateUser, LoginFunction, GetAllAccounts, etc.

### src/omponents
- **Header**: The top navigation bar, which includes branding and navigation controls.
- **IntroHeader**: A special header that appears on specific pages, possibly offering a welcome message or introductory information.
- **Footer**: The bottom part of the application, showing additional information or links.
- **Sidebar**: A navigational component providing links to various sections of the application, adapting to the user's role.
- **UserOptions**: A dropdown component for user-specific settings, such as profile configuration or logout.
- **CalendarPopover**: A component that appears over the context to allow users to pick dates.

### src/pages
- **Dashboard**: Central page displaying key metrics and navigation to various features based on user roles.
- **Login**: The entry point for user authentication, directing different user roles to appropriate dashboards.
- **Profile**: Allows users to view and edit their personal and login information.
- **ResetPassword**: Enables users to securely change their passwords.
- **SplashScreen**: An initial loading screen to welcome users or provide important announcements.
- **TrialBalance**: A financial component for viewing the trial balance, ensuring the books are balanced.
- **Journal**: Used for creating, viewing, and managing journal entries, a critical aspect of financial record-keeping.

### src/pages/AdminDashboard
- **AccountEventLog**: Shows a log of all events related to user accounts, such as creation or modification.
- **AddNewAccount**: Facilitates the creation of new financial accounts within the system.
- **AllAccounts**: Lists all financial accounts, providing management options like editing or deletion.
- **AllUsers**: Displays a list of all users, where admin can manage user accounts.
- **CreateUserPage**: A form that allows the creation of new user accounts with specified roles and permissions.
- **EditExistingAccounts**: Provides an interface to edit the details of existing financial accounts.
- **EditUser**: Allows for editing user details, including roles and access rights.
- **ExpiredPasswords**: Highlights accounts with passwords that need updating, emphasizing security.
- **LedgerPage**: A detailed view of individual financial accounts, showing transactions and balances.

## Contributing

As this is a class project, contributions are not currently being accepted. However, feedback and suggestions are always welcome.

## License

This project is for educational purposes and is not licensed for commercial use.