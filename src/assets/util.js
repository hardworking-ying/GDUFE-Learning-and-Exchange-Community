// 防抖
export function debounce(fn, delay=500) {
  var timer;
  return function(...args) {
    if(timer) {
      clearTimeout(timer);
    }
    const _this = this;
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delay)
  }
}

// 节流
export function throttle(fn, delay) {
  var flag = true;
  return function(...args) {
    if(!flag) return;
    flag = false;
    const _this = this;
    setTimeout(() => {
      fn.apply(_this, args);
      flag = true;
    }, delay)
  }
}

export function LinkTo(nextPath, type) {  
  if (this.$route.path != nextPath) {
    if( type == "replace" ){
      this.$router.replace(nextPath);
    }else {
      this.$router.push(nextPath);
    }
  }
}