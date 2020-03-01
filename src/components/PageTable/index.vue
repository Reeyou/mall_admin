<template>
  <div class='page'>
    <!-- 标题 -->
    <div class="title">
      <h2>{{title}}</h2>
    </div>
    <!-- 添加按钮 -->
    <div class="addBtn" v-if='addBtn'>
      <el-button
        type='primary'
        icon='el-icon-plus'
        @click='addBtn.onAdd'
      >{{addBtn.label}}</el-button>
    </div>
    <!-- 筛选内容 -->
    <div class="filter">
      <el-form
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item
          v-for='(filter, index) in dataFilters'
          :key='index'
          :label="filter.label"
        >
          <!-- 单选框 -->
          <el-input
            v-if="filter.type === 'Input'"
            placeholder="请输入"
            v-model="filter.value"
          ></el-input>
          <!-- 多选框 -->
          <el-select
            v-if="filter.type === 'Select'"
            placeholder="请选择"
            v-model='value'
          >
            <el-option
              v-for='(item, index) in filter.selectList'
              :key='index' 
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 时间选择器 -->
          <el-date-picker
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
            v-if="filter.type === 'datePicker'"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">筛选</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
          <!-- <div class='collapse'>
            <span>收起</span>
            <i class='iconfont icon-arrow_u'></i>
            <span>展开</span>
            <i class='iconfont icon-arrow_d'></i>
          </div> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格内容 -->
    <div class='table'>
      <el-table
        :data='tbData.list'
        fit
        style="width: 100%"
        :header-cell-style="{background:'#fafafa',color:'#000',fontWeight: 600}"
      >
        <el-table-column
          v-for='(column, index) in dataColumns'
          :key='index'
          :prop="column.key"
          :label="column.label"
          :width="column.width"
          align='center'
          fit
        >
          <!-- <img
            :style="{width: '100px', height: '100px'}"
            v-if="column.key == 'poster'"
            :src="tbData.list.poster"
            alt=""
          > -->
        </el-table-column>
        <el-table-column
          fixed="right"
          align='center'
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button
              @click.native="tableEdit(scope.row._id)"
              type="primary"
              size="small"
              :disabled="role !== 'admin'"
            >编辑</el-button>
            <el-button
              @click.native="tableDelete(scope.row._id)"
              type="danger"
              size="small"
              :disabled="role !== 'admin'"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页内容 -->
    <div class="pageFooter">
      <div class='pagination'>
        <el-pagination
          @size-change="handleChangeSize"
          @current-change="handleChangePage"
          :current-page="1"
          :page-size="8"
          layout="total, prev, pager, next"
          :total="tbData.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'PageTable',
  props: ['tbData','columns','addBtn','title','filters','onFilter','onReset'],
  data () {
    return {
      value: '',
      role: '',
      dataColumns: this.columns || [],
      dataTitle: this.title,
      dataFilters: this.filters,
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
    }
  },
  created() {
    this.role = JSON.parse(localStorage.getItem('userinfo')).role
  },
  mounted() {
    // console.log(this.dataFilters)
  },
  methods: {
    tableEdit(id) {
      this.$emit('handleEdit',id)
    },
    tableDelete(id) {
      this.$emit('handleDelete',id)
    },
    handleFilter() {
      this.onFilter()
    },
    handleReset() {
      this.onReset()
    },
    handleChangeSize(pageSize) {
      this.$emit('handelChangeSize',pageSize)
    },
    handleChangePage(limit) {
      this.$emit('handelChangePage',limit)
    }
  },
  components: {
   
  }
}
</script>

<style lang='scss'>
@import '@/assets/css/common.scss';
.page {
  .el-input-inner {
    height: 30px;
  }
  background: #fff;
  .title {
     display: inline-block;
    // height: 60px;
    margin-bottom: 20px;
    h2 {
      font-size: 18px;
      color: $Black;
      font-weight: bold;
      padding: 10px 0 10px 36px;
    }
  }
  .addBtn {
    float: right;
    margin-right: 40px;
    // margin-top: -4px;
  }
  .filter {
    box-sizing: border-box;
    padding: $tablePadding;
    width: 100%;
    .el-form {
      .el-form-item {
        box-sizing: border-box;
        width: 33.33333%;
        display: flex;
        float: left;
        margin-right: 0;
        padding: 0 12px;
        &__content {
          flex: 1;
          .el-select {
            width: 100%;
          }
          .el-date-editor.el-input__inner {
            // width: 100%;
            height: 32px;
          }
        }
        &__label {
          width: 100px;
          text-align: left;
          padding: 0 20px 0 0;
        }
        .collapse {
          display: inline-block;
          margin-left: 18px;
          color: $Blue;
          transition: all 400ms ease;
          &:hover {
            cursor: pointer;
            opacity: 0.8;
          }
        }
      }
    }
  }
  .table {
    padding: $tablePadding;
  }
  .pageFooter {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: $tablePadding;
    .pagination {
      float: right;
    }
  }
}
@media screen and (max-width: 1200px){
  .page {
    .filter {
      .el-form {
      .el-form-item {
        position: relative;
        &__label {
          width: 60px;
        }
        .el-button {
          padding: 12px 14px;
        }
        .collapse {
          position: absolute;
          top: 0;
          right: -40px;
          // display: inline-block;
          margin-left: 18px;
          color: $Blue;
          transition: all 400ms ease;
          &:hover {
            cursor: pointer;
            opacity: 0.8;
          }
        }
      }
    }
    }
  }
}
@media screen and (max-width: 900px) {
  // el-button {
  //     padding: 0;
  //   }
  .page {
    .title {
      h2 {
        padding:0 0 0 10px;
      }
    }
     .addBtn {
      margin-right: 20px;
      margin-top: -4px;
      .el-button {
      padding: 8px 10px;
    }
    }
    .filter {
      .el-form {
        .el-form-item {
          display: flex;
          width: 100%;
          padding: 0;
        }
        &__label {
          flex: 0 0 25%;
        }
        &__content {
          flex: 1;
        }
      }
    }
    .table {
      padding: 0;
    }
  }
}
</style>
