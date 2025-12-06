import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDgRcV8HN24S_D8ykm65YUFod3PZgzI9XQ",
    authDomain: "digital-life-lessons-b2d6b.firebaseapp.com",
    projectId: "digital-life-lessons-b2d6b",
    storageBucket: "digital-life-lessons-b2d6b.firebasestorage.app",
    messagingSenderId: "378088254966",
    appId: "1:378088254966:web:e6227ec85b811ca7cfebd7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
