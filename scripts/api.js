const notesApiHost = 'http://localhost:8000';

// NotesAPI接口
const getCsrfTokenUrl = `${notesApiHost}/get_csrf`;
const getAllNotesUrl = `${notesApiHost}/notes`;
const getNoteUrl = `${notesApiHost}/notes/:id`;
const createNoteUrl = `${notesApiHost}/create_note`;

/**
 * 调用接口公共函数
 * @param path api文件中的接口调用地址
 * @param optionsParam 详细参数（JSON格式）
 * @param method GET or POST
 * @param csrfToken Django服务器的csrf_token
 */
async function axiosAPI(path, optionsParam, method = 'GET', csrfToken = '') {
  const timestamp = Date.now();
  method = method && method.toUpperCase() || null;

  const methods = ['GET', 'POST'];
  if (!methods.includes(method)) {
    throw new Error('调用接口传入的方法有误，请检查后再尝试!!!');
  }

  let url = `${path}?time_stamp=${timestamp}`;
  if (method === 'GET') {
    const query = optionsParamToString(optionsParam);
    if (query) url += `&${query}`;
  } else if (method === 'POST' && optionsParam) {
    optionsParam = JSON.stringify(optionsParam) || null;
  }

  let response;
  try {
    response = await $.ajax({
      url,
      data: optionsParam,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      xhrFields: {
        // 需要跨域携带Cookie时，需要把withCredentials设置为True
        // 使跨域请求Response Headers信息体中的Set-Cookie能够正常写入浏览器
        withCredentials: true,
      },
    });
  } catch (error) {
    throw new Error(`调用接口失败: ${error.message}`);
  }

  const code = response && Number(response.code);
  if (code !== 0) {
    throw new Error(`调用接口失败，接口抛错: ${code}`);
  }

  return response && response.data || null;
}

/**
 * 将请求参数由JSON对象转为字符串拼接
 * @param optionsParam 请求参数对象
 */
function optionsParamToString(optionsParam) {
  if (!optionsParam) return '';

  let str = '';
  for (const key in optionsParam) {
    if (optionsParam && optionsParam[key]) {
      str += `&${key}=${optionsParam[key]}`;
    }
  }

  return str;
}

/**
 * 获取全部的笔记列表
 */
async function getAllNotes() {
  return axiosAPI(getAllNotesUrl, '', 'GET');
}

/**
 * 获取笔记详情
 * @param noteId 笔记ID
 */
async function getNoteById(noteId) {
  const url = getNoteUrl.replace(':id', noteId);
  return axiosAPI(url, '', 'GET');
}

/*
 * 创建新的笔记
 */
async function createNote(title, content) {
  const requestBody = {
    title,
    content,
  };
  const csrfToken = await getCsrfToken();
  return axiosAPI(
    createNoteUrl,
    requestBody,
    'POST',
    csrfToken,
  );
}

/**
 * 获取后端Django框架的csrf_token
 */
async function getCsrfToken() {
  return axiosAPI(
    getCsrfTokenUrl,
    '',
    'GET',
  );
}

/**
 * 预留一个获取某个Cookie中的值方法，方便日后手动获取cookie的某个值
 */
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // 需要确定cookie字符串开始的值是否是我们想要的?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export {
  getAllNotes,
  getNoteById,
  createNote,
};
