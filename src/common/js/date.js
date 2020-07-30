export function datetransfer (ms) {
  let now = new Date(ms)
  return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
}
export function datetransfer2 (ms) {
  let now = new Date(ms)
  return now.getFullYear() + '-' + (now.getMonth() + 1)
}
