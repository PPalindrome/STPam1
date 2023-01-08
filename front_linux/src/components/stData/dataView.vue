<template>
  <div>
    <h2>多源数据信息上传</h2>
    <el-upload
        ref="uploadRef"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary">选择文件&#8194;<el-icon><Select/></el-icon>
        </el-button>
      </template>

      <el-button class="ml-3" type="success" @click="submitUpload" style="margin-left: 3%">上传至服务器&#8194;
        <el-icon>
          <UploadFilled/>
        </el-icon>
      </el-button>

      <el-button type="primary" style="margin-left: 3%">解析查看</el-button>

      <template #tip>
        <div class="el-upload__tip">文件大小不得超过20GB!</div>
      </template>
    </el-upload>
  </div>
  <el-tabs type="border-card" v-model="activeName" class="demo-tabs" @tab-click="handleClick" tab-position="top" >
    <el-tab-pane v-for="t in dataType" :key="t" :label="t.tabName">

      <el-form :model="form" label-width="120px" style="width:60%;margin: 0% 0%">
        <el-form-item label="关键字" placeholder="请输入关键字">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="地点">
          <el-select v-model="form.region" placeholder="请选择数据地点">
            <el-option v-for="o in placeItem" :label="o" :value="o"/>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="Start date"
              end-placeholder="End date"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>


      <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 80%;margin: 1% 5%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column property="time" label="日期" sortable></el-table-column>
        <el-table-column property="level" label="水位" width="120"/>
        <el-table-column property="rise" label="水势" show-overflow-tooltip/>
        <el-table-column property="up2down" label="比昨日涨落" show-overflow-tooltip/>
        <el-table-column property="flow" label="流量" show-overflow-tooltip/>
        <el-table-column property="fortification" label="设防水位" show-overflow-tooltip/>
        <el-table-column property="warning" label="警戒水位" show-overflow-tooltip/>
        <el-table-column property="guarantee" label="保证水位" show-overflow-tooltip/>

      </el-table>


      <div style="margin: 0% 5%">
        <el-pagination
            :page-size="20"
            :pager-count="7"
            layout="prev, pager, next"
            :total="1000"
            background
        />
        <div style="margin-top: 0%">
          <el-button @click="toggleSelection([tableData[1], tableData[2]])"
          >导出数据
          </el-button
          >
          <el-button @click="toggleSelection()">清空选择</el-button>
        </div>
      </div>
    </el-tab-pane>
    <br>
  </el-tabs>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import type {ElTable} from 'element-plus'
import type {TabsPaneContext} from 'element-plus'
import {
  UploadFilled,
  Select,
} from '@element-plus/icons-vue'
import type {UploadInstance} from 'element-plus'

const uploadRef = ref<UploadInstance>()
const submitUpload = () => {
  uploadRef.value!.submit()
}

const dataType = reactive([
  {tabName: '文本',},
  {tabName: '图像',},
  {tabName: '图谱',},
  {tabName: '序列',},
  {tabName: '遥感',},
  {tabName: '数值',},
])

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
//选择地点
const placeItem = reactive([
  '长江-寸滩',
  '长江-武隆',
  '长江-宜昌',
  '长江-枝城', '长江-三峡水库',
  '洞庭湖-城陵矶',
  '鄱阳湖-湖口',
  '湘江-湘潭',
  '资水-桃江',
  '沅水-桃源',
  '澧水-石门',
  '松滋河-新江口'])
//选择时间
const value1 = ref([
  new Date(2016, 10, 10, 10, 10),
  new Date(2021, 10, 11, 10, 10),
])

interface User {
  time: string
  level: number
  rise: string
  up2down: number
  flow: number
  fortification: number
  warning: number
  guarantee: number
}

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
})
const onSubmit = () => {
  console.log('submit!')
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData: User[] = [
  {
    time: '2017/1/17 7:00',
    level: 50.54,
    rise: '→',
    up2down: 0,
    flow: 0,
    fortification: 56.5,
    warning: 57.5,
    guarantee: 59.3,
  },
  {
    time: '2017/1/17 8:00',
    level: 50.54,
    rise: '→',
    up2down: 0,
    flow: 0,
    fortification: 56.5,
    warning: 57.5,
    guarantee: 59.3,
  }, {
    time: '2017/1/17 9:00',
    level: 50.54,
    rise: '→',
    up2down: 0,
    flow: 0,
    fortification: 56.5,
    warning: 57.5,
    guarantee: 59.3,
  }, {
    time: '2017/1/17 10:00',
    level: 50.54,
    rise: '→',
    up2down: 0,
    flow: 0,
    fortification: 56.5,
    warning: 57.5,
    guarantee: 59.3,
  }, {
    time: '2017/1/17 11:00',
    level: 50.54,
    rise: '→',
    up2down: 0.01,
    flow: 0,
    fortification: 56.5,
    warning: 57.5,
    guarantee: 59.3,
  }, {
    time: '2017/1/17 12:00',
    level: 50.54,
    rise: '→',
    up2down: 0.01,
    flow: 0,
    fortification: 56.5,
    warning: 57.5,
    guarantee: 59.3,
  }, {
    time: '2017/1/17 13:00',
    level: 50.54,
    rise: '→',
    up2down: 0.01,
    flow: 0,
    fortification: 56.5,
    warning: 57.5,
    guarantee: 59.3,
  },
]

</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.block:last-child {
  border-right: none;
}

.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>