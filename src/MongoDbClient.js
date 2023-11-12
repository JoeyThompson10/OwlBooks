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

async function getUserInfoFunction(username){
    const user = await app().logIn(credentials());
    return await user.functions.getUserInfo(username);
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

async function SuspendUser(username, days) {
    const user = await app().logIn(credentials());
    return await user.functions.SuspendUser(username, days);
}

async function GetUserAuth(username) {
    const user = await app().logIn(credentials());
    return await user.functions.GetUserAuth(username);
}

async function ChangePassword(username, newPassword) {
    const user = await app().logIn(credentials());
    return await user.functions.ChangePassword(username, newPassword);
}

async function CreateAccount(accName, accNumber, accDescription, accNormalSide, accCategory, accSubcategory, accInitalBalance, accDebit, accCredit, accBalance, accTimeCreated, accUserID, accOrder, accStatement, accComment) {
    const user = await app().logIn(credentials());
    return await user.functions.CreateAccount(accName, accNumber, accDescription, accNormalSide, accCategory, accSubcategory, accInitalBalance, accDebit, accCredit, accBalance, accTimeCreated, accUserID, accOrder, accStatement, accComment);
}

async function getAccountInfo(accountID){
    const user = await app().logIn(credentials());
    return await user.functions.getAccountInfo(accountID);
}
async function setAccountInfo(accountID, accName, accDescription, accNormalSide, accCategory, accSubcategory, accInitialBalance, accDebit, accCredit, accBalance, accTimeCreated, accUserId, accOrder, accStatement, accComment, isActive){
    const user = await app().logIn(credentials());
    return await user.functions.setAccountInfo(accountID, accName, accDescription, accNormalSide, accCategory, accSubcategory, accInitialBalance, accDebit, accCredit, accBalance, accTimeCreated, accUserId, accOrder, accStatement, accComment, isActive);
}

async function GetAllAccounts() {
    const user = await app().logIn(credentials());
    return await user.functions.GetAllAccounts(); 
  }

async function GetAllAccountEvents() {
    const user = await app().logIn(credentials());
    return await user.functions.GetAllAccountEvents();
}

async function setJournalStatus (journalNumber, status){
    const user = await app().logIn(credentials());
    return await user.functions.setJournalStatus( journalNumber, status );
}

async function getJournalEntry(){
    const user = await app().logIn(credentials());
    return await user.functions.getJournalEntry();
}

async function addJournalEntry(entryData){
    const user = await app().logIn(credentials());
    return await user.functions.addJournalEntry(entryData);
}

async function deleteJournalEntry(_id){
    const user = await app().logIn(credentials());
    return await user.functions.deleteJournalEntry(_id);
}

async function showOneJournalEntry(searchCriteria){
    const user = await app().logIn(credentials());
    return await user.functions.showOneJournalEntry(searchCriteria);
}

async function displayEventsForOneAccount(accName){
    const user = await app().logIn(credentials());
    return await user.functions.displayEventsForOneAccount(accName);
}

export { 
    GetAllAccountEvents, 
    setAccountInfo, 
    CreateAccount, 
    CreateUser, 
    LoginFunction, 
    getUserInfoFunction, 
    setUserInfoFunction, 
    isCurrentUser, 
    sendEmail, 
    GetAllUsers, 
    GetAlmostExpiredUsers, 
    SuspendUser, 
    GetUserAuth, 
    ChangePassword, 
    getAccountInfo, 
    GetAllAccounts,
    setJournalStatus,
    getJournalEntry,
    addJournalEntry,
    deleteJournalEntry,
    showOneJournalEntry,
    displayEventsForOneAccount
};
