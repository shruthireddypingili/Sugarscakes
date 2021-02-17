export function uuidV4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function removeNullUnDefine(obj) {
  return JSON.parse(JSON.stringify(obj, replaceUndefinedOrNull));
}

function replaceUndefinedOrNull(key, value) {
  if (value === null || value === undefined) {
    return undefined;
  }
  return value;
}
