import{s as T,w as E}from"./app-p7pPCU4K.js";var l="org.vuejs.vuepress",v="VuePress",I=v,r=l,N=v,i="client-data",a="Client Data",g=(p,n)=>{T({app:p,id:l,label:v,packageName:"@vuepress/client",homepage:"https://vuepress.vuejs.org",logo:"https://vuepress.vuejs.org/images/hero.png",componentStateTypes:[I]},t=>{const c=Object.entries(n),u=Object.keys(n),d=Object.values(n);t.on.inspectComponent(e=>{e.instanceData.state.push(...c.map(([s,o])=>({type:I,editable:!1,key:s,value:o.value})))}),t.addInspector({id:r,label:N,icon:"article"}),t.on.getInspectorTree(e=>{e.inspectorId===r&&(e.rootNodes=[{id:i,label:a,children:u.map(s=>({id:s,label:s}))}])}),t.on.getInspectorState(e=>{e.inspectorId===r&&(e.nodeId===i&&(e.state={[a]:c.map(([s,o])=>({key:s,value:o.value}))}),u.includes(e.nodeId)&&(e.state={[a]:[{key:e.nodeId,value:n[e.nodeId].value}]}))}),E(d,()=>{t.notifyComponentUpdate(),t.sendInspectorState(r)})})};export{g as setupDevtools};
