import { AnimalCategory, LanguageCode } from './translations';

export interface LocalizedText {
  en: string;
  hi: string;
  gu: string;
  mr: string;
}

export interface AnimalListing {
  id: string;
  category: Exclude<AnimalCategory, 'all'>;
  image: string;
  priceInr: number;
  negotiable: boolean;
  ageYears: number;
  milkLitersPerDay?: number;
  weightOrCountLabel: LocalizedText;
  title: LocalizedText;
  breed: LocalizedText;
  lactationOrStatus: LocalizedText;
  location: LocalizedText;
  lat: number;
  lng: number;
  distanceKm: number;
  vaccinated: boolean;
  verifiedSeller: boolean;
  sellerName: LocalizedText;
  sellerPhone: string;
  postedAgo: LocalizedText;
  description: LocalizedText;
}

export const INITIAL_ANIMALS: AnimalListing[] = [
  {
    id: 'gir-cow-anand',
    category: 'cow',
    image: '/src/assets/images/animal_gir_cow_1791226517983.jpg',
    priceInr: 68000,
    negotiable: true,
    ageYears: 4,
    milkLitersPerDay: 14,
    weightOrCountLabel: {
      en: '14 Liters / day',
      hi: '14 लीटर / दिन',
      gu: '14 લીટર / દિવસ',
      mr: '14 लिटर / दिवस',
    },
    title: {
      en: 'Pure Swarna Kapila Gir Cow (2nd Lactation)',
      hi: 'शुद्ध गीर गाय (दूसरा ब्यात, शांत स्वभाव)',
      gu: 'શુદ્ધ ગીર ગાય (બીજું વેતર, શાંત સ્વભાવ)',
      mr: 'शुद्ध गीर गाय (दुसरे वेत, शांत स्वभाव)',
    },
    breed: {
      en: 'Pure Gir',
      hi: 'शुद्ध गीर (Gir)',
      gu: 'શુદ્ધ ગીર (Gir)',
      mr: 'शुद्ध गीर (Gir)',
    },
    lactationOrStatus: {
      en: '2nd Calving · Delivered 18 days ago',
      hi: 'दूसरा ब्यात · 18 दिन पहले ब्याई',
      gu: 'બીજું વેતર · 18 દિવસ પહેલાં વિયાયેલ',
      mr: 'दुसरे वेत · 18 दिवसांपूर्वी व्यालेली',
    },
    location: {
      en: 'Borsad, Anand, Gujarat',
      hi: 'बोरसद, आणंद, गुजरात',
      gu: 'બોરસદ, આણંદ, ગુજરાત',
      mr: 'बोरसद, आणंद, गुजरात',
    },
    lat: 22.4131,
    lng: 72.9015,
    distanceKm: 12,
    vaccinated: true,
    verifiedSeller: true,
    sellerName: {
      en: 'Rameshbhai Patel',
      hi: 'रमेशभाई पटेल',
      gu: 'રમેશભાઈ પટેલ',
      mr: 'रमेशभाई पटेल',
    },
    sellerPhone: '+91 98254 41209',
    postedAgo: {
      en: '3 hours ago',
      hi: '3 घंटे पहले',
      gu: '3 કલાક પહેલાં',
      mr: '3 तासांपूर्वी',
    },
    description: {
      en: 'Healthy A2 milk Gir cow with female calf. Gives 7 liters in the morning and 7 liters in the evening. Very gentle for hand milking and completely FMD vaccinated.',
      hi: 'स्वस्थ बछिया के साथ शुद्ध गीर गाय। सुबह 7 लीटर और शाम को 7 लीटर दूध देती है। हाथ से दूध निकालने में बिल्कुल शांत और सभी टीके लगे हैं।',
      gu: 'તંદુરસ્ત વાછરડી સાથે શુદ્ધ ગીર ગાય. સવારે 7 લીટર અને સાંજે 7 લીટર દૂધ આપે છે. દોહવામાં એકદમ શાંત અને તમામ રસી મૂકાવેલ છે.',
      mr: 'निरोगी कालवडीसह शुद्ध गीर गाय. सकाळी ७ लिटर आणि संध्याकाळी ७ लिटर दूध देते. हाताने धार काढण्यास अतिशय शांत आणि लसीकरण पूर्ण.',
    },
  },
  {
    id: 'murrah-buffalo-karnal',
    category: 'buffalo',
    image: '/src/assets/images/animal_murrah_buffalo_1791226538706.jpg',
    priceInr: 92000,
    negotiable: true,
    ageYears: 5,
    milkLitersPerDay: 18,
    weightOrCountLabel: {
      en: '18 Liters / day',
      hi: '18 लीटर / दिन',
      gu: '18 લીટર / દિવસ',
      mr: '18 लिटर / दिवस',
    },
    title: {
      en: 'Haryana Murrah Dairy Buffalo (High Fat Milk)',
      hi: 'हरियाणा मुर्रा भैंस (18 लीटर दूध, तीसरा ब्यात)',
      gu: 'હરિયાણા મુર્રા ભેંસ (18 લીટર દૂધ, ત્રીજું વેતર)',
      mr: 'हरियाणा मुऱ्हा म्हैस (18 लिटर दूध, तिसरे वेत)',
    },
    breed: {
      en: 'Murrah Buffalo',
      hi: 'मुर्रा (Murrah)',
      gu: 'મુર્રા (Murrah)',
      mr: 'मुऱ्हा (Murrah)',
    },
    lactationOrStatus: {
      en: '3rd Calving · 8.2% Milk Fat',
      hi: 'तीसरा ब्यात · गाढ़ा फैट वाला दूध',
      gu: 'ત્રીજું વેતર · ઊંચા ફેટવાળું દૂધ',
      mr: 'तिसरे वेत · जास्त फॅटचे दूध',
    },
    location: {
      en: 'Gharaunda, Karnal, Haryana',
      hi: 'घरौंडा, करनाल, हरियाणा',
      gu: 'ઘરૌંડા, કરનાલ, હરિયાણા',
      mr: 'घरौंडा, करनाल, हरियाणा',
    },
    lat: 29.5393,
    lng: 76.9734,
    distanceKm: 28,
    vaccinated: true,
    verifiedSeller: true,
    sellerName: {
      en: 'Surender Singh',
      hi: 'सुरेंद्र सिंह',
      gu: 'સુરેન્દ્ર સિંહ',
      mr: 'सुरेंद्र सिंह',
    },
    sellerPhone: '+91 94162 88310',
    postedAgo: {
      en: '6 hours ago',
      hi: '6 घंटे पहले',
      gu: '6 કલાક પહેલાં',
      mr: '6 तासांपूर्वी',
    },
    description: {
      en: 'Jet-black pure Murrah buffalo with tightly curved ring horns. Produces 18 liters daily across two milkings. Buyer can visit farm and check two-time milking in person.',
      hi: 'गोल सींग वाली शुद्ध काली मुर्रा भैंस। दोनों समय मिलाकर 18 लीटर दूध तैयार है। खरीददार डेयरी पर आकर दो टाइम का दूध नाप कर ले जा सकते हैं।',
      gu: 'ગોળ શિંગડાવાળી શુદ્ધ કાળી મુર્રા ભેંસ. બંને ટાઈમ મળીને 18 લીટર દૂધ તૈયાર છે. ખરીદનાર રૂબરૂ આવીને બે ટાઈમ દૂધ માપીને લઈ જઈ શકે છે.',
      mr: 'गोल शिंगांची शुद्ध काळी मुऱ्हा म्हैस. दोन्ही वेळचे मिळून १८ लिटर दूध तयार आहे. खरेदीदार प्रत्यक्ष येऊन दोन वेळेची धार पाहून खरेदी करू शकतात.',
    },
  },
  {
    id: 'sirohi-goat-baramati',
    category: 'goat',
    image: '/src/assets/images/animal_sirohi_goat_1791226553025.jpg',
    priceInr: 14500,
    negotiable: true,
    ageYears: 1.5,
    weightOrCountLabel: {
      en: '38 kg Live Weight',
      hi: '38 किलो वज़न',
      gu: '38 કિલો વજન',
      mr: '38 किलो वजन',
    },
    title: {
      en: 'Healthy Sirohi Breeding Goat (PPR Vaccinated)',
      hi: 'स्वस्थ सिरोही बकरी (फार्म पाली हुई, 38 किलो)',
      gu: 'તંદુરસ્ત સિરોહી બકરી (ફાર્મ ઉછેર, 38 કિલો)',
      mr: 'निरोगी सिरोही शेळी (फार्मवरील, ३८ किलो वजन)',
    },
    breed: {
      en: 'Sirohi',
      hi: 'सिरोही (Sirohi)',
      gu: 'સિરોહી (Sirohi)',
      mr: 'सिरोही (Sirohi)',
    },
    lactationOrStatus: {
      en: '2.5 Months Pregnant · Twin Bloodline',
      hi: '2.5 महीने गाभिन · जुड़वां बच्चों की नस्ल',
      gu: '2.5 મહિના ગાભણ · જોડિયા બચ્ચાની ઓલાદ',
      mr: '२.५ महिने गाभण · जुळी करडे देणारी जात',
    },
    location: {
      en: 'Baramati, Pune, Maharashtra',
      hi: 'बारामती, पुणे, महाराष्ट्र',
      gu: 'બારામતી, પુણે, મહારાષ્ટ્ર',
      mr: 'बारामती, पुणे, महाराष्ट्र',
    },
    lat: 18.1519,
    lng: 74.5771,
    distanceKm: 9,
    vaccinated: true,
    verifiedSeller: true,
    sellerName: {
      en: 'Dattatray Pawar',
      hi: 'दत्तात्रय पवार',
      gu: 'દત્તાત્રય પવાર',
      mr: 'दत्तात्रय पवार',
    },
    sellerPhone: '+91 98903 55172',
    postedAgo: {
      en: '1 day ago',
      hi: '1 दिन पहले',
      gu: '1 દિવસ પહેલાં',
      mr: '१ दिवसापूर्वी',
    },
    description: {
      en: 'Well-fed Sirohi female goat adapted to both stall-feeding and open grazing. PPR and ET vaccines completed with vet card available.',
      hi: 'हरा चारा और सूखा चारा दोनों खाने वाली स्वस्थ सिरोही बकरी। पीपीआर (PPR) और ईटी (ET) का टीका लगा हुआ है।',
      gu: 'લીલો અને સૂકો બંને ચારો ખાતી તંદુરસ્ત સિરોહી બકરી. PPR અને ET ની રસી મૂકાવેલ છે.',
      mr: 'हिरवा आणि सुका दोन्ही चारा खाणारी निरोगी सिरोही शेळी. PPR आणि ET लसीकरण पूर्ण झाले आहे.',
    },
  },
  {
    id: 'marwari-horse-jodhpur',
    category: 'horse',
    image: '/src/assets/images/animal_marwari_horse_1791226565343.jpg',
    priceInr: 145000,
    negotiable: true,
    ageYears: 3.5,
    weightOrCountLabel: {
      en: '62 Inch Height',
      hi: '62 इंच ऊंचाई',
      gu: '62 ઈંચ ઊંચાઈ',
      mr: '62 इंच उंची',
    },
    title: {
      en: 'Chestnut Marwari Mare (Kundal Ears, Trained)',
      hi: 'चेस्टनट मारवाड़ी घोड़ी (कुंडल कान, सवारी के लिए तैयार)',
      gu: 'ચેસ્ટનટ મારવાડી ઘોડી (કુંડળ કાન, સવારી માટે તૈયાર)',
      mr: 'चेस्टनट मारवाडी घोडी (कुंडल कान, सवारीसाठी तयार)',
    },
    breed: {
      en: 'Marwari',
      hi: 'मारवाड़ी (Marwari)',
      gu: 'મારવાડી (Marwari)',
      mr: 'मारवाडी (Marwari)',
    },
    lactationOrStatus: {
      en: '62 Inches · Clear Blaze & 2 White Socks',
      hi: '62 इंच कद · बाल-भंवरी से बिल्कुल शुद्ध',
      gu: '62 ઈંચ ઊંચાઈ · ભમરીથી બિલકુલ શુદ્ધ',
      mr: '६२ इंच उंची · भवऱ्यांनी पूर्णपणे शुद्ध',
    },
    location: {
      en: 'Pipar City, Jodhpur, Rajasthan',
      hi: 'पीपाड़ सिटी, जोधपुर, राजस्थान',
      gu: 'પીપાડ સિટી, જોધપુર, રાજસ્થાન',
      mr: 'पिपाड सिटी, जोधपूर, राजस्थान',
    },
    lat: 26.3912,
    lng: 73.5413,
    distanceKm: 42,
    vaccinated: true,
    verifiedSeller: true,
    sellerName: {
      en: 'Vikram Singh Rathore',
      hi: 'विक्रम सिंह राठौड़',
      gu: 'વિક્રમ સિંહ રાઠોડ',
      mr: 'विक्रम सिंह राठोड',
    },
    sellerPhone: '+91 94141 73920',
    postedAgo: {
      en: '1 day ago',
      hi: '1 दिन पहले',
      gu: '1 દિવસ પહેલાં',
      mr: '१ दिवसापूर्वी',
    },
    description: {
      en: 'Graceful 3.5-year-old Marwari mare with touching inward-curved ears and smooth Rewal gait. Completely calm on roads and ceremonial events.',
      hi: '3.5 साल की सुंदर मारवाड़ी घोड़ी, आपस में मिलने वाले कुंडल कान और शानदार रेवाल चाल। शादी-ब्याह और सवारी के लिए एकदम शांत।',
      gu: '3.5 વર્ષની સુંદર મારવાડી ઘોડી, અંદર વળેલા કુંડળ કાન અને સરસ રેવાલ ચાલ. સવારી અને પ્રસંગો માટે એકદम શાંત.',
      mr: '३.५ वर्षांची सुंदर मारवाडी घोडी, आतून मिळणारे कुंडल कान आणि उत्तम रेवाल चाल. सवारीसाठी अतिशय शांत.',
    },
  },
  {
    id: 'desi-poultry-nashik',
    category: 'poultry',
    image: '/src/assets/images/animal_desi_poultry_1791226581510.jpg',
    priceInr: 8500,
    negotiable: false,
    ageYears: 1,
    weightOrCountLabel: {
      en: 'Flock of 20 Birds',
      hi: '20 देसी मुर्गियों का सेट',
      gu: '20 દેશી મરઘીનું જૂથ',
      mr: '२० गावरान कोंबड्यांचा संच',
    },
    title: {
      en: 'Free-Range Gavran Desi Hens & Roosters (Set of 20)',
      hi: 'शुद्ध गावरान देसी मुर्गी और मुर्गे (20 नग का सेट)',
      gu: 'શુદ્ધ દેશી મરઘી અને મરઘા (20 નંગનો સેટ)',
      mr: 'अस्सल गावरान कोंबड्या आणि कोंबडे (२० नगांचा संच)',
    },
    breed: {
      en: 'Gavran Desi',
      hi: 'देसी गावरान',
      gu: 'દેશી ગાવરાન',
      mr: 'अस्सल गावरान',
    },
    lactationOrStatus: {
      en: '17 Laying Hens + 3 Roosters · Ranikhet Vaccinated',
      hi: '17 अंडे देने वाली मुर्गियां + 3 मुर्गे',
      gu: '17 ઈંડા આપતી મરઘી + 3 મરઘા',
      mr: '१७ अंडी देणाऱ्या कोंबड्या + ३ कोंबडे',
    },
    location: {
      en: 'Niphad, Nashik, Maharashtra',
      hi: 'निफाड़, नासिक, महाराष्ट्र',
      gu: 'નિફાડ, નાશિક, મહારાષ્ટ્ર',
      mr: 'निफाड, नाशिक, महाराष्ट्र',
    },
    lat: 20.0894,
    lng: 74.1133,
    distanceKm: 16,
    vaccinated: true,
    verifiedSeller: true,
    sellerName: {
      en: 'Santosh Shinde',
      hi: 'संतोष शिंदे',
      gu: 'સંતોષ શિંદે',
      mr: 'संतोष शिंदे',
    },
    sellerPhone: '+91 97654 21840',
    postedAgo: {
      en: '2 days ago',
      hi: '2 दिन पहले',
      gu: '2 દિવસ પહેલાં',
      mr: '२ दिवसांपूर्वी',
    },
    description: {
      en: 'Natural farm-raised country chickens fed on millet, corn, and kitchen greens. High immunity, active laying cycle, ready for backyard or farm multiplication.',
      hi: 'बाजरा, मक्का और हरी घास पर पली हुई देसी मुर्गियां। बीमारी से मजबूत और रोज़ देसी अंडे देने के लिए तैयार।',
      gu: 'બાજરી, મકાઈ અને લીલા ચારા પર ઉછરેલી દેશી મરઘીઓ. રોગપ્રતિકારક શક્તિ વધુ અને રોજ દેશी ઈંડા આપવા તૈયાર.',
      mr: 'बाजरी, मका आणि हिरव्या चाऱ्यावर वाढलेल्या अस्सल गावरान कोंबड्या. उत्तम रोगप्रतिकारक शक्ती आणि अंडी उत्पादनासाठी तयार.',
    },
  },
  {
    id: 'sahiwal-cow-hisar',
    category: 'cow',
    image: '/src/assets/images/animal_gir_cow_1791226517983.jpg',
    priceInr: 56000,
    negotiable: true,
    ageYears: 3.5,
    milkLitersPerDay: 12,
    weightOrCountLabel: {
      en: '12 Liters / day',
      hi: '12 लीटर / दिन',
      gu: '12 લીટર / દિવસ',
      mr: '12 लिटर / दिवस',
    },
    title: {
      en: 'Pure Red Sahiwal Dairy Cow (1st Calving)',
      hi: 'शुद्ध लाल साहिवाल गाय (पहला ब्यात, 12 लीटर दूध)',
      gu: 'શુદ્ધ લાલ સાહિવાલ ગાય (પહેલું વેતર, 12 લીટર દૂધ)',
      mr: 'शुद्ध लाल साहिवाल गाय (पहिले वेत, १२ लिटर दूध)',
    },
    breed: {
      en: 'Sahiwal',
      hi: 'साहिवाल (Sahiwal)',
      gu: 'સાહિવાલ (Sahiwal)',
      mr: 'साहिवाल (Sahiwal)',
    },
    lactationOrStatus: {
      en: '1st Calving · Very Docile Temperament',
      hi: 'पहला ब्यात · घर के लिए बहुत शांत',
      gu: 'પહેલું વેતર · ઘર માટે ખૂબ શાંત',
      mr: 'पहिले वेत · घरगुती गोठ्यासाठी अतिशय शांत',
    },
    location: {
      en: 'Palanpur, Banaskantha, Gujarat',
      hi: 'पालनपुर, बनासकांठा, गुजरात',
      gu: 'પાલનપુર, બનાસકાંઠા, ગુજરાત',
      mr: 'पालनपूर, बनासकांठा, गुजरात',
    },
    lat: 24.1724,
    lng: 72.4346,
    distanceKm: 19,
    vaccinated: true,
    verifiedSeller: true,
    sellerName: {
      en: 'Kantibhai Chaudhary',
      hi: 'कांतिभाई चौधरी',
      gu: 'કાંતિભાઈ ચૌધરી',
      mr: 'कांतीभाई चौधरी',
    },
    sellerPhone: '+91 99241 60412',
    postedAgo: {
      en: '2 days ago',
      hi: '2 दिन पहले',
      gu: '2 દિવસ પહેલાં',
      mr: '२ दिवसांपूर्वी',
    },
    description: {
      en: 'First-timer Sahiwal cow with sweet high-fat milk. Eats regular dry fodder and green chaff easily. Ideal for family dairy use.',
      hi: 'पहली बार ब्याई हुई साहिवाल गाय। मीठा और गाढ़ा दूध। घर या डेयरी दोनों के लिए सबसे बढ़िया।',
      gu: 'પહેલા વેતરની સાહિવાલ ગાય. મીઠું અને ઘટ્ટ દૂધ. ઘર કે ડેરી બંને માટે ઉત્તમ.',
      mr: 'पहिल्या वेताची साहिवाल गाय. गोड आणि घट्ट दूध. घरगुती किंवा डेअरी व्यवसायासाठी उत्तम.',
    },
  },
];

export function formatIndianPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
