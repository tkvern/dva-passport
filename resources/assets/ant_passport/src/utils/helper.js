export function getTaskStatus(status) {
  if (status == '1') {
    return { 'status': "default", 'text':"等待中" };
  } else if (status == '2') {
    return { 'status': "processing", 'text':"运行中" };
  } else if (status == '3') {
    return { 'status': "success", 'text':"完成" };
  } else if (status == '4') {
    return { 'status': "error", 'text':"失败" };
  } else if (status == '5'){
    return { 'status': "warning", 'text':"未知" };
  } else {
    return { 'status': "warning", 'text':"未知" };
  }
}

export function getProcessStatus(status) {
  if (status == '1') {
    return { 'status': "normal" };
  } else if (status == '2') {
    return { 'status': "active" };
  } else if (status == '3') {
    return { 'status': "success" };
  } else if (status == '4') {
    return { 'status': "exception" };
  } else if (status == '5'){
    return { 'status': "normal" };
  } else {
    return { 'status': "normal" };
  }
}