// screens-book.jsx — 02 장부 (AI 리포트 / 주간 / 월간 / 연간 + 카테고리 상세)

const BOOK_TABS = ['AI 리포트','주간','월간','연간'];

function BookHeader({title, onBack}) {
  return (
    <div className="row" style={{padding:'8px 20px 0',flex:'none'}}>
      <span style={{display:'flex',alignItems:'center',gap:8}}>
        {onBack && <button onClick={onBack} style={{marginLeft:-6}}><Chevron/></button>}
        <span className="h2">{title}</span>
      </span>
      <span style={{display:'flex',gap:16}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.6" stroke="#222" strokeWidth="1.7"/><path d="M16 16l4 4" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5.5" r="2.5" stroke="#222" strokeWidth="1.6"/><circle cx="6" cy="12" r="2.5" stroke="#222" strokeWidth="1.6"/><circle cx="18" cy="18.5" r="2.5" stroke="#222" strokeWidth="1.6"/><path d="M8.3 10.8 15.7 6.7M8.3 13.2l7.4 4.1" stroke="#222" strokeWidth="1.6"/></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" stroke="#222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </div>
  );
}
function BookTabs({tab, setTab}) {
  return (
    <div style={{display:'flex',gap:8,padding:'18px 20px 0',flex:'none'}}>
      {BOOK_TABS.map(t=>(
        <button key={t} onClick={()=>setTab(t)} style={{flex:1,paddingBottom:10,fontSize:14,fontWeight:tab===t?700:400,
          color:tab===t?'#5F79FF':'#9E9E9E',borderBottom:'2px solid '+(tab===t?'#5F79FF':'transparent')}}>{t}</button>
      ))}
    </div>
  );
}
function Period({label, prev=true, next=false, onPrev, onNext}) {
  const dot = on => ({width:28,height:28,borderRadius:'50%',border:'1px solid '+(on?'#5F79FF':'#E0E0E0'),display:'grid',placeItems:'center'});
  return (
    <div className="row" style={{padding:'16px 20px 4px',flex:'none'}}>
      <button style={dot(prev)} disabled={!prev} onClick={onPrev} aria-label="이전"><Chevron s={16} c={prev?'#5F79FF':'#C7C7C7'}/></button>
      <span className="h3">{label}</span>
      <button style={dot(next)} disabled={!next} onClick={onNext} aria-label="다음"><Chevron d="right" s={16} c={next?'#5F79FF':'#C7C7C7'}/></button>
    </div>
  );
}
const Bcard = ({title, children, style}) => (
  <div className="card" style={{padding:'20px 18px',...style}}>
    {title && <><div className="h3">{title}</div><div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div></>}
    {children}
  </div>
);
const Krow = ({l, r, muted, color, top=14}) => (
  <div className="row" style={{marginTop:top}}>
    <span className="b14" style={{color:muted?'#9E9E9E':'#616161'}}>{l}</span>
    <span className={muted?'b14':'h4'} style={{color:color||(muted?'#9E9E9E':'#222')}}>{r}</span>
  </div>
);

// ── AI 리포트
function BookAI({onDetail, go}) {
  const [open, setOpen] = uS(true);
  const [pick, setPick] = uS(0);
  const bars = [['4월',263,false],['5월',242,false],['6월',271,false],['7월',300,true]];
  return (
    <div style={{padding:'12px 20px 24px',display:'grid',gap:12}}>
      <Bcard title="지난달 회고">
        <button className="row" style={{width:'100%'}} onClick={()=>setOpen(o=>!o)}>
          <span className="b14" style={{color:'#616161'}}>사업에 여유가 있었던 돈</span>
          <span style={{display:'flex',alignItems:'center',gap:6}}><span className="h1">3,000,000원</span><Chevron d={open?'up':'down'} s={16} c="#616161"/></span>
        </button>
        {open && <div style={{marginTop:4}}>
          <Krow l="안전한 월급" r="1,500,000원" muted/>
          <Krow l="실제 가져간 월급" r="1,800,000원" muted top={10}/>
        </div>}
        <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
        <p className="b14 blue" style={{margin:0}}>안전 범위보다 30만원 더 가져갔어요.</p>
        <p className="b14" style={{marginTop:10,marginBottom:0}}>8월 나갈 돈을 조금 여유있게 잡아둘게요.</p>
      </Bcard>

      <Bcard title="쓸 수 있었던 돈, 최근 4개월">
        <p className="b14" style={{margin:0}}>최근 4개월 · 홈 ‘지금 써도 되는 돈’의 월별 기록</p>
        <div style={{display:'flex',alignItems:'flex-end',gap:14,height:130,marginTop:20}}>
          {bars.map(([m,v,on])=>(
            <div key={m} style={{flex:1,display:'grid',gap:8,justifyItems:'center'}}>
              <span className="cap12" style={{color:on?'#222':'#9E9E9E',fontWeight:on?700:400}}>{v}만원</span>
              <div style={{width:'100%',height:v/300*90,background:on?'#5F79FF':'#F0F0F0',borderRadius:4}}></div>
              <span className="cap12" style={{color:'#9E9E9E'}}>{m}</span>
            </div>
          ))}
        </div>
      </Bcard>

      <Bcard title="지난달과 비교하면">
        <Krow l="매출이 줄었어요" r="−5%" color="#D98A00" top={0}/>
        <Krow l="인건비가 늘었어요" r="+3%" color="#F04452"/>
        <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
        <p className="b14 blue" style={{margin:0}}>특히 평일 14~16시, 매출에 비해 인건비가 높아요.</p>
        <p className="b14" style={{marginTop:8,marginBottom:0}}>이 시간대 근무를 1시간 줄이면 월 −24만원</p>
      </Bcard>

      <Bcard title="같은 업종 사장님과 비교">
        <p className="b14" style={{margin:'0 0 18px'}}>재료값 비중이 동네 평균보다 높아요</p>
        {[['우리 가게',38,'#5F79FF'],['주변 뷰티샵 평균',32,'#9E9E9E']].map(([l,v,c])=>(
          <div key={l} style={{marginBottom:16}}>
            <div className="l13" style={{color:'#616161'}}>{l}</div>
            <div className="row" style={{marginTop:8,gap:12}}>
              <div style={{flex:1,height:10,borderRadius:5,background:'#F0F0F0'}}><i style={{display:'block',width:v/40*100+'%',height:10,borderRadius:5,background:c}}></i></div>
              <span className="h4">{v}%</span>
            </div>
          </div>
        ))}
        <button className="btn line sm" style={{marginTop:6}} onClick={()=>go&&go('plan')}>인건비 · 저축 비교는 Pro에서 보기</button>
        <p className="cap12" style={{textAlign:'right',marginTop:12,color:'#9E9E9E'}}>* 동일 업종 · 상권 · 매출규모 사장님 기준</p>
      </Bcard>

      <Bcard title="지난달 체크리스트 돌아보기">
        <div style={{display:'grid',placeItems:'center'}}><img src="assets/lupang-clipboard.png" alt="" style={{width:150}}/></div>
        <p className="t16" style={{marginTop:6}}>3개 중 2개 완료 <span className="blue">21만원 아꼈어요</span></p>
        <div style={{marginTop:14,height:10,borderRadius:5,background:'#F0F0F0'}}><i style={{display:'block',width:'66%',height:10,borderRadius:5,background:'#5F79FF'}}></i></div>
        <div style={{marginTop:18,display:'grid',gap:12}}>
          {[['매출이 줄었어요','+143,000원'],['인건비가 늘었어요','+72,480원']].map(([l,r])=>(
            <div className="row" key={l}>
              <span style={{display:'flex',gap:8,alignItems:'center'}}>
                <span style={{width:16,height:16,borderRadius:'50%',background:'#424242',display:'grid',placeItems:'center'}}>
                  <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6.2l2.4 2.4L10 3" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></span>
                <span className="b14">{l}</span></span>
              <span className="t16">{r}</span>
            </div>
          ))}
        </div>
        <p className="cap12" style={{textAlign:'right',marginTop:14,color:'#9E9E9E'}}>* 효과는 실행 전후 4주 평균 비교로 계산</p>
      </Bcard>

      <div style={{background:'#EEFBF2',borderRadius:10,padding:'16px 18px'}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <span style={{width:16,height:16,borderRadius:'50%',background:'#22C55E',display:'grid',placeItems:'center'}}>
            <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6.2l2.4 2.4L10 3" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></span>
          <span className="h4" style={{color:'#1B7F4B'}}>잘 하고 계세요!</span>
        </div>
        <p className="b14" style={{margin:'8px 0 0 24px',color:'#3D7A5B'}}>다음 체크리스트는 3년차 업종 평균 확인 사항이에요.</p>
      </div>

      <Bcard title="다음달 미리 보기">
        <div className="d3">8월 안전 월급 <span className="blue">170만원</span> 예상</div>
        <div style={{marginTop:18,display:'grid',gap:10}}>
          <p className="b14" style={{margin:0}}>가세 납부가 없는 달이에요</p>
          <p className="b14" style={{margin:0}}>작년 4월 매출이 12% 높았어요 (봄 성수기)</p>
          <p className="b14" style={{margin:0}}>에어컨 점검비 등 봄 지출은 미리 뺐어요</p>
        </div>
      </Bcard>

      <Bcard title="남는 돈 82만원, 어디에 둘까요?">
        {[['마이너스통장 갚기','저축 이자보다 아끼는 대출 이자가 커요 (월 +4.1만원)',true],
          ['노란우산공제','세금을 줄이고 싶을 때',false],
          ['파킹 통장','곧 쓸 돈일 때',false]].map(([t,d,rec],i)=>{
          const on = pick===i;
          return (
          <button key={t} onClick={()=>setPick(i)} style={{width:'100%',textAlign:'left',border:'1px solid '+(on?'#5F79FF':'#E0E0E0'),background:on?'#F4F6FF':'#fff',
            borderRadius:8,padding:'14px 16px',marginBottom:10,transition:'background .18s, border-color .18s'}}>
            <div className="t16">{t} {rec && <span className="blue" style={{fontSize:13,fontWeight:700}}>추천</span>}</div>
            <div className="b12" style={{color:'#9E9E9E',marginTop:6}}>{d}</div>
          </button>);
        })}
        <button className="btn" style={{marginTop:10}} onClick={()=>go&&go('recipe')}>옮기러 가기</button>
      </Bcard>
    </div>
  );
}

// ── 주간
function BookWeek() {
  const days = [['일',72],['월',80],['화',34],['수',78],['목',68],['금',92],['토',96]];
  return (
    <div style={{padding:'12px 20px 24px',display:'grid',gap:12}}>
      <Bcard title="이번주 정리">
        <Krow l="번 돈" r="+ 7,200,000원" top={0}/>
        <Krow l="나간 돈" r="−5,400,000원" color="#F04452"/>
        <Krow l="남은 돈" r="1,800,000원"/>
        <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
        <p className="b14 blue" style={{margin:0}}>지난주보다 약 23만원 더 남았어요</p>
      </Bcard>
      <Bcard title="요일 하이라이트">
        <p className="b14" style={{margin:0}}>화요일 낮이 유난히 한가했어요</p>
        <div style={{display:'flex',alignItems:'flex-end',gap:8,height:110,marginTop:20}}>
          {days.map(([d,v])=>(
            <div key={d} style={{flex:1,display:'grid',gap:8,justifyItems:'center'}}>
              <div style={{width:'100%',height:v*0.7,background:d==='화'?'#616161':'#F0F0F0',borderRadius:4}}></div>
              <span className="cap12" style={{color:'#616161'}}>{d}</span>
            </div>
          ))}
        </div>
        <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
        <p className="b14" style={{margin:0}}>화 14~16시 근무 1시간 줄이면 <span className="blue">주 −6만원 절감</span></p>
      </Bcard>
      <Bcard title="이번주 체크리스트">
        {['재고 발주 늘리기','주말 파트 근무 확대','세금계산서 확인하기'].map(t=>(
          <div key={t} style={{display:'flex',gap:12,alignItems:'center',marginBottom:14}}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9.5l4 4L15 5" stroke="#5F79FF" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="b14">{t}</span>
          </div>
        ))}
        <p className="b14 blue" style={{margin:'2px 0 0'}}>예상 효과 : 부가세 절세 효과가 있어요!</p>
        <button className="btn line sm" style={{marginTop:16}}>지난주 체크 완료 항목 보기</button>
      </Bcard>
      <Bcard title="이번주 나갈 돈 약 380만원">
        {[['목 7/06','약재 구입','1,000,000원'],['금 7/10','직원 급여','1,000,000원'],['토 7/11','임대료','1,800,000원']].map(([d,t,v])=>(
          <div className="row" key={d} style={{marginBottom:14}}>
            <span className="b14" style={{color:'#616161'}}>{d}</span>
            <span style={{display:'flex',gap:14,alignItems:'baseline'}}><span className="b14">{t}</span><span className="h4">{v}</span></span>
          </div>
        ))}
        <p className="b14 blue" style={{margin:0}}>지금 잔액으로 충분해요</p>
      </Bcard>
      <Bcard title="이번달 월급 페이스">
        <p className="t16" style={{margin:0}}>2주차 · 적립 <span className="blue">약 75만원</span> / 안전 월급 <span className="blue">약 150만원</span></p>
        <div style={{marginTop:18,height:12,borderRadius:6,background:'#EEEEEE'}}><i style={{display:'block',width:'50%',height:12,borderRadius:6,background:'#5F79FF'}}></i></div>
        <p className="b14 blue" style={{marginTop:16,marginBottom:0}}>이대로면 이번달 안전 월급, 문제없어요</p>
        <p className="cap12" style={{textAlign:'right',marginTop:10,color:'#9E9E9E'}}>* 홈 ‘안전 월급 150만원’의 주간 진행률이에요</p>
      </Bcard>
    </div>
  );
}

// ── 월간
const IN_ROWS = [['카드','2,000,000원'],['현금','500,000원'],['배달앱','60,000원']];
const OUT_ROWS = [['식자재','−8,900,000원'],['인건비','−7,200,000원'],['임대료','−2,600,000원'],['수수료','−1,800,000원'],['기타','−1,600,000원']];
const TAX_ROWS = [['종합소득세','1,000,000원'],['지방세','200,000원'],['원천세','30,000원']];
function BookMonth({onDetail}) {
  const [oIn, setIn] = uS(true), [oOut, setOut] = uS(true), [oTax, setTax] = uS(true);
  const Head = ({label, delta, value, color, open, onClick}) => (
    <button className="row" style={{width:'100%'}} onClick={onClick}>
      <span style={{display:'flex',alignItems:'center',gap:8}}>
        <span className="h4">{label}</span><span className="cap12 blue">전월 대비 {delta}</span>
      </span>
      <span style={{display:'flex',alignItems:'center',gap:6}}>
        <span className="h2" style={{color}}>{value}</span><Chevron d={open?'up':'down'} s={16} c="#616161"/>
      </span>
    </button>
  );
  return (
    <div style={{padding:'12px 20px 24px',display:'grid',gap:12}}>
      <Bcard title="4월 손익 정리">
        <Head label="번 돈" delta="+5%" value="+ 25,600,000원" open={oIn} onClick={()=>setIn(v=>!v)}/>
        {oIn && <div style={{marginTop:12}}>{IN_ROWS.map(([l,r],i)=><Krow key={l} l={l} r={r} muted top={i?10:0}/>)}</div>}
        <div style={{height:1,background:'#EEEEEE',margin:'18px 0'}}></div>
        <Head label="나간 돈" delta="+5%" value="−21,600,000원" color="#F04452" open={oOut} onClick={()=>setOut(v=>!v)}/>
        {oOut && <div style={{marginTop:12}}>{OUT_ROWS.map(([l,r],i)=>(
          <button key={l} className="row" style={{width:'100%',marginTop:i?10:0}} onClick={()=>onDetail(l)}>
            <span className="b14" style={{color:'#9E9E9E'}}>{l}</span><span className="b14" style={{color:'#9E9E9E'}}>{r}</span>
          </button>))}</div>}
        <div style={{height:1,background:'#EEEEEE',margin:'18px 0'}}></div>
        <div className="row">
          <span style={{display:'flex',alignItems:'center',gap:8}}><span className="h4">남은 돈</span><span className="cap12 blue">전월 대비 +5%</span></span>
          <span className="h2">4,000,000원</span>
        </div>
      </Bcard>
      <div style={{background:'#EEFBF2',borderRadius:10,padding:'18px',display:'flex',gap:8,alignItems:'center'}}>
        <span style={{width:16,height:16,borderRadius:'50%',background:'#22C55E',display:'grid',placeItems:'center',flex:'none'}}>
          <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6.2l2.4 2.4L10 3" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></span>
        <span className="h4" style={{color:'#1B7F4B'}}>월간 리포트는 통계를 보여드립니다</span>
      </div>
      <Bcard title="사장님 돈관리">
        <Krow l="가져간 월급" r="1,800,000원" top={0}/>
        <Krow l="비상금" r="1,000,000원"/>
        <Krow l="마이너스 통장 상환" r="820,000원"/>
        <div style={{display:'flex',gap:6,alignItems:'center',marginTop:16}}>
          <IconInfo/><span className="b12" style={{color:'#9E9E9E'}}>미리 적립해둔 돈의 월 결산이에요</span>
        </div>
      </Bcard>
      <Bcard title="세금 지급 내역">
        <button className="row" style={{width:'100%'}} onClick={()=>setTax(v=>!v)}>
          <span className="h4">이번달 낸 세금</span>
          <span style={{display:'flex',alignItems:'center',gap:6}}><span className="h2">1,230,000원</span><Chevron d={oTax?'up':'down'} s={16} c="#616161"/></span>
        </button>
        {oTax && <div style={{marginTop:12}}>{TAX_ROWS.map(([l,r],i)=><Krow key={l} l={l} r={r} muted top={i?10:0}/>)}</div>}
      </Bcard>
    </div>
  );
}

// ── 연간
const PEAK = [4,5,6,7];
const YEAR_SHEET = {
  5:{tag:'성수기', head:'최근 2년 5월 매출이 연평균보다 +18%였어요',
     rows:[['2024','2,000만원','–'],['2025','2,000만원','380만원'],['2026','3,200만원','620만원']],
     note:'* 2024는 업종 평균 (내 데이터 없음)', plan:'이 달의 일정  종합소득세 납부 · 완료'},
  12:{tag:'비수기', head:'최근 2년 12월 매출이 연평균보다 −12%였어요',
     rows:[['2024','2,000만원','–'],['2025','2,000만원','380만원'],['2026','3,200만원','–']],
     plan:'이 달의 일정  다음해 1월 부가세 확정신고',
     box:['참고 예상: 2,600~3,000만원 사이','최근 2년 12월 기준 · 빗나갈 수 있어요'],
     point:'준비 포인트  11월부터 남길 돈을 늘려둘게요', cta:()=>'주간 체크리스트로 등록'},
};
function BookYear() {
  const [m, setM] = uS(null);
  const months = [1,2,3,4,5,6,7,8,9,10,11,12];
  const bars = [30,34,38,74,88,86,80,40,36,34,32,30];
  const d = m ? (YEAR_SHEET[m] || YEAR_SHEET[PEAK.includes(m)?5:12]) : null;
  return (
    <>
      <div style={{padding:'12px 20px 24px',display:'grid',gap:12}}>
        <Bcard title="2025년 결산">
          {[['번 돈','작년 대비 +5%','+ 454,000,000원',null],['나간 돈','작년 대비 +2%','−254,000,000원','#F04452'],
            ['남은 돈','작년 대비 +5%','200,000,000원','#1B7F4B'],['가져간 월급 합계','작년 대비 +5%','54,600,000원',null]].map(([l,dd,v,c],i)=>(
            <div className="row" key={l} style={{marginTop:i?14:0}}>
              <span style={{display:'flex',alignItems:'center',gap:8}}><span className="h4">{l}</span><span className="cap12" style={{color:'#9E9E9E'}}>{dd}</span></span>
              <span className="h3" style={{color:c||'#222'}}>{v}</span>
            </div>
          ))}
          <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
          <p className="b14" style={{margin:0,color:'#616161'}}>월 평균 168만원을 가져갔어요</p>
        </Bcard>
        <Bcard title="월별로 보면">
          <p className="b14" style={{margin:0}}>우리 가게 성수기는 <span className="blue">4~7월</span></p>
          <div style={{display:'flex',alignItems:'flex-end',gap:4,height:110,marginTop:20}}>
            {bars.map((v,i)=>(
              <div key={i} style={{flex:1,display:'grid',gap:8,justifyItems:'center'}}>
                <div style={{width:'100%',height:v*0.85,background:PEAK.includes(i+1)?'#616161':'#F0F0F0',borderRadius:3}}></div>
                <span className="cap10" style={{color:'#9E9E9E'}}>{i+1}</span>
              </div>
            ))}
          </div>
          <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
          <p className="b14" style={{margin:0,color:'#616161'}}>주간 계절 알림이 이 데이터를 사용해요</p>
        </Bcard>
        <Bcard title="최근 3년 월별 비교">
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
            {months.map(n=>{
              const on = PEAK.includes(n);
              return <button key={n} onClick={()=>setM(n)} style={{height:40,borderRadius:8,border:'1px solid '+(on?'#5F79FF':'#E0E0E0'),
                background:'#fff',color:on?'#5F79FF':'#9E9E9E',fontSize:14,fontWeight:on?700:400}}>{n}월</button>;
            })}
          </div>
          <div style={{display:'flex',gap:16,marginTop:18}}>
            <span className="b12" style={{color:'#616161'}}><i style={{display:'inline-block',width:8,height:8,background:'#5F79FF',marginRight:6}}></i>성수기</span>
            <span className="b12" style={{color:'#616161'}}><i style={{display:'inline-block',width:8,height:8,background:'#C7C7C7',marginRight:6}}></i>비수기</span>
          </div>
          <p className="cap12" style={{marginTop:12,color:'#9E9E9E'}}>* 겨울 비수기(12~2월)는 남길 돈 계산에 미리 반영돼요</p>
        </Bcard>
        <Bcard title="세금 캘린더">
          {[['1월','부가세 확정','냈어요 · 140만원','#1B7F4B'],['5월','종합소득세','냈어요 · 140만원','#1B7F4B'],
            ['7월','부가세 1기','예상 150만원','#D98A00'],['내년 1월','부가세 확정','적립 중',null]].map(([mo,t,v,c],i)=>(
            <div className="row" key={mo} style={{marginTop:i?14:0}}>
              <span className="b14" style={{color:'#616161'}}>{mo}</span>
              <span style={{display:'flex',gap:12,alignItems:'baseline'}}>
                <span className="b14" style={{color:'#616161'}}>{t}</span>
                <span className="h4" style={{color:c||'#222'}}>{v}</span></span>
            </div>
          ))}
          <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
          <p className="cap12" style={{margin:0,color:'#9E9E9E'}}>* 올해 낸 세금 총 350만원 · 전부 자동 분리로 준비됐어요</p>
        </Bcard>
        <Bcard title="올해의 변화">
          <div className="row" style={{marginTop:0}}>
            <span className="b14" style={{color:'#616161'}}>미션 : 32개 완료</span>
            <span style={{display:'flex',gap:8,alignItems:'center'}}><Chevron d="right" s={14} c="#9E9E9E"/><span className="h4 blue">214만원 아꼈어요</span></span>
          </div>
          <div className="row" style={{marginTop:12}}>
            <span className="b14" style={{color:'#616161'}}>월급 : 1월 130만원</span>
            <span style={{display:'flex',gap:8,alignItems:'center'}}><Chevron d="right" s={14} c="#9E9E9E"/><span className="h4 blue">12월 170만원</span></span>
          </div>
          <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
          <p className="b14" style={{margin:0}}>월급술사와 1년, 사장님 월급이 40만원 늘었어요</p>
          <p className="cap12" style={{marginTop:10,color:'#9E9E9E'}}>* 미션 효과는 실행 전후 4주 평균 비교의 연 누적</p>
        </Bcard>
      </div>
      {m && <Sheet onClose={()=>setM(null)}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span className="d3">{m}월</span>
          <span style={{border:'1px solid #ADBAFF',color:'#5F79FF',borderRadius:14,padding:'4px 10px',fontSize:12,fontWeight:600}}>{d.tag}</span>
        </div>
        <p className="b14" style={{marginTop:14}}>{d.head}</p>
        <div className="row" style={{marginTop:18}}>
          <span className="b12" style={{color:'#616161',flex:1}}>연도</span>
          <span className="b12" style={{color:'#616161',flex:1,textAlign:'center'}}>번 돈</span>
          <span className="b12" style={{color:'#616161',flex:1,textAlign:'right'}}>남은돈</span>
        </div>
        <div style={{height:1,background:'#E0E0E0',margin:'12px 0 4px'}}></div>
        {d.rows.map(([y,a,b],i)=>(
          <div className="row" key={y} style={{marginTop:14}}>
            <span className="b14" style={{color:i<2?'#9E9E9E':'#222',flex:1}}>{y}</span>
            <span className="b14" style={{color:i<2?'#9E9E9E':'#222',flex:1,textAlign:'center'}}>{a}</span>
            <span className="b14" style={{color:i<2?'#9E9E9E':'#222',flex:1,textAlign:'right'}}>{b}</span>
          </div>
        ))}
        {d.note && <p className="b12" style={{marginTop:16,color:'#616161'}}>{d.note}</p>}
        <div style={{height:1,background:'#EEEEEE',margin:'18px 0'}}></div>
        <p className="b14" style={{margin:0}}>{d.plan}</p>
        {d.box && <div style={{background:'#F5F5F5',borderRadius:8,padding:'14px 16px',marginTop:16}}>
          <div className="b14">{d.box[0]}</div><div className="b12" style={{color:'#9E9E9E',marginTop:6}}>{d.box[1]}</div></div>}
        {d.point && <p className="b14" style={{marginTop:16}}>{d.point}</p>}
        {d.cta && <button className="btn" style={{marginTop:20}} onClick={()=>setM(null)}>{d.cta(m)}</button>}
      </Sheet>}
    </>
  );
}

// ── 카테고리 상세
const TXN = [
  ['07.15(수)', [['마장동축산','매출 14:20','−390,000'],['다이소 집기','현대카드 11:05','−25,900'],['새벽시장','매출 14:20','−14,000']]],
  ['07.14(화)', [['식자재왕 도매','매출 14:20','−820,000'],['쿠팡 비품','현대카드 11:05','−400,000'],['다이소','매출 14:20','−15,000']]],
  ['07.13(월)', [['마장동축산','매출 14:20','−104,900'],['하나로마트','현대카드 11:05','−14,900'],['식자재마트','매출 14:20','−1,400,900']]],
];
function BookDetail({label, onBack}) {
  const [filter, setFilter] = uS('전체');
  const [mo, setMo] = uS(0);
  const monthLabel = n => { const t = 2026*12 + 6 + n; return `${Math.floor(t/12)}년 ${t%12+1}월`; };
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div className="row" style={{padding:'8px 20px 0',flex:'none'}}>
        <button onClick={onBack} style={{marginLeft:-6}}><Chevron/></button>
        <span className="h3">{label}</span>
        <span style={{display:'flex',gap:16}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5.5" r="2.5" stroke="#222" strokeWidth="1.6"/><circle cx="6" cy="12" r="2.5" stroke="#222" strokeWidth="1.6"/><circle cx="18" cy="18.5" r="2.5" stroke="#222" strokeWidth="1.6"/><path d="M8.3 10.8 15.7 6.7M8.3 13.2l7.4 4.1" stroke="#222" strokeWidth="1.6"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" stroke="#222" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
      <Period label={monthLabel(mo)} next={mo < 0} onPrev={()=>setMo(mo-1)} onNext={()=>setMo(mo+1)}/>
      <div className="row" style={{padding:'12px 20px 0',flex:'none'}}>
        <span style={{display:'flex',gap:0,background:'#EEEEEE',borderRadius:8,padding:3}}>
          {['전체','개인','사업'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:'8px 18px',borderRadius:6,fontSize:14,
              background:filter===f?'#fff':'transparent',fontWeight:filter===f?700:400,color:filter===f?'#222':'#9E9E9E'}}>{f}</button>
          ))}
        </span>
        <span style={{textAlign:'right'}}>
          <span className="cap12" style={{color:'#9E9E9E'}}>총 7건</span>
          <span className="h2" style={{display:'block',marginTop:6,color:'#F04452'}}>−8,900,000원</span>
        </span>
      </div>
      <div className="scroll" style={{marginTop:16}}>
        <p className="b12" style={{padding:'0 20px',color:'#9E9E9E'}}>거래를 누르면 상세·영수증으로 이동</p>
        {TXN.map(([day, rows])=>(
          <div key={day} style={{padding:'18px 20px 0'}}>
            <div className="h4">{day}</div>
            <div style={{marginTop:16}}>
              {rows.map(([t,meta,amt])=>(
                <button key={t+meta} className="row" style={{width:'100%',marginBottom:18,textAlign:'left'}}>
                  <span><span className="t16" style={{display:'block'}}>{t}</span>
                    <span className="cap12" style={{display:'block',marginTop:6,color:'#9E9E9E'}}>{meta}</span></span>
                  <span className="h4">{amt}</span>
                </button>
              ))}
            </div>
            <div style={{borderTop:'1px dashed #E0E0E0'}}></div>
          </div>
        ))}
        <div style={{height:30}}></div>
      </div>
    </div>
  );
}

