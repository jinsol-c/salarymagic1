// screens-bank.jsx — 04 저금통 (메인 / 거래내역 / 상자 설정)

// 실제 로고 자산 사용 — 없는 은행은 중립 글리프(브랜드 위조 금지)
const BANK_LOGOS = {'신한':'assets/logo-shinhan.png','배민':'assets/char-2.png','OKPOS':'assets/logo-okpos.png',
  '국민':'assets/char-1.png','KB':'assets/char-1.png'};
const BankTile = ({name}) => {
  const k = Object.keys(BANK_LOGOS).find(x=>name.includes(x));
  if (k) return <span style={{width:34,height:34,borderRadius:9,overflow:'hidden',flex:'none',background:'#fff',
    display:'grid',placeItems:'center',border:'1px solid #EEEEEE'}}>
      <img src={BANK_LOGOS[k]} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/></span>;
  return <span style={{width:34,height:34,borderRadius:9,background:'#F0F0F0',display:'grid',placeItems:'center',flex:'none'}}>
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 10h16v9H4v-9ZM4 10l8-5 8 5" stroke="#9E9E9E" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 19v-5h6v5" stroke="#9E9E9E" strokeWidth="1.6"/></svg></span>;
};

const LimeBar = ({pct, marks=['0%','25%','75%','100%']}) => (
  <div>
    <div style={{height:9,borderRadius:5,background:'#EEEEEE'}}><i style={{display:'block',width:pct+'%',height:9,borderRadius:5,background:'#C4E427'}}></i></div>
    <div className="row" style={{marginTop:8}}>{marks.map(m=><span key={m} className="cap12" style={{color:'#9E9E9E'}}>{m}</span>)}</div>
  </div>
);

const EMG_TXN = [['신한 {입금자명}','4월 9일','− 15,000'],['배민 5월 비상금 자동이체','4월 10일','− 50,000'],['OKPOS 박사장','4월 11일','− 100,000']];
const TAX_TXN = [['신한 {입금자명}','4월 9일','− 60,000'],['배민 종합 소득세 모으기 2회차','4월 10일','− 324,420'],['세금','4월 11일','− 1,200,000']];

function TxnRow({row}) {
  const [t,d,v] = row;
  return (
    <div className="row" style={{marginTop:16}}>
      <span style={{display:'flex',gap:10,alignItems:'center'}}>
        <BankTile name={t}/>
        <span><span className="b14" style={{display:'block'}}>{t.replace(/^(카카오|배민|OKPOS|신한|우리|국민|토스)\s*/,'')}</span>
          <span className="cap12" style={{display:'block',marginTop:5,color:'#9E9E9E'}}>{d}</span></span>
      </span>
      <span style={{display:'flex',gap:10,alignItems:'center'}}>
        <span className="t16">{v}</span>
        <svg width="4" height="16" viewBox="0 0 4 16" fill="#C7C7C7"><circle cx="2" cy="3" r="1.6"/><circle cx="2" cy="8" r="1.6"/><circle cx="2" cy="13" r="1.6"/></svg>
      </span>
    </div>
  );
}

const GreenNote = ({title, children}) => (
  <div style={{background:'#F3FAE7',borderRadius:8,padding:'14px 16px',marginTop:18}}>
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <span style={{width:16,height:16,borderRadius:'50%',background:'#5DA92C',display:'grid',placeItems:'center',flex:'none'}}>
        <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6.2l2.4 2.4L10 3" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></span>
      <span className="h4" style={{color:'#3F6B1C'}}>{title}</span>
    </div>
    <div style={{marginTop:10,paddingLeft:24}}>{children}</div>
  </div>
);

