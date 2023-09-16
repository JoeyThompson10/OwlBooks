import * as RealmWeb from "realm-web";

function app(){
    return new RealmWeb.App({ id: "application-0-vfyjo" });
}

function credentials(){
    const apiKey =
      "4qYf6Yu9vwDtDRgInc0lNsPJX105pJf8QD6H0nRfQMpU7aCsyW20WOnc2CBMlBZy";
    return RealmWeb.Credentials.apiKey(apiKey);
}

async function CreateUser(email, password){
    const user = await app().logIn(credentials());
    return await user.functions.CreateUser(email, password);
}

async function LoginFunction(email, password){
    const user = await app().logIn(credentials());
    return await user.functions.LogIn(email, password);
}

export { CreateUser, LoginFunction };