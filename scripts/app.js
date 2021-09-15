new Vue({
  el: '#game',

  data: {
    visible1: true,
    visible2: false,
    visible3: false,
    visible4: false,
    visible5: false
  },  

  methods: {
    showControlPanel(){
      this.visible1 = this.visible2 = !this.visible1
      this.visible2 = !this.visible1
    },

    quitGame(){
      this.visible1 = true
      this.visible2 = this.visible3 = this.visible4 = this.visible5 = !this.visible1      
    }
  }
})