new Vue({
  el: '#game',

  data: {
    visible1: true,
    visible2: false,
    visible3: false,
    visible4: false,
    visible5: false,
    playerLife: 100,
    monsterLife: 100,
    width1: '100',
    width2: '100'    
  },  

  methods: {
    showControlPanel(){
      this.visible1 = this.visible2 = !this.visible1
      this.visible2 = !this.visible1      
    },

    quitGame(){
      this.visible1 = true
      this.visible2 = this.visible3 = this.visible4 = this.visible5 = !this.visible1
      this.playerLife = 100
      this.monsterLife = 100
      this.width1 = '100%'       
      this.width2 = '100%'       
    },

    attack(special = false){
      this.visible3 = true     
      this.hit(7, 12, special)       
    },
    
    hit(min, max, special){
      const plus = special ? 5 : 0
      const monsterDamage = this.getRandom(min + 2, max + 2)
      const playerDamage = this.getRandom(min + plus, max + plus)

      this.playerLife = Math.max(this.playerLife - monsterDamage, 0)
      this.monsterLife = Math.max(this.monsterLife - playerDamage, 0)

      this.width1 = `${this.playerLife}%`  
      this.width2 = `${this.monsterLife}%`    
    },

    getRandom(min, max){
      const value = Math.random() * (max - min) + min
      return Math.trunc(value)
    },    

    heal(){
      const lifeGain = this.getRandom(10, 15)      
      const monsterDamage = this.getRandom(7, 12)
      
      this.playerLife = Math.min(this.playerLife + Math.abs(lifeGain - monsterDamage), 100)
      
      this.width1 = `${this.playerLife}%`
    }
  }
})