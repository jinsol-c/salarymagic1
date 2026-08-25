// screens-salary2.jsx — 월급 수령 이력 / 요금제

const {useState: uS2} = React;

const HIST = [
  {amt:1500000, kind:'정기 월급', date:'2026년 05월 01일', state:'정상'},
  {amt:500000, kind:'월급 땡겨받기', date:'2026년 04월 15일', state:'정상'},
  {amt:1500000, kind:'정기 월급', date:'2026년 03월 25일', state:'보호모드',
   note:{tone:'warn', text:'보호모드로 지급되었습니다. 수입이 예상보다 적어 안전 금액으로 조정되었습니다.'}},
  {amt:1500000, kind:'비상금 사용', date:'2026년 03월 25일', state:'보호모드',
   note:{tone:'danger', text:'비상금이 사용되었습니다. 수입이 부족하여 보호모드가 활성화 되었을 수 있습니다.'}},
];
const KIND_STYLE = {'정기 월급':['#E7EBFF','#4A62E8'],'월급 땡겨받기':['#EDE7FF','#6C4AE8'],'비상금 사용':['#FFE7EE','#E2467A']};
const STATE_STYLE = {'정상':['#DFF5E7','#1B7F4B'],'보호모드':['#FDF0D0','#9A6A05']};
const PERIODS = ['1개월','3개월','6개월','직접설정'];
const HIST_ACCOUNTS = ['카카오뱅크 3333090-3344455','기업은행 333-777-555-4','국민은행 2525-111-55'];

