<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>


      <el-container>
<!--        左侧导航-->
        <NavMenu />

        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref} from "vue";
import NavMenu from "../components/NavMenu.vue";
import Header from "../components/header.vue"

</script>

<style scoped>

</style>
