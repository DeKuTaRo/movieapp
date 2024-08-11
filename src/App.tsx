import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useAppDispatch } from "./hooks";
import { setCurrentUser } from "./auth";
import { auth, db } from "./firebase";
import { router } from "./routes";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let unSubDoc: () => void;
    const unSubAuth: () => void = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(setCurrentUser(null));
        return;
      }

      if (user.providerData[0].providerId === "google.com") {
        unSubDoc = onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(
            setCurrentUser({
              displayName: doc.data()?.lastName + " " + doc.data()?.firstName || "",
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              uid: user.uid,
              signInType: "google",
            })
          );
        });
      } else if (user.providerData[0].providerId === "facebook.com") {
        unSubDoc = onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(
            setCurrentUser({
              displayName: doc.data()?.lastName + " " + doc.data()?.firstName || "",
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              uid: user.uid,
              signInType: "facebook",
            })
          );
        });
      } else {
        unSubDoc = onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(
            setCurrentUser({
              displayName: doc.data()?.lastName + " " + doc.data()?.firstName || "",
              photoURL: user.photoURL,
              email: user.email,
              emailVerified: user.emailVerified,
              uid: user.uid,
              signInType: "email",
            })
          );
        });
      }
    });

    return () => {
      unSubAuth();
      unSubDoc();
    };
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
