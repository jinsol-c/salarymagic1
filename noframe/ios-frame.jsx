// ios-frame.jsx — device shell, status bar, shared primitives & icons

function Device({children, panel}) {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const fit = () => setScale(Math.min((window.innerHeight - 48) / 868, 1));
    fit(); window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div className="desk">
      <div className="device" style={{transform:`translate(-50%,-50%) scale(${scale})`}}>
        <div className="notch"></div>
        <div className="glass">{children}</div>
        <div className="homebar"></div>
      </div>
      {panel}
    </div>
  );
}

function StatusBar({dark}) {
  const c = dark ? '#fff' : '#000';
  return (
    <div className="statusbar" style={{color:c}}>
      <span className="t">9:41</span>
      <span className="icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill={c}><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 10.5 5.6 8a3.4 3.4 0 0 1 4.8 0L8 10.5Z" fill={c}/><path d="M3.1 5.6a7 7 0 0 1 9.8 0" stroke={c} strokeWidth="1.6" strokeLinecap="round"/><path d="M.9 2.9a10.2 10.2 0 0 1 14.2 0" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="3" stroke={c} strokeOpacity=".4"/><rect x="2" y="2" width="18" height="8" rx="2" fill={c}/><path d="M23 4v4a2 2 0 0 0 0-4Z" fill={c} fillOpacity=".5"/></svg>
      </span>
    </div>
  );
}

const Chevron = ({d='left', c='#222', s=22}) => {
  const rot = {left:0, right:180, up:90, down:-90}[d];
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{transform:`rotate(${rot}deg)`}}><path d="M15 5l-7 7 7 7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
};

const IconInfo = ({c='#9E9E9E', s=14}) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.4" stroke={c} strokeWidth="1.3"/><path d="M8 4.6v.1M8 7v4.4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>
);

// generic screen shell: statusbar spacer + optional progress + optional back nav
function Screen({progress, onBack, children, foot, dark, noScroll}) {
  return (
    <div className="screen">
      <StatusBar dark={dark}/>
      <div className="sb-pad"></div>
      {typeof progress === 'number' && <div className="progress"><i style={{width:progress+'%'}}></i></div>}
      {onBack && <div className="nav"><button className="back" onClick={onBack} aria-label="뒤로"><Chevron/></button></div>}
      {noScroll ? <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>{children}</div>
                : <div className="scroll">{children}</div>}
      {foot && <div className="foot">{foot}</div>}
    </div>
  );
}

function Sheet({onClose, children, noDim}) {
  return (
    <div className="sheet-wrap">
      <div className="dim" onClick={onClose} style={noDim?{background:'transparent'}:null}></div>
      <div className="sheet">{children}</div>
    </div>
  );
}

// ───────── 공통 HEADER (home / page / sub) — 화면 최상단 고정
const HdrIcon = {
  search: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.6" stroke="currentColor" strokeWidth="1.7"/><path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  noti: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 4a5.6 5.6 0 0 0-5.6 5.6v3.2L4.8 16h14.4l-1.6-3.2V9.6A5.6 5.6 0 0 0 12 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M10 19h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  menu: <svg width="24" height="24" viewBox="0 0 26 26"><path d="M4 8h18M4 13h18M4 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
};

const NOTI_LIST = [
  ['월급','오늘 월급 지급일이에요','희망 월급 300만원이 월급 통장으로 이동할 준비가 됐어요.','방금'],
  ['장부','지난주보다 지출이 12% 늘었어요','식자재 매입이 크게 늘었습니다. 내역을 확인해 보세요.','2시간 전'],
  ['저금통','세금 상자에 1,240,000원이 모였어요','다음 부가세 신고까지 목표의 82%를 채웠습니다.','어제'],
  ['머니 레시피','노란우산공제 가입 조건이 맞아요','남는 돈 82만원을 옮기면 소득공제를 받을 수 있어요.','3일 전'],
];

