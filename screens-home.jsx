// screens-home.jsx — 01 메인 홈 + 하단 네비게이션

function BottomNav({tab, onTab}) {
  const items = [['home','홈'],['book','장부'],['salary','월급'],['save','저금통']];
  return (
    <div style={{flex:'none',height:74,borderTop:'1px solid #EEEEEE',background:'#fff',display:'flex',paddingBottom:10}}>
      {items.map(([k,label])=>(
        <button key={k} onClick={()=>onTab(k)} style={{flex:1,display:'grid',placeItems:'center',paddingTop:6}} aria-label={label}>
          <img src={`assets/nav-${k}-${tab===k?'on':'off'}.svg`} alt={label} style={{width:50,height:51}}/>
        </button>
      ))}
    </div>
  );
}

const MENU_SECTIONS = [
  ['장부', [['book','AI 리포트 · 주간 · 월간 · 연간'],['book_detail','카테고리 상세']]],
  ['월급', [['salary_main','월급 메인'],['salary_setting','월급 설정 변경'],['salary_payout','월급 지급 받기'],['salary_history','월급 지급 내역']]],
  ['저금통', [['bank','저금통 메인'],['bank_txn','저금통 거래내역'],['bank_box','상자 설정']]],
  ['머니 레시피', [['recipe','추천 금융상품'],['recipe_loan','대출'],['recipe_invest','투자'],['recipe_insure','보험'],['recipe_card','카드']]],
  ['설정', [['plan','요금제']]],
];
function AllMenu({open, onClose, go}) {
  return (
    <div style={{position:'absolute',inset:0,zIndex:60,pointerEvents:open?'auto':'none'}}>
      <div onClick={onClose} style={{position:'absolute',inset:0,background:'rgba(0,0,0,.78)',opacity:open?1:0,transition:'opacity .28s'}}></div>
      <div style={{position:'absolute',top:0,right:0,bottom:0,width:'86%',background:'#fff',display:'flex',flexDirection:'column',
        transform:open?'translateX(0)':'translateX(100%)',transition:'transform .3s cubic-bezier(.22,.61,.36,1)',boxShadow:'-8px 0 24px rgba(0,0,0,.12)'}}>
        <div style={{flex:'none',padding:'56px 20px 0'}}>
          <div className="row">
            <span className="h2">전체 카테고리</span>
            <button onClick={onClose} aria-label="닫기">
              <svg width="24" height="24" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <div className="scroll" style={{padding:'24px 20px 32px'}}>
          <button onClick={()=>{onClose(); go('home');}} style={{width:'100%',textAlign:'left',padding:'12px 0'}}><span className="t16">홈</span></button>
          {MENU_SECTIONS.map(([sec, items])=>(
            <div key={sec} style={{marginTop:22}}>
              <div className="cap12" style={{color:'#9E9E9E',letterSpacing:'.02em'}}>{sec}</div>
              <div style={{marginTop:6}}>
                {items.map(([r,label])=>(
                  <button key={r} onClick={()=>{onClose(); go(r);}} className="row" style={{width:'100%',textAlign:'left',padding:'12px 0'}}>
                    <span className="t16">{label}</span>
                    <Chevron d="right" c="#BDBDBD" s={18}/>
                  </button>
                ))}
              </div>
              <div style={{height:1,background:'#EEEEEE',marginTop:10}}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeScreen({s, onTab, onMenu, go}) {
  const [menu, setMenu] = uS(false);
  const name = (s.profile.name || '김루팡') + '님';
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="scroll">
        <div style={{background:'#5F79FF',padding:'44px 0 0',position:'relative'}}>
          <div className="row" style={{padding:'12px 20px 0',position:'relative',zIndex:2}}>
            <span className="h2" style={{color:'#fff'}}>월급술사</span>
            <button onClick={()=>setMenu(true)} aria-label="메뉴">
              <svg width="26" height="26" viewBox="0 0 26 26"><path d="M4 8h18M4 13h18M4 18h18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
          <img src="assets/lupang-piggy.png" alt="" style={{position:'absolute',right:14,top:46,width:158,pointerEvents:'none',animation:'microFloat 3.6s ease-in-out infinite'}}/>
          <div style={{padding:'44px 20px 0'}}>
            <div className="d1" style={{color:'#fff'}}>{name}</div>
            <div className="b14" style={{color:'#DFE4FF',marginTop:10}}>잠자는 자산을 깨울 시간입니다</div>
          </div>
          <div style={{padding:'20px 20px 24px'}}>
            <div style={{background:'#fff',borderRadius:12,padding:'16px 18px'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{background:'#222',color:'#fff',borderRadius:14,padding:'5px 10px',fontSize:11,fontWeight:700,display:'inline-flex',alignItems:'center',gap:5}}>
                  <i style={{width:6,height:6,borderRadius:'50%',background:'#22C55E',display:'block'}}></i>안정</span>
                <span className="b14">지금 월급의 흐름은 <b className="blue">75점</b>으로 읽혀요</span>
              </div>
              <div style={{height:1,background:'#EEEEEE',margin:'14px 0'}}></div>
              <div className="row">
                <div>
                  <div className="h4">다음 월급까지 D-12</div>
                  <div className="cap12" style={{color:'#9E9E9E',marginTop:6}}>2026년 05월 25일</div>
                </div>
                <div className="h1">{won(s.salary)}원</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{padding:'16px 20px 0',display:'grid',gap:12}}>
          <div className="row" style={{background:'#fff',border:'1px solid #E0E0E0',borderRadius:22,padding:'10px 14px'}}>
            <span style={{display:'flex',gap:8,alignItems:'center'}}>
              <span style={{width:22,height:22,borderRadius:'50%',background:'#5F79FF',display:'grid',placeItems:'center'}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 3a6 6 0 0 0-6 6v3l-1.6 3H19.6L18 12V9a6 6 0 0 0-6-6Zm0 18a2.6 2.6 0 0 0 2.5-2h-5A2.6 2.6 0 0 0 12 21Z"/></svg>
              </span>
              <span className="t16">오늘 주목 할 주요 알림</span>
            </span>
            <span className="b14" style={{color:'#9E9E9E'}}>1 / 2</span>
          </div>
          <ChecklistCardMini home/>
          <div className="card">
            <div className="h4">이번 달 순수익</div>
            <div className="d3" style={{marginTop:8}}>4,180,000원</div>
            <div style={{display:'flex',marginTop:16}}>
              <div style={{flex:1}}><div className="cap12" style={{color:'#9E9E9E'}}>매출</div><div className="t16" style={{marginTop:6}}>+21,400,000원</div></div>
              <div style={{flex:1,borderLeft:'1px solid #EEEEEE',paddingLeft:16}}><div className="cap12" style={{color:'#9E9E9E'}}>지출</div><div className="t16" style={{marginTop:6}}>−17,220,000원</div></div>
            </div>
            <div style={{background:'#F5F5F5',borderRadius:8,padding:18,marginTop:24}}>
              <div className="h4">우 사장님, 자금 관리를 잘하고 계시네요</div>
              <p className="b14" style={{marginTop:10,color:'#616161'}}>자금 흐름이 매우 안정적입니다. 월급 일부를 잉여금으로 보내서 자산을 더 키워보는건 어떨까요?</p>
            </div>
            <div style={{display:'flex',gap:10,marginTop:24}}>
              <button className="btn line sm" style={{flex:1,fontSize:14}}>흐름 자세히 보기</button>
              <button className="btn sm" style={{flex:1,fontSize:14}} onClick={()=>onTab('book')}>장부 보러가기</button>
            </div>
          </div>
          <div className="card">
            <div className="h4">저금통</div>
            <div className="d3" style={{marginTop:8}}>12,350,000원</div>
            <div style={{display:'flex',gap:14,marginTop:10}}>
              <span className="b12" style={{color:'#9E9E9E'}}>목표 <b style={{color:'#424242'}}>1,500만원</b></span>
              <span className="b12" style={{color:'#9E9E9E'}}>세이프존 <b style={{color:'#424242'}}>3개월</b></span>
            </div>
            <div className="l13" style={{marginTop:20,color:'#616161'}}>저금통 달성률</div>
            <div style={{marginTop:8,position:'relative'}}>
              <div style={{height:8,borderRadius:4,background:'#EEEEEE'}}><i style={{display:'block',width:'82%',height:8,borderRadius:4,background:'#5F79FF'}}></i></div>
              <span style={{position:'absolute',right:'14%',top:-22,background:'#EEF1FF',color:'#5F79FF',fontSize:11,fontWeight:700,borderRadius:6,padding:'3px 6px'}}>82%</span>
            </div>
            <div style={{background:'#F5F5F5',borderRadius:8,padding:18,marginTop:24}}>
              <div className="h4">우 사장님, 이 돈 투자해보시는 건 어때요?</div>
              <p className="b14" style={{marginTop:10,color:'#616161'}}>충분히 모인 자금은 다시 투자해보세요. 잠들어 있는 돈보다, 움직이는 돈이 더 큰 가치를 만듭니다.</p>
            </div>
            <button className="btn" style={{marginTop:24}} onClick={()=>go('recipe')}>돈 굴리기 시작하기</button>
          </div>
          <div style={{height:8}}></div>
        </div>
      </div>
      <BottomNav tab="home" onTab={onTab}/>
      <AllMenu open={menu} onClose={()=>setMenu(false)} go={go}/>
    </div>
  );
}

function Placeholder({label, onTab, tab}) {
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div style={{flex:1,display:'grid',placeItems:'center',alignContent:'center',gap:14,padding:24,textAlign:'center'}}>
        <img src="assets/lupang-features.png" alt="" style={{width:170,opacity:.9}}/>
        <div className="h2">{label}</div>
        <p className="b14" style={{color:'#9E9E9E',maxWidth:250}}>이 화면은 다음 단계에서 시안 기준으로 만들 예정이에요.</p>
      </div>
      <BottomNav tab={tab} onTab={onTab}/>
    </div>
  );
}

Object.assign(window, {HomeScreen, BottomNav, Placeholder});
