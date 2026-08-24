// screens-mypage.jsx — 마이페이지

const MY_SECTIONS = [
  ['계정', [['개인 정보 관리',null],['사업장 관리',null],['계좌 관리',null]]],
  ['이용', [['구독 관리','plan'],['알림 설정',null],['보안 · 인증',null]]],
  ['고객 지원', [['고객문의',null],['공지사항',null],['약관 및 정책',null]]],
];

function MyPage({s, back, go}) {
  const name = (s && s.profile && s.profile.name) || '김루팡';
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <AppHeader type="sub" title="마이페이지" onBack={back}/>
      <div className="scroll" style={{padding:'16px 20px 32px'}}>
        <div className="card" style={{padding:'22px 18px'}}>
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <span style={{width:52,height:52,borderRadius:'50%',background:'#EEF1FF',display:'grid',placeItems:'center',flex:'none'}}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="3.6" stroke="#5F79FF" strokeWidth="1.7"/><path d="M5 19.4c0-3.3 3.1-5.4 7-5.4s7 2.1 7 5.4" stroke="#5F79FF" strokeWidth="1.7" strokeLinecap="round"/></svg>
            </span>
            <span style={{flex:1,minWidth:0}}>
              <span className="h3" style={{display:'block'}}>{name} 사장님</span>
              <span className="cap12" style={{display:'block',marginTop:6,color:'#9E9E9E'}}>루팡식당 · 음식점</span>
            </span>
            <Chevron d="right" c="#BDBDBD" s={18}/>
          </div>
          <div style={{height:1,background:'#EEEEEE',margin:'18px 0'}}></div>
          <div style={{display:'flex'}}>
            {[['이용 요금제','Free'],['연동 계좌','3개'],['가입일','2026.03']].map(([k,v],i)=>(
              <div key={k} style={{flex:1,textAlign:'center',borderLeft:i?'1px solid #EEEEEE':'0'}}>
                <div className="cap12" style={{color:'#9E9E9E'}}>{k}</div>
                <div className="t16" style={{marginTop:6}}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="card row" style={{width:'100%',textAlign:'left',padding:'16px 18px',marginTop:12}} onClick={()=>go('plan')}>
          <span>
            <span className="h4" style={{display:'block'}}>Pro로 업그레이드</span>
            <span className="cap12" style={{display:'block',marginTop:6,color:'#9E9E9E'}}>인건비 비교와 3개년 리포트를 볼 수 있어요</span>
          </span>
          <Chevron d="right" c="#BDBDBD" s={18}/>
        </button>

        {MY_SECTIONS.map(([sec, items])=>(
          <div key={sec} style={{marginTop:26}}>
            <div className="cap12" style={{color:'#9E9E9E'}}>{sec}</div>
            <div className="card" style={{marginTop:10,padding:'4px 18px'}}>
              {items.map(([label, route],i)=>(
                <button key={label} className="row" onClick={()=>route && go(route)}
                  style={{width:'100%',textAlign:'left',padding:'16px 0',borderBottom:i<items.length-1?'1px solid #F2F2F2':'0'}}>
                  <span className="t16">{label}</span>
                  <Chevron d="right" c="#BDBDBD" s={18}/>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{display:'flex',gap:18,marginTop:30,justifyContent:'center'}}>
          <button className="b14" style={{color:'#9E9E9E'}}>로그아웃</button>
          <span style={{width:1,background:'#E0E0E0'}}></span>
          <button className="b14" style={{color:'#9E9E9E'}}>회원 탈퇴</button>
        </div>
        <p className="cap12" style={{textAlign:'center',marginTop:18,color:'#BDBDBD'}}>월급술사 v0.01</p>
      </div>
    </div>
  );
}

Object.assign(window, {MyPage});
