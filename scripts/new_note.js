import { getNoteById, createNote } from './api.js';

// 加载公共的顶部导航栏
$("#base").load("base.html");

/**
 * 校验创建笔记表单数据
 */
function createNoteValidate() {
  const form = document.createNoteForm;
  if (!form.title.value || form.title.value === '') {
    alert("笔记标题不能为空，请输入后再尝试！");
    document.createNoteForm.title.focus();
    return false;
  }

  return true;
}

/**
 * 创建笔记
 */
async function createNewNote() {
  // 获取表单数据
  const createNoteForm = document.createNoteForm;
  const newNoteId = await createNote(
    createNoteForm.title.value,
    createNoteForm.content.value,
  );

  return newNoteId;
};

// 为创建笔记表单添加提交事件，先校验参数，校验通过则创建笔记
// $("#createNoteForm").on('submit', async function () {
$("#createNote").on('click', async function () {
  const isValidParams = createNoteValidate();
  if (!isValidParams) return;

  const newNoteId = await createNewNote();
  if (newNoteId) {
    window.location.href = `/note.html?note_id=${newNoteId}`;
  }

  return false;
});

// 不使用JQuery方法
// document.querySelector('button').addEventListener('submit', function() {});
