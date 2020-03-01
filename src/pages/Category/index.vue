<template>
  <div>
    <PageTable
      title="标签列表"
      :tbData='tbData'
      :columns='columns'
      :filters='filters'
      :addBtn="{label: '添加标签',onAdd: addTag}"
      :onFilter="handleFilter"
      :onReset="handleReset"
      @handleEdit='handleEdit'
      @handleDelete='handleDelete'
      @handelChangeSize='handelChangeSize'
      @handelChangePage='handelChangePage'
    />
    <el-dialog title="添加标签" width='500px' :visible.sync="tagAddVisble">
    <el-form :model="tagForm" ref='tagForm'>
      <el-form-item label="标签名称" :label-width="formLabelWidth">
        <el-input v-model="tagForm.name" :style="{width: '300px'}" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleAddCancel">取 消</el-button>
      <el-button type="primary" @click="handleAddOk">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import PageTable from "@/components/PageTable";
// import { addTagName, getTagList, deleteTagName, updateTagName } from '@/service/tag'
export default {
  data() {
    return {
      tagForm: {
          name: '',
        },
      formLabelWidth: '100px',
      tagAddVisble: false,
      tagEditVisble: false,
      tbData: [],
      columns: [
        {
          label: "标签id",
          key: "tag_id"
        },
        {
          label: "标签名称",
          key: "tagname"
        }
      ],
      filters: [
        {
          label: "标题",
          type: "Input"
        },
        {
          label: "标签",
          type: "Input"
        },
        {
          label: "类型",
          type: "Input"
        },
        {
          label: "状态",
          type: "Select",
          selectList: [
            {
              value: "",
              label: "全部"
            },
            {
              value: 0,
              label: "当前"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.getData()
  },
  methods: {
    handelChangePage(pageSize) {
     this.getData(pageSize)
    },
    handelChangeSize(limit) {
     this.getData(1,limit)
    },
    handleFilter() {
      console.log(11);
    },
    handleReset() {
      console.log(22);
    },
    getData(pageSize = 1, limit = 7) {
      // getTagList({pageSize,limit}).then(res => {
      //   if(res.code == 200) {
      //     this.tbData = res.data
      //   }
      // })
    },
    addTag() {
      this.tagAddVisble = true;
    },
    handleAddOk() {
      this.$refs['tagForm'].validate(valid => {
        if(valid) {
          console.log(this.tagForm.name)
          const param = {
            tagname: this.tagForm.name
          }
          // addTagName(param).then(res => {
          //   if(res.code == 200) {
          //     this.tagAddVisble = false
          //     this.getData()
          //   }
          // })
        } else {
          console.log('err')
        }
      })
    },
     handleAddCancel() {
      this.tagAddVisble = false
      this.$refs['tagForm'].resetFields()
    },
    editTag() {
      this.tagEditVisble = true
    },
    handleEdit() {
      // updateTagName(params).then(res => {

      // })
    },
    handleEditOk() {

    },
    handleEditCancel() {

    },
    handleDelete(id) {
      console.log(id)
      // deleteTagName({tagid: id}).then(res => {
      //   if(res.code == 200) {
      //     this.getData()
      //   }
      // })
    }
  },
  components: {
    PageTable
  }
};
</script>

<style lang="scss" scoped>
</style>