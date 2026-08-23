// screens-book-main.jsx — 02 장부 메인 (월간 요약 · 달력 · 주머니) + 시트 + 상세내역

const BK_BLUE = '#5F79FF', BK_RED = '#F04452', BK_GRAY = '#9E9E9E';
const won = n => n.toLocaleString('ko-KR');
const ampm = t => { const [h,m] = t.split(':').map(Number); return `${h<12?'오전':'오후'} ${String(h%12||12).padStart(2,'0')}:${String(m).padStart(2,'0')}`; };
const txnTime = meta => {
  const parts = meta.split('|').map(s=>s.trim());
  const dm = (parts[0].match(/(\d+)월\s*(\d+)일/) || []);
  const date = dm[1] ? `26년 ${String(dm[1]).padStart(2,'0')}월 ${dm[2]}일` : parts[0];
  const t = parts.find(p=>/^\d{1,2}:\d{2}$/.test(p));
  return t ? `${date} ${ampm(t)}` : `${date} 오후 02:17`;
};
const signed = n => (n === 0 ? '0' : (n > 0 ? '+' : '−') + won(Math.abs(n)));

// 4월 2026 (1일 = 수요일) 더미 데이터
const APR_DAYS = (() => {
  const inc = [1000000,1000000,1000000,1000000,0,1000000,1000000];
  const exp = [500000,700000,1500000,0,1000000,500000,500000];
  const d = {};
  for (let i = 1; i <= 30; i++) {
    const k = (i - 1) % 7;
    if (i <= 21) d[i] = [inc[k], exp[k]];
    else if (i === 23) d[i] = [0, 3000000];
    else if (i === 30) d[i] = [0, 2300000];
    else d[i] = [0, 0];
  }
  return d;
})();

function BookIcon({src, name}) {
  if (src) return <span style={{width:38,height:38,borderRadius:10,overflow:'hidden',flex:'none',border:'1px solid #EEEEEE',background:'#fff'}}>
    <img src={src} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/></span>;
  return <span style={{width:38,height:38,borderRadius:10,flex:'none',background:'#F0F0F0',display:'grid',placeItems:'center',
    fontSize:13,fontWeight:700,color:'#9E9E9E'}}>{(name||'').slice(0,1)}</span>;
}
const Kebab = ({onClick}) => (
  <button onClick={onClick} aria-label="상세 정보" style={{display:'grid',gap:2.5,padding:'2px 4px',flex:'none'}}>
    {[0,1,2].map(i=><i key={i} style={{width:3,height:3,borderRadius:'50%',background:'#BDBDBD',display:'block'}}></i>)}
  </button>
);

