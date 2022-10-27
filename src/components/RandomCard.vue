<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          TOS Spy x Family Simulator
        </v-card-title>
        <v-card-title>
          <v-row>
            <v-col cols="12">
              ค่าเสียหาย: {{ diamonds }} 💎
            </v-col>
            <v-col cols="6">
              Hallowed Coins: {{ coins }}
            </v-col>
            <v-col cols="6">
              ใช้ไป {{ redeemedCoins }}
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-title>
          <v-row>
            <v-col cols="4">
              Loid : <span v-if="haveLoid">✅</span><span v-else>❌</span>
            </v-col>
            <v-col cols="4">
              Yor : <span v-if="haveYor">✅</span><span v-else>❌</span>
            </v-col>
            <v-col cols="4">
              Anya : <span v-if="haveAnya">✅</span><span v-else>❌</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-btn @click="random()">สุ่ม 1</v-btn>
          <v-btn @click="random10()">สุ่ม 10</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn :disabled="haveLoid" @click="findPerson('Loid')">กดจนกว่า Loid จะออก</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn :disabled="haveYor" @click="findPerson('Yor')">กดจนกว่า Yor จะออก</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn :disabled="haveAnya" @click="findPerson('Anya')">กดจนกว่า Anya จะออก</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-container>
        <v-row>
          <v-col cols="3" v-for="(card, i) in myCardList" :key="i">
            <span :style="['Loid', 'Yor', 'Anya'].includes(card) ? 'color: red; font-weight: bold;' : ''">{{ card }}</span>
          </v-col>
        </v-row>
      </v-container>

    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: "RandomCard",
  data: () => ({
    baseCardList: [
      ...(new Array(133)).fill('Loid'),
      ...(new Array(133)).fill('Yor'),
      ...(new Array(134)).fill('Anya'),
      ...(new Array(1000)).fill('Old Rare'),
      ...(new Array(8600)).fill('trash'),
    ],
    myCardList: [],
    diamonds: 0,
    coins: 100,
    redeemedCoins: 0,
    intervalId: null,
  }),
  created() {
    this.shuffle(this.baseCardList)
    this.shuffle(this.baseCardList)
    this.shuffle(this.baseCardList)
  },
  computed: {
    haveLoid () {
      return this.myCardList.includes('Loid')
    },
    haveYor () {
      return this.myCardList.includes('Yor')
    },
    haveAnya () {
      return this.myCardList.includes('Anya')
    },
  },
  methods: {
    shuffle(array) {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    },
    random(min = 0, max = this.baseCardList.length) {
      const rand = Math.floor(Math.random() * (max - min + 1) + min)
      const card = this.baseCardList[rand]
      this.myCardList.push(card)
      this.diamonds += 5
      this.coins += 10
      if (this.myCardList.length % 10 === 0) {
        this.coins += 30
      }
    },
    random10 () {
      for (let i = 0; i < 10; i++) {
        this.random()
      }
    },
    findPerson(person) {
      this.intervalId = setInterval(() => {
        if (this.coins >= this.redeemedCoins && this.coins - this.redeemedCoins >= 250) {
          this.redeemedCoins += 250
          this.myCardList.push(person)
        } else {
          this.random()
        }
        if (this.myCardList[this.myCardList.length - 1] === person) {
          clearInterval(this.intervalId)
          this.intervalId = null
        }
      }, 250, this)
    }
  }
}
</script>

<style scoped>

</style>
