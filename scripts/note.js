import { getNoteIdFromHref } from './common.js';
import { getNoteById } from './api.js';

// 加载公共的顶部导航栏
$("#base").load("base.html");

// 加载笔记详情
setNote();

/**
 * 设置笔记详情
 */
async function setNote() {
  const noteId = getNoteIdFromHref();
  if (!noteId) return;

  // 获取笔记详情
  const note = await getNoteById(noteId);
  if (!note) return;

  let noteContent = '';
  
  noteContent += `<p>${note.title}</p>`;
  noteContent += `<p>${note.content}</p>`;
  document.getElementById('note').innerHTML = noteContent;
};
