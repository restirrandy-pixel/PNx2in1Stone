```react
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Search, ShieldCheck, Heart, Trash2, Plus, Edit3, 
  Settings, CheckCircle, ChevronRight, Menu, X, Star, Truck, 
  ArrowLeft, CreditCard, RefreshCw, Layout, Package, ShoppingCart, 
  DollarSign, Sliders, Eye, AlertCircle, Sparkles, Image as ImageIcon,
  Globe, Download, Copy, ExternalLink, HelpCircle, FileCode, Check,
  User, UserCheck, ShieldAlert, LogIn, LogOut, UserPlus, Tag, Percent,
  Wallet, ArrowUpRight, ArrowDownLeft, Clock, FileText, Upload, CheckCircle2, XCircle
} from 'lucide-react';

// ตั้งค่าเริ่มต้นของร้านค้า (ภาษาไทยทั้งหมด)
const INITIAL_SHOP_CONFIG = {
  storeName: "NIAOKAI เพ็ทสโตร์",
  logoSubtitle: "อาหารและอุปกรณ์แมวเกรดพรีเมียม",
  announcementText: "🎉 ฉลองเปิดร้านใหม่! ใช้โค้ดส่วนลด 'CATLOVE15' ลด 15% + จัดส่งฟรีทั่วไทยเมื่อช้อปครบ 899 บาท 🐾",
  bannerTitle: "โภชนาการเกรดพรีเมียม เพื่อสุขภาพแมวที่คุณรัก",
  bannerSubtitle: "คัดสรรวัตถุดิบคุณภาพสูง นำเข้าจากแหล่งมาตรฐานสากล อุดมด้วยโปรตีนสูง อร่อย ปลอดภัย ไร้สารกันบูด",
  bannerImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200",
  bannerBadge: "สินค้าขายดีอันดับ 1 ประจำปี 2026"
};

// ข้อมูลผู้ใช้เริ่มต้นในระบบ
const INITIAL_USERS = [
  {
    id: "U-001",
    name: "คุณเจ้าของร้าน (Admin Owner)",
    email: "admin@niaokai.com",
    role: "ADMIN", // ADMIN | VIP | USER
    walletBalance: 5000,
    avatar: "👑"
  },
  {
    id: "U-002",
    name: "สมชาย รักสัตว์ (ลูกค้า VIP)",
    email: "somchai@gmail.com",
    role: "VIP",
    walletBalance: 1200,
    avatar: "🐱"
  },
  {
    id: "U-003",
    name: "สายใจ ทาสแมว (ลูกค้าทั่วไป)",
    email: "saijai@gmail.com",
    role: "USER",
    walletBalance: 150,
    avatar: "🐾"
  }
];

const INITIAL_PRODUCTS = [
  {
    id: "95",
    name: "NIAOKAI อาหารแมวพรีเมียมสูตรปลาแซลมอน & ไก่ฟรีซไดรฟ์ 1.5 kg",
    category: "อาหารแมว",
    price: 490,
    originalPrice: 650,
    stock: 45,
    rating: 4.9,
    reviewsCount: 128,
    isPopular: true,
    badge: "ขายดีอันดับ 1",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=600"
    ],
    variants: ["รสปลาแซลมอน (Salmon)", "รสไก่และเป็ด (Chicken & Duck)", "รสปลาทูและกุ้ง (Mackerel & Shrimp)"],
    sizes: ["1.5 kg", "3.0 kg (คุ้มกว่า)", "8.0 kg (กระสอบใหญ่)"],
    description: "อาหารแมวโภชนาการสมบูรณ์แบบ อุดมด้วยส่วนผสมเกรดพรีเมียม ปราศจากธัญพืช (Grain-Free) ลดโอกาสการแพ้ เสริมด้วยชิ้นเนื้อฟรีซไดรฟ์แท้ 100% บำรุงขนและผิวหนังด้วยโอเมก้า 3 และ 6",
    ingredients: "เนื้อปลาแซลมอนนอร์เวย์, เนื้อไก่ถอดกระดูก, ไก่ฟรีซไดรฟ์, น้ำมันปลาแซลมอน, ทอรีน, วิตามินอี, แร่ธาตุรวม, พรีไบโอติกส์",
    feedingGuide: "แมวหนัก 2-3 kg: 35-50g / วัน | แมวหนัก 3-5 kg: 50-70g / วัน | ควรมีน้ำสะอาดวางไว้ให้แมวตลอดเวลา"
  },
  {
    id: "96",
    name: "ขนมแมวเลีย Niaokai Creamy Treats รวมรสชาติโภชนาการ (แพ็ค 20 ซอง)",
    category: "ขนมแมว",
    price: 189,
    originalPrice: 250,
    stock: 80,
    rating: 4.8,
    reviewsCount: 94,
    isPopular: true,
    badge: "ฮิตในทาสแมว",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=600"
    ],
    variants: ["รสปลาทูน่า & หอยเชลล์", "รสไก่ & นมแพะ", "รสแซลมอน & ชาเขียว"],
    sizes: ["แพ็ค 20 ซอง", "แพ็ค 50 ซองสุดคุ้ม"],
    description: "ขนมแมวเลียเนื้อเนียนละเอียด ปราศจากสารกันบูดและเกลือปนเปื้อน เสริมทอรีนช่วยบำรุงสายตาและหัวใจ ทานง่าย เหมาะสำหรับรางวัลหรือผสมอาหารเม็ด",
    ingredients: "เนื้อทูน่า 85%, สกัดจากชาเขียว, ทอรีน, วิตามินซี, วิตามินอี",
    feedingGuide: "ให้เป็นขนมทานเล่นไม่เกิน 2-3 ซองต่อวัน ไม่ควรใช้แทนอาหารหลัก"
  },
  {
    id: "97",
    name: "ทรายแมวภูเขาไฟไร้ฝุ่น Niaokai Odor Control Clean 10L",
    category: "ทรายแมว",
    price: 260,
    originalPrice: 320,
    stock: 35,
    rating: 4.9,
    reviewsCount: 210,
    isPopular: false,
    badge: "เก็บกลิ่น 100%",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=600"
    ],
    variants: ["กลิ่นแป้งเด็ก (Baby Powder)", "กลิ่นกาแฟ (Coffee)", "กลิ่นธรรมชาติ (Unscented)"],
    sizes: ["10 Liters", "20 Liters Duo Pack"],
    description: "ทรายแมวโซเดียมเบนโทไนท์เกรดพรีเมียม จับตัวเป็นก้อนรวดเร็วภายใน 3 วินาที ไร้ฝุ่น 99.9% เหมาะสำหรับผู้แพ้ง่ายและระบบหายใจของแมว",
    ingredients: "Natural Sodium Bentonite Clay, Activated Carbon Spheres",
    feedingGuide: "เททรายแมวลงในกะบะทรายให้หนาประมาณ 7-10 ซม. ตักก้อนที่จับตัวออกตักทิ้งทุกวัน"
  },
  {
    id: "98",
    name: "ที่ฝนเล็บแมวทรงโซฟา Luxury Cat Scratcher Lounge",
    category: "อุปกรณ์เลี้ยงแมว",
    price: 390,
    originalPrice: 590,
    stock: 12,
    rating: 4.7,
    reviewsCount: 45,
    isPopular: false,
    badge: "ดีไซน์สวยงาม",
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=600"
    ],
    variants: ["สีไม้อบอุ่น (Warm Wood)", "สีมินิมอลเทา (Slate Grey)"],
    sizes: ["ขนาดกลาง Medium (45cm)", "ขนาดใหญ่ Large (60cm)"],
    description: "ที่ข่วนเล็บกระดาษลูกฟูกหนาแน่นพิเศษ แข็งแรง ทนทาน รองรับน้ำหนักแมวได้ถึง 10 กก. ผลิตจากวัสดุรีไซเคิลเป็นมิตรต่อสิ่งแวดล้อม",
    ingredients: "High-density Corrugated Cardboard, Non-toxic Corn Starch Glue",
    feedingGuide: "วางไว้ในบริเวณที่น้องแมวชอบพักผ่อน โรยผงแคตนิปเพื่อดึงดูดความสนใจ"
  }
];

const INITIAL_TOPUP_REQUESTS = [
  {
    id: "TOP-9001",
    userId: "U-002",
    userName: "สมชาย รักสัตว์ (ลูกค้า VIP)",
    amount: 500,
    slipImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400",
    status: "APPROVED", // PENDING | APPROVED | REJECTED
    date: "2026-11-09 10:30"
  },
  {
    id: "TOP-9002",
    userId: "U-003",
    userName: "สายใจ ทาสแมว (ลูกค้าทั่วไป)",
    amount: 300,
    slipImage: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=400",
    status: "PENDING",
    date: "2026-11-09 11:15"
  }
];

const CATEGORIES = ["ทั้งหมด", "อาหารแมว", "ขนมแมว", "อุปกรณ์เลี้ยงแมว", "ทรายแมว"];

export default function App() {
  const [shopConfig, setShopConfig] = useState(INITIAL_SHOP_CONFIG);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [topupRequests, setTopupRequests] = useState(INITIAL_TOPUP_REQUESTS);
  
  // ผู้ใช้ปัจจุบันที่ล็อกอิน (เริ่มต้นให้เป็น Admin Owner)
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);
  
  const [activeTab, setActiveTab] = useState("storefront"); // storefront | admin | deploy
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);

  const [orders, setOrders] = useState([
    {
      id: "ORD-2026-901",
      customer: "สมชาย ใจดี",
      total: 679,
      status: "จัดส่งแล้ว",
      date: "2026-11-08",
      items: ["NIAOKAI อาหารแมวพรีเมียม x 1", "ขนมแมวเลีย x 1"]
    }
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  // Variant & Quantity State for Detail View
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // คำนวณส่วนลดตามบทบาท (VIP ได้รับส่วนลด 15%)
  const isVip = currentUser?.role === "VIP";
  const calculateEffectivePrice = (originalPrice) => {
    if (isVip) {
      return Math.round(originalPrice * 0.85); // ส่วนลด 15%
    }
    return originalPrice;
  };

  const currentProduct = products.find(p => p.id === selectedProductId);

  useEffect(() => {
    if (currentProduct) {
      if (currentProduct.variants && currentProduct.variants.length > 0) {
        setSelectedVariant(currentProduct.variants[0]);
      }
      if (currentProduct.sizes && currentProduct.sizes.length > 0) {
        setSelectedSize(currentProduct.sizes[0]);
      }
      setQuantity(1);
    }
  }, [selectedProductId]);

  // ฟังก์ชั่นตัดยอดเงิน Wallet เมื่อซื้อสินค้า
  const deductUserWallet = (amount) => {
    if (!currentUser) return false;
    if (currentUser.walletBalance < amount) return false;

    const newBalance = currentUser.walletBalance - amount;
    const updatedUser = { ...currentUser, walletBalance: newBalance };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    return true;
  };

  const addToCart = (product, qty = 1, variant = null, size = null) => {
    const itemVariant = variant || (product.variants ? product.variants[0] : "");
    const itemSize = size || (product.sizes ? product.sizes[0] : "");
    const cartItemId = `${product.id}-${itemVariant}-${itemSize}`;
    
    // คำนวณราคาตามสิทธิ์ผู้ใช้
    const finalPrice = calculateEffectivePrice(product.price);

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, {
        ...product,
        price: finalPrice, // ใช้ราคาที่คำนวณสิทธิ์ VIP
        basePrice: product.price,
        cartItemId,
        selectedVariant: itemVariant,
        selectedSize: itemSize,
        quantity: qty
      }];
    });

    showToast(`เพิ่ม "${product.name.slice(0, 20)}..." ลงตะกร้าแล้ว!`);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "ทั้งหมด" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-amber-500 selection:text-white">
      
      {/* แจ้งเตือน Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-slate-700 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* แถบประกาศด้านบนสุด */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-xs md:text-sm py-2 px-4 text-center font-medium shadow-inner flex justify-between items-center">
        <div className="flex-1 text-center truncate">
          {shopConfig.announcementText}
        </div>
        <div className="flex items-center space-x-2 ml-2 shrink-0">
          <button 
            onClick={() => setActiveTab(activeTab === "storefront" ? "admin" : "storefront")}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold transition flex items-center space-x-1 border border-white/30"
          >
            {activeTab === "storefront" ? (
              <>
                <Settings className="w-3.5 h-3.5" />
                <span>เข้าสู่หลังบ้าน (CMS)</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>ดูหน้าร้านค้า (Storefront)</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("deploy")}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1 rounded-full text-xs font-black transition flex items-center space-x-1 shadow-md"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>เปิดขึ้นออนไลน์ 🚀</span>
          </button>
        </div>
      </div>

      {/* แถบเมนูด้านบน (Header) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* โลโก้ร้านค้า */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group shrink-0"
              onClick={() => { setSelectedProductId(null); setActiveTab("storefront"); }}
            >
              <div className="w-11 h-11 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition transform">
                <span className="text-2xl font-black text-white">🐾</span>
              </div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent leading-tight tracking-tight">
                  {shopConfig.storeName}
                </h1>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                  {shopConfig.logoSubtitle}
                </p>
              </div>
            </div>

            {/* ช่องค้นหาสินค้า */}
            {activeTab === "storefront" && (
              <div className="hidden md:flex flex-1 max-w-md relative">
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า เช่น อาหารแมว, ขนมเลีย, ทรายแมว..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100/
```
