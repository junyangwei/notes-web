import { getAllNotes } from './api.js';
import { loadBaseBar } from './common.js';


// 加载公共的顶部导航栏
loadBaseBar();

// 加载笔记列表
setNotesTest();

/**
 * 设置笔记列表（使用字符串加innerHTML方法示例）
 */
async function setNotes() {
  // 获取全部的笔记列表
  const notes = await getAllNotes();

  let ulContent = '<ul>';

  // 当没有任何信息时，展示空提示
  if (!(notes && notes.length)) {
    ulContent += `<li>没有任何笔记</li>`;
    ulContent += '</ul>';

    document.getElementById("notes").innerHTML = ulContent;
    return;
  }

  // 将笔记信息添加到无序列表中
  for (const item of notes) {
    ulContent += `<li><a href="note.html?note_id=${item.id}">${item.title}</a></li>`;
  }

  ulContent += '</ul>';
  document.getElementById("notes").innerHTML = ulContent;
};

/**
 * 设置笔记列表（使用创建节点的方式示例，createElement appendChild
 */
async function setNotesTest() {
  // 获取全部的笔记列表
  const notes = await getAllNotes();

  let newUl = document.createElement("ul");

  // 当没有任何信息时，展示空提示
  if (!(notes && notes.length)) {
    const newLi = document.createElement("li");
    const liText = document.createTextNode("No any notes.");
    newLi.appendChild(liText);
    newUl.appendChild(newLi);

    document.getElementById("notes").appendChild(newUl);
    return;
  }

  // 将笔记信息添加到无序列表中
  for (const item of notes) {
    const newLi = document.createElement("li");
    const jumpUrl = document.createElement("a");
    jumpUrl.href = `note.html?note_id=${item.id}`;
    const jumpUrlDetail = document.createTextNode(item.title);
    jumpUrl.appendChild(jumpUrlDetail);
    newLi.appendChild(jumpUrl);
    newUl.appendChild(newLi);
  }

  document.getElementById("notes").appendChild(newUl);
};
