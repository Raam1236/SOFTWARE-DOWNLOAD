
import React, { useState, useEffect } from 'react';
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
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants ---
const DOWNLOAD_LINK = "https://loquacious-mochi-a0791c.netlify.app/";
const SUBSCRIPTION_AMOUNT = 1; 
const UPI_ID = "6361380854@ybl";
const PAYEE_NAME = "UltraBill Pro";

// Generic UPI Intent URL
const UPI_INTENT_URL = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${SUBSCRIPTION_AMOUNT}&cu=INR`;

// QR Code URL
const QR_CODE_API_URL = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(UPI_INTENT_URL)}&bgcolor=1e293b&color=818cf8`;

// --- Helper Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-white transition-colors">Pricing</a>
          <button 
            onClick={(e) => scrollToSection(e as any, 'pricing')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all shadow-lg shadow-indigo-500/20"
          >
            Get Started
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card overflow-hidden mt-2 mx-6 rounded-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              <a href="#features" className="text-slate-300 py-2 border-b border-slate-700" onClick={(e) => scrollToSection(e, 'features')}>Features</a>
              <a href="#pricing" className="text-slate-300 py-2 border-b border-slate-700" onClick={(e) => scrollToSection(e, 'pricing')}>Pricing</a>
              <button 
                onClick={(e) => scrollToSection(e as any, 'pricing')}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl glass-card transition-all"
  >
    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6">
      <Icon className="text-indigo-400 w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const PaymentModal = ({ isOpen, onClose, onPaymentTriggered }: { isOpen: boolean, onClose: () => void, onPaymentTriggered: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'manual'>('qr');

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayAction = () => {
    onPaymentTriggered();
    window.location.href = UPI_INTENT_URL;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-md glass-card rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-hidden border border-white/20"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 to-purple-600" />
        
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-6">
            <h2 className="text-xl font-bold text-white">Unlock Full Version</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>
          </div>
          
          <div className="w-full bg-slate-800/50 rounded-2xl p-4 border border-white/5 flex flex-col items-center mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1 font-black">Lifetime License</span>
            <span className="text-3xl font-black text-white">₹{SUBSCRIPTION_AMOUNT.toLocaleString()}</span>
          </div>

          <div className="flex bg-slate-800/50 p-1 rounded-xl w-full mb-6">
            <button 
              onClick={() => setActiveTab('qr')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'qr' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Scan QR
            </button>
            <button 
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'manual' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              UPI ID
            </button>
          </div>
          
          <div className="w-full min-h-[260px]">
            {activeTab === 'qr' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
                <div className="p-4 bg-white rounded-3xl shadow-xl">
                  <img src={QR_CODE_API_URL} alt="UPI QR" className="w-44 h-44" />
                </div>
                <p className="text-slate-400 text-xs text-center px-4 leading-relaxed">
                  Initiating payment grants instant <span className="text-emerald-400 font-bold">download access</span>.
                </p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-indigo-500/20 relative">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 block font-bold">Copy UPI ID</span>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-mono font-bold text-indigo-300 truncate">{UPI_ID}</span>
                    <button onClick={handleCopy} className="p-2 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl transition-colors text-indigo-400">
                      {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="w-full pt-6 mt-6 border-t border-white/5">
            <button 
              onClick={handlePayAction}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
            >
              Pay & Download
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isPaid, setIsPaid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    window.open(DOWNLOAD_LINK, '_blank');
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600 blur-[120px] rounded-full" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-600 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-indigo-500/30 text-indigo-400 text-sm font-semibold mb-8">
              <Star className="w-4 h-4 fill-indigo-400" />
              <span>India's Most Trusted Billing Solution</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
              Empower Your <span className="gradient-text">Business Reach</span> Effortlessly.
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
              Professional invoicing, stock management, and GST reporting. Everything you need to scale your business is right here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {!isPaid ? (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3"
                >
                  Buy Now — ₹{SUBSCRIPTION_AMOUNT.toLocaleString()}
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={handleDownload}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 animate-pulse"
                >
                  <Download className="w-6 h-6" />
                  Download Software
                </button>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
            <div className="absolute -inset-4 bg-indigo-500/20 blur-[80px] rounded-full" />
            <div className="relative glass-card rounded-3xl p-4 border-white/20 shadow-2xl transform transition-transform group-hover:scale-[1.02] duration-500">
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Data Analytics Dashboard" className="rounded-2xl w-full h-auto aspect-video object-cover" />
               <div className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl border-indigo-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="text-emerald-400 w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white">GST Secure</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={PieChart} title="Dynamic Analytics" description="Get insights into your sales, revenue, and trends in real-time." />
            <FeatureCard icon={Smartphone} title="Multi-Device" description="Manage your store from your desktop or on the go with our companion app." />
            <FeatureCard icon={ShieldCheck} title="Data Privacy" description="Your business data stays yours. 256-bit encryption for every record." />
            <FeatureCard icon={Layout} title="Easy Invoicing" description="Create GST-compliant invoices in under 10 seconds." />
            <FeatureCard icon={Clock} title="Auto-Backups" description="Never lose a bill. Automatic cloud backups every hour." />
            <FeatureCard icon={CheckCircle2} title="One-Click Filing" description="Generate GSTR reports ready for portal upload instantly." />
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=2000" alt="Retail Store Management" className="w-full h-[400px] object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-transparent to-transparent flex items-center px-12 md:px-24">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Built for Bharat's Businesses</h2>
              <p className="text-slate-300">From small retailers to large wholesalers, we handle all your complexity with simplicity.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6 relative">
        <div className="max-w-xl mx-auto relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-25" />
             <div className="relative glass-card p-12 rounded-[2.5rem] border-white/20 text-center">
                <div className="mb-8">
                  <span className="text-6xl font-black text-white">₹{SUBSCRIPTION_AMOUNT.toLocaleString()}</span>
                  <span className="text-slate-500 text-lg">/lifetime</span>
                </div>
                
                <ul className="text-left space-y-4 mb-10 text-slate-300">
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Desktop & Android Sync</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Unlimited Products & Users</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Priority WhatsApp Support</li>
                </ul>

                {!isPaid ? (
                  <button onClick={() => setIsModalOpen(true)} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl shadow-xl">
                    Get Lifetime License
                  </button>
                ) : (
                  <button onClick={handleDownload} className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center gap-3 animate-pulse">
                    <Download className="w-6 h-6" /> Download Unlocked
                  </button>
                )}
             </div>
          </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="text-indigo-500 w-6 h-6" />
        </div>
        <p className="text-slate-500 text-sm">© 2024 UltraBill Solutions. Trusted by 5,000+ businesses.</p>
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <PaymentModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onPaymentTriggered={() => setIsPaid(true)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
