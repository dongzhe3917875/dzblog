// action 会收到 store 作为它的第一个参数
// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）
// 我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
// export default 只能有一个
export const incrementCounter = function({
  dispatch, state
}) {
  dispatch('INCREMENT', 1)
}
export const changeActive = function({
  dispatch, state
}, index) {
  dispatch('CHANGEACTIVE', index)
}
