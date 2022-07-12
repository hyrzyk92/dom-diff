function diff(oldNode, newNode) {
    let patches = {}

    let index = 0

    walk(oldNode, newNode, index, patches)

    return patches
}

function walk(oldNode, newNode, index, patches) {
    let current = []

    if(oldNode && !newNode) {
        current.push({ type: 'REMOVE', index })
    }else if(isString(oldNode) && isString(newNode)) {
        if(oldNode !== newNode) {
            current.push({ type: 'TEXT', text: newNode })
        }
    }else if(oldNode.type === newNode.type) {
        let attr = diffAttr(oldNode.props, newNode.props)
        if(Object.keys(attr).length > 0) {
            current.push({ type: 'ATTR', attr })
        }

        diffChildren(oldNode.children, newNode.children, patches)
    }else {
        current.push({ type: 'REPLACE', newNode })
    }

    if(current.length) {
        patches[index] = current
    }
}

function isString(vnode) {
    return typeof vnode === 'string'
}

function diffAttr(oldAttr, newAttr) {
    let attr = {}

    for(let key in oldAttr) {
        if(oldAttr[key] !== newAttr[key]) {
            attr[key] = newAttr[key]
        }
    }

    for(let key in newAttr) {
        if(!oldAttr[key]) {
            attr[key] = newAttr[key]
        }
    }

    return attr
}

let num = 0

function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((oldChild, index) => {
        walk(oldChild, newChildren[index], ++num, patches)
    })
}

export default diff