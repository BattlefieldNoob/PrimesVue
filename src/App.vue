<template>
   <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
   <myheader></myheader>
  <main class="mdl-layout__content mdl-color--grey-100">
   <div class="col-md-2"></div>
   <div class="col-md-8">
      <div id="app">
        <myimage></myimage>
      </div>
   </div>
   <div class="col-md-2"></div>
  </main>
 </div>
</template>

<script>
import myimage from './components/PrimesImage.vue'
import Myheader from './components/Header.vue'



export default {
  components: {
    myimage,
    Myheader
  },
  Data(){
    return{}
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