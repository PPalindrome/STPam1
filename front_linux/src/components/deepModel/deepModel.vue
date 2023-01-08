<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div style="margin: 0% 5%;width: 90%">
      <el-form  ref="modelParaRef" :model="paraForm" style="margin: 5% 5%;width: 90%" label-width="120px">
        <h2>时空过程深度学习模型发布</h2>
        <el-row>
          <el-upload
              ref="modelUploadRef"
              action="http://45.63.124.81:8081/files/upload/model"
              :before-upload="beforeUploadModel"
              :on-success="fileUploadSuccess"
              :on-remove="handleRemoveModel"
              multiple
          >
            <template #trigger>
              <el-button type="primary">选择文件并上传&#8194;<el-icon><UploadFilled/></el-icon></el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">请上传python文件，文件大小不超过10MB!</div>
            </template>
          </el-upload>
          <el-col span="12">
            <el-form-item label="或选择已有模型:" prop="hModel">
              <el-select placeholder="请选择已有模型" v-model="paraForm.hModel">
                <el-option v-for="m in Hmodel" :label="m.modelName" :value="m.modelName" @click="selectExistModels(m.modelName)"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <h2>时空过程深度学习模型参数设置</h2>
        <el-form-item v-for="(v,i) in formItems" :label="v.name" :prop="paraArray[i]">
          <el-input :placeholder="v.info" v-model="paraForm[paraArray[i]]"/>
        </el-form-item>

        <h2>数据集选择</h2>
        <el-table
            ref="multipleTableRef"
            :data="tableData"
            style="width: 100%"
            height="150px"
            @selection-change="handleSelectionChange"
            :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column  type="selection" width="55" />
          <el-table-column prop="date" label="数据集日期" width="120" sortable >
            <template #default="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" property="name" label="数据集类型" width="120" />
          <el-table-column prop="address" property="address" label="数据集大小" show-overflow-tooltip />
        </el-table>

        <div style="margin-left: 60%;margin-top: 5%">
          <el-button type="success" @click="onSubmit">确定</el-button>
          <el-button type="danger" @click="resetForm(modelParaRef)">重置</el-button>
        </div>

        <div style="margin-left: 60%;margin-top: 5%">
          <el-button type="primary" @click="downloadFile">下载文件&#8194;<el-icon><download/></el-icon></el-button>
        </div>

        <div style="margin-left: 60%;margin-top: 5%">
          <el-button type="primary" @click="hdfsCreateFile">创建hdfs文件夹&#8194;<el-icon><download/></el-icon></el-button>
        </div>

      </el-form>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="margin: 0% 5%">

        <div>
          <el-descriptions
              class="margin-top"
              title="模型基本信息"
              :column="3"
              :size="size"
              border
          >
            <template #extra>
              <el-button type="primary">模型解析</el-button>
            </template>
            <el-descriptions-item v-for="v in modelInfo" :key="v.info" :item="v">
              <template #label>{{ v.title }}</template>
              {{ v.info }}
            </el-descriptions-item>
          </el-descriptions>
          <h2>WPS发布模型服务</h2>
          <el-button type="primary" style="margin: 5% 5%">发布服务</el-button>
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import type { ElTable } from 'element-plus'
import {reactive, ref} from 'vue'
import {
  Download,
  UploadFilled,
} from '@element-plus/icons-vue'
import type {UploadInstance} from 'element-plus'
import services from "../../utils/request.js"
import {ElMessage, ElMessageBox, FormInstance} from "element-plus";

// 数据集内容
interface User {
  date: string
  name: string
  address: string
}
const tableData: User[] = [
  {
    date: '2021-05-03',
    name: '水文',
    address: '20GB',
  },
  {
    date: '2021-05-02',
    name: '遥感',
    address: '120GB',
  },
  {
    date: '2021-05-04',
    name: '图谱',
    address: '90GB',
  },
]
const formSize = ref('default')
// 数据集定义 选择
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

//模型参数表单
const paraForm=reactive({
  layerNum:'3',
  learningRate:'0.0001',
  maxIteration:'150',
  name:'',
  hModel:'',
})

// 映射
const paraArray=['layerNum','learningRate','maxIteration','name','hModel']
// 模型默认参数
const formItems = reactive([
  {name: '单元层层数', info: '',val:'',},
  {name: '学习率', info: '',val:'',},
  {name: '最大迭代次数', info: '',val:'',},
])
// 已有模型
const Hmodel=reactive([
  {modelName:'STP-Net'},
  {modelName:'PredRNN++'} ,
  {modelName:'STMGCN'}
])

// 模型信息
const modelInfo = reactive([
  {title: '模型名称', info: 'STP-Net'},
  {title: '模型版本', info: 'V1.0.0'},
  {title: '数据种类', info: '水位、遥感'},
  {title: '应用场景', info: '洪涝灾害'},

  {title: '计算函数', info: 'Fusion Module'},
  {title: '模型稳健性实现函数', info: 'null'},
  {title: '模型自动优化实现函数', info: 'null'},
  {title: '服务器地址', info: 'http://127.0.0.1:8070/home'},
])

const size = ref('')
const modelUploadRef = ref<FormInstance>()
const modelParaRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
//当前文件名
let mName=""
//上传文件（1）或者选择已有文件（2），0表示什么都没选
let flag=0
//文件上传
const showSuccess=(message)=>{
  ElMessage({
    showClose: true,
    message: message,
    type: 'success',
  })
}
const showError=(message)=>{
  ElMessage({
    showClose: true,
    message: message,
    type: 'error',
  })
}
const beforeUploadModel=(rawFile)=>{
  if(!rawFile.name.endsWith('.py')){
    showError("模型文件不符合格式")
    return false
  }else if(rawFile.size/1024/1024/8>10){
    showError("模型文件过大，无法上传")
    return false
  }
  mName=rawFile.name
  return true
}
const fileUploadSuccess=(res)=>{
  if(res.code==200){
    services.post('/hdfs/put',mName).then(res=>{
      showSuccess(res.message)
    })
  }else{
    showError(res.message)
  }
}
const handleRemoveModel= (uploadFile) => {
  // if(uploadFile.status==='success') {
    services.post('/files/delete/model',uploadFile.name).then(res =>{
      console.log(res)
    })
  // }
}

//选择已有模型
const selectExistModels=(modelName)=>{
  mName=modelName+".py"
}
//下载文件
const downloadFile=()=>{
  services.get('/hdfs/download/'+mName).then((res)=>{
      console.log('文件下载成功')
      const blob=new Blob([res.data])
      if('download' in document.createElement('a')){
        const link=document.createElement('a')
        link.download=mName
        link.style.display='none'
        link.href=URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      }else{
        navigator.msSaveBlob(blob,mName)
      }
  }).catch((res)=>{
        console.log('文件下载失败')
  })
}
//上传文件给分布式计算
import {useRouter} from 'vue-router'
const router=useRouter();
const onSubmit = () => {
  window.localStorage.setItem('mName', mName)
  router.push('/distributedComputing/computing')
}

//重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
//创建hdfs文件夹
const hdfsCreateFile=()=>{
  services.post('/hdfs/file',"phw").then(res=>{
      
  })
}

</script>

<style scoped>

</style>