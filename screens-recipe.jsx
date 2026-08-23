// screens-recipe.jsx — 05 금융상품 (머니 레시피 / 대출 / 투자 / 보험 / 카드)

const RC_TABS = [
  ['loan','대출','M4 9h16v11H4V9ZM8 9V6h8v3M9 14h6'],
  ['invest','투자','M4 18l5-6 4 3 6-8M15 7h5v5'],
  ['insure','보험','M12 3l7 3v6c0 4-3 6.5-7 8-4-1.5-7-4-7-8V6l7-3Z'],
  ['card','카드','M3 7h18v11H3V7ZM3 11h18M7 15h4'],
];

const RC_LOAN = [
  ['보증서로 대출 받기','카카오뱅크 개인사업자 보증서 대출','1.82%','최대 1억원',['S','#1D4ED8','#fff']],
  ['개인사업자 대출 갈아타기','케이뱅크 개인사업자 신용대출','연 5.27 ~ 11.5%','최대 10억원',['Kbank','#101C4B','#fff']],
  ['개인사업자 부동산 담보 대출','카카오뱅크 개인사업자 부동산담보대출','연 5.27 ~ 8.9%','최대 1.2억원',['K','#FFDC00','#3B2C00']],
];
const RC_INVEST = [
  ['차곡차곡 돈 굴리기','카카오뱅크 개인사업자 통장','+ 0.18%','12개월 후',['1','#7FE0A8','#0B6B3A']],
  ['미래성장기업에 안정 더하기','NH-Amundi성장주도코리아130증권투자신탁(채권…','+18.54%','6개월 후',['5','#F26A6A','#fff']],
  ['거북이처럼 꾸준한 수익추구','마이다스거북이90증권투자신탁1호(주식)Ce','+5.68%','6개월 후',['3','#FFB44D','#5A3400']],
];
const RC_INSURE = [
  ['배송 실수도 보상 받아요!','온라인 자영업자 전용 보험',null,null,['S','#1D4ED8','#fff']],
  ['매장에 문제가 생겼을 때','KB 개인사업자 사업장 화재 보험',null,null,['KB','#FFD400','#3B2C00']],
  ['오토바이 운전자도 간편 가입','DB손해보험 다이렉트 라이더+보험',null,null,['N','#00C36A','#fff']],
];
const RC_CARD = [
  ['통신비 최대 50%할인 받아요!','KB국민 Youth Club 체크카드',null,null,['S','#1D4ED8','#fff']],
  ['관리비 최대 10% 아끼는 비법','LOCA 365',null,null,['LOCA','#111111','#fff']],
  ['주유비 최대 3만원 할인 받아요!','신한카드 Mr.Life',null,null,['S','#1D4ED8','#fff']],
];

const RcTile = ({t}) => (
  <span style={{width:44,height:44,borderRadius:10,flex:'none',display:'grid',placeItems:'center',
    background:t?t[1]:'#F0F0F0',color:t?t[2]:'#9E9E9E',fontSize:t&&t[0].length>2?11:17,fontWeight:800,letterSpacing:'-.02em'}}>{t?t[0]:''}</span>
);

