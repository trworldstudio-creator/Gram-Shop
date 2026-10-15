export type LanguageCode = 'en' | 'hi' | 'gu' | 'mr';

export interface LanguageOption {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  regionLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', regionLabel: 'All India' },
  { code: 'hi', nativeName: 'हिंदी', englishName: 'Hindi', regionLabel: 'उत्तर व मध्य भारत' },
  { code: 'gu', nativeName: 'ગુજરાતી', englishName: 'Gujarati', regionLabel: 'ગુજરાત' },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi', regionLabel: 'महाराष्ट्र' },
];

export type AnimalCategory = 'all' | 'cow' | 'buffalo' | 'goat' | 'horse' | 'poultry';
export type AppTab = 'market' | 'sell' | 'offers' | 'saved' | 'account';

export interface UIStrings {
  brandName: string;
  // App Navigation Tabs
  tabMarket: string;
  tabSell: string;
  tabOffers: string;
  tabSaved: string;
  tabAccount: string;
  // Top App Bar & Location
  currentLocation: string;
  radiusLabel: string;
  searchPlaceholder: string;
  chooseLanguageLabel: string;
  categories: Record<AnimalCategory, string>;
  sortLabel: string;
  sortOptions: {
    recent: string;
    priceLow: string;
    priceHigh: string;
    nearest: string;
  };
  verifiedOnlyToggle: string;
  showingCount: (count: number) => string;
  clearFilters: string;
  noResultsTitle: string;
  noResultsDesc: string;
  // Listing & Inspector Panel
  priceNegotiable: string;
  fixedPrice: string;
  milkYieldLabel: string;
  ageLabel: string;
  weightLabel: string;
  vaccinatedLabel: string;
  calvingLabel: string;
  locationLabel: string;
  sellerLabel: string;
  verifiedSeller: string;
  inspectBtn: string;
  callSellerBtn: string;
  chatSellerBtn: string;
  makeOfferBtn: string;
  offerSentSuccess: string;
  enterOfferPlaceholder: string;
  submitOfferBtn: string;
  quickOfferLabel: string;
  saveListing: string;
  savedListing: string;
  closePanel: string;
  // Sell Animal In-App View
  sellScreenTitle: string;
  sellScreenSubtitle: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  selectCategoryLabel: string;
  animalTitleLabel: string;
  animalTitlePlaceholder: string;
  breedLabel: string;
  breedPlaceholder: string;
  ageYearsLabel: string;
  milkPerDayLabel: string;
  expectedPriceLabel: string;
  villageCityLabel: string;
  villageCityPlaceholder: string;
  sellerNameLabel: string;
  sellerPhoneLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  nextStepBtn: string;
  prevStepBtn: string;
  publishListingBtn: string;
  listingPublishedToast: string;
  // Offers & Chats (Sauda) View
  offersScreenTitle: string;
  offersScreenSubtitle: string;
  activeNegotiations: string;
  typeMessagePlaceholder: string;
  sendBtn: string;
  offerStatusPending: string;
  offerStatusAccepted: string;
  acceptCounterBtn: string;
  // Account & My Listings View
  accountScreenTitle: string;
  myListingsHeading: string;
  languageSettingsHeading: string;
  farmerProfileLabel: string;
  deleteListingBtn: string;
  markSoldBtn: string;
  soldStatus: string;
  emptySavedTitle: string;
  emptySavedDesc: string;
  browseMarketBtn: string;
  // Location Modal
  locationModalTitle: string;
  locationModalSubtitle: string;
  searchCityDistrict: string;
  detectMyLocation: string;
  detectingLocation: string;
  popularDistricts: string;
  radiusFilterTitle: string;
  radiusKm: (km: number) => string;
  allIndiaRadius: string;
  applyLocationBtn: string;
  distanceFromYou: (km: number) => string;
}

