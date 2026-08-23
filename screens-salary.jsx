// screens-salary.jsx — 03 월급 (메인 / 설정 변경 / 지급 받기 / RISK / 결과 모달)

const SAL_ACCOUNTS = [
  ['우리은행 메인 계좌','1002-****-987654'],
  ['카카오뱅크 계좌','3333-***-987654'],
  ['국민은행 계좌','9401-***-987654'],
];

function AppHeader({title, onBack, icons=true, search=true}) {
  return (
    <div className="row" style={{padding:'8px 20px 0',flex:'none'}}>
      <span style={{display:'flex',alignItems:'center',gap:8}}>
        {onBack && <button onClick={onBack} style={{marginLeft:-6}}><Chevron/></button>}
        <span className={onBack?'h3':'h2'}>{title}</span>
      </span>
      {icons && <span style={{display:'flex',gap:18}}>
        {search && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.6" stroke="#222" strokeWidth="1.7"/><path d="M16 16l4 4" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/></svg>}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 4a5.6 5.6 0 0 0-5.6 5.6v3.2L4.8 16h14.4l-1.6-3.2V9.6A5.6 5.6 0 0 0 12 4Z" stroke="#222" strokeWidth="1.7" strokeLinejoin="round"/><path d="M10 19h4" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8.4" r="3.6" stroke="#222" strokeWidth="1.7"/><path d="M5 19.4c0-3.2 3.1-5.2 7-5.2s7 2 7 5.2" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/></svg>
      </span>}
    </div>
  );
}

const GradBar = ({pct, danger}) => (
  <div>
    <div style={{height:8,borderRadius:4,background:'#EEEEEE',position:'relative',overflow:'hidden'}}>
      <i style={{display:'block',width:pct+'%',height:8,borderRadius:4,
        background: danger ? '#F04452' : 'linear-gradient(90deg,#3FC6C0,#5DD3C9 30%,#5F79FF)'}}></i>
    </div>
    <div className="row" style={{marginTop:8}}>
      {['0 %','50 %','100 %'].map(t=><span key={t} className="cap12" style={{color:'#9E9E9E'}}>{t}</span>)}
    </div>
  </div>
);

// ── 월급 메인
function SalaryMain({s, onTab, go}) {
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <AppHeader title="월급"/>
      <div className="scroll" style={{marginTop:16}}>
        <div style={{padding:'0 20px 24px',display:'grid',gap:12}}>
          <div className="card" style={{padding:16}}>
            <button className="row" style={{width:'100%'}} onClick={()=>go('salary_setting')}>
              <span className="h3">설정된 월급</span><Chevron d="right" c="#616161" s={20}/>
            </button>
            <div style={{background:'#F5F5F5',borderRadius:8,padding:'18px 16px',marginTop:16}}>
              <div className="row"><span className="b14" style={{color:'#616161'}}>설정 월급</span><span className="h1">{won(s.salary)}원</span></div>
              <div className="row" style={{marginTop:16}}><span className="b14" style={{color:'#616161'}}>급여 계좌</span><span className="t16">카카오뱅크 ****1234</span></div>
            </div>
            <div style={{background:'#F5F5F5',borderRadius:8,padding:'16px',marginTop:10,display:'flex'}}>
              <div style={{flex:1}}>
                <div className="cap12" style={{color:'#9E9E9E'}}>월급 유지가능 기간</div>
                <div className="h3" style={{marginTop:10}}>약 0.5개월</div>
              </div>
              <div style={{flex:1,textAlign:'right'}}>
                <div className="cap12" style={{color:'#9E9E9E'}}>다음 지급일</div>
                <div className="h3" style={{marginTop:10}}>25일 (D-12)</div>
              </div>
            </div>
            <button className="btn" style={{marginTop:16}} onClick={()=>go('salary_payout')}>월급 지급 받기</button>
            <div style={{display:'flex',gap:6,alignItems:'center',marginTop:12}}>
              <IconInfo/><span className="b12" style={{color:'#9E9E9E'}}>필요한 만큼 즉시 수령</span>
            </div>
          </div>

          <div style={{display:'flex',gap:12}}>
            {[['Booster','AI 월급추천','최적 금액 제안','plan'],[null,'월급 이력','수령 내역 조회','salary_history']].map(([badge,t,d,dest])=>(
              <button key={t} className="card" onClick={()=>go(dest)} style={{flex:1,padding:16,background:'#EFF2FF',textAlign:'left',display:'block'}}>
                <div className="row">
                  {badge ? <span style={{border:'1px solid #ADBAFF',color:'#5F79FF',borderRadius:12,padding:'3px 8px',fontSize:11,fontWeight:600}}>{badge}</span>
                         : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#222" strokeWidth="1.6"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#222" strokeWidth="1.6" strokeLinecap="round"/></svg>}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </div>
                <div className="h3" style={{marginTop:14}}>{t}</div>
                <div className="b12" style={{marginTop:8,color:'#9E9E9E'}}>{d}</div>
              </button>
            ))}
          </div>

          <div className="card" style={{padding:16}}>
            <div className="h3">월급 안정성 분석</div>
            <div className="row" style={{marginTop:18}}>
              <span className="b14" style={{color:'#9E9E9E'}}>이번달 안정성</span><span className="d2">88%</span>
            </div>
            <div style={{marginTop:14}}><GradBar pct={88}/></div>
            <div style={{background:'#EEFBF2',borderRadius:8,padding:'16px',marginTop:20}}>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <span style={{width:16,height:16,borderRadius:'50%',background:'#22C55E',display:'grid',placeItems:'center'}}>
                  <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6.2l2.4 2.4L10 3" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></span>
                <span className="h4" style={{color:'#1B7F4B'}}>안정 – 안정적인 월급 상태입니다</span>
              </div>
              <p className="b14" style={{margin:'10px 0 0',color:'#616161'}}>현재 월급은 최근 수익 흐름 기준으로 안정적으로 유지 가능한 수준입니다. 잉여 자금 활용이나 비상금 확충을 통해 재무 안정성을 높일 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav tab="salary" onTab={onTab}/>
    </div>
  );
}

// ── 월급 설정 변경
function SalarySetting({s, set, back}) {
  const [amount, setAmount] = uS(1500000);
  const [preset, setPreset] = uS('추천');
  const [day, setDay] = uS(25);
  const [acc, setAcc] = uS(0);
  const [confirm, setConfirm] = uS(false);
  const presets = [['최소',1200000],['추천',1500000],['최대',1800000]];
  const pct = Math.min(100, Math.max(0, (amount-1200000)/600000*100));
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <AppHeader title="월급 설정 변경" onBack={back} icons={false}/>
      <div className="scroll" style={{marginTop:16}}>
        <div style={{padding:'0 20px 30px',display:'grid',gap:12}}>
          <div className="card tint" style={{padding:16}}>
            <span style={{border:'1px solid #ADBAFF',color:'#5F79FF',borderRadius:12,padding:'4px 9px',fontSize:11,fontWeight:600}}>추천금액</span>
            <div className="h1" style={{marginTop:12}}>{won(1500000)}원</div>
            <div className="b12" style={{marginTop:8,color:'#616161'}}>최근 3개월 수입 패턴 기준</div>
            <div style={{marginTop:14,height:8,borderRadius:4,background:'#DFE4FF'}}><i style={{display:'block',width:'50%',height:8,borderRadius:4,background:'#5F79FF'}}></i></div>
            <div className="row" style={{marginTop:10}}>
              <span><span className="cap12" style={{color:'#616161',display:'block'}}>최소</span><span className="b12">1,200,000원</span></span>
              <span style={{textAlign:'right'}}><span className="cap12" style={{color:'#616161',display:'block'}}>최대</span><span className="b12">1,800,000원</span></span>
            </div>
          </div>

          <div className="card" style={{padding:16}}>
            <div className="h4">월급 금액 선택</div>
            <div className="l13" style={{marginTop:12,color:'#9E9E9E'}}>희망 월급 (원)</div>
            <div className="row" style={{marginTop:8,border:'1px solid #E0E0E0',borderRadius:8,padding:'12px 14px'}}>
              <span className="t16">{won(amount)}</span>
              <span style={{display:'flex',gap:10}}>
                <button onClick={()=>setAmount(a=>Math.max(0,a-100000))} style={{width:22,height:22,borderRadius:'50%',background:'#EEEEEE',display:'grid',placeItems:'center'}}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6h8" stroke="#616161" strokeWidth="1.8" strokeLinecap="round"/></svg></button>
                <button onClick={()=>setAmount(a=>a+100000)} style={{width:22,height:22,borderRadius:'50%',background:'#5F79FF',display:'grid',placeItems:'center'}}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M6 2v8M2 6h8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg></button>
              </span>
            </div>
            <div style={{display:'flex',gap:8,marginTop:12}}>
              {presets.map(([label,v])=>{
                const on = preset===label;
                return <button key={label} onClick={()=>{setPreset(label);setAmount(v);}} style={{flex:1,padding:'10px 0',borderRadius:8,
                  border:'1px solid '+(on?'#5F79FF':'#E0E0E0'),background:on?'#5F79FF':'#fff',color:on?'#fff':'#616161'}}>
                  <span style={{fontSize:11,display:'block',opacity:.85}}>{label}</span>
                  <span style={{fontSize:13,fontWeight:700,display:'block',marginTop:4}}>{man(v)}만원</span>
                </button>;
              })}
            </div>
          </div>

          <div className="card" style={{padding:16}}>
            <div className="h4">급여일 선택</div>
            <div className="l13" style={{marginTop:12,color:'#9E9E9E'}}>매월 급여 지급일</div>
            <div className="row" style={{marginTop:8,border:'1px solid #E0E0E0',borderRadius:8,padding:'12px 14px'}}>
              <span className="t16">{day}일</span>
              <span style={{display:'flex',gap:10}}>
                <button onClick={()=>setDay(d=>Math.max(1,d-1))} style={{width:22,height:22,borderRadius:'50%',background:'#EEEEEE',display:'grid',placeItems:'center'}}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6h8" stroke="#616161" strokeWidth="1.8" strokeLinecap="round"/></svg></button>
                <button onClick={()=>setDay(d=>Math.min(31,d+1))} style={{width:22,height:22,borderRadius:'50%',background:'#5F79FF',display:'grid',placeItems:'center'}}>
                  <svg width="10" height="10" viewBox="0 0 12 12"><path d="M6 2v8M2 6h8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg></button>
              </span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:12}}>
              {[1,5,10,15,20,25,28,30].map(n=>{
                const on = day===n;
                return <button key={n} onClick={()=>setDay(n)} style={{padding:'10px 0',borderRadius:8,fontSize:13,
                  border:'1px solid '+(on?'#5F79FF':'#E0E0E0'),background:on?'#5F79FF':'#fff',color:on?'#fff':'#616161',fontWeight:on?700:400}}>{n}일</button>;
              })}
            </div>
          </div>

          <div className="card" style={{padding:16}}>
            <div className="row">
              <span className="h4">급여 계좌 선택</span>
            </div>
            <div className="row" style={{marginTop:14}}>
              <span style={{display:'flex',gap:8,alignItems:'center'}}><span className="cbox"></span><span className="b14">전체</span></span>
              <span style={{display:'flex',gap:10}}>
                <span className="cap12" style={{color:'#9E9E9E'}}>대표계좌지정</span>
                <span className="cap12" style={{color:'#9E9E9E'}}>선택삭제</span>
              </span>
            </div>
            <div style={{marginTop:14,display:'grid',gap:8}}>
              {SAL_ACCOUNTS.map(([name,num],i)=>{
                const on = acc===i;
                return <button key={name} onClick={()=>setAcc(i)} style={{display:'flex',gap:10,alignItems:'center',textAlign:'left',
                  border:'1px solid '+(on?'#5F79FF':'#E0E0E0'),background:on?'#F4F6FF':'#fff',borderRadius:8,padding:'14px 14px'}}>
                  {on ? <span style={{width:20,height:20,borderRadius:'50%',background:'#5F79FF',display:'grid',placeItems:'center',flex:'none'}}>
                      <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.2l2.4 2.4L10 3" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></span>
                    : <span style={{width:20,height:20,borderRadius:'50%',border:'1.5px solid #C7C7C7',flex:'none'}}></span>}
                  <span><span className="t16" style={{display:'block'}}>{name}</span>
                    <span className="cap12" style={{display:'block',marginTop:5,color:'#9E9E9E'}}>{num}</span></span>
                </button>;
              })}
            </div>
            <button style={{width:'100%',marginTop:10,background:'#F5F5F5',borderRadius:8,padding:'13px 0',color:'#616161',fontSize:13,display:'flex',gap:6,alignItems:'center',justifyContent:'center'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#9E9E9E" strokeWidth="1.6"/><path d="M12 8.5v7M8.5 12h7" stroke="#9E9E9E" strokeWidth="1.6" strokeLinecap="round"/></svg>
              계좌 추가</button>
          </div>

          <button className="btn" style={{marginTop:6}} onClick={()=>setConfirm(true)}>변경사항 저장</button>
          <button className="btn ghost" onClick={back}>취소</button>
        </div>
      </div>
      {confirm && <Sheet onClose={()=>setConfirm(false)}>
        <div className="h3">월급 설정 확인</div>
        <p className="b14" style={{marginTop:10,color:'#616161'}}>아래 내용으로 월급을 설정하시겠습니까?</p>
        <div style={{background:'#F5F5F5',borderRadius:8,padding:'18px 16px',marginTop:18}}>
          <div className="row"><span className="b14" style={{color:'#616161'}}>월급 금액</span><span className="t16">{won(amount)}원</span></div>
          <div className="row" style={{marginTop:16}}><span className="b14" style={{color:'#616161'}}>급여일</span><span className="t16">매월 {day}일</span></div>
          <div className="row" style={{marginTop:16}}><span className="b14" style={{color:'#616161'}}>급여 계좌</span>
            <span style={{textAlign:'right'}}><span className="t16" style={{display:'block'}}>{SAL_ACCOUNTS[acc][0]}</span>
              <span className="cap12" style={{display:'block',marginTop:5,color:'#9E9E9E'}}>{SAL_ACCOUNTS[acc][1]}</span></span></div>
        </div>
        <div style={{display:'flex',gap:8,marginTop:22}}>
          <button className="btn ghost sm" style={{flex:1}} onClick={()=>setConfirm(false)}>취소</button>
          <button className="btn sm" style={{flex:1.4}} onClick={()=>{set({salary:amount}); setConfirm(false); back();}}>저장</button>
        </div>
      </Sheet>}
    </div>
  );
}

