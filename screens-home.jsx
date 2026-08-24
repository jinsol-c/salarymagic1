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

const MENU_QUICK = [
  ['알림','noti','M12 4a5.6 5.6 0 0 0-5.6 5.6v3.2L4.8 16h14.4l-1.6-3.2V9.6A5.6 5.6 0 0 0 12 4Z'],
  ['리포트','book_report','M5 19V6m5 13V9m5 10V4m5 15v-7'],
  ['마이페이지','mypage','M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c0-3.4 3.1-5.6 7-5.6s7 2.2 7 5.6'],
  ['금융','recipe','M4 10 12 5l8 5M6 10v8h12v-8M9 18v-4h6v4'],
];
const MENU_SECTIONS = [
  ['장부', [['book_in','입금 주머니'],['book_out','지출 주머니'],['book_report','리포트']]],
  ['월급', [['salary_setting','월급 설정'],['salary_history','월급 이력 보기']]],
  ['저금통', [['bank_box','저금통 설정'],['bank_txn_tax','세금 관리']]],
  ['마이페이지', [['mypage','개인 정보 관리'],['mypage','사업장 관리'],['mypage','계좌 관리'],['plan','구독 관리']]],
];

function AllMenu({open, onClose, go}) {
  const [noti, setNoti] = uS(false);
  const pick = r => { if (r === 'noti') { setNoti(true); return; } onClose(); go(r); };
  return (
    <div style={{position:'absolute',inset:0,zIndex:60,pointerEvents:open?'auto':'none'}}>
      <div onClick={onClose} style={{position:'absolute',inset:0,background:'rgba(0,0,0,.78)',opacity:open?1:0,transition:'opacity .28s'}}></div>
      <div style={{position:'absolute',top:0,right:0,bottom:0,width:'88%',background:'#fff',display:'flex',flexDirection:'column',
        transform:open?'translateX(0)':'translateX(100%)',transition:'transform .3s cubic-bezier(.22,.61,.36,1)',boxShadow:'-8px 0 24px rgba(0,0,0,.12)'}}>
        <div style={{flex:'none',padding:'54px 20px 0',position:'relative',height:44,display:'grid',placeItems:'center'}}>
          <button onClick={onClose} aria-label="뒤로" style={{position:'absolute',left:14,top:52,display:'flex'}}><Chevron/></button>
          <span className="h3">전체 메뉴</span>
        </div>
        <div className="scroll" style={{padding:'26px 22px 36px'}}>
          <div style={{display:'flex',gap:14}}>
            {MENU_QUICK.map(([label,route,d])=>(
              <button key={label} onClick={()=>pick(route)} style={{flex:1,display:'grid',justifyItems:'center',gap:8}}>
                <span style={{width:48,height:48,borderRadius:'50%',background:'#F0F2F8',display:'grid',placeItems:'center'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={d} stroke="#5F79FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span className="cap12" style={{color:'#616161'}}>{label}</span>
              </button>
            ))}
          </div>
          {MENU_SECTIONS.map(([sec, items])=>(
            <div key={sec} style={{marginTop:34}}>
              <div className="h3">{sec}</div>
              <div style={{height:1,background:'#222',marginTop:12}}></div>
              <div style={{marginTop:6}}>
                {items.map(([r,label],i)=>(
                  <button key={label+i} onClick={()=>pick(r)} className="row" style={{width:'100%',textAlign:'left',padding:'13px 0'}}>
                    <span className="t16">{label}</span>
                    <Chevron d="right" c="#BDBDBD" s={18}/>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <NotiPopup open={noti} onClose={()=>setNoti(false)}/>
    </div>
  );
}

function HomeScreen({s, onTab, onMenu, go}) {
  const [menu, setMenu] = uS(false);
  const [noti, setNoti] = uS(false);
  const name = (s.profile.name || '김루팡') + '님';
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="scroll">
        <div style={{background:'#5F79FF',padding:'44px 0 0',position:'relative'}}>
          <div className="row" style={{padding:'12px 20px 12px',position:'sticky',top:0,zIndex:4,background:'#5F79FF'}}>
            <span className="h2" style={{color:'#fff'}}>월급술사</span>
            <span style={{display:'flex',gap:6,alignItems:'center'}}>
              <button onClick={()=>setNoti(true)} style={{display:'flex',color:'#fff'}}>{HdrIcon.noti}</button>
              <button onClick={()=>setMenu(true)} style={{display:'flex',color:'#fff'}}>{HdrIcon.menu}</button>
            </span>
          </div>
          <img src="assets/lupang-piggy.png" alt="" style={{position:'absolute',right:14,top:70,width:158,zIndex:5,pointerEvents:'none',animation:'microFloat 3.6s ease-in-out infinite'}}/>
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
      <NotiPopup open={noti} onClose={()=>setNoti(false)}/>
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

Object.assign(window, {HomeScreen, BottomNav, Placeholder, AllMenu});
