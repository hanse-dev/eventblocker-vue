import{q as p,e as f,c as n,a as s,F as c,t as i,f as l,b as m,u as v,z as b,j as _,o as r}from"./vendor-D2h_NbJw.js";import{_ as h,u as g}from"./index-BWLtSEKQ.js";const w={class:"container py-5"},k={class:"row justify-content-center"},y={class:"col-12 col-md-8 col-lg-6"},D={class:"card shadow-sm"},x={class:"card-body text-center p-5"},B={class:"appointment-details"},E={class:"row g-3 mb-4"},S={class:"col-12"},T={class:"p-3 bg-light rounded"},V={class:"row mb-0"},F={class:"col-sm-8"},C={class:"col-sm-8"},N={class:"col-sm-8"},j={class:"col-sm-8"},z={class:"text-muted"},I={class:"mt-4"},L={__name:"ConfirmationView",setup(R){const d=b(),a=_(),u=g(),e=p(null);return f(async()=>{if(!d.params.id){a.push("/");return}try{const o=await fetch(`http://localhost:3000/api/dates/${d.params.id}`);if(!o.ok)throw new Error("Failed to fetch appointment");e.value=await o.json()}catch(o){console.error("Failed to fetch appointment details:",o),u.error("Fehler beim Laden der Termindetails"),a.push("/")}}),(o,t)=>(r(),n("div",w,[s("div",k,[s("div",y,[s("div",D,[s("div",x,[t[11]||(t[11]=s("h1",{class:"card-title mb-4"},"Buchung bestätigt",-1)),e.value?(r(),n(c,{key:0},[t[7]||(t[7]=s("div",{class:"confirmation-icon mb-4"},[s("i",{class:"bi bi-check-circle-fill text-success"})],-1)),t[8]||(t[8]=s("h2",{class:"h4 mb-4"}," Vielen Dank für Ihre Buchung! ",-1)),s("div",B,[s("div",E,[s("div",S,[s("div",T,[t[6]||(t[6]=s("h3",{class:"h5 mb-3"},"Termindetails",-1)),s("dl",V,[t[2]||(t[2]=s("dt",{class:"col-sm-4"},"Termin",-1)),s("dd",F,i(e.value.title),1),t[3]||(t[3]=s("dt",{class:"col-sm-4"},"Datum",-1)),s("dd",C,i(new Date(e.value.date).toLocaleDateString("de-DE")),1),t[4]||(t[4]=s("dt",{class:"col-sm-4"},"Uhrzeit",-1)),s("dd",N,i(new Date(e.value.startTime).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"})),1),t[5]||(t[5]=s("dt",{class:"col-sm-4"},"Ort",-1)),s("dd",j,[l(i(e.value.location)+" ",1),e.value.room?(r(),n(c,{key:0},[t[1]||(t[1]=s("br",null,null,-1)),s("small",z,"Raum: "+i(e.value.room),1)],64)):m("",!0)])])])])])]),t[9]||(t[9]=s("div",{class:"alert alert-info",role:"alert"},[s("i",{class:"bi bi-envelope me-2"}),l(" Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet. ")],-1))],64)):m("",!0),s("div",I,[s("button",{class:"btn btn-primary",onClick:t[0]||(t[0]=M=>v(a).push("/"))},t[10]||(t[10]=[s("i",{class:"bi bi-house me-2"},null,-1),l(" Zurück zur Startseite ")]))])])])])])]))}},A=h(L,[["__scopeId","data-v-d4f21488"]]);export{A as default};
