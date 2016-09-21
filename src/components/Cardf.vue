<template>
<div class="demo-card-wide mdl-card mdl-shadow--3dp center-block">
      <img :src="image">
</div>
</template>

<script>
export default {
  props:["image"]
}
</script>

<style>
.mdl-card{
  width:100%;
  max-width: 300px;
  min-height:0px
}

img{
  height:200px;
  max-width:100%;
  border:none;
  display:block;
  transition: transform .2s ease-in-out;
  background-size:cover;
}

img:hover {
  transform: scale(1.15);
}
</style>