export const useCookies = () => {
  const getCookies = async (name) => {
    const tokens = `; ${document.cookie}`
    const parts = tokens.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    } else {
      return null
    }
  }

  return { getCookies }
}
