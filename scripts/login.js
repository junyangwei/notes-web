import { login } from './api.js';

// 加载公共的顶部导航栏
$("#base").load("base.html");

/**
 * 校验登陆表单数据
 */
function loginValidate() {
  const form = document.loginForm;
  if (!form.username.value || form.username.value === '') {
    alert("用户名不能为空，请输入后再尝试！");
    document.loginForm.username.focus();
    return false;
  }

  if (!form.password.value || form.password.value === '') {
    alert("密码不能为空，请输入后再尝试！");
    document.loginForm.password.focus();
    return false;
  }

  return true;
}

/**
 * 登陆操作
 */
async function loginOperation() {
  // 获取表单数据
  const loginForm = document.loginForm;
  const loginRes = await login(
    loginForm.username.value,
    loginForm.password.value,
  );

  return loginRes;
}

// 为登陆表单添加提交事件，先校验参数，检验通过则进行登陆操作
$("#login").on('click', async function() {
  const isValidParams = loginValidate();
  if (!isValidParams) return;

  const res = await loginOperation();
  if (res) {
    alert('登陆成功！');
    window.location.href = '/';
  }

  return false;
});