function RecipeMain({onBack, go}) {
  const scRef = React.useRef(null);
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <AppHeader title="머니 레시피" onBack={onBack} icons={false}/>
      <div className="scroll" ref={scRef} style={{marginTop:14}}>
        <div style={{padding:'0 20px 30px',display:'grid',gap:14}}>
          <div className="card" style={{padding:'16px 18px',display:'flex',gap:10,alignItems:'center'}}>
            <span style={{background:'#222',color:'#fff',borderRadius:14,padding:'5px 10px',fontSize:11,fontWeight:700,display:'inline-flex',alignItems:'center',gap:5,flex:'none'}}>
              <i style={{width:6,height:6,borderRadius:'50%',background:'#22C55E',display:'block'}}></i>안정</span>
            <span className="b14" style={{fontWeight:600}}>투자로 자산을 키워볼 타이밍입니다.</span>
          </div>

          <div style={{background:'linear-gradient(180deg,#93A6F7 0%,#8095F3 100%)',borderRadius:14,padding:'22px 20px 18px',position:'relative'}}>
            <span style={{position:'absolute',right:16,top:18,background:'#EFF2FF',color:'#5F6B8C',borderRadius:999,padding:'5px 12px',fontSize:12,fontWeight:700}}>AD</span>
            <div className="h2" style={{color:'#fff',lineHeight:1.4}}>신한 자산운용<br/>알아서 자라는 자산 마법!</div>
            <div style={{background:'#fff',borderRadius:12,padding:'18px 16px',marginTop:20,textAlign:'center'}}>
              <div className="h3" style={{color:'#5F79FF'}}>신한마음편한TDF</div>
              <div className="b14" style={{marginTop:6,color:'#9E9E9E'}}>(2035, 2040, 2045)</div>
              <div className="b14" style={{marginTop:8}}>수탁고 500억 이상 TDF 중 <b style={{color:'#F04452'}}>3년 수익률 1위</b></div>
              <div className="cap12" style={{marginTop:8,color:'#BDBDBD',display:'flex',gap:6,justifyContent:'center',alignItems:'center'}}>
                <i style={{width:7,height:7,borderRadius:'50%',background:'#BDBDBD',display:'block'}}></i>신한자산운용</div>
            </div>
            <div style={{display:'flex',gap:7,justifyContent:'center',marginTop:16}}>
              {[0,1,2,3,4].map(i=><i key={i} style={{width:7,height:7,borderRadius:'50%',background:i===2?'#5F79FF':'#D9DEF6',display:'block'}}></i>)}
            </div>
          </div>

          <div style={{display:'flex',gap:10}}>
            {RC_TABS.map(([k,label,icon])=>(
              <button key={k} onClick={()=>go('recipe_'+k)} style={{flex:1,display:'grid',justifyItems:'center',gap:10}}>
                <span style={{width:'100%',aspectRatio:'1',maxWidth:70,background:'#fff',borderRadius:16,display:'grid',placeItems:'center',boxShadow:'0 2px 8px rgba(0,0,0,.05)'}}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d={icon} stroke="#5F79FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span className="l13" style={{fontWeight:600}}>{label}</span>
              </button>
            ))}
          </div>

          <RcSection title="대출" onMore={()=>go('recipe_loan')} rows={RC_LOAN}/>

          <button className="row" style={{width:'100%',background:'#5F79FF',borderRadius:12,padding:'20px 18px'}} onClick={()=>go('bank')}>
            <span className="h4" style={{color:'#fff'}}>저금통 잔액</span>
            <span style={{display:'flex',gap:8,alignItems:'center'}}><span className="h2" style={{color:'#fff'}}>1,235만원</span><Chevron d="right" c="#fff" s={18}/></span>
          </button>

          <RcSection title="투자" onMore={()=>go('recipe_invest')} rows={RC_INVEST} gain/>
          <RcSection title="보험" onMore={()=>go('recipe_insure')} rows={RC_INSURE} badge="보험료 확인"/>
          <RcSection title="카드" onMore={()=>go('recipe_card')} rows={RC_CARD} badge="상품 정보"/>
        </div>
      </div>
      <button onClick={()=>scRef.current && scRef.current.scrollTo({top:0,behavior:'smooth'})}
        style={{position:'absolute',right:16,bottom:24,width:48,height:48,borderRadius:'50%',background:'#5F79FF',
          display:'grid',placeItems:'center',boxShadow:'0 6px 16px rgba(95,121,255,.4)'}} aria-label="맨 위로">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 19V6m0 0-6 6m6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

function RcSection({title, rows, onMore, badge, gain}) {
  return (
    <div className="card" style={{padding:'18px 18px 6px'}}>
      <button className="row" style={{width:'100%'}} onClick={onMore}>
        <span className="h3">{title}</span><Chevron d="right" c="#9E9E9E" s={20}/>
      </button>
      <div style={{height:1,background:'#EEEEEE',marginTop:16}}></div>
      {rows.map((r,i)=>(
        <div className="row" key={r[0]} style={{padding:'16px 0',borderBottom:i<rows.length-1?'1px solid #F0F0F0':'0',gap:10,alignItems:'center'}}>
          <span style={{display:'flex',gap:12,alignItems:'center',flex:1,minWidth:0}}>
            <RcTile t={r[4]}/>
            <span style={{minWidth:0}}>
              <span className="t16" style={{display:'block',fontSize:15}}>{r[0]}</span>
              <span className="cap12" style={{display:'block',marginTop:5,color:'#9E9E9E',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:190}}>{r[1]}</span>
            </span>
          </span>
          {badge
            ? <span style={{border:'1px solid #ADBAFF',color:'#5F79FF',borderRadius:999,padding:'8px 14px',fontSize:12,fontWeight:600,flex:'none'}}>{badge}</span>
            : <span style={{textAlign:'right',flex:'none'}}>
                <span className="h4" style={{display:'block',color:gain?'#00B25D':'#222'}}>{r[2]}</span>
                <span className="cap12" style={{display:'block',marginTop:5,color:'#9E9E9E'}}>{r[3]}</span></span>}
        </div>
      ))}
    </div>
  );
}

const RC_DETAIL = {
  loan:{title:'대출', groups:[
    ['개인사업자 상품',[['보증서로 대출받기','1.82%/ 최저 1개월'],['카카오뱅크 개인사업자/부동산 담보대출','연 2.66% ~ 7.35% / 최대 1개월'],
      ['카카오뱅크 개인사업자 보증서대출','연 1.82% ~ 5.32% / 최대 1개월'],['카카오뱅크 개인사업자 신용대출','연 3.27% ~ 13.64% / 최대 1개월']]],
    ['대출 갈아타기',[['주택담보대출 갈아타기','연 3.28% ~ 5.27% / 최대 10'],['신용대출 갈아타기','연 4.23% ~ 12.63% / 최대 1개월'],
      ['전월세보증금 대출 갈아타기','연 1.82% ~ 5.32% / 최대 1개월'],['개인사업자 대출 갈아타기','연 3.27% ~ 13.64% / 최대 1개월']]],
    ['내게 맞는 대출 찾기',[['신용대출 비교하기'],['사업자 전용 대출 비교하기'],['사장님 정책자금 대출 찾기']]],
    ['대출 관리',[['내 신용정보'],['대출 이자 계산기'],['대출 공시금리 조회하기']]],
  ], banner:{title:'사업자 대출, 동종업계 대비 낮은 이율로 시작하기', cta:'지금 토스에서 확인하기'}},
  invest:{title:'투자', tabs:['통장','저축','투자','연금'], groups:[
    ['통장',[['[KB은행] 사업자운전자금MMF','연 3.56% ~ 5.15%'],['[제주은행] M2플랜정기적금','연 3.15% ~ 5.35%'],
      ['[제주은행] J정기예금','연 2.15% ~ 3.11%'],['[토스뱅크] 먼저 이자받는 정기예금','연 2.72% ~ 3.10%'],
      ['[다올저축은행] FI방식든whitehead통장','연 1.10% ~ 5.01%'],['[KB저축은행] kiwi파킹통장','연 1.13% ~ 2.5%']]],
    ['저축',[['[우리은행] 자영업자 전용주치의적금','(마스 ~ 최대 이자율)'],['[제주은행] M2플랜정기적금','연 3.15% ~ 5.15%'],
      ['[제주은행] J정기예금','연 2.13% ~ 3.11%'],['[토스뱅크] 먼저 이자받는 정기예금','연 2.7% ~ 3.10%'],
      ['[다올저축은행] FI방식든통통장','연 1.10% ~ 5.01%'],['[KB저축은행] kiwi파킹통장','연 1.13% ~ 2.5%']]],
    ['투자',[['펀드','어디에다 자산을 하나로 담은 투자 상품'],['증권사 금융상품 투자','장기적으로 보다는 적은 수 방법들']]],
    ['연금',[['노란우산공제','세액공제 혜택']]],
  ]},
  insure:{title:'보험', groups:[
    ['5월 보험료',[['79,900','라이나생명 치아보험','납입완료'],['32,850','[현대해상] 다중이 용업소 화재배상책임보험','납입완료'],['40,950','[근로복지공단] 자영업자 고용 보험','납입예정']]],
    ['개인 사업자 상품',[['영업배상책임보험','손님이 매장 내에서 다치거나 물품이 파손되었을 경우 배상 보장해줘요.'],
      ['단체상해보험','직원의 상시적 업무 중 상해나 질병으로 인한 손실을 보장해요.'],
      ['사업주 실손의료보험','사업주 본인의 의료 경우, 입원 및 진통관비, 약값 등 실비 보장을 보장해줘요.'],
      ['소득보장보험','사고나 질병으로 인해 영업기간 중 소득 손실을 보장해요.'],
      ['재해휴업손실보험','화재나 재해로 인한 휴업된 동안 영업 손실이 발생한 손실을 보장할 수 있어요.'],
      ['온라인 자영업자 전용 보험','예상 상품 등의 각종, 대구 지역, 소상시 상권과 대비할 수 있어요.']]],
    ['내게 맞는 보험 찾기',[['사업자 전용 보험 비교하기'],['새로운 사장님 보험이 필요한가요?'],['숨은 보험금 조회하기']]],
  ]},
  card:{title:'카드', groups:[
    ['사장님을 위한 신용카드',[['[카카오뱅크] 개인사업자 삼성카드','최대 37만원 혜택'],['[카카오뱅크] 개인사업자 삼성카드','최대 34만원 혜택'],
      ['[카카오뱅크] BUSINESS 현대카드','최대 34만원 혜택'],['[카카오뱅크] BUSINESS 현대카드 PRIME','최대 35만원 혜택'],
      ['[삼성카드] 삼성과 ID SELECT ALL 카드','최대 12만원 혜택'],['[신한카드] Biz Plan','최대 30만원 혜택']]],
    ['사장님을 위한 체크카드',[['[KB국민카드] KB국민 Youth Club 체크카드','소비생활 알아보고, 통신 요금까지 50% 할인'],
      ['[신한카드] 국민행복 체크','나거림 1개, 50% 할인'],['[신한카드] 신한 유형 기족동행 체크카드','무료 기타유원지 서비스 제공']]],
    ['카드 관리',[['사업자 신용카드 등록하러 가기'],['신용카드 혜택 비교하기'],['예상 최대 한도 보러가기']]],
  ]},
};

function RecipeDetail({kind, back}) {
  const d = RC_DETAIL[kind];
  const [tab, setTab] = uS(d.tabs ? d.tabs[0] : null);
  const groups = d.tabs ? d.groups.filter(g=>g[0]===tab) : d.groups;
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <AppHeader title={d.title} onBack={back} icons={false}/>
      {d.tabs && (
        <div style={{display:'flex',gap:8,padding:'16px 20px 0',flex:'none'}}>
          {d.tabs.map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,paddingBottom:10,fontSize:14,fontWeight:tab===t?700:400,
              color:tab===t?'#5F79FF':'#9E9E9E',borderBottom:'2px solid '+(tab===t?'#5F79FF':'transparent')}}>{t}</button>
          ))}
        </div>
      )}
      <div className="scroll" style={{marginTop:16}}>
        <div style={{padding:'0 20px 30px',display:'grid',gap:12}}>
          {groups.map(([g,rows])=>(
            <div className="card" key={g} style={{padding:16}}>
              <div className="h3">{g}</div>
              <div style={{height:1,background:'#EEEEEE',margin:'16px 0 2px'}}></div>
              {rows.map(r=>(
                <div className="row" key={r[0]} style={{marginTop:16,alignItems:'flex-start'}}>
                  <span style={{flex:1}}>
                    <span className="b14" style={{display:'block',fontWeight:600}}>{r[0]}</span>
                    {r[1] && <span className="cap12" style={{display:'block',marginTop:6,color:'#9E9E9E',lineHeight:1.5}}>{r[1]}</span>}
                  </span>
                  {r[2] && <span style={{border:'1px solid #ADBAFF',color:'#5F79FF',borderRadius:12,padding:'4px 9px',fontSize:11,fontWeight:600,flex:'none',marginLeft:10}}>{r[2]}</span>}
                </div>
              ))}
              {g==='개인사업자 상품' && d.banner && (
                <div style={{marginTop:20}}>
                  <div className="b12" style={{color:'#616161'}}>{d.banner.title} <span style={{border:'1px solid #9E9E9E',borderRadius:8,padding:'1px 5px',fontSize:9,marginLeft:4}}>AD</span></div>
                  <button className="btn sm" style={{marginTop:12,background:'#EEF1FF',color:'#5F79FF',fontSize:13}}>{d.banner.cta}</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 잠금화면 알림
function LockScreen({go}) {
  const notes = [
    ['사장님, 지난주 23만원 더 남았어요.','이번주 준비할 것 2가지를 정리했어요'],
    ['다음주 봄 성수기 시작!','작년엔 매출이 20% 뛰었어요. 미리 준비해요'],
  ];
  return (
    <div className="screen" style={{background:'linear-gradient(160deg,#F04452 0%,#B0459B 32%,#7B62C8 58%,#59A8D6 78%,#8FC5D8 100%)'}}>
      <StatusBar dark/>
      <div className="sb-pad"></div>
      <div style={{display:'grid',placeItems:'center',marginTop:12,color:'#fff'}}>
        <svg width="22" height="26" viewBox="0 0 24 28" fill="none"><rect x="4" y="11" width="16" height="14" rx="3.4" fill="#fff"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/></svg>
        <div style={{fontSize:74,fontWeight:300,letterSpacing:'-0.02em',marginTop:6,lineHeight:1}}>9:41</div>
        <div style={{fontSize:19,fontWeight:500,marginTop:8}}>Monday, June 3</div>
      </div>
      <div style={{padding:'26px 14px 0',display:'grid',gap:10}}>
        {notes.map(([t,d],i)=>(
          <button key={i} onClick={go} style={{textAlign:'left',background:'rgba(255,255,255,.34)',backdropFilter:'blur(14px)',borderRadius:16,padding:'12px 14px',display:'flex',gap:11}}>
            <span style={{width:38,height:38,borderRadius:9,background:'#5F79FF',display:'grid',placeItems:'center',flex:'none'}}>
              <img src="assets/lupang-peek.png" alt="" style={{width:32}}/>
            </span>
            <span style={{flex:1}}>
              <span style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:13,fontWeight:700,color:'#fff'}}>월급술사</span>
                <span style={{fontSize:11,color:'rgba(255,255,255,.85)'}}>방금전</span>
              </span>
              <span style={{display:'block',fontSize:13,color:'#fff',marginTop:5,lineHeight:1.45}}>{t}<br/>{d}</span>
            </span>
          </button>
        ))}
      </div>
      <div style={{flex:1}}></div>
      <div className="row" style={{padding:'0 34px 46px'}}>
        {[['M12 3v9','flash'],['camera','camera']].map(([_,k])=>(
          <span key={k} style={{width:46,height:46,borderRadius:'50%',background:'rgba(255,255,255,.3)',backdropFilter:'blur(10px)',display:'grid',placeItems:'center'}}>
            {k==='flash'
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M9 3h6v3H9V3Zm-1 5h8v9a4 4 0 0 1-8 0V8Zm3 3v6h2v-6h-2Z"/></svg>
              : <svg width="21" height="21" viewBox="0 0 24 24" fill="#fff"><path d="M9 4h6l1 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1-2Zm3 5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"/></svg>}
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {RecipeMain, RecipeDetail, LockScreen});
