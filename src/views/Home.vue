<template>
  <div>
    <Header/>
    <NavigationBar/>
    <Content/>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import NavigationBar from '../components/NavigationBar.vue'
import Content from '../components/Content.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    NavigationBar,
    Content
  }
}
</script>