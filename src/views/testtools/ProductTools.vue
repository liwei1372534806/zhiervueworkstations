<template>
  <page-header-wrapper>
    <div id="enviroment">
      <a-form-model-item label="环境选择：">
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
          <a-radio-button value="r">
            r
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>
    </div>
    <div id="components-form-demo-advanced-search">
      <a-form-model :model="productForm" :rules="productRules" class="ant-advanced-search-form">
        <a-collapse v-model="activeKey">
          <a-collapse-panel key="1" header="APP提交商品">

            <a-form-model-item label="APP提交商品">
              <a-select
                v-model="productForm.consignment"
                placeholder="请选择是否走寄卖"
                style="width: 20%"
                :options="options"></a-select>
            </a-form-model-item>
            <a-row>
              <a-col :span="6">
                <a-form-model-item v-if="productForm.consignment===1" label="用户ID" prop="userid">
                  <a-input style="width:50%" v-model="productForm.userid"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :spavv
                     n="6">
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
                    :options="BrandOptions">
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item v-if="productForm.consignment===1" label="提交商品数量" prop="proc_nums">
                  <a-input style="width:50%" v-model="productForm.proc_nums"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>

            <a-form-model-item v-if="productForm.consignment===1" label="图片" prop="proc_img">
              <a-input style="width: 50%" v-model="productForm.proc_img"></a-input>
            </a-form-model-item>

            <p></p>

            <!--            <a-form-model-item style="text-align: right">-->
            <!--              <a-button type="primary" @click="app_submit_product">App提交寄卖商品</a-button>-->
            <!--            </a-form-model-item>-->
            <a-form-model-item style="text-align: right">
              <el-row>
                <el-button type="primary" @click="app_submit_product">Step1：App提交寄卖商品</el-button>
                <el-button type="primary">Step2：后台审核同意商品</el-button>
                <el-button type="primary">Step3：APP自主寄出商品</el-button>
              </el-row>
            </a-form-model-item>

            <!--            <a-form-model-item v-if="productForm.consignment===1" :style="{ textAlign: 'center' }">-->
            <!--              <a-button type="primary">提交寄卖</a-button>-->
            <!--            </a-form-model-item>-->
          </a-collapse-panel>

        </a-collapse>

      </a-form-model>
    </div>

  </page-header-wrapper>
</template>

<script>
  // 导入另外一个文件或者文件中的方法--><!-- 导入另外一个文件或者文件中的方法
  import {getOptions, appsubmitProduct} from "@/api/product_manman";
  export default {
    name: "ProductTools",
    data() {
      return {
        activeKey: ['1', '2', '3'],
        options: [{'title': "是", 'value': 1}],
        flowOptions: [{'title': "包袋", 'value': 0}, {'title': "女装", 'value': 1}],
        productTypeOptions: [],
        BrandOptions: [],
        productForm: {
          'env': 't',
          'consignment': 1,
          // 'flow': 0,
          // 'logistics_no': '',
          'userid': "",
          'proc_img': "",
          "proc_brand": '',
          "proc_type": '',
          // 'storage': '',
          // 'dress': [],
          'bag': [],
          "proc_nums": '',
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
      app_submit_product() {
        appsubmitProduct(this.productForm).then(res => {
          if (res.code === 20001) {
            this.$message.error(res.msg)
          }
          if (res.code === 20000) {
            console.log(res)
            this.$message.success(res.msg)
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