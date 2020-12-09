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
              <el-input
                v-model="propForm.discount"
                suffix-icon="iconfont icon-baifenbi"
              />
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
          <el-form
            ref="imgForm"
            :model="imgForm"
            :rules="imgRule"
            label-width="110px"
            class="common pic-add"
            label-position="right"
          >
            <el-form-item label="商品图片" prop="img_key">
              <!-- // Todo -->
              <el-input
                style="display: none"
                v-model="imgForm.img_key"
              ></el-input>
              <div class="pic">
                <p class="pic-btn">一键复用到所有sku主图</p>
                <div>
                  <p><em>*</em>商品展示图</p>
                  <draggable v-model="myArray">
                    <transition-group>
                      <div
                        class="upload-wrapper"
                        v-for="(element, i) in myArray"
                        :key="element.id"
                      >
                        <UploadImg
                          :imgKey="element.key"
                          action="/api/upload"
                          :on-success="uploadSuccess"
                          :imgUrl="propForm.img_list[i]"
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
            </el-form-item>
            <template v-for="(item, index) in duplication_sku_list">
              <el-form-item :key="index" prop="img_key">
                <div slot="label" style="display: inline-block">
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
                  ></span
                  ><span>{{ item.color.label }}</span>
                </div>
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
              </el-form-item>
            </template>
          </el-form>
        </div>
        <div class="product-detail-add common">
          <label class="label">商品描述</label>
          <div>
            <el-form
              ref="detailForm"
              :model="detailForm"
              :rules="detailRule"
              label-width="110px"
              class="common pic-add"
              label-position="right"
            >
              <el-form-item label="商品详情" prop="detail">
                <div class="editor">
                  <vue-editor
                    id="editor"
                    v-model="detailForm.detail"
                    :editorToolbar="customToolbar"
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                  ></vue-editor>
                </div>
              </el-form-item>
            </el-form>
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
import { instance } from '@/utils/request'
import { removeDuplication, DeepClone } from '../../../utils/util'
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
      customToolbar: [["bold"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]],
      propForm: {
        img_list: []
      },
      propRule: {
        mall_price: [{ required: true, message: '请输入商城价格', trigger: "blur" }],
        market_price: [{ required: true, message: '请输入市场价格', trigger: "blur" }]
      },
      imgForm: {
        img_key: "",
      },
      imgRule: {
        img_key: [{ required: true, message: '请上传商品图片', trigger: "change" }]
      },
      detailForm: {},
      detailRule: {
        detail: [{ required: true, message: '请输入商品详情', trigger: "blur" }]
      },
      title: JSON.parse(localStorage.getItem("productInfo")).title || '',
      skuList: [],
      duplication_sku_list: []
    };
  },
  created () {
    bus.$on('getInfoData', (data) => {
      Object.assign(this.propForm, data)
    })
  },
  //   computed: {
  //     duplication_sku_list () {
  //       const data =  removeDuplication(this.skuList)
  //       console.log(data)
  //     },
  //   },
  methods: {
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append("file", file)
      instance.post('/api/upload', formData).then(res => {
        Editor.insertEmbed(cursorLocation, "image", res.data.data)
        resetUploader()
      })
    },
    getSkuData (data) {
      const { skuData, sp_data, stokeTotal } = data
      let transform_sp_data = []
      sp_data.map((item,i) => {
          let arr = []
          for(let prop in item) {
            let obj = {key:prop, value:item[prop]}
            arr.push(obj)
          }
          transform_sp_data.push(arr)
      })
      skuData.forEach((item,i) =>{
          transform_sp_data.map((a,j) => {
              skuData[i]['sp_data'] = transform_sp_data[i]
          })
      })
      this.skuList = skuData
      this.detailForm.stoke_total = stokeTotal
      this.duplication_sku_list = removeDuplication(skuData)
    },
    prevClick () {
      this.$emit('prev-click', true)
    },
    addSkuImgList () {
      this.skuList.map((item, i) => {
        for (let prop in item) {
          this.skuList[i].img_list = []
          this.skuList[i].img_list.push(sessionStorage.getItem(item.color.label))
        }
      })
    },
    sale () {
      this.$refs['imgForm'].validate(valid => { })
      this.$refs['detailForm'].validate(valid => { })
      this.$refs['propForm'].validate(valid => {
        if (valid) {
          this.skuList.length ? this.addSkuImgList() : ''
          this.skuList.map(item => {
            if (item.hasOwnProperty('color')) {
              item.color = item.color.label
            }
          })
          this.propForm.sku_list = this.skuList
          //   this.propForm.detail = this.content
          let formData = Object.assign({}, this.propForm, this.detailForm)
          console.log(formData)
          addProduct(formData).then(res => {

          })
        }
      })
    },
    uploadSuccess (e, data) {
      if (e.target.dataset['key'] == 'main') {
        this.imgForm.img_key = "main"
        this.propForm.img_list.push(data)
      } else {
        this.skuList.map((item, i) => {
          if (e.target.dataset['key'] == item.color.label) {
            this.skuList[i].hasOwnProperty('img_list') ? "" : this.skuList[i].img_list = []
            this.skuList[i].img_list.push(data)
            sessionStorage.setItem(e.target.dataset['key'], this.skuList[i].img_list)
          }
        })
      }

    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>