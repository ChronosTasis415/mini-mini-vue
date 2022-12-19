export default class Dep {
  static effectFn = null;

  constructor() {
    this.effectMap = new WeakMap()
  }

  collect(target, key) {
    const effectFn = Dep.effectFn;
    if (effectFn) {
      let depsMap = this.effectMap.get(target);
      if (!depsMap) {
        depsMap = new Map();

        this.effectMap.set(target, depsMap)
      }

      let deps = depsMap.get(key)
      if (!deps) {
        deps = new Set();
        depsMap.set(key, deps)
      }
      console.log(this.effectMap)
      deps.add(effectFn)
    }
  }

  notify(target, key, value, oldValue) {
    const depsMap = this.effectMap.get(target);

    if (!depsMap) return;

    const deps = depsMap.get(key)

    if (!deps) return;

    deps.forEach(dep => {
      const result = dep(value, oldValue);
      if (dep.computedRef) {
        dep.computedRef.value = result
      }
    })
  }
}