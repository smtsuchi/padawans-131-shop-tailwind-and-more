import { initializeApp } from "firebase/app";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";

const firebaseConfig = {
    apiKey: "AIzaSyAk0YDXpAHxfNu7qDmS-0NCVNBdclNodJQ",
    authDomain: "padawans131-frontend-shop.firebaseapp.com",
    projectId: "padawans131-frontend-shop",
    storageBucket: "padawans131-frontend-shop.appspot.com",
    messagingSenderId: "326189954847",
    appId: "1:326189954847:web:ea49f2caa57070a704e22a",
    databaseURL: "https://padawans131-frontend-shop-default-rtdb.firebaseio.com",
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>,
    // </React.StrictMode>,
);