// ── 거래 상세정보 팝업
function TxnDetailModal({txn, onClose}) {
  const [pay, setPay] = uS('카드');
  const [memo, setMemo] = uS('');
  return (
    <div style={{position:'absolute',inset:0,zIndex:80,display:'grid',placeItems:'center',padding:'0 24px'}}>
      <div onClick={onClose} style={{position:'absolute',inset:0,background:'rgba(0,0,0,.4)'}}></div>
      <div style={{position:'relative',width:'100%',background:'#fff',borderRadius:18,padding:'26px 22px 22px',
        animation:'txnPop .22s cubic-bezier(.22,.61,.36,1) both'}}>
        <style>{`@keyframes txnPop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}`}</style>
        <div className="t16">{txn.name}</div>
        <div className="d3" style={{marginTop:6}}>{won(Math.abs(txn.amount))}원</div>
        <div style={{marginTop:20}}>
          <div className="row" style={{padding:'14px 0',borderBottom:'1px solid #EEEEEE'}}>
            <span className="b14" style={{color:'#9E9E9E'}}>분류</span>
            <span style={{display:'flex',gap:8}}>
              {['카드','현금'].map(p=>(
                <button key={p} onClick={()=>setPay(p)} style={{padding:'7px 22px',borderRadius:999,fontSize:13,fontWeight:600,
                  border:'1px solid '+(pay===p?BK_BLUE:'#E0E0E0'),color:pay===p?BK_BLUE:'#BDBDBD',background:'#fff'}}>{p}</button>
              ))}
            </span>
          </div>
          <div className="row" style={{padding:'16px 0',borderBottom:'1px solid #EEEEEE'}}>
            <span className="b14" style={{color:'#9E9E9E'}}>거래처</span><span className="b14">{txn.vendor || txn.name}</span>
          </div>
          <div className="row" style={{padding:'16px 0',borderBottom:'1px solid #EEEEEE'}}>
            <span className="b14" style={{color:'#9E9E9E'}}>거래시간</span><span className="b14">{txn.time}</span>
          </div>
          <div className="row" style={{padding:'16px 0'}}>
            <span className="b14" style={{color:'#9E9E9E'}}>메모</span>
            <input value={memo} onChange={e=>setMemo(e.target.value)} placeholder="입력하세요"
              style={{border:0,outline:'none',textAlign:'right',fontSize:14,background:'transparent',flex:1,marginLeft:16}}/>
          </div>
        </div>
        <div style={{display:'flex',gap:10,marginTop:18}}>
          <button className="btn ghost sm" style={{flex:1}} onClick={onClose}>취소</button>
          <button className="btn sm" style={{flex:1}} onClick={onClose}>저장</button>
        </div>
      </div>
    </div>
  );
}
const TagPair = ({on}) => (
  <span style={{display:'inline-flex',borderRadius:999,overflow:'hidden',marginTop:6}}>
    {['사업자','개인'].map(t=>(
      <span key={t} style={{fontSize:11,fontWeight:600,padding:'3px 9px',
        background:on===t?'#EDF0FF':'#F5F5F5',color:on===t?BK_BLUE:'#BDBDBD',
        border:'1px solid '+(on===t?'#C3CDFF':'#EEEEEE')}}>{t}</span>
    ))}
  </span>
);

