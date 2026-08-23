// screens-onboarding.jsx — 온보딩 전체 (intro → 회원가입 → 데이터 연결 → 홈 진입)

const {useState: uS, useEffect: uE} = React;

const OB_INDUSTRY = [
  {k:'food', label:'음식점', icon:'M7 3v7M5 3v3.5a2 2 0 0 0 4 0V3M7 10v11M16 3c-1.5 2-2 3.5-2 5.5S15 12 16 12s2-1.5 2-3.5S17.5 5 16 3ZM16 12v9'},
  {k:'beauty', label:'미용 · 뷰티', icon:'M12 3l4 5-4 13-4-13 4-5ZM8 8h8'},
  {k:'retail', label:'소매점', icon:'M4 9h16v11H4V9ZM4 9l2-5h12l2 5M9 20v-6h6v6'},
  {k:'cafe', label:'카페 · 디저트', icon:'M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8ZM16 9h2a2 2 0 0 1 0 4h-2M4 21h13'},
];

const OB_FEATURES = [
  ['💰','월급 자동 지급','#EAF9F5'], ['📊','순수익 실시간 계산','#EEF1FF'],
  ['🧾','세금 납부 준비','#FFF7E8'], ['📈','손익분기점 분석','#FFF0F1'],
  ['📋','매출&지출 리포트','#F4F0FF'],
];

const OB_CHECKS = ['사업용 계좌 개설 & 카드 발급','현금영수증 가맹점 가입','카드결제/POS/결제단말기 준비','미용업 위생교육 이수','영업신고증 발급/보관','임대료','관리비','인터넷 통신비, 카드 단말기','노란우산'];

const ACCOUNTS = [
  {bank:'카카오뱅크', desc:'입출금통장 3333-1234-56789', bal:8120000},
  {bank:'기업은행', desc:'입출금통장 333-777-555-4', bal:3450000},
  {bank:'국민은행', desc:'저축예금 2525-111-55', bal:1280000},
  {bank:'신한은행', desc:'SOL트래블 외화예금 110-45454147', bal:640000},
];

const MONTHLY_REVENUE = 8900000, OPEX = 4700000, TAXRES = 400000, EMERG = 400000;

