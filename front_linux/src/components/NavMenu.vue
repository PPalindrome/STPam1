<template>
  <el-menu
      :default-active="$route.path"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      exact
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="width: 250px;min-height: calc(100vh - 50px);word-break: break-all;white-space: normal;"
      router
  >


    <NavItem v-for="v in items" :show="v.showItem" :key="v.url" :item="v" :baseurl="v.url" :flag="v.flag"/>
  </el-menu>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {
  Setting,Download,DataBoard,Flag,Edit,
  Cpu,
  DataAnalysis,
  Cloudy,
  LocationInformation,
  Histogram, Tickets,
  Switch, MostlyCloudy,MagicStick,User,Money,Share,SetUp
} from '@element-plus/icons-vue'
import NavItem from './NavItem.vue'


// onMounted(() => {
//   const ifUserHave=!(localStorage.getItem('name')=='游客')
//   console.log(typeof(ifUserHave))
// })
const ifUserHave=(localStorage.getItem('name')=='visitor')
const items = reactive([
  {
    title: '多源时空数据', url: '/dataAnalysis', flag: DataAnalysis,showItem:false,
    child: [
      {title: '数据查看', url: '/dataAnalysis/view', flag: Tickets,showItem:false,},
      {title: '数据分析', url: '/dataAnalysis/analysis', flag: Histogram,showItem:false,},
      {title: '数据预处理', url: '/dataAnalysis/pretreatment', flag: MagicStick,showItem:false,},
      {title: '数据共享', url: '/dataAnalysis/dataSharing', flag: Share,showItem:false,},
    ]
  },
  {title: '时空过程分析挖掘', url: '/deepModel', flag: Cpu,showItem: ifUserHave,},
  {
    title: '分布式计算', url: '/distributedComputing', flag: Cloudy,showItem: ifUserHave,
    child: [
      {title: '分布式计算', url: '/distributedComputing/computing', flag: MostlyCloudy,showItem:ifUserHave,},
      {title: '增量学习', url: '/distributedComputing/incremental', flag: Switch,showItem:ifUserHave,},
      {title: '在线编辑', url: '/distributedComputing/onlineFileEdit', flag: Edit,showItem:ifUserHave,}
    ]
  },
  {title: '产品示范', url: '/application', flag: Flag ,showItem: false,
    child: [
      {title: '示范应用', url: '/application/productApplication', flag: LocationInformation,showItem:false,},
      {title: '产品展示', url: '/application/applicationShow', flag: DataBoard,showItem:false,},
      {title: '产品下载', url: '/application/applicationDownload', flag: Download,showItem:false,},
    ]},
  {title: '设置', url: '/setting', flag: Setting,showItem: ifUserHave,
    child: [
      {title: '模型设置', url: '/setting/modelSetting', flag: Money,showItem:ifUserHave,},
      {title: '用户设置', url: '/setting/userSetting', flag: User,showItem:ifUserHave,},
      {title: '数据库适配', url: '/setting/databaseSetting', flag: SetUp,showItem:ifUserHave,},
    ]
  },
])


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


</script>

<style scoped>

</style>
