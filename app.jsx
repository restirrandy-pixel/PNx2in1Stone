import React, { useState } from 'react';
import { 
  ShoppingBag, Search, ShieldCheck, Heart, Trash2, Plus, Edit3, 
  Settings, CheckCircle, ChevronRight, Menu, X, Star, Truck, 
  ArrowLeft, CreditCard, RefreshCw, Layout, Package, 
  ShoppingCart, DollarSign, Sliders, Eye, AlertCircle, Sparkles, 
  Image as ImageIcon, Globe, Download, Copy, ExternalLink, 
  HelpCircle, FileCode, Check, User, UserCheck, ShieldAlert, LogIn, 
  LogOut, UserPlus, Tag, Percent, Wallet, ArrowUpRight, 
  ArrowDownLeft, Clock, FileText, Upload, CheckCircle2, XCircle, Users 
} from 'lucide-react';

const INITIAL_SHOP_CONFIG = {
  storeName: "NIAOKAI เพ็ทสโตร์",
  logoSubtitle: "อาหารและอุปกรณ์แมวเกรดพรีเมียม",
  announcementText: "🎉 ฉลองเปิดร้านใหม่! ใช้โค้ดส่วนลด 'CATLOVE15' ลด 15% + จัดส่งฟรีทั่วไทยเมื่อช้อปครบ 899 บาท 🐾",
  bannerTitle: "โภชนาการเกรดพรีเมียม เพื่อสุขภาพแมวที่คุณรัก",
  bannerSubtitle: "คัดสรรวัตถุดิบคุณภาพสูง นำเข้าจากแหล่งมาตรฐานสากล อุดมด้วยโปรตีนสูง กลิ่นหอมไร้สารกันบูด",
  kbankAccount: "211-3-19552-8",
  accountName: "ธนโชติ",
  truemoneyFee: 2.90
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "อาหารแมวเกรดโฮลิสติก สูตรปลาแซลมอนและมันหวาน (1.5kg)",
    category: "อาหารแมว",
    price: 490,
    vipPrice: 416.5,
    originalPrice: 590,
    stock: 45,
    rating: 4.9,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600",
    badge: "ขายดีอันดับ 1",
    description: "บำรุงขนสวยเงางาม ลดปัญหาขนร่วง อุดมด้วย Omega-3 และ 6 จากปลาแซลมอนแท้"
  },
  {
    id: 2,
    name: "ทรายแมวภูเขาไฟไร้ฝุ่น 99.9% กลิ่นลาเวนเดอร์ (10L)",
    category: "ทรายแมว",
    price: 290,
    vipPrice: 246.5,
    originalPrice: 350,
    stock: 80,
    rating: 4.8,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?auto=format&fit=crop&q=80&w=600",
    badge: "ไร้ฝุ่น 100%",
    description: "จับตัวเป็นก้อนไวภายใน 3 วินาที ตักง่าย เก็บกลิ่นดีเยี่ยม"
  }
];