function BankMain({onTab, go}) {
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <AppHeader title="저금통" go={go}/>
      <div className="scroll" style={{marginTop:16}}>
        <div style={{padding:'0 20px 26px',display:'grid',gap:12}}>
          <div className="card" style={{padding:16,position:'relative',overflow:'hidden'}}>
            <div className="h4">저금통 현황</div>
            <div className="d2" style={{marginTop:10}}>12,350,000원</div>
            <img src="assets/char-6-piggy.png" alt="" style={{position:'absolute',right:12,top:18,width:64,animation:'microFloat 3.6s ease-in-out infinite'}}/>
            <div className="row" style={{marginTop:24}}>
              <span className="b12" style={{color:'#9E9E9E'}}>저금통 적립률</span>
              <span className="b12" style={{color:'#9E9E9E'}}>목표 금액 15,000,000원</span>
            </div>
            <div style={{marginTop:10}}><LimeBar pct={82}/></div>
            <div className="row" style={{marginTop:20}}>
              <span className="b14" style={{color:'#616161'}}>비상금 상자</span><span className="t16">8,120,000원</span>
            </div>
            <div style={{textAlign:'right'}}><span className="cap12" style={{color:'#9E9E9E'}}>[카카오뱅크] 262555-232222</span></div>
            <div className="row" style={{marginTop:12}}>
              <span className="b14" style={{color:'#616161'}}>세금 상자</span><span className="t16">1,230,000원</span>
            </div>
            <div style={{textAlign:'right'}}><span className="cap12" style={{color:'#9E9E9E'}}>[우리은행] 7777-232222</span></div>
          </div>

          <div style={{background:'rgba(95,121,255,.08)',border:'1px solid #5F79FF',borderRadius:12,padding:16}}>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span className="h4 blue">Booster</span>
              <span style={{border:'1px solid #ADBAFF',color:'#5F79FF',borderRadius:12,padding:'3px 8px',fontSize:11,fontWeight:600}}>인기</span>
            </div>
            <div className="h3" style={{marginTop:12}}>AI가 알아서 굴리는 똑똑한 투자 마법</div>
            <div className="b12" style={{marginTop:8,color:'#616161'}}>Pro 이상 구독제 확인하기</div>
          </div>

          <div className="card" style={{padding:16}}>
            <div className="h4">비상금 상자</div>
            <div className="d3" style={{marginTop:10}}>8,120,000원</div>
            <button style={{display:'flex',gap:6,alignItems:'center',marginTop:10}} onClick={()=>go('bank_box')}>
              <span className="b12" style={{color:'#9E9E9E'}}>[카카오뱅크] 262555-232222</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#9E9E9E" strokeWidth="1.6"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" stroke="#9E9E9E" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
            <GreenNote title="세이프존 3개월">
              <p className="b14" style={{margin:0,color:'#4A7030'}}>안정 구간 유지 중이에요. 현재 비상금으로 약 3개월간 수입이 없어도 고정비를 유지할 수 있어요.</p>
            </GreenNote>
            <div style={{display:'flex',background:'#F5F5F5',borderRadius:8,marginTop:12}}>
              <div style={{flex:1,padding:'16px'}}>
                <div className="cap12" style={{color:'#9E9E9E'}}>이번달 저축액</div>
                <div className="h4" style={{marginTop:8}}>500,000원</div>
              </div>
              <div style={{flex:1,padding:'16px',borderLeft:'1px solid #E0E0E0'}}>
                <div className="cap12" style={{color:'#9E9E9E'}}>매출 대비 적립률</div>
                <div className="h4" style={{marginTop:8}}>4.25%</div>
              </div>
            </div>
            <div className="h4" style={{marginTop:22}}>거래 내역</div>
            {EMG_TXN.map(r=><TxnRow key={r[0]} row={r}/>)}
            <button className="btn" style={{marginTop:22}} onClick={()=>go('bank_txn_emg')}>더보기</button>
          </div>

          <button className="card row" style={{width:'100%',textAlign:'left',padding:16}} onClick={()=>go&&go('recipe')}>
            <span style={{display:'flex',gap:12,alignItems:'center'}}>
              <img src="assets/lupang-peek.png" alt="" style={{width:44}}/>
              <span><span className="h4" style={{display:'block'}}>비상금, 더 크게 키우기!</span>
                <span className="b12" style={{display:'block',marginTop:8,color:'#9E9E9E'}}>비상금 상자가 충분히 모였어요!<br/>잠시 쉬고 있는 여유 자금을 투자로 운용해 보세요.</span></span>
            </span>
            <Chevron d="right" c="#9E9E9E" s={20}/>
          </button>

          <div className="card" style={{padding:16}}>
            <div className="h4">세금 상자</div>
            <div className="d3" style={{marginTop:10}}>1,230,000원</div>
            <button style={{display:'flex',gap:6,alignItems:'center',marginTop:10}} onClick={()=>go('bank_box')}>
              <span className="b12" style={{color:'#9E9E9E'}}>[우리은행] 7777-232222</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#9E9E9E" strokeWidth="1.6"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" stroke="#9E9E9E" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
            <div className="row" style={{marginTop:20}}>
              <span className="b12" style={{color:'#9E9E9E'}}>세금</span>
              <span className="b12" style={{color:'#9E9E9E'}}>예상 세액 1,500,000원</span>
            </div>
            <div style={{marginTop:10}}><LimeBar pct={82}/></div>
            <GreenNote title="종합소득세 D-14">
              <p className="b14" style={{margin:0,color:'#4A7030'}}>월급술사가 비상금의 30%를 차곡차곡 모아 세금을 준비하고 있어요.</p>
              <div className="row" style={{marginTop:14}}>
                <span className="b12" style={{color:'#4A7030'}}>세금 신청 일정</span>
                <span className="b12" style={{color:'#4A7030'}}>2026-05-01 ~ 2026-06-01</span>
              </div>
              <div className="row" style={{marginTop:8}}>
                <span className="b12" style={{color:'#4A7030'}}>예상 세액</span>
                <span className="b12" style={{color:'#4A7030'}}>1,500,000원</span>
              </div>
            </GreenNote>
            <div className="h4" style={{marginTop:22}}>입출금 내역</div>
            {TAX_TXN.map(r=><TxnRow key={r[0]} row={r}/>)}
            <button className="btn" style={{marginTop:22}} onClick={()=>go('bank_txn_tax')}>더보기</button>
          </div>
        </div>
      </div>
      <BottomNav tab="save" onTab={onTab}/>
    </div>
  );
}

