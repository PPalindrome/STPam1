<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-input v-model="filterText" placeholder="请输入关键词查找文件"/>

        <el-tree
            ref="treeRef"
            class="filter-tree"
            :data="fileTreeInfo.fileTree"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="getFileContent"
        />
      </el-col>

      <el-col :span="20">
        主题：
        <el-button @click="changeTheme($event)">黑暗主题（点击切换主题）</el-button>
        &ensp;编程语言：
        <el-select v-model="language" class="m-2" placeholder="选择语言（默认python）">
          <el-option
              v-for="item in list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click="changeMode($event)"
          />
        </el-select>
        &ensp;说明文档：
        <el-button text @click="dialogVisible = true" type="warning">帮助文档</el-button>
        <el-dialog
            v-model="dialogVisible"
            title="代码编辑说明文档"
            width="30%"
            :before-close="handleClose"
        >
          <span>代码编辑说明文档</span>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
          </template>
        </el-dialog>
        <el-popconfirm
            :icon="InfoFilled"
            icon-color="#626AEF"
            @confirm="saveFileCode"
            title="您确定要保存当前更改的代码吗?">
          <template #reference>
            <el-button type="primary" style="float: right">保存</el-button>
          </template>
        </el-popconfirm>
        <codemirror
            v-model="fileCode"
            placeholder="在此编辑您的代码..."
            :style="options.style"
            :mode="options.mode"
            :spellcheck="options.spellcheck"
            :autofocus="options.autofocus"
            :indent-with-tab="options.indentWithTab"
            :tabSize="options.tabSize"
            :extensions="options.extensions"
            @ready="log('ready', $event)"
            @change="log('change', $event)"
            @focus="log('focus', $event)"
            @blur="useEditedCode"
        />

      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {Codemirror} from "vue-codemirror";
import {python} from "@codemirror/lang-python";
import {cpp} from "@codemirror/lang-cpp";

import {oneDark} from "@codemirror/theme-one-dark";
// import "codemirror/addon/hint/show-hint.css";
import {reactive, ref, watch, toRefs, onMounted} from "vue";
import {ElMessageBox, ElTree} from 'element-plus'
import services from "../../utils/request";
import axios from "axios";
import {InfoFilled,} from '@element-plus/icons-vue'

onMounted(() => {
  queryTreeInfo()
})
// 数据
let fileCode = ref(``);
let selectValue = "python"
let dateTime = "黑暗主题（点击切换主题）"
let log = console.log

const options = reactive({
  style: {height: "600px"},
  mode: "text/x-c++src",
  spellcheck: true,
  autofocus: true,
  indentWithTab: true,
  tabSize: 2,
  extensions: [python(), oneDark], //传递给CodeMirror EditorState。创建({扩展})
});

// let style = ref({height: "600px"})
// let mode = ref("text/x-c++src")
// let spellcheck = ref(true)
// let autofocus = ref(true)
// let indentWithTab = ref(true)
// let tabSize = ref(2)
// let extension =  [cpp(), oneDark]
// let extensions =extension.extensions

// 方法
// 失去焦点时,使用已编辑的代码
const useEditedCode = () => {
  console.log("@@@blur@@@code:", fileCode.value);
  console.log("@@@blur@@@cpp:", cpp);
}

// 改变主题
const changeTheme = (e) => {
  console.log("extensions:", options.extensions);
  if (e.target.innerHTML === "黑暗主题（点击切换主题）") {
    // console.log("dark!!!!!changge !!!!!")
    options.extensions = [];
    dateTime = e.target.innerHTML = "白色主题（点击切换主题）";
  } else {
    options.extensions = [oneDark];
    dateTime = e.target.innerHTML = "黑暗主题（点击切换主题）";
  }
}

// 改变模式
const changeMode = (e) => {
  console.log("selectValue:", language.value);
  if (language.value === "python") {
    if (dateTime === "黑暗主题（点击切换主题）")
      options.extensions = [python(), oneDark];
    else
      options.extensions = [python()];
    // selectValue = "cpp";
    // e.target.innerHTML = "python";
    options.mode = "text/x-python";
  } else {
    if (dateTime === "黑暗主题（点击切换主题）")
      options.extensions = [cpp(), oneDark];
    else options.extensions = [cpp()];
    // selectValue = "python";
    // e.target.innerHTML = "C++";
    options.mode = "text/x-c++src";
  }
}

// 下拉列表
const language = ref('')
const list = [
  {
    value: 'python',
    label: 'python',
  },
  {
    value: 'c++',
    label: 'c++',
  },
]

//帮助文档
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您确定要关闭此帮助文档吗？')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

// 树形控件
interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

// let data: Tree[] = [
//   {
//     id: 1,
//     label: 'timeSpaceProcess',
//     children: [
//       {
//         id: 4,
//         label: 'GRU_LSTM',
//         children: [
//           {
//             id: 9,
//             label: 'LSTM.PY',
//           },
//           {
//             id: 10,
//             label: 'GRU.PY',
//           },
//         ],
//       },
//     ],
//   },
// ]
//文件数目录信息
const fileTreeInfo = reactive({
  fileTree: []
})
const queryTreeInfo = () => {
  axios.get('/service-edit/directoryStructure/getFileDirectoryStructure').then(res => {
    console.log("树信息：", res.data)
    fileTreeInfo.fileTree = res.data
  })
  console.log('submit!')
}
//文件相对请求路径
let filePath:string = ''
//树点击事件
const getFileContent = (v, e) => {
  let fileGetPath = '/service-edit/fileEdit/getCode/'
  filePath=e.parent.parent.label + '/' + e.parent.label + '/' + v.label
  fileGetPath = fileGetPath + filePath
  console.log("获取文件代码api：", fileGetPath)
  console.log("文件相对路径：", filePath)
  services.get(fileGetPath).then(res => {
    console.log(res)
    fileCode.value = res
  })
}

//保存更改的文件代码
const saveFileCode = () => {
  console.log("当前文件绝对路径为：",filePath)
  let fileSavePath = '/service-edit/fileEdit/saveCode/'
  fileSavePath=fileSavePath+filePath
  axios.post(fileSavePath, fileCode.value,{
    // headers: {
    //   'Content-Type':'application/json'
    // }
  }).then(res => {
    console.log("保存返回信息为：",res.data)
    // wpsRequest.value = res[0]
    // wpsReponse.value = res[1]
  })
  console.log('submit!')
}
</script>
