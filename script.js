document.addEventListener("DOMContentLoaded", function() {
    const loginPageButton = document.getElementById('loginPageButton');
    if (loginPageButton) {
        loginPageButton.addEventListener('click', function() {
            window.location.href = "login.html";
        });
    }

    const homePageButton = document.getElementById('homePageButton');
    if (homePageButton) {
        homePageButton.addEventListener('click', function() {
            window.location.href = "index.html";
        });
    }
});

function toggleNewUserForm() {
    const newUserForm = document.getElementById('newUserForm');
    newUserForm.style.display = (newUserForm.style.display === "block") ? "none" : "block";
}

function login() {
    // TODO: Authenticate user
    // On successful login, display user's name and picture at the top right
    window.location.href = "dashboard.html";
    window.alert("Login successful!");
}

function createNewUser() {
    // TODO: Collect user data and send request to backend for creation
    // Send email to admin for approval
    window.location.reload();
    window.alert("User created!");

}

function forgotPassword() {
    // TODO: Check security questions and send reset password link to user email
    window.alert("Password reset link sent!");
}