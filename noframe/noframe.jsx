// noframe.jsx — 모바일 프레임(베젤·노치·홈바·상태바) 없는 전체화면 셸. ios-frame.jsx 뒤, app.jsx 앞에서 로드.

function Device({children, panel}) {
  return (
    <div className="desk desk-plain">
      <div className="glass glass-plain">{children}</div>
      {panel}
    </div>
  );
}

Object.assign(window, {Device});
