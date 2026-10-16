import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Smartphone,
  QrCode,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import QRCode from 'qrcode';
import { LanguageCode } from '../data/translations';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobileAppModalProps {
  isOpen: boolean;
  lang: LanguageCode;
  onClose: () => void;
}

const MODAL_STRINGS = {
  en: {
    title: 'Check on Mobile & Build APK',
    subtitle: 'Scan with any phone camera, install on your home screen, or export an Android APK.',
    tabQr: 'Scan QR Code',
    tabApk: 'Download / Build APK',
    tabInstall: 'Instant Install',
    qrInstruction: 'Point your phone camera or Google Lens at this QR code',
    qrSub: 'Opens instantly on Android & iPhone in any browser',
    mobileLink: 'Direct Mobile Link:',
    copyBtn: 'Copy Link',
    copiedBtn: 'Copied!',
    whatsAppShare: 'Send Link via WhatsApp',
    apkCardTitle: 'Option 1: 1-Click APK Generator (Recommended)',
    apkCardDesc:
      'Turn this live web app into an installable Android APK or Google Play Store package (.aab) with zero coding using PWABuilder (backed by Google Chromium & Microsoft).',
    apkDownloadBtn: 'Open PWABuilder & Download APK',
    apkAltTitle: 'Option 2: Google Bubblewrap / Capacitor CLI (Developer Mode)',
    apkAltDesc: 'Generate a raw debug/release APK directly from terminal using Google’s official CLI tools:',
    androidHeading: 'How to Install on Android (Chrome / Samsung)',
    androidStep1: 'Open the link on your mobile Chrome browser.',
    androidStep2: 'Tap the three dots (⋮) in the top-right corner.',
    androidStep3: 'Tap "Install App" or "Add to Home Screen".',
    androidStep4: 'Gram Shop is installed as a native app with full-screen experience and offline support!',
    iosHeading: 'How to Install on iPhone (Safari)',
    iosStep1: 'Open the link in Safari.',
    iosStep2: 'Tap the Share button (square with arrow pointing up).',
    iosStep3: 'Scroll down and select "Add to Home Screen".',
    iosStep4: 'Tap "Add" in the top-right corner.',
    directInstallBtn: 'Install Gram Shop to Home Screen',
    alreadyInstalled: 'Gram Shop is already installed and running on this device!',
    footerNote: 'Gram Shop is mobile-responsive, touch-optimized, and works across English, Hindi, Gujarati, and Marathi.',
    closeBtn: 'Close',
  },
  hi: {
    title: 'मोबाइल पर चेक करें और APK बनाएं',
    subtitle: 'फोन कैमरे से स्कैन करें, होम स्क्रीन पर इंस्टॉल करें या Android APK डाउनलोड करें।',
    tabQr: 'QR कोड स्कैन करें',
    tabApk: 'APK बनाएं / डाउनलोड करें',
    tabInstall: 'फोन पर तुरंत इंस्टॉल करें',
    qrInstruction: 'अपने फोन के कैमरे या गूगल लेंस से यह QR कोड स्कैन करें',
    qrSub: 'Android और iPhone के किसी भी ब्राउज़र में तुरंत खुलेगा',
    mobileLink: 'मोबाइल लिंक:',
    copyBtn: 'लिंक कॉपी करें',
    copiedBtn: 'कॉपी हो गया!',
    whatsAppShare: 'WhatsApp पर लिंक भेजें',
    apkCardTitle: 'तरीका 1: 1-क्लिक APK जनरेटर (सबसे आसान)',
    apkCardDesc:
      'PWABuilder (Google & Microsoft समर्थित) से बिना कोडिंग के कुछ ही सेकंड में Android APK या Play Store पैकेज डाउनलोड करें।',
    apkDownloadBtn: 'PWABuilder खोलें और APK डाउनलोड करें',
    apkAltTitle: 'तरीका 2: Google Bubblewrap / Capacitor CLI (डेवलपर मोड)',
    apkAltDesc: 'टर्मिनल से सीधा APK पैकेज बनाने के लिए इन कमांड्स का उपयोग करें:',
    androidHeading: 'Android पर बिना APK सीधा ऐप कैसे लगाएं (Chrome)',
    androidStep1: 'अपने मोबाइल Chrome में ऊपर दिया लिंक खोलें।',
    androidStep2: 'ऊपर दाईं ओर 3 डॉट्स (⋮) पर क्लिक करें।',
    androidStep3: '"Install App" (ऐप इंस्टॉल करें) या "Add to Home Screen" दबाएं।',
    androidStep4: 'ग्राम शॉप आपके फोन पर ऐप की तरह आ जाएगी - बिना इंटरनेट भी चलेगी!',
    iosHeading: 'iPhone पर कैसे लगाएं (Safari)',
    iosStep1: 'Safari ब्राउज़र में लिंक खोलें।',
    iosStep2: 'नीचे Share बटन (तीर वाला आइकॉन) दबाएं।',
    iosStep3: '"Add to Home Screen" (होम स्क्रीन पर जोड़ें) चुनें।',
    iosStep4: 'ऊपर "Add" दबाएं।',
    directInstallBtn: 'ग्राम शॉप को तुरंत फोन पर इंस्टॉल करें',
    alreadyInstalled: 'ग्राम शॉप इस डिवाइस पर पहले से इंस्टॉल है!',
    footerNote: 'ग्राम शॉप पूरी तरह मोबाइल और क्षेत्रीय भाषाओं के अनुकूल है।',
    closeBtn: 'बंद करें',
  },
  gu: {
    title: 'મોબાઇલ પર ચેક કરો અને APK બનાવો',
    subtitle: 'ફોન કેમેરાથી સ્કેન કરો, હોમ સ્ક્રીન પર ઇન્સ્ટોલ કરો અથવા Android APK ડાઉનલોડ કરો.',
    tabQr: 'QR કોડ સ્કેન કરો',
    tabApk: 'APK બનાવો / ડાઉનલોડ કરો',
    tabInstall: 'ફોન પર તરત ઇન્સ્ટોલ કરો',
    qrInstruction: 'તમારા ફોનના કેમેરા અથવા Google Lens થી QR કોડ સ્કેન કરો',
    qrSub: 'Android અને iPhone માં તરત જ ખુલશે',
    mobileLink: 'મોબાઇલ લિંક:',
    copyBtn: 'લિંક કૉપિ કરો',
    copiedBtn: 'કૉપિ થઈ ગયું!',
    whatsAppShare: 'WhatsApp પર લિંક મોકલો',
    apkCardTitle: 'રીત 1: 1-ક્લિક APK જનરેટર (સૌથી સરળ)',
    apkCardDesc:
      'PWABuilder (Google & Microsoft સપોર્ટેડ) દ્વારા કોડિંગ વગર સીધું Android APK અથવા Play Store પેકેજ ડાઉનલોડ કરો.',
    apkDownloadBtn: 'PWABuilder ખોલો અને APK ડાઉનલોડ કરો',
    apkAltTitle: 'રીત 2: Google Bubblewrap / Capacitor CLI (ડેવલપર માટે)',
    apkAltDesc: 'ટર્મિનલથી ડાયરેક્ટ APK બનાવવા માટે આ કમાન્ડ વાપરો:',
    androidHeading: 'Android પર સીધી એપ કેવી રીતે ઇન્સ્ટોલ કરવી',
    androidStep1: 'તમારા મોબાઇલ ક્રોમ બ્રાઉઝરમાં લિંક ખોલો.',
    androidStep2: 'ઉપર જમણી બાજુ 3 ટપકાં (⋮) પર ક્લિક કરો.',
    androidStep3: '"Install App" અથવા "Add to Home screen" પસંદ કરો.',
    androidStep4: 'ગ્રામ શોપ તમારા મોબાઇલમાં એપ તરીકે સેવ થઈ જશે!',
    iosHeading: 'iPhone પર કેવી રીતે સેટ કરવું',
    iosStep1: 'Safari માં લિંક ખોલો.',
    iosStep2: 'નીચે Share બટન દબાવો.',
    iosStep3: '"Add to Home Screen" પસંદ કરો.',
    iosStep4: 'ઉપર "Add" દબાવો.',
    directInstallBtn: 'ગ્રામ શોપને ફોન પર ઇન્સ્ટોલ કરો',
    alreadyInstalled: 'ગ્રામ શોપ આ ઉપકરણ પર પહેલેથી ઇન્સ્ટોલ કરેલ છે!',
    footerNote: 'ગ્રામ શોપ મોબાઇલ અને સ્થાનિક ભાષાઓ માટે સંપૂર્ણ અનુકૂળ છે.',
    closeBtn: 'બંધ કરો',
  },
  mr: {
    title: 'मोबाईलवर तपासा आणि APK बनवा',
    subtitle: 'फोन कॅमेऱ्याने स्कॅन करा, होम स्क्रीनवर इंस्टॉल करा किंवा Android APK डाउनलोड करा.',
    tabQr: 'QR कोड स्कॅन करा',
    tabApk: 'APK बनवा / डाउनलोड करा',
    tabInstall: 'फोनवर लगेच इंस्टॉल करा',
    qrInstruction: 'तुमच्या फोनच्या कॅमेऱ्याने किंवा Google Lens ने QR कोड स्कॅन करा',
    qrSub: 'Android आणि iPhone वर कोणत्याही ब्राउझरमध्ये लगेच उघडेल',
    mobileLink: 'मोबाईल लिंक:',
    copyBtn: 'लिंक कॉपी करा',
    copiedBtn: 'कॉपी झाले!',
    whatsAppShare: 'WhatsApp वर लिंक पाठवा',
    apkCardTitle: 'पद्धत 1: 1-क्लिक APK जनरेटर (सोपी पद्धत)',
    apkCardDesc:
      'PWABuilder (Google & Microsoft समर्थित) द्वारे कोडिंगशिवाय काही सेकंदात Android APK डाउनलोड करा.',
    apkDownloadBtn: 'PWABuilder उघडा आणि APK डाउनलोड करा',
    apkAltTitle: 'पद्धत 2: Google Bubblewrap / Capacitor CLI (डेव्हलपर पद्धत)',
    apkAltDesc: 'टर्मिनलमधून थेट APK तयार करण्यासाठी हे कमांड वापरा:',
    androidHeading: 'Android वर थेट ॲप कसे इंस्टॉल करावे',
    androidStep1: 'मोबाईल Chrome ब्राउझरमध्ये ही लिंक उघडा.',
    androidStep2: 'उजव्या कोपऱ्यातील ३ ठिपके (⋮) दाबा.',
    androidStep3: '"Install App" किंवा "Add to Home screen" वर टॅप करा.',
    androidStep4: 'ग्राम शॉप तुमच्या फोनवर ॲपप्रमाणे दिसेल व चालेल!',
    iosHeading: 'iPhone वर कसे सेट करावे',
    iosStep1: 'Safari मध्ये लिंक उघडा.',
    iosStep2: 'खाली Share बटण दाबा.',
    iosStep3: '"Add to Home Screen" निवडा.',
    iosStep4: 'वरती "Add" दाबा.',
    directInstallBtn: 'ग्राम शॉप मोबाईलवर त्वरित इंस्टॉल करा',
    alreadyInstalled: 'ग्राम शॉप या डिव्हाइसवर आधीच इंस्टॉल आहे!',
    footerNote: 'ग्राम शॉप मोबाईल आणि स्थानिक भाषांसाठी पूर्णपणे अनुकूल आहे.',
    closeBtn: 'बंद करा',
  },
};

