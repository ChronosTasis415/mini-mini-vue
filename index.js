import { reactive, watchEffect, watch, computed } from './lib'

const state = reactive(
  {
    a: 1,
    b: {
      c: 2
    }
  }
)

const btn1 = document.querySelector("#btn-one")
const btn2 = document.querySelector("#btn-two")

// console.log(state.b.c)

// 自动收集依赖 页面加载先执行一次，get中收集起来
watchEffect(() => {
  console.log('watchEffect => state.a', state.b)
})

watchEffect(() => {
  console.log('watchEffect => state.b.c', state.b.c)
})

watch(() => state.a, (oldVal, newVal) => {
  console.log('old', oldVal);
  console.log('new', newVal)
})

const a = computed(() => state.a + state.b.c)

btn1.addEventListener('click', function() {
  state.a = 100;
  // console.log('btn1', state.a)
  console.log('computed => ', a)
})

btn2.addEventListener('click', function() {
  state.b.c = 200;
  console.log('btn2', state.b.c)
})