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

const won = n => n.toLocaleString('ko-KR');
const man = n => (n/10000).toLocaleString('ko-KR');

Object.assign(window, {Device, StatusBar, Screen, Sheet, Chevron, IconInfo, won, man});