// ───────── 0. intro
function ObIntro({go}) {
  const [showCta, setShowCta] = uS(false);
  uE(()=>{const t=setTimeout(()=>setShowCta(true),2000);return ()=>clearTimeout(t);},[]);
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <style>{`@keyframes lupangFloat{0%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-7px) rotate(-1deg)}50%{transform:translateY(-11px) rotate(0deg)}75%{transform:translateY(-7px) rotate(1deg)}100%{transform:translateY(0) rotate(0deg)}}@keyframes ctaRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes phoneRise{from{opacity:0;transform:translateY(120px)}to{opacity:1;transform:translateY(0)}}@keyframes lupangIn{from{opacity:0;transform:translateY(44px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div className="body-pad" style={{paddingTop:24}}>
        <h1 className="title">매출은 달라도,<br/><span className="blue">내 월급은 일정하게</span></h1>
        <p className="sub">사업에 필요한 돈을 먼저 남기고, 사장님이<br/>매달 가져갈 월급을 정해드려요.</p>
      </div>
      <div style={{position:'absolute',left:0,right:0,bottom:0,width:390,height:568,overflow:'hidden'}}>
        <img src="assets/intro-phone.png" alt="" style={{position:'absolute',left:45,top:8,width:300,display:'block',animation:'phoneRise .85s cubic-bezier(.22,.9,.3,1) both'}}/>
        <div style={{position:'absolute',right:-24,bottom:0,width:300,animation:'lupangIn .8s cubic-bezier(.16,.7,.3,1) .95s both'}}>
          <img src="assets/intro-lupang.png" alt="" style={{width:'100%',display:'block',animation:'lupangFloat 4s ease-in-out 1.75s infinite'}}/>
        </div>
      </div>
      <div style={{position:'absolute',left:0,right:0,bottom:0,height:96,background:'linear-gradient(to top,rgba(245,245,245,.9) 50%,rgba(245,245,245,0))',zIndex:9,pointerEvents:'none',display:'none'}}></div>
      <div style={{position:'absolute',left:20,right:20,bottom:26,zIndex:10,visibility:showCta?'visible':'hidden',animation:showCta?'ctaRise .45s ease-out both':'none'}}>
        <button className="btn" style={{boxShadow:'0 0 24px 12px rgba(255,255,255,.95), 0 0 48px 24px rgba(255,255,255,.75)'}} onClick={go}>시작하기</button>
      </div>
    </div>
  );
}

// ───────── 1. 사장님 정보
function ObProfile({s, set, go, back}) {
  const p = s.profile;
  const ok = p.name && p.phone.length >= 10;
  const phoneOn = !!p.name, rrnOn = phoneOn && p.phone.length >= 10;
  const off = {background:'#FAFAFA',borderColor:'#EEE',color:'#C7C7C7'};
  return (
    <Screen progress={8} onBack={back} foot={<button className="btn" disabled={!ok} onClick={go}>다음</button>}>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title"><span className="blue">사장님 정보</span>를<br/>알려주세요</h1>
        <p className="sub">안전한 확인을 위해 본인 정보가 필요해요.</p>
        <div className="field">
          <label>이름</label>
          <input className={'input'+(p.name?' on':'')} value={p.name} placeholder="이름을 입력해주세요" autoFocus
            onChange={e=>set({profile:{...p, name:e.target.value}})}/>
        </div>
        <div className="field" style={phoneOn?null:{opacity:.6}}>
          <label>전화번호</label>
          <input className={'input'+(p.phone?' on':'')} value={p.phone} placeholder="010-0000-0000" inputMode="numeric" disabled={!phoneOn} style={phoneOn?null:off}
            onChange={e=>set({profile:{...p, phone:e.target.value.replace(/[^0-9]/g,'').slice(0,11)}})}/>
          <p className="hint">-없이 숫자만 입력해주세요</p>
        </div>
        <div className="field" style={rrnOn?null:{opacity:.6}}>
          <label>주민등록번호</label>
          <div className="input on" style={{display:'flex',alignItems:'center',gap:8,background:rrnOn?'#F5F5F5':'#FAFAFA',borderColor:rrnOn?'#E0E0E0':'#EEE'}}>
            <input value={p.rrn} placeholder="앞 6자리" inputMode="numeric" maxLength={6} disabled={!rrnOn}
              onChange={e=>set({profile:{...p, rrn:e.target.value.replace(/[^0-9]/g,'')}})}
              style={{width:78,border:0,background:'transparent',outline:'none',fontSize:16}}/>
            <span style={{color:'#C7C7C7'}}>–</span>
            <span style={{display:'flex',gap:5}}>{[0,1,2,3,4,5,6].map(i=>
              <i key={i} style={{width:9,height:9,borderRadius:'50%',background:'#C7C7C7',display:'block'}}></i>)}</span>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ───────── 2. 희망 월급
function ObWant({s, set, go, back}) {
  const v = s.want;
  return (
    <Screen progress={20} onBack={back} foot={<button className="btn" disabled={!v} onClick={go}>다음</button>}>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title">한 달에 얼마를<br/><span className="blue">월급</span>으로 받고 싶으세요?</h1>
        <p className="sub">사업에 필요한 돈을 빼고, 사장님이 매달<br/>가져가고 싶은 금액을 알려주세요.</p>
        <div style={{marginTop:26}}>
          <div className={'input'+(v?' on':'')} style={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:6}}>
            <input value={v?won(v):''} placeholder="금액을 입력하세요" inputMode="numeric"
              onChange={e=>set({want:Number(e.target.value.replace(/[^0-9]/g,''))||0})}
              style={{flex:1,border:0,background:'transparent',outline:'none',fontSize:16,textAlign:'right',fontWeight:v?700:400}}/>
            {v ? <span className="t16">원</span> : null}
          </div>
          <div className="chips">
            {[500000,1000000,2000000,3000000].map(n=>
              <button key={n} className="chip" onClick={()=>set({want:(v||0)+n})}>+{man(n)}만</button>)}
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ───────── 3. 업종
function ObIndustry({s, set, go, back}) {
  return (
    <Screen progress={32} onBack={back} foot={<button className="btn" disabled={!s.industry} onClick={go}>다음</button>}>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title">어떤 가게를<br/><span className="blue">운영</span>하고 계세요?</h1>
        <p className="sub">업종마다 돈 흐름이 달라요.<br/>사장님께 맞는 월급을 계산하는 데 쓰여요.</p>
        <div style={{marginTop:24}}>
          {OB_INDUSTRY.map(o=>(
            <button key={o.k} className={'opt'+(s.industry===o.k?' on':'')} onClick={()=>set({industry:o.k})}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d={o.icon} stroke={s.industry===o.k?'#5F79FF':'#616161'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="t16">{o.label}</span><span className="radio"></span>
            </button>
          ))}
          <button className="opt" style={{justifyContent:'center',background:'#F5F5F5',border:0,marginTop:10,color:'#616161'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#9E9E9E" strokeWidth="1.5"/><path d="M12 8.5v7M8.5 12h7" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="l14" style={{marginRight:'auto'}}>업종 검색하기</span>
          </button>
        </div>
      </div>
    </Screen>
  );
}

// ───────── 4. 예상 필요 매출
function ObRevenue({s, go, back}) {
  const want = s.want || 3000000;
  const COST_RATE = 0.647; // 매출 대비 사업비·세금 비율 (업종 평균)
  const need = Math.round(want / (1 - COST_RATE) / 100000) * 100000;
  const cost = need - want;
  return (
    <Screen progress={44} onBack={back} foot={<button className="btn" onClick={go}>지금 내 월급 계산하기</button>}>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title">이 월급을 받으려면,<br/>한 달에 이만큼 벌면 돼요</h1>
        <p className="sub">사장님 업종을 기준으로 예상해봤어요.<br/>실제 돈 흐름을 연결하면 더 정확해져요.</p>
        <div className="card tint" style={{marginTop:24}}>
          <div className="l14" style={{color:'#616161'}}>예상 필요 매출</div>
          <div style={{marginTop:10,display:'flex',alignItems:'baseline',gap:4}}>
            <span className="d2 blue">약 {man(need)}만원</span>
            <span className="l14" style={{color:'#616161'}}>/월</span>
          </div>
        </div>
        <div className="card" style={{marginTop:12}}>
          <div className="row"><span className="b14" style={{color:'#616161'}}>희망 월급</span><span className="h4">{man(want)}만원</span></div>
          <div className="rowsep"></div>
          <div className="row"><span className="b14" style={{color:'#616161'}}>예상 사업비 · 세금</span><span className="h4">{man(cost)}만원</span></div>
        </div>
        <p className="cap12" style={{marginTop:14,lineHeight:1.6,color:'#9E9E9E'}}>중소벤처기업부 「소상공인실태조사」의 업종별 매출·영업비용·영업이익과 국세청 경비율을 참고해 예상 매출을 계산했어요.</p>
      </div>
    </Screen>
  );
}

// ───────── 5. 기능 소개
function ObFeatures({go, back}) {
  return (
    <Screen onBack={back} foot={<button className="btn" onClick={go}>기능 자세히 보기</button>}>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title"><span className="blue">월급술사</span>가 대신 해드립니다</h1>
        <p className="sub">사장님을 위한 돈 관리</p>
        <div style={{display:'grid',placeItems:'center',marginTop:34}}>
          <div style={{position:'relative',background:'#F0F0F0',color:'#424242',padding:'9px 16px',borderRadius:18,fontSize:14,fontWeight:600}}>세금 공포 이제 그만!<i style={{position:'absolute',left:'50%',marginLeft:-7,bottom:-7,width:14,height:14,background:'#F0F0F0',clipPath:'polygon(50% 100%,0 0,100% 0)',display:'block'}}></i></div>
          <img src="assets/lupang-features.png" alt="루팡이" style={{width:250,marginTop:14,animation:'float 3.4s ease-in-out infinite'}}/>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginTop:14}}>
          {OB_FEATURES.map(([e,t,bg])=>(
            <span key={t} style={{background:bg,borderRadius:18,padding:'9px 14px',fontSize:13,fontWeight:600,display:'inline-flex',gap:6,alignItems:'center'}}>
              <span style={{fontSize:13}}>{e}</span>{t}</span>
          ))}
        </div>
      </div>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}`}</style>
    </Screen>
  );
}

