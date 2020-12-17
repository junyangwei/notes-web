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

export {
  getUrlQueryParams,
  getNoteIdFromHref,
}
