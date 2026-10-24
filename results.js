(()=>{'use strict';
const $=id=>document.getElementById(id),config=window.APP_CONFIG;
const fmt=(x,suffix='')=>x===null||x===undefined?'—':String(x)+suffix;
const number=(x)=>Number.isFinite(Number(x))?Number(x):0;
let client=null;
function say(msg,isError=false){$('status').textContent=msg;$('status').classList.toggle('error',isError);}
function render(data){
 const o=data.overall||{},items=Array.isArray(data.items)?data.items:[];
 $('participants').textContent=fmt(o.participants);$('accuracy').textContent=fmt(o.accuracy_pct,'%');$('confidence').textContent=fmt(o.avg_confidence);$('familiarity').textContent=fmt(o.avg_familiarity);
 $('accuracyBars').replaceChildren();$('details').replaceChildren();
 items.forEach(it=>{
  const row=document.createElement('div');row.className='graphRow';const label=document.createElement('div');label.className='graphLabel';label.textContent=it.item_title;const sub=document.createElement('small');sub.textContent=`${it.answers}명 응답`;label.append(sub);
  const track=document.createElement('div');track.className='track';track.setAttribute('role','img');track.setAttribute('aria-label',`${it.item_title} 정답률 ${fmt(it.accuracy_pct,'%')}`);const fill=document.createElement('div');fill.className='fill';fill.style.width=`${Math.min(100,Math.max(0,number(it.accuracy_pct)))}%`;track.append(fill);
  const val=document.createElement('div');val.className='value';val.textContent=fmt(it.accuracy_pct,'%');row.append(label,track,val);$('accuracyBars').append(row);
  const tr=document.createElement('tr');[it.item_title,it.answers,fmt(it.accuracy_pct,'%'),fmt(it.avg_confidence),fmt(it.avg_familiarity),fmt(it.wrong_avg_confidence)].forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td);});$('details').append(tr);
 });
 say(`마지막 조회: ${new Date().toLocaleString('ko-KR')} · 총 ${fmt(o.responses)}개 문항 응답`);
}
async function load(){try{
 if(!config||!config.supabaseUrl?.startsWith('https://')||!config.supabaseAnonKey||config.supabaseAnonKey.includes('YOUR_'))throw Error('사이트의 Supabase 연결 정보가 없습니다.');
 if(!window.supabase)throw Error('Supabase 라이브러리를 불러오지 못했습니다.');
 if(!client)client=window.supabase.createClient(config.supabaseUrl,config.supabaseAnonKey);
 $('reload').disabled=true;say('익명 통계를 불러오는 중입니다…');
 const {data,error}=await client.rpc('quiz_public_summary');if(error)throw error;
 if(!data||!data.overall||!Array.isArray(data.items))throw Error('집계 데이터 형식이 올바르지 않습니다.');
 render(data);
 }catch(e){console.error(e);say('통계를 불러오지 못했습니다. Supabase SQL Editor에서 public_summary.sql을 먼저 실행했는지 확인해 주세요. ('+(e.message||'오류')+')',true);}finally{$('reload').disabled=false;}}
$('reload').addEventListener('click',load);load();
})();