export const UI_TRANSLATIONS: Record<LanguageCode, UIStrings> = {
  en: {
    brandName: 'Gram Shop',
    tabMarket: 'Mandi Feed',
    tabSell: 'Sell Animal',
    tabOffers: 'Offers & Chat',
    tabSaved: 'Saved',
    tabAccount: 'My Shed',
    currentLocation: 'Anand, Gujarat',
    radiusLabel: 'Within 50 km',
    searchPlaceholder: 'Search breed (Gir, Murrah, Sirohi) or village...',
    chooseLanguageLabel: 'App Language',
    categories: {
      all: 'All',
      cow: 'Cows',
      buffalo: 'Buffaloes',
      goat: 'Goats',
      horse: 'Horses',
      poultry: 'Poultry',
    },
    sortLabel: 'Sort',
    sortOptions: {
      recent: 'Latest',
      priceLow: 'Price: Low',
      priceHigh: 'Price: High',
      nearest: 'Nearest',
    },
    verifiedOnlyToggle: 'Vaccinated',
    showingCount: (count) => `${count} animals available`,
    clearFilters: 'Reset',
    noResultsTitle: 'No matching animals found',
    noResultsDesc: 'Change category or clear search filters to see more listings.',
    priceNegotiable: 'Negotiable',
    fixedPrice: 'Fixed Price',
    milkYieldLabel: 'Daily Milk',
    ageLabel: 'Age',
    weightLabel: 'Capacity / Weight',
    vaccinatedLabel: 'Vaccinated',
    calvingLabel: 'Status / Lactation',
    locationLabel: 'Village',
    sellerLabel: 'Farmer',
    verifiedSeller: 'Verified Owner',
    inspectBtn: 'Inspect',
    callSellerBtn: 'Call Farmer',
    chatSellerBtn: 'Open Chat',
    makeOfferBtn: 'Make Price Offer (Sauda)',
    offerSentSuccess: 'Offer sent to farmer in Offers & Chat!',
    enterOfferPlaceholder: 'Custom offer ₹',
    submitOfferBtn: 'Send Offer',
    quickOfferLabel: 'Quick Tap Offer:',
    saveListing: 'Save',
    savedListing: 'Saved',
    closePanel: 'Close',
    sellScreenTitle: 'Post Animal for Sale',
    sellScreenSubtitle: 'Fill 3 quick steps to broadcast your animal to nearby farmers.',
    step1Title: '1. Animal & Breed',
    step2Title: '2. Price & Milk',
    step3Title: '3. Village & Phone',
    selectCategoryLabel: 'Select Animal Category',
    animalTitleLabel: 'Listing Headline',
    animalTitlePlaceholder: 'e.g. Pure Gir Cow, 2nd Calving',
    breedLabel: 'Breed Name',
    breedPlaceholder: 'e.g. Gir, Murrah, Sirohi, Marwari',
    ageYearsLabel: 'Age (Years)',
    milkPerDayLabel: 'Milk per Day (Liters)',
    expectedPriceLabel: 'Asking Price (₹)',
    villageCityLabel: 'Village & District',
    villageCityPlaceholder: 'e.g. Borsad, Anand',
    sellerNameLabel: 'Farmer Name',
    sellerPhoneLabel: 'Mobile Number',
    notesLabel: 'Health & Feeding Notes',
    notesPlaceholder: 'Milking time, calf details, vaccination...',
    nextStepBtn: 'Next Step',
    prevStepBtn: 'Back',
    publishListingBtn: 'Publish to Mandi Now',
    listingPublishedToast: 'Animal listed! Now visible in Mandi Feed & My Shed.',
    offersScreenTitle: 'Offers & Farmer Messages',
    offersScreenSubtitle: 'Direct price negotiations (Sauda) with animal owners.',
    activeNegotiations: 'Active Inquiries',
    typeMessagePlaceholder: 'Write message or offer to farmer...',
    sendBtn: 'Send',
    offerStatusPending: 'Offer Sent',
    offerStatusAccepted: 'Farmer Replied',
    acceptCounterBtn: 'Call to Finalize',
    accountScreenTitle: 'My Shed & App Settings',
    myListingsHeading: 'My Posted Animals',
    languageSettingsHeading: 'Select Regional Language',
    farmerProfileLabel: 'Registered Kisan Account · Verified Mobile',
    deleteListingBtn: 'Remove',
    markSoldBtn: 'Mark Sold',
    soldStatus: 'Sold Out',
    emptySavedTitle: 'No saved animals yet',
    emptySavedDesc: 'Tap the bookmark icon on any animal in the Mandi Feed to compare them here.',
    browseMarketBtn: 'Go to Mandi Feed',
    // Location Modal
    locationModalTitle: 'Set Your Location',
    locationModalSubtitle: 'Distances to dairy animals & livestock will be calculated from this district.',
    searchCityDistrict: 'Search city or district (e.g. Pune, Karnal)...',
    detectMyLocation: 'Use Current GPS Location',
    detectingLocation: 'Detecting your location...',
    popularDistricts: 'Popular Mandi Hubs',
    radiusFilterTitle: 'Marketplace Radius',
    radiusKm: (km: number) => `Within ${km} km`,
    allIndiaRadius: 'All India (No Limit)',
    applyLocationBtn: 'Set Location',
    distanceFromYou: (km: number) => `${km} km away`,
  },
  hi: {
    brandName: 'ग्राम शॉप',
    tabMarket: 'मंडी बाज़ार',
    tabSell: 'पशु बेचें',
    tabOffers: 'सौदा और चैट',
    tabSaved: 'पसंद किए',
    tabAccount: 'मेरा बाड़ा',
    currentLocation: 'आणंद, गुजरात',
    radiusLabel: '50 किमी के भीतर',
    searchPlaceholder: 'नस्ल (गीर, मुर्रा, सिरोही) या गाँव खोजें...',
    chooseLanguageLabel: 'ऐप की भाषा',
    categories: {
      all: 'सभी',
      cow: 'गाय',
      buffalo: 'भैंस',
      goat: 'बकरी',
      horse: 'घोड़ा',
      poultry: 'मुर्गी',
    },
    sortLabel: 'क्रम',
    sortOptions: {
      recent: 'नए पशु',
      priceLow: 'कम कीमत',
      priceHigh: 'ज़्यादा कीमत',
      nearest: 'सबसे पास',
    },
    verifiedOnlyToggle: 'टीकाकरण वाले',
    showingCount: (count) => `${count} पशु उपलब्ध हैं`,
    clearFilters: 'रीसेट',
    noResultsTitle: 'कोई पशु नहीं मिला',
    noResultsDesc: 'सभी पशु देखने के लिए फ़िल्टर हटाएं।',
    priceNegotiable: 'मोल-भाव संभव',
    fixedPrice: 'फिक्स दाम',
    milkYieldLabel: 'रोज़ का दूध',
    ageLabel: 'उम्र',
    weightLabel: 'क्षमता / वज़न',
    vaccinatedLabel: 'टीकाकरण पूरा',
    calvingLabel: 'ब्यात / स्थिति',
    locationLabel: 'गाँव',
    sellerLabel: 'किसान मालिक',
    verifiedSeller: 'सत्यापित पशुपालक',
    inspectBtn: 'जांचें',
    callSellerBtn: 'किसान को कॉल करें',
    chatSellerBtn: 'संदेश भेजें',
    makeOfferBtn: 'अपना भाव (सौदा) भेजें',
    offerSentSuccess: 'आपका भाव किसान को भेज दिया गया है!',
    enterOfferPlaceholder: 'अपना भाव ₹ में',
    submitOfferBtn: 'भाव भेजें',
    quickOfferLabel: 'तुरंत भाव चुनें:',
    saveListing: 'बचाएं',
    savedListing: 'सेव है',
    closePanel: 'बंद करें',
    sellScreenTitle: 'बेचने के लिए पशु दर्ज करें',
    sellScreenSubtitle: '3 आसान चरणों में अपने पशु की जानकारी पास के किसानों तक पहुंचाएं।',
    step1Title: '1. पशु और नस्ल',
    step2Title: '2. दाम और दूध',
    step3Title: '3. गाँव और नंबर',
    selectCategoryLabel: 'पशु चुनें',
    animalTitleLabel: 'विज्ञापन का शीर्षक',
    animalTitlePlaceholder: 'उदा. शुद्ध गीर गाय, दूसरा ब्यात',
    breedLabel: 'नस्ल का नाम',
    breedPlaceholder: 'उदा. गीर, मुर्रा, सिरोही, मारवाड़ी',
    ageYearsLabel: 'उम्र (वर्ष)',
    milkPerDayLabel: 'रोज़ का दूध (लीटर)',
    expectedPriceLabel: 'मांगी गई कीमत (₹)',
    villageCityLabel: 'गाँव और जिला',
    villageCityPlaceholder: 'उदा. करनाल, हरियाणा',
    sellerNameLabel: 'किसान का नाम',
    sellerPhoneLabel: 'मोबाइल नंबर',
    notesLabel: 'स्वास्थ्य और चारे की जानकारी',
    notesPlaceholder: 'दूध का समय, बछड़े और टीके की जानकारी...',
    nextStepBtn: 'आगे बढ़ें',
    prevStepBtn: 'पीछे',
    publishListingBtn: 'मंडी में प्रकाशित करें',
    listingPublishedToast: 'आपका पशु मंडी और "मेरा बाड़ा" में जुड़ गया है!',
    offersScreenTitle: 'सौदा और किसान चैट',
    offersScreenSubtitle: 'पशु मालिकों के साथ सीधी बातचीत और भाव-ताव।',
    activeNegotiations: 'चालू बातचीत',
    typeMessagePlaceholder: 'किसान को संदेश या भाव लिखें...',
    sendBtn: 'भेजें',
    offerStatusPending: 'भाव भेजा गया',
    offerStatusAccepted: 'किसान का जवाब',
    acceptCounterBtn: 'फोन पर पक्का करें',
    accountScreenTitle: 'मेरा बाड़ा और सेटिंग्स',
    myListingsHeading: 'मेरे दर्ज किए गए पशु',
    languageSettingsHeading: 'अपनी क्षेत्रीय भाषा चुनें',
    farmerProfileLabel: 'पंजीकृत किसान खाता · मोबाइल सत्यापित',
    deleteListingBtn: 'हटाएं',
    markSoldBtn: 'बिक गया',
    soldStatus: 'बिक चुका है',
    emptySavedTitle: 'कोई पशु सेव नहीं किया गया है',
    emptySavedDesc: 'मंडी बाज़ार में किसी भी पशु पर बुकमार्क दबाकर यहाँ तुलना करें।',
    browseMarketBtn: 'मंडी बाज़ार देखें',
    // Location Modal
    locationModalTitle: 'अपना स्थान चुनें',
    locationModalSubtitle: 'पशुओं और मंडियों की दूरी आपके चुने हुए जिले से नापी जाएगी।',
    searchCityDistrict: 'शहर या जिला खोजें (उदा. करनाल, पुणे)...',
    detectMyLocation: 'मेरा वर्तमान GPS स्थान इस्तेमाल करें',
    detectingLocation: 'स्थान का पता लगाया जा रहा है...',
    popularDistricts: 'प्रमुख मंडी क्षेत्र',
    radiusFilterTitle: 'दूरी की सीमा',
    radiusKm: (km: number) => `${km} किमी के भीतर`,
    allIndiaRadius: 'पूरे भारत में',
    applyLocationBtn: 'स्थान लागू करें',
    distanceFromYou: (km: number) => `${km} किमी दूर`,
  },
  gu: {
    brandName: 'ગ્રામ શોપ',
    tabMarket: 'મંડી બજાર',
    tabSell: 'પશુ વેચો',
    tabOffers: 'સોદો અને ચેટ',
    tabSaved: 'સાચવેલા',
    tabAccount: 'મારો તબેલો',
    currentLocation: 'આણંદ, ગુજરાત',
    radiusLabel: '50 કિમીની અંદર',
    searchPlaceholder: 'ઓલાદ (ગીર, મુર્રા, સિરોહી) કે ગામ શોધો...',
    chooseLanguageLabel: 'એપની ભાષા',
    categories: {
      all: 'બધા',
      cow: 'ગાય',
      buffalo: 'ભેંસ',
      goat: 'બકરી',
      horse: 'ઘોડો',
      poultry: 'મરઘી',
    },
    sortLabel: 'ક્રમ',
    sortOptions: {
      recent: 'નવા પશુ',
      priceLow: 'ઓછી કિંમત',
      priceHigh: 'વધુ કિંમત',
      nearest: 'સૌથી નજીક',
    },
    verifiedOnlyToggle: 'રસીકરણ થયેલા',
    showingCount: (count) => `${count} પશુઓ ઉપલબ્ધ`,
    clearFilters: 'રીસેટ',
    noResultsTitle: 'કોઈ પશુ મળ્યું નથી',
    noResultsDesc: 'વધુ પશુઓ જોવા માટે ફિલ્ટર બદલો.',
    priceNegotiable: 'ભાવમાં બાંધછોડ શક્ય',
    fixedPrice: 'ફિક્સ ભાવ',
    milkYieldLabel: 'રોજનું દૂધ',
    ageLabel: 'ઉંમર',
    weightLabel: 'ક્ષમતા / વજન',
    vaccinatedLabel: 'રસીકરણ પૂર્ણ',
    calvingLabel: 'વેતર / સ્થિતિ',
    locationLabel: 'ગામ',
    sellerLabel: 'પશુ માલિક',
    verifiedSeller: 'પ્રમાણિત ખેડૂત',
    inspectBtn: 'તપાસો',
    callSellerBtn: 'માલિકને ફોન કરો',
    chatSellerBtn: 'મેસેજ કરો',
    makeOfferBtn: 'તમારો ભાવ (સોદો) મોકલો',
    offerSentSuccess: 'તમારો ભાવ ખેડૂતને મોકલાઈ ગયો છે!',
    enterOfferPlaceholder: 'તમારો ભાવ ₹ માં',
    submitOfferBtn: 'ભાવ મોકલો',
    quickOfferLabel: 'ઝડપી ભાવ પસંદ કરો:',
    saveListing: 'સાચવો',
    savedListing: 'સાચવેલ',
    closePanel: 'બંધ કરો',
    sellScreenTitle: 'વેચાણ માટે પશુ મૂકો',
    sellScreenSubtitle: '3 સરળ પગલાંમાં તમારા પશુની માહિતી નજીકના ખેડૂતો સુધી પહોંચાડો.',
    step1Title: '1. પશુ અને ઓલાદ',
    step2Title: '2. કિંમત અને દૂધ',
    step3Title: '3. ગામ અને નંબર',
    selectCategoryLabel: 'પશુનો પ્રકાર પસંદ કરો',
    animalTitleLabel: 'જાહેરાતનું નામ',
    animalTitlePlaceholder: 'દા.ત. શુદ્ધ ગીર ગાય, બીજું વેતર',
    breedLabel: 'ઓલાદનું નામ',
    breedPlaceholder: 'દા.ત. ગીર, મુર્રા, સિરોહી, મારવાડી',
    ageYearsLabel: 'ઉંમર (વર્ષ)',
    milkPerDayLabel: 'રોજનું દૂધ (લીટર)',
    expectedPriceLabel: 'અપેક્ષિત કિંમત (₹)',
    villageCityLabel: 'ગામ અને જિલ્લો',
    villageCityPlaceholder: 'દા.ત. બોરસદ, આણંદ',
    sellerNameLabel: 'ખેડૂતનું નામ',
    sellerPhoneLabel: 'મોબાઈલ નંબર',
    notesLabel: 'સ્વાસ્થ્ય અને ખોરાકની વિગત',
    notesPlaceholder: 'દૂધનો સમય, વાછરડી અને રસીકરણની વિગત...',
    nextStepBtn: 'આગળ વધો',
    prevStepBtn: 'પાછા',
    publishListingBtn: 'મંડીમાં મૂકો',
    listingPublishedToast: 'તમારું પશુ મંડી બજાર અને "મારો તબેલો" માં મૂકાઈ ગયું છે!',
    offersScreenTitle: 'સોદો અને ખેડૂત ચેટ',
    offersScreenSubtitle: 'પશુ માલિકો સાથે સીધી વાતચીત અને ભાવ-તાલ.',
    activeNegotiations: 'ચાલુ વાતચીત',
    typeMessagePlaceholder: 'ખેડૂતને મેસેજ કે ભાવ લખો...',
    sendBtn: 'મોકલો',
    offerStatusPending: 'ભાવ મોકલ્યો',
    offerStatusAccepted: 'ખેડૂતનો જવાબ',
    acceptCounterBtn: 'ફોન કરીને નક્કી કરો',
    accountScreenTitle: 'મારો તબેલો અને સેટિંગ્સ',
    myListingsHeading: 'મારા મૂકેલા પશુઓ',
    languageSettingsHeading: 'તમારી ભાષા પસંદ કરો',
    farmerProfileLabel: 'નોંધાયેલ ખેડૂત ખાતું · મોબાઈલ પ્રમાણિત',
    deleteListingBtn: 'કાઢી નાખો',
    markSoldBtn: 'વેચાઈ ગયું',
    soldStatus: 'વેચાઈ ગયેલ',
    emptySavedTitle: 'કોઈ પશુ સાચવેલ નથી',
    emptySavedDesc: 'મંડી બજારમાં કોઈપણ પશુ પર બુકમાર્ક દબાવીને અહીં સરખામણી કરો.',
    browseMarketBtn: 'મંડી બજાર જુઓ',
    // Location Modal
    locationModalTitle: 'તમારું સ્થાન પસંદ કરો',
    locationModalSubtitle: 'પશુઓ અને મંડીઓનું અંતર તમારા પસંદ કરેલા જિલ્લાથી ગણવામાં આવશે.',
    searchCityDistrict: 'શહેર કે જિલ્લો શોધો (દા.ત. આણંદ, મહેસાણા)...',
    detectMyLocation: 'મારું હાલનું GPS સ્થાન વાપરો',
    detectingLocation: 'સ્થાન શોધાઈ રહ્યું છે...',
    popularDistricts: 'મુખ્ય મંડી વિસ્તારો',
    radiusFilterTitle: 'અંતર મર્યાદા',
    radiusKm: (km: number) => `${km} કિમીની અંદર`,
    allIndiaRadius: 'સમગ્ર ભારત',
    applyLocationBtn: 'સ્થાન લાગુ કરો',
    distanceFromYou: (km: number) => `${km} કિમી દૂર`,
  },
  mr: {
    brandName: 'ग्राम शॉप',
    tabMarket: 'मंडी बाजार',
    tabSell: 'जनावर विका',
    tabOffers: 'सौदा आणि चॅट',
    tabSaved: 'जतन केलेले',
    tabAccount: 'माझा गोठा',
    currentLocation: 'बारामती, पुणे',
    radiusLabel: '50 किमी परिसरात',
    searchPlaceholder: 'जात (गीर, मुऱ्हा, सिरोही) किंवा गाव शोधा...',
    chooseLanguageLabel: 'ॲपची भाषा',
    categories: {
      all: 'सर्व',
      cow: 'गाय',
      buffalo: 'म्हैस',
      goat: 'शेळी',
      horse: 'घोडा',
      poultry: 'कोंबडी',
    },
    sortLabel: 'क्रम',
    sortOptions: {
      recent: 'नवीन जनावरे',
      priceLow: 'कमी किंमत',
      priceHigh: 'जास्त किंमत',
      nearest: 'सर्वात जवळ',
    },
    verifiedOnlyToggle: 'लसीकरण झालेले',
    showingCount: (count) => `${count} जनावरे उपलब्ध`,
    clearFilters: 'रीसेट',
    noResultsTitle: 'कोणतेही जनावर सापडले नाही',
    noResultsDesc: 'अधिक जनावरे पाहण्यासाठी फिल्टर बदला.',
    priceNegotiable: 'किमतीत चर्चा शक्य',
    fixedPrice: 'फिक्स किंमत',
    milkYieldLabel: 'रोजचे दूध',
    ageLabel: 'वय',
    weightLabel: 'क्षमता / वजन',
    vaccinatedLabel: 'लसीकरण पूर्ण',
    calvingLabel: 'वेत / स्थिती',
    locationLabel: 'गाव',
    sellerLabel: 'शेतकरी मालक',
    verifiedSeller: 'सत्यापित शेतकरी',
    inspectBtn: 'तपासा',
    callSellerBtn: 'मालकाला कॉल करा',
    chatSellerBtn: 'मेसेज करा',
    makeOfferBtn: 'तुमची किंमत (सौदा) पाठवा',
    offerSentSuccess: 'तुमची ऑफर शेतकऱ्याला पाठवली आहे!',
    enterOfferPlaceholder: 'तुमची किंमत ₹ मध्ये',
    submitOfferBtn: 'ऑफर पाठवा',
    quickOfferLabel: 'झटपट ऑफर निवडा:',
    saveListing: 'जतन करा',
    savedListing: 'जतन केले',
    closePanel: 'बंद करा',
    sellScreenTitle: 'विक्रीसाठी जनावर नोंदवा',
    sellScreenSubtitle: '३ सोप्या टप्प्यात तुमच्या जनावराची माहिती जवळच्या शेतकऱ्यांपर्यंत पोहोचवा.',
    step1Title: '1. जनावर आणि जात',
    step2Title: '2. किंमत आणि दूध',
    step3Title: '3. गाव आणि नंबर',
    selectCategoryLabel: 'जनावराचा प्रकार निवडा',
    animalTitleLabel: 'जाहिरातीचे नाव',
    animalTitlePlaceholder: 'उदा. शुद्ध गीर गाय, दुसरे वेत',
    breedLabel: 'जातीचे नाव',
    breedPlaceholder: 'उदा. गीर, मुऱ्हा, सिरोही, मारवाडी',
    ageYearsLabel: 'वय (वर्षे)',
    milkPerDayLabel: 'रोजचे दूध (लिटर)',
    expectedPriceLabel: 'अपेक्षित किंमत (₹)',
    villageCityLabel: 'गाव आणि जिल्हा',
    villageCityPlaceholder: 'उदा. बारामती, पुणे',
    sellerNameLabel: 'शेतकऱ्याचे नाव',
    sellerPhoneLabel: 'मोबाईल नंबर',
    notesLabel: 'आरोग्य आणि चाऱ्याची माहिती',
    notesPlaceholder: 'दुधाची वेळ, वासरू आणि लसीकरणाची माहिती...',
    nextStepBtn: 'पुढे जा',
    prevStepBtn: 'मागे',
    publishListingBtn: 'मंडीमध्ये प्रसिद्ध करा',
    listingPublishedToast: 'तुमचे जनावर मंडी बाजार आणि "माझा गोठा" मध्ये जोडले गेले!',
    offersScreenTitle: 'सौदा आणि शेतकरी चॅट',
    offersScreenSubtitle: 'जनावर मालकांशी थेट चर्चा आणि व्यवहार.',
    activeNegotiations: 'सुरू असलेल्या चर्चा',
    typeMessagePlaceholder: 'शेतकऱ्याला मेसेज किंवा किंमत लिहा...',
    sendBtn: 'पाठवा',
    offerStatusPending: 'ऑफर पाठवली',
    offerStatusAccepted: 'शेतकऱ्याचे उत्तर',
    acceptCounterBtn: 'फोन करून पक्के करा',
    accountScreenTitle: 'माझा गोठा आणि सेटिंग्ज',
    myListingsHeading: 'माझी नोंदवलेली जनावरे',
    languageSettingsHeading: 'तुमची प्रादेशिक भाषा निवडा',
    farmerProfileLabel: 'नोंदणीकृत शेतकरी खाते · मोबाईल सत्यापित',
    deleteListingBtn: 'काढून टाका',
    markSoldBtn: 'विकले गेले',
    soldStatus: 'विक्री झाली',
    emptySavedTitle: 'कोणतेही जनावर जतन केलेले नाही',
    emptySavedDesc: 'मंडी बाजारातील कोणत्याही जनावरावर बुकमार्क दाबून येथे तुलना करा.',
    browseMarketBtn: 'मंडी बाजार पहा',
    // Location Modal
    locationModalTitle: 'तुमचे स्थान निवडा',
    locationModalSubtitle: 'जनावरे आणि बाजारांचे अंतर तुमच्या निवडलेल्या जिल्ह्यावरून मोजले जाईल.',
    searchCityDistrict: 'शहर किंवा जिल्हा शोधा (उदा. पुणे, बारामती, नाशिक)...',
    detectMyLocation: 'माझे चालू GPS स्थान वापरा',
    detectingLocation: 'स्थान शोधत आहे...',
    popularDistricts: 'प्रमुख मंडी क्षेत्र',
    radiusFilterTitle: 'अंतराची मर्यादा',
    radiusKm: (km: number) => `${km} किमी परिसरात`,
    allIndiaRadius: 'संपूर्ण भारत',
    applyLocationBtn: 'स्थान लागू करा',
    distanceFromYou: (km: number) => `${km} किमी दूर`,
  },
};
