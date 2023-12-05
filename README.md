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

## Components

The main components of OwlBooks include:

- **Login**: Allows users to log in with their credentials.
- **Dashboard**: Displays the financial ratios and provides navigation to various functionalities based on the user role.
- **Sidebar**: Provides quick navigation links to different sections of the application, varying according to user privileges.

## Contributing

As this is a class project, contributions are not currently being accepted. However, feedback and suggestions are always welcome.

## License

This project is for educational purposes and is not licensed for commercial use.
