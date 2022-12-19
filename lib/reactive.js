import Dep from "./Dep";
const dep = new Dep();
export default function reactive(data) {
  return new Proxy(data, {
    get(target, key) {
      console.log('target', target)
      console.log('key', key)
      //collect
      const val = Reflect.get(target, key);
      dep.collect(target, key)
      return val !== null && typeof val === 'object' ? reactive(val) : val;
    },

    set(target, key, value) {
      const oldVal = Reflect.get(target, key);
      const result = Reflect.set(target, key, value);
      // notify
      dep.notify(target, key, value, oldVal)
      return result;
    }
  })
}