export const MobileAppModal: React.FC<MobileAppModalProps> = ({
  isOpen,
  lang,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'apk' | 'pwa'>('qr');
  const { isInstallable, isInstalled, install } = usePWAInstall();

  const str = MODAL_STRINGS[lang] || MODAL_STRINGS.en;

  // Use the shared app preview URL if available, otherwise current window location
  const currentUrl =
    typeof window !== 'undefined'
      ? window.location.href.includes('ais-dev-')
        ? window.location.href.replace('ais-dev-', 'ais-pre-')
        : window.location.href
      : 'https://ais-pre-kk26sutqki6nhblnm7j3vm-499271892737.asia-southeast1.run.app';

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, currentUrl, {
        width: 190,
        margin: 1,
        color: {
          dark: '#1B5E3A',
          light: '#FFFFFF',
        },
      }).catch((err) => {
        console.error('Failed to generate QR code:', err);
      });
    }
  }, [isOpen, currentUrl, activeTab]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Open and test Gram Shop (Animals Buy & Sell) on your mobile: ${currentUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const pwaBuilderUrl = `https://www.pwabuilder.com?url=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-[#E7E2DA] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E7E2DA] bg-[#FAF8F5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1B5E3A] text-white flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#181D1A]">
                {str.title}
              </h2>
              <p className="text-xs text-[#525854]">
                {str.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525854] hover:text-[#181D1A] hover:bg-[#E7E2DA]/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="grid grid-cols-3 border-b border-[#E7E2DA] bg-white text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`min-h-[44px] px-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'qr'
                ? 'border-[#1B5E3A] text-[#1B5E3A] bg-[#FAF8F5]'
                : 'border-transparent text-[#525854] hover:text-[#181D1A]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="truncate">{str.tabQr}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('apk')}
            className={`min-h-[44px] px-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'apk'
                ? 'border-[#1B5E3A] text-[#1B5E3A] bg-[#FAF8F5]'
                : 'border-transparent text-[#525854] hover:text-[#181D1A]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="truncate">{str.tabApk}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pwa')}
            className={`min-h-[44px] px-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'pwa'
                ? 'border-[#1B5E3A] text-[#1B5E3A] bg-[#FAF8F5]'
                : 'border-transparent text-[#525854] hover:text-[#181D1A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="truncate">{str.tabInstall}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* TAB 1: QR CODE */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-[#FAF8F5] border border-[#E7E2DA] rounded-2xl inline-flex flex-col items-center mx-auto">
                <canvas
                  ref={canvasRef}
                  className="rounded-xl shadow-xs border border-white"
                />
                <p className="text-xs font-semibold text-[#181D1A] mt-2.5">
                  {str.qrInstruction}
                </p>
                <p className="text-[11px] text-[#525854]">
                  {str.qrSub}
                </p>
              </div>

              {/* Direct Link & Actions */}
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E2DA] flex items-center justify-between gap-2 text-left">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-[#525854] font-medium">
                    {str.mobileLink}
                  </div>
                  <div className="text-xs font-mono text-[#181D1A] truncate select-all">
                    {currentUrl}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#E7E2DA] hover:bg-[#F2EFE9] text-[#181D1A] inline-flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#15803D]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? str.copiedBtn : str.copyBtn}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#25D366] text-white hover:bg-[#1ebd5b] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{str.whatsAppShare}</span>
                </button>
                {isInstallable && (
                  <button
                    type="button"
                    onClick={install}
                    className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#1B5E3A] text-white hover:bg-[#14472B] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{str.directInstallBtn}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: BUILD / DOWNLOAD APK */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              {/* Option 1: PWABuilder 1-click APK */}
              <div className="p-4 bg-[#1B5E3A]/8 border border-[#1B5E3A]/25 rounded-xl">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#1B5E3A] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-[#181D1A]">
                      {str.apkCardTitle}
                    </h3>
                    <p className="text-xs text-[#525854] mt-1 leading-relaxed">
                      {str.apkCardDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#1B5E3A]/20">
                  <a
                    href={pwaBuilderUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full min-h-[42px] px-4 py-2.5 bg-[#1B5E3A] hover:bg-[#14472B] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>{str.apkDownloadBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                  <p className="text-[11px] text-[#525854] mt-2 text-center">
                    PWABuilder tests the PWA manifest, injects icons, and produces a signed <strong>.apk</strong> or Google Play <strong>.aab</strong>.
                  </p>
                </div>
              </div>

              {/* Option 2: CLI tools (Bubblewrap & Capacitor) */}
              <div className="p-4 bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl text-xs space-y-2.5 text-[#525854]">
                <div className="font-semibold text-[#181D1A] text-sm flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#C86D1F]" />
                  <span>{str.apkAltTitle}</span>
                </div>
                <p>
                  {str.apkAltDesc}
                </p>

                <div className="space-y-2">
                  <div className="font-semibold text-[11px] text-[#181D1A]">
                    A. Google Official Bubblewrap CLI (Fastest APK build):
                  </div>
                  <div className="bg-[#181D1A] text-[#FAF8F5] p-3 rounded-lg font-mono text-[11px] space-y-1 overflow-x-auto select-all">
                    <div>npm install -g @bubblewrap/cli</div>
                    <div>bubblewrap init --manifest {currentUrl}/manifest.json</div>
                    <div>bubblewrap build</div>
                  </div>
                  <div className="text-[10px] text-[#525854]">
                    Outputs <code className="text-[#1B5E3A] font-semibold">app-release-signed.apk</code> ready to install on any Android phone!
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E7E2DA]">
                  <div className="font-semibold text-[11px] text-[#181D1A]">
                    B. Capacitor CLI (Android Studio Native Project):
                  </div>
                  <div className="bg-[#181D1A] text-[#FAF8F5] p-3 rounded-lg font-mono text-[11px] space-y-1 overflow-x-auto select-all">
                    <div>npm install @capacitor/core @capacitor/cli @capacitor/android</div>
                    <div>npx cap init &quot;Gram Shop&quot; com.gramshop.app</div>
                    <div>npm run build</div>
                    <div>npx cap add android &amp;&amp; npx cap open android</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INSTANT INSTALL (PWA) */}
          {activeTab === 'pwa' && (
            <div className="space-y-4 text-xs text-[#525854]">
              {/* Direct In-App Install Button if browser supports beforeinstallprompt */}
              {isInstallable && (
                <div className="p-3.5 bg-[#1B5E3A]/8 border border-[#1B5E3A]/25 rounded-xl flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-xs text-[#181D1A]">
                      Browser Install Available
                    </div>
                    <div className="text-[11px] text-[#525854]">
                      Add Gram Shop to your phone or desktop in 1 tap
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={install}
                    className="px-3.5 py-2 bg-[#1B5E3A] hover:bg-[#14472B] text-white font-semibold text-xs rounded-xl shrink-0 cursor-pointer transition-colors"
                  >
                    {str.directInstallBtn}
                  </button>
                </div>
              )}

              {isInstalled && (
                <div className="p-3 bg-[#15803D]/10 border border-[#15803D]/30 rounded-xl text-xs font-semibold text-[#15803D] flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{str.alreadyInstalled}</span>
                </div>
              )}

              <div className="p-3.5 bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl space-y-2">
                <div className="font-semibold text-[#181D1A] text-sm flex items-center gap-2">
                  <span>🤖 {str.androidHeading}</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
                  <li>{str.androidStep1}</li>
                  <li>{str.androidStep2}</li>
                  <li>{str.androidStep3}</li>
                  <li>{str.androidStep4}</li>
                </ol>
              </div>

              <div className="p-3.5 bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl space-y-2">
                <div className="font-semibold text-[#181D1A] text-sm flex items-center gap-2">
                  <span>🍎 {str.iosHeading}</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
                  <li>{str.iosStep1}</li>
                  <li>{str.iosStep2}</li>
                  <li>{str.iosStep3}</li>
                  <li>{str.iosStep4}</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#E7E2DA] bg-[#FAF8F5] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#525854] line-clamp-1">
            {str.footerNote}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#E7E2DA] hover:bg-[#F2EFE9] text-xs font-semibold text-[#181D1A] rounded-xl transition-colors cursor-pointer shrink-0 ml-2"
          >
            {str.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