// ── 저금통 거래내역 (풀 팝업)
function BankTxn({back, title}) {
  const [period, setPeriod] = uS('1개월');
  const [cal, setCal] = uS(false);
  const [range, setRange] = uS(null);
  const bars = [['1월',48],['2월',30],['3월',78],['4월',95],['5월',100]];
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div className="row" style={{padding:'4px 20px 0',flex:'none'}}>
        <span className="h3">{title || '저금통 거래내역'}</span>
        <button onClick={back} aria-label="닫기">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="scroll" style={{marginTop:18}}>
        <div style={{padding:'0 20px 30px',display:'grid',gap:12}}>
          <div className="card" style={{padding:16}}>
            <div className="h4 blue">월별 저축액</div>
            <div style={{display:'flex',alignItems:'flex-end',gap:12,height:150,marginTop:20,borderBottom:'1px solid #EEEEEE'}}>
              {bars.map(([m,v],i)=>(
                <div key={m} style={{flex:1,display:'grid',gap:6,justifyItems:'center'}}>
                  {i===bars.length-1 && <span className="cap12 blue">120만원</span>}
                  <div style={{width:'70%',height:v*1.1,background:'#5F79FF',borderRadius:'3px 3px 0 0'}}></div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:12,marginTop:8}}>
              {bars.map(([m])=><span key={m} className="cap12" style={{flex:1,textAlign:'center',color:'#9E9E9E'}}>{m}</span>)}
            </div>
            <div style={{display:'flex',background:'#F5F5F5',borderRadius:8,marginTop:20}}>
              {[['총액','1,235,500원'],['비상금 상자','1,000,000원'],['세금 상자','135,000원']].map(([l,v],i)=>(
                <div key={l} style={{flex:1,padding:'14px 10px',borderLeft:i?'1px solid #E0E0E0':'0',textAlign:'center'}}>
                  <div className="cap12" style={{color:'#9E9E9E'}}>{l}</div>
                  <div className="t16" style={{marginTop:8}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{padding:16}}>
            <div className="l13" style={{color:'#616161'}}>조회기간</div>
            <div style={{display:'flex',gap:8,marginTop:10}}>
              {['1개월','3개월','6개월','직접 설정'].map(p=>{
                const on = period===p;
                return <button key={p} onClick={()=>{ p==='직접 설정' ? setCal(true) : setPeriod(p); }} style={{flex:1,padding:'9px 0',borderRadius:16,fontSize:12,
                  border:'1px solid '+(on?'#5F79FF':'#E0E0E0'),background:on?'#F4F6FF':'#fff',color:on?'#5F79FF':'#616161',fontWeight:on?700:400}}>{p}</button>;
              })}
            </div>
            {range && <div className="row" style={{marginTop:10,border:'1px solid #E0E0E0',borderRadius:8,padding:'11px 12px'}}>
              <span className="b12">{range}</span><Chevron d="down" c="#9E9E9E" s={14}/></div>}
            <div className="l13" style={{marginTop:18,color:'#616161'}}>계좌선택</div>
            <div style={{display:'flex',gap:8,marginTop:10}}>
              <span className="row" style={{flex:1,border:'1px solid #E0E0E0',borderRadius:8,padding:'11px 12px'}}>
                <span className="b12">비상금</span><Chevron d="down" c="#9E9E9E" s={14}/></span>
              <span className="row" style={{flex:2,border:'1px solid #E0E0E0',borderRadius:8,padding:'11px 12px'}}>
                <span className="b12">카카오뱅크 3330090-3344455</span><Chevron d="down" c="#9E9E9E" s={14}/></span>
            </div>
            <div className="h4" style={{marginTop:24}}>입출금 내역</div>
            {[['신한 {입금자명 또는 메모}','4월 9일','− 15,000'],['배민 종합소득세 모으기 2회차','4월 10일','− 50,000'],['OKPOS 박사장','4월 11일','− 100,000']].map(r=><TxnRow key={r[0]} row={r}/>)}
            <button className="btn" style={{marginTop:24}}>더보기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 상자 설정 (비상금 / 세금)
function BankBox({back}) {
  const [tab, setTab] = uS('비상금 상자');
  const [minZone, setMinZone] = uS(1);
  const [taxOn, setTaxOn] = uS(true);
  const [confirm, setConfirm] = uS(false);
  const [mode, setMode] = uS('차곡차곡 모으기');
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div className="row" style={{padding:'4px 20px 0',flex:'none'}}>
        <span className="h3">상자 설정</span>
        <button onClick={back} aria-label="닫기">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#222" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{display:'flex',flex:'none',padding:'16px 20px 0'}}>
        {['비상금 상자','세금 상자'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,paddingBottom:12,fontSize:15,fontWeight:tab===t?700:400,
            color:tab===t?'#5F79FF':'#9E9E9E',borderBottom:'2px solid '+(tab===t?'#5F79FF':'#EEEEEE')}}>{t}</button>
        ))}
      </div>
      <div className="scroll" style={{marginTop:18}}>
        <div style={{padding:'0 20px 30px',display:'grid',gap:12}}>
          {tab==='세금 상자' && (
            <div className="card" style={{padding:16,position:'relative',overflow:'hidden'}}>
              <div className="row">
                <span className="h4 blue">세금 대비금 설정</span>
                <button onClick={()=>setTaxOn(v=>!v)} style={{width:42,height:24,borderRadius:12,background:taxOn?'#5F79FF':'#E0E0E0',position:'relative',transition:'background .2s'}}>
                  <i style={{position:'absolute',top:3,left:taxOn?21:3,width:18,height:18,borderRadius:'50%',background:'#fff',transition:'left .2s',display:'block'}}></i>
                </button>
              </div>
              <p className="b12" style={{marginTop:12,color:'#616161',maxWidth:210}}>자금은 종합소득세를 준비하는 중. 예상 세액에 딱 맞춰 비상금의 일부 금액을 따로 보관하고 있어요.</p>
              <img src="assets/lupang-peek.png" alt="" style={{position:'absolute',right:8,bottom:6,width:78}}/>
            </div>
          )}
          <div className="card" style={{padding:16}}>
            <div className="h4">계좌 관리</div>
            <div className="row" style={{marginTop:18}}><span className="b14" style={{color:'#616161'}}>은행</span><span className="t16">카카오 뱅크</span></div>
            <div className="row" style={{marginTop:14}}><span className="b14" style={{color:'#616161'}}>계좌명</span><span className="b14">카카오뱅크 주거래 우대통장(저축예금)</span></div>
            <div className="row" style={{marginTop:14}}><span className="b14" style={{color:'#616161'}}>계좌번호</span><span className="b14">333-262555-232222</span></div>
            <div style={{display:'flex',gap:8,marginTop:20}}>
              <button className="btn sm" style={{flex:1,background:'#EEF1FF',color:'#5F79FF',fontSize:14}}>변경하기</button>
              <button className="btn sm" style={{flex:1,fontSize:14}}>새로 만들기</button>
            </div>
          </div>

          {tab==='비상금 상자' ? (
            <>
              <div className="card" style={{padding:16}}>
                <div className="h4">목표 저축액 설정</div>
                <div className="row" style={{marginTop:18}}><span className="b14" style={{color:'#616161'}}>고정비 (A)</span><span className="t16">월 3,000,000원</span></div>
                <div className="row" style={{marginTop:14}}><span className="b14" style={{color:'#616161'}}>세이프존 (B)</span>
                  <span style={{border:'1px solid #C5CFFF',borderRadius:8,padding:'7px 12px',fontSize:13,color:'#5F79FF'}}>3 개월 ▾</span></div>
                <div className="row" style={{marginTop:14}}><span className="b14" style={{color:'#616161'}}>목표 저축액 (A*B)</span><span className="t16">9,000,000원</span></div>
                <div style={{height:1,background:'#EEEEEE',margin:'18px 0'}}></div>
                <p className="b12" style={{margin:0,textAlign:'center',color:'#616161'}}>지금 설정한 목표 저축액은<br/>안정적으로 유지할 수 있을 것으로 보여요.</p>
              </div>
              <div className="card" style={{padding:16}}>
                <div className="h4">최소 유지 금액 설정</div>
                <div className="row" style={{marginTop:18}}><span className="b14" style={{color:'#616161'}}>세이프존</span>
                  <select value={minZone} onChange={e=>setMinZone(+e.target.value)} style={{border:'1px solid #C5CFFF',borderRadius:8,padding:'7px 10px',fontSize:13,color:'#5F79FF',background:'#fff'}}>
                    {[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}개월</option>)}
                  </select></div>
                <div className="row" style={{marginTop:14}}><span className="b14" style={{color:'#616161'}}>최소 유지 금액</span><span className="t16">월 {(3000000*minZone).toLocaleString('ko-KR')}원</span></div>
              </div>
            </>
          ) : (
            <>
              <div className="card" style={{padding:16}}>
                <div className="h4 blue">세금 모으기 방식</div>
                <div style={{display:'flex',gap:8,marginTop:16}}>
                  {['차곡차곡 모으기','한 번에 모으기'].map(m=>{
                    const on = mode===m;
                    return <button key={m} onClick={()=>setMode(m)} className="btn sm" style={{flex:1,fontSize:13,
                      background:on?'#5F79FF':'#EEF1FF',color:on?'#fff':'#5F79FF'}}>{m}</button>;
                  })}
                </div>
              </div>
              <ul style={{margin:0,paddingLeft:18,display:'grid',gap:8}}>
                {['AI가 자동으로 세금 신청일정을 확인해요.','세금 신청일 3개월 전 세금 모으기를 시작해요.',
                  '사장님의 매출과 지출 내역을 기반으로 AI가 자동으로 예상 세액을 계산해요.',
                  '예상 세액을 3개월로 나누어 딱 맞는 금액을 세금 계좌로 자동이체 해드려요.',
                  '예상 세액은 정확하지 않으므로 금액이 남거나 부족할 수 있습니다.','부족한 세금은 당시에 보장하지 않습니다.'].map(t=>
                  <li key={t} className="b12" style={{color:'#9E9E9E'}}>{t}</li>)}
              </ul>
              <button className="btn" style={{marginTop:8}} onClick={()=>setConfirm(true)}>세금 대비금 확인하기</button>
            </>
          )}
        </div>
      </div>
      {confirm && (
        <div className="sheet-wrap">
          <div className="dim" onClick={()=>setConfirm(false)}></div>
          <div style={{position:'absolute',left:24,right:24,top:'50%',transform:'translateY(-50%)',background:'#fff',borderRadius:16,padding:'26px 22px',textAlign:'center'}}>
            <img src="assets/lupang-features.png" alt="" style={{width:120,margin:'0 auto'}}/>
            <div className="h3" style={{marginTop:10}}>세금 대비금을 먼저 확보할까요?</div>
            <p className="b14" style={{marginTop:10,color:'#616161'}}>예상 세금을 미리 계산하고, 비상금 일부를<br/>세금 대비금으로 따로 보관하고 관리해요.</p>
            <div style={{display:'flex',gap:8,marginTop:20}}>
              <button className="btn sm" style={{flex:1,background:'#EEF1FF',color:'#5F79FF',fontSize:14}} onClick={()=>setConfirm(false)}>나중에 하기</button>
              <button className="btn sm" style={{flex:1,fontSize:14}} onClick={()=>setConfirm(false)}>먼저 확보하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {BankMain, BankTxn, BankBox});
