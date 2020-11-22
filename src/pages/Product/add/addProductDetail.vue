<template>
  <div>
    <div class="product-detail">
      <div class="product-detail-content padding18">
        <div>
          <label class="label">销售属性</label>
          <el-form
            ref="propForm"
            :model="propForm"
            :rules="propRule"
            label-width="106px"
            class="paramForm margin30"
            label-position="right"
          >
            <el-form-item label="商城价(元)" prop="mall_price">
              <el-input v-model="propForm.mall_price" />
            </el-form-item>
            <el-form-item label="市场价(元)" prop="market_price">
              <el-input v-model="propForm.market_price" />
            </el-form-item>
            <el-form-item label="折扣" prop="discount">
              <el-input v-model="propForm.discount" />&nbsp;%
            </el-form-item>
            <el-form-item label="成本价(元)" prop="cost_price">
              <el-input v-model="propForm.cost_price" />
            </el-form-item>
          </el-form>
          <!-- sku -->
          <Sku @get-skuData="getSkuData" />
        </div>
        <div class="common pic-add">
          <label class="label">商品图片</label>
          <div>
            <p>商品图片：</p>
            <div class="pic">
              <p class="pic-btn">一键复用到所有sku主图</p>
              <div>
                <p><em>*</em>商品展示图</p>
                <draggable v-model="myArray">
                  <transition-group>
                    <div
                      class="upload-wrapper"
                      v-for="element in myArray"
                      :key="element.id"
                    >
                      <UploadImg
                        :imgKey="element.key"
                        action="/api/upload"
                        :on-success="uploadSuccess"
                        :imgUrl="pic"
                        :label="element.name"
                        :preview="false"
                      />
                    </div>
                  </transition-group>
                </draggable>
                <p>
                  <span class="tips"
                    >图片至少上传5张，尺寸为800*800px，仅支持jpg，jpeg，png格式</span
                  >&nbsp;<span>您可以拖拽图片调整顺序</span>
                </p>
              </div>
            </div>
          </div>
          <template v-for="(item, index) in duplication_skuList">
            <div :key="index">
              <p>
                <span
                  :style="{
                    display: 'inline-block',
                    background: item.color.color,
                    width: 14 + 'px',
                    height: 14 + 'px',
                    verticalAlign: 'text-top',
                    borderRadius: '2px',
                    marginRight: '2px',
                  }"
                ></span>
                <span>{{ item.color.label }}：</span>
              </p>
              <div class="pic">
                <p class="pic-btn">使用商品图片</p>
                <div>
                  <p><em>*</em>商品展示图</p>
                 <draggable v-model="myArray">
                  <transition-group>
                    <div
                      class="upload-wrapper"
                      v-for="element in myArray"
                      :key="element.id"
                    >
                      <UploadImg
                        :imgKey="item.color.label"
                        action="/api/upload"
                        :on-success="uploadSuccess"
                        :imgUrl="pic"
                        :label="element.name"
                        :preview="false"
                      />
                    </div>
                  </transition-group>
                </draggable>
                  <p>
                    <span class="tips"
                      >图片至少上传5张，尺寸为800*800px，仅支持jpg，jpeg，png格式</span
                    >&nbsp;<span>您可以拖拽图片调整顺序</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="product-detail-add common">
          <label class="label">商品描述</label>
          <div>
            <p><em>*</em>商品详情：</p>
            <div class="editor">
              <vue-editor
                id="editor"
                v-model="content"
                :editorToolbar="customToolbar"
              ></vue-editor>
            </div>
          </div>
        </div>
      </div>
      <div class="stepBtn">
        <el-button type="default" @click="prevClick">上一步</el-button>
        <el-button type="primary" @click="sale">开始销售</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PageTable from "@/components/Page/pageTable";
import draggable from "vuedraggable";
import {
  getCategoryList,
  addProduct
} from "../../../api/product";
import UploadImg from "@/components/UploadImg";
import Sku from "../sku";
import CategoryModule from "@/module/categoryModule"
import { VueEditor } from "vue2-editor";
import { removeDuplication } from '../../../utils/util'
import bus from './bus'
export default {
  components: {
    UploadImg,
    Sku,
    PageTable,
    VueEditor,
    draggable,
    "category-module": CategoryModule
  },
  data () {
    return {
      pic: '',
      name: '展示图',
      myArray: [
        {
          "name": "主图",
          "key": "main",
          "id": 0
        },
        {
          "name": "展示图",
          "key": "main",
          "id": 1
        },
        {
          "name": "展示图",
          "key": "main",
          "id": 2
        },
        {
          "name": "展示图",
          "key": "main",
          "id": 3
        },
        {
          "name": "展示图",
          "key": "main",
          "id": 4
        },
        {
          "name": "展示图",
          "key": "main",
          "id": 5
        },
        {
          "name": "展示图",
          "key": "main",
          "id": 6
        }
      ],
      skuList: [],
      content: "",
      customToolbar: [["bold"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]],
      value: '',
      propForm: {
          skuList: []
      },
      propRule: {
        mall_price: [{ required: true, message: '请输入商城价格', trigger: "blur" }],
        market_price: [{ required: true, message: '请输入市场价格', trigger: "blur" }]
      },
      title: JSON.parse(localStorage.getItem("productInfo")).title || '',
      setItem: []
    };
  },
  created () {
      bus.$on('getInfoData', (data) => {
          Object.assign(this.propForm,data)
      })
  },
  computed: {
    duplication_skuList () {
      return removeDuplication(this.skuList)
    },
  },
  methods: {
    getSkuData (data) {
      this.skuList = data

    },
    prevClick () {
      this.$emit('prev-click', true)
    },
    addSkuImgList(){
        this.skuList.map((item, i) => {
            for(let prop in item) {
                this.skuList[i].img_list = []
                this.skuList[i].img_list.push(localStorage.getItem(item.color.label))
                // localStorage.removeItem(item.color.label)
            }
        })
    },
    sale () {
        this.$refs['propForm'].validate(valid => {
           if(valid) {
                this.addSkuImgList()
                this.propForm.sku_list = this.skuList
                this.propForm.detail = this.content
                console.log(this.propForm)
                addProduct(this.propForm).then(res => {

                })
           }
        })
    },
    uploadSuccess (e, data) {
      if (e.target.dataset['key'] == 'main') {
        this.propForm.img_list = []
        this.propForm.img_list.push(data)
      }
      this.skuList.map((item, i) => {
        if (e.target.dataset['key'] == item.color.label) {
          this.skuList[i].hasOwnProperty('img_list') ? "" : this.skuList[i].img_list = []
          this.skuList[i].img_list.push(data)
          localStorage.setItem(e.target.dataset['key'],this.skuList[i].img_list)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>