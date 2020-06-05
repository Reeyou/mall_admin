<template>
  <div class="sku-content">
    <!-- sku -->
    <label class="label">商品sku</label>
    <el-form
      ref="skuForm"
      label-width="100px"
      class="addForm"
      label-position="left"
    >
      <!-- 
      颜色 白色 黑色
      尺寸  l m
      -->
      <div class="prop prop-base">
        <div class="header">
          <p class="name">{{colorProps.key}}</p>
          <p class="handler">管理属性值</p>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item,index) in colorProps.colorArr"
            :key="index"
            :label="item"
            @change="skuSelect($event,item,colorProps.key)"
          />
        </el-checkbox-group>
      </div>
      <div class="prop prop-base">
        <div class="header">
          <p class="name">{{sizeProps.key}}</p>
          <p class="handler">管理属性值</p>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item,index) in sizeProps.sizeArr"
            :key="index"
            :label="item"
            @change="skuSelect($event,item,sizeProps.key)"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="prop prop-base">
        <div class="header">
          <p class="name">{{versionProps.key}}</p>
          <p class="handler">管理属性值</p>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item,index) in versionProps.versionArr"
            :key="index"
            :label="item"
            @change="skuSelect($event,item,versionProps.key)"
          />
        </el-checkbox-group>
      </div>
      <div class="add-prop prop-base">
        <i class="el-icon-plus"></i>
        <span>添加更多属性</span>
      </div>
    </el-form>
    <!-- <el-button class="btn" @click="handleInitSku" icon="ios-add" type="primary">生成商品sku</el-button> -->
    <!-- <el-table v-show='visible' class="sku_table" :data="skuData" border style="width: 1200px">
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        align="center"
        fit
      ></el-table-column>
    </el-table>-->
    <PageTable :tbData="skus" :columns="columns" :spanMethod="spanMethod" />
  </div>
</template>

<script>
import { createSku } from '../../api/product'
import UploadImg from "@/components/UploadImg";
import PageTable from "@/components/Page/pageTable";
export default {
  name: 'sku',
  components: {
    UploadImg,
    PageTable
  },
  props: {
    spuId: String
  },
  data () {
    return {
      checkList: ['选中且禁用', '复选框 A'],
      colorProps: {
        key: '颜色',
        colorArr: ['默认', '白色', '黑色', '银色', '灰色', '红色', '粉红色', '墨绿色', '砖红色'],
      },
      sizeProps: {
        key: '尺寸',
        sizeArr: ['xxl', 'xl', 'l', 'm', 's', 'sm'],
      },
      versionProps: {
        key: '版本号',
        versionArr: ['6GB+64GB', '6GB+128GB', '8GB+64GB', '8GB+128GB', '8GB+256GB']
      },
      visible: false,
      width: 80,
      columns: [
        {
          label: "价格",
          prop: "price",
          width: 200,
          type: 'input',
          value: ""
        },
        {
          label: "库存",
          prop: "num",
          width: 200,
          type: 'input',
          value: ""
        },
        {
          label: "sku缩略图",
          prop: "skupic",
          width: 400,
          type: 'upload'
        }
      ],
      skuForm: {
        color: "", //颜色
        version: "", // 版本
        price: "", // 价格
        subPics: [], // 图片
        num: ""
      },
      skuArr: [],
      selectSkuArr: [],
      skuCount: -1,
    };
  },
  created () {

  },
  computed: {
    skus () {
      // 过滤掉用户没有填写数据的规格参数
      const arr = this.skuArr.filter(s => s.prop.length > 0);
      // 通过reduce进行累加笛卡尔积
      return arr.reduce((last, spec) => {
        const result = [];
        last.forEach(o => {
          spec.prop.forEach(option => {
            const obj = {};
            Object.assign(obj, o);
            obj[spec.label] = option;
            result.push(obj);
          })
        })
        return result
      }, [{}])
    }
  },
  methods: {
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        console.log(this.skus)
        this.skus.map((item,index) => {
          // if(item['颜色'])
          // console.log(item['颜色'])
          console.log(this.skus[index]['颜色'])
          if(this.skus.length>0) {
            if(this.skus[index]['颜色'] == "黑色") {
              console.log('span')
              return {
                rowspan: 2,
                colspan: 1
              };
            }else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }
        })
        // if (rowIndex % 2 === 0) {
        //   return {
        //     rowspan: 2,
        //     colspan: 1
        //   };
        // } else {
        //   return {
        //     rowspan: 0,
        //     colspan: 0
        //   };
        // }
      }
    },
    addSku (key, prop) {
      var skuObj = {}
      skuObj.label = key
      skuObj.prop = []
      skuObj.prop.push(prop)
      this.skuArr.push(skuObj)
    },
    removeSku (key) {
      let _index
      let newArr = this.skus.filter((item, index) => {
        if (Object.keys(item) == key) {
          _index = index
        }
      })
      this.skus.splice(_index, 1)
      console.log(this.skus)
    },
    // 多选错误
    skuSelect ($event, prop, key) {
      if ($event) {
        if (this.skuArr.length > 0) {
          // 加锁判断是否存在同样的prop
          var flag = false
          this.skuArr.filter((item,index) => {
            if(item.label == key) {
              flag = true
              this.skuArr[index].prop.push(prop)
            }
          })
          !flag ? this.addSku(key, prop) : null
          !flag ? this.skuCount++: null
        } else {
          this.skuCount++
          this.addSku(key, prop)
        }
        // skuColumns
        let _obj = {}
        _obj.label = key
        _obj.prop = key
        _obj.width = 200
        !flag ? this.columns.splice(this.skuCount,0,_obj) : null
        
      } else {
        this.removeSku(key)
      }

    },
    getImgURL (url) {
      this.skuForm.subPics.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
$color: #409EFF;
.sku-content {
  .prop-base {
    padding: 20px;
  }
  .prop {
    width: 800px;
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      font-size: 14px;
      .name {
      }
      .handler {
        color: $color;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .el-checkbox {
      width: 20%;
      margin-right: 0;
      margin-top: 20px;
      font-weight: bold;
      >>> .el-checkbox__label {
        font-size: 12px;
      }
      &:nth-child(-n + 5) {
        margin-top: 0;
      }
    }
  }
  .add-prop {
      color: $color;
      cursor: pointer;
      font-weight: bold;
  }
}
</style>