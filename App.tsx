
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  PieChart, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  CreditCard, 
  Star,
  Smartphone,
  Layout,
  Clock,
  Menu,
  X,
  Copy,
  Check,
  ExternalLink,
  Bot,
  Mic,
  Eye,
  TrendingUp,
  Wallet,
  Lock,
  Cpu,
  Camera,
  Layers,
  Search,
  ZapOff,
  Server,
  Globe,
  Users,
  Printer,
  FileText,
  History,
  Bell,
  Scan
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants ---
const DOWNLOAD_LINK = "https://loquacious-mochi-a0791c.netlify.app/";
const SUBSCRIPTION_AMOUNT = 1; 
const UPI_ID = "6361380854@ybl";
const PAYEE_NAME = "RG BILL NEXON";
const UPI_INTENT_URL = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${SUBSCRIPTION_AMOUNT}&cu=INR`;
const QR_CODE_API_URL = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(UPI_INTENT_URL)}&bgcolor=1e293b&color=818cf8`;

// --- Data for Detail Modals ---
const FEATURE_DETAILS: Record<string, {
  title: string;
  subtitle: string;
  icon: any;
  sections: { title: string; items: string[] }[];
  accent: string;
}> = {
  visual_ai: {
    title: "Visual AI Scanner",
    subtitle: "Gemini 2.5 Flash Powered Recognition",
    icon: Eye,
    accent: "indigo",
    sections: [
      { title: "How it Works", items: ["Employee clicks 'Visual AI' (F4)", "High-def camera captures multiple items", "Sends image to Gemini 2.5 Flash with Inventory Context", "AI identifies brands, sizes, and flavors instantly", "Items added to bill without scanning barcodes"] },
      { title: "Key Capabilities", items: ["Multi-item identification in one photo", "Works with damaged or missing barcodes", "Contextual Intelligence (reads labels)", "Fuzzy matching to inventory SKUs"] },
      { title: "Business Value", items: ["3x faster billing for large carts", "Eliminates 'wrong item' billing errors", "Reduces employee training time", "Massive 'High-Tech' brand image boost"] }
    ]
  },
  erp_arch: {
    title: "Hybrid ERP Architecture",
    subtitle: "Single PC & Cloud Sync Capability",
    icon: Server,
    accent: "blue",
    sections: [
      { title: "Dual-Mode Operation", items: ["Offline Mode: Zero internet dependency for billing", "Cloud Mode: Real-time sync for multi-branch sync", "Firebase integration for secure data storage"] },
      { title: "Network Monitoring", items: ["Admin dashboard for live terminal status", "Employee login/logout tracking", "Remote terminal kill-switch for security"] },
      { title: "License Management", items: ["7-day built-in trial system", "Expiry-based lock for payment compliance", "Automatic version update notifications"] }
    ]
  },
  voice_pos: {
    title: "Voice-Activated POS",
    subtitle: "Hands-Free Billing Intelligence",
    icon: Mic,
    accent: "purple",
    sections: [
      { title: "Voice Commands", items: ["'Add 2kg Sugar and 1L Oil'", "'Apply 10% discount on total'", "'Finalize bill and print'"] },
      { title: "Natural Language", items: ["Supports regional accents and mixed language", "Context-aware corrections", "Instant speech-to-SKU mapping"] }
    ]
  },
  admin_command: {
    title: "Admin Command Center",
    subtitle: "AI Data Analytics & ProBot Assistant",
    icon: TrendingUp,
    accent: "emerald",
    sections: [
      { title: "ProBot AI", items: ["'Who is my most hardworking employee?'", "'Predict stock run-out dates'", "'Analyze revenue trends vs last month'"] },
      { title: "Price Variator", items: ["Google Search integration for market trends", "Automatic surge detection (e.g. Onion price spikes)", "Suggests margin-protection price updates"] },
      { title: "Inventory IQ", items: ["'Hotness' scores for product velocity", "Automated low-stock push notifications", "Audit logs for every stock adjustment"] }
    ]
  },
  loyalty_logic: {
    title: "Premium Loyalty Logic",
    subtitle: "Secret Surcharge & Gold Membership",
    icon: Wallet,
    accent: "yellow",
    sections: [
      { title: "The Secret Booster", items: ["Silently adds 5% surcharge to 'Premium' tiers", "No visible line-item on receipt to customer", "Owner retains full margin profit"] },
      { title: "Digital Wallet", items: ["Surcharge credits back as 'Points' in wallet", "Customers feel rewarded (Psychological Loyalty)", "Zero net loss for the shop owner"] },
      { title: "Security", items: ["6-digit SMS OTP required for redemption", "Prevents employee fraud or point theft", "Full transaction history for point usage"] }
    ]
  },
  security_face: {
    title: "Security & Monitoring",
    subtitle: "Face ID & Visitor Audit Logs",
    icon: Lock,
    accent: "red",
    sections: [
      { title: "Face Recognition", items: ["Live monitor identifies frequent shoppers", "Greets customers by name at entrance", "Admin alerts for banned/suspicious visitors"] },
      { title: "Audit Trail", items: ["Photos captured for lines > 2 mins", "Every stock edit requires Admin override", "Encrypted database backups in one click"] }
    ]
  }
};

