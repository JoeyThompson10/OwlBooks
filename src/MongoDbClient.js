import * as RealmWeb from "realm-web";

function app(){
    return new RealmWeb.App({ id: "application-0-vfyjo" });
}

function credentials(){
    //const apiKey =
    //  "eehr9IKwaVhUfgSkvu4FxohCIATY6avl7G5UKNWpjWggWlc4gyfBqTXBslUA5x90";
    //return RealmWeb.Credentials.apiKey(apiKey);

    return Realm.Credentials.anonymous();
}


async function CreateUser(email, password){
    const user = await app().logIn(credentials());
    return await user.functions.CreateUser(email, password);
}

export { CreateUser };