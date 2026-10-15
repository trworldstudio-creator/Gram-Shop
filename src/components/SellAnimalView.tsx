import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { AnimalCategory, LanguageCode, UI_TRANSLATIONS } from '../data/translations';
import { AnimalListing, formatIndianPrice } from '../data/animals';
import { AnimalImage } from './AnimalImage';

interface SellAnimalViewProps {
  lang: LanguageCode;
  onPublish: (newListing: AnimalListing) => void;
}

const CATEGORY_DEFAULT_IMAGES: Record<Exclude<AnimalCategory, 'all'>, string> = {
  cow: '/src/assets/images/animal_gir_cow_1791226517983.jpg',
  buffalo: '/src/assets/images/animal_murrah_buffalo_1791226538706.jpg',
  goat: '/src/assets/images/animal_sirohi_goat_1791226553025.jpg',
  horse: '/src/assets/images/animal_marwari_horse_1791226565343.jpg',
  poultry: '/src/assets/images/animal_desi_poultry_1791226581510.jpg',
};

export const SellAnimalView: React.FC<SellAnimalViewProps> = ({
  lang,
  onPublish,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<Exclude<AnimalCategory, 'all'>>('cow');
  const [title, setTitle] = useState('');
  const [breed, setBreed] = useState('Gir');
  const [ageYears, setAgeYears] = useState('4');
  const [milkPerDay, setMilkPerDay] = useState('14');
  const [priceInr, setPriceInr] = useState('62000');
  const [vaccinated, setVaccinated] = useState(true);
  const [negotiable, setNegotiable] = useState(true);
  const [villageCity, setVillageCity] = useState('Anand, Gujarat');
  const [sellerName, setSellerName] = useState('Rameshbhai Patel');
  const [sellerPhone, setSellerPhone] = useState('98254 41209');
  const [notes, setNotes] = useState('');

  const t = UI_TRANSLATIONS[lang];

  const categoriesList: Exclude<AnimalCategory, 'all'>[] = [
    'cow',
    'buffalo',
    'goat',
    'horse',
    'poultry',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanBreed = breed.trim() || t.categories[category];
    const cleanTitle = title.trim() || `${cleanBreed} (${t.categories[category]})`;
    const cleanLocation = villageCity.trim() || 'Anand, Gujarat';
    const cleanSeller = sellerName.trim() || 'Rameshbhai Patel';
    const cleanPhone = sellerPhone.trim() || '98254 41209';
    const numericMilk = Number(milkPerDay) || 0;
    const numericPrice = Number(priceInr) || 45000;
    const numericAge = Number(ageYears) || 3;

    const milkOrWeightText =
      category === 'cow' || category === 'buffalo'
        ? {
            en: `${numericMilk} Liters / day`,
            hi: `${numericMilk} लीटर / दिन`,
            gu: `${numericMilk} લીટર / દિવસ`,
            mr: `${numericMilk} लिटर / दिवस`,
          }
        : {
            en: 'Healthy Farm Stock',
            hi: 'स्वस्थ फार्म पशु',
            gu: 'તંદુરસ્ત ફાર્મ પશુ',
            mr: 'निरोगी फार्म जनावर',
          };

    const newListing: AnimalListing = {
      id: `user-${Date.now()}`,
      category,
      image: CATEGORY_DEFAULT_IMAGES[category],
      priceInr: numericPrice,
      negotiable,
      ageYears: numericAge,
      milkLitersPerDay:
        category === 'cow' || category === 'buffalo' ? numericMilk : undefined,
      weightOrCountLabel: milkOrWeightText,
      title: {
        en: cleanTitle,
        hi: cleanTitle,
        gu: cleanTitle,
        mr: cleanTitle,
      },
      breed: {
        en: cleanBreed,
        hi: cleanBreed,
        gu: cleanBreed,
        mr: cleanBreed,
      },
      lactationOrStatus: {
        en: vaccinated ? 'Vaccinated & Healthy' : 'Healthy Condition',
        hi: vaccinated ? 'टीकाकरण पूरा और स्वस्थ' : 'स्वस्थ पशु',
        gu: vaccinated ? 'રસીકરણ પૂર્ણ અને તંદુરસ્ત' : 'તંદુરસ્ત પશુ',
        mr: vaccinated ? 'लसीकरण पूर्ण आणि निरोगी' : 'निरोगी जनावर',
      },
      location: {
        en: cleanLocation,
        hi: cleanLocation,
        gu: cleanLocation,
        mr: cleanLocation,
      },
      lat: 22.5645,
      lng: 72.9289,
      distanceKm: 2,
      vaccinated,
      verifiedSeller: true,
      sellerName: {
        en: cleanSeller,
        hi: cleanSeller,
        gu: cleanSeller,
        mr: cleanSeller,
      },
      sellerPhone: cleanPhone.startsWith('+91') ? cleanPhone : `+91 ${cleanPhone}`,
      postedAgo: {
        en: 'Just now',
        hi: 'अभी-अभी',
        gu: 'હમણાં જ',
        mr: 'आत्ताच',
      },
      description: {
        en: notes.trim() || `Healthy ${cleanBreed} available directly from farmer in ${cleanLocation}.`,
        hi: notes.trim() || `${cleanLocation} में किसान के पास स्वस्थ ${cleanBreed} बिक्री के लिए उपलब्ध है।`,
        gu: notes.trim() || `${cleanLocation} માં ખેડૂત પાસે તંદુરસ્ત ${cleanBreed} વેચાણ માટે ઉપલબ્ધ છે.`,
        mr: notes.trim() || `${cleanLocation} मधील शेतकऱ्याकडे निरोगी ${cleanBreed} विक्रीसाठी उपलब्ध आहे.`,
      },
    };

    onPublish(newListing);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#181D1A]">
          {t.sellScreenTitle}
        </h1>
        <p className="text-xs sm:text-sm text-[#525854] mt-0.5">
          {t.sellScreenSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive Step Form */}
        <div className="lg:col-span-7 bg-white border border-[#E7E2DA] rounded-2xl overflow-hidden">
          {/* Segmented Step Bar */}
          <div className="grid grid-cols-3 border-b border-[#E7E2DA] bg-[#FAF8F5] text-xs font-semibold">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setStep(num as 1 | 2 | 3)}
                className={`min-h-[44px] px-2 text-center border-b-2 transition-colors whitespace-nowrap truncate cursor-pointer ${
                  step === num
                    ? 'border-[#1B5E3A] text-[#1B5E3A] bg-white'
                    : 'border-transparent text-[#525854]'
                }`}
              >
                {num === 1 ? t.step1Title : num === 2 ? t.step2Title : t.step3Title}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#181D1A] mb-2">
                    {t.selectCategoryLabel}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {categoriesList.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`min-h-[48px] px-3.5 text-xs font-semibold rounded-xl border text-left transition-colors flex items-center justify-between cursor-pointer ${
                          category === cat
                            ? 'border-[#1B5E3A] bg-[#1B5E3A]/8 text-[#1B5E3A]'
                            : 'border-[#E7E2DA] bg-white text-[#181D1A] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span className="truncate">{t.categories[cat]}</span>
                        {category === cat && <Check className="w-4 h-4 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
                    {t.breedLabel}
                  </label>
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder={t.breedPlaceholder}
                    className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E7E2DA] rounded-xl focus:outline-none focus:border-[#1B5E3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
                    {t.animalTitleLabel}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t.animalTitlePlaceholder}
                    className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E7E2DA] rounded-xl focus:outline-none focus:border-[#1B5E3A]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="min-h-[44px] px-6 bg-[#1B5E3A] hover:bg-[#14472B] text-white text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{t.nextStepBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
                      {t.expectedPriceLabel}
                    </label>
                    <input
                      type="number"
                      min="500"
                      step="500"
                      value={priceInr}
                      onChange={(e) => setPriceInr(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E7E2DA] rounded-xl tabular-nums focus:outline-none focus:border-[#1B5E3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
                      {t.ageYearsLabel}
                    </label>
                    <input
                      type="number"
                      min="0.5"
                      max="25"
                      step="0.5"
                      value={ageYears}
                      onChange={(e) => setAgeYears(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E7E2DA] rounded-xl tabular-nums focus:outline-none focus:border-[#1B5E3A]"
                    />
                  </div>
                </div>

                {(category === 'cow' || category === 'buffalo') && (
                  <div>
                    <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
                      {t.milkPerDayLabel}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="40"
                      value={milkPerDay}
                      onChange={(e) => setMilkPerDay(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E7E2DA] rounded-xl tabular-nums focus:outline-none focus:border-[#1B5E3A]"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="min-h-[44px] inline-flex items-center gap-2 text-sm text-[#181D1A] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vaccinated}
                      onChange={(e) => setVaccinated(e.target.checked)}
                      className="w-4 h-4 accent-[#1B5E3A] rounded"
                    />
                    <span>{t.vaccinatedLabel}</span>
                  </label>

                  <label className="min-h-[44px] inline-flex items-center gap-2 text-sm text-[#181D1A] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={negotiable}
                      onChange={(e) => setNegotiable(e.target.checked)}
                      className="w-4 h-4 accent-[#1B5E3A] rounded"
                    />
                    <span>{t.priceNegotiable}</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
                    {t.notesLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.notesPlaceholder}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E7E2DA] rounded-xl focus:outline-none focus:border-[#1B5E3A]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="min-h-[44px] px-4 border border-[#E7E2DA] text-xs sm:text-sm font-semibold text-[#181D1A] rounded-xl hover:bg-[#FAF8F5] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t.prevStepBtn}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="min-h-[44px] px-6 bg-[#1B5E3A] hover:bg-[#14472B] text-white text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{t.nextStepBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
                    {t.villageCityLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={villageCity}
                    onChange={(e) => setVillageCity(e.target.value)}
                    placeholder={t.villageCityPlaceholder}
                    className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E7E2DA] rounded-xl focus:outline-none focus:border-[#1B5E3A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
                      {t.sellerNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E7E2DA] rounded-xl focus:outline-none focus:border-[#1B5E3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
                      {t.sellerPhoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={sellerPhone}
                      onChange={(e) => setSellerPhone(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border border-[#E7E2DA] rounded-xl tabular-nums focus:outline-none focus:border-[#1B5E3A]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="min-h-[44px] px-4 border border-[#E7E2DA] text-xs sm:text-sm font-semibold text-[#181D1A] rounded-xl hover:bg-[#FAF8F5] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t.prevStepBtn}</span>
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-6 bg-[#1B5E3A] hover:bg-[#14472B] text-white text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.publishListingBtn}</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Live App Card Preview */}
        <div className="lg:col-span-5 bg-white border border-[#E7E2DA] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E7E2DA] bg-[#FAF8F5] text-xs font-semibold text-[#525854]">
            Live Mandi Card Preview
          </div>
          <div className="p-4">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F2EFE9] mb-3.5">
              <AnimalImage
                src={CATEGORY_DEFAULT_IMAGES[category]}
                alt={title || breed}
                category={category}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#525854] tabular-nums">
              <span className="font-semibold text-[#1B5E3A]">
                {breed || t.categories[category]}
              </span>
              <span aria-hidden="true">·</span>
              <span>{ageYears || '3'} Yrs</span>
              {(category === 'cow' || category === 'buffalo') && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#181D1A]">
                    {milkPerDay || '12'} L/day
                  </span>
                </>
              )}
            </div>

            <h3 className="mt-1 text-base font-semibold text-[#181D1A] truncate">
              {title || `${breed || t.categories[category]}`}
            </h3>

            <div className="mt-1 text-xs text-[#525854]">
              {villageCity || 'Anand, Gujarat'}
            </div>

            <div className="mt-3 pt-3 border-t border-[#E7E2DA] flex items-baseline justify-between">
              <span className="text-xl font-bold text-[#181D1A] tabular-nums">
                {formatIndianPrice(Number(priceInr) || 0)}
              </span>
              <span className="text-xs text-[#15803D] font-medium">
                {vaccinated ? t.vaccinatedLabel : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