// --- Helper Components ---

const DetailModal = ({ featureKey, onClose }: { featureKey: string, onClose: () => void }) => {
  const data = FEATURE_DETAILS[featureKey];
  if (!data) return null;
  const Icon = data.icon;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[85vh] glass-card rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-y-auto border border-white/20 custom-scrollbar"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-all"><X className="w-8 h-8" /></button>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start md:items-center">
          <div className={`w-20 h-20 rounded-3xl bg-${data.accent}-500/20 flex items-center justify-center shrink-0`}>
            <Icon className={`w-10 h-10 text-${data.accent}-400`} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-white">{data.title}</h2>
            <p className="text-slate-400 text-lg">{data.subtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {data.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className={`text-sm font-bold uppercase tracking-widest text-${data.accent}-400`}>{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-slate-300 text-sm leading-relaxed">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 text-${data.accent}-500`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">RG BILL NEXON - Enterprise Feature</p>
          <button onClick={onClose} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-all">Close Details</button>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">RG BILL <span className="text-indigo-400">NEXON</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">AI POS</button>
          <button onClick={() => scrollToSection('premium')} className="hover:text-white transition-colors">ERP & Admin</button>
          <button onClick={() => scrollToSection('loyalty')} className="hover:text-white transition-colors">Loyalty</button>
          <button onClick={() => scrollToSection('pricing')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all shadow-lg shadow-indigo-500/20">Get Started</button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden glass-card mt-2 mx-6 rounded-2xl overflow-hidden">
            <div className="flex flex-col p-6 gap-4">
              <button onClick={() => scrollToSection('features')} className="text-left text-slate-300 py-2 border-b border-slate-700">AI Features</button>
              <button onClick={() => scrollToSection('premium')} className="text-left text-slate-300 py-2 border-b border-slate-700">ERP & Admin</button>
              <button onClick={() => scrollToSection('pricing')} className="w-full py-3 bg-indigo-600 text-white rounded-xl">Get License</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, detailKey, onOpen }: { icon: any, title: string, description: string, detailKey?: string, onOpen?: (key: string) => void }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    onClick={() => detailKey && onOpen && onOpen(detailKey)}
    className={`p-8 rounded-3xl glass-card transition-all group ${detailKey ? 'cursor-pointer hover:border-indigo-500/50' : ''}`}
  >
    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600/20 transition-colors">
      <Icon className="text-indigo-400 w-7 h-7 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
      {title}
      {detailKey && <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />}
    </h3>
    <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">{description}</p>
    {detailKey && <span className="text-[10px] text-indigo-400 mt-6 block font-bold tracking-widest uppercase opacity-60 group-hover:opacity-100">Click for Deep Intel</span>}
  </motion.div>
);

const PaymentModal = ({ isOpen, onClose, onPaymentTriggered }: { isOpen: boolean, onClose: () => void, onPaymentTriggered: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'manual'>('qr');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-md glass-card rounded-[2.5rem] p-8 shadow-2xl border border-white/20"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-8">
            <h2 className="text-xl font-bold text-white">License Activation</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>
          </div>
          
          <div className="w-full bg-slate-800/50 rounded-2xl p-5 border border-white/5 flex flex-col items-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1 font-black">Unlimited Enterprise Access</span>
            <span className="text-4xl font-black text-white">₹{SUBSCRIPTION_AMOUNT}</span>
          </div>

          <div className="flex bg-slate-800/50 p-1 rounded-xl w-full mb-8">
            <button onClick={() => setActiveTab('qr')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'qr' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Scan UPI QR</button>
            <button onClick={() => setActiveTab('manual')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'manual' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Copy UPI ID</button>
          </div>
          
          <div className="w-full text-center">
            {activeTab === 'qr' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
                <div className="p-4 bg-white rounded-[2rem] shadow-xl"><img src={QR_CODE_API_URL} alt="QR" className="w-48 h-48" /></div>
                <p className="text-slate-400 text-xs px-8">Activation is instant. Download installer immediately after payment.</p>
              </motion.div>
            ) : (
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-white/5">
                <span className="text-[10px] uppercase text-slate-500 block mb-2">Merchant UPI</span>
                <p className="font-mono font-bold text-indigo-300 text-lg mb-4">{UPI_ID}</p>
                <button 
                  onClick={() => { navigator.clipboard.writeText(UPI_ID); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="w-full py-3 bg-indigo-500/10 text-indigo-400 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy Address'}
                </button>
              </div>
            )}
          </div>

          <button onClick={() => { onPaymentTriggered(); window.location.href = UPI_INTENT_URL; }} className="w-full mt-8 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/30">
            Pay & Unlock Software
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isPaid, setIsPaid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDetailKey, setActiveDetailKey] = useState<string | null>(null);

  const handleOpenDetail = (key: string) => setActiveDetailKey(key);
  const handleDownload = () => window.open(DOWNLOAD_LINK, '_blank');

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/30 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-indigo-500/30 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-widest">
              <Bot className="w-4 h-4" /> Powered by Gemini 2.5 Flash AI
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8">
              Future of <span className="gradient-text">Retail</span>
              <br />Intelligence.
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              RG BILL NEXON is an AI-powered command center. From visual scanning to secret loyalty boosters—it’s the only ERP you’ll ever need.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {!isPaid ? (
                <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-indigo-500/40 flex items-center justify-center gap-3">
                  Activate Lifetime — ₹{SUBSCRIPTION_AMOUNT}
                  <ArrowRight className="w-6 h-6" />
                </button>
              ) : (
                <button onClick={handleDownload} className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-emerald-500/40 flex items-center justify-center gap-3 animate-pulse">
                  <Download className="w-6 h-6" /> Get Installer Now
                </button>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
             <div className="relative glass-card rounded-[3rem] p-6 border-white/10 shadow-3xl bg-slate-900/50 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200" alt="ERP" className="rounded-[2.5rem] w-full shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
               <div className="absolute top-12 left-12 flex gap-4">
                 <div className="glass-card px-4 py-2 rounded-xl border-indigo-500/30 flex items-center gap-2 backdrop-blur-3xl">
                   <Zap className="text-indigo-400 w-4 h-4" />
                   <span className="text-[10px] font-bold text-white uppercase">Cloud Sync Active</span>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* AI POS SECTION */}
      <section id="features" className="py-32 px-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">Futuristic POS Page</h2>
              <p className="text-slate-400 text-lg">Ditch the legacy scanners. Use visual intelligence and voice commands to bill items 3x faster.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Eye} title="Visual AI Scanner" description="Bill groups of items from a single photo. Gemini handles the recognition instantly." detailKey="visual_ai" onOpen={handleOpenDetail} />
            <FeatureCard icon={Mic} title="Voice Commands" description="Hands-free POS control. Just tell the computer what to add, discount, or print." detailKey="voice_pos" onOpen={handleOpenDetail} />
            <FeatureCard icon={TrendingUp} title="AI Upselling" description="Real-time cart analysis. Suggest matching products to increase bill value." />
          </div>
        </div>
      </section>

      {/* ERP & ADMIN SECTION */}
      <section id="premium" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" className="rounded-[3rem] shadow-2xl border border-white/10" alt="Admin" />
              <div className="absolute -bottom-10 -right-10 glass-card p-10 rounded-[2.5rem] border-indigo-500/30 shadow-3xl hidden md:block">
                <Bot className="text-indigo-400 w-12 h-12 mb-4" />
                <p className="text-white font-black text-xl">ProBot Active</p>
                <p className="text-slate-500 text-sm">Waiting for prompt...</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">Admin<br /><span className="text-indigo-400">Command Center</span></h2>
              <div className="grid gap-8">
                <div onClick={() => handleOpenDetail('erp_arch')} className="p-8 glass-card rounded-3xl cursor-pointer hover:bg-white/5 transition-colors group">
                  <div className="flex gap-6 items-center">
                    <Server className="w-10 h-10 text-blue-400" />
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Hybrid ERP Architecture</h4>
                      <p className="text-slate-400 text-sm mt-1">Single PC speed with Cloud branch synchronization.</p>
                    </div>
                  </div>
                </div>
                <div onClick={() => handleOpenDetail('admin_command')} className="p-8 glass-card rounded-3xl cursor-pointer hover:bg-white/5 transition-colors group">
                  <div className="flex gap-6 items-center">
                    <TrendingUp className="w-10 h-10 text-emerald-400" />
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">Price Variator & Insights</h4>
                      <p className="text-slate-400 text-sm mt-1">AI-driven market monitoring and margin protection.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOYALTY & SECURITY SECTION */}
      <section id="loyalty" className="py-32 px-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">Loyalty & Security</h2>
            <p className="text-slate-400">Turn regular customers into VIPs with zero loss logic.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard icon={Wallet} title="Secret Loyalty Logic" description="Self-funding 5% surcharge system for Premium tiers." detailKey="loyalty_logic" onOpen={handleOpenDetail} />
            <FeatureCard icon={Lock} title="OTP Security" description="Wallet redemption requires SMS OTP verification to stop fraud." />
            <FeatureCard icon={Eye} title="Face-ID Live Monitor" description="Recognize customers instantly as they enter your shop." detailKey="security_face" onOpen={handleOpenDetail} />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative glass-card p-12 md:p-20 rounded-[4rem] border-white/10 text-center shadow-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600" />
            <div className="mb-10 inline-block px-6 py-2 bg-indigo-500/20 text-indigo-400 text-sm font-black rounded-full tracking-[0.3em]">BLUE ENTERPRISE</div>
            <div className="mb-12">
              <span className="text-8xl font-black text-white">₹{SUBSCRIPTION_AMOUNT}</span>
              <p className="text-slate-500 text-xl font-bold mt-2">One-Time Lifetime Activation</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 text-left mb-16 max-w-xl mx-auto">
              <div className="flex items-center gap-3 text-slate-300 font-bold"><CheckCircle2 className="text-emerald-400 w-5 h-5" /> Gemini AI License</div>
              <div className="flex items-center gap-3 text-slate-300 font-bold"><CheckCircle2 className="text-emerald-400 w-5 h-5" /> Cloud Sync Enabled</div>
              <div className="flex items-center gap-3 text-slate-300 font-bold"><CheckCircle2 className="text-emerald-400 w-5 h-5" /> VIP Support 24/7</div>
              <div className="flex items-center gap-3 text-slate-300 font-bold"><CheckCircle2 className="text-emerald-400 w-5 h-5" /> No Monthly Fees</div>
            </div>

            {!isPaid ? (
              <button onClick={() => setIsModalOpen(true)} className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-black text-2xl shadow-2xl shadow-indigo-500/40 transition-all">
                Activate Professional License
              </button>
            ) : (
              <button onClick={handleDownload} className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-black text-2xl shadow-2xl shadow-emerald-500/40 animate-pulse">
                <Download className="w-8 h-8 inline mr-3" /> Download Installer
              </button>
            )}
            <p className="mt-8 text-xs text-slate-500 uppercase font-black tracking-widest">Digital License Certificate Included</p>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-white/5 bg-slate-900/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <Cpu className="text-indigo-500 w-10 h-10" />
            <span className="text-2xl font-black text-white tracking-tighter">RG BILL NEXON</span>
          </div>
          <p className="text-slate-500 text-sm max-w-sm text-center md:text-right">Empowering Bharat's Retailers with world-class AI ERP. Stop theft, increase margin, look futuristic.</p>
        </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onPaymentTriggered={() => setIsPaid(true)} />}
        {activeDetailKey && <DetailModal featureKey={activeDetailKey} onClose={() => setActiveDetailKey(null)} />}
      </AnimatePresence>
    </div>
  );
}
