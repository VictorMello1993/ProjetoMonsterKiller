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
    width2: '100',
    logs: []
  },

  methods: {
    startGame() {
      this.visible1 = this.visible4 = this.visible5 = false
      this.visible2 = !this.visible1
      this.logs = []
      this.monsterLife = this.playerLife = 100
      this.width1 = '100%'
      this.width2 = '100%'
    },

    quitGame() {
      this.visible1 = true
      this.visible2 = this.visible3 = this.visible4 = this.visible5 = !this.visible1
      this.playerLife = this.monsterLife = 100
      this.width1 = '100%'
      this.width2 = '100%'
      this.logs = []
    },

    attack(special = false) {
      this.visible3 = true
      this.hit(7, 12, special, 'Jogador')
      this.hit(7, 12, special, 'Monstro')
    },

    hit(min, max, special, source) {
      const plus = special ? 5 : 0

      if (source === 'Monstro') {
        const monsterDamage = this.getRandom(min + 2, max + 2)

        this.playerLife = Math.max(this.playerLife - monsterDamage, 0)
        this.registerLog(`${source} atingiu jogador com ${monsterDamage}.`, 'monsterdamage')

        this.width1 = `${this.playerLife}%`
        
        this.showResults(this.playerLife, 'Jogador')
      }
      else {
        const playerDamage = this.getRandom(min + plus, max + plus)

        this.monsterLife = Math.max(this.monsterLife - playerDamage, 0)
        this.registerLog(`${source} atingiu monstro com ${playerDamage}.`, 'playerdamage')

        this.width2 = `${this.monsterLife}%`
        
        this.showResults(this.monsterLife, 'Monstro')
      }
    },

    getRandom(min, max) {
      const value = Math.random() * (max - min) + min
      return Math.trunc(value)
    },

    heal() {
      const lifeGain = this.getRandom(10, 15)
      const monsterDamage = this.getRandom(7, 12)

      this.playerLife = Math.min(this.playerLife + Math.abs(lifeGain - monsterDamage), 100)

      this.registerLog(`Jogador ganhou força de ${lifeGain}.`, 'playerdamage')
      this.registerLog(`Monstro atingiu jogador com ${monsterDamage}`, 'monsterdamage')

      this.width1 = `${this.playerLife}%`
    },

    registerLog(text, cls) {
      this.logs.unshift({ text, cls })
    },

    showResults(lifePoints, target){
      if(target === 'Monstro' && lifePoints === 0){
        this.visible4 = true
        this.visible1 = this.visible4
        this.visible2 = this.visible3 = this.visible5 = !this.visible1               
      }
      else if(target === 'Jogador' && lifePoints === 0){
        this.visible5 = true
        this.visible1 = this.visible5
        this.visible2 = this.visible3 = this.visible4 = !this.visible1        
      }
    }
  },
})