export default {
   debounce = (function () {
        let timer = null;
        return function (func, wait) {
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                func.apply(this, arguments);
            }, wait)
        }
    }())
}