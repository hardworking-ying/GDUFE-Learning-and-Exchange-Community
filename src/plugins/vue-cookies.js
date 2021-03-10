import Vue from "vue"
import VueCookies from "vue-cookies"

Vue.use(VueCookies);

export function setLoginCookie(userId) {
  // $cookies.set(keyName, value[, expireTimes[, path[, domain[, secure[, sameSite]]]]])
  // 默认expireTime是 1 day
  $cookies.set("GDUFELoginId", userId, "100d");
}

export function removeLoginCookie() {
  $cookies.remove("GDUFELoginId");
}
