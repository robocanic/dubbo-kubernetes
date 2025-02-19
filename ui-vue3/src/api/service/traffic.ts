/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import request from '@/base/http/request'

export const searchRoutingRule = (params: any): Promise<any> => {
  return request({
    url: '/condition-rule/search',
    method: 'get',
    params
  })
}

// Get condition routing details
export const getConditionRuleDetailAPI = (ruleName: string): Promise<any> => {
  return request({
    url: `/condition-rule/${ruleName}`,
    method: 'get'
  })
}

// Delete condition routing.
export const deleteConditionRuleAPI = (ruleName: string): Promise<any> => {
  return request({
    url: `/condition-rule/${ruleName}`,
    method: 'delete'
  })
}

export const searchTagRule = (params: any): Promise<any> => {
  return request({
    url: '/tag-rule/search',
    method: 'get',
    params
  })
}

// Delete tag routing.
export const deleteTagRuleAPI = (ruleName: string): Promise<any> => {
  return request({
    url: `/tag-rule/${ruleName}`,
    method: 'delete'
  })
}

// Get tag routing details.
export const getTagRuleDetailAPI = (ruleName: string): Promise<any> => {
  return request({
    url: `/tag-rule/${ruleName}`,
    method: 'get'
  })
}

export const searchDynamicConfig = (params: any): Promise<any> => {
  return request({
    url: '/configurator/search',
    method: 'get',
    params
  })
}

export const searchVirtualService = (params: any): Promise<any> => {
  return request({
    url: '/virtualService/search',
    method: 'get',
    params
  })
}

export const searchDestinationRule = (params: any): Promise<any> => {
  return request({
    url: '/configurator/search',
    method: 'get',
    params
  })
}

export const getConfiguratorDetail = (params: any): Promise<any> => {
  return request({
    url: `/configurator/${encodeURIComponent(params.name)}`,
    method: 'get',
  })
}
export const saveConfiguratorDetail = (params: any, data:any): Promise<any> => {
  return request({
    url: `/configurator/${encodeURIComponent(params.name)}`,
    method: 'put',
    data
  })
}

// TODO Perform front-end and back-end joint debugging