// ── 시트 · 기간 설정 (휠)
function PeriodSheet({onClose}) {
  const [mode, setMode] = uS('wheel');
  const years = [2022,2023,2024,2025,2026,2027,2028];
  const months = [1,2,3,4,5,6,7];
  const [y, setY] = uS(2026), [m, setM] = uS(4);
  const wheelStyle = sel => ({fontSize:sel?21:19,fontWeight:sel?700:400,color:sel?'#222':'#D0D0D0',
    padding:'7px 0',textAlign:'center',transition:'color .15s'});
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  return (
    <Sheet onClose={onClose}>
      {[['시작일','2026년 4월 1일'],['종료일','2026년 4월 22일']].map(([l,v])=>(
        <button key={l} className="row" style={{width:'100%',padding:'10px 0'}} onClick={()=>setMode(mode==='wheel'?'cal':'wheel')}>
          <span className="t16">{l}</span>
          <span style={{display:'flex',alignItems:'center',gap:8}}><span className="b14" style={{color:'#616161'}}>{v}</span>
            <Chevron d="down" s={16} c="#616161"/></span>
        </button>
      ))}
      {mode==='wheel' ? (
        <div style={{display:'flex',gap:20,marginTop:14,position:'relative',height:210,overflow:'hidden'}}>
          <div style={{position:'absolute',left:0,right:0,top:'50%',transform:'translateY(-50%)',height:44,background:'#F5F5F5',borderRadius:8}}></div>
          {[[years,y,setY,'년'],[months,m,setM,'월']].map(([list,val,setter,suf])=>{
            const idx = list.indexOf(val);
            return (
            <div key={suf} style={{flex:1,position:'relative',zIndex:1}}>
              <div style={{position:'absolute',left:0,right:0,top:'50%',transform:`translateY(${-(idx+0.5)*42}px)`,transition:'transform .2s'}}>
                {list.map(v=>(
                  <div key={v} onClick={()=>setter(v)} style={{...wheelStyle(v===val),height:42,lineHeight:'42px',padding:0,cursor:'pointer'}}>{v}{suf}</div>
                ))}
              </div>
            </div>);
          })}
        </div>
      ) : (
        <div style={{marginTop:16}}>
          <button style={{display:'flex',alignItems:'center',gap:8}}><span className="h3">{y}년 {m}월</span><Chevron d="down" s={16} c="#222"/></button>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',marginTop:16,rowGap:0}}>
            {days.map((d,i)=><div key={d} className="cap12" style={{textAlign:'center',paddingBottom:12,color:BK_GRAY}}>{d}</div>)}
            {Array.from({length:3}).map((_,i)=><div key={'p'+i}></div>)}
            {Array.from({length:30},(_,i)=>i+1).map(d=>{
              const inRange = d >= 1 && d <= 22, edge = d === 1 || d === 22;
              return (
                <div key={d} style={{height:40,display:'grid',placeItems:'center',background:inRange&&!edge?'#E9EDFF':'transparent'}}>
                  <span style={{width:38,height:38,borderRadius:edge?'50%':0,display:'grid',placeItems:'center',
                    background:edge?BK_BLUE:inRange?'#E9EDFF':'transparent',
                    color:edge?'#fff':inRange?BK_BLUE:'#C7C7C7',fontSize:15,fontWeight:edge?700:500}}>{d}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{display:'flex',gap:8,marginTop:24}}>
        <button className="btn ghost sm" style={{flex:1}} onClick={onClose}>취소</button>
        <button className="btn sm" style={{flex:1}} onClick={onClose}>적용</button>
      </div>
    </Sheet>
  );
}

// ── 시트 · 내역 필터
function FilterSheet({onClose}) {
  const [cats, setCats] = uS({수입:true, 지출:true, 세무:true});
  const [scope, setScope] = uS({수입:'사업자', 지출:'사업자', 세무:'사업자'});
  return (
    <Sheet onClose={onClose}>
      <div className="h3">내역 필터</div>
      {[['기간','월간'],['거래수단','모든 거래 수단']].map(([l,v])=>(
        <button key={l} className="row" style={{width:'100%',padding:'14px 0'}}>
          <span className="t16">{l}</span>
          <span style={{display:'flex',alignItems:'center',gap:8}}><span className="b14" style={{color:'#616161'}}>{v}</span>
            <Chevron d="right" s={16} c="#616161"/></span>
        </button>
      ))}
      <div className="t16" style={{marginTop:10}}>카테고리</div>
      <div style={{background:'#F5F5F5',borderRadius:10,padding:'6px 14px',marginTop:12}}>
        {['수입','지출','세무'].map(c=>(
          <div className="row" key={c} style={{padding:'14px 0'}}>
            <button style={{display:'flex',alignItems:'center',gap:10}} onClick={()=>setCats(v=>({...v,[c]:!v[c]}))}>
              <span className={'cbox'+(cats[c]?' on':'')}></span><span className="t16">{c}</span>
            </button>
            <span style={{display:'inline-flex',borderRadius:999,overflow:'hidden'}}>
              {['사업자','전체'].map(t=>(
                <button key={t} onClick={()=>setScope(v=>({...v,[c]:t}))} style={{fontSize:12,fontWeight:600,padding:'6px 14px',
                  background:scope[c]===t?BK_BLUE:'#fff',color:scope[c]===t?'#fff':'#9E9E9E'}}>{t}</button>
              ))}
            </span>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:8,marginTop:22}}>
        <button className="btn ghost sm" style={{flex:1}} onClick={onClose}>취소</button>
        <button className="btn sm" style={{flex:1}} onClick={onClose}>적용</button>
      </div>
    </Sheet>
  );
}

// ── 달력
function DayModal({day, onClose}) {
  const [txn, setTxn] = uS(null);
  const v = APR_DAYS[day] || [0,0];
  const inc = v[0] > 0 ? [
    ['포스기 카드입금','14:20 | 카드매출', Math.round(v[0]*0.62),'assets/logo-okpos.png'],
    ['배민주문','11:05 | 은행이체입금', v[0]-Math.round(v[0]*0.62),'assets/logo-baemin.png'],
  ] : [];
  const out = v[1] > 0 ? [
    ['식자재 매입','09:40 | 현대카드', -Math.round(v[1]*0.55), null],
    ['배민 수수료','11:05 | 카카오뱅크 이체', -Math.round(v[1]*0.25),'assets/logo-baemin.png'],
    ['포스기 이용료','18:00 | 신한은행 이체', -(v[1]-Math.round(v[1]*0.55)-Math.round(v[1]*0.25)-Math.round(v[1]*0.1)),'assets/logo-shinhan.png'],
    ['부가세 예수금','18:10 | 자동 이체', -Math.round(v[1]*0.1), null],
  ] : [];
  return (
    <div style={{position:'absolute',inset:0,zIndex:70,background:'#fff',display:'flex',flexDirection:'column',
      animation:'dayModalIn .26s cubic-bezier(.22,.61,.36,1) both'}}>
      <style>{`@keyframes dayModalIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div className="row" style={{padding:'8px 20px 0',flex:'none'}}>
        <span className="h3">2026년 4월 {day}일</span>
        <button onClick={onClose} aria-label="닫기">
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{padding:'18px 20px 0',flex:'none'}}>
        <div className="card" style={{padding:'18px'}}>
          <div className="row"><span className="b14" style={{color:'#616161'}}>수입</span><span className="h4" style={{color:BK_BLUE}}>{v[0]?'+'+won(v[0]):'0'}원</span></div>
          <div className="row" style={{marginTop:12}}><span className="b14" style={{color:'#616161'}}>지출</span><span className="h4" style={{color:BK_RED}}>{v[1]?'−'+won(v[1]):'0'}원</span></div>
          <div style={{height:1,background:'#EEEEEE',margin:'14px 0'}}></div>
          <div className="row"><span className="h4">합계</span><span className="h2">{signed(v[0]-v[1])}원</span></div>
        </div>
      </div>
      <div className="scroll" style={{padding:'42px 20px 24px'}}>
        {[['수입',inc],['지출',out]].map(([t,rows])=>(
          <div key={t} style={{marginBottom:44}}>
            <div className="h4" style={{marginBottom:16}}>{t}</div>
            {rows.length === 0 && <p className="b14" style={{color:BK_GRAY,margin:0}}>내역이 없어요</p>}
            <div style={{display:'grid',gap:18}}>
              {rows.map(([n,meta,amt,logo],i)=>(
                <div className="row" key={i} style={{gap:10,alignItems:'flex-start'}}>
                  <BookIcon src={logo} name={n}/>
                  <span style={{flex:1,minWidth:0}}>
                    <span className="t16" style={{display:'block'}}>{n}</span>
                    <span className="cap12" style={{display:'block',marginTop:5,color:BK_GRAY}}>{meta}</span>
                  </span>
                  <span style={{display:'flex',gap:6,alignItems:'flex-start'}}>
                    <span className="h4" style={{color:amt>0?BK_BLUE:BK_RED,whiteSpace:'nowrap'}}>{signed(amt)}</span>
                    <Kebab onClick={()=>setTxn({name:n, amount:amt, vendor:n, time:txnTime(`4월${day}일 | ${meta}`)})}/>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {txn && <TxnDetailModal txn={txn} onClose={()=>setTxn(null)}/>}
    </div>
  );
}

function BookCalendar({onDay}) {
  const weekday = ['일','월','화','수','목','금','토'];
  const cells = [null,null,null, ...Array.from({length:30},(_,i)=>i+1), 1,2,3,4];
  const weeks = Array.from({length:Math.ceil(cells.length/7)},(_,i)=>cells.slice(i*7,i*7+7));
  return (
    <div className="card" style={{padding:'18px 12px'}}>
      <div className="row" style={{padding:'0 6px'}}>
        <span className="h2" style={{color:BK_BLUE}}>2026년 4월</span>
        <span style={{display:'flex',gap:8}}>
          {['left','right'].map(d=>(
            <span key={d} style={{width:26,height:26,borderRadius:'50%',border:'1px solid #E0E0E0',display:'grid',placeItems:'center'}}>
              <Chevron d={d} s={14} c={BK_BLUE}/></span>
          ))}
        </span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',marginTop:16}}>
        {weekday.map((d,i)=><div key={d} className="cap12" style={{textAlign:'center',paddingBottom:8,
          color:i===0?BK_RED:i===6?BK_BLUE:'#8FA0C8'}}>{d}</div>)}
      </div>
      {weeks.map((w,wi)=>{
        const isOut = di => { const gi = wi*7+di; return gi < 3 || gi >= 33; };
        const sum = w.reduce((a,d,di)=>{ const v = isOut(di)?null:APR_DAYS[d]; return a + (v?v[0]-v[1]:0); },0);
        return (
          <div key={wi}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)'}}>
              {w.map((d,di)=>{
                const outside = d === null || isOut(di);
                const v = !outside && APR_DAYS[d] ? APR_DAYS[d] : null;
                const today = d === 18 && !outside;
                return (
                  <div key={di} onClick={()=>{ if(!outside && d) onDay(d); }} style={{minHeight:44,textAlign:'center',padding:'2px 1px',cursor:outside?'default':'pointer'}}>
                    {d && <div style={{fontSize:12,fontWeight:today?700:500,color:today?'#fff':outside?'#D0D0D0':di===0?BK_RED:di===6?BK_BLUE:'#424242',
                      width:20,height:20,lineHeight:'20px',margin:'0 auto',borderRadius:'50%',background:today?BK_BLUE:'transparent'}}>{d}</div>}
                    {v && v[0] > 0 && <div style={{fontSize:8.5,color:BK_RED,marginTop:2}}>+{won(v[0])}</div>}
                    {v && v[1] > 0 && <div style={{fontSize:8.5,color:BK_GRAY}}>−{won(v[1])}</div>}
                  </div>
                );
              })}
            </div>
            <div className="row" style={{borderTop:'1px solid #F0F0F0',padding:'3px 6px 6px'}}>
              <span style={{fontSize:9,color:'#BDBDBD'}}>소계</span>
              {sum !== 0 && <span style={{fontSize:9.5,fontWeight:600,color:sum>0?BK_RED:BK_GRAY}}>{signed(sum)}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── 주머니 카드
const POCKET_IN = [
  ['포스기 카드입금','4월9일 | 14:20 | 카드매출',820000,'assets/logo-okpos.png'],
  ['배민주문','4월10일 | 11:05 | 은행이체입금',156000,'assets/logo-baemin.png'],
  ['포스기 카드입금','4월11일 | 11:25 | 카드매출',156000,'assets/logo-okpos.png'],
];
const POCKET_OUT = [
  ['넷플릭스 결제','4월9일 | 신한은행 이체',-15000,'assets/logo-shinhan.png','사업자'],
  ['배민 수수료','4월10일 | 카카오뱅크 이체',-50000,'assets/logo-baemin.png','사업자'],
  ['포스기 이용료','4월11일 | 토스뱅크 이체',-100000,'assets/logo-okpos.png','사업자'],
];
function PocketCard({title, total, rows, cta, onCta, tags, onTxn}) {
  return (
    <div className="card" style={{padding:'20px 18px'}}>
      <div className="h3">{title}</div>
      <div className="row" style={{marginTop:14}}>
        <span className="b14" style={{color:'#616161'}}>2026년 4월</span>
        <span className="h2">{won(total)}</span>
      </div>
      <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
      <div style={{display:'grid',gap:16}}>
        {rows.map(([n,meta,amt,logo,tag],i)=>(
          <div className="row" key={i} style={{alignItems:'flex-start',gap:10}}>
            <BookIcon src={logo} name={n}/>
            <span style={{flex:1,minWidth:0}}>
              <span className="t16" style={{display:'block'}}>{n}</span>
              <span className="cap12" style={{display:'block',marginTop:5,color:BK_GRAY}}>{meta}</span>
              {tags && <TagPair on={tag}/>}
            </span>
            <span style={{textAlign:'right',display:'flex',alignItems:'flex-start',gap:6}}>
              <span className="h4" style={{color:amt>0?BK_BLUE:BK_RED,whiteSpace:'nowrap'}}>{signed(amt)}</span>
              <Kebab onClick={()=>onTxn({name:n, amount:amt, vendor:n, time:txnTime(meta)})}/>
            </span>
          </div>
        ))}
      </div>
      <button className="btn" style={{marginTop:20}} onClick={onCta}>{cta}</button>
    </div>
  );
}

// ── 02 장부 메인
function BookMain({onTab, go}) {
  const [sheet, setSheet] = uS(null);
  const [day, setDay] = uS(null);
  const [txn, setTxn] = uS(null);
  const [view, setView] = uS('달력');
  const scRef = React.useRef(null);
  const circle = {width:30,height:30,borderRadius:'50%',border:'1px solid #E0E0E0',display:'grid',placeItems:'center',flex:'none'};
  return (
    <div className="screen" style={{background:'#F5F5F5'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div className="row" style={{padding:'8px 20px 0',flex:'none'}}>
        <span className="h2">장부</span>
        <span style={{display:'flex',gap:16,alignItems:'center'}}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.6" stroke="#222" strokeWidth="1.7"/><path d="M16 16l4 4" stroke="#222" strokeWidth="1.7" strokeLinecap="round"/></svg>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M6 10a6 6 0 1 1 12 0c0 4 1.4 5.4 1.4 5.4H4.6S6 14 6 10Z" stroke="#222" strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 18.4a2 2 0 0 0 4 0" stroke="#222" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#222" strokeWidth="1.6"/><circle cx="12" cy="10" r="3" stroke="#222" strokeWidth="1.6"/><path d="M5.8 19a7 7 0 0 1 12.4 0" stroke="#222" strokeWidth="1.6"/></svg>
        </span>
      </div>
      <div className="row" style={{padding:'14px 20px 6px',flex:'none'}}>
        <button style={circle} aria-label="이전 달"><Chevron s={15} c={BK_BLUE}/></button>
        <button className="h3" onClick={()=>setSheet('period')}>2026년 4월</button>
        <button style={{...circle,background:'#F0F0F0',borderColor:'#F0F0F0'}} aria-label="다음 달"><Chevron d="right" s={15} c="#C7C7C7"/></button>
      </div>
      <div className="scroll" ref={scRef} style={{padding:'10px 0 24px'}}>
        <div style={{padding:'0 20px',display:'grid',gap:12}}>
          <div className="card" style={{padding:'20px 18px'}}>
            <div className="h3" style={{color:BK_BLUE}}>월간 요약</div>
            <div style={{marginTop:18,display:'grid',gap:16}}>
              {[['총 수입','+ 5,200,000원','전월 대비 12.2%'],['총 지출','− 2,750,000원','전월 대비 6.5%']].map(([l,v,sub])=>(
                <div className="row" key={l} style={{alignItems:'flex-start'}}>
                  <span className="b14" style={{color:'#616161'}}>{l}</span>
                  <span style={{textAlign:'right'}}>
                    <span className="t16" style={{display:'block'}}>{v}</span>
                    <span className="cap12" style={{display:'block',marginTop:4,color:'#BDBDBD'}}>{sub}</span>
                  </span>
                </div>
              ))}
            </div>
            <div style={{height:1,background:'#EEEEEE',margin:'16px 0'}}></div>
            <div className="row">
              <span className="h4">합계</span>
              <span style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{border:'1px solid #C3CDFF',color:BK_BLUE,borderRadius:999,padding:'4px 10px',fontSize:11,fontWeight:600}}>정산완료</span>
                <span className="h2">2,234,567원</span>
              </span>
            </div>
            <button className="btn" style={{marginTop:18}} onClick={()=>go('book_report')}>분석 리포트 보기</button>
          </div>

          <div style={{background:'#FFF8E8',border:'1px solid #FCE7B4',borderRadius:12,padding:'16px 18px'}}>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#E0A100" strokeWidth="1.7"/><path d="M12 7.4v5.2" stroke="#E0A100" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="16.4" r="1.1" fill="#E0A100"/></svg>
              <span className="h4" style={{color:'#B07800'}}>구조 개선 필요</span>
            </div>
            <p className="b14" style={{margin:'10px 0 0',color:'#7A5A12'}}>수익 변동이 있어 월급 유지가 불안정해질 수 있어요</p>
            <div style={{height:1,background:'#F1DFB4',margin:'14px 0'}}></div>
            <button className="b14" style={{width:'100%',color:'#7A5A12',fontWeight:600}} onClick={()=>go('recipe_loan')}>대출 알아보기</button>
          </div>
        </div>

        <div style={{marginTop:20,padding:'18px 20px 0',background:'#EFEFF2'}}>
          <div className="row">
            <span style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{display:'inline-flex',background:'#fff',borderRadius:8,padding:3,border:'1px solid #E6E6EA'}}>
                {['달력','목록'].map(v=>(
                  <button key={v} onClick={()=>setView(v)} style={{padding:'6px 14px',borderRadius:6,fontSize:13,fontWeight:view===v?700:400,
                    background:view===v?'#fff':'transparent',color:view===v?'#222':'#BDBDBD'}}>{v}</button>
                ))}
              </span>
              <button onClick={()=>setSheet('filter')} style={{width:36,height:32,borderRadius:8,background:'#fff',border:'1px solid #E6E6EA',display:'grid',placeItems:'center'}} aria-label="필터">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 8h10M18 8h2M4 16h4M12 16h8" stroke="#616161" strokeWidth="1.7" strokeLinecap="round"/><circle cx="16" cy="8" r="2.2" stroke="#616161" strokeWidth="1.7"/><circle cx="10" cy="16" r="2.2" stroke="#616161" strokeWidth="1.7"/></svg>
              </button>
            </span>
            <button aria-label="검색">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.6" stroke="#616161" strokeWidth="1.7"/><path d="M16 16l4 4" stroke="#616161" strokeWidth="1.7" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div style={{display:'grid',gap:12,marginTop:16,paddingBottom:24}}>
            {view==='달력' ? <BookCalendar onDay={d=>setDay(d)}/> : (
              <div className="card" style={{padding:'20px 18px'}}>
                <div className="h4">4월 거래 목록</div>
                <div style={{marginTop:16,display:'grid',gap:16}}>
                  {[...POCKET_IN, ...POCKET_OUT].map(([n,meta,amt,logo],i)=>(
                    <div className="row" key={i} style={{gap:10}}>
                      <BookIcon src={logo} name={n}/>
                      <span style={{flex:1,minWidth:0}}>
                        <span className="t16" style={{display:'block'}}>{n}</span>
                        <span className="cap12" style={{display:'block',marginTop:5,color:BK_GRAY}}>{meta}</span>
                      </span>
                      <span className="h4" style={{color:amt>0?BK_BLUE:BK_RED,whiteSpace:'nowrap'}}>{signed(amt)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <PocketCard title="입금 주머니" total={1845000} rows={POCKET_IN} cta="입금 상세내역 확인" onCta={()=>go('book_in')} onTxn={setTxn}/>
            <PocketCard title="지출 주머니" total={1165000} rows={POCKET_OUT} tags cta="지출 상세내역 확인" onCta={()=>go('book_out')} onTxn={setTxn}/>
          </div>
        </div>
      </div>
      <button onClick={()=>scRef.current && scRef.current.scrollTo({top:0,behavior:'smooth'})}
        style={{position:'absolute',right:16,bottom:96,width:44,height:44,borderRadius:'50%',background:BK_BLUE,
          display:'grid',placeItems:'center',boxShadow:'0 6px 16px rgba(95,121,255,.4)',zIndex:20}} aria-label="맨 위로">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 19V6m0 0-6 6m6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <BottomNav tab="book" onTab={onTab}/>
      {sheet==='period' && <PeriodSheet onClose={()=>setSheet(null)}/>}
      {sheet==='filter' && <FilterSheet onClose={()=>setSheet(null)}/>}
      {day && <DayModal day={day} onClose={()=>setDay(null)}/>}
      {txn && <TxnDetailModal txn={txn} onClose={()=>setTxn(null)}/>}
    </div>
  );
}

// ── 수입 / 지출 상세내역
const TXN_ROWS = Array.from({length:12},(_,i)=>{
  const set = [['포스기 카드입금','매출 14:20','assets/logo-okpos.png','사업자'],
    ['식자재','현대카드 11:05',null,'사업자'],
    ['다이소집기','현대카드 11:05',null,'사업자'],
    ['포스기 카드입금','매출 14:20','assets/logo-okpos.png','개인']];
  return set[i % 4];
});
function BookTxnList({kind, back}) {
  const [f, setF] = uS('전체');
  const [txn, setTxn] = uS(null);
  const income = kind === 'in';
  const rows = TXN_ROWS.filter(r => f === '전체' || (f === '사업' ? r[3] === '사업자' : r[3] === '개인'));
  const total = rows.length * 14900;
  return (
    <div className="screen" style={{background:'#fff'}}>
      <StatusBar/>
      <div className="sb-pad"></div>
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 20px 0',flex:'none'}}>
        <button onClick={back} style={{marginLeft:-6}}><Chevron/></button>
        <span className="h3">{income ? '수입' : '지출'}</span>
      </div>
      <div className="row" style={{padding:'14px 20px 6px',flex:'none'}}>
        <span style={{width:30,height:30,borderRadius:'50%',border:'1px solid #E0E0E0',display:'grid',placeItems:'center'}}><Chevron s={15} c={BK_BLUE}/></span>
        <span className="h3">2026년 3월 27일</span>
        <span style={{width:30,height:30,borderRadius:'50%',background:'#F0F0F0',display:'grid',placeItems:'center'}}><Chevron d="right" s={15} c="#C7C7C7"/></span>
      </div>
      <div className="row" style={{padding:'14px 20px 12px',flex:'none',alignItems:'flex-end'}}>
        <span style={{display:'inline-flex',background:'#F0F0F0',borderRadius:8,padding:3}}>
          {['전체','사업','개인'].map(t=>(
            <button key={t} onClick={()=>setF(t)} style={{padding:'8px 18px',borderRadius:6,fontSize:14,fontWeight:f===t?700:400,
              background:f===t?'#222':'transparent',color:f===t?'#fff':'#9E9E9E'}}>{t}</button>
          ))}
        </span>
        <span style={{textAlign:'right'}}>
          <span className="cap12" style={{color:BK_GRAY}}>총 {rows.length}건</span>
          <span className="h2" style={{display:'block',marginTop:6,color:income?BK_BLUE:BK_RED}}>{income?'+':'−'}{won(total)}원</span>
        </span>
      </div>
      <div className="scroll" style={{padding:'0 20px 24px'}}>
        <div style={{display:'grid',gap:0,paddingTop:6}}>
          {rows.map(([n,meta,logo,tag],i)=>(
            <div className="row" key={i} style={{gap:10,alignItems:'flex-start',padding:'18px 0',borderBottom:i<rows.length-1?'1px solid #EEEEEE':'0'}}>
              <BookIcon src={logo} name={n}/>
              <span style={{flex:1,minWidth:0}}>
                <span className="t16" style={{display:'block'}}>{n}</span>
                <span className="cap12" style={{display:'block',marginTop:5,color:BK_GRAY}}>{meta}</span>
                <TagPair on={tag}/>
              </span>
              <span style={{display:'flex',gap:6,alignItems:'flex-start'}}>
                <span className="h4" style={{color:income?BK_BLUE:BK_RED,whiteSpace:'nowrap'}}>{income?'+':'−'}14,900</span>
                <Kebab onClick={()=>setTxn({name:n, amount:14900, vendor:n, time:'26년 03월 27일 오후 02:17'})}/>
              </span>
            </div>
          ))}
        </div>
      </div>
      <button style={{position:'absolute',right:16,bottom:24,width:44,height:44,borderRadius:'50%',background:BK_BLUE,
        display:'grid',placeItems:'center',boxShadow:'0 6px 16px rgba(95,121,255,.4)'}} aria-label="맨 위로">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 19V6m0 0-6 6m6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {txn && <TxnDetailModal txn={txn} onClose={()=>setTxn(null)}/>}
    </div>
  );
}

Object.assign(window, {BookMain, BookTxnList, PeriodSheet, FilterSheet, TxnDetailModal});
