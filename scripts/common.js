import { getCookie } from './api.js';

/**
 * 获取请求链接中的请求参数
 * @param url 请求链接
 */
function getUrlQueryParams(url) {
  const isValidUrl =
    url && (url.indexOf('?') !== -1 || url.indexOf('&') !== -1);
  if (!isValidUrl) return {};

  // 获取字符?在链接中的位置
  const beginIndex = url.indexOf('?');

  // 截取链接中，字符?后面的字符串（不包含?）
  const query = url.substring(beginIndex + 1);
  const params = (query && query.split('&')) || [];
  if (!(params && params.length)) return {};

  const result = {};
  for (const paramStr of params) {
    const item = (paramStr && paramStr.split('=')) || [];
    if (item && item[0] && item[1]) {
      result[item[0]] = item[1];
    }
  }

  return result;
}

/**
 * 从当前页面链接中获取参数noteId
 */
function getNoteIdFromHref() {
  const url = window.location.href;
  const urlParam = getUrlQueryParams(url);
  return urlParam && urlParam.note_id || 0;
}

/**
 * 加载公共导航栏
 */
async function loadBaseBar() {
  // 加载公共导航栏
  $("#base").load("base.html");

  // 等所有组件加载完成后，再渲染当前登录用户信息
  $("#base_bar").ready(function() {
    // 渲染前，先判断是否有相关的登陆组件，防止报null问题
    const baseBar = document.getElementById("base_bar");
    if (!baseBar) {
      console.log('没有找到登陆组件');
      return;
    }

    // 获取Cookie中的用户名
    const username = getCookie('username');

    // 如果存在，表示已登录，显示登陆的用户名
    if (username) {
      const loginText = document.createTextNode(`Hello, ${username}`);
      baseBar.appendChild(loginText);
    } else {
      // 否则，显示登陆入口
      const newA = document.createElement("a");
      newA.href = "login.html";
      const loginText = document.createTextNode("login in");
      newA.appendChild(loginText);
      baseBar.appendChild(newA);
    }
  });
}

export {
  getUrlQueryParams,
  getNoteIdFromHref,
  loadBaseBar,
}