// ── 월급 지급 받기 (정상 / RISK)
function SalaryPayout({s, back, risk}) {
  const [amt, setAmt] = uS('');
  const [modal, setModal] = uS(null);
  const avail = risk ? 0 : 1800000;
  const over = Number(amt) > avail;
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <AppHeader title="월급 지급 받기" onBack={back} icons={false}/>
      <div className="scroll" style={{marginTop:18}}>
        <div style={{padding:'0 20px 30px'}}>
          <div className="row">
            <span className="t16 blue">현재 설정된 월급</span>
            <button style={{display:'flex',gap:4,alignItems:'center'}}>
              <span className="b12" style={{color:'#616161'}}>AI 월급 추천</span><Chevron d="right" c="#616161" s={14}/></button>
          </div>
          <div className="d2" style={{marginTop:12}}>{won(s.salary)}원</div>

          <div className="card" style={{marginTop:18,padding:'18px 16px'}}>
            <div className="row">
              <span style={{display:'flex',gap:8,alignItems:'center'}}>
                <span className="b14" style={{color:'#616161'}}>현재 잔여 가용 금액</span>
                <span style={{background:'#222',color:'#fff',borderRadius:12,padding:'4px 9px',fontSize:11,fontWeight:700,display:'inline-flex',gap:5,alignItems:'center'}}>
                  <i style={{width:6,height:6,borderRadius:'50%',background:risk?'#F04452':'#22C55E',display:'block'}}></i>{risk?'위험':'안정'}</span>
              </span>
              <span className="h4">{man(avail)}만원</span>
            </div>
            <div style={{marginTop:14}}><GradBar pct={risk?3:82} danger={risk}/></div>
            <div className="l13" style={{marginTop:20,color:'#616161'}}>수령 금액</div>
            <div className="row" style={{marginTop:8,border:'1px solid '+(over?'#F04452':'#E0E0E0'),borderRadius:8,padding:'0 14px',height:48,transition:'border-color .18s'}}>
              <input value={amt?won(Number(amt)):''} placeholder="금액을 입력하세요" inputMode="numeric"
                onChange={e=>setAmt(e.target.value.replace(/[^0-9]/g,''))}
                style={{flex:1,border:0,outline:'none',background:'transparent',fontSize:15}}/>
              <span className="b14" style={{color:'#616161'}}>원</span>
            </div>
            {over && <p className="b12" style={{margin:'10px 0 0',color:'#F04452',fontWeight:600}}>가용 금액({won(avail)}원)을 초과했어요. 다시 확인해 주세요.</p>}
          </div>

          {risk ? (
            <>
              <div style={{background:'#FFF0F1',borderRadius:8,padding:'14px 16px',marginTop:14,display:'flex',gap:8}}>
                <span style={{color:'#F04452'}}>⚠</span>
                <span className="b14" style={{color:'#F04452',fontWeight:600}}>현재 RISK 상태로 월급 수령이 제한됩니다.<br/>가용 금액이 매우 부족합니다.</span>
              </div>
              <div style={{display:'flex',gap:8,marginTop:14}}>
                <button className="btn sm" style={{flex:1,background:'#333',fontSize:14}}>지급통 깨기</button>
                <button className="btn sm" style={{flex:1,fontSize:14}}>대출 알아보기</button>
              </div>
            </>
          ) : (
            <button className="btn" style={{marginTop:18}} onClick={()=>setModal(over?'fail':'ok')}>월급 받기</button>
          )}

          <div style={{marginTop:26}}>
            <div style={{display:'flex',gap:6,alignItems:'center'}}><IconInfo/><span className="h4">월급 수령 안내</span></div>
            <ul style={{margin:'14px 0 0',paddingLeft:18,display:'grid',gap:10}}>
              <li className="b14" style={{color:'#616161'}}>설정된 월급 범위 내에서 필요한 만큼 땡겨 받을 수 있습니다.</li>
              <li className="b14" style={{color:'#616161'}}>가용 금액이 부족하면 수령이 제한될 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>
      {modal && (
        <div className="sheet-wrap">
          <div className="dim" onClick={()=>setModal(null)}></div>
          <div style={{position:'absolute',left:24,right:24,top:'50%',transform:'translateY(-50%)',background:'#fff',borderRadius:16,padding:'26px 22px',textAlign:'center'}}>
            <img src={modal==='ok'?'assets/character_ok.png':'assets/character_fail.png'} alt="" style={{width:modal==='ok'?150:120,margin:'0 auto'}}/>
            <div className="h3" style={{marginTop:12}}>{modal==='ok'?'지급 완료':'지급 실패'}</div>
            <p className="b14" style={{marginTop:10,color:'#616161'}}>
              {modal==='ok' ? '월급을 안전하게 지급했습니다.' : <>월급이 지급되지 않았어요.<br/>월급 계좌를 다시 확인해 보세요.</>}</p>
            <button className="btn sm" style={{marginTop:20}} onClick={()=>{setModal(null); if(modal==='ok') back();}}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {SalaryMain, SalarySetting, SalaryPayout, AppHeader, GradBar});
