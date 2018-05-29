<template>
  <div class="ui fixed inverted menu">
    <div class="ui container">
      <a href="#" class="item" @click="goTo('/')">Home</a>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      goTo:function(path){
        this.$router.push(path)
      }
    }
  }

</script>

<style>


</style>
