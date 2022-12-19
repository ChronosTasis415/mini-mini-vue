import Dep from "./Dep";
import ComputedRef from './ComputedRef'


export function watchEffect(callback) {
  Dep.effectFn = callback;

  callback();

  Dep.effectFn = null;
}


export function watch(fn, cb) {
  // watch的过程就是将cb压入到依赖中，怎么触发依赖呢，就是第一个函数
  Dep.effectFn = cb;
  fn();

  Dep.effectFn = null;
}

export function computed(fn) {
  Dep.effectFn = fn;

  const result = fn();
  const computedRef = new ComputedRef(result);

  Object.defineProperty(fn, 'computedRef', {
    value: computedRef
  })

  Dep.effectFn = null;

  return computedRef
  // return result
}