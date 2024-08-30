
import jsCookies from "js-cookie"
import { cookieName } from "@/constant/cookieName";
export const useCookies = () => {
  const getCookie = async () => {
    try {

      const accessToken = jsCookies.get(cookieName)

      if (!accessToken) {
        console.log("cookie not found")
      }
      return accessToken
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const setCookie = async (token) => {
    try {
      jsCookies.set("fintech-access-token", token, { expires: 1 })
      return
    } catch (err) {
      console.log(err)
    }
  }

  return { getCookie, setCookie }
}
