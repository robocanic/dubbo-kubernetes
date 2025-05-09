<!--
  ~ Licensed to the Apache Software Foundation (ASF) under one or more
  ~ contributor license agreements.  See the NOTICE file distributed with
  ~ this work for additional information regarding copyright ownership.
  ~ The ASF licenses this file to You under the Apache License, Version 2.0
  ~ (the "License"); you may not use this file except in compliance with
  ~ the License.  You may obtain a copy of the License at
  ~
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
-->

<template>
  <a-card>
    <a-flex style="width: 100%">
      <a-col :span="isDrawerOpened ? 24 - sliderSpan : 24" class="left">
        <a-flex vertical align="end">
          <a-button type="text" style="color: #0a90d5" @click="isDrawerOpened = !isDrawerOpened">
            字段说明
            <DoubleLeftOutlined v-if="!isDrawerOpened" />
            <DoubleRightOutlined v-else />
          </a-button>

          <div class="editorBox">
            <MonacoEditor
              v-model:modelValue="YAMLValue"
              theme="vs-dark"
              :height="500"
              language="yaml"
              :readonly="isReadonly"
            />
          </div>
        </a-flex>
        <a-affix :offset-bottom="10">
          <div class="bottom-action-footer">
            <a-space align="center" size="large">
              <a-button type="primary" @click="updateRoutingRule"> 确认</a-button>
              <a-button> 取消</a-button>
            </a-space>
          </div>
        </a-affix>
      </a-col>

      <a-col :span="isDrawerOpened ? sliderSpan : 0" class="right">
        <a-card v-if="isDrawerOpened" class="sliderBox">
          <div>
            <a-descriptions title="字段说明" :column="1">
              <a-descriptions-item label="key">
                作用对象<br />
                可能的值：Dubbo应用名或者服务名
              </a-descriptions-item>
              <a-descriptions-item label="scope">
                规则粒度<br />
                可能的值：application, service
              </a-descriptions-item>
              <a-descriptions-item label="force">
                容错保护<br />
                可能的值：true, false<br />
                描述：如果为true，则路由筛选后若没有可用的地址则会直接报异常；如果为false，则会从可用地址中选择完成RPC调用
              </a-descriptions-item>
              <a-descriptions-item label="runtime">
                运行时生效<br />
                可能的值：true, false<br />
                描述：如果为true，则该rule下的所有路由将会实时生效；若为false，则只有在启动时才会生效
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </a-card>
      </a-col>
    </a-flex>
  </a-card>
</template>

<script setup lang="ts">
import MonacoEditor from '@/components/editor/MonacoEditor.vue'
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { getConditionRuleDetailAPI, updateConditionRuleAPI } from '@/api/service/traffic'
import { useRoute } from 'vue-router'
import yaml from 'js-yaml'

const route = useRoute()
const isReadonly = ref(false)

const isDrawerOpened = ref(false)

const sliderSpan = ref(8)

// Condition routing details
const conditionRuleDetail = reactive({
  configVersion: 'v3.0',
  scope: 'service',
  key: 'org.apache.dubbo.samples.UserService',
  enabled: true,
  runtime: true,
  force: false,
  conditions: ['=>host!=192.168.0.68']
})

const YAMLValue = ref(
  'configVersion: v3.0\n' +
    'force: false\n' +
    'enabled: true\n' +
    'runtime: false\n' +
    'key: shop-detail\n' +
    'tags:\n' +
    '  - name: gray\n' +
    '    match:\n' +
    '      - key: env\n' +
    '        value:\n' +
    '          exact: gray'
)

// Get condition routing details
async function getRoutingRuleDetail() {
  let res = await getConditionRuleDetailAPI(<string>route.params?.ruleName)
  if (res?.code === 200) {
    const conditionName = route.params?.ruleName
    if (conditionName && res.data.scope === 'service') {
      const arr = conditionName?.split(':')
      res.data.configVersion = arr[1]
      res.data.group = arr[2]?.split('.')[0]
    }
    YAMLValue.value = yaml.dump(res?.data)
  }
}

const updateRoutingRule = async () => {
  // console.log('ymal',YAMLValue.value)
  const data = yaml.load(YAMLValue.value)
  const res = await updateConditionRuleAPI(<string>route.params?.ruleName, data)
  if (res.code === 200) {
    await getRoutingRuleDetail()
  }
}

onMounted(() => {
  getRoutingRuleDetail()
})
</script>

<style scoped lang="less">
.editorBox {
  border-radius: 0.3rem;
  overflow: hidden;
  width: 100%;
}

.bottom-action-footer {
  width: 100%;
  background-color: white;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* 添加顶部阴影 */
}

.sliderBox {
  margin-left: 5px;
  max-height: 530px;
  overflow: auto;
}

&:deep(.left.ant-col) {
  transition: all 0.5s ease;
}

&:deep(.right.ant-col) {
  transition: all 0.5s ease;
}
</style>