function NotiPopup({open, onClose}) {
  if (!open) return null;
  return (
    <div style={{position:'absolute',inset:0,zIndex:70,background:'#fff',display:'flex',flexDirection:'column',
      animation:'notiIn .24s cubic-bezier(.22,.61,.36,1) both'}}>
      <style>{`@keyframes notiIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div className="row" style={{padding:'8px 20px 0',flex:'none'}}>
        <span className="h3">알림 전체보기</span>
        <button onClick={onClose} aria-label="닫기">
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className="scroll" style={{padding:'18px 20px 28px'}}>
        {NOTI_LIST.map(([tag,title,body,when],i)=>(
          <div key={i} style={{padding:'18px 0',borderBottom:i<NOTI_LIST.length-1?'1px solid #EEEEEE':'0'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{background:'#EEF1FF',color:'#5F79FF',fontSize:11,fontWeight:700,borderRadius:6,padding:'3px 7px'}}>{tag}</span>
              <span className="cap12" style={{color:'#9E9E9E'}}>{when}</span>
            </div>
            <div className="t16" style={{marginTop:10}}>{title}</div>
            <p className="b14" style={{margin:'6px 0 0',color:'#616161',lineHeight:1.55}}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchPopup({open, onClose, scope}) {
  if (!open) return null;
  return (
    <div style={{position:'absolute',inset:0,zIndex:70,background:'#fff',display:'flex',flexDirection:'column'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 20px 0',flex:'none'}}>
        <div style={{flex:1,display:'flex',alignItems:'center',gap:8,background:'#F5F5F5',borderRadius:10,padding:'0 12px',height:44}}>
          <span style={{color:'#9E9E9E',display:'flex'}}>{HdrIcon.search}</span>
          <input autoFocus placeholder={`${scope} 내 검색`} style={{border:0,outline:'none',background:'transparent',flex:1,fontSize:15}}/>
        </div>
        <button onClick={onClose} className="b14" style={{color:'#616161',flex:'none'}}>취소</button>
      </div>
      <div style={{flex:1,display:'grid',placeItems:'center'}}>
        <p className="b14" style={{color:'#9E9E9E'}}>검색어를 입력해 주세요</p>
      </div>
    </div>
  );
}

function AppHeader({type='page', title, onBack, search=false, go, dark, light}) {
  const [noti, setNoti] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [find, setFind] = React.useState(false);
  const Menu = window.AllMenu;
  const c = light ? '#fff' : '#222';
  const sub = type === 'sub';
  return (
    <React.Fragment>
      <div className="row" style={{flex:'none',padding:'8px 20px 0',position:'relative',zIndex:6,background:light?'transparent':'inherit'}}>
        <span style={{display:'flex',alignItems:'center',gap:8,minWidth:0}}>
          {sub && <button onClick={onBack} aria-label="뒤로" style={{marginLeft:-6,color:c,display:'flex'}}><Chevron c={c}/></button>}
          <span className={sub?'h3':'h2'} style={{color:c,whiteSpace:'nowrap'}}>{title}</span>
        </span>
        {!sub && (
          <span style={{display:'flex',gap:6,color:c,alignItems:'center'}}>
            {search && <button onClick={()=>setFind(true)} aria-label="검색" style={{display:'flex',color:c}}>{HdrIcon.search}</button>}
            <button onClick={()=>setNoti(true)} aria-label="알림" style={{display:'flex',color:c}}>{HdrIcon.noti}</button>
            <button onClick={()=>setMenu(true)} aria-label="전체메뉴" style={{display:'flex',color:c}}>{HdrIcon.menu}</button>
          </span>
        )}
      </div>
      <NotiPopup open={noti} onClose={()=>setNoti(false)}/>
      <SearchPopup open={find} onClose={()=>setFind(false)} scope={title}/>
      {Menu && <Menu open={menu} onClose={()=>setMenu(false)} go={go || (()=>{})}/>}
    </React.Fragment>
  );
}

const won = n => n.toLocaleString('ko-KR');
const man = n => (n/10000).toLocaleString('ko-KR');

Object.assign(window, {Device, StatusBar, Screen, Sheet, Chevron, IconInfo, won, man, AppHeader, NotiPopup, SearchPopup, HdrIcon});
