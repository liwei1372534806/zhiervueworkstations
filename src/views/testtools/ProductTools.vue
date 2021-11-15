<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <a-form-model :model="productForm" :rules="productRules" class="ant-advanced-search-form">
        <a-collapse v-model="activeKey">
          <a-collapse-panel key="1" header="环境&提交寄卖">
            <a-form-model-item label="环境：">
              <a-radio-group v-model="productForm.env" button-style="solid" @change="changeTopic">
                <a-radio-button value="t">
                  T
                </a-radio-button>
                <a-radio-button value="lemonade">
                  lemonade
                </a-radio-button>
                <a-radio-button value="newjava">
                  newjava
                </a-radio-button>
                <a-radio-button value="pressure">
                  pressure
                </a-radio-button>
                <a-radio-button value="beta2">
                  beta2
                </a-radio-button>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="寄卖提交商品">
              <a-select
                v-model="productForm.consignment"
                placeholder="请选择是否走寄卖"
                style="width: 20%"
                :options="options"></a-select>
            </a-form-model-item>
            <a-row>
              <a-col :span="6">
                <a-form-model-item v-if="productForm.consignment===1" label="用户ID" prop="mobile">
                  <a-input style="width:50%" v-model="productForm.mobile"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item v-if="productForm.consignment===1" label="分类" prop="proc_type">
                  <a-select
                    v-model="productForm.proc_type"
                    show-search
                    placeholder="请选择一级分类"
                    style="width: 40%"
                    :options="productTypeOptions"></a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item v-if="productForm.consignment===1" label="品牌" prop="proc_brand">
                  <a-select
                    v-model="productForm.proc_brand"
                    show-search
                    placeholder="请选择品牌"
                    style="width: 50%"
                    :options="BrandOptions"></a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item v-if="productForm.consignment===1" label="物流单号" prop="logistics_no">
                  <a-input style="width: 50%" v-model="productForm.logistics_no"></a-input>
                </a-form-model-item>
              </a-col>

            </a-row>
            <a-form-model-item v-if="productForm.consignment===1" label="图片" prop="proc_img">
              <a-input style="width: 50%"></a-input>
            </a-form-model-item>
            <!--            <a-form-model-item v-if="productForm.consignment===1" :style="{ textAlign: 'center' }">-->
            <!--              <a-button type="primary">提交寄卖</a-button>-->
            <!--            </a-form-model-item>-->
          </a-collapse-panel>
          <a-collapse-panel key="2" header="选款审核&暂存库位">
            <!--            <a-form-model-item label="选款审核开关">-->
            <!--              <a-input></a-input>-->
            <!--            </a-form-model-item>-->
            <a-form-model-item label="暂存库位" prop="storage">
              <a-space>
                <a-input v-model="productForm.storage"></a-input>
                <a-button type="primary" size="small" @click="checkStorage">查询库位</a-button>
              </a-space>
            </a-form-model-item>
          </a-collapse-panel>

          <a-collapse-panel key="3" header="女装&包袋寄卖上架流程">
            <a-form-model-item label="包袋or女装">
              <a-select
                v-model="productForm.flow"
                placeholder="请选择是否走寄卖"
                style="width: 20%"
                :options="flowOptions"></a-select>
            </a-form-model-item>

            <a-form-model-item v-if="productForm.flow ===1" label="女装节点：">
              <a-checkbox-group v-model="productForm.dress" :options="dressOptions"></a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item v-if="productForm.flow ===0" label="包袋节点：">
              <a-checkbox-group v-model="productForm.bag" :options="bagOptions"></a-checkbox-group>
            </a-form-model-item>

          </a-collapse-panel>
        </a-collapse>
        <p></p>
        <a-form-model-item style="text-align: right">
          <a-button type="primary" @click="productSubmit">提交寄卖商品</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </page-header-wrapper>
</template>

<script>
import {getOptions, checkMobile, checkStorage, createProduct} from "@/api/product_manman";

export default {
  name: "ProductTools",
  data() {
    return {
      activeKey: ['1', '2', '3'],
      options: [{'title': "是", 'value': 1}],
      flowOptions: [{'title': "包袋", 'value': 0}, {'title': "女装", 'value': 1}],
      productTypeOptions: [],
      BrandOptions: [],
      dressOptions: [
        {"label": "签收", "value": 0},
        {label: "初筛", value: 1},
        {label: "初筛复检", value: 2},
        {label: "分拣", value: 3},
        {label: "自理", value: 4},
        {label: "熨烫消毒", value: 5},
        {label: "拍摄", value: 6},
        {label: "测量", value: 7},
        {label: "复核", value: 8},
        {label: "定价", value: 9},
        {label: "鉴定不达标", value: 10},],
      bagOptions: [
        {"label": "签收", "value": 0},
        {"label": "鉴定前分拣", "value": 1},
        {label: "鉴定", value: 2},
        {label: "鉴定复检", value: 3},
        {label: "材质录入", value: 4},
        {label: "护理", value: 5},
        {label: "测量", value: 6},
        {label: "拍摄", value: 7},
        {label: "复核", value: 8},
        {label: "定价", value: 9},
        {label: "鉴定不达标", value: 10}
      ],
      productForm: {
        'env': 't',
        'consignment': 1,
        'flow': 0,
        'logistics_no': '',
        'mobile': "",
        'proc_img': "",
        "proc_brand": '',
        "proc_type": '',
        'storage': '',
        'dress': [],
        'bag': []
      },
      productRules: {
        env: [{required: true, message: "请选择环境", trigger: 'blur'}],
        consignment: [{required: true, message: "请选择类型", trigger: 'blur'}],
        flow: [{required: true, message: "请选择流程类型", trigger: 'blur'}],
        mobile: [{required: true, message: "请输入手机号", trigger: 'blur'}],
        proc_brand: [{required: true, message: "请选择品牌", trigger: 'blur'}],
        proc_type: [{required: true, message: "请选择品类", trigger: 'blur'}],
        storage: [{required: true, message: "请输入库位", trigger: 'blur'}],
        proc_img: [{required: true, message: "请输入图片链接", trigger: 'blur'}],
        logistics_no: [{required: true, message: "请输入物流单号", trigger: 'blur'}]
      }
    }
  },
  created() {
    getOptions({env: this.productForm.env}).then(res => {

      if (res.code === 20000) {
        console.log(res.data)
        this.productTypeOptions = res.data.first_tree_data
        this.BrandOptions = res.data.brand_data
      }

    })
  },
  methods: {
    productSubmit() {
      createProduct(this.productForm).then(res => {
        if (res.code === 20001) {
          this.$message.info(res.msg)
        }
        if (res.code === 20000) {
          console.log(res)
          this.$message.success(res)
        }
      })
    },
    checkStorage() {
      checkStorage({env: this.productForm.env, storage: this.productForm.storage}).then(res => {
        this.$message.info(res.msg)
      })
    }, changeTopic() {
      getOptions({env: this.productForm.env}).then(res => {

        if (res.code === 20000) {
          this.productTypeOptions = res.data.first_tree_data
          this.BrandOptions = res.data.brand_data
        }

      })
    },
  }
}
</script>

<style>
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}

#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>