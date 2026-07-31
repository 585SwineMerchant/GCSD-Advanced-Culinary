import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker/index.js";

class Statement {
  constructor(db, sql) { this.db=db; this.sql=sql; this.values=[]; }
  bind(...values){this.values=values;return this;}
  async run(){
    if(this.sql.startsWith("INSERT INTO workspace_state")){const [revision,state,updatedAt,updatedBy]=this.values;this.db.row={revision,state_json:state,updated_at:updatedAt,updated_by:updatedBy};}
    if(this.sql.startsWith("UPDATE workspace_state")){const [revision,state,updatedAt,updatedBy]=this.values;this.db.row={revision,state_json:state,updated_at:updatedAt,updated_by:updatedBy};}
    if(this.sql.startsWith("INSERT INTO audit_log"))this.db.audits.push(this.values);
    return {success:true};
  }
  async first(){return this.sql.startsWith("SELECT revision")?this.db.row:null;}
}
class MockDB { constructor(){this.row=null;this.audits=[];} prepare(sql){return new Statement(this,sql);} }
const env = { DB:new MockDB(), ASSETS:{fetch:()=>new Response("asset")}, TEACHER_ROLES:JSON.stringify({"carlson@greececsd.org":{name:"Jason Carlson",role:"owner",schools:["Arcadia"],sections:["adv-p2","adv-p5"]}}), SECTION_ROSTER:JSON.stringify({"student@greececsd.org":["adv-p2"]}) };
const request = (path, email, options={}) => new Request(`https://example.test${path}`,{...options,headers:{"cf-access-authenticated-user-email":email,...options.headers}});
const sample = {activeTeacher:"Jason Carlson",requests:[],events:[{id:"evt-1",name:"Reception",owner:"Jason Carlson",stage:"Published",publishedAt:"2026-07-31T20:00:00Z",version:1,menu:[{name:"Tarts",required:24,portion:"1 each"}],tasks:[{title:"Bake tarts",section:"adv-p2",menuIndex:0,type:"production",progress:{status:"Not started",issue:""}},{title:"Package tarts",section:"adv-p5",menuIndex:0,type:"packing",progress:{status:"Blocked",issue:"Teacher-only issue"}}]}]};

test("rejects anonymous API access", async()=>{const response=await worker.fetch(new Request("https://example.test/api/state"),env);assert.equal(response.status,401);});
test("teacher saves and student receives only published operational state",async()=>{
  const put=await worker.fetch(request("/api/state","carlson@greececsd.org",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({revision:0,state:sample})}),env);assert.equal(put.status,200);
  const get=await worker.fetch(request("/api/state","student@greececsd.org"),env);assert.equal(get.status,200);const payload=await get.json();assert.equal(payload.state.events.length,1);assert.equal(payload.state.events[0].tasks[1].progress.issue,"");
});
test("student can update assigned task but not another section",async()=>{
  const ok=await worker.fetch(request("/api/student-update","student@greececsd.org",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({eventId:"evt-1",taskIndex:0,status:"Complete",quantity:24,usableYield:23,waste:1,storage:"Rack B"})}),env);assert.equal(ok.status,200);
  const denied=await worker.fetch(request("/api/student-update","student@greececsd.org",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({eventId:"evt-1",taskIndex:1,status:"Complete"})}),env);assert.equal(denied.status,403);
});
test("non-owner teacher cannot publish another owner’s order",async()=>{
  const env2={...env,TEACHER_ROLES:JSON.stringify({"mccann@greececsd.org":{name:"Kevin McCann",role:"teacher",schools:["Arcadia"],sections:["adv-p2"]}})};
  const current=JSON.parse(env.DB.row.state_json);const changed=structuredClone(current);changed.events[0].version=2;
  const response=await worker.fetch(request("/api/state","mccann@greececsd.org",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({revision:env.DB.row.revision,state:changed})}),env2);assert.equal(response.status,403);
});
