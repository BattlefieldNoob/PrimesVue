<template>
    <div>
      <div id="grid" class="row center-block">
          <ul>
            <li v-for="image in images" track-by=$index>
              <card :image="image"></card>
            </li>
          </ul>
      </div>
  </div>
</template>

<script>
import Vue from "vue"
import Card from './Cardf.vue'
export default {
   components: {
    Card
  },
  data () {
    return {
      images:[]
    }
  },
  methods:{
      getimage:function(data){
        /*$http.post('/genImage', {randMax:3000,max:8000}).then((data) => {
          this.images.push(data.body)
        },
        (err)=>{

        });//, errorCallback);*/
        if(data.type=="doggo"){
           $.get("/getdoggolink",function (data, err) {
              this.images.push(data)
            }.bind(this))
        }else{
            $.post("/genImage",{randMax:3000,max:8000},function (data, err) {
              this.images.push(data)
            }.bind(this))
        }
      }
  },
  ready:function(){
    this.$parent.$on("image",function(data){
      console.log("click event!")
      this.getimage(data)
    }.bind(this))
  }
}
</script>


<style>
ul
{
    list-style-type: none;
    padding:10px;
}
li{
    width: calc(50% - 4px);
    height: calc(50% - 4px);
    display: inline-block;
    padding:15px
}

@media screen and (min-width: 60em) {
  li {
    width: calc(25% - 6px);
    height: calc(25% - 6px);
  }
}
</style>