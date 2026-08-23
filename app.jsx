// app.jsx — 라우터 + 슬라이드 전환 + 화면 목록 패널

const OB_ROUTES = [
  ['ob_intro','00 인트로'], ['ob_profile','01 사장님 정보'], ['ob_want','02 희망 월급'],
  ['ob_industry','03 업종 선택'], ['ob_revenue','04 예상 필요 매출'], ['ob_features','05 기능 소개'],
  ['ob_signup','06 회원가입 · 약관'], ['ob_auth','07 본인인증'], ['ob_consent','08 데이터 연결 동의'],
  ['ob_loading','09 돈 흐름 확인중'], ['ob_check','10 창업 체크리스트'],
  ['ob_coach1','11 코치마크 · 계좌 연동'], ['ob_coach2','12 코치마크 · 비상금 상자'],
  ['ob_salary','13 월급 설정 · 계좌 선택'], ['ob_done','14 월급 설정 완료'],
];
const APP_ROUTES = [['home','01 메인 홈'],['book','02 장부'],['book_in','02-1 수입 상세내역'],['book_out','02-2 지출 상세내역'],['book_report','02-3 분석 리포트'],['book_detail','02-4 장부 · 카테고리 상세'],
  ['salary_main','03 월급 메인'],['salary_setting','03-1 월급 설정 변경'],['salary_payout','03-2 월급 지급 받기'],['salary_risk','03-3 월급 지급 · RISK'],['salary_history','03-4 월급 수령 이력'],['plan','03-5 요금제'],
  ['bank','04 저금통 메인'],['bank_txn_emg','04-1 비상금 상자 거래내역'],['bank_txn_tax','04-2 세금 상자 거래내역'],['bank_box','04-2 상자 설정'],
  ['recipe','05 머니 레시핌'],['recipe_loan','05-1 대출'],['recipe_invest','05-2 투자'],['recipe_insure','05-3 보험'],['recipe_card','05-4 카드'],
  ['lock','06 잠금화면 알림']];
let PLAN_FROM = 'salary_main';
const ORDER = [...OB_ROUTES, ...APP_ROUTES].map(r=>r[0]);