function SalaryHistory({back}) {
  const [period, setPeriod] = uS2('1개월');
  const [acc, setAcc] = uS2(HIST_ACCOUNTS[0]);
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div className="nav" style={{display:'flex',alignItems:'center',gap:6}}>
        <button className="back" onClick={back} aria-label="뒤로"><Chevron/></button>
        <span className="h2">월급 수령 이력</span>
      </div>
      <div className="scroll">
        <div style={{padding:'8px 16px 30px',display:'grid',gap:12}}>
          <div className="card" style={{padding:16}}>
            <div style={{display:'flex',gap:8}}>
              {[['총 수령액','680만원'],['정기 월급','4회'],['비상금 사용','1회']].map(([t,v])=>(
                <div key={t} style={{flex:1,background:'#F5F5F5',borderRadius:10,padding:'14px 8px',textAlign:'center'}}>
                  <div className="b12" style={{color:'#9E9E9E'}}>{t}</div>
                  <div className="h3" style={{marginTop:8}}>{v}</div>
                </div>
              ))}
            </div>
            <div className="l13" style={{marginTop:20,color:'#616161'}}>조회기간</div>
            <div style={{display:'flex',gap:8,marginTop:10}}>
              {PERIODS.map(p=>(
                <button key={p} onClick={()=>setPeriod(p)}
                  style={{flex:1,height:38,borderRadius:19,fontSize:13,fontWeight:period===p?700:500,whiteSpace:'nowrap',
                    border:'1px solid '+(period===p?'#5F79FF':'#E0E0E0'),color:period===p?'#5F79FF':'#616161',background:'#fff'}}>{p}</button>
              ))}
            </div>
            <div className="l13" style={{marginTop:20,color:'#616161'}}>계좌선택</div>
            <div style={{position:'relative',marginTop:10}}>
              <select value={acc} onChange={e=>setAcc(e.target.value)}
                style={{appearance:'none',width:'100%',height:52,borderRadius:26,border:'1px solid #E0E0E0',background:'#fff',padding:'0 40px 0 20px',fontSize:15,fontWeight:600,color:'#222'}}>
                {HIST_ACCOUNTS.map(a=><option key={a} value={a}>{a}</option>)}
              </select>
              <span style={{position:'absolute',right:20,top:'50%',transform:'translateY(-50%)',pointerEvents:'none',color:'#9E9E9E',fontSize:11}}>▼</span>
            </div>
          </div>

          <div className="card" style={{padding:16}}>
            <div className="row">
              <span style={{display:'flex',alignItems:'baseline',gap:8}}>
                <span className="h2">수령 이력</span><span className="b12" style={{color:'#9E9E9E'}}>총 {HIST.length}건</span>
              </span>
              <span className="b14" style={{color:'#616161'}}>최신순 ▾</span>
            </div>
            <div style={{marginTop:6}}>
              {HIST.map((h,i)=>{
                const [kb,kc] = KIND_STYLE[h.kind], [sb,sc] = STATE_STYLE[h.state];
                return (
                  <div key={i} style={{padding:'18px 0',borderTop:i?'1px solid #EEEEEE':'0'}}>
                    <div className="row">
                      <span style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                        <span className="h3">{won(h.amt)} 원</span>
                        <span style={{background:kb,color:kc,borderRadius:999,padding:'4px 10px',fontSize:12,fontWeight:700,whiteSpace:'nowrap'}}>{h.kind}</span>
                      </span>
                      <span style={{background:sb,color:sc,borderRadius:999,padding:'5px 12px',fontSize:12,fontWeight:700,whiteSpace:'nowrap'}}>{h.state}</span>
                    </div>
                    <div className="b14" style={{marginTop:8,color:'#9E9E9E'}}>{h.date}</div>
                    {h.note && (
                      <div style={{marginTop:14,display:'flex',gap:8,borderRadius:10,padding:'14px 14px',
                        background:h.note.tone==='warn'?'#FFF8E4':'#FFF0F1'}}>
                        <span style={{width:18,height:18,borderRadius:'50%',flex:'none',display:'grid',placeItems:'center',color:'#fff',fontSize:12,fontWeight:800,
                          background:h.note.tone==='warn'?'#F0A500':'#F04452'}}>!</span>
                        <span className="b14" style={{color:h.note.tone==='warn'?'#8A6200':'#C0313E'}}>{h.note.text}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PLANS = [
  {name:'Beginner', price:'무료', tag:null, desc:'기본 관리 + 협업 관리 부가',
   items:['수입 지출 분석 기반 매출 관리','사장님 월급 지급','비상금 운용 및 기본 리포트','위험 감지 알림 + 대출 추천'],
   cta:'시작하기', ctaOff:true},
  {name:'Starter', price:'월 지불', tag:'인기', desc:'자동화 + 인사이트 강화', hi:true,
   items:['Free 기능 전체 포함','AI 기반 자금 운용(로보어드바이저)','업계 비교 · 상권 분석 리포트','매출 감소시 자동 대출 중개'],
   cta:'시작하기'},
  {name:'Booster', price:'맞춤 견적', tag:null, desc:'재무 자동화 + 금융 확장',
   items:['Starter 기능 전체 포함','종합소득세 신고 · 환급 자동화','경정청구 기반 환급 지원','BNPL 월 1회 지원'],
   cta:'문의하기'},
  {name:'Master', price:'맞춤 견적', tag:null, desc:'자금 유동성 관리형 + 부가 마케팅 관리',
   items:['Pro 기능 전체 포함','선지급 사용수 등록 및','자사별 사업수 등록','업무 등록별','마케팅 비용 데이터 분석 안내'],
   cta:'문의하기'},
];

function PlanScreen({back}) {
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div style={{padding:'6px 20px 0',display:'flex',justifyContent:'flex-end'}}>
        <button onClick={back} aria-label="닫기">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="scroll">
        <div style={{padding:'4px 16px 34px'}}>
          <h1 className="h2" style={{marginBottom:16}}>요금제</h1>
          <div style={{display:'grid',gap:16}}>
            {PLANS.map(p=>(
              <div key={p.name} className="card" style={{padding:20,background:p.hi?'#E4E9FF':'#fff'}}>
                <div className="row" style={{alignItems:'flex-start'}}>
                  <span style={{display:'flex',alignItems:'center',gap:8}}>
                    <span className="h2 blue">{p.name}</span>
                    {p.tag && <span style={{border:'1px solid #ADBAFF',color:'#5F79FF',borderRadius:999,padding:'3px 9px',fontSize:11,fontWeight:700}}>{p.tag}</span>}
                  </span>
                  <span className="b14" style={{color:'#616161',whiteSpace:'nowrap'}}>{p.price}</span>
                </div>
                <div className="t16" style={{marginTop:8}}>{p.desc}</div>
                <div style={{marginTop:16,display:'grid',gap:11}}>
                  {p.items.map(it=>(
                    <div key={it} style={{display:'flex',gap:9,alignItems:'flex-start'}}>
                      <span style={{width:17,height:17,borderRadius:'50%',background:'#5F79FF',flex:'none',display:'grid',placeItems:'center',marginTop:1}}>
                        <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6.2l2.4 2.4L10 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="b14">{it}</span>
                    </div>
                  ))}
                </div>
                <button className="btn sm" style={{marginTop:20,...(p.ctaOff?{background:'#E0E0E0',color:'#9E9E9E'}:null)}} disabled={p.ctaOff}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {SalaryHistory, PlanScreen});
