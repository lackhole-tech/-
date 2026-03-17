import React, { useState } from 'react';
import { 
  Scale, 
  Plus, 
  Minus, 
  Briefcase, 
  TrendingUp, 
  TrendingDown, 
  ChevronDown, 
  CheckCircle2,
  Receipt,
  Landmark,
  ArrowDownRight,
  ArrowUpRight,
  PiggyBank,
  HelpCircle,
  FileText,
} from 'lucide-react';

// ─────────────────────────────────────────
// 탭 2: AccountCard 컴포넌트 & 데이터
// ─────────────────────────────────────────

const AccountCard = ({ id, title, description, steps, color, icon: Icon, core }: any) => {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
  };
  const badgeMap = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    amber: 'bg-amber-600',
    purple: 'bg-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full transform transition-hover hover:shadow-lg">
      <div className={`p-4 flex items-center gap-3 ${colorMap[color]} border-b`}>
        <div className="p-2 rounded-lg bg-white shadow-sm">
          <Icon size={20} className={color === 'amber' ? 'text-amber-600' : `text-${color}-600`} />
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight">{id}. {title}</h3>
          <p className="text-xs opacity-80 font-medium">{description}</p>
        </div>
      </div>
      <div className="p-4 flex-grow space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${badgeMap[color]}`}>
                STEP {idx + 1}
              </span>
              <span className="text-sm font-bold text-gray-700">{step.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-px bg-gray-200 rounded-lg overflow-hidden border border-gray-200 text-xs">
              <div className="bg-gray-50 p-2 text-center font-semibold text-gray-500 border-b border-gray-200">차변 (Debit)</div>
              <div className="bg-gray-50 p-2 text-center font-semibold text-gray-500 border-b border-gray-200">대변 (Credit)</div>
              <div className="bg-white p-3 flex flex-col justify-center items-center text-center">
                <span className="font-medium text-gray-800">{step.debit.name}</span>
                <span className="text-[10px] text-gray-400 mt-0.5">{step.debit.note}</span>
              </div>
              <div className="bg-white p-3 flex flex-col justify-center items-center text-center border-l border-gray-200">
                <span className="font-medium text-gray-800">{step.credit.name}</span>
                <span className="text-[10px] text-gray-400 mt-0.5">{step.credit.note}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-gray-50 border-t flex items-center gap-2">
        <div className="bg-white p-1 rounded-full border border-gray-200">
          <HelpCircle size={14} className="text-gray-400" />
        </div>
        <p className="text-xs font-bold text-gray-600">
          핵심: <span className={color === 'amber' ? 'text-amber-600' : `text-${color}-600`}>{core}</span>
        </p>
      </div>
    </div>
  );
};

const flowData = [
  {
    id: "1", title: "미수금", description: "용역/물건을 먼저 주고 돈은 나중에",
    color: "blue", icon: Receipt, core: "받을 권리 → 자산",
    steps: [
      { name: "매출 발생 (사건의 시작)", debit: { name: "미수금", note: "(자산의 증가)" }, credit: { name: "국내용역매출", note: "(수익의 발생)" } },
      { name: "대금 입금 (회수 및 정산)", debit: { name: "보통예금", note: "(자산의 증가)" }, credit: { name: "미수금", note: "(자산의 감소)" } }
    ]
  },
  {
    id: "2", title: "선급금", description: "물건 받기 전에 계약금 먼저 지급",
    color: "green", icon: ArrowUpRight, core: "받을 권리 → 자산",
    steps: [
      { name: "계약금 지급 결의", debit: { name: "선급금", note: "(자산의 증가)" }, credit: { name: "미지급금", note: "(부채의 증가)" } },
      { name: "계약금 실제 지급", debit: { name: "미지급금", note: "(부채의 감소)" }, credit: { name: "보통예금", note: "(자산의 감소)" } },
      { name: "재화/서비스 수령", debit: { name: "비용/자산", note: "(비용발생/자산취득)" }, credit: { name: "선급금", note: "(자산의 감소)" } }
    ]
  },
  {
    id: "3", title: "선수금", description: "물건 주기 전에 돈부터 받음",
    color: "red", icon: ArrowDownRight, core: "제공해야 할 의무 → 부채",
    steps: [
      { name: "대금 수령", debit: { name: "보통예금", note: "(자산의 증가)" }, credit: { name: "선수금", note: "(부채의 증가)" } },
      { name: "용역/재화 제공", debit: { name: "선수금", note: "(부채의 감소)" }, credit: { name: "매출", note: "(수익의 발생)" } }
    ]
  },
  {
    id: "4", title: "선급비용", description: "미래의 비용을 미리 냄 (보험료 등)",
    color: "amber", icon: FileText, core: "미래 서비스 권리 → 자산",
    steps: [
      { name: "비용 선지급 결의", debit: { name: "선급비용", note: "(자산의 증가)" }, credit: { name: "미지급금", note: "(부채의 증가)" } },
      { name: "비용 실제 지급", debit: { name: "미지급금", note: "(부채의 감소)" }, credit: { name: "보통예금", note: "(자산의 감소)" } },
      { name: "기간 경과 (결산 시)", debit: { name: "보험료/임차료", note: "(비용의 발생)" }, credit: { name: "선급비용", note: "(자산의 감소)" } }
    ]
  },
  {
    id: "5", title: "예수금", description: "잠시 맡아서 보관하는 남의 돈",
    color: "purple", icon: PiggyBank, core: "대신 낼 의무 → 부채",
    steps: [
      { name: "급여 지급 시 (원천징수)", debit: { name: "급여", note: "(비용의 발생)" }, credit: { name: "예수금", note: "(부채의 증가)" } },
      { name: "세무서 납부", debit: { name: "예수금", note: "(부채의 감소)" }, credit: { name: "보통예금", note: "(자산의 감소)" } }
    ]
  }
];

