"use strict";(self["webpackChunkfrontend_contable"]=self["webpackChunkfrontend_contable"]||[]).push([[686],{2118:function(e,o,t){t.d(o,{A:function(){return c}});var a=t(6768),l=t.p+"img/image.f199c5ca.png";const r={class:"barra-lateral"},i={class:"settings-section"};function n(e,o,t,n,s,u){const d=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)("div",r,[o[6]||(o[6]=(0,a.Lk)("div",{class:"logo"},[(0,a.Lk)("img",{src:l,alt:"Logo",class:"logo-img"}),(0,a.Lk)("span",{class:"logo-text"},"JAVB")],-1)),(0,a.Lk)("ul",null,[(0,a.Lk)("li",null,[(0,a.bF)(d,{to:"/home",class:"menu-item","active-class":"active"},{default:(0,a.k6)((()=>o[1]||(o[1]=[(0,a.eW)(" HOME ")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(d,{to:"/contactos",class:"menu-item","active-class":"active"},{default:(0,a.k6)((()=>o[2]||(o[2]=[(0,a.eW)(" CONTACTOS ")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(d,{to:"/ventas",class:"menu-item","active-class":"active"},{default:(0,a.k6)((()=>o[3]||(o[3]=[(0,a.eW)(" FACTURAS ")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(d,{to:"/facturas-recurrentes",class:"menu-item","active-class":"active"},{default:(0,a.k6)((()=>o[4]||(o[4]=[(0,a.eW)(" FACTURAS RECURRENTES ")]))),_:1})]),(0,a.Lk)("li",null,[(0,a.bF)(d,{to:"/cotizaciones",class:"menu-item","active-class":"active"},{default:(0,a.k6)((()=>o[5]||(o[5]=[(0,a.eW)(" COTIZACIONES ")]))),_:1})])]),(0,a.Lk)("div",i,[(0,a.Lk)("button",{onClick:o[0]||(o[0]=(...e)=>u.logout&&u.logout(...e)),class:"logout-btn"}," CERRAR SESIÓN ")])])}t(4114);var s={methods:{logout(){localStorage.clear(),this.$router.push("/")}}},u=t(1241);const d=(0,u.A)(s,[["render",n],["__scopeId","data-v-76605de2"]]);var c=d},3697:function(e,o,t){t.d(o,{A:function(){return C}});var a=t(6768),l=t(4232),r=t(5130);const i=["src"],n={class:"user-info"},s={class:"user-name"},u={class:"user-role"},d={key:0,class:"dialog-overlay"},c={class:"dialog"},m={class:"form-group"},p=["src"],f={class:"form-group"},k={class:"form-group"},h={class:"form-group"},b={class:"form-group"},L={class:"button-group"};function g(e,o,t,g,v,U){return(0,a.uX)(),(0,a.CE)("div",null,[(0,a.Lk)("div",{class:"user-bar",onClick:o[0]||(o[0]=(...e)=>U.openUserDialog&&U.openUserDialog(...e))},[(0,a.Lk)("img",{src:v.userProfileImage||v.defaultImage,alt:"Imagen de usuario",class:"profile-picture"},null,8,i),(0,a.Lk)("div",n,[(0,a.Lk)("span",s,(0,l.v_)(v.usuario||"USUARIO"),1),(0,a.Lk)("span",u,(0,l.v_)(v.apodo||"APODO"),1)])]),v.showDialog?((0,a.uX)(),(0,a.CE)("div",d,[(0,a.Lk)("div",c,[o[13]||(o[13]=(0,a.Lk)("h3",{class:"dialog-title"},"Información del Usuario",-1)),(0,a.Lk)("form",{onSubmit:o[7]||(o[7]=(0,r.D$)(((...e)=>U.updateUser&&U.updateUser(...e)),["prevent"]))},[(0,a.Lk)("div",m,[(0,a.Lk)("img",{src:v.userProfileImage||v.defaultImage,alt:"Imagen de perfil",class:"profile-image-preview"},null,8,p)]),(0,a.Lk)("div",f,[o[8]||(o[8]=(0,a.Lk)("label",{for:"profileImage"},"Actualizar Foto de Perfil:",-1)),(0,a.Lk)("input",{type:"file",id:"profileImage",onChange:o[1]||(o[1]=(...e)=>U.onFileChange&&U.onFileChange(...e))},null,32)]),(0,a.Lk)("div",k,[o[9]||(o[9]=(0,a.Lk)("label",{for:"usuario"},"Usuario:",-1)),(0,a.bo)((0,a.Lk)("input",{type:"text",id:"usuario","onUpdate:modelValue":o[2]||(o[2]=e=>v.editableUser.usuario=e),required:""},null,512),[[r.Jo,v.editableUser.usuario]])]),(0,a.Lk)("div",h,[o[10]||(o[10]=(0,a.Lk)("label",{for:"apodo"},"Apodo:",-1)),(0,a.bo)((0,a.Lk)("input",{type:"text",id:"apodo","onUpdate:modelValue":o[3]||(o[3]=e=>v.editableUser.apodo=e),required:""},null,512),[[r.Jo,v.editableUser.apodo]])]),(0,a.Lk)("div",b,[o[11]||(o[11]=(0,a.Lk)("label",{for:"password"},"Nueva Contraseña:",-1)),(0,a.bo)((0,a.Lk)("input",{type:"password",id:"password","onUpdate:modelValue":o[4]||(o[4]=e=>v.editableUser.password=e),placeholder:"Dejar vacío para no cambiar"},null,512),[[r.Jo,v.editableUser.password]])]),(0,a.Lk)("div",L,[o[12]||(o[12]=(0,a.Lk)("button",{type:"submit",class:"save-button"},"Guardar Cambios",-1)),(0,a.Lk)("button",{type:"button",onClick:o[5]||(o[5]=(...e)=>U.deleteUser&&U.deleteUser(...e)),class:"delete-button"}," Eliminar Usuario "),(0,a.Lk)("button",{type:"button",onClick:o[6]||(o[6]=(...e)=>U.closeUserDialog&&U.closeUserDialog(...e)),class:"close-button"}," Cerrar ")])],32)])])):(0,a.Q3)("",!0)])}t(4114),t(4603),t(7566),t(8721);var v=t(4373),U={data(){return{showDialog:!1,usuario:"",apodo:"",userProfileImage:"",defaultImage:"https://via.placeholder.com/50",editableUser:{usuario:"",apodo:"",password:"",profileImage:null},profileImage:null,backendUrl:"http://localhost:3000"}},created(){this.loadUserData()},methods:{async loadUserData(){try{const e=localStorage.getItem("token"),o=localStorage.getItem("id");if(!o||!e)return void console.error("No se encontró el ID del usuario o el token en el almacenamiento local.");const t=await v.A.get(`${this.backendUrl}/api/usuario/getbyId/${o}`,{headers:{Authorization:`Bearer ${e}`}});this.usuario=t.data.usuario||"USUARIO",this.apodo=t.data.apodo||"APODO",this.userProfileImage=this.getFullImageUrl(t.data.profileImage),this.editableUser=t.data}catch(e){console.error("Error al cargar los datos del usuario:",e)}},openUserDialog(){this.showDialog=!0},closeUserDialog(){this.showDialog=!1},getFullImageUrl(e){return`${this.backendUrl}${e}`},onFileChange(e){this.profileImage=e.target.files[0],this.userProfileImage=URL.createObjectURL(this.profileImage)},async updateUser(){try{const e=localStorage.getItem("token"),o=localStorage.getItem("id");if(!o||!e)return void alert("No se encontró el ID del usuario o el token en el almacenamiento local.");const t=new FormData;t.append("usuario",this.editableUser.usuario),t.append("apodo",this.editableUser.apodo),this.editableUser.password&&t.append("password",this.editableUser.password),this.profileImage&&t.append("profileImage",this.profileImage),await v.A.put(`${this.backendUrl}/api/usuario/update/${o}`,t,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"multipart/form-data"}}),this.usuario=this.editableUser.usuario,this.apodo=this.editableUser.apodo,alert("Información actualizada correctamente."),this.closeUserDialog()}catch(e){console.error("Error al actualizar usuario:",e),alert("No se pudo actualizar la información.")}},async deleteUser(){try{const e=localStorage.getItem("token"),o=localStorage.getItem("id");if(!o||!e)return void alert("No se encontró el ID del usuario o el token en el almacenamiento local.");await v.A.delete(`${this.backendUrl}/api/usuario/delete/${o}`,{headers:{Authorization:`Bearer ${e}`}}),alert("Usuario eliminado correctamente."),localStorage.clear(),this.$router.push("/")}catch(e){console.error("Error al eliminar usuario:",e),alert("No se pudo eliminar el usuario.")}}}},I=t(1241);const y=(0,I.A)(U,[["render",g],["__scopeId","data-v-999e8b52"]]);var C=y},2352:function(e,o,t){t.r(o),t.d(o,{default:function(){return Y}});var a=t(6768),l=t(4232),r=t(5130);const i={class:"page-container"},n={class:"main-content"},s={class:"content"},u={class:"header"},d={class:"table-section"},c={class:"table-container"},m=["onClick"],p=["onClick"],f={key:0,class:"modal-overlay fullscreen"},k={class:"modal fullscreen-content"},h={class:"modal-title"},b={class:"form-header"},L={class:"form-group"},g={class:"form-title"},v={class:"form-invoice-number"},U={class:"form-row"},I={class:"form-group"},y={class:"form-group"},C={class:"form-row"},A={class:"form-group"},F={class:"form-group"},V={class:"form-group"},w={class:"table-container"},E=["onUpdate:modelValue"],D=["onUpdate:modelValue"],S=["onUpdate:modelValue"],N=["onUpdate:modelValue"],_=["onUpdate:modelValue"],J=["onUpdate:modelValue"],$=["onUpdate:modelValue"],P=["onClick"],T={class:"form-row"},q={class:"form-group"},O={class:"form-group"},R={class:"form-group"},M={class:"form-row"},x={class:"form-group full-width"},z={class:"form-group full-width"},X={class:"form-footer"},B={type:"submit",class:"save-button"};function W(e,o,t,W,j,G){const K=(0,a.g2)("BarraLateral"),Q=(0,a.g2)("Userbar");return(0,a.uX)(),(0,a.CE)("div",i,[(0,a.bF)(K),(0,a.Lk)("div",n,[(0,a.bF)(Q),(0,a.Lk)("main",s,[(0,a.Lk)("header",u,[o[16]||(o[16]=(0,a.Lk)("div",{class:"header-left"},[(0,a.Lk)("h1",{class:"title"},"FACTURAS")],-1)),(0,a.Lk)("button",{class:"add-contact-button",onClick:o[0]||(o[0]=(...e)=>G.openAddInvoiceModal&&G.openAddInvoiceModal(...e))}," + Agregar nueva Factura ")]),(0,a.Lk)("section",d,[(0,a.Lk)("div",c,[(0,a.Lk)("table",null,[o[17]||(o[17]=(0,a.Lk)("thead",null,[(0,a.Lk)("tr",null,[(0,a.Lk)("th",null,"Nombre"),(0,a.Lk)("th",null,"Tax ID"),(0,a.Lk)("th",null,"Teléfono"),(0,a.Lk)("th",null,"Subtotal"),(0,a.Lk)("th",null,"Total"),(0,a.Lk)("th",null,"Acciones")])],-1)),(0,a.Lk)("tbody",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(j.facturas,(e=>((0,a.uX)(),(0,a.CE)("tr",{key:e.id},[(0,a.Lk)("td",null,(0,l.v_)(e.contacto),1),(0,a.Lk)("td",null,(0,l.v_)(e.taxId||"N/A"),1),(0,a.Lk)("td",null,(0,l.v_)(e.telefono),1),(0,a.Lk)("td",null,(0,l.v_)(e.subtotal),1),(0,a.Lk)("td",null,(0,l.v_)(e.total),1),(0,a.Lk)("td",null,[(0,a.Lk)("button",{class:"edit-button",onClick:o=>G.editInvoice(e.id)}," ✏️ ",8,m),(0,a.Lk)("button",{class:"delete-button",onClick:o=>G.deleteInvoice(e.id)}," 🗑️ ",8,p)])])))),128))])])])]),j.showModal?((0,a.uX)(),(0,a.CE)("div",f,[(0,a.Lk)("div",k,[(0,a.Lk)("h2",h,(0,l.v_)(j.isEditing?"Editar Factura":"Nueva Factura"),1),(0,a.Lk)("form",{onSubmit:o[15]||(o[15]=(0,r.D$)(((...e)=>G.saveInvoice&&G.saveInvoice(...e)),["prevent"]))},[(0,a.Lk)("div",b,[(0,a.Lk)("div",L,[o[18]||(o[18]=(0,a.Lk)("label",{for:"id"},"ID*",-1)),(0,a.bo)((0,a.Lk)("input",{type:"text",id:"id","onUpdate:modelValue":o[1]||(o[1]=e=>j.form.id=e),placeholder:"Ingrese un ID único",required:""},null,512),[[r.Jo,j.form.id]])]),o[21]||(o[21]=(0,a.Lk)("div",{class:"form-logo"},[(0,a.Lk)("p",null,"Usar Logo")],-1)),(0,a.Lk)("div",g,[(0,a.Lk)("h3",null,(0,l.v_)(j.form.contacto||"Nuevo Cliente"),1),o[19]||(o[19]=(0,a.Lk)("button",{type:"button",class:"edit-link"},"Editar",-1))]),(0,a.Lk)("div",v,[o[20]||(o[20]=(0,a.Lk)("label",{for:"numeroNota"},"No.",-1)),(0,a.bo)((0,a.Lk)("input",{type:"number",id:"numeroNota","onUpdate:modelValue":o[2]||(o[2]=e=>j.form.numeroNota=e),required:""},null,512),[[r.Jo,j.form.numeroNota]])])]),(0,a.Lk)("div",U,[(0,a.Lk)("div",I,[o[22]||(o[22]=(0,a.Lk)("label",{for:"contacto"},"Contacto*",-1)),(0,a.bo)((0,a.Lk)("input",{type:"text",id:"contacto","onUpdate:modelValue":o[3]||(o[3]=e=>j.form.contacto=e),placeholder:"Buscar cliente",required:""},null,512),[[r.Jo,j.form.contacto]])]),(0,a.Lk)("div",y,[o[23]||(o[23]=(0,a.Lk)("label",{for:"telefono"},"Teléfono",-1)),(0,a.bo)((0,a.Lk)("input",{type:"text",id:"telefono","onUpdate:modelValue":o[4]||(o[4]=e=>j.form.telefono=e),required:""},null,512),[[r.Jo,j.form.telefono]])])]),(0,a.Lk)("div",C,[(0,a.Lk)("div",A,[o[24]||(o[24]=(0,a.Lk)("label",{for:"fecha"},"Fecha*",-1)),(0,a.bo)((0,a.Lk)("input",{type:"date",id:"fecha","onUpdate:modelValue":o[5]||(o[5]=e=>j.form.fecha=e),required:""},null,512),[[r.Jo,j.form.fecha]])]),(0,a.Lk)("div",F,[o[26]||(o[26]=(0,a.Lk)("label",{for:"tipoPago"},"Tipo de pago*",-1)),(0,a.bo)((0,a.Lk)("select",{id:"tipoPago","onUpdate:modelValue":o[6]||(o[6]=e=>j.form.tipoPago=e),required:""},o[25]||(o[25]=[(0,a.Lk)("option",{value:"Contado"},"Contado",-1),(0,a.Lk)("option",{value:"Crédito"},"Crédito",-1)]),512),[[r.u1,j.form.tipoPago]])]),(0,a.Lk)("div",V,[o[27]||(o[27]=(0,a.Lk)("label",{for:"fechaVencimiento"},"Fecha de Vencimiento*",-1)),(0,a.bo)((0,a.Lk)("input",{type:"date",id:"fechaVencimiento","onUpdate:modelValue":o[7]||(o[7]=e=>j.form.fechaVencimiento=e),required:""},null,512),[[r.Jo,j.form.fechaVencimiento]])])]),(0,a.Lk)("div",w,[(0,a.Lk)("table",null,[o[28]||(o[28]=(0,a.Lk)("thead",null,[(0,a.Lk)("tr",null,[(0,a.Lk)("th",null,"Referencia"),(0,a.Lk)("th",null,"Precio"),(0,a.Lk)("th",null,"Desc%"),(0,a.Lk)("th",null,"Impuesto"),(0,a.Lk)("th",null,"Descripción"),(0,a.Lk)("th",null,"Cantidad"),(0,a.Lk)("th",null,"Total"),(0,a.Lk)("th",null,"Acción")])],-1)),(0,a.Lk)("tbody",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(j.form.items,((e,o)=>((0,a.uX)(),(0,a.CE)("tr",{key:o},[(0,a.Lk)("td",null,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":o=>e.referencia=o,type:"text"},null,8,E),[[r.Jo,e.referencia]])]),(0,a.Lk)("td",null,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":o=>e.precio=o,type:"number"},null,8,D),[[r.Jo,e.precio,void 0,{number:!0}]])]),(0,a.Lk)("td",null,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":o=>e.descuento=o,type:"number"},null,8,S),[[r.Jo,e.descuento,void 0,{number:!0}]])]),(0,a.Lk)("td",null,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":o=>e.impuesto=o,type:"number"},null,8,N),[[r.Jo,e.impuesto,void 0,{number:!0}]])]),(0,a.Lk)("td",null,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":o=>e.descripcion=o,type:"text"},null,8,_),[[r.Jo,e.descripcion]])]),(0,a.Lk)("td",null,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":o=>e.cantidad=o,type:"number"},null,8,J),[[r.Jo,e.cantidad,void 0,{number:!0}]])]),(0,a.Lk)("td",null,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":o=>e.total=o,type:"number"},null,8,$),[[r.Jo,e.total,void 0,{number:!0}]])]),(0,a.Lk)("td",null,[(0,a.Lk)("button",{type:"button",onClick:e=>G.removeItem(o)}," ❌ ",8,P)])])))),128))])]),(0,a.Lk)("button",{type:"button",class:"add-item-button",onClick:o[8]||(o[8]=(...e)=>G.addItem&&G.addItem(...e))}," + Agregar nueva fila ")]),(0,a.Lk)("div",T,[(0,a.Lk)("div",q,[o[29]||(o[29]=(0,a.Lk)("label",{for:"subtotal"},"Subtotal*",-1)),(0,a.bo)((0,a.Lk)("input",{type:"number",id:"subtotal","onUpdate:modelValue":o[9]||(o[9]=e=>j.form.subtotal=e),required:""},null,512),[[r.Jo,j.form.subtotal,void 0,{number:!0}]])]),(0,a.Lk)("div",O,[o[30]||(o[30]=(0,a.Lk)("label",{for:"impuestos"},"Impuestos*",-1)),(0,a.bo)((0,a.Lk)("input",{type:"number",id:"impuestos","onUpdate:modelValue":o[10]||(o[10]=e=>j.form.impuestos=e),required:""},null,512),[[r.Jo,j.form.impuestos,void 0,{number:!0}]])]),(0,a.Lk)("div",R,[o[31]||(o[31]=(0,a.Lk)("label",{for:"total"},"Total*",-1)),(0,a.bo)((0,a.Lk)("input",{type:"number",id:"total","onUpdate:modelValue":o[11]||(o[11]=e=>j.form.total=e),required:""},null,512),[[r.Jo,j.form.total,void 0,{number:!0}]])])]),(0,a.Lk)("div",M,[(0,a.Lk)("div",x,[o[32]||(o[32]=(0,a.Lk)("label",{for:"terminos"},"Términos y condiciones",-1)),(0,a.bo)((0,a.Lk)("textarea",{id:"terminos","onUpdate:modelValue":o[12]||(o[12]=e=>j.form.terminos=e),placeholder:"Ingresa los términos y condiciones",required:""},null,512),[[r.Jo,j.form.terminos]])]),(0,a.Lk)("div",z,[o[33]||(o[33]=(0,a.Lk)("label",{for:"notas"},"Notas",-1)),(0,a.bo)((0,a.Lk)("textarea",{id:"notas","onUpdate:modelValue":o[13]||(o[13]=e=>j.form.notas=e),placeholder:"Ingresa notas adicionales"},null,512),[[r.Jo,j.form.notas]])])]),(0,a.Lk)("div",X,[(0,a.Lk)("button",{type:"button",class:"cancel-button",onClick:o[14]||(o[14]=(...e)=>G.closeModal&&G.closeModal(...e))}," Cancelar "),(0,a.Lk)("button",B,(0,l.v_)(j.isEditing?"Actualizar":"Guardar"),1)])],32)])])):(0,a.Q3)("",!0)])])])}t(4114),t(8992),t(4520),t(2577);var j=t(4373),G=t(2118),K=t(3697),Q={components:{BarraLateral:G.A,Userbar:K.A},data(){return{selectedSection:"Facturas",facturas:[],showModal:!1,isEditing:!1,form:{id:"",numeroNota:0,contacto:"",telefono:"",fecha:"",tipoPago:"Contado",termino:"",fechaVencimiento:"",items:[{referencia:"",precio:0,descuento:0,impuesto:0,descripcion:"",cantidad:0,total:0}],subtotal:0,impuestos:0,total:0,terminos:"",notas:""},backendUrl:"http://localhost:3000/api/factura",loading:!1}},methods:{async fetchFacturas(){try{this.loading=!0;const e=await j.A.get(`${this.backendUrl}/list`);this.facturas=e.data}catch(e){console.error("Error al obtener las facturas:",e),alert("Ocurrió un error al obtener las facturas.")}finally{this.loading=!1}},changeSection(e){this.selectedSection=e,"Facturas"===e&&this.fetchFacturas()},openAddInvoiceModal(){this.isEditing=!1,this.resetForm(),this.showModal=!0},editInvoice(e){const o=this.facturas.find((o=>o.id===e));o?(this.isEditing=!0,this.form={...o},this.showModal=!0):alert("Factura no encontrada.")},async deleteInvoice(e){if(confirm("¿Estás seguro de eliminar esta factura?"))try{this.loading=!0,await j.A.delete(`${this.backendUrl}/delete/${e}`),this.facturas=this.facturas.filter((o=>o.id!==e)),alert("Factura eliminada correctamente.")}catch(o){console.error("Error al eliminar la factura:",o),alert("No se pudo eliminar la factura.")}finally{this.loading=!1}},async saveInvoice(){try{this.loading=!0;const e={...this.form};if(!this.validateForm(e))return void alert("Por favor, completa todos los campos requeridos.");this.isEditing?(await j.A.put(`${this.backendUrl}/update/${this.form.id}`,e),alert("Factura actualizada correctamente.")):(await j.A.post(`${this.backendUrl}/create`,e),alert("Factura creada correctamente.")),this.closeModal(),this.fetchFacturas()}catch(e){console.error("Error al guardar la factura:",e),alert("Ocurrió un error al guardar la factura.")}finally{this.loading=!1}},validateForm(e){if(!e.id||!e.numeroNota||!e.contacto||!e.telefono||!e.fecha||!e.tipoPago||!e.fechaVencimiento||!e.subtotal||!e.impuestos||!e.total||!e.items.length)return!1;for(const o of e.items)if(!o.referencia||!o.precio||!o.descuento||!o.impuesto||!o.descripcion||!o.cantidad||!o.total)return!1;return!0},addItem(){this.form.items.push({referencia:"",precio:0,descuento:0,impuesto:0,descripcion:"",cantidad:0,total:0})},removeItem(e){this.form.items.splice(e,1)},closeModal(){this.showModal=!1,this.resetForm()},resetForm(){this.form={id:"",numeroNota:0,contacto:"",telefono:"",fecha:"",tipoPago:"Contado",termino:"",fechaVencimiento:"",items:[{referencia:"",precio:0,descuento:0,impuesto:0,descripcion:"",cantidad:0,total:0}],subtotal:0,impuestos:0,total:0,terminos:"",notas:""}}},mounted(){this.fetchFacturas()}},H=t(1241);const Z=(0,H.A)(Q,[["render",W],["__scopeId","data-v-1abe5643"]]);var Y=Z}}]);
//# sourceMappingURL=686.b3c8ec4b.js.map