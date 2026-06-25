import { useState, useRef } from "react";
import { ShieldAlert, ShieldCheck, ShieldHalf, Scale, Info, CheckCircle2, XCircle, HelpCircle, Loader2, Upload, FileText, Clock, UserCheck, Share2, MapPin, AlertTriangle, User, Cookie, Trash2, Shield, BellRing, Baby, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnalysisResult {
  privacy_score: number;
  collected_data: string[];
  key_red_flags: string[];
  is_data_sold: {
    status: string;
    brief_detail: string;
  };
  third_party_sharing: {
    status: string;
    brief_detail: string;
  };
  used_for_ai_training: {
    status: string;
    brief_detail: string;
  };
  location_tracking: {
    status: string;
    brief_detail: string;
  };
  cookies_and_tracking: {
    status: string;
    brief_detail: string;
  };
  data_deletion_right: {
    status: string;
    brief_detail: string;
  };
  data_security: {
    status: string;
    brief_detail: string;
  };
  breach_notifications: {
    status: string;
    brief_detail: string;
  };
  minor_protection: {
    status: string;
    brief_detail: string;
  };
  policy_updates: {
    status: string;
    brief_detail: string;
  };
  data_retention: string;
  age_restriction: string;
  user_rights: string[];
  ethical_risk_level: string;
}

export default function App() {
  const [policyText, setPolicyText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!policyText.trim()) {
      setError("الرجاء إدخال نص سياسة الخصوصية أولاً.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: policyText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ أثناء تحليل النص.");
      }

      setResult(data);
    } catch (err: any) {
      const errorMessage = err.message || "فشل الاتصال بالخادم.";
      if (errorMessage.includes("503") || errorMessage.includes("high demand") || errorMessage.includes("UNAVAILABLE")) {
        setError("النظام يواجه ضغطاً عالياً حالياً. يرجى المحاولة مرة أخرى لاحقاً.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      setError("يرجى رفع ملف نصي (.txt) فقط.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setPolicyText(text);
      setError("");
    };
    reader.onerror = () => {
      setError("حدث خطأ أثناء قراءة الملف.");
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 50) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-emerald-50 border-emerald-200";
    if (score >= 50) return "bg-amber-50 border-amber-200";
    return "bg-rose-50 border-rose-200";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "نعم":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "لا":
        return <XCircle className="w-5 h-5 text-rose-500" />;
      case "غير واضح":
      default:
        return <HelpCircle className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col" dir="rtl">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-sm">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              بوابة الموافقة الشفافة (Transparent AI Consent)
            </h1>
            <span className="hidden sm:inline-flex items-center bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-indigo-100">
              مدعوم بالذكاء الاصطناعي
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  النص القانوني
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  قم بلصق نص سياسة الخصوصية أو شروط الخدمة للتحليل.
                </p>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Upload className="w-4 h-4" />
                رفع ملف نصي
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".txt" 
                className="hidden" 
              />
            </div>
            
            <textarea
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              placeholder="مثال: نقوم بجمع بيانات الموقع الخاصة بك لمشاركتها مع شركائنا..."
              className="flex-1 min-h-[300px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 text-base"
            ></textarea>

            <div className="mt-4 flex items-center justify-between">
              {error && (
                <p className="text-rose-500 text-sm font-medium">{error}</p>
              )}
              <div className="flex-1"></div>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري التحليل المعمق...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    تحليل النص
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-[1.2] flex flex-col">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-6 h-full"
              >
                <div className={`bg-white rounded-2xl shadow-sm border p-6 flex flex-col sm:flex-row items-center gap-6 ${getScoreBgColor(result.privacy_score)}`}>
                  <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" className="text-slate-200" strokeWidth="12" fill="none" />
                      <circle 
                        cx="64" cy="64" r="56" 
                        className={getScoreColor(result.privacy_score)} 
                        strokeWidth="12" fill="none" strokeLinecap="round"
                        strokeDasharray="351.858"
                        strokeDashoffset={351.858 - (351.858 * result.privacy_score) / 100}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor(result.privacy_score)}`}>{result.privacy_score}</span>
                      <span className="text-xs font-semibold text-slate-500 uppercase">/ 100</span>
                    </div>
                  </div>
                  
                  <div className="text-center sm:text-right flex-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-1">درجة الخصوصية</h2>
                    <p className="text-slate-600 text-sm mb-3">تقييم شامل لمدى احترام هذه السياسة لبياناتك.</p>
                    <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                      <ShieldAlert className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">مستوى الخطر: <span className="font-bold">{result.ethical_risk_level}</span></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><Scale className="w-4 h-4" /></div>
                      هل تباع البيانات؟
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.is_data_sold.status)}
                      <span className="text-lg font-bold text-slate-800">{result.is_data_sold.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.is_data_sold.brief_detail}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><Share2 className="w-4 h-4" /></div>
                      مشاركة مع جهات خارجية
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.third_party_sharing.status)}
                      <span className="text-lg font-bold text-slate-800">{result.third_party_sharing.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.third_party_sharing.brief_detail}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><MapPin className="w-4 h-4" /></div>
                      تتبع الموقع الجغرافي
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.location_tracking.status)}
                      <span className="text-lg font-bold text-slate-800">{result.location_tracking.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.location_tracking.brief_detail}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><Loader2 className="w-4 h-4" /></div>
                      تدريب الذكاء الاصطناعي
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.used_for_ai_training.status)}
                      <span className="text-lg font-bold text-slate-800">{result.used_for_ai_training.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.used_for_ai_training.brief_detail}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><Cookie className="w-4 h-4" /></div>
                      التتبع وملفات الكوكيز
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.cookies_and_tracking.status)}
                      <span className="text-lg font-bold text-slate-800">{result.cookies_and_tracking.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.cookies_and_tracking.brief_detail}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><Trash2 className="w-4 h-4" /></div>
                      حق حذف البيانات
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.data_deletion_right.status)}
                      <span className="text-lg font-bold text-slate-800">{result.data_deletion_right.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.data_deletion_right.brief_detail}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><Shield className="w-4 h-4" /></div>
                      أمن البيانات
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.data_security.status)}
                      <span className="text-lg font-bold text-slate-800">{result.data_security.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.data_security.brief_detail}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><BellRing className="w-4 h-4" /></div>
                      إشعارات الاختراق
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.breach_notifications.status)}
                      <span className="text-lg font-bold text-slate-800">{result.breach_notifications.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.breach_notifications.brief_detail}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><Baby className="w-4 h-4" /></div>
                      حماية القاصرين
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.minor_protection.status)}
                      <span className="text-lg font-bold text-slate-800">{result.minor_protection.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.minor_protection.brief_detail}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><RefreshCw className="w-4 h-4" /></div>
                      تحديثات السياسة
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.policy_updates.status)}
                      <span className="text-lg font-bold text-slate-800">{result.policy_updates.status}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                      {result.policy_updates.brief_detail}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><Clock className="w-4 h-4" /></div>
                      مدة الاحتفاظ
                    </h3>
                    <p className="text-slate-800 font-medium text-sm">
                      {result.data_retention}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><User className="w-4 h-4" /></div>
                      قيود العمر
                    </h3>
                    <p className="text-slate-800 font-medium text-sm">
                      {result.age_restriction}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 rounded-md"><UserCheck className="w-4 h-4" /></div>
                      حقوق المستخدم
                    </h3>
                    {result.user_rights && result.user_rights.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {result.user_rights.map((right, idx) => (
                          <span key={idx} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded text-xs font-medium">
                            {right}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-500 text-sm">غير مذكور صراحة</span>
                    )}
                  </div>
                </div>

                {result.key_red_flags && result.key_red_flags.length > 0 && (
                  <div className="bg-rose-50 rounded-2xl border border-rose-200 p-6">
                    <h3 className="text-sm font-semibold text-rose-800 mb-4 flex items-center gap-2">
                      <div className="p-1.5 bg-rose-100 rounded-md"><AlertTriangle className="w-4 h-4 text-rose-600" /></div>
                      مخاوف رئيسية (علامات حمراء)
                    </h3>
                    <ul className="space-y-3">
                      {result.key_red_flags.map((flag, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                          <span className="text-rose-900 font-medium text-sm leading-relaxed">{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1">
                  <h3 className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-2">
                    <div className="p-1.5 bg-slate-100 rounded-md"><FileText className="w-4 h-4" /></div>
                    أهم البيانات التي يتم جمعها
                  </h3>
                  {result.collected_data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.collected_data.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 transition-colors hover:bg-slate-100 hover:border-slate-200">
                          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                          <span className="text-slate-700 font-medium text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm italic">لم يتم العثور على بيانات واضحة.</p>
                  )}
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200"
              >
                <div className="w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 text-slate-300">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">في انتظار النص القانوني</h3>
                <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                  السياسات الطويلة والمعقدة تخفي تفاصيل هامة. دع الذكاء الاصطناعي يقرأها لك ويستخرج المخاطر.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            Designed by: <a href="https://mahmoud-roshdy.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">Mahmoud Roshdy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