function BookScreen({onTab, onDetail, go}) {
  const [tab, setTab] = uS('AI 리포트');
  const [mo, setMo] = uS(0), [wk, setWk] = uS(0), [yr, setYr] = uS(0);
  const monthLabel = n => { const t = 2026*12 + 6 + n; return `${Math.floor(t/12)}년 ${t%12+1}월`; };
  const weekLabel = n => { const s = new Date(2026,6,6+n*7), e = new Date(2026,6,12+n*7);
    const same = s.getMonth()===e.getMonth();
    return `${s.getFullYear()}년 ${s.getMonth()+1}월 ${s.getDate()}일 ~${same?'':` ${e.getMonth()+1}월`}${e.getDate()}일`; };
  const per = tab==='주간' ? {label:weekLabel(wk), v:wk, set:setWk}
    : tab==='연간' ? {label:`${2025+yr}년`, v:yr, set:setYr}
    : {label:monthLabel(mo), v:mo, set:setMo};
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <BookHeader title="장부"/>
      <BookTabs tab={tab} setTab={setTab}/>
      <div className="scroll">
        <Period label={per.label} next={per.v < 0} onPrev={()=>per.set(per.v-1)} onNext={()=>per.set(per.v+1)}/>
        {tab==='AI 리포트' && <BookAI go={go}/>}
        {tab==='주간' && <BookWeek/>}
        {tab==='월간' && <BookMonth onDetail={onDetail}/>}
        {tab==='연간' && <BookYear/>}
      </div>
      <BottomNav tab="book" onTab={onTab}/>
    </div>
  );
}

Object.assign(window, {BookScreen, BookDetail});
