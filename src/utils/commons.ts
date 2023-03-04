export function onlySpaces(str: string) {
  return str?.trim().length === 0;
}

export function convertToAsciiString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'));
}