// ───────── 6. 회원가입
const TERMS = [
  ['서비스 이용약관 (필수)', true],
  ['개인정보 수집·이용 (필수)', true],
  ['개인정보 제 3자 제공동의(필수)', true],
  ['마케팅 수신 (선택)', false],
];
function ObSignup({s, set, go, back}) {
  const [open, setOpen] = uS(false);
  const t = s.terms;
  const allReq = TERMS.every((x,i)=>!x[1] || t[i]);
  const allOn = t.every(Boolean);
  const toggleAll = () => set({terms: TERMS.map(()=>!allOn)});
  return (
    <Screen onBack={back} foot={<button className="btn" disabled={!allReq} onClick={go}>월급술사 시작하기</button>}>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title">회원가입</h1>
        <p className="sub">SNS계정으로 빠르게 시작하세요.</p>
        <div style={{display:'grid',gap:10,marginTop:24}}>
          <button onClick={()=>setOpen(true)} style={{height:52,borderRadius:8,background:'#FEE500',fontWeight:700,fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            <span style={{width:20,height:20,borderRadius:'50%',background:'#191600',display:'grid',placeItems:'center'}}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#FEE500"><path d="M12 4C7 4 3 7.1 3 10.9c0 2.4 1.6 4.5 4 5.7l-.8 3 3.4-1.9c.8.1 1.6.2 2.4.2 5 0 9-3.1 9-6.9S17 4 12 4Z"/></svg>
            </span>카카오로 시작하기</button>
          <button onClick={()=>setOpen(true)} style={{height:52,borderRadius:8,background:'#03C75A',color:'#fff',fontWeight:700,fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            <span style={{fontWeight:900,fontSize:15}}>N</span>네이버로 시작하기</button>
          <button onClick={()=>setOpen(true)} style={{height:52,borderRadius:8,background:'#fff',border:'1px solid #E0E0E0',fontWeight:700,fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none"><rect x=".8" y=".8" width="12.4" height="16.4" rx="2.4" stroke="#222" strokeWidth="1.4"/><path d="M5.6 14.6h2.8" stroke="#222" strokeWidth="1.4" strokeLinecap="round"/></svg>
            휴대폰 번호로 시작하기</button>
        </div>
        <div style={{marginTop:14,background:'#F5F5F5',borderRadius:10,padding:'20px 18px'}}>
          {!open ? (
            <button className="row" style={{width:'100%'}} onClick={()=>setOpen(true)}>
              <span className="h3">이용 약관 동의</span><Chevron d="down" c="#616161" s={20}/>
            </button>
          ) : (
            <div>
              <div className="row"><span className="h3">이용 약관 동의</span><button onClick={()=>setOpen(false)}><Chevron d="up" c="#616161" s={20}/></button></div>
              <button className="row" style={{width:'100%',marginTop:18}} onClick={toggleAll}>
                <span style={{display:'flex',alignItems:'center',gap:10}}>
                  <span className={'cbox '+(allOn?'on':'some')}></span><span className="t16">약관에 모두 동의합니다.</span>
                </span>
              </button>
              <div style={{height:1,background:'#E0E0E0',margin:'16px 0'}}></div>
              <div style={{display:'grid',gap:12}}>
                {TERMS.map(([label],i)=>(
                  <div className="row" key={i}>
                    <button style={{display:'flex',alignItems:'center',gap:10}} onClick={()=>{const n=[...t];n[i]=!n[i];set({terms:n});}}>
                      <span className={'cbox'+(t[i]?' on':'')}></span>
                      <span className="b14" style={{color:t[i]?'#222':'#9E9E9E',fontWeight:t[i]?600:400}}>{label}</span>
                    </button>
                    <span className="l13" style={{color:'#9E9E9E'}}>보기</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Screen>
  );
}

// ───────── 7. 본인인증
const AUTHS = [
  ['공동인증서','assets/auth-cert.png'], ['카카오 인증','assets/auth-kakao.png'],
  ['네이버 인증','assets/auth-naver.png'], ['PASS 인증','assets/auth-pass.png'],
  ['금융인증서','assets/auth-fin.png'],
];
function ObAuth({s, set, go, back}) {
  return (
    <Screen progress={60} onBack={back} foot={<button className="btn" disabled={!s.auth} onClick={go}>다음</button>}>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title">본인인증</h1>
        <p className="sub">자산을 연결하려면 본인인증이 필요해요.</p>
        <div style={{marginTop:22}}>
          {AUTHS.map(([label,src])=>(
            <button key={label} className={'opt'+(s.auth===label?' on':'')} style={{minHeight:72}} onClick={()=>set({auth:label})}>
              <img src={src} alt="" style={{width:40,height:40,borderRadius:10,objectFit:'contain',flex:'none',display:'block'}}/>
              <span className="t16">{label}</span>
              <span style={{marginLeft:'auto'}}><Chevron d="right" c="#C7C7C7" s={20}/></span>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}

// ───────── 8. 데이터 연결 동의
const CONSENT = [
  {head:'개인(신용)정보 수집·이용 및 전송요구서',
   items:[['입·출금된 곳 볼게요',true],['어디서 결제했는지 볼게요',true],['카테고리 정보 볼게요',false]],
   fine:'정보제공자: 카카오페이증권의 201개 금융사 | 제공받는자: 카카오페이 | 목적: 인증서비스를 통한 본인인증 정보 대조회, 데이터티켓 서비스의 이용 보유기간: 서비스 이용 종료 시, 로그인 일로부터 5년 전송정보: 은행·증권, 카드, 금융투자, 보험, 할부금융, 통신 계좌 목록 및 정보',
   note:'6개월 동안 합의하지 않으면 더 이상 정보를 가져오지 않아요'},
  {head:'개인(신용)정보 보 동의',
   items:[['개인(신용)정보 수집·이용 동의',true],['개인(신용)정보 제공 동의',true]],
   fine:'정보제공자: 카카오페이증권의 201개 금융사, 한국신용정보원 보유기간: 본인확인 및 개인(신용)정보의 전송 목적 달성 시까지 목적: 마이데이터 서비스 기반전환 및 전송요구내역 통합조회 서비스 제공'},
  {head:'카카오 인증 본인확인',
   items:[['카카오 인증 본인확인을 위한 동의',true]],
   detail:['(필수) 본인인증을 위한 개인정보의 제3자 제공 동의 (카카오 → 카카오페이)','(필수) 마이데이터이용 합법인증을 위한 전송요구 내역 전달 (카카오페이증권 → 카카오페이 → 카카오, 정보제공자)'],
   fine:'카카오 → 카카오페이로 본인인증 개인정보 제3자 제공 카카오페이증권 → 카카오페이 → 카카오, 정보제공자로 전송요구 내역 전달'},
];
function ObConsent({go, back}) {
  const [all, setAll] = uS(false);
  const [on, setOn] = uS(()=>CONSENT.map(g=>g.items.map(i=>i[1])));
  const toggleAll = () => {const v=!all; setAll(v); setOn(CONSENT.map(g=>g.items.map(()=>v)));};
  return (
    <Screen progress={72} onBack={back} foot={<button className="btn" onClick={go}>동의하고 한번에 연결하기</button>}>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title"><span className="blue">데이터 연결</span>에 동의해주세요</h1>
        <p className="sub">안전하게 연결하고, 사장님 월급을 계산 하는 데에만 사용해요</p>
        {CONSENT.map((g,gi)=>(
          <div key={gi} style={{background:'#F5F5F5',borderRadius:10,padding:'18px 16px',marginTop:16}}>
            <div className="l14" style={{lineHeight:1.4}}><span style={{color:'#F04452',fontWeight:700}}>[필수]</span> <span style={{fontWeight:600}}>{g.head}</span></div>
            <div style={{height:1,background:'#E0E0E0',margin:'14px 0'}}></div>
            <div style={{display:'grid',gap:13}}>
              {g.items.map(([label],i)=>(
                <button key={i} style={{display:'flex',alignItems:'center',gap:10,textAlign:'left'}}
                  onClick={()=>setOn(o=>o.map((r,ri)=>ri===gi?r.map((v,vi)=>vi===i?!v:v):r))}>
                  <span className={'cbox'+(on[gi][i]?' on':'')}></span>
                  <span className="b14" style={{color:on[gi][i]?'#222':'#9E9E9E'}}>{label}</span>
                  {g.detail && i===0 && <span style={{marginLeft:'auto'}}><Chevron d="up" c="#9E9E9E" s={16}/></span>}
                </button>
              ))}
            </div>
            {g.detail && <div style={{marginTop:12,paddingLeft:30,display:'grid',gap:8}}>
              {g.detail.map((d,i)=><p key={i} className="b12" style={{color:'#616161',margin:0}}>{d}</p>)}
            </div>}
            <p className="cap12" style={{marginTop:14,lineHeight:1.6,color:'#9E9E9E'}}>{g.fine}</p>
            {g.note && <div style={{marginTop:12,border:'1px solid #E0E0E0',borderRadius:8,padding:'12px 14px',background:'#fff',display:'flex',gap:8,alignItems:'center'}}>
              <span className="cap12" style={{color:'#9E9E9E'}}>✕</span><span className="b12" style={{color:'#9E9E9E'}}>{g.note}</span></div>}
          </div>
        ))}
        <button className="row" style={{width:'100%',marginTop:18,border:'1px solid #E0E0E0',borderRadius:10,padding:'18px 16px'}} onClick={toggleAll}>
          <span style={{display:'flex',alignItems:'center',gap:10}}>
            <span className={'cbox'+(all?' on':'')}></span><span className="t16" style={{color:all?'#222':'#9E9E9E'}}>모두 동의하고 계속하기</span>
          </span>
        </button>
      </div>
    </Screen>
  );
}

// ───────── 9. 로딩
const LOAD_STEPS = ['사업용 계좌 연결','카드 이용내역 확인','홈택스 정보 조회'];
function ObLoading({go, back}) {
  const [step, setStep] = uS(1);
  uE(()=>{
    const a = setTimeout(()=>setStep(2), 1100), b = setTimeout(()=>setStep(3), 2200), c = setTimeout(go, 3100);
    return ()=>{clearTimeout(a);clearTimeout(b);clearTimeout(c);};
  },[]);
  return (
    <Screen onBack={back} noScroll>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title">사장님의 돈 흐름<br/>확인하고 있어요</h1>
        <p className="sub">홈택스와 금융 정보를 모아<br/>창업 이력과 입출금 내역을 확인하고 있어요.</p>
      </div>
      <div style={{flex:1,display:'grid',placeItems:'center',alignContent:'center',gap:10}}>
        <div style={{position:'relative',background:'#F0F0F0',color:'#424242',padding:'9px 16px',borderRadius:18,fontSize:14,fontWeight:600}}>조금만 기다려주세요<i style={{position:'absolute',left:'50%',marginLeft:-7,bottom:-7,width:14,height:14,background:'#F0F0F0',clipPath:'polygon(50% 100%,0 0,100% 0)',display:'block'}}></i></div>
        <img src="assets/lupang-loading-2.png" alt="루팡이" style={{width:190,animation:'float 2.4s ease-in-out infinite'}}/>
      </div>
      <div style={{padding:'0 20px 34px'}}>
        {LOAD_STEPS.map((t,i)=>(
          <div className="row" key={t} style={{padding:'16px 0',borderTop:i?'1px solid #EEEEEE':'0'}}>
            <span className="b14" style={{color:'#616161'}}>{t}</span>
            <span className="h4" style={{color: step>i+1?'#222':step===i+1?'#5F79FF':'#C7C7C7'}}>
              {step>i+1?'완료':step===i+1?'진행중…':'대기'}</span>
          </div>
        ))}
      </div>
    </Screen>
  );
}

// ───────── 10. 체크리스트
function ObChecklist({s, set, go, back}) {
  const c = s.checks;
  return (
    <Screen progress={84} onBack={back} foot={<button className="btn" onClick={go}>다음</button>}>
      <div className="body-pad" style={{paddingTop:8}}>
        <h1 className="title">이제 막 사업을 시작하셨네요!<br/>{s.profile.name||'김루팡'} 사장님을 위한 <span className="blue">체크리스트</span>예요</h1>
        <div style={{marginTop:24}}>
          {OB_CHECKS.map((t,i)=>(
            <button key={t} onClick={()=>{const n=[...c];n[i]=!n[i];set({checks:n});}}
              style={{display:'flex',alignItems:'center',gap:12,width:'100%',padding:'16px 0',borderBottom:'1px solid #EEEEEE',textAlign:'left'}}>
              <span className={'cbox'+(c[i]?' on':'')}></span>
              <span className="b14" style={{color:c[i]?'#222':'#9E9E9E',fontWeight:c[i]?700:400}}>{t}</span>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}

// ───────── 코치마크 공용
function CoachLayout({cards, caption, char, charSide, charW, charPos, cta, onCta, onSkip, sheet, dim}) {
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div style={{position:'absolute',inset:0,overflow:'hidden'}}>{cards}</div>
      <div style={{position:'absolute',inset:0,background:dim||'rgba(19,22,58,.72)',zIndex:2}}></div>
      <div style={{position:'absolute',inset:0,zIndex:3,pointerEvents:'none'}}>{caption}</div>
      {char && <img src={char} alt="" style={{position:'absolute',zIndex:4,width:charW||190,...(charPos||(charSide==='left'?{left:8,top:300}:{right:2,top:452}))}}/>}
      <div style={{position:'absolute',left:20,right:20,bottom:26,zIndex:5}}>
        <button className="btn" onClick={onCta}>{cta}</button>
        <button className="textlink" onClick={onSkip}>다음에 할게요</button>
      </div>
      {sheet}
    </div>
  );
}
const RING = {position:'relative',zIndex:3,background:'#fff',boxShadow:'0 0 0 2px #3FC6C0, 0 10px 30px rgba(0,0,0,.25)'};

function ChecklistCardMini({home}) {
  return (
    <div>
      <div style={{background:home?'#5F79FF':'#3B4A9E',borderRadius:'10px 10px 0 0',padding:'16px 18px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span className="h4" style={{color:'#fff'}}>{home?'이번주 체크리스트':'이번주 우사장님이 해야 할 일'}</span><Chevron d="right" c="#fff" s={20}/>
      </div>
      <div className="card" style={{borderRadius:'0 0 10px 10px',borderTop:0}}>
        {[['이번 달 지출 내역 확인하기',true,'방금 완료'],['저금통 목표 금액 설정하기',true],['월급 자동이체 설정하기',false],['노란우산 가입하기',false]].map(([t,on,badge],i)=>(
          <div className="row" key={i} style={{padding:'9px 0'}}>
            <span style={{display:'flex',gap:10,alignItems:'center'}}>
              <span className={'cbox'+(on?' on':'')}></span>
              <span className="b14" style={{color:on?'#222':'#9E9E9E',fontWeight:on?600:400}}>{t}</span>
            </span>
            {badge && <span style={{background:'#5F79FF',color:'#fff',borderRadius:12,padding:'4px 9px',fontSize:11,fontWeight:700}}>{badge}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
function ProfitCard({ring}) {
  return (
    <div className="card" style={ring?RING:null}>
      <div className="h4">이번 달 순수익</div>
      <div className="d3" style={{marginTop:8}}>4,180,000원</div>
      <div style={{display:'flex',marginTop:16}}>
        <div style={{flex:1}}><div className="cap12" style={{color:'#9E9E9E'}}>매출</div><div className="t16" style={{marginTop:6}}>+21,400,000원</div></div>
        <div style={{flex:1,borderLeft:'1px solid #EEEEEE',paddingLeft:16}}><div className="cap12" style={{color:'#9E9E9E'}}>지출</div><div className="t16" style={{marginTop:6}}>−17,220,000원</div></div>
      </div>
    </div>
  );
}
function PiggyCard({ring}) {
  return (
    <div className="card" style={ring?RING:null}>
      <div className="h4">저금통</div>
      <div className="d3" style={{marginTop:8}}>12,350,000원</div>
      <div style={{display:'flex',gap:14,marginTop:10}}>
        <span className="b12" style={{color:'#9E9E9E'}}>목표 <b style={{color:'#424242'}}>1,500만원</b></span>
        <span className="b12" style={{color:'#9E9E9E'}}>세이프존 <b style={{color:'#424242'}}>3개월</b></span>
      </div>
      <div className="l13" style={{marginTop:18,color:'#616161'}}>저금통 달성률</div>
      <div style={{marginTop:8,position:'relative'}}>
        <div style={{height:8,borderRadius:4,background:'#EEEEEE'}}><i style={{display:'block',width:'82%',height:8,borderRadius:4,background:'#5F79FF'}}></i></div>
        <span style={{position:'absolute',right:'14%',top:-22,background:'#EEF1FF',color:'#5F79FF',fontSize:11,fontWeight:700,borderRadius:6,padding:'3px 6px'}}>82%</span>
      </div>
    </div>
  );
}

// ───────── 11. 코치마크 ① + 계좌 연동 시트
function ObCoach1({go, skip}) {
  const [sheet, setSheet] = uS(false);
  const [inAcc, setIn] = uS([true,false,false]);
  const [outAcc, setOut] = uS([true,false,false]);
  const list = ACCOUNTS.slice(1);
  return (
    <CoachLayout
      cards={<div style={{padding:'52px 20px 0',display:'grid',gap:12}}><ChecklistCardMini/><ProfitCard ring/><PiggyCard/></div>}
      caption={<div style={{position:'absolute',left:20,right:180,top:462,color:'#fff',textAlign:'right'}}>
        <div className="h3" style={{lineHeight:1.45}}>이번달 <span style={{color:'#C4E427'}}>수입</span>과 <span style={{color:'#ADBAFF'}}>지출</span>을<br/>확인할 수 있어요!</div>
      </div>}
      char="assets/lupang-coach1.png" charSide="right" charW={150} charPos={{right:34,top:442}} dim="rgba(0,0,0,.78)"
      cta="입출금 계좌 연동하기" onCta={()=>setSheet(true)} onSkip={skip}
      sheet={sheet && <Sheet noDim onClose={()=>setSheet(false)}>
        <h2 className="h1"><span className="blue">입출금</span> 계좌 연동하기</h2>
        <p className="sub" style={{marginTop:8}}>연동한 계좌로 수입과 지출을 자동으로 분류해요</p>
        {[['입금 계좌 선택하기',inAcc,setIn],['지출 계좌 선택하기',outAcc,setOut]].map(([t,val,setter],gi)=>(
          <div className="card" key={gi} style={{marginTop:16}}>
            <div className="h4">{t}</div>
            <div style={{marginTop:14,display:'grid',gap:12}}>
              {list.map((a,i)=>(
                <button key={a.bank} className="row" style={{width:'100%'}} onClick={()=>setter(v=>v.map((x,xi)=>xi===i?!x:x))}>
                  <span style={{display:'flex',gap:10,alignItems:'center'}}>
                    <span className={'cbox'+(val[i]?' on':'')}></span><span className="t16">{a.bank}</span>
                  </span>
                  <span className="b12" style={{color:'#9E9E9E'}}>{a.desc}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <div style={{display:'flex',gap:8,marginTop:22}}>
          <button className="btn ghost sm" style={{flex:1}} onClick={()=>setSheet(false)}>취소</button>
          <button className="btn sm" style={{flex:1}} onClick={go}>연결하기</button>
        </div>
      </Sheet>}
    />
  );
}

// ───────── 12. 코치마크 ② + 비상금 상자 설정 시트
function ObCoach2({go, skip}) {
  const [sheet, setSheet] = uS(false);
  const [sel, setSel] = uS([true,false,false,false]);
  const [zone, setZone] = uS(3);
  const [minZone, setMinZone] = uS(1);
  const fixed = 3000000;
  const sum = ACCOUNTS.reduce((a,b,i)=>a+(sel[i]?b.bal:0),0);
  const goal = fixed*zone;
  const rate = Math.min(100, Math.round(sum/goal*100));
  return (
    <CoachLayout
      cards={<div style={{position:'absolute',left:0,right:0,top:150,zIndex:3}}><img src="assets/coach2-piggy.png" alt="" style={{width:390,display:'block'}}/></div>}
      caption={null}
      dim="rgba(0,0,0,.78)"
      cta="저금통 계좌 연동하기" onCta={()=>setSheet(true)} onSkip={skip}
      sheet={sheet && <Sheet noDim onClose={()=>setSheet(false)}>
        <h2 className="h1"><span className="blue">비상금</span> 상자 설정</h2>
        <p className="sub" style={{marginTop:8}}>매출이 적은 달을 버틸 자금을 모아둘 상자예요</p>
        <div className="card" style={{marginTop:16}}>
          <div className="h4">계좌 선택</div>
          <div style={{marginTop:14,display:'grid',gap:12}}>
            {ACCOUNTS.map((a,i)=>(
              <button key={a.bank} className="row" style={{width:'100%'}} onClick={()=>setSel(v=>v.map((x,xi)=>xi===i?!x:x))}>
                <span style={{display:'flex',gap:10,alignItems:'center'}}>
                  <span className={'cbox'+(sel[i]?' on':'')}></span>
                  <span className="t16">{a.bank}</span>
                  <span className="b12" style={{color:'#9E9E9E'}}>{a.desc.split(' ')[0]}</span>
                </span>
                <span className="t16">{won(a.bal)}원</span>
              </button>
            ))}
          </div>
          <div className="row" style={{marginTop:16,background:'#F4F6FF',border:'1px solid #C5CFFF',borderRadius:8,padding:'14px 16px'}}>
            <span className="b14" style={{color:'#616161'}}>합산 저축액</span><span className="h4 blue">{won(sum)}원</span>
          </div>
        </div>
        <div className="card" style={{marginTop:12}}>
          <div className="h4">목표 저축액 설정</div>
          <div className="row" style={{marginTop:16}}><span className="b14" style={{color:'#616161'}}>고정비(A)</span><span className="h4">월 {won(fixed)}원</span></div>
          <div className="row" style={{marginTop:14}}><span className="b14" style={{color:'#616161'}}>세이프존 (B)</span>
            <select value={zone} onChange={e=>setZone(+e.target.value)} style={{border:'1px solid #C5CFFF',borderRadius:8,padding:'7px 10px',fontSize:13,color:'#5F79FF',background:'#fff'}}>
              {[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}개월</option>)}
            </select>
          </div>
          <div className="row" style={{marginTop:14}}><span className="b14" style={{color:'#616161'}}>목표 저축액 (A*B)</span><span className="h4">{won(goal)}원</span></div>
          <div className="rowsep"></div>
          <div className="row"><span className="b14" style={{color:'#616161'}}>현재 달성률</span><span className="h4 blue">{rate}%</span></div>
          <div style={{marginTop:10,height:6,borderRadius:3,background:'#EEEEEE'}}><i style={{display:'block',width:rate+'%',height:6,borderRadius:3,background:'#5F79FF'}}></i></div>
        </div>
        <div className="card" style={{marginTop:12}}>
          <div className="h4">최소 유지 금액 설정</div>
          <div className="row" style={{marginTop:16}}><span className="b14" style={{color:'#616161'}}>세이프존</span>
            <select value={minZone} onChange={e=>setMinZone(+e.target.value)} style={{border:'1px solid #C5CFFF',borderRadius:8,padding:'7px 10px',fontSize:13,color:'#5F79FF',background:'#fff'}}>
              {[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}개월</option>)}
            </select></div>
          <div className="row" style={{marginTop:14}}><span className="b14" style={{color:'#616161'}}>최소 유지 금액</span><span className="h4">월 {won(fixed*minZone)}원</span></div>
        </div>
        <div style={{display:'flex',gap:8,marginTop:22}}>
          <button className="btn ghost sm" style={{flex:1}} onClick={()=>setSheet(false)}>취소</button>
          <button className="btn sm" style={{flex:1}} onClick={go}>다음</button>
        </div>
      </Sheet>}
    />
  );
}

// ───────── 13. 월급 설정 + 계좌 선택
function ObSalarySet({s, set, go, back}) {
  const [sheet, setSheet] = uS(false);
  const [pick, setPick] = uS(null);
  const [err, setErr] = uS(false);
  const v = s.salary;
  const left = MONTHLY_REVENUE - OPEX - TAXRES - EMERG - v;
  return (
    <div className="screen">
      <Screen progress={100} onBack={back} foot={<>
        <button className="btn" onClick={()=>setSheet(true)}>월급 설정하기</button>
        <button className="textlink" onClick={go}>건너뛰기</button>
      </>}>
        <div className="body-pad" style={{paddingTop:8}}>
          <h1 className="title">이제 사장님 월급을<br/>정해볼게요</h1>
          <p className="sub">사업에 필요한 돈을 먼저 남기고, 매달 안정적으로<br/>가져갈 월급을 설정해요.</p>
          <div className="card tint" style={{marginTop:24}}>
            <div className="row">
              <span className="t16" style={{color:'#616161'}}>사장님 월급</span>
              <span style={{display:'flex',alignItems:'baseline',gap:3}}>
                <span className="d2 blue">{man(v)}만원</span><span className="l13" style={{color:'#616161'}}>/월</span>
              </span>
            </div>
            <input type="range" min={1000000} max={4000000} step={100000} value={v}
              onChange={e=>set({salary:+e.target.value})}
              style={{width:'100%',marginTop:18,accentColor:'#5F79FF'}}/>
            <div className="row" style={{marginTop:2}}>
              {[100,200,300,400].map(n=><span key={n} className="cap12" style={{color:'#9E9E9E'}}>{n}만</span>)}
            </div>
            <p className="b12" style={{marginTop:14,color:'#616161'}}>안내된 금액은 사용자의 소득 및 고정 지출에 따라 AI 시뮬레이션 결과입니다.</p>
          </div>
          <div className="card" style={{marginTop:12,padding:'4px 18px',border:'1px solid #EAEAEA'}}>
            {[['사업 운영비',OPEX,false],['세금(예상)',TAXRES,false],['비상금',EMERG,false],['남는 돈',left,true]].map(([t,n,isLeft],i)=>(
              <div className="row" key={t} style={{padding:'16px 0',borderTop:i?'1px dashed #E0E0E0':'0'}}>
                <span className="b14" style={{color:'#616161'}}>{t}</span>
                <span className="h4" style={{color:isLeft&&n<0?'#F04452':'#222'}}>{isLeft&&n<0?'−':''}{man(Math.abs(n))}만원</span>
              </div>
            ))}
          </div>
          {left<0 && <div style={{marginTop:12,background:'#FFF0F1',borderRadius:8,padding:'14px',display:'flex',gap:8}}>
            <span style={{color:'#F04452'}}>⚠</span>
            <span className="b14" style={{color:'#F04452'}}>남는 돈이 마이너스예요. 월급을 낮추거나 지출을 줄여야 해요.</span>
          </div>}
        </div>
      </Screen>
      {sheet && <Sheet onClose={()=>setSheet(false)}>
        <h2 className="h1"><span className="blue">월급 받을 계좌를</span> 선택해 주세요!</h2>
        <div style={{marginTop:22,display:'grid',gap:20}}>
          {ACCOUNTS.map(a=>(
            <button key={a.bank} className="row" style={{width:'100%'}} onClick={()=>{setPick(a.bank);setErr(false);}}>
              <span style={{display:'flex',gap:10,alignItems:'center'}}>
                <span style={{width:20,height:20,borderRadius:'50%',border:'1.5px solid '+(pick===a.bank?'#5F79FF':'#C7C7C7'),display:'grid',placeItems:'center'}}>
                  {pick===a.bank && <i style={{width:10,height:10,borderRadius:'50%',background:'#5F79FF',display:'block'}}></i>}
                </span>
                <span className="t16">{a.bank}</span>
              </span>
              <span className="b12" style={{color:'#9E9E9E'}}>{a.desc}</span>
            </button>
          ))}
        </div>
        {err && <p className="b14" style={{textAlign:'center',color:'#F04452',marginTop:18}}>월급 받을 계좌를 선택해 주세요</p>}
        <div style={{display:'flex',gap:8,marginTop:22}}>
          <button className="btn ghost sm" style={{flex:1}} onClick={()=>setSheet(false)}>취소</button>
          <button className="btn sm" style={{flex:1}} onClick={()=>pick?go():setErr(true)}>시작하기</button>
        </div>
      </Sheet>}
    </div>
  );
}

// ───────── 14. 월급 설정 완료
const DONE_SPEND = [['임대료',40,960000,'#5F79FF'],['인건비',25,600000,'#3FC6C0'],['재료비',18,430000,'#C4E427'],['대출이자',10,240000,'#F5EE7A'],['기타',7,170000,'#EDF0F5']];
function Donut({data, size=190, thick=38}) {
  const r = (size-thick)/2, c = 2*Math.PI*r; let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:'block'}}>
      <g transform={`rotate(-90 ${size/2} ${size/2})`}>
        {data.map(([label,pct,,color])=>{
          const len = c*pct/100, off = -c*acc/100; acc += pct;
          return <circle key={label} cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={thick}
            strokeDasharray={`${len} ${c-len}`} strokeDashoffset={off}/>;
        })}
      </g>
    </svg>
  );
}
function ObSalaryDone({s, go, back}) {
  const total = DONE_SPEND.reduce((a,b)=>a+b[2],0);
  return (
    <Screen progress={100} onBack={back} foot={<>
      <button className="btn" onClick={go}>월급술사 바로가기</button>
      <button className="textlink" style={{whiteSpace:'nowrap'}} onClick={back}>설정 다시 하기</button></>}>
      <div className="body-pad" style={{paddingTop:12,textAlign:'center'}}>
        <span style={{display:'inline-block',background:'#5F79FF',color:'#fff',fontSize:13,fontWeight:700,padding:'7px 16px',borderRadius:999}}>설정 완료</span>
        <h1 className="title" style={{marginTop:16}}>매달 25일, <span className="blue">{man(s.salary)}만원</span>이<br/>사장님 통장으로 갑니다</h1>
        <img src="assets/lupang-done.png" alt="" style={{width:150,margin:'18px auto 0',display:'block',animation:'float 3.2s ease-in-out infinite'}}/>
        <p className="sub" style={{marginTop:14}}>설정한 내용을 정리했어요.<br/>언제든 다시 바꿀 수 있어요.</p>
      </div>
      <div className="body-pad" style={{paddingTop:0}}>
        <div className="card" style={{marginTop:6,padding:'4px 18px',border:'1px solid #EAEAEA'}}>
          <div className="h4" style={{padding:'18px 0 4px'}}>설정한 월급</div>
          {[['금액',<span className="h4 blue" style={{whiteSpace:'nowrap'}}>월 {man(s.salary)}만원</span>],['받는 날',<span className="h4" style={{whiteSpace:'nowrap'}}>매달 25일</span>],['월급 계좌',<span className="h4">미설정</span>]].map(([t,v],i)=>(
            <div className="row" key={t} style={{padding:'14px 0',borderTop:i?'0':'0'}}>
              <span className="b14" style={{color:'#616161'}}>{t}</span>{v}
            </div>
          ))}
          <div style={{height:6}}></div>
        </div>
        <div className="card" style={{marginTop:12,padding:'4px 18px',border:'1px solid #EAEAEA'}}>
          <div className="h4" style={{padding:'18px 0 4px'}}>비상금</div>
          <div className="row" style={{padding:'14px 0'}}><span className="b14" style={{color:'#616161'}}>목표 금액</span><span className="h4 blue">1,500만원</span></div>
          <div className="row" style={{padding:'0 0 20px'}}><span className="b14" style={{color:'#616161'}}>비상금 계좌</span><span className="h4" style={{whiteSpace:'nowrap'}}>카카오뱅크 주거래 우대통장</span></div>
        </div>
        <div className="card" style={{marginTop:12,padding:'4px 18px 20px',border:'1px solid #EAEAEA'}}>
          <div className="h4" style={{padding:'18px 0 4px'}}>순수익</div>
          <div className="row" style={{padding:'14px 0'}}><span className="b14" style={{color:'#616161'}}>입금 계좌</span><span className="h4" style={{whiteSpace:'nowrap'}}>국민은행 123456-01-****</span></div>
          <div className="row" style={{padding:'0 0 4px'}}><span className="b14" style={{color:'#616161'}}>지출 계좌</span><span className="h4">하나은행 352-0918-**** <span className="b12" style={{color:'#9E9E9E'}}>외 2개</span></span></div>
          <div className="rowsep"></div>
          <div style={{position:'relative',display:'grid',placeItems:'center',margin:'8px 0 4px'}}>
            <Donut data={DONE_SPEND}/>
            <div style={{position:'absolute',textAlign:'center'}}>
              <div className="b12" style={{color:'#9E9E9E'}}>월 지출</div>
              <div className="h3" style={{marginTop:2}}>{man(total)}만원</div>
            </div>
          </div>
          <div style={{marginTop:16,display:'grid',gap:14}}>
            {DONE_SPEND.map(([label,pct,amt,color])=>(
              <div className="row" key={label}>
                <span style={{display:'flex',alignItems:'center',gap:9}}>
                  <i style={{width:8,height:8,borderRadius:'50%',background:color,display:'block'}}></i>
                  <span className="b14">{label}</span>
                </span>
                <span style={{display:'flex',alignItems:'center',gap:16}}>
                  <span className="b14" style={{color:'#9E9E9E'}}>{pct}%</span>
                  <span className="b14" style={{minWidth:64,textAlign:'right'}}>{man(amt)}만원</span>
                </span>
              </div>
            ))}
          </div>
          <p className="b12" style={{marginTop:18,color:'#9E9E9E'}}>최근 3개월 지출 내역을 기준으로 자동 분류했어요</p>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, {ObIntro, ObSalaryDone, ObProfile, ObWant, ObIndustry, ObRevenue, ObFeatures, ObSignup, ObAuth, ObConsent, ObLoading, ObChecklist, ObCoach1, ObCoach2, ObSalarySet, ProfitCard, PiggyCard, ChecklistCardMini, ACCOUNTS, MONTHLY_REVENUE, OPEX, TAXRES, EMERG});
