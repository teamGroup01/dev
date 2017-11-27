<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from 'views/layout/index.js'

export default {
  components: {
    AppMain,
    Navbar,
    Sidebar
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import 'src/styles/mixin.scss';
 .app-wrapper {
   @include clearfix;
   position: relative;
   height: 100%;
   width: 100%;
   .siderbar-container {
     transition: width .28s ease-out;
     width: 180px;
     position: fixed;
     top: 0;
     bottom: 0;
     left: 0;
     z-index: 2;
     overflow: hidden;
   }
   .main-container {
     min-height: 100%;
     transition: margin-left .28s ease-out;
     margin-left: 180px;
   }
 }
</style>