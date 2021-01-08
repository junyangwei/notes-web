import { getCookie, logout } from './api.js';

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
      const loginText = document.createTextNode(`Hello, ${username}.`);
      baseBar.appendChild(loginText);

      // 添加退出登录按钮
      const logoutButton = document.createElement("button");
      logoutButton.id = "logout";
      logoutButton.type = "button";
      const buttonText = document.createTextNode("log out");
      logoutButton.appendChild(buttonText);
      baseBar.appendChild(logoutButton);
    } else {
      // 否则，显示登陆入口以及注册入口
      const loginA = document.createElement("a");
      loginA.href = "login.html";
      const loginText = document.createTextNode("log in");
      loginA.appendChild(loginText);
      baseBar.appendChild(loginA);

      // 添加登陆和注册文案之间的分割线
      baseBar.appendChild(document.createTextNode(" - "));

      const registerA = document.createElement("a");
      registerA.href = "register.html";
      const registerText = document.createTextNode("register");
      registerA.appendChild(registerText);
      baseBar.appendChild(registerA);
    }

    // 为退出登录按钮添加点击事件，退出成功后刷新当前页面
    $("#logout").on('click', async function() {
      const res = await logout();
      if (res) {
        alert('退出登录成功！');
        window.location.reload();
      }
    });
  });
}

export {
  getUrlQueryParams,
  getNoteIdFromHref,
  loadBaseBar,
}
