<template>
  <div class="sku">
    <div class="sku-content">
      <!-- sku -->
      <p>销售属性：</p>
      <div class="sku-content-block">
        <el-form
          ref="skuForm"
          label-width="100px"
          class="addForm"
          label-position="left"
        >
          <div class="prop prop-base">
            <div class="header">
              <p class="name"><em>*</em>{{ colorProps.keyWord }}</p>
              <p class="handler">管理属性值</p>
            </div>
            <el-checkbox-group v-model="colorObj">
              <el-checkbox
                v-for="(item, index) in colorProps.colorArr"
                :key="index"
                :label="item.label"
                @change="
                  skuSelect(
                    $event,
                    item    ,
                    colorProps.key,
                    colorProps.keyWord,
                    colorProps.level
                  )
                "
              >
              <template>
                  <div>
                      <span :style="{display:'inline-block',background:item.color,width: 14+'px',height: 14+'px',verticalAlign:'text-top',borderRadius: '2px',marginRight: '2px',marginTop: '-1px'}"></span>
                      <span>{{item.label}}</span>
                  </div>
              </template></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="prop prop-base">
            <div class="header">
              <p class="name"><em>*</em>{{ sizeProps.keyWord }}</p>
              <p class="handler">管理属性值</p>
            </div>
            <el-checkbox-group v-model="sizeObj">
              <el-checkbox
                v-for="(item, index) in sizeProps.sizeArr"
                :key="index"
                :label="item.label"
                @change="
                  skuSelect(
                    $event,
                    item.label,
                    sizeProps.key,
                    sizeProps.keyWord,
                    sizeProps.level
                  )
                "
              ></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="prop prop-base">
            <div class="header">
              <p class="name"><em>*</em>{{ versionProps.keyWord }}</p>
              <p class="handler">管理属性值</p>
            </div>
            <el-checkbox-group v-model="versionObj">
              <el-checkbox
                v-for="(item, index) in versionProps.versionArr"
                :key="index"
                :label="item.label"
                @change="
                  skuSelect(
                    $event,
                    item.label,
                    versionProps.key,
                    versionProps.keyWord,
                    versionProps.level
                  )
                "
              />
            </el-checkbox-group>
          </div>
          <div class="add-prop prop-base">
            <i class="el-icon-plus"></i>
            <span>添加更多属性</span>
          </div>
        </el-form>
      </div>
    </div>
    <!-- <div v-if="required"> -->
    <div style="width: 900px;margin-left: 100px;margin-top: 20px">
      <PageTable
        :tbData="skuData"
        :columns="columns"
        :spanMethod="spanMethod"
      />
      
    </div>
  </div>
</template>

<script>
import { createSku } from '../../api/product'
import UploadImg from "@/components/UploadImg";
import PageTable from "@/components/Page/pageTable";
import _util from '../../utils/util'
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
      colorObj: [],
      sizeObj: [],
      versionObj: [],
      // required: false,
      colorProps: {
        keyWord: '颜色',
        key: 'color',
        level: '0',
        colorArr: [
          { label: '白色', color: '#fff' },
          { label: '象牙白', color: '#FFFFF0' },
          { label: '黑色', color: '#000' },
          { label: '薰衣草', color: '#E6E6FA' },
          { label: '橙色', color: '#FFA500' },
          { label: '黄色', color: '#FFFF00' },
          { label: '深黄色', color: '#FFD700' },
          { label: '灰色', color: '#808080' },
          { label: '浅灰色', color: '#D3D3D3' },
          { label: '红色', color: '#DC143C' },
          { label: '砖红色', color: '#CD5C5C' },
          { label: '粉红色', color: '#FFC0CB' },
          { label: '绿色', color: '#008000' },
          { label: '深绿色', color: '#006400' },
          { label: '蓝色', color: '#4682B4' },
          { label: '浅蓝色', color: '#87CEFA' },
          { label: '深蓝色', color: '#00BFFF' },
          { label: '天蓝色', color: '#87CEEB' },
          { label: '青色', color: '#00FFFF' },
          { label: '卡其色', color: '#BDB76B' },
          { label: '米色', color: '#6B8E23' },
          { label: '紫色', color: '#800080' },
          { label: '浅紫色', color: '#DA70D6' },
        ],
      },

      sizeProps: {
        keyWord: '尺寸',
        key: 'size',
        level: '1',
        sizeArr: [
          { label: 'XXL' },
          { label: 'XL' },
          { label: 'L' },
          { label: 'M' },
          { label: 'S' },
          { label: 'SM' },
        ],
      },
      versionProps: {
        keyWord: '版本号',
        key: 'version',
        level: '2',
        versionArr: [
          { label: '6GB+64GB' },
          { label: '6GB+128GB' },
          { label: '8GB+64GB' },
          { label: '8GB+128GB' },
          { label: '8GB+256GB' },
        ]
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
    required () {
      return this.colorObj.length > 0 && this.sizeObj.length > 0 && this.versionObj.length > 0
    },
    skuData () {
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
            result.push(obj)
          })
        })
        return result
      }, [{}])
    }
  },
  methods: {
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.getSpanArr()[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    addSku (key, prop) {
      var skuObj = {}
      skuObj.label = key

      skuObj.prop = []
      skuObj.prop.push(prop)
      console.log(skuObj)
      this.skuArr.push(skuObj)
    },
    removeSku (value) {
      let _index, __index1, __index2
      this.skuData.filter((item, index) => {
        Object.values(item).map((val, i) => {
          if (val === value) {
            _index = i
          }
        })
      })
      this.skuArr.map((a, i) => {
        a.prop.map((p, j) => {
          if (p === value) {
            __index1 = i
            __index2 = j
          }
        })
      })
      this.skuData.splice(_index, 1)
      this.skuArr[__index1]['prop'].splice(__index2, 1)
    },
    getSpanArr () {
      let position = 0, spanArr = []
      this.skuData.forEach((item, index) => {
        if (index === 0) {
          spanArr.push(1);
          position = 0;
        } else {
          if (this.skuData[index].color === this.skuData[index - 1].color) {
            spanArr[position] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            position = index;
          }
        }
      })
      return spanArr
    },
    // 多选错误
    skuSelect ($event, prop, key, keyWord, level) {
      if ($event) {
        if (this.skuArr.length > 0) {
          // 加锁判断是否存在同样的prop
          var flag = false
          this.skuArr.filter((item, index) => {
            if (item.label == key) {
              flag = true
              this.skuArr[index].prop.push(prop)
            }
          })
          !flag ? this.addSku(key, prop) : null
          !flag ? this.skuCount++ : null
        } else {
          this.skuCount++
          this.addSku(key, prop)
        }
        this.$emit('handle-submit', this.skuData)
        let _obj = {}
        _obj.label = keyWord
        _obj.prop = key
        _obj.width = 200

        if(prop.constructor === Object) {
            _obj.type='color'
        }
        // Object.keys(prop).length>1?_obj.type='color':''
        // console.log(_obj)
        !flag ? this.columns.splice(this.skuCount, 0, _obj) : null
      } else {
        // this.columns.splice(0,1)
        this.removeSku(prop)
      }
      this.$emit('get-skuData',this.skuData)
    },
    getImgURL (url) {
      this.skuForm.subPics.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
$color: #409eff;
.sku {
  &-content {
    > p {
      display: inline-block;
      width: 100px;
      vertical-align: top;
      text-align: right;
      color: #606266;
    }
    &-block {
      display: inline-block;
      .addForm {
        width: 900px;
        background: #f5f5f5;
      }
    }
  }
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