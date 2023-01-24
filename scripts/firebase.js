
import {
    initializeApp
  } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
  import {
    getDatabase,
    ref,
    set,
    onValue,
    update,
    remove,
  } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBdSn2oor3hTNwBxtouuiAfTWqzhlxoX_E",
    authDomain: "rightfit-138ca.firebaseapp.com",
    databaseURL: "https://rightfit-138ca-default-rtdb.firebaseio.com",
    projectId: "rightfit-138ca",
    storageBucket: "rightfit-138ca.appspot.com",
    messagingSenderId: "624817576663",
    appId: "1:624817576663:web:63c0589a1db9b677b6ee92"
  };
  
  const app = initializeApp(firebaseConfig);
  export const database = getDatabase(app);

function writeUserData(userId, FirstNameVal, LastNameVal, EmailVal, AddressVal, StateVal, PostCodeVal, products) {
    //const db = getDatabase();
    set(ref(database, 'customers/' + userId), {
        fname: FirstNameVal,
        lname: LastNameVal,
        email: EmailVal,
        address: AddressVal,
        state: StateVal,
        postcode: PostCodeVal,
        products: products
    });
}
writeUserData("pvij3WmavvsNXQEEw1lk", "craig", "david", "cd@mail.com", "1 west St", "NSW", 
    "2173", "{img: blah, name: blah, price: blah, quantity: blah }")