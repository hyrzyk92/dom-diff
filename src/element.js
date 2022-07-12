class Element {
    constructor(type, props, children) {
        this.type = type
        this.props = props
        this.children = children
    }
}

function createElement(type, props, children) {
    return new Element(type, props, children)
}

function render(vnode) {
    const el = document.createElement(vnode.type)

    for(let key in vnode.props) {
        setAttr(el, key, vnode.props[key])
    }

    for(let child of vnode.children) {
        let childEl = child instanceof Element ? render(child) : document.createTextNode(child)

        el.appendChild(childEl)
    }

    return el
}

function setAttr(el, key, value) {
    el.setAttribute(key, value)
}

function renderDom(el,target) {
    target.appendChild(el)
}

export {
    Element,
    createElement,
    render,
    renderDom,
    setAttr
}