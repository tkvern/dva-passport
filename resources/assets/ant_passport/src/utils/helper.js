export function getUserStatus(status) {
  if (status === 1) {
    return { status: 'success', text: '正常' };
  } else {
    return { status: 'default', text: '禁用' };
  }
}

export function checkIsAdmin(status) {
  if (status === 1) {
    return { status: 'success', text: '是' };
  } else {
    return { status: 'default', text: '否' };
  }
}

export function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  const arr = document.cookie.match(reg);
  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

export function checkUser() {

}
