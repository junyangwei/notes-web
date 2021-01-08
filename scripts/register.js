import { register } from './api.js';
import { loadBaseBar } from './common.js';

// 加载公共的顶部导航栏
loadBaseBar();

/**
 * 校验注册用户表单数据
 */
function registerValidate() {
  const form = document.registerForm;
  const username = form && form.username && form.username.value.trim() || null;
  const password = form && form.password && form.password.value.trim() || null;
  const phone = form && form.phone && form.phone.value.trim() || null;

  if (!username) {
    alert('用户名不能为空，请输入后再尝试');
    document.registerForm.username.value = '';
    document.registerForm.username.focus();
    return false;
  }
  if (!password) {
    alert('密码不能为空，请输入后再尝试');
    document.registerForm.password.value = '';
    document.registerForm.password.focus();
    return false;
  }
  if (password.length < 6) {
    alert('密码长度不能小于6位，请重新输入后再尝试');
    document.registerForm.password.value = '';
    document.registerForm.password.focus();
    return false;
  }

  // 若输入了手机号，需要校验手机号是否合法
  const phoneCheck = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (phone && phone.length !== 11) {
    alert('手机号长度不发合法，不为11位数字，请检查修改后再尝试');
    document.registerForm.phone.value = '';
    document.registerForm.phone.focus();
    return false;
  }
  if (phone && !phoneCheck.test(phone)) {
    alert('输入了非法的手机号，请检查修改后再尝试');
    document.registerForm.phone.value = '';
    document.registerForm.phone.focus();
    return false;
  }

  return true;
}

/**
 * 注册操作
 */
async function registerOperation() {
  // 获取表单数据
  const form = document.registerForm;
  const registerRes = await register(
    form.username.value.trim(),
    form.password.value.trim(),
    form.nickname.value.trim(),
    form.phone.value.trim(),
  );

  return registerRes;
}

// 为注册表单添加提交时间，先校验参数，校验通过则进行注册操作
$("#register").on('click', async function() {
  const isValidParams = registerValidate();
  if (!isValidParams) return;

  const res = await registerOperation();
  if (res) {
    alert('注册成功，并已自动登录！');
    window.location.href = '/';
  }

  return false;
});