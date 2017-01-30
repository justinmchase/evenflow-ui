import Vue from 'vue'
import Joi from 'joi'
import { file } from '../utils'
import block from './block'

let example = {
  name: 'Example',
  inputs: {
    left: Joi.any().required(),
    right: Joi.any().required(),
    third: Joi.any().required(),
    fourth: Joi.any().required()
  },
  outputs: {
    value: Joi.any().required()
  }
}

function CanvasModel () {
  this.blocks = [example]
}

function ready () {
  // this.blocks.push(example)
}


export default Vue.component('app-canvas', (resolve) => {
  file('render/components/canvas.html', (err, result) => {
    if (err) return console.error(err)
    resolve({
      template: result,
      data: () => new CanvasModel(),
      // methods: {
      //   sceneSwitch
      // },
      components: {
        'app-block': block
      },
      events: {
        'hook:ready': ready
      }
    })
  })
})
