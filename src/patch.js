import { Element, render, setAttr } from "./element";

let allPatches, index = 0

function patch(node, patches) {
    allPatches = patches

    walk(node)
}

function walk(node) {
    let current = allPatches[index++]
    let childNodes = node.childNodes

    childNodes.forEach(childNode => walk(childNode))

    if(current) {
        doPatch(node, current)
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch(patch.type) {
            case 'REMOVE':
                node.parentNode.removeChild(node)
                break
            case 'TEXT':
                node.textContent = patch.text
                break
            case 'ATTR':
                for(let key in patch.attr) {
                    let value = patch.attr[key]
                    if(value) {
                        setAttr(node, key, value)
                    }else {
                        node.removeAttribute(key)
                    }
                }
                break
            case 'REPLACE':
                let newNode = patch.newNode instanceof Element ? render(patch.newNode) : document.createTextNode(patch.newNode)
                node.parentNode.replaceChild(newNode, node)
                break
            default:
                break
        }
    })
}

export default patch