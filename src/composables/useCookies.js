export const useCookies = () => {
  const getCookies = async (name) => {
    try {
      const tokens = `; ${document.cookie}`;
      const parts = tokens.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      } else {
        console.log("Cookie not found");
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return { getCookies }
}