function App() {
  const [route, setRoute] = React.useState('ob_intro');
  const [prev, setPrev] = React.useState(null);
  const [dir, setDir] = React.useState(1);
  const [menu, setMenu] = React.useState(false);
  const [cat, setCat] = React.useState('식자재');
  const [s, setS] = React.useState({
    profile:{name:'', phone:'', rrn:''},
    want:3000000, industry:null, auth:null,
    terms:[false,false,false,false],
    checks:[true,true,false,false,false,false,false,false,false],
    salary:3000000,
  });
  const set = patch => setS(v=>({...v, ...patch}));

  const nav = (next, d) => {
    if (next === route) return;
    if (next === 'plan') PLAN_FROM = route;
    const dd = d !== undefined ? d : (ORDER.indexOf(next) >= ORDER.indexOf(route) ? 1 : -1);
    setDir(dd); setPrev(route); setRoute(next);
    setTimeout(()=>setPrev(null), 340);
  };
  const step = k => nav(ORDER[ORDER.indexOf(route)+k], k>0?1:-1);
  const go = () => step(1);
  const back = () => step(-1);

  const tabNav = t => nav(t==='home'?'home':t==='salary'?'salary_main':t==='save'?'bank':'book');

  const render = r => {
    const p = {s, set, go, back};
    switch(r){
      case 'ob_intro': return <ObIntro go={go}/>;
      case 'ob_profile': return <ObProfile {...p}/>;
      case 'ob_want': return <ObWant {...p}/>;
      case 'ob_industry': return <ObIndustry {...p}/>;
      case 'ob_revenue': return <ObRevenue {...p}/>;
      case 'ob_features': return <ObFeatures {...p}/>;
      case 'ob_signup': return <ObSignup {...p}/>;
      case 'ob_auth': return <ObAuth {...p}/>;
      case 'ob_consent': return <ObConsent {...p}/>;
      case 'ob_loading': return <ObLoading {...p}/>;
      case 'ob_check': return <ObChecklist {...p}/>;
      case 'ob_coach1': return <ObCoach1 go={go} skip={go}/>;
      case 'ob_coach2': return <ObCoach2 go={go} skip={go}/>;
      case 'ob_salary': return <ObSalarySet {...p}/>;
      case 'ob_done': return <ObSalaryDone {...p}/>;
      case 'home': return <HomeScreen s={s} onTab={tabNav} onMenu={()=>setMenu(true)} go={nav}/>;
      case 'book': return <BookMain onTab={tabNav} go={nav}/>;
      case 'book_in': return <BookTxnList kind="in" back={()=>nav('book',-1)}/>;
      case 'book_out': return <BookTxnList kind="out" back={()=>nav('book',-1)}/>;
      case 'book_report': return <BookScreen onTab={tabNav} go={nav} back={()=>nav('book',-1)} onDetail={l=>{setCat(l); nav('book_detail');}}/>;
      case 'book_detail': return <BookDetail label={cat} onBack={()=>nav('book',-1)}/>;
      case 'salary_main': return <SalaryMain s={s} onTab={tabNav} go={nav}/>;
      case 'salary_setting': return <SalarySetting s={s} set={set} back={()=>nav('salary_main',-1)}/>;
      case 'salary_payout': return <SalaryPayout s={s} back={()=>nav('salary_main',-1)}/>;
      case 'salary_risk': return <SalaryPayout s={s} risk back={()=>nav('salary_main',-1)}/>;
      case 'salary_history': return <SalaryHistory back={()=>nav('salary_main',-1)}/>;
      case 'plan': return <PlanScreen back={()=>nav(PLAN_FROM,-1)}/>;
      case 'bank': return <BankMain onTab={tabNav} go={nav}/>;
      case 'bank_txn': return <BankTxn back={()=>nav('bank',-1)}/>;
      case 'bank_txn_emg': return <BankTxn title="비상금 상자 거래내역" back={()=>nav('bank',-1)}/>;
      case 'bank_txn_tax': return <BankTxn title="세금 상자 거래내역" back={()=>nav('bank',-1)}/>;
      case 'bank_box': return <BankBox back={()=>nav('bank',-1)}/>;
      case 'recipe': return <RecipeMain onBack={()=>nav('home',-1)} go={nav}/>;
      case 'recipe_loan': return <RecipeDetail kind="loan" back={()=>nav('recipe',-1)}/>;
      case 'recipe_invest': return <RecipeDetail kind="invest" back={()=>nav('recipe',-1)}/>;
      case 'recipe_insure': return <RecipeDetail kind="insure" back={()=>nav('recipe',-1)}/>;
      case 'recipe_card': return <RecipeDetail kind="card" back={()=>nav('recipe',-1)}/>;
      case 'lock': return <LockScreen go={()=>nav('home')}/>;
      default: return null;
    }
  };

  const panel = (
    <>
      <button className="idxbtn" onClick={()=>setMenu(m=>!m)} aria-label="화면 목록">
        {menu
          ? <svg width="20" height="20" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          : <svg width="20" height="20" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>}
      </button>
      {menu && (
        <div className="idxpanel">
          <h6>온보딩</h6>
          {OB_ROUTES.map(([k,label])=>(
            <button key={k} className={route===k?'on':''} onClick={()=>{nav(k); setMenu(false);}}>{label}</button>
          ))}
          <h6>앱</h6>
          {APP_ROUTES.map(([k,label])=>(
            <button key={k} className={route===k?'on':''} onClick={()=>{nav(k); setMenu(false);}}>{label}</button>
          ))}
        </div>
      )}
    </>
  );

  return (
    <Device panel={panel}>
      {prev && <div className={dir>0?'slide-out':'slide-out-b'} style={{position:'absolute',inset:0}}>{render(prev)}</div>}
      <div className={prev ? (dir>0?'slide-in':'slide-in-b') : ''} style={{position:'absolute',inset:0}}>{render(route)}</div>
    </Device>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
