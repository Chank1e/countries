<template>
  <div>
    <Header></Header>
    <div class="ui main text container">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/static/header';
import Footer from './components/static/footer';
export default {
  components:{
    Header,
    Footer
  },
  name: 'App'
}
</script>

<style>
  .main{
    margin-top:75px !important;
    margin-bottom:30px !important;
  }
</style>
