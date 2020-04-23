<template>
  <div class="sku-content">
    <!-- sku -->
    <label class="label">商品sku</label>
    <el-form
      ref="skuForm"
      :model="skuForm"
      :rules="skuRule"
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
          <p class="name">{{colorProps.name}}</p>
          <p class="handler">管理属性值</p>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item,index) in colorProps.colorArr"
            :key="index"
            :label="item"
            @change="skuSelect($event,item,colorProps.name,colorProps.key)"
          />
        </el-checkbox-group>
      </div>
      <div class="prop prop-base">
        <div class="header">
          <p class="name">{{sizeProps.name}}</p>
          <p class="handler">管理属性值</p>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item,index) in sizeProps.sizeArr"
            :key="index"
            :label="item"
            @change="skuSelect($event,item,sizeProps.name,sizeProps.key)"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="prop prop-base">
        <div class="header">
          <p class="name">{{versionProps.name}}</p>
          <p class="handler">管理属性值</p>
        </div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item,index) in versionProps.versionArr"
            :key="index"
            :label="item"
            @change="skuSelect($event,item,versionProps.name,versionProps.key)"
          />
        </el-checkbox-group>
      </div>
      <div class="add-prop prop-base">
        <i class="el-icon-plus"></i>
        <span class="add-more">添加更多属性</span>
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
    <PageTable :tbData="skuData" :columns="columns" :spanMethod="objectSpanMethod" />
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
        name: '颜色',
        key: 'color',
        colorArr: ['默认', '白色', '黑色', '银色', '灰色', '红色', '粉红色', '墨绿色', '砖红色'],
      },
      sizeProps: {
        name: '尺寸',
        key: 'size',
        sizeArr: ['xxl', 'xl', 'l', 'm', 's', 'sm'],
      },
      versionProps: {
        name: '版本号',
        key: 'version',
        versionArr: ['6GB+64GB', '6GB+128GB', '8GB+64GB', '8GB+128GB', '8GB+256GB']
      },
      visible: false,
      skuData: JSON.parse(localStorage.getItem('allSkuData')) || [],
      width: 80,
      columns: [
        {
          label: "价格",
          prop: "price",
          width: 200,
          type: 'input'
        },
        {
          label: "库存",
          prop: "num",
          width: 200,
          type: 'input'
        },
        {
          label: "sku缩略图",
          prop: "skupic",
          width: 400
        }
      ],
      skuForm: {
        color: "", //颜色
        version: "", // 版本
        price: "", // 价格
        subPics: [], // 图片
        num: ""
      },
      skuRule: {
        color: [
          {
            required: true,
            message: "商品颜色不能为空",
            trigger: "blur"
          }
        ],
        version: [
          {
            required: true,
            message: "商品描述不能为空",
            trigger: "blur"
          }
        ],
        price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" }
        ],
        // subPics: [
        //   {
        //     required: true,
        //     message: "商品副图不能为空",
        //     trigger: "change"
        //   }
        // ],
        num: [{ required: true, message: "商品库存不能为空", trigger: "blur" }]
      },
      skuArr: []
    };
  },
  created () {
    this.skuTableVisible()
  },
  computed: {
    skus () {
      // 过滤掉用户没有填写数据的规格参数
      const arr = this.skuArr.filter(s => s.selected.length > 0);
      // 通过reduce进行累加笛卡尔积
      return arr.reduce((last, spec) => {
        const result = [];
        last.forEach(o => {
          spec.selected.forEach(option => {
            const obj = {};
            Object.assign(obj, o);
            obj[spec.k] = option;
            result.push(obj);
          })
        })
        return result
      }, [{}])
    }
  },
  mounted () {
    
  },
  methods: {
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    addSku (prop, name) {
      var skuObj = {}
      skuObj.k = name
      skuObj.selected = []
      skuObj.selected.push(prop)
      this.skuArr.push(skuObj)
    },
    skuSelect ($event, prop, name, key) {
      if (this.skuArr.length > 0) {
        // 加锁判断是否存在同样的prop
        var flag = false
        this.skuArr.map((item, index) => {
          if (item.k == name) {
            this.skuArr[index].selected.push(prop)
            flag = false
          } else {
            flag = true
          }
        })
        flag ? this.addSku(prop, name) : null
      } else {
        this.addSku(prop, name)
      }
      console.log(this.skus)

      this.skus.map((item,index) => {
        var obj = {}
        for(var i in item) {
          obj.label = i
          obj.prop = item[i]
          
          this.columns.unshift(obj)
        }
      })
      console.log(this.columns)
    },
    skuTableVisible () {
      if (this.skuData.length == 0) return
      this.visible = true
    },
    handleInitSku () {
      this.$emit('handleSku')
      this.$refs["skuForm"].validate(valid => {
        if (valid) {
          this.visible = true
          const { color, version, price, num, subPics } = this.skuForm
          const params = {
            spuId: this.spuId,
            color,
            version,
            price,
            num,
            subPics
          }
          this.$refs["skuForm"].resetFields();
          let allSkuData = JSON.parse(localStorage.getItem('allSkuData')) || { skuId: '', skuList: [] }
          allSkuData.skuList.push(params)
          createSku(allSkuData).then(res => {
            if (res.code == 200) {
              allSkuData.skuId = res.data
              localStorage.setItem('allSkuData', JSON.stringify(allSkuData))
            }
          })

          this.skuData = JSON.parse(localStorage.getItem('allSkuData'))
          console.log(this.skuData)
        }
      })
    },
    getImgURL (url) {
      this.skuForm.subPics.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
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
        color: #1c1fa8;
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
    .add-more {
      color: #1c1fa8;
      cursor: pointer;
    }
  }
}
</style>