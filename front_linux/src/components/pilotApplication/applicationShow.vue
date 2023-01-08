<template>
  <el-row gutter="20">
    <el-col :span="12">
      <div>
        <h2 style="text-align: center">时空模型产品信息</h2>
        <br>
        <el-table :data="tableData" style="width: 100%" max-height="400">
          <el-table-column fixed prop="date" label="模型日期" width="100" />
          <el-table-column prop="name" label="模型名称" width="120" />
          <el-table-column prop="state" label="模型状态" width="120" />
          <el-table-column prop="version" label="模型版本" width="120" />
          <el-table-column prop="size" label="模型大小" width="120" />
          <el-table-column prop="ability" label="模型功能" width="120" />
          <el-table-column fixed="right" label="操作" width="90">
            <template #default="scope">
              <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="deleteRow(scope.$index)"
              >
                显示详情
              </el-button>
              <br>
              <el-button type="success" size="small">下载产品</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="mt-4" style="width: 100%" @click="onAddItem"
        >显示全部</el-button>
      </div>
      <div class="demo-image__placeholder">
        <div class="block">
        <span style="text-align: center">
          <div>
            <h3>时空过程模型结构</h3>
            <br>
          </div></span>
          <el-image :src="src">
            <template #placeholder>
              <div class="image-slot">加载中<span class="dot">...</span></div>
            </template>
          </el-image>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <h3 style="text-align: center">产品详细信息</h3>
      <div  style="margin: 5% 0%;width: 100%;height: 100%;text-align: center">
        <el-input type='textarea' @input='change($event)' v-model="inputResult" :autosize="{minRows:30,maxRows:30}" readonly />
      </div>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
const src =
    'https://img-blog.csdnimg.cn/77c982c53b3c4b3e83c46ea2b2bc237a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAeXVhbmthbmdf,size_20,color_FFFFFF,t_70,g_se,x_16'

import { ref } from 'vue'
import dayjs from 'dayjs'

const now = new Date()

const tableData = ref([
  {
    date: '2022-05-01',
    name: 'PredRNN++',
    state: '完成',
    version: '1.0.0',
    size: '300KB',
    ability: '时空预测',
  },
  {
    date: '2022-05-01',
    name: 'PredRNN++',
    state: '完成',
    version: '1.0.0',
    size: '300KB',
    ability: '时空预测',
  },
  {
    date: '2022-05-01',
    name: 'PredRNN++',
    state: '完成',
    version: '1.0.0',
    size: '300KB',
    ability: '时空预测',
  },

])

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'STPNet',
    state: '完成',
    version: '1.0.0',
    size: '300KB',
    author: 'tx',
    ability:'时空预测',
  })
}
</script>

<style scoped>
.demo-image__placeholder .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__placeholder .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__placeholder .el-image {
  padding: 0 0px;
  max-width: 700px;
  max-height: 600px;
}

.demo-image__placeholder .dot {
  animation: dot 2s infinite steps(3, start);
  overflow: hidden;
}
</style>
