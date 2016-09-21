<template>
   <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Primes</span>
        <div class="mdl-layout-spacer"></div>
        <div class="header-cont">
        <mdl-slider :value.sync="primes" min="0" max="3000"></mdl-slider>
        <mdl-slider id="slider" :value.sync="primesMax" min="0" max="8000"></mdl-slider>
        <button v-on:click="getimage" type="button" class="btn btn-default">Get Image</button>
        <button v-on:click="getdoggo" type="button" class="btn btn-default">Get Doggo</button>
        </div>
      </div>
   </header>
</template>

<script>

export default {
  Data(){
    return{
      primes:0,
      primesMax:0
    }
  },
  methods:{
    getimage:function(){
        console.log("click")
        this.$parent.$emit("image",{type:"generated"})
    },
    getdoggo:function(){
        console.log("click")
        this.$parent.$emit("image",{type:"doggo"})
    }
  },
  created:function(){
      console.log("created!")
  }
}
</script>


<style>
.myslider{
  max-width: 50%;
}
.header-cont{
  display:flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
}
</style>