import { register } from './api.js';

/**
 * 校验注册用户表单数据
 */
function registerValidate() {
  if (!checkUsername()) {
    alert('用户名不合法，请输入后再尝试');
    document.registerForm.username.value = '';
    document.registerForm.username.focus();
    return false;
  }
  if (!checkPassword()) {
    alert('密码不合法，请输入后再尝试');
    document.registerForm.password.value = '';
    document.registerForm.password.focus();
    return false;
  }
  if (!checkRepeatPassword()) {
    alert('确认密码与密码不相同，请重新输入后再尝试');
    document.registerForm.repeat_password.value = '';
    document.registerForm.repeat_password.focus();
    return false;
  }
  if (!checkNickname()) {
    alert('用户昵称不合法，请检查修改后再尝试');
    document.registerForm.nickname.value = '';
    document.registerForm.nickname.focus();
    return false;
  }
  if (!checkPhone()) {
    alert('手机号不合法，请检查修改后再尝试');
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
$('#register').on('click', async function() {
  const isValidParams = registerValidate();
  if (!isValidParams) return;

  const res = await registerOperation();
  if (res) {
    alert('注册成功，并已自动登录！');
    window.location.href = '/';
  }

  return false;
});

// 用户名输入框校验
$('#username').on('change', function() { checkUsername(); });
// 密码输入框校验
$('#password').on('change', function() { checkPassword(); });
// 确认密码输入框校验
$('#repeat_password').on('change', function() { checkRepeatPassword(); });
// 昵称输入框校验
$('#nickname').on('change', function() { checkNickname(); });
// 手机号输入框校验
$('#phone').on('change', function() { checkPhone(); });

/**
 * 校验输入框用户名函数
 */
function checkUsername() {
  const form = document.registerForm;
  const username = form.username.value && form.username.value.trim() || null;

  const checkRes = onlyHaveNumberAndString(username);
  if (!username || username.length < 6 || username.length > 18 || !checkRes) {
    form.username.value = '';
    changeElementContentAndColorById('username_tips', '* 长度在6~18位之间，只由数字和字母组成', 'red');
    changeElementBorderColorById('username', 'red');
    return false;
  }

  changeElementContentAndColorById('username_tips', '* 校验通过，用户名合法', 'green');
  changeElementBorderColorById('username', 'green');
  return true;
}

/**
 * 校验输入框密码函数
 */
function checkPassword() {
  const form = document.registerForm;
  const password = form.password.value && form.password.value.trim() || null;

  const checkRes = onlyHaveNumberAndString(password);
  if (!password || password.length < 6 || password.length > 18 || !checkRes) {
    form.password.value = '';
    changeElementContentAndColorById('password_tips', '* 长度在6~18位之间，只由数字和字母组成', 'red');
    changeElementBorderColorById('password', 'red');
    return false;
  }

  changeElementContentAndColorById('password_tips', '* 校验通过，密码合法', 'green');
  changeElementBorderColorById('password', 'green');
  return true;
}

/**
 * 校验输入框确认密码函数
 */
function checkRepeatPassword() {
  const form = document.registerForm;
  const password = form.password.value && form.password.value.trim() || null;
  const passwordRepeat = form.repeat_password.value && form.repeat_password.value.trim() || null;

  if (password !== passwordRepeat) {
    form.repeat_password.value = '';
    changeElementContentAndColorById('repeat_password_tips', '* 确认密码与密码不一致', 'red');
    changeElementBorderColorById('repeat_password', 'red');
    return false;
  }

  changeElementContentAndColorById('repeat_password_tips', '* 校验通过，确认密码与密码一致', 'green');
  changeElementBorderColorById('repeat_password', 'green');
  return true;
}

/**
 * 校验输入框用户昵称函数
 */
function checkNickname() {
  const form = document.registerForm;
  const nickname = form.nickname.value && form.nickname.value.trim() || null;
  if (!(nickname && nickname.length)) {
    changeElementContentAndColorById('nickname_tips', '非必填项，用户昵称，长度需小于18位', null);
    changeElementBorderColorById('nickname', null);
    return true;
  }

  if (nickname.length > 18) {
    changeElementContentAndColorById('nickname_tips', '非必填项，用户昵称，长度需小于18位', 'red');
    changeElementBorderColorById('nickname', 'red');
    return false;
  }

  changeElementContentAndColorById('nickname_tips', '* 校验通过，昵称合法', 'green');
  changeElementBorderColorById('nickname', 'green');
  return true;
}

/**
 * 校验输入框手机号
 */
function checkPhone() {
  const form = document.registerForm;
  const phone = form.phone.value && form.phone.value.trim() || null;
  if (!(phone && phone.length)) {
    changeElementContentAndColorById('phone_tips', '非必填项，用户手机号', null);
    changeElementBorderColorById('phone', null);
    return true;
  }

  // 若输入了手机号，需要校验手机号是否合法
  const phoneCheck = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (phone.length !== 11 || !phoneCheck.test(phone)) {
    changeElementContentAndColorById('phone_tips', '手机号不合法，请输入11位有效手机号', 'red');
    changeElementBorderColorById('phone', 'red');
    return false;
  }

  changeElementContentAndColorById('phone_tips', '* 校验通过，手机号合法', 'green');
  changeElementBorderColorById('phone', 'green');
  return true;
}
/*
 * 改变元素的边框颜色
 * @param elementId 元素ID
 * @param color 要改变成的颜色
 */
function changeElementBorderColorById(elementId, color) {
  if (!elementId) return;

  const element = document.getElementById(elementId);
  if (!element) return;

  element.style.borderColor = color;
  return;
}

/*
 * 改变元素的内容和颜色
 * @param elementId 元素ID
 * @param content 要改变成的内容
 * @param color 要改变成的颜色
 */
function changeElementContentAndColorById(elementId, content, color) {
  if (!(elementId && content)) return;

  const element = document.getElementById(elementId);
  if (!element) return;

  element.innerHTML = content;
  element.style.color = color;
  return;
}

/**
 * 检查传入的字符串是否只包含数字和字符串
 * @param str 待校验字符串
 */
function onlyHaveNumberAndString(str) {
  if (!str) return false;

  const regex = '^[a-zA-Z0-9]+$';
  const matchRes = str.match(regex);
  return matchRes && matchRes.length && matchRes[0] === str ? true : false;
}
