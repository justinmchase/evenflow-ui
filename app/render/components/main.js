import Vue from 'vue'
import { file } from '../utils'

function MainModel () {
  this.message = 'hi!'
  this.error = null
  this.scene = null
}

export default Vue.component('app-main', (resolve) => {
  file('render/components/main.html', (err, result) => {
    if (err) return console.error(err)
    resolve({
      template: result,
      data: () => new MainModel()
      // methods: {
      //   sceneSwitch
      // },
      // components: {
      //   defaultScene,
      //   pageScene
      // },
      // events: {
      //   'hook:ready': ready,
      //   'scene-switch': sceneSwitch
      // }
    })
  })
})
