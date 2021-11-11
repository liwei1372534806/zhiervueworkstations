<template>
  <page-header-wrapper>
    <div id="components-form-demo-advanced-search">
      <a-form-model :model="productForm" class="ant-advanced-search-form">
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
                <a-form-model-item v-if="productForm.consignment===1" label="手机号">
                  <a-input style="width:50%"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item v-if="productForm.consignment===1" label="分类">
                  <a-select
                    v-model="productForm.proc_type"
                    show-search
                    placeholder="请选择一级分类"
                    style="width: 40%"
                    :options="productTypeOptions"></a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item v-if="productForm.consignment===1" label="品牌">
                  <a-select
                    v-model="productForm.proc_brand"
                    show-search
                    placeholder="请选择品牌"
                    style="width: 40%"
                    :options="BrandOptions"></a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="6">
                <a-form-model-item v-if="productForm.consignment===1" label="物流单号">
                  <a-input style="width: 50%"></a-input>
                </a-form-model-item>
              </a-col>

            </a-row>
            <a-form-model-item v-if="productForm.consignment===1" label="图片">
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
            <a-form-model-item label="暂存库位">
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
          <a-button type="primary">提交寄卖商品</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </page-header-wrapper>
</template>

<script>
export default {
  name: "ProductTools",
  data() {
    return {
      activeKey: ['1', '2', '3'],
      options: [{'title': "是", 'value': 1}],
      flowOptions: [{'title': "包袋", 'value': 0}, {'title': "女装", 'value': 1}],
      productTypeOptions: [{'title': "包袋", 'value': 78}, {'title': "女装", 'value': 8}, {
        'title': "配饰", 'value': 153
      }, {'title': "鞋靴", 'value': 154},
        {'title': "珠宝首饰", 'value': 287}, {'title': "腕表", 'value': 597}],
      BrandOptions: [{'title': "包袋", 'value': 0}, {'title': "女装", 'value': 1}],
      dressOptions: [
        {"label": "签收", "value": 0},
        {label: "鉴定", value: 1},
        {label: "鉴定不达标", value: 2},
        {label: "鉴定复检", value: 3},
        {label: "初筛", value: 4},
        {label: "护理", value: 5},
        {label: "拍摄", value: 6},
        {label: "复核", value: 7},
        {label: "定价", value: 8}],
      bagOptions: [
        {"label": "签收", "value": 0},
        {label: "鉴定", value: 1},
        {label: "材质录入", value: 2},
        {label: "鉴定不达标", value: 3},
        {label: "复核", value: 4},
        {label: "护理", value: 5},
        {label: "拍摄", value: 6},
        {label: "复核", value: 7},
        {label: "定价", value: 8}],
      productForm: {'env': 't', 'consignment': 1, 'flow': 0, "proc_type": '', 'storage': '', 'dress': [], 'bag': []}
    }
  },
  methods: {
    checkStorage() {
      console.log()
    }
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