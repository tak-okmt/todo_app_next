import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";

import { app } from "./firebase";

export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  const auth = getAuth(app);
  return signOut(auth);
};