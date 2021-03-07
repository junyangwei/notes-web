import { login } from './api.js';

// 加载公共的顶部导航栏
$('#base').load('base.html');

/**
 * 校验登陆表单数据
 */
function loginValidate() {
  if (!checkUsername()) {
    alert('用户名不能为空，请输入后再尝试！');
    document.loginForm.username.focus();
    return false;
  }

  if (!checkPassword()) {
    alert('密码不能为空，请输入后再尝试！');
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
$('#login').on('click', async function() {
  const isValidParams = loginValidate();
  if (!isValidParams) return;

  const res = await loginOperation();
  if (res) {
    alert('登陆成功！');
    window.location.href = '/';
  }

  return false;
});

// 用户名输入框校验
$('#username').on('change', function() { checkUsername(); });

// 密码输入框校验
$('#password').on('change', function() { checkPassword(); });

/**
 * 校验输入框用户名函数
 */
function checkUsername() {
  const form = document.loginForm;

  const username = form.username.value && form.username.value.trim() || null;
  let usernameTips = document.getElementById('username_tips');
  if (!username) {
    form.username.value = '';
    usernameTips.innerHTML = ' * 用户名不能为空';
    return false;
  }

  usernameTips.innerHTML = '</br>';
  return true;
}

/**
 * 校验输入框密码函数
 */
function checkPassword() {
  const form = document.loginForm;

  const password = form.password.value && form.password.value.trim() || null;
  let usernameTips = document.getElementById('password_tips');
  if (!password) {
    form.password.value = '';
    usernameTips.innerHTML = ' * 密码不能为空';
    return false;
  }

  usernameTips.innerHTML = '</br>';
  return true;
}