<template>
  <div class="wrap-sku">
    <div class="product-box">
      <div class="product-content">
        <div class="product-delcom">
          <div
            style="height: 140px"
            v-for="(item, i) in skuNameList"
            :key="i"
          >
            <p>{{ item.skuName }}</p>
            <ul class="product-footerlist">
              <li
                v-for="(val, index) in item.skuValues"
                :key="index"
                @click="getSkuInfo(val)"
              >
                {{ val }}
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
      // 库存列表
      skuList: [
        {
          skuId: '0',
          skuGroup: ['红色', '大'],
          remainStock: 7,
          price: 2,
          picUrl: 'https://dummyimage.com/100x100/ff00b4/ffffff&text=大'
        },
        {
          skuId: '1',
          skuGroup: ['红色', '小'],
          remainStock: 3,
          price: 4,
          picUrl: 'https://dummyimage.com/100x100/ff00b4/ffffff&text=小'
        },
        {
          skuId: '2',
          skuGroup: ['蓝色', '大'],
          remainStock: 0,
          price: 0.01,
          picUrl: 'https://dummyimage.com/100x100/0084ff/ffffff&text=大'
        },
        {
          skuId: '3',
          skuGroup: ['蓝色', '小'],
          remainStock: 1,
          price: 1,
          picUrl: 'https://dummyimage.com/100x100/0084ff/ffffff&text=小'
        }
      ],

      // 规格列表
      skuNameList: [
        {
          skuName: "颜色",
          skuValues: ["红色", "蓝色"]
        },
        {
          skuName: "尺寸",
          skuValues: ["大", "小"]
        }
      ]
    }
  },
  created () {

  },
  methods: {
    /**
* 获取sku信息
* @param {Array} selected 已选属性数组
* @return {Object} skuInfo
*
*/
    getSkuInfo (selected) {
      // 用以记录每个按钮状态的，例如 itemState['红色'] = true 表示高亮
      const attrState = {};
      let picUrl = '';
      let minPrice = Number.MAX_VALUE;
      let maxPrice = 0;
      let remainStock = 0;

      // in array not in others
      const difference = (array, others) => {
        return array.filter((item) => others.indexOf(item) === -1);
      };

      // every in array in others
      const isSubset = (array, others) => {
        return array.every((item) => others.indexOf(item) > -1);
      };

      // 遍历规格列表
      this.skuNameList.forEach((spec) => {
        // 移除当前遍历规格下的已选属性
        const tempSelected = difference(selected, spec.skuValues).filter(name => name);

        // 遍历规格属性
        spec.skuValues.forEach((name) => {
          const willSelected = [...tempSelected, name];

          // 默认无库存不可选
          attrState[name] = false;

          // 在库存列表寻找匹配库存
          for (let i = 0, len = this.skuList.length; i < len; i++) {
            const skuGroup = this.skuList[i].skuGroup;

            if (isSubset(willSelected, skuGroup) && this.skuList[i].remainStock) {
              attrState[name] = true;
              break;
            }
          }
        });
      });

      // 实际已选属性，过滤空字符串
      const realSelected = selected.filter((item) => item);

      // 默认选择用于匹配当前图片
      const defaultSelected = selected.map(
        (name, idx) => name || this.skuNameList[idx].skuValues[0]
      );

      this.skuList.forEach((sku) => {
        if (isSubset(realSelected, sku.skuGroup)) {
          remainStock += sku.remainStock;
          maxPrice = maxPrice > sku.price ? maxPrice : sku.price;
          minPrice = minPrice < sku.price ? minPrice : sku.price;

          // 取当前图片
          if (isSubset(defaultSelected, sku.skuGroup)) {
            picUrl = sku.picUrl;
          }
        }
      });

      return {
        attrState,
        picUrl,
        minPrice,
        maxPrice,
        remainStock,
      };
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