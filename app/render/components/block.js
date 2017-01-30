import Vue from 'vue'
import jsPlumb from 'jsplumb'
import { file } from '../utils'

function BlockModel () {
  this.inputs = []
  this.outputs = []

  this.blockHeight = 105
  this.titleHeight = 35
  this.propertiesHeight = 70
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

function mounted () {
  console.log(arguments)
  console.log(this)
  console.log('block:', this.block)

  let i = 0
  let ir = Object.keys(this.block.inputs).length
  let or = Object.keys(this.block.outputs).length
  let pr = Math.max(ir, or)
  let rh = 35
  this.titleHeight = rh
  this.propertiesHeight = pr * rh
  this.blockHeight = rh + this.propertiesHeight
  this.$nextTick(() => {
    Object.keys(this.block.inputs).map(key => {
      let y = getEndpointY(i++, pr, ir)
      jsPlumb.addEndpoint(this.$el, {
        endpoint: [ 'Rectangle', { width: 15, height: 15 } ],
        anchor: [0, y]
      })
      this.inputs.push(key)
    })

    i = 0
    Object.keys(this.block.outputs).map(key => {
      let y = getEndpointY(i++, pr, or)
      jsPlumb.addEndpoint(this.$el, {
        endpoint: [ 'Rectangle', { width: 15, height: 15 } ],
        anchor: [1, y]
      })
      this.outputs.push(key)
    })
  })

  jsPlumb.draggable(this.$el)
}


export default Vue.component('app-block', (resolve) => {
  file('render/components/block.html', (err, result) => {
    if (err) return console.error(err)
    resolve({
      template: result,
      data: () => new BlockModel(),
      props: ['block'],
      // components: {
      //   'app-canvas': canvas
      // }
      mounted
    })
  })
})
