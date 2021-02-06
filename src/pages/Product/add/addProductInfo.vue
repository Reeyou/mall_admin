<template>
  <div>
    <div class="product-prop">
      <div class="product-prop-content padding18">
        <div>
          <label class="label">商品基本信息</label>
          <el-form
            ref="infoForm"
            :model="infoForm"
            :rules="infoRule"
            label-width="100px"
            class="addForm margin30"
            label-position="right"
          >
            <el-form-item label="商品标题" prop="product_name">
              <el-input
                v-model="infoForm.product_name"
                placeholder="请输入商品名称"
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="商品标语" prop="product_solgan">
              <el-input
                v-model="infoForm.product_solgan"
                placeholder="请输入商品标语"
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="商品分类" prop="category_id">
              <category-cascader @handleSelectCategory="handleSelectCategory" />
            </el-form-item>
            <el-form-item label="无理由退货" prop="product_cacel">
              <el-select
                v-model="infoForm.product_cacel"
                placeholder="请选择"
                style="width: 200px"
              >
                <el-option
                  v-for="item in cacelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <label class="label">商品参数</label>
          <el-form
            ref="paramForm"
            :model="paramForm"
            label-width="110px"
            class="paramForm margin30"
            label-position="right"
          >
            <el-form-item label="货号" prop="code">
              <el-input v-model="paramForm.code" />
            </el-form-item>
            <el-form-item label="产地" prop="place">
              <el-select
                v-model="paramForm.place"
                placeholder="请选择"
                style="width: 300px"
              >
                <el-option
                  v-for="item in logisticsOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="[包装]长(mm)" prop="long">
              <el-input v-model="paramForm.long" />
            </el-form-item>
            <el-form-item label="[包装]宽(mm)" prop="width">
              <el-input v-model="paramForm.width" />
            </el-form-item>
            <el-form-item label="[包装]高(mm)" prop="height">
              <el-input v-model="paramForm.height" />
            </el-form-item>
            <el-form-item label="商品毛重(公斤)" prop="weight">
              <el-input v-model="paramForm.weight" />
            </el-form-item>
          </el-form>
        </div>
        <div>
          <label class="label">其他信息</label>
          <div class="logistics-form base-form margin30">
            <p><em>*</em>快递邮费</p>
            <el-form
              ref="logisticsForm"
              :model="logisticsForm"
              :rules="logisticsRule"
              class="otherForm"
              label-position="right"
            >
              <div class="base-form-item">
                <el-radio
                  v-model="logisticsForm.logistics_type"
                  label="0"
                  @change="logistics_change"
                  >统一邮费</el-radio
                >
                <el-form-item prop="money_value" ref="money_value">
                  <el-input
                    prefix-icon="iconfont icon-money"
                    class="other-content-input"
                    v-model="logisticsForm.money_value"
                    style="width: 200px"
                  />
                </el-form-item>
              </div>
              <div class="base-form-item">
                <el-radio
                  v-model="logisticsForm.logistics_type"
                  label="1"
                  @change="logistics_change"
                  >运费模板</el-radio
                >
                <el-form-item prop="model_value" ref="model_value">
                  <el-select
                    v-model="logisticsForm.model_value"
                    placeholder="请选择"
                    style="width: 200px"
                    :disabled="logisticsForm.logistics_type !== '1'"
                  >
                    <el-option
                      v-for="item in logisticsOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="saletime-form base-form margin30">
            <p><em>*</em>上架时间</p>
            <el-form
              ref="saletimeForm"
              :model="saletimeForm"
              :rules="saletimeRule"
              class="otherForm"
              label-position="right"
            >
              <div class="base-form-item radio-item">
                <el-radio
                  v-model="saletimeForm.saletime_type"
                  label="0"
                  @change="saletime_change"
                  >立即上架售卖</el-radio
                >
              </div>
              <div class="base-form-item">
                <el-radio
                  v-model="saletimeForm.saletime_type"
                  label="1"
                  @change="saletime_change"
                  >自定义上架时间</el-radio
                >
                <el-form-item prop="saletime_value" ref="saletime_value">
                    <el-date-picker
                    style="width: 200px"
                        :disabled="saletimeForm.saletime_type !== '1'"
                        v-model="saletimeForm.saletime_value"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
              </div>
              <div class="base-form-item radio-item">
                <el-radio
                  v-model="saletimeForm.saletime_type"
                  label="2"
                  @change="saletime_change"
                  >暂时售卖，放入仓库</el-radio
                >
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div class="stepBtn">
        <el-button type="default" @click="saveAndLook">保存并查看</el-button>
        <el-button type="primary" :disabled="disabled" @click="stepNextClick"
          >下一步</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCategoryList,
} from "../../../api/product";
import CategoryCascader from "../../Category/category-cascader"
import { validateForms } from '../../../utils/util'
import bus from './bus'
export default {
  components: {
    "category-cascader": CategoryCascader
  },
  data () {
    return {
        cacelOptions: [{
        value: '七天无理由退换货',
        label: '七天无理由退换货'
      }, {
        value: '拆封概不退换',
        label: '拆封概不退换'
      }],
      logisticsOption: [{
        value: '2020包邮',
        label: '2020包邮'
      }, {
        value: '货到付款10元',
        label: '货到付款10元'
      }],
      infoForm: {},
      infoRule: {
        product_name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
        category_id: [{ required: true, message: "请选择商品分类", trigger: "change" }],
        product_cacel: [{ required: true, message: "请选择退货模板", trigger: "change" }]
      },
      paramForm: {},
      logisticsForm: {
        logistics_type: '0'
      },
      logisticsRule: {
        money_value: [{ validator: this.validate, trigger: "blur" }],
        model_value: [{ validator: this.validate, trigger: "blur" }],
      },
      saletimeForm: {
        saletime_type: '0'
      },
      saletimeRule: {
        saletime_value: [{ validator: this.saletime_validate, trigger: "change" }],
      },
      productInfoForm: {},
      disabled: true,
      title: JSON.parse(localStorage.getItem("productInfo")).title || ''
    };
  },
  created () {
    // this.productForm = JSON.parse(localStorage.getItem("productInfo")).scope || []
  },
  computed: {
    newSkuList () {
      return Array.from(new Set(this.skuList))
    }
  },
  methods: {
    // 快递邮费切换rule
    logistics_change (val) {
      if (val === '0') {
        this.logisticsForm.model_value = ""
        this.$refs['model_value'].clearValidate()
      } else {
        this.logisticsForm.money_value = ""
        this.$refs['money_value'].clearValidate()
      }
    },
    validate (rule, value, callback) {
      if (!value) {
        if (rule.field == 'money_value' && this.logisticsForm.logistics_type == '0') {
          callback(new Error('请输入费用'));
        } else if (rule.field == 'model_value' && this.logisticsForm.logistics_type == '1') {
          callback(new Error('请选择运费模板'));
        }
      }
      callback()
    },
    saletime_change (val) {
      if (val !== '1') {
        this.saletimeForm.saletime_value = ""
        this.$refs['saletime_value'].clearValidate()
      }
    },
    saletime_validate (rule, value, callback) {
      if (!value) {
        if (this.saletimeForm.saletime_type === '1' && rule.field === 'saletime_value') {
          callback(new Error('请选择上架时间'))
        }
      }
      callback()
    },
    saveAndLook () {
      let arr = ['infoForm', 'logisticsForm', 'saletimeForm']
      let formRefs = this.saletimeForm.saletime_type === '1' ? arr : arr.slice(0, 3)
      let data = formRefs.map(val => this.$refs[val])
      validateForms(data)
        .then((res) => {
          if (res) {
            this.disabled = false
            let _form = this.logisticsForm
            _form.logistics_value = _form.money_value || _form.model_value
            delete _form.money_value
            delete _form.model_value

            this.productInfoForm = Object.assign({}, this.infoForm, this.paramForm, _form, this.saletimeForm)
            console.log(this.productInfoForm)
          }
        })
    },
    stepNextClick () {
      this.$emit('next-click', false)
      bus.$emit('getInfoData', this.productInfoForm)
    },
    handleSelectCategory (val) {
      this.infoForm.category_id = val
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>