import React, { useState, useMemo } from 'react';
import {
  Search,
  Phone,
  Bookmark,
  Check,
  SlidersHorizontal,
  PlusCircle,
  Store,
  MessageSquare,
  User,
  MapPin,
  Smartphone,
} from 'lucide-react';
import {
  AnimalCategory,
  AppTab,
  LANGUAGES,
  LanguageCode,
  UI_TRANSLATIONS,
} from './data/translations';
import {
  AnimalListing,
  INITIAL_ANIMALS,
  formatIndianPrice,
} from './data/animals';
import { AnimalImage } from './components/AnimalImage';
import { AnimalInspectorPanel } from './components/AnimalInspectorPanel';
import { SellAnimalView } from './components/SellAnimalView';
import { OffersChatView, SaudaThread } from './components/OffersChatView';
import { MyShedAccountView } from './components/MyShedAccountView';
import { calculateHaversineDistance } from './data/locations';
import { LocationModal, UserLocationState } from './components/LocationModal';
import { MobileAppModal } from './components/MobileAppModal';

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<AppTab>('market');
  const [animals, setAnimals] = useState<AnimalListing[]>(INITIAL_ANIMALS);
  const [selectedCategory, setSelectedCategory] = useState<AnimalCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'priceLow' | 'priceHigh' | 'nearest'>('recent');
  const [vaccinatedOnly, setVaccinatedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(['gir-cow-anand']);
  const [soldIds, setSoldIds] = useState<string[]>([]);
  const [myListingIds, setMyListingIds] = useState<string[]>(['gir-cow-anand']);

  // Dynamic Location & Search Radius State
  const [userLocation, setUserLocation] = useState<UserLocationState>({
    label: 'Anand, Gujarat',
    lat: 22.5645,
    lng: 72.9289,
    radiusKm: 100,
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // Master-Detail Active Animal (defaults to first animal on desktop split view)
  const [inspectedAnimalId, setInspectedAnimalId] = useState<string | null>(
    INITIAL_ANIMALS[0].id
  );
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [publishedToast, setPublishedToast] = useState<string | null>(null);
  const [revealedPhoneIds, setRevealedPhoneIds] = useState<Record<string, boolean>>({});

  // Initial Sauda / Negotiation Threads
  const [threads, setThreads] = useState<SaudaThread[]>([
    {
      animalId: INITIAL_ANIMALS[0].id,
      animal: INITIAL_ANIMALS[0],
      lastOfferInr: 64000,
      status: 'replied',
      messages: [
        {
          id: 'm1',
          sender: 'buyer',
          text: 'Namaste Rameshbhai, is this Gir cow available for milking check tomorrow morning?',
          offerAmountInr: 64000,
          time: '09:15 AM',
        },
        {
          id: 'm2',
          sender: 'farmer',
          text: 'Haan ji, morning milking is at 6:30 AM in Borsad. You are welcome to visit and verify.',
          time: '09:28 AM',
        },
      ],
    },
    {
      animalId: INITIAL_ANIMALS[1].id,
      animal: INITIAL_ANIMALS[1],
      lastOfferInr: 88000,
      status: 'pending',
      messages: [
        {
          id: 'm3',
          sender: 'buyer',
          text: 'Interested in the 18L Murrah buffalo. Sending my price offer.',
          offerAmountInr: 88000,
          time: 'Yesterday',
        },
      ],
    },
  ]);
  const [activeThreadId, setActiveThreadId] = useState<string>(INITIAL_ANIMALS[0].id);

  const t = UI_TRANSLATIONS[lang];

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAnimal = (animal: AnimalListing) => {
    setInspectedAnimalId(animal.id);
    setMobileSheetOpen(true);
  };

  const handlePublishAnimal = (newListing: AnimalListing) => {
    setAnimals((prev) => [newListing, ...prev]);
    setMyListingIds((prev) => [newListing.id, ...prev]);
    setInspectedAnimalId(newListing.id);
    setSelectedCategory('all');
    setActiveTab('market');
    setPublishedToast(t.listingPublishedToast);
    setTimeout(() => setPublishedToast(null), 3500);
  };

  const handleSendOfferFromInspector = (
    animal: AnimalListing,
    offerAmountInr: number
  ) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'buyer' as const,
      text:
        lang === 'hi'
          ? `नमस्ते, मैंने ${formatIndianPrice(offerAmountInr)} का भाव भेजा है।`
          : lang === 'gu'
          ? `નમસ્તે, મેં ${formatIndianPrice(offerAmountInr)} નો ભાવ મોકલ્યો છે.`
          : lang === 'mr'
          ? `नमस्कार, मी ${formatIndianPrice(offerAmountInr)} ची ऑफर पाठवली आहे.`
          : `Hello, I am sending an offer of ${formatIndianPrice(offerAmountInr)}.`,
      offerAmountInr,
      time: 'Just now',
    };

    setThreads((prev) => {
      const existing = prev.find((item) => item.animalId === animal.id);
      if (existing) {
        return prev.map((item) =>
          item.animalId === animal.id
            ? {
                ...item,
                lastOfferInr: offerAmountInr,
                status: 'pending',
                messages: [...item.messages, newMsg],
              }
            : item
        );
      }
      return [
        {
          animalId: animal.id,
          animal,
          lastOfferInr: offerAmountInr,
          status: 'pending',
          messages: [newMsg],
        },
        ...prev,
      ];
    });
    setActiveThreadId(animal.id);
  };

  const handleOpenChatForAnimal = (animal: AnimalListing) => {
    setThreads((prev) => {
      const exists = prev.some((item) => item.animalId === animal.id);
      if (exists) return prev;
      return [
        {
          animalId: animal.id,
          animal,
          lastOfferInr: animal.priceInr,
          status: 'pending',
          messages: [
            {
              id: `init-${Date.now()}`,
              sender: 'buyer',
              text: `Inquiring about ${animal.title[lang]}`,
              time: 'Just now',
            },
          ],
        },
        ...prev,
      ];
    });
    setActiveThreadId(animal.id);
    setMobileSheetOpen(false);
    setActiveTab('offers');
  };

  const handleSendChatMessage = (
    animalId: string,
    text: string,
    offerAmountInr?: number
  ) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.animalId === animalId
          ? {
              ...thread,
              lastOfferInr: offerAmountInr || thread.lastOfferInr,
              messages: [
                ...thread.messages,
                {
                  id: `m-${Date.now()}`,
                  sender: 'buyer',
                  text,
                  offerAmountInr,
                  time: 'Just now',
                },
              ],
            }
          : thread
      )
    );
  };

  const handleToggleSold = (id: string) => {
    setSoldIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteListing = (id: string) => {
    setAnimals((prev) => prev.filter((item) => item.id !== id));
    setMyListingIds((prev) => prev.filter((item) => item !== id));
  };

  const animalsWithDistance = useMemo(() => {
    return animals.map((item) => ({
      ...item,
      distanceKm: calculateHaversineDistance(
        userLocation.lat,
        userLocation.lng,
        item.lat,
        item.lng
      ),
    }));
  }, [animals, userLocation.lat, userLocation.lng]);

  const filteredAnimals = useMemo(() => {
    return animalsWithDistance
      .filter((item) => {
        if (activeTab === 'saved' && !savedIds.includes(item.id)) return false;
        if (
          activeTab === 'market' &&
          selectedCategory !== 'all' &&
          item.category !== selectedCategory
        ) {
          return false;
        }
        if (vaccinatedOnly && !item.vaccinated) return false;

        // Dynamic distance filtering based on selected radius
        if (
          activeTab === 'market' &&
          userLocation.radiusKm !== null &&
          item.distanceKm > userLocation.radiusKm
        ) {
          return false;
        }

        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          return (
            item.title.en.toLowerCase().includes(q) ||
            item.title.hi.toLowerCase().includes(q) ||
            item.title.gu.toLowerCase().includes(q) ||
            item.title.mr.toLowerCase().includes(q) ||
            item.breed.en.toLowerCase().includes(q) ||
            item.breed.hi.toLowerCase().includes(q) ||
            item.breed.gu.toLowerCase().includes(q) ||
            item.breed.mr.toLowerCase().includes(q) ||
            item.location.en.toLowerCase().includes(q) ||
            item.location.hi.toLowerCase().includes(q) ||
            item.location.gu.toLowerCase().includes(q) ||
            item.location.mr.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceLow') return a.priceInr - b.priceInr;
        if (sortBy === 'priceHigh') return b.priceInr - a.priceInr;
        if (sortBy === 'nearest') return a.distanceKm - b.distanceKm;
        return 0;
      });
  }, [
    animalsWithDistance,
    activeTab,
    savedIds,
    selectedCategory,
    vaccinatedOnly,
    userLocation.radiusKm,
    searchQuery,
    sortBy,
  ]);

  const inspectedAnimal = useMemo(() => {
    return (
      animalsWithDistance.find((item) => item.id === inspectedAnimalId) ||
      filteredAnimals[0] ||
      null
    );
  }, [animalsWithDistance, inspectedAnimalId, filteredAnimals]);

  const myListings = useMemo(() => {
    return animalsWithDistance.filter((item) => myListingIds.includes(item.id));
  }, [animalsWithDistance, myListingIds]);

  const categoryOrder: AnimalCategory[] = [
    'all',
    'cow',
    'buffalo',
    'goat',
    'horse',
    'poultry',
  ];

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setVaccinatedOnly(false);
    setSortBy('recent');
    setUserLocation((prev) => ({ ...prev, radiusKm: null }));
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-[#FAF8F5] text-[#181D1A] select-none sm:select-auto">
      {/* Desktop App Sidebar Navigation Rail */}
      <aside className="hidden md:flex md:w-60 lg:w-64 flex-col justify-between bg-white border-r border-[#E7E2DA] shrink-0">
        <div>
          {/* Brand & Active Location Pill */}
          <div className="h-16 px-5 border-b border-[#E7E2DA] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setActiveTab('market');
                resetAllFilters();
              }}
              className="text-xl font-bold tracking-tight text-[#181D1A] font-display cursor-pointer"
            >
              {t.brandName}
            </button>
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="min-h-[32px] px-2 py-1 rounded-lg hover:bg-[#FAF8F5] text-[11px] font-semibold text-[#15803D] flex items-center gap-1 transition-colors cursor-pointer"
              title="Click to set city or district"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C86D1F]" />
              <span className="truncate max-w-[80px]">
                {userLocation.label.split(',')[0]}
              </span>
              <span className="text-[10px] text-[#525854]">
                {userLocation.radiusKm ? `· ${userLocation.radiusKm}km` : '· All'}
              </span>
            </button>
          </div>

          {/* Primary Application Navigation */}
          <nav className="p-3 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('market')}
              className={`w-full min-h-[44px] px-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'market'
                  ? 'bg-[#1B5E3A] text-white'
                  : 'text-[#525854] hover:bg-[#FAF8F5] hover:text-[#181D1A]'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <Store className="w-4 h-4" />
                <span>{t.tabMarket}</span>
              </span>
              <span className="text-xs tabular-nums opacity-80">
                {animals.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className={`w-full min-h-[44px] px-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'sell'
                  ? 'bg-[#1B5E3A] text-white'
                  : 'text-[#525854] hover:bg-[#FAF8F5] hover:text-[#181D1A]'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <PlusCircle className="w-4 h-4" />
                <span>{t.tabSell}</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('offers')}
              className={`w-full min-h-[44px] px-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'offers'
                  ? 'bg-[#1B5E3A] text-white'
                  : 'text-[#525854] hover:bg-[#FAF8F5] hover:text-[#181D1A]'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>{t.tabOffers}</span>
              </span>
              <span className="text-xs tabular-nums opacity-85">
                {threads.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`w-full min-h-[44px] px-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-[#1B5E3A] text-white'
                  : 'text-[#525854] hover:bg-[#FAF8F5] hover:text-[#181D1A]'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <Bookmark className="w-4 h-4" />
                <span>{t.tabSaved}</span>
              </span>
              <span className="text-xs tabular-nums opacity-85">
                {savedIds.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('account')}
              className={`w-full min-h-[44px] px-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'account'
                  ? 'bg-[#1B5E3A] text-white'
                  : 'text-[#525854] hover:bg-[#FAF8F5] hover:text-[#181D1A]'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <User className="w-4 h-4" />
                <span>{t.tabAccount}</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileModalOpen(true)}
              className="w-full min-h-[42px] px-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#E7E2DA] text-[#1B5E3A] cursor-pointer mt-2"
            >
              <span className="inline-flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-[#C86D1F]" />
                <span>Mobile &amp; APK</span>
              </span>
              <span className="text-[10px] font-bold bg-[#1B5E3A]/10 text-[#1B5E3A] px-1.5 py-0.5 rounded">
                QR
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom Language Switcher Matrix */}
        <div className="p-3.5 border-t border-[#E7E2DA] bg-[#FAF8F5]">
          <div className="text-[11px] font-semibold text-[#525854] mb-2 px-1">
            {t.chooseLanguageLabel}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={`min-h-[38px] px-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap truncate cursor-pointer ${
                  lang === l.code
                    ? 'bg-[#181D1A] text-white'
                    : 'bg-white border border-[#E7E2DA] text-[#525854] hover:text-[#181D1A]'
                }`}
              >
                {l.nativeName}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Application Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Compact Application Top Bar */}
        <header className="h-14 sm:h-16 px-3 sm:px-5 bg-white border-b border-[#E7E2DA] flex items-center justify-between gap-3 shrink-0">
          {/* Mobile Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('market')}
            className="md:hidden text-lg font-bold tracking-tight text-[#181D1A] font-display shrink-0"
          >
            {t.brandName}
          </button>

          {/* Instant Live Search Bar */}
          <div className="flex-1 max-w-xl relative flex items-center bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl focus-within:bg-white focus-within:border-[#1B5E3A] transition-colors">
            <Search className="w-4 h-4 text-[#525854] ml-3.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'market' && activeTab !== 'saved') {
                  setActiveTab('market');
                }
              }}
              placeholder={t.searchPlaceholder}
              className="w-full h-10 px-2.5 text-xs sm:text-sm text-[#181D1A] placeholder-[#525854] bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mr-2 px-2 py-0.5 text-xs font-semibold text-[#525854] hover:text-[#181D1A] bg-[#E7E2DA]/60 rounded"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Quick Language Switcher & Sell Button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile Location Trigger Button */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="md:hidden min-h-[36px] px-2.5 py-1 text-xs font-semibold bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg text-[#181D1A] flex items-center gap-1 cursor-pointer"
              title="Change city or district"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C86D1F]" />
              <span className="truncate max-w-[70px]">
                {userLocation.label.split(',')[0]}
              </span>
            </button>

            {/* Compact Mobile Language Pills */}
            <div className="flex md:hidden items-center bg-[#FAF8F5] p-0.5 rounded-lg border border-[#E7E2DA]">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    lang === l.code
                      ? 'bg-[#1B5E3A] text-white'
                      : 'text-[#525854]'
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>

            {/* Desktop Location Button */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#E7E2DA] rounded-xl text-xs font-semibold text-[#181D1A] transition-colors cursor-pointer"
              title="Click to set city or district"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C86D1F]" />
              <span className="truncate max-w-[120px]">{userLocation.label}</span>
              <span className="text-[10px] text-[#15803D] font-bold">
                {userLocation.radiusKm ? `(${userLocation.radiusKm} km)` : '(All)'}
              </span>
            </button>

            {/* Mobile / APK Modal Trigger Button */}
            <button
              type="button"
              onClick={() => setIsMobileModalOpen(true)}
              className="min-h-[38px] px-2.5 sm:px-3 py-1.5 bg-[#1B5E3A]/10 hover:bg-[#1B5E3A]/20 border border-[#1B5E3A]/30 rounded-xl text-xs font-semibold text-[#1B5E3A] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Scan QR code, install app, or download APK"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#1B5E3A]" />
              <span className="font-bold">
                {lang === 'hi' ? 'ऐप / APK' : lang === 'gu' ? 'એપ / APK' : lang === 'mr' ? 'ॲप / APK' : 'App / APK'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className="hidden sm:inline-flex min-h-[40px] px-4 bg-[#1B5E3A] hover:bg-[#14472B] text-white text-xs font-semibold rounded-xl items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.tabSell}</span>
            </button>
          </div>
        </header>

        {/* Published Listing Toast Banner */}
        {publishedToast && (
          <div className="bg-[#15803D] text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shrink-0">
            <Check className="w-4 h-4 shrink-0" />
            <span>{publishedToast}</span>
          </div>
        )}

        {/* Active Application Screen Body */}
        {activeTab === 'sell' && (
          <div className="flex-1 overflow-y-auto pb-20 md:pb-6">
            <SellAnimalView lang={lang} onPublish={handlePublishAnimal} />
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="flex-1 overflow-hidden pb-16 md:pb-0">
            <OffersChatView
              threads={threads}
              activeThreadId={activeThreadId}
              lang={lang}
              onSelectThread={setActiveThreadId}
              onSendMessage={handleSendChatMessage}
            />
          </div>
        )}

        {activeTab === 'account' && (
          <div className="flex-1 overflow-y-auto pb-20 md:pb-6">
            <MyShedAccountView
              lang={lang}
              onChangeLang={setLang}
              myListings={myListings}
              soldIds={soldIds}
              userLocationLabel={userLocation.label}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onOpenMobileModal={() => setIsMobileModalOpen(true)}
              onToggleSold={handleToggleSold}
              onDeleteListing={handleDeleteListing}
              onGoToSell={() => setActiveTab('sell')}
            />
          </div>
        )}

        {(activeTab === 'market' || activeTab === 'saved') && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Sticky Category & Sort Filter Bar */}
            <div className="px-3 sm:px-5 py-2.5 bg-[#FAF8F5] border-b border-[#E7E2DA] flex items-center justify-between gap-3 shrink-0">
              {activeTab === 'market' ? (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {categoryOrder.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`min-h-[36px] px-3.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#181D1A] text-white'
                            : 'bg-white border border-[#E7E2DA] text-[#525854] hover:text-[#181D1A]'
                        }`}
                      >
                        {t.categories[cat]}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-sm font-semibold text-[#181D1A]">
                  {t.tabSaved} ({filteredAnimals.length})
                </div>
              )}

              {/* Right Vaccinated Toggle & Sort Select */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setVaccinatedOnly(!vaccinatedOnly)}
                  className={`min-h-[36px] px-3 text-xs font-semibold rounded-xl border transition-colors inline-flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                    vaccinatedOnly
                      ? 'border-[#15803D] bg-[#15803D]/10 text-[#15803D]'
                      : 'border-[#E7E2DA] bg-white text-[#525854] hover:text-[#181D1A]'
                  }`}
                >
                  {vaccinatedOnly && <Check className="w-3.5 h-3.5" />}
                  <span>{t.verifiedOnlyToggle}</span>
                </button>

                <div className="relative flex items-center">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#525854] absolute left-2.5 pointer-events-none" />
                  <select
                    aria-label={t.sortLabel}
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as
                          | 'recent'
                          | 'priceLow'
                          | 'priceHigh'
                          | 'nearest'
                      )
                    }
                    className="min-h-[36px] pl-7 pr-2.5 text-xs font-semibold bg-white border border-[#E7E2DA] rounded-xl text-[#181D1A] focus:outline-none focus:border-[#1B5E3A] cursor-pointer whitespace-nowrap"
                  >
                    <option value="recent">{t.sortOptions.recent}</option>
                    <option value="priceLow">{t.sortOptions.priceLow}</option>
                    <option value="priceHigh">{t.sortOptions.priceHigh}</option>
                    <option value="nearest">{t.sortOptions.nearest}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Split-View Workspace: Scrollable Animal Feed Left + Docked Inspector Right */}
            <div className="flex-1 flex overflow-hidden">
              {/* Scrollable Feed */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-5 pb-24 md:pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs text-[#525854] tabular-nums">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>{t.showingCount(filteredAnimals.length)}</span>
                    <span aria-hidden="true">·</span>
                    <button
                      type="button"
                      onClick={() => setIsLocationModalOpen(true)}
                      className="inline-flex items-center gap-1 text-[#1B5E3A] hover:underline font-semibold cursor-pointer"
                      title="Change city or district"
                    >
                      <MapPin className="w-3 h-3 text-[#C86D1F]" />
                      <span>{userLocation.label}</span>
                      <span className="text-[10px] text-[#525854]">
                        ({userLocation.radiusKm ? t.radiusKm(userLocation.radiusKm) : t.allIndiaRadius})
                      </span>
                    </button>
                  </div>
                  {(selectedCategory !== 'all' ||
                    searchQuery !== '' ||
                    vaccinatedOnly ||
                    userLocation.radiusKm !== null) && (
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="font-semibold text-[#1B5E3A] hover:underline cursor-pointer"
                    >
                      {t.clearFilters}
                    </button>
                  )}
                </div>

                {filteredAnimals.length === 0 ? (
                  <div className="bg-white border border-[#E7E2DA] rounded-2xl p-10 text-center max-w-md mx-auto my-8">
                    <h2 className="text-base font-semibold text-[#181D1A] mb-1">
                      {activeTab === 'saved'
                        ? t.emptySavedTitle
                        : t.noResultsTitle}
                    </h2>
                    <p className="text-xs text-[#525854] mb-4">
                      {activeTab === 'saved'
                        ? t.emptySavedDesc
                        : t.noResultsDesc}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === 'saved') {
                          setActiveTab('market');
                        } else {
                          resetAllFilters();
                        }
                      }}
                      className="min-h-[40px] px-5 bg-[#1B5E3A] text-white text-xs font-semibold rounded-xl hover:bg-[#14472B] transition-colors cursor-pointer"
                    >
                      {activeTab === 'saved'
                        ? t.browseMarketBtn
                        : t.clearFilters}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredAnimals.map((animal) => {
                      const isSaved = savedIds.includes(animal.id);
                      const isSelected = inspectedAnimal?.id === animal.id;
                      const isPhoneRevealed = !!revealedPhoneIds[animal.id];
                      const isSold = soldIds.includes(animal.id);

                      return (
                        <article
                          key={animal.id}
                          onClick={() => handleSelectAnimal(animal)}
                          className={`group bg-white rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-150 cursor-pointer border ${
                            isSelected
                              ? 'border-[#1B5E3A] ring-2 ring-[#1B5E3A]/15'
                              : 'border-[#E7E2DA] hover:border-[#1B5E3A]/50'
                          }`}
                        >
                          <div>
                            {/* 4:3 Image Slot */}
                            <div className="relative aspect-[4/3] w-full bg-[#F2EFE9] overflow-hidden">
                              <AnimalImage
                                src={animal.image}
                                alt={animal.title[lang]}
                                category={animal.category}
                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSave(animal.id);
                                }}
                                aria-label={
                                  isSaved ? t.savedListing : t.saveListing
                                }
                                className="absolute top-2.5 right-2.5 w-9 h-9 rounded-xl bg-white/90 hover:bg-white flex items-center justify-center text-[#181D1A] transition-colors cursor-pointer"
                              >
                                <Bookmark
                                  className={`w-4 h-4 ${
                                    isSaved
                                      ? 'fill-[#1B5E3A] text-[#1B5E3A]'
                                      : 'text-[#181D1A]'
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Clean Unboxed Card Body */}
                            <div className="p-4">
                              <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#525854] tabular-nums">
                                <span className="font-semibold text-[#1B5E3A]">
                                  {animal.breed[lang]}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>
                                  {animal.ageYears}{' '}
                                  {lang === 'en'
                                    ? 'Yrs'
                                    : lang === 'hi'
                                    ? 'वर्ष'
                                    : lang === 'gu'
                                    ? 'વર્ષ'
                                    : 'वर्षे'}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="font-semibold text-[#181D1A]">
                                  {animal.weightOrCountLabel[lang]}
                                </span>
                              </div>

                              <h2 className="mt-1 text-sm sm:text-base font-semibold text-[#181D1A] line-clamp-1">
                                {animal.title[lang]}
                              </h2>

                              <div className="mt-1 flex items-center gap-1.5 text-xs text-[#525854] tabular-nums">
                                <span className="truncate">
                                  {animal.location[lang]}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="shrink-0">
                                  {animal.distanceKm} km
                                </span>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-[#E7E2DA] flex items-baseline justify-between">
                                <div>
                                  <span className="text-lg font-bold text-[#181D1A] tabular-nums">
                                    {formatIndianPrice(animal.priceInr)}
                                  </span>
                                  <span className="ml-1.5 text-[11px] text-[#525854]">
                                    {isSold
                                      ? t.soldStatus
                                      : animal.negotiable
                                      ? t.priceNegotiable
                                      : t.fixedPrice}
                                  </span>
                                </div>
                                {animal.vaccinated && (
                                  <span className="text-[11px] text-[#15803D] font-medium">
                                    {t.vaccinatedLabel}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Interactive Card Actions */}
                          <div
                            className="px-4 pb-4 grid grid-cols-2 gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => handleSelectAnimal(animal)}
                              className="min-h-[40px] px-3 text-xs font-semibold text-[#181D1A] bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#E7E2DA] rounded-xl transition-colors whitespace-nowrap truncate cursor-pointer"
                            >
                              {t.inspectBtn}
                            </button>

                            {!isPhoneRevealed ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setRevealedPhoneIds((prev) => ({
                                    ...prev,
                                    [animal.id]: true,
                                  }))
                                }
                                className="min-h-[40px] px-3 text-xs font-semibold text-white bg-[#1B5E3A] hover:bg-[#14472B] rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap truncate cursor-pointer"
                              >
                                <Phone className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">
                                  {t.callSellerBtn}
                                </span>
                              </button>
                            ) : (
                              <a
                                href={`tel:${animal.sellerPhone.replace(
                                  /\s+/g,
                                  ''
                                )}`}
                                className="min-h-[40px] px-2 text-xs font-bold text-[#1B5E3A] bg-[#1B5E3A]/10 border border-[#1B5E3A] rounded-xl inline-flex items-center justify-center tabular-nums whitespace-nowrap truncate"
                              >
                                {animal.sellerPhone}
                              </a>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Docked Live Inspector Panel on Desktop */}
              {inspectedAnimal && (
                <div className="hidden lg:block lg:w-[390px] xl:w-[430px] h-full shrink-0">
                  <AnimalInspectorPanel
                    animal={inspectedAnimal}
                    lang={lang}
                    isSaved={savedIds.includes(inspectedAnimal.id)}
                    onToggleSave={toggleSave}
                    onClose={() => setInspectedAnimalId(null)}
                    onSendOffer={handleSendOfferFromInspector}
                    onOpenChat={handleOpenChatForAnimal}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Slide-Up Bottom Sheet Inspector */}
      {mobileSheetOpen && inspectedAnimal && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setMobileSheetOpen(false)}
        >
          <div
            className="w-full h-[86vh] bg-white rounded-t-3xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1.5 bg-[#E7E2DA] rounded-full mx-auto my-2.5 shrink-0" />
            <div className="flex-1 min-h-0">
              <AnimalInspectorPanel
                animal={inspectedAnimal}
                lang={lang}
                isSaved={savedIds.includes(inspectedAnimal.id)}
                onToggleSave={toggleSave}
                onClose={() => setMobileSheetOpen(false)}
                onSendOffer={handleSendOfferFromInspector}
                onOpenChat={handleOpenChatForAnimal}
              />
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Navigation Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-t border-[#E7E2DA] grid grid-cols-5 items-center px-1">
        <button
          type="button"
          onClick={() => setActiveTab('market')}
          className={`min-h-[48px] flex flex-col items-center justify-center ${
            activeTab === 'market' ? 'text-[#1B5E3A]' : 'text-[#525854]'
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 truncate max-w-[64px]">
            {t.tabMarket}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`min-h-[48px] flex flex-col items-center justify-center ${
            activeTab === 'saved' ? 'text-[#1B5E3A]' : 'text-[#525854]'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 truncate max-w-[64px]">
            {t.tabSaved}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sell')}
          className="min-h-[48px] flex flex-col items-center justify-center text-[#1B5E3A]"
        >
          <div className="w-8 h-8 rounded-xl bg-[#1B5E3A] text-white flex items-center justify-center">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold mt-0.5 truncate max-w-[64px]">
            {t.tabSell}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('offers')}
          className={`min-h-[48px] flex flex-col items-center justify-center ${
            activeTab === 'offers' ? 'text-[#1B5E3A]' : 'text-[#525854]'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 truncate max-w-[64px]">
            {t.tabOffers}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('account')}
          className={`min-h-[48px] flex flex-col items-center justify-center ${
            activeTab === 'account' ? 'text-[#1B5E3A]' : 'text-[#525854]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5 truncate max-w-[64px]">
            {t.tabAccount}
          </span>
        </button>
      </nav>

      {/* Location Selection & Distance Calculator Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        currentLocation={userLocation}
        lang={lang}
        onClose={() => setIsLocationModalOpen(false)}
        onApplyLocation={(newLoc) => {
          setUserLocation(newLoc);
          setPublishedToast(
            lang === 'hi'
              ? `स्थान बदलकर ${newLoc.label} किया गया`
              : lang === 'gu'
              ? `સ્થાન બદલીને ${newLoc.label} કરવામાં આવ્યું`
              : lang === 'mr'
              ? `स्थान बदलून ${newLoc.label} केले`
              : `Location set to ${newLoc.label}`
          );
          setTimeout(() => setPublishedToast(null), 3000);
        }}
      />

      {/* Mobile & APK Modal */}
      <MobileAppModal
        isOpen={isMobileModalOpen}
        lang={lang}
        onClose={() => setIsMobileModalOpen(false)}
      />
    </div>
  );
}
