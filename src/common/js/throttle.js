export default function throttle (fn, delay) {
  let timer = null
  return function () {
    let args = Array.prototype.slice.call(arguments)
    let _this = this
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(_this, args)
      }, delay)
    }
  }
}