export default function App() {
  const [shopConfig, setShopConfig] = useState(INITIAL_SHOP_CONFIG);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  
  // ฐานข้อมูลผู้ใช้ในระบบ
  const [usersList, setUsersList] = useState([
    { id: 1, name: "สมชาย รักสัตว์", username: "somchai", role: "vip", walletBalance: 1200 },
    { id: 2, name: "สายใจ ทาสแมว", username: "saijai", role: "member", walletBalance: 150 }
  ]);

  const [user, setUser] = useState(null); 
  const [activeTab, setActiveTab] = useState("storefront");
  
  // Auth Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");

  // Wallet Topup States
  const [topupAmount, setTopupAmount] = useState("");
  const [slipImage, setSlipImage] = useState(null);
  const [slipFileName, setSlipFileName] = useState("");
  const [topupHistory, setTopupHistory] = useState([]);

  // ระบบตรวจเช็กล็อกอิน
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!authUsername || !authPassword) return alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");

    // เช็กสิทธิ์ Admin เจ้าของร้าน (ต้องตรงทั้ง Username และ Password)
    if (authUsername === "Jelenakub" && authPassword === "Jelenakub") {
      const adminUser = {
        id: 999,
        name: "เจ้าของร้าน (Super Admin)",
        username: "Jelenakub",
        role: "admin",
        walletBalance: 99999
      };
      setUser(adminUser);
      setIsAuthModalOpen(false);
      setAuthUsername("");
      setAuthPassword("");
      alert("ยินดีต้อนรับท่านเจ้าของร้าน (Super Admin) เข้าสู่ระบบ!");
      return;
    } 
    
    // ป้องกันคนอื่นใช้ชื่อ Jelenakub แต่รหัสผิด
    if (authUsername === "Jelenakub" && authPassword !== "Jelenakub") {
      alert("รหัสผ่านเจ้าของร้านไม่ถูกต้อง!");
      return;
    }

    // ล็อกอินสมาชิกทั่วไป
    const found = usersList.find(u => u.username.toLowerCase() === authUsername.toLowerCase());
    if (found) {
      setUser(found);
      setIsAuthModalOpen(false);
      setAuthUsername("");
      setAuthPassword("");
      alert(`ยินดีต้อนรับคุณ ${found.name} เข้าสู่ระบบ`);
    } else {
      alert("ไม่พบชื่อผู้ใช้นี้ในระบบ กรุณาตรวจสอบอีกครั้งหรือกดสมัครสมาชิก");
    }
  };

  // สมัครสมาชิกใหม่ (ได้สิทธิ์ member ทั่วไปเสมอ)
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!authName || !authUsername || !authPassword) return alert("กรุณากรอกข้อมูลให้ครบถ้วน");

    if (authUsername.toLowerCase() === "jelenakub") {
      alert("ไม่สามารถใช้ชื่อผู้ใช้นี้ได้");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: authName,
      username: authUsername,
      role: "member", // สมาชิกใหม่เป็น Member ทั่วไป (แอดมินปรับ VIP ให้ทีหลัง)
      walletBalance: 0
    };

    setUsersList([...usersList, newUser]);
    setUser(newUser);
    setIsAuthModalOpen(false);
    setAuthName("");
    setAuthUsername("");
    setAuthPassword("");
    alert("สมัครสมาชิกสำเร็จ! บัญชีของคุณพร้อมใช้งานแล้ว");
  };

  // สลับสิทธิ์ VIP โดยแอดมิน
  const toggleUserRole = (userId) => {
    const updated = usersList.map(u => {
      if (u.id === userId) {
        return { ...u, role: u.role === 'vip' ? 'member' : 'vip' };
      }
      return u;
    });
    setUsersList(updated);
  };

  // แนบสลิปเติมเงินอัตโนมัติ
  const handleSlipChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlipFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setSlipImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAutoTopup = (e) => {
    e.preventDefault();
    const amount = parseFloat(topupAmount);
    if (!user) return alert("กรุณาเข้าสู่ระบบก่อนเติมเงิน"), setIsAuthModalOpen(true);
    if (!amount || amount <= 0) return alert("กรุณากรอกจำนวนเงินให้ถูกต้อง");
    if (!slipImage) return alert("กรุณาแนบสลิปโอนเงิน");

    const updatedBalance = user.walletBalance + amount;
    setUser({ ...user, walletBalance: updatedBalance });

    const newTxn = {
      id: `TXN-${Date.now()}`,
      amount,
      date: new Date().toLocaleString('th-TH'),
      status: "สำเร็จ (อัตโนมัติ)"
    };
    setTopupHistory([newTxn, ...topupHistory]);
    setTopupAmount("");
    setSlipImage(null);
    setSlipFileName("");
    alert(`เติมเงินสำเร็จ ฿${amount.toLocaleString()} เข้ากระเป๋าเรียบร้อยแล้ว!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <div className="bg-orange-500 text-white text-xs md:text-sm py-2 px-4 text-center font-medium">
        <span>{shopConfig.announcementText}</span>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("storefront")}>
            <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {shopConfig.storeName}
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                {shopConfig.logoSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveTab("wallet")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="text-xs font-bold">฿{user.walletBalance.toLocaleString()}</span>
                </button>

                {/* ปุ่มแอดมินแสดงเฉพาะบัญชี Jelenakub */}
                {user.role === 'admin' && (
                  <button 
                    onClick={() => setActiveTab("admin")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                      activeTab === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    หลังบ้านแอดมิน
                  </button>
                )}

                <button onClick={() => { setUser(null); setActiveTab("storefront"); }} className="p-2 text-slate-400 hover:text-rose-600" title="ออกจากระบบ">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => { setAuthMode("login"); setIsAuthModalOpen(true); }} className="px-4 py-2 text-xs font-bold text-slate-700">เข้าสู่ระบบ</button>
                <button onClick={() => { setAuthMode("register"); setIsAuthModalOpen(true); }} className="px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold">สมัครสมาชิก</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* หน้าร้านค้า */}
        {activeTab === "storefront" && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-extrabold">{shopConfig.bannerTitle}</h2>
              <p className="text-orange-100 text-sm mt-2">{shopConfig.bannerSubtitle}</p>
              {user && (
                <div className="mt-4 inline-block bg-white/25 px-3 py-1 rounded-full text-xs font-bold">
                  สถานะของคุณ: {user.role === 'vip' ? '⭐ สมาชิก VIP (ลด 15%)' : user.role === 'admin' ? '👑 เจ้าของร้าน (Super Admin)' : '👤 สมาชิกทั่วไป'}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm p-5 space-y-3">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl" />
                  <h3 className="font-bold text-slate-800">{product.name}</h3>
                  <div className="flex items-baseline justify-between pt-2">
                    <div>
                      <span className="text-lg font-extrabold text-orange-600">
                        ฿{user?.role === 'vip' ? product.vipPrice : product.price}
                      </span>
                      {user?.role === 'vip' && <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">ราคา VIP</span>}
                    </div>
                    <button className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl">สั่งซื้อ</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* หน้ากระเป๋าตังค์และเติมเงิน */}
        {activeTab === "wallet" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-xl flex justify-between items-center">
              <div>
                <p className="text-xs text-emerald-100">ยอดเงินคงเหลือ</p>
                <h2 className="text-4xl font-extrabold mt-1">฿{user?.walletBalance.toLocaleString()}</h2>
                <p className="text-xs text-emerald-200 mt-2">ผู้ใช้งาน: {user?.name}</p>
              </div>
              <Wallet className="w-16 h-16 text-white/20" />
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" /> เติมเงินเข้ากระเป๋า (อัตโนมัติ)
              </h3>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1 text-sm">
                <p className="text-xs font-bold text-slate-500">โอนผ่านบัญชีตรง</p>
                <div className="font-bold text-slate-700">ธนาคารกสิกรไทย (KBank)</div>
                <div className="text-base font-extrabold text-emerald-600">{shopConfig.kbankAccount}</div>
                <div className="text-xs text-slate-600">ชื่อบัญชี: <span className="font-bold">{shopConfig.accountName}</span></div>
              </div>

              <form onSubmit={handleAutoTopup} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">จำนวนเงิน (บาท)</label>
                  <input type="number" required placeholder="เช่น 300" value={topupAmount} onChange={(e) => setTopupAmount(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">แนบสลิปโอนเงิน</label>
                  <input type="file" accept="image/*" required onChange={handleSlipChange} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-emerald-50 file:text-emerald-700 cursor-pointer" />
                </div>
                {slipImage && <img src={slipImage} alt="Slip" className="w-28 h-36 object-cover rounded-xl border" />}
                <button type="submit" className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm">ยืนยันเติมเงิน</button>
              </form>
            </div>
          </div>
        )}

        {/* หน้าหลังบ้านเฉพาะเจ้าของร้าน (Jelenakub) */}
        {activeTab === "admin" && user?.role === 'admin' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-3xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">แผงควบคุมหลัก (Super Admin)</h2>
                <p className="text-xs text-slate-400 mt-1">ยินดีต้อนรับคุณ Jelenakub - จัดการสิทธิ์ VIP และควบคุมระบบ</p>
              </div>
              <Users className="w-10 h-10 text-orange-500" />
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-800">รายชื่อสมาชิกในระบบ</h3>
              <div className="space-y-3">
                {usersList.map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{u.name}</h4>
                      <p className="text-xs text-slate-500">Username: {u.username}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${u.role === 'vip' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                        {u.role === 'vip' ? '⭐ VIP Member' : '👤 สมาชิกทั่วไป'}
                      </span>
                      <button 
                        onClick={() => toggleUserRole(u.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          u.role === 'vip' ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                      >
                        {u.role === 'vip' ? 'ถอดสิทธิ์ VIP' : 'ให้สิทธิ์ VIP'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">{authMode === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิกใหม่"}</h3>
            </div>
            {authMode === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อผู้ใช้ (Username)</label>
                  <input type="text" required placeholder="กรอกชื่อผู้ใช้" value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">รหัสผ่าน (Password)</label>
                  <input type="password" required placeholder="กรอกรหัสผ่าน" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <button type="submit" className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl text-sm">เข้าสู่ระบบ</button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อ-นามสกุล</label>
                  <input type="text" required placeholder="สมชาย รักสัตว์" value={authName} onChange={(e) => setAuthName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ตั้งชื่อผู้ใช้ (Username)</label>
                  <input type="text" required placeholder="somchai123" value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ตั้งรหัสผ่าน (Password)</label>
                  <input type="password" required placeholder="••••••••" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <button type="submit" className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl text-sm">สมัครสมาชิก</button>
              </form>
            )}

            <div className="mt-4 text-center text-xs text-slate-500 border-t border-slate-100 pt-3">
              {authMode === "login" ? (
                <p>ยังไม่มีบัญชี? <button onClick={() => setAuthMode("register")} className="font-bold text-orange-600 hover:underline">สมัครสมาชิก</button></p>
              ) : (
                <p>มีบัญชีแล้ว? <button onClick={() => setAuthMode("login")} className="font
        
