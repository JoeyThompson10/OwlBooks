import * as RealmWeb from "realm-web";

function app(){
    return new RealmWeb.App({ id: "application-0-vfyjo" });
}

function credentials(){
    const apiKey =
      "4qYf6Yu9vwDtDRgInc0lNsPJX105pJf8QD6H0nRfQMpU7aCsyW20WOnc2CBMlBZy";
    return RealmWeb.Credentials.apiKey(apiKey);
}

async function CreateUser(password, email, firstName, lastName, address, dob){
    const user = await app().logIn(credentials());
    return await user.functions.CreateUser(password, email.toLowerCase(), firstName.toLowerCase(), lastName.toLowerCase(), address.toLowerCase(), dob);
}

async function LoginFunction(email, password){
    const user = await app().logIn(credentials());
    return await user.functions.LogIn(email, password);
}

async function getUserInfoFunction(email){
    const user = await app().logIn(credentials());
    return await user.functions.getUserInfo(email);
}

async function setUserInfoFunction(username, newIsAdmin, newIsManager, newIsActive, newBadLogins){
    const user = await app().logIn(credentials());
    return await user.functions.setUserInfo(username, newIsAdmin, newIsManager, newIsActive, newBadLogins);
}

async function isCurrentUser(username){
    const user = await app().logIn(credentials());
    return await user.functions.isCurrentUser(username);
}

async function sendEmail(emailAddress, subject, body){
    const user = await app().logIn(credentials());
    return await user.functions.SendEmail(emailAddress, subject, body);
}

async function GetAllUsers(){
    const user = await app().logIn(credentials());
    return await user.functions.GetAllUsers();
}

async function GetAlmostExpiredUsers(PASSWORD_TIMEOUT_THRESHOLD){
    const user = await app().logIn(credentials());
    return await user.functions.GetAlmostExpiredUsers(PASSWORD_TIMEOUT_THRESHOLD);
}


//testing
async function ResetPasswordFunction(username, newPassword) {
    try {
      const saltRounds = 10; // Number of salting rounds for bcrypt
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds); // Hashing the new password
      
      const user = await UserModel.findOne({ username }); // Finding the user by username
      
      if (!user) {
        throw new Error('User does not exist'); // If no user is found, throw an error
      }
  
      user.password = hashedPassword; // Updating the user's password
      await user.save(); // Saving the updated user object
      
      return { message: 'Password reset successful.' };
    } catch (error) {
      console.error(error);
      return { message: 'Error resetting password.', error: error.message };
    }
  }

export { CreateUser, LoginFunction, getUserInfoFunction, setUserInfoFunction , isCurrentUser, sendEmail, GetAllUsers, GetAlmostExpiredUsers, ResetPasswordFunction };
