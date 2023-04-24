import jwt_decode from "jwt-decode";
import router from "@/router";

async function handleAuthToken(commit) {
  const authToken = sessionStorage.getItem("auth_token");
  if (authToken) {
    const decodedToken = jwt_decode(authToken);
    const expirationTime = decodedToken.exp;
    const timestampInMillis = expirationTime * 1000;
    const currentTimeInMillis = Date.now();
    const durationInMillis = timestampInMillis - currentTimeInMillis - 60000;
    let inactivityTimeout = 1200000;
    let timeoutId;

    const handleInactivity = () => {
      commit('resetUserInfo');
      router.push("/");
      commit("setError", 'User inactive for 20 minutes.');
    };

    const resetInactivityTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleInactivity, inactivityTimeout);
    };

    window.addEventListener('mousemove', resetInactivityTimeout);
    window.addEventListener('keypress', resetInactivityTimeout);
    window.addEventListener('scroll', resetInactivityTimeout);

    if (durationInMillis > 0) {
      timeoutId = setTimeout(() => {
        commit('resetUserInfo');
        router.push("/");
        commit("setError", 'Token expired.');
      }, durationInMillis);

      resetInactivityTimeout();
    }
  }
}


export { handleAuthToken };
