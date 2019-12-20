export function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function htmlToElement(html) {
  const template = document.createElement('template')
  template.innerHTML = html
  return template.content.firstElementChild
}

export function element(strings, ...values) {
  const htmlString = strings.reduce((result, str, i) => {
    const val = values[i - 1]
    if(typeof val === 'string') {
      return result + escapeSpecialChars(val) + str;
    } else {
      return result + String(val) + str;
    }
  });
  return htmlToElement(htmlString);
}

export function render(bodyElement, containerElement) {
  containerElement.innerHTML = ''
  containerElement.appendChild(bodyElement)
}
