<template>
  <div class="wrap-sku">
    <div class="product-box">
      <div class="product-content">
        <div class="product-delcom">
          <div
            style="height: 140px"
            v-for="(item, key, i) in groupSkuList"
            :key="i"
          >
            <p>{{ key }}</p>
            <ul class="product-footerlist">
              <li
                v-for="(val, index) in item"
                :key="index"
                @click="chooseSku(val, i)"
                :class="[
                  selectArr[i] == val ? 'activeStock' : '',
                  val.stoke == '0' ? 'noStock' : '',
                ]"
              >
                {{ val.value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div style="font-size: 20px;margin-top: 100px">选中的属性: 性别:{{ currentChoose.sex }}, 颜色：{{ currentChoose.color }}, 大小：{{ currentChoose.size }}</div> -->
    </div>
  </div>
</template>

<script>
import {
  getProductDetail
} from "@/api/product";
export default {
  data () {
    return {
      currentSkuList: [],
      groupSkuList: {},
      activeIndex: 0,
      selectArr: {},
      sku_list: [],
      sku_spec: [
          {
              spec_name: '颜色',
              spec_vals: [
                  {spec_val_name: '黑色'},
                  {spec_val_name: '蓝色'}
              ]
          },
          {
              spec_name: '版本号',
              spec_vals: [
                  {spec_val_name: '8GB+128GB'},
                  {spec_val_name: '8GB+256GB'}
              ]
          },
      ]
    }
  },
  created () {
    this.getProductDetail()
  },
  methods: {
    getProductDetail () {
      getProductDetail({ spu_id: '5fdd9807082f251878163d61' }).then(res => {
        this.currentSkuList = res.data.sku.map(item => ({ sp_data: item.sp_data, sku_id: item.sku_id, stoke: item.stoke }))
        let result = this._transMatrix()
        this.groupSkuList = this._group(result)
      })
    },
    _transMatrix () {
      let transResult = {};

      this.currentSkuList.forEach(specs => {
        specs.sp_data.forEach(item => {
          if (!transResult[specs['sku_id']]) {
            transResult[specs['sku_id']] = {
              stoke: specs.stoke,
              properties: {
                [item['key']]: item['value']
              }
            }
          } else if (!transResult[specs['sku_id']].properties[item['key']]) {
            transResult[specs['sku_id']].properties[item['key']] = item['value']
          }
        })
      })
      return transResult;
    },
    getSkuList (data) {
      data.map(item => {
        let str = '', obj = {}, sp_data_obj = {}
        item.sp_data.map((val, i) => {
          str += '_' + val.value
          obj.sku_id = val.sku_id
          obj.sku_name = str
          obj.spu_id = item.spu_id
          obj.price = item.price
          obj.stoke = item.stoke
          obj.create_time = item.create_time
        })
        obj.sku_name = obj.sku_name.slice(1)
        this.sku_list.push(obj)
      })
      console.log(this.sku_list)
    },
    unique (obj) {
      var unique = {};
      obj.forEach(function (gpa) {
        unique[JSON.stringify(gpa)] = gpa
      });
      obj = Object.keys(unique).map(function (u) {
        return JSON.parse(u)
      });
      return unique
    },
    combine (data) {
      for (let key in data) {
        let str = ''
        for (let i in data[key].sp_data_list) {
          str += '_' + data[key].sp_data_list[i]
          data[key].sp_data_str = str
        }
        data[key].sp_data_str = data[key].sp_data_str.slice(1)
      }
      return data
    },
    _group (data) {
      let arr = {}, obj = {}
      for (let i in data) {
        for (let j in data[i].properties) {
          arr[j] === undefined ? arr[j] = [] : ''
          let _obj = {}
          _obj.value = data[i].properties[j]
          arr[j].push(_obj)
          obj[j] = this.unique(arr[j])
        }
      }
      return obj
    },
    chooseSku (val, index) {
      if (this.selectArr[index] === val) {
        this.$set(this.selectArr, index, '')
      } else this.$set(this.selectArr, index, val.value)
      //   Object.values(this.groupSkuList).map(item => {
      //     for (let key in item) {
      //       item[key].stoke = this.getStock(val.value)
      //     }
      //   })
    //   this.getStock(val.value)
      //   console.log(result)
    //   this.getData(this.selectArr,this.sku_spec)
    },
    getStock (sku_str) {
      let result = this._transMatrix()
      let stockData = this.combine(result)
      for (let key in stockData) {
        if (stockData[key].sp_data_str.indexOf(sku_str) !== -1) {
          console.log(stockData[key].stoke)
          for (let i in this.sku_list) {
            console.log(this.sku_list[i].sku_name)
            if (this.sku_list[i].sku_name === sku_str) {
              console.log(this.sku_list[i], 'skusku')
              return this.sku_list[i].stock
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.wrap-sku {
  .isStock {
    background-color: #fff;
  }
  .noStock {
    background-color: #000;
    cursor: default !important;
  }
  .product-box {
    width: 1200px;
    display: block;
    margin: 0 auto;
  }
  .product-delcom {
    color: #323232;
    font-size: 26px;
    padding: 30px 0;
  }
  .product-footerlist {
    margin-top: 10px;
  }
  .product-footerlist li {
    border: 1px solid #606060;
    border-radius: 5px;
    color: #606060;
    text-align: center;
    padding: 10px 30px;
    list-style: none;
    margin-bottom: 20px;
    float: left;
    margin-right: 20px;
    cursor: pointer;
  }
  .activeStock {
    background-color: red;
    color: #fff !important;
    border-color: red !important;
  }
}
</style>