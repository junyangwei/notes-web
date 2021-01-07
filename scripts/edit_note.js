import { getNoteIdFromHref, loadBaseBar } from './common.js';
import { getNoteById, updateNote } from './api.js';

// 加载公共的顶部导航栏
loadBaseBar();

// 加载已有的笔记信息
readyEditNoteFormData();

/**
 * 获取已有的笔记信息，并写入表单内
 */
async function readyEditNoteFormData() {
  const noteId = getNoteIdFromHref();
  if (!noteId) return;

  // 获取笔记详情
  const note = await getNoteById(noteId);
  if (!note) return;

  if (note.title) {
    const title = document.getElementById("title");
    title.value = note.title;
  }
  if (note.content) {
    const content = document.getElementById("content");
    content.value = note.content;
  }
}

/**
 * 校验修改笔记表单数据
 */
function editNoteValidate() {
  const form = document.editNoteForm;
  if (!form.title.value || form.title.value === '') {
    alert("笔记标题不能为空，请输入后再尝试！");
    document.editNoteForm.title.focus();
    return false;
  }

  return true;
}

/**
 * 修改笔记
 */
async function editNote() {
  // 获取表单数据
  const noteId = getNoteIdFromHref();
  const editNoteForm = document.editNoteForm;
  const returnNoteId = await updateNote(
    noteId,
    editNoteForm.title.value,
    editNoteForm.content.value,
  );

  return returnNoteId;
};

// 为创建笔记表单添加提交事件，先校验参数，校验通过则创建笔记
$("#editNote").on('click', async function () {
  const isValidParams = editNoteValidate();
  if (!isValidParams) return;

  const noteId = await editNote();
  if (noteId) {
    alert('修改成功');
    window.location.href = `/note.html?note_id=${noteId}`;
  }

  return false;
});