// ─────────────────────────────────────────
// 메인 App
// ─────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState('assets');
  const [openFaq, setOpenFaq] = useState(0);
  const [mainTab, setMainTab] = useState('basic');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      {/* Header / Hero Section */}
      <header className="bg-white text-slate-800 py-16 px-6 relative overflow-hidden border-b border-blue-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-sky-50/50" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-5">
          <Scale size={400} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-slate-800">
            📊 회계 기초 - 차변과 대변 이해
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* 메인 탭 버튼 */}
        <div className="flex gap-2 border-b border-slate-200 mb-12">
          <button
            onClick={() => setMainTab('basic')}
            className={`px-6 py-3 font-bold text-sm rounded-t-xl transition-all ${
              mainTab === 'basic'
                ? 'bg-white border border-b-white border-slate-200 text-blue-600 -mb-px'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            📘 차변과 대변 기초
          </button>
          <button
            onClick={() => setMainTab('flow')}
            className={`px-6 py-3 font-bold text-sm rounded-t-xl transition-all ${
              mainTab === 'flow'
                ? 'bg-white border border-b-white border-slate-200 text-blue-600 -mb-px'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            🔄 계정 차변/대변 흐름도
          </button>
        </div>

        {/* ── 탭 1: 기존 콘텐츠 전체 ── */}
        {mainTab === 'basic' && (
          <div className="space-y-24">

            {/* 1. Debit and Credit */}
            <section>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">차변(왼쪽)과 대변(오른쪽)</h2>
                <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                  회계에서는 모든 거래를 <strong>'이중기록(복식부기)'</strong> 원칙에 따라 원인과 결과를 양쪽에 동시에 기록합니다. 
                  이를 통해 양쪽의 합계가 항상 일치하는지 스스로 검증합니다.
                </p>
              </div>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="grid md:grid-cols-2">
                  {/* Debit Side */}
                  <div className="p-8 md:p-12 bg-blue-50/50 border-b md:border-b-0 md:border-r border-slate-200 relative">
                    <div className="absolute top-4 left-4 text-blue-200 font-bold text-6xl opacity-30">L</div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Plus size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900">차변 (Debit)</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-lg font-medium text-slate-700 bg-white p-4 rounded-xl shadow-sm">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="flex-1">자산의 증가 (+)</span>
                      </li>
                      <li className="flex items-center gap-3 text-lg font-medium text-slate-700 bg-white p-4 rounded-xl shadow-sm">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="flex-1">비용의 발생 (+)</span>
                      </li>
                      <li className="flex items-center gap-3 text-lg text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                        <span className="flex-1">부채, 자본, 수익의 감소 (-)</span>
                      </li>
                    </ul>
                  </div>
                  {/* Credit Side */}
                  <div className="p-8 md:p-12 bg-emerald-50/50 relative">
                    <div className="absolute top-4 right-4 text-emerald-200 font-bold text-6xl opacity-30">R</div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <Plus size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-emerald-900">대변 (Credit)</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-lg font-medium text-slate-700 bg-white p-4 rounded-xl shadow-sm">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="flex-1">부채의 증가 (+)</span>
                      </li>
                      <li className="flex items-center gap-3 text-lg font-medium text-slate-700 bg-white p-4 rounded-xl shadow-sm">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="flex-1">자본의 증가 (+)</span>
                      </li>
                      <li className="flex items-center gap-3 text-lg font-medium text-slate-700 bg-white p-4 rounded-xl shadow-sm">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="flex-1">수익의 발생 (+)</span>
                      </li>
                      <li className="flex items-center gap-3 text-lg text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                        <span className="flex-1">자산의 감소 (-)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 2 & 3 & Summary: Visual Integration of Equations */}
            <section className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
              <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">재무제표 안의 회계 등식 총정리</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                  2번(재무상태표)과 3번(손익계산서) 등식은 분리되어 있지 않고 유기적으로 연결되어 있습니다. 회사가 벌어들인 이익이 어떻게 내 몫(자본)이 되는지 확인해 보세요.
                </p>
                <div className="w-full max-w-4xl mx-auto bg-slate-800/80 p-6 md:p-10 rounded-2xl border border-slate-600/50 backdrop-blur-md shadow-xl transform transition hover:scale-105 cursor-default">
                  <div className="text-xs text-slate-400 mb-4 uppercase tracking-widest font-bold">통합 회계 등식</div>
                  <div className="relative w-full border-b-2 border-x-2 border-emerald-500/50 rounded-b-2xl pb-8 px-2 md:px-6 pt-10 mt-2">
                    <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-14 text-lg md:text-3xl font-extrabold">
                      <div className="relative flex items-center gap-1 md:gap-2">
                        <div className="absolute -top-6 left-0 right-0 border-t-2 border-x-2 border-blue-400/50 rounded-t-lg h-3"></div>
                        <div className="absolute -top-11 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-blue-300 font-bold whitespace-nowrap">재무상태표</div>
                        <span className="text-blue-400 px-2 md:px-3 py-1 bg-blue-500/10 rounded-lg">자산</span>
                        <span className="text-slate-500">=</span>
                        <span className="text-rose-400 px-2 md:px-3 py-1 bg-rose-500/10 rounded-lg">부채</span>
                        <span className="text-slate-500">+</span>
                        <span className="text-slate-300 font-light">{"{"}</span>
                        <span className="text-emerald-400 px-2 md:px-3 py-1 bg-emerald-500/10 rounded-lg">자본</span>
                      </div>
                      <span className="text-slate-500">+</span>
                      <div className="relative flex items-center gap-1 md:gap-2">
                        <div className="absolute -top-6 left-0 right-0 border-t-2 border-x-2 border-indigo-400/50 rounded-t-lg h-3"></div>
                        <div className="absolute -top-11 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-indigo-300 font-bold whitespace-nowrap">손익계산서</div>
                        <span className="text-indigo-400 px-2 md:px-3 py-1 bg-indigo-500/10 rounded-lg">수익</span>
                        <span className="text-slate-500">-</span>
                        <span className="text-orange-400 px-2 md:px-3 py-1 bg-orange-500/10 rounded-lg">비용</span>
                      </div>
                      <span className="text-slate-500">-</span>
                      <span className="text-sky-400 px-2 md:px-3 py-1 bg-sky-500/10 rounded-lg">배당</span>
                      <span className="text-slate-300 font-light">{"}"}</span>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 border-2 border-emerald-500/50 px-4 py-1 rounded-full whitespace-nowrap shadow-lg">
                      <span className="text-xs md:text-sm text-emerald-400 font-bold tracking-widest">현금흐름표</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 relative z-10">
                {/* Equation 2: Balance Sheet */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                    <h3 className="text-2xl font-semibold text-blue-300">재무상태표 회계등식</h3>
                  </div>
                  <p className="text-slate-400 mb-6">회사의 재무 상태를 사진 찍듯 보여주는 불변의 공식</p>
                  <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-8">
                      <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 w-[45%] text-center transform transition hover:scale-105 cursor-default">
                        <h4 className="text-blue-300 font-bold text-xl mb-1">자산</h4>
                        <p className="text-xs text-blue-200/70">돈을 벌어다 줌</p>
                      </div>
                      <div className="text-2xl font-bold text-slate-500">=</div>
                      <div className="w-[45%] flex flex-col gap-3">
                        <div className="bg-rose-500/20 border border-rose-400/30 rounded-xl p-3 text-center transform transition hover:scale-105 cursor-default">
                          <h4 className="text-rose-300 font-bold mb-1">부채</h4>
                          <p className="text-xs text-rose-200/70">언젠가 갚을 돈</p>
                        </div>
                        <div className="flex justify-center text-slate-500 font-bold">+</div>
                        <div className="bg-emerald-500/20 border border-emerald-400/50 rounded-xl p-3 text-center transform transition hover:scale-105 cursor-default relative shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                          <h4 className="text-emerald-300 font-bold text-lg mb-1">자본</h4>
                          <p className="text-xs text-emerald-200/70">진짜 내 돈</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connecting Visual Element (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 top-[72%] transform -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                  <div className="relative">
                    <svg width="100" height="150" viewBox="0 0 100 150" fill="none" className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                      <path d="M 90 140 C 60 140, 40 30, 10 30" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8" fill="none">
                        <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="2s" repeatCount="indefinite" />
                      </path>
                      <circle cx="90" cy="140" r="4" fill="currentColor" />
                      <path d="M 20 20 L 10 30 L 20 40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="absolute top-[80%] left-[20%] bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap animate-pulse">
                      당기순이익 유입
                    </div>
                  </div>
                </div>

                {/* Equation 3: Income Statement */}
                <div className="space-y-6">
                  <div className="flex items-center justify-end gap-4 mb-2 lg:flex-row-reverse">
                    <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                    <h3 className="text-2xl font-semibold text-amber-300">손익계산서 회계등식</h3>
                  </div>
                  <p className="text-slate-400 mb-6 text-right lg:text-left">일정 기간 동안 얼마를 벌고 썼는지 보여주는 경영 성과</p>
                  <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="flex justify-between items-center bg-indigo-500/20 border border-indigo-400/30 rounded-xl p-4 transform transition hover:scale-105 cursor-default">
                        <span className="text-xs text-indigo-200/70 uppercase font-bold tracking-wider">들어온 돈</span>
                        <h4 className="text-indigo-300 font-bold text-xl">수익</h4>
                      </div>
                      <div className="flex justify-center">
                        <div className="bg-slate-700 rounded-full p-1"><Minus size={16} className="text-slate-400" /></div>
                      </div>
                      <div className="flex justify-between items-center bg-orange-500/20 border border-orange-400/30 rounded-xl p-4 transform transition hover:scale-105 cursor-default">
                        <span className="text-xs text-orange-200/70 uppercase font-bold tracking-wider">나간 돈</span>
                        <h4 className="text-orange-300 font-bold text-xl">비용</h4>
                      </div>
                      <div className="flex justify-center">
                        <div className="bg-slate-700 rounded-full p-1"><div className="text-slate-400 font-bold leading-none px-1">=</div></div>
                      </div>
                      <div className="flex justify-between items-center bg-emerald-500/30 border-2 border-emerald-400/60 rounded-xl p-4 transform transition hover:scale-105 cursor-default shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <span className="text-xs text-emerald-100/90 uppercase font-bold tracking-wider">경영 성과</span>
                        <h4 className="text-emerald-300 font-bold text-2xl">이익</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5 Elements Interactive Grid */}
            <section>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">회계의 5가지 핵심 요소 파헤치기</h2>
                <p className="text-slate-600 text-lg">아래 탭을 클릭하여 각 계정과목의 상세 내용을 확인하세요.</p>
              </div>
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="flex flex-wrap border-b border-slate-200 bg-slate-50">
                  {[
                    { id: 'assets', label: '① 자산', icon: <Landmark size={18} /> },
                    { id: 'liabilities', label: '② 부채', icon: <Receipt size={18} /> },
                    { id: 'equity', label: '③ 자본', icon: <Briefcase size={18} /> },
                    { id: 'revenue', label: '④ 수익', icon: <TrendingUp size={18} /> },
                    { id: 'expenses', label: '⑤ 비용', icon: <TrendingDown size={18} /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-2 text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-colors
                        ${activeTab === tab.id 
                          ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-[inset_0_4px_0_rgba(37,99,235,1)]' 
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-6 md:p-10 min-h-[400px]">
                  {activeTab === 'assets' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-blue-800 mb-2">자산 (Assets)</h3>
                        <p className="text-slate-600 font-medium">회사가 통제하고 있는 자원이자 미래에 돈이 될 권리. 단순히 물건뿐 아니라 경제적 이익을 가져다줄 '권리'도 포함됩니다.</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ElementCard title="현금 / 보통예금" desc="금고나 은행에 있는 돈" reason="언제든 바로 무언가를 살 수 있는 확실한 자원" />
                        <ElementCard title="외상매출금" desc="상품/서비스를 팔고 나중에 받을 돈" reason="미래에 현금으로 들어올 막강한 권리" />
                        <ElementCard title="미수금" desc="상품 '외'의 것을 팔고 아직 못 받은 돈" reason="앞으로 돈을 요구할 합법적인 권리" />
                        <ElementCard title="선급금" desc="먼저 지급한 계약금이나 착수금" reason="물건이나 서비스를 내놓으라고 요구할 권리" />
                        <ElementCard title="선급비용" desc="1년 치 보험료 등 미리 낸 비용" reason="남은 기간 동안 효익을 누릴 권리가 살아있음" />
                        <ElementCard title="재고자산 / 비품" desc="판매할 상품, 업무용 컴퓨터 등" reason="수익 창출에 사용되는 유용한 자원" />
                        <ElementCard title="특허권" desc="발명이나 기술에 대해 일정 기간 동안 독점적으로 사용할 수 있는 권리" reason="미래 경제적 효익을 가져올 권리" />
                        <ElementCard title="개발비" desc="새로운 제품, 기술, 시스템 등을 개발하기 위해 투입된 돈" reason="미래 경제적 효익을 창출할 것으로 예상되는 무형 자원" />
                        <div className="md:col-span-2 bg-amber-500/10 border border-amber-400/30 rounded-xl p-4 text-sm text-amber-800">
                          <span className="font-bold text-amber-700">❗ 참고 </span>
                          연구비는 기술 가능성을 탐색하는 단계로 미래 경제적 효익을 확실히 입증하기 어렵기 때문에 <span className="font-bold text-amber-700">비용 처리(판매비와관리비)</span>합니다. 반면 개발비는 실제 제품·기술을 개발하는 단계로 요건 충족 시 <span className="font-bold text-amber-700">자산 처리</span>가 가능합니다.
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'liabilities' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-rose-800 mb-2">부채 (Liabilities)</h3>
                        <p className="text-slate-600 font-medium">회사가 미래에 갚거나 지급해야 할 피할 수 없는 의무입니다. 적절히 활용하면 성장의 레버리지가 됩니다.</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ElementCard title="외상매입금" desc="물건을 먼저 받고 나중에 줄 돈" reason="거래처에 약속한 날짜에 줘야 하는 의무" color="rose" />
                        <ElementCard title="미지급금" desc="상품 '외'의 것을 사고 아직 안 준 돈" reason="언젠가는 돈이 빠져나가야 할 법적 의무" color="rose" />
                        <ElementCard title="미지급비용" desc="전기요금 등 아직 안 낸 비용" reason="서비스를 썼으므로 돈을 내야 할 의무 확정" color="rose" />
                        <ElementCard title="선수금" desc="고객에게 계약금으로 먼저 받은 돈" reason="물건이나 서비스를 제공해야 할 의무(빚)" color="rose" />
                        <ElementCard title="예수금" desc="직원 세금 등 잠시 맡아둔 돈" reason="국가기관 등에 고스란히 납부해야 할 빚" color="rose" />
                      </div>
                    </div>
                  )}
                  {activeTab === 'equity' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-emerald-800 mb-2">자본 (Equity)</h3>
                        <p className="text-slate-600 font-medium">자산에서 부채를 뺀 회사의 순수한 '내 몫'. 회사의 성적표와 같습니다.</p>
                      </div>
                      <div className="space-y-4">
                        <ElementCard title="자본금" desc="주주가 처음에 회사를 세울 때 투자한 기본 종잣돈" color="emerald" fullWidth />
                        <ElementCard title="이익잉여금" desc="장사를 잘해서 매년 벌어들인 이익이 차곡차곡 쌓인 금액 (당기순이익 포함)" reason="가장 건강한 형태의 자본" color="emerald" fullWidth />
                        <ElementCard title="자본잉여금" desc="영업이 아닌 주식 발행 등 자본금 거래를 통해 남은 잉여 자금" color="emerald" fullWidth />
                      </div>
                    </div>
                  )}
                  {activeTab === 'revenue' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-indigo-800 mb-2">수익 (Revenue)</h3>
                        <p className="text-slate-600 font-medium">회사가 영업활동 등으로 벌어들인 돈입니다. (자본 증가 요인)</p>
                      </div>
                      <div className="space-y-4">
                        <ElementCard title="매출" desc="본업(상품 판매, 서비스 제공)으로 당당하게 벌어들인 돈" reason="회사의 존재 이유" color="indigo" fullWidth />
                        <ElementCard title="이자수익 / 임대수익" desc="예금 이자나 건물 임대료 등으로 번 돈" reason="본업은 아니지만 경제적 이익 유입" color="indigo" fullWidth />
                        <ElementCard title="잡이익" desc="폐지 판매 등 일시적이고 비정기적으로 발생한 이익" color="indigo" fullWidth />
                      </div>
                    </div>
                  )}
                  {activeTab === 'expenses' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-orange-800 mb-2">비용 (Expenses)</h3>
                        <p className="text-slate-600 font-medium">수익을 얻기 위해 어쩔 수 없이 소비한 돈입니다. (자본 감소 요인)</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ElementCard title="급여 / 복리후생비" desc="직원 인건비, 식대, 회식비 등" reason="수익 창출의 핵심 동력을 위한 지출" color="orange" />
                        <ElementCard title="임차료" desc="사무실이나 창고의 월세" reason="영업활동을 위한 공간 비용" color="orange" />
                        <ElementCard title="접대비" desc="거래처 식사 등 영업활동 지출" reason="매출을 일으키기 위한 관계 유지 비용" color="orange" />
                        <ElementCard title="소모품비 / 통신비" desc="복사용지 구입, 인터넷 요금 등" reason="회사 운영 과정에서 써서 없어지는 비용" color="orange" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="pb-20">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">💡 실무에서 가장 많이 헷갈리는 회계 개념 TOP 5</h2>
                <p className="text-slate-600 text-lg">결의서를 작성할 때마다 고민되는 개념들을 완벽 정리했습니다.</p>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                <FaqItem
                  index={0} isOpen={openFaq === 0} toggle={() => toggleFaq(0)}
                  title={
                    <div className="flex items-center flex-wrap gap-2 text-xl font-bold text-slate-800">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">외상매출금</span>
                      <span className="text-slate-400">vs</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">미수금</span>
                      <span className="ml-2">둘 다 받을 돈인데 뭐가 다르죠?</span>
                    </div>
                  }
                  answer={
                    <div>
                      <p className="font-bold text-lg text-blue-700 mb-4">A. 회사의 '본업(Main Business)'과 관련이 있는지로 엄격하게 구분합니다.</p>
                      <ul className="space-y-4 text-slate-600 leading-relaxed">
                        <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                          <div><strong className="text-slate-800 block mb-1">외상매출금 (본업 O)</strong>빵집에서 '빵'을 단체 주문받고 아직 못 받은 돈입니다.</div>
                        </li>
                        <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                          <div><strong className="text-slate-800 block mb-1">미수금 (본업 X)</strong>빵집에서 쓰던 '낡은 오븐이나 중고 차량'을 처분하고 아직 못 받은 돈입니다.</div>
                        </li>
                      </ul>
                    </div>
                  }
                />
                <FaqItem
                  index={1} isOpen={openFaq === 1} toggle={() => toggleFaq(1)}
                  title={
                    <div className="flex items-center flex-wrap gap-2 text-xl font-bold text-slate-800">
                      <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-sm">외상매입금</span>
                      <span className="text-slate-400">vs</span>
                      <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-sm">미지급금</span>
                      <span className="ml-2">둘 다 나중에 줄 돈인데 뭐가 다르죠?</span>
                    </div>
                  }
                  answer={
                    <div>
                      <p className="font-bold text-lg text-rose-700 mb-4">A. 마찬가지로 '본업'을 위한 핵심 구매인지로 구분합니다.</p>
                      <ul className="space-y-4 text-slate-600 leading-relaxed">
                        <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                          <div><strong className="text-slate-800 block mb-1">외상매입금 (본업 O)</strong>빵집에서 빵을 만들기 위해 '밀가루나 설탕'을 외상으로 대량 사 왔을 때 사용합니다.</div>
                        </li>
                        <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                          <div><strong className="text-slate-800 block mb-1">미지급금 (본업 X)</strong>빵집 매장에 틀어놓을 '오디오 스피커'를 사고 다음 달에 카드값을 내기로 했을 때 사용합니다.</div>
                        </li>
                      </ul>
                    </div>
                  }
                />
                <FaqItem
                  index={2} isOpen={openFaq === 2} toggle={() => toggleFaq(2)}
                  title={<div className="text-xl font-bold text-slate-800">'선급비용'은 이름에 '비용'이 들어가는데 왜 <span className="text-blue-600">자산</span>인가요?</div>}
                  answer={
                    <div>
                      <p className="font-bold text-lg text-blue-700 mb-3">A. 돈은 먼저 냈지만, 아직 내 권리가 빵빵하게 살아있기 때문입니다.</p>
                      <p className="text-slate-600 leading-relaxed bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                        예를 들어 1년 치 화재보험료(1,200만 원)를 12월 1일에 냈다고 가정해 봅시다.<br/><br/>
                        나머지 11달 치(1,100만 원)는 내년에 화재로부터 보호받을 <strong>'막강한 권리'</strong>가 남아있습니다. 따라서 이 금액은 회사의 소중한 <strong>자산(선급비용)</strong>입니다.
                      </p>
                    </div>
                  }
                />
                <FaqItem
                  index={3} isOpen={openFaq === 3} toggle={() => toggleFaq(3)}
                  title={<div className="text-xl font-bold text-slate-800">'선수금'은 내 통장에 진짜 현금이 들어온 건데 왜 <span className="text-rose-600">부채</span>인가요?</div>}
                  answer={
                    <div>
                      <p className="font-bold text-lg text-rose-700 mb-3">A. 돈만 먼저 받았지, 아직 내가 할 도리를 다하지 않았기 때문입니다.</p>
                      <p className="text-slate-600 leading-relaxed bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                        고객에게 기계 제작 계약금 5,000만 원을 먼저 받았습니다. 통장 잔고는 늘었지만, 회사는 약속한 기계를 무사히 넘겨줘야 할 <strong>'무거운 의무(빚)'</strong>가 생겼습니다.<br/><br/>
                        따라서 아직은 빚(부채)인 '선수금'으로 묶어두고, 나중에 무사히 납품하는 순간 비로소 회사의 수익(매출)으로 변신합니다.
                      </p>
                    </div>
                  }
                />
                <FaqItem
                  index={4} isOpen={openFaq === 4} toggle={() => toggleFaq(4)}
                  title={<div className="text-xl font-bold text-slate-800">왜 <span className="text-orange-600">판관비</span>를 <span className="text-indigo-600">용역원가(매출원가)</span>로 대체하나요?</div>}
                  answer={
                    <div>
                      <p className="font-bold text-lg text-slate-700 mb-3">A. 정확한 '매출총이익'을 계산하여 수익성 왜곡을 막기 위해서입니다.</p>
                      <p className="text-slate-600 leading-relaxed bg-white p-5 rounded-xl border border-slate-100 shadow-sm mb-4">
                        용역 수행과 직접 관련된 비용이 판관비로 처리되면 매출총이익이 실제보다 크게 왜곡되기 때문입니다.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        {/* 대체 전 */}
                        <div className="bg-rose-50/50 p-5 rounded-xl border border-rose-100">
                          <div className="text-sm font-bold text-rose-600 mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>대체 전 (왜곡 발생)
                          </div>
                          <div className="space-y-2 text-sm font-mono bg-white p-4 rounded-lg border border-rose-50 shadow-sm">
                            <div className="flex justify-between items-center"><span className="text-slate-600">매출</span><span className="font-semibold text-slate-800">693,851,819</span></div>
                            <div className="flex justify-between items-center text-slate-400"><span>매출원가</span><span>0</span></div>
                            <div className="flex justify-between items-center font-bold text-rose-600 border-t border-rose-100 pt-2 mt-1"><span className="text-xs px-2 py-0.5 bg-rose-100 rounded">과대계상</span><span>693,851,819</span></div>
                            <div className="flex justify-between items-center text-slate-500 mt-3 pt-3 border-t border-dashed border-slate-200"><span>판관비</span><span>388,094,126</span></div>
                            <div className="flex justify-between items-center font-bold text-slate-800 border-t border-slate-200 pt-2 mt-1"><span>영업이익</span><span>305,757,693</span></div>
                          </div>
                        </div>

                        {/* 대체 후 */}
                        <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
                          <div className="text-sm font-bold text-emerald-600 mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>대체 후 (정상 표시)
                          </div>
                          <div className="space-y-2 text-sm font-mono bg-white p-4 rounded-lg border border-emerald-50 shadow-sm">
                            <div className="flex justify-between items-center"><span className="text-slate-600">매출</span><span className="font-semibold text-slate-800">693,851,819</span></div>
                            <div className="flex justify-between items-center text-emerald-600 font-medium"><span className="text-xs px-2 py-0.5 bg-emerald-100 rounded">대체</span><span>388,094,126</span></div>
                            <div className="flex justify-between items-center font-bold text-emerald-700 border-t border-emerald-200 pt-2 mt-1"><span>매출총이익</span><span>305,757,693</span></div>
                            <div className="flex justify-between items-center text-slate-400 mt-3 pt-3 border-t border-dashed border-slate-200"><span>판관비</span><span>0</span></div>
                            <div className="flex justify-between items-center font-bold text-slate-800 border-t border-slate-200 pt-2 mt-1"><span>영업이익</span><span>305,757,693</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium border border-blue-100 flex items-start gap-3">
                        <span className="text-xl">💡</span>
                        <p>따라서 <strong>매출과 직접 관련된 비용은 매출원가로 재분류</strong>하여 회사 사업의 정확한 수익성을 보여주기 위해 대체 작업을 진행합니다.</p>
                      </div>
                    </div>
                  }
                />
              </div>
            </section>

          </div>
        )}

        {/* ── 탭 2: 계정 차변/대변 흐름도 ── */}
        {mainTab === 'flow' && (
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">계정 구조도 및 차변/대변 흐름도</h2>
              <p className="text-slate-500 text-sm">주요 자산/부채 계정의 발생부터 정산까지의 회계 처리 한눈에 보기</p>
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-bold text-gray-600 underline decoration-blue-200 decoration-2 underline-offset-4">자산 계정</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs font-bold text-gray-600 underline decoration-red-200 decoration-2 underline-offset-4">부채 계정</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flowData.map((item) => (
                <AccountCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// ─────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────

function ElementCard({ title, desc, reason, color = 'blue', fullWidth = false }: { title: string, desc: string, reason?: string, color?: string, fullWidth?: boolean }) {
  const colorStyles = {
    blue: 'border-blue-200 bg-blue-50/30 text-blue-900',
    rose: 'border-rose-200 bg-rose-50/30 text-rose-900',
    emerald: 'border-emerald-200 bg-emerald-50/30 text-emerald-900',
    indigo: 'border-indigo-200 bg-indigo-50/30 text-indigo-900',
    orange: 'border-orange-200 bg-orange-50/30 text-orange-900',
  };
  const badgeColor = {
    blue: 'bg-blue-100 text-blue-700',
    rose: 'bg-rose-100 text-rose-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    orange: 'bg-orange-100 text-orange-700',
  };
  return (
    <div className={`p-5 rounded-2xl border ${colorStyles[color]} ${fullWidth ? 'w-full' : ''}`}>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-slate-600 text-sm mb-3">{desc}</p>
      {reason && (
        <div className={`text-xs px-3 py-2 rounded-lg inline-block font-medium ${badgeColor[color]}`}>
          {reason}
        </div>
      )}
    </div>
  );
}

function FaqItem({ index, isOpen, toggle, title, answer }: { index: number, isOpen: boolean, toggle: () => void, title: React.ReactNode, answer: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
      <button
        onClick={toggle}
        className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors focus:outline-none"
      >
        <div className="flex gap-4 items-center">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
            Q{index + 1}
          </div>
          {title}
        </div>
        <ChevronDown className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 pt-0 bg-slate-50/50 border-t border-slate-100">
          <div className="pl-12">{answer}</div>
        </div>
      </div>
    </div>
  );
}
