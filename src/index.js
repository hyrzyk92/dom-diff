import { createElement, render, renderDom } from './element';
import diff from './diff'
import patch from './patch'

let vnode = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item-1' }, ['张三']),
  createElement('li', { class: 'item-2' }, ['李四']),
  createElement('li', { class: 'item-3' }, ['王五']),
])

console.log(vnode)

let el = render(vnode)

console.log(el)

renderDom(el, document.getElementById('root'))

let newNode = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item', data: '8' }, ['张三爸爸']),
  createElement('li', { class: 'item' }, ['李四爸爸']),
])

let patches = diff(vnode, newNode)

console.log(patches)

patch(el, patches)