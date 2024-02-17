import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const logout = () => {
  return signOut(auth);
};
export const handleLogoutClick = async () => {
  await logout()
  alert('ログアウトしました')
  window.location.href = "/" // useRouterが使えないためこちらで代替
}