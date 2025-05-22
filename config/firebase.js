import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDxNN9DyR-9MJPpXdoSUr5lpQbKQmlBw5U",
  authDomain: "projeto-renato-bd522.firebaseapp.com",
  databaseURL: "https://projeto-renato-bd522-default-rtdb.firebaseio.com",
  projectId: "projeto-renato-bd522",
  storageBucket: "projeto-renato-bd522.appspot.com",
  messagingSenderId: "1051612272378",
  appId: "1:1051612272378:web:4a70d89f79f736e0df7145",
};

// Inicializa o Firebase apenas se não houver uma instância já inicializada
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
