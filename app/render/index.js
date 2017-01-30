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

jsPlumb.ready(() => {


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
