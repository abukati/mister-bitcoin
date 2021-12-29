
export const storageService = {
  save,
  load
}

function save(key, val) {
  localStorage[key] = JSON.stringify(val)
}

function load(key, val = null) {
  const value = localStorage[key] || val
  return JSON.parse(value)
}