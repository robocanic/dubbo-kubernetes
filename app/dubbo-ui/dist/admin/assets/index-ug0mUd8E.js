import{d as I,k as b,b as g,r as w,O as R,f as o,c as t,t as n,h as i,P as S,K as D,e as x,o as s,y as r,H as G,I as O,z as y,J as m,F as h,m as T,_ as V}from"./index-PIJJkkQe.js";import{e as $}from"./traffic-W0KeQm-r.js";import{S as E,a as A,s as d}from"./SearchUtil-x5OY2Hus.js";import"./request-5Xt99UU9.js";const B={class:"__container_traffic_config_index"},M=["onClick"],P=I({__name:"index",setup(Y){b(a=>({76145780:i(S)}));const u=g();let N=[{title:"ruleName",key:"ruleName",dataIndex:"ruleName",sorter:(a,e)=>d(a.appName,e.appName),width:140},{title:"ruleGranularity",key:"ruleGranularity",dataIndex:"ruleGranularity",render:(a,e)=>e.isService?"服务":"应用",width:100,sorter:(a,e)=>d(a.instanceNum,e.instanceNum)},{title:"createTime",key:"createTime",dataIndex:"createTime",width:120,sorter:(a,e)=>d(a.instanceNum,e.instanceNum)},{title:"enable",key:"enable",dataIndex:"enable",render:(a,e)=>e.enable?"是":"否",width:120,sorter:(a,e)=>d(a.instanceNum,e.instanceNum)},{title:"operation",key:"operation",dataIndex:"operation",width:200}];const p=w(new E([{label:"serviceGovernance",param:"serviceGovernance",placeholder:"typeRoutingRules",style:{width:"200px"}}],$,N));R(()=>{p.onSearch()});const C=()=>{};return D(T.SEARCH_DOMAIN,p),(a,e)=>{const c=x("a-button"),v=x("a-popconfirm");return s(),o("div",B,[t(A,{"search-domain":p},{customOperation:n(()=>[t(c,{type:"primary"},{default:n(()=>[r("新增动态配置")]),_:1})]),bodyCell:n(({text:_,column:l,record:f})=>[l.dataIndex==="ruleName"?(s(),o("span",{key:0,class:"config-link",onClick:k=>i(u).push(`/traffic/dynamicConfig/formview/${f.ruleName}/0`)},[G("b",null,[t(i(O),{style:{"margin-bottom":"-2px"},icon:"material-symbols:attach-file-rounded"}),r(" "+y(_),1)])],8,M)):m("",!0),l.dataIndex==="ruleGranularity"?(s(),o(h,{key:1},[r(y(_?"服务":"应用"),1)],64)):m("",!0),l.dataIndex==="enable"?(s(),o(h,{key:2},[r(y(_?"启用":"禁用"),1)],64)):m("",!0),l.dataIndex==="operation"?(s(),o(h,{key:3},[t(c,{type:"link",onClick:k=>i(u).push(`/traffic/dynamicConfig/formview/${f.ruleName}/0`)},{default:n(()=>[r("查看")]),_:2},1032,["onClick"]),t(c,{type:"link",onClick:k=>i(u).push(`/traffic/dynamicConfig/formview/${f.ruleName}/1`)},{default:n(()=>[r(" 修改 ")]),_:2},1032,["onClick"]),t(v,{title:"确认删除该动态配置？","ok-text":"Yes","cancel-text":"No",onConfirm:C},{default:n(()=>[t(c,{type:"link"},{default:n(()=>[r("删除")]),_:1})]),_:1})],64)):m("",!0)]),_:1},8,["search-domain"])])}}}),z=V(P,[["__scopeId","data-v-6228fce6"]]);export{z as default};
