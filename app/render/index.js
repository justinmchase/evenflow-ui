import jsPlumb from 'jsplumb'
import Joi from 'joi'
import Vue from 'vue'
import main from './components/main'

let endpointOptions = {
  isSource: true,
  isTarget: true
}

function getEndpointY (index, maxRows, actualRows) {
  let pi = index          // The index of the row to add an endpoint to
  let tr = maxRows + 1    // Total rows including the title
  let pr = maxRows        // The number of max properties
  let ar = actualRows     // The number of rows for this property group
  let rh = 1 / tr         // The height of a row

  let th = rh * 1         // Title height
  let ph = rh * pr        // Height of Properties area
  let ah = rh * ar        // Height of this properties group

  let pc = th + (ph / 2)  // Properties area center
  let at = pc - (ah / 2)  // Top of this properties group
  let rt = at + (pi * rh) // Top of this property
  let rc = rt + (rh / 2)  // Center of this property

  return rc
}

function renderBlock (component) {
  let block = document.createElement('div')
  let border = document.createElement('div')
  let title = document.createElement('div')
  let name = document.createElement('span')
  let properties = document.createElement('div')
  let inputs = document.createElement('ul')
  let outputs = document.createElement('ul')

  border.classList.add('block-border')
  block.appendChild(border)
  name.innerText = component.name
  title.appendChild(name)
  title.classList.add('title')
  properties.classList.add('properties')
  inputs.classList.add('inputs')
  outputs.classList.add('outputs')
  block.appendChild(title)
  block.appendChild(properties)
  properties.appendChild(inputs)
  properties.appendChild(outputs)

  Object.keys(component.inputs).map(key => {
    let li = document.createElement('li')
    li.classList.add('input', 'property')
    li.innerText = key
    inputs.appendChild(li)
  })

  Object.keys(component.outputs).map(key => {
    let li = document.createElement('li')
    li.classList.add('output', 'property')
    li.innerText = key
    outputs.appendChild(li)
  })

  let rowHeight = 35
  let inputRows = Object.keys(component.inputs).length
  let outputRows = Object.keys(component.outputs).length
  let propertyRows = Math.max(inputRows, outputRows)
  let rows = propertyRows + 1

  let titleHeight = rowHeight
  let propertiesHeight = propertyRows * rowHeight
  let blockHeight = rowHeight + propertiesHeight

  title.style.height = `${titleHeight}px`
  properties.style.height = `${propertiesHeight}px`

  block.style.height = `${blockHeight}px`
  block.classList.add('w')

  setTimeout(() => {
    let y0 = getEndpointY(0, propertyRows, inputRows)
    let y1 = getEndpointY(1, propertyRows, inputRows)
    let y2 = getEndpointY(2, propertyRows, inputRows)
    let y3 = getEndpointY(3, propertyRows, inputRows)
    jsPlumb.addEndpoint(block, {
      endpoint: [ 'Rectangle', { width: 15, height: 15 } ],
      anchor: [0, y0]
    })
    jsPlumb.addEndpoint(block, {
      endpoint: [ 'Rectangle', { width: 15, height: 15 } ],
      anchor: [0, y1]
    })
    jsPlumb.addEndpoint(block, {
      endpoint: [ 'Rectangle', { width: 15, height: 15 } ],
      anchor: [0, y2]
    })
    jsPlumb.addEndpoint(block, {
      endpoint: [ 'Rectangle', { width: 15, height: 15 } ],
      anchor: [0, y3]
    })

    console.log(y0, y1, y2, y3)
  })


  return block
}

jsPlumb.ready(() => {
  // let example = {
  //   name: 'Example',
  //   inputs: {
  //     left: Joi.any().required(),
  //     right: Joi.any().required(),
  //     third: Joi.any().required(),
  //     fourth: Joi.any().required()
  //   },
  //   outputs: {
  //     value: Joi.any().required()
  //   }
  // }

  // let block = renderBlock(example)
  // let container = document.querySelector('.container')
  // container.appendChild(block)
  // jsPlumb.draggable(block)

  // var e0 = jsPlumb.addEndpoint('one', {
  //   endpoint: [ 'Rectangle', { width: 15, height: 15 } ],
  //   anchor: [1, 0.75]
  // }, endpointOptions)

  // var e1 = jsPlumb.addEndpoint('two', {
  //   isSource: true,
  //   isTarget: true,
  //   endpoint: [ 'Rectangle', { width: 15, height: 15 } ],
  //   anchor: 'Left'
  // },
  // endpointOptions)

  // var e2 = jsPlumb.addEndpoint('one', {
  //   endpoint: [ 'Rectangle', { width: 15, height: 15 } ],
  //   anchor: [1, 0.25]
  // },
  // endpointOptions)

  // jsPlumb.bind('connection', c => {
  // })

  // jsPlumb.connect({
  //   source: e0,
  //   target: e1
  // })
})

window.addEventListener('DOMContentLoaded', () => {
  let app = Vue.component('app', {
    template: '<app-main></app-main>',
    components: {
      'app-main': main
    }
  })

  window.$vm = new Vue({
    el: 'app',
    components: {
      app
    }
  })
})
