import { getNoteIdFromHref, loadBaseBar } from './common.js';
import { getNoteById } from './api.js';

// 加载公共的顶部导航栏
loadBaseBar();

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
  noteContent += `<a href="edit_note.html?note_id=${note.id}">修改笔记</a>`;
  noteContent += `<p>${note.title}</p>`;
  noteContent += `<p>${note.content}</p>`;
  document.getElementById("note").innerHTML = noteContent;
};
