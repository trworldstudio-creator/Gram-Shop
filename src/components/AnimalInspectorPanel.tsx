import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  X,
  Check,
  Bookmark,
  MapPin,
  ShieldCheck,
  Copy,
  Send,
} from 'lucide-react';
import { AnimalListing, formatIndianPrice } from '../data/animals';
import { LanguageCode, UI_TRANSLATIONS } from '../data/translations';
import { AnimalImage } from './AnimalImage';

interface AnimalInspectorPanelProps {
  animal: AnimalListing;
  lang: LanguageCode;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
  onSendOffer: (animal: AnimalListing, offerAmountInr: number) => void;
  onOpenChat: (animal: AnimalListing) => void;
}

export const AnimalInspectorPanel: React.FC<AnimalInspectorPanelProps> = ({
  animal,
  lang,
  isSaved,
  onToggleSave,
  onClose,
  onSendOffer,
  onOpenChat,
}) => {
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customOffer, setCustomOffer] = useState('');
  const [sentNotice, setSentNotice] = useState<number | null>(null);

  useEffect(() => {
    setShowPhone(false);
    setCopied(false);
    setCustomOffer('');
    setSentNotice(null);
  }, [animal.id]);

  const t = UI_TRANSLATIONS[lang];

  // Calculate 3 sensible quick-tap offers around asking price
  const quickOffers = [
    Math.round((animal.priceInr * 0.9) / 500) * 500,
    Math.round((animal.priceInr * 0.95) / 500) * 500,
    animal.priceInr,
  ];

  const handleTriggerOffer = (amount: number) => {
    if (!amount || amount <= 0) return;
    onSendOffer(animal, amount);
    setSentNotice(amount);
    setCustomOffer('');
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(animal.sellerPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-[#E7E2DA]">
      {/* App Sheet / Inspector Top Header */}
      <div className="h-14 px-4 border-b border-[#E7E2DA] flex items-center justify-between shrink-0 bg-[#FAF8F5]">
        <div className="flex items-center gap-2 text-xs text-[#525854] truncate">
          <span className="font-semibold text-[#181D1A]">{animal.breed[lang]}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{animal.distanceKm} km</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onToggleSave(animal.id)}
            className="min-h-[38px] px-3 rounded-lg border border-[#E7E2DA] bg-white hover:bg-[#F2EFE9] inline-flex items-center gap-1.5 text-xs font-semibold text-[#181D1A] transition-colors cursor-pointer"
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${
                isSaved ? 'fill-[#1B5E3A] text-[#1B5E3A]' : 'text-[#525854]'
              }`}
            />
            <span>{isSaved ? t.savedListing : t.saveListing}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.closePanel}
            className="min-h-[38px] min-w-[38px] rounded-lg border border-[#E7E2DA] bg-white hover:bg-[#F2EFE9] flex items-center justify-center text-[#181D1A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Inspector Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
        {/* 4:3 Photo Frame */}
        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F2EFE9]">
          <AnimalImage
            src={animal.image}
            alt={animal.title[lang]}
            category={animal.category}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Price & Primary Title */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-2xl font-bold text-[#181D1A] tabular-nums tracking-tight">
              {formatIndianPrice(animal.priceInr)}
            </span>
            <span className="text-xs text-[#525854]">
              {animal.negotiable ? t.priceNegotiable : t.fixedPrice}
            </span>
          </div>

          <h2 className="mt-1.5 text-base sm:text-lg font-semibold text-[#181D1A] leading-snug">
            {animal.title[lang]}
          </h2>

          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#525854]">
            <MapPin className="w-3.5 h-3.5 text-[#C86D1F] shrink-0" />
            <span>{animal.location[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>{animal.postedAgo[lang]}</span>
          </div>
        </div>

        {/* Clean Hairline Spec Table (No nested pill boxes) */}
        <div className="border-y border-[#E7E2DA] py-3.5 grid grid-cols-3 gap-3 text-xs">
          <div>
            <div className="text-[#525854]">{t.breedLabel}</div>
            <div className="font-semibold text-[#181D1A] mt-0.5 truncate">
              {animal.breed[lang]}
            </div>
          </div>
          <div>
            <div className="text-[#525854]">{t.ageLabel}</div>
            <div className="font-semibold text-[#181D1A] tabular-nums mt-0.5">
              {animal.ageYears}{' '}
              {lang === 'en' ? 'Yrs' : lang === 'hi' ? 'वर्ष' : lang === 'gu' ? 'વર્ષ' : 'वर्षे'}
            </div>
          </div>
          <div>
            <div className="text-[#525854]">
              {animal.milkLitersPerDay ? t.milkYieldLabel : t.weightLabel}
            </div>
            <div className="font-semibold text-[#1B5E3A] tabular-nums mt-0.5 truncate">
              {animal.weightOrCountLabel[lang]}
            </div>
          </div>
        </div>

        {/* Health & Lactation Row */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#525854]">
            <span>{t.calvingLabel}</span>
            <span className="font-semibold text-[#181D1A]">
              {animal.lactationOrStatus[lang]}
            </span>
          </div>
          {animal.vaccinated && (
            <div className="flex items-center justify-between text-[#15803D] font-medium pt-1">
              <span>Health Check</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.vaccinatedLabel}
              </span>
            </div>
          )}
        </div>

        {/* Farmer / Owner Notes */}
        <div className="pt-2 border-t border-[#E7E2DA]">
          <p className="text-xs sm:text-sm text-[#525854] leading-relaxed">
            {animal.description[lang]}
          </p>
        </div>

        {/* Interactive Instant Price Offer (Sauda) Box */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#181D1A]">
              {t.makeOfferBtn}
            </span>
            <span className="text-[11px] text-[#525854]">{t.quickOfferLabel}</span>
          </div>

          {/* 3 Quick-Tap Offer Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {quickOffers.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleTriggerOffer(amt)}
                className="min-h-[40px] py-1.5 px-2 text-xs font-semibold tabular-nums rounded-lg border border-[#E7E2DA] bg-white hover:border-[#1B5E3A] hover:text-[#1B5E3A] transition-colors cursor-pointer"
              >
                {formatIndianPrice(amt)}
              </button>
            ))}
          </div>

          {sentNotice ? (
            <div className="p-2.5 rounded-lg bg-[#15803D]/10 text-[#15803D] text-xs font-medium flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 shrink-0" />
                {t.offerSentSuccess} ({formatIndianPrice(sentNotice)})
              </span>
              <button
                type="button"
                onClick={() => onOpenChat(animal)}
                className="underline font-semibold whitespace-nowrap cursor-pointer"
              >
                {t.chatSellerBtn}
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const val = Number(customOffer.replace(/[^0-9]/g, ''));
                handleTriggerOffer(val);
              }}
              className="flex gap-2"
            >
              <input
                type="number"
                min="500"
                step="500"
                value={customOffer}
                onChange={(e) => setCustomOffer(e.target.value)}
                placeholder={t.enterOfferPlaceholder}
                className="flex-1 min-w-0 px-3 py-2 text-xs bg-white border border-[#E7E2DA] rounded-lg tabular-nums focus:outline-none focus:border-[#1B5E3A]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#C86D1F] hover:bg-[#b05d16] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.submitOfferBtn}</span>
              </button>
            </form>
          )}
        </div>

        {/* Farmer Verification Row */}
        <div className="pt-2 flex items-center justify-between text-xs">
          <div>
            <div className="text-[#525854]">{t.sellerLabel}</div>
            <div className="font-semibold text-[#181D1A] text-sm mt-0.5">
              {animal.sellerName[lang]}
            </div>
          </div>
          {animal.verifiedSeller && (
            <span className="text-[#15803D] font-medium inline-flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              {t.verifiedSeller}
            </span>
          )}
        </div>
      </div>

      {/* Pinned Bottom Action Bar inside Inspector */}
      <div className="p-4 border-t border-[#E7E2DA] bg-[#FAF8F5] grid grid-cols-2 gap-2.5 shrink-0">
        <button
          type="button"
          onClick={() => onOpenChat(animal)}
          className="min-h-[44px] px-3 bg-white hover:bg-[#F2EFE9] text-[#181D1A] border border-[#E7E2DA] rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-[#1B5E3A]" />
          <span>{t.chatSellerBtn}</span>
        </button>

        {!showPhone ? (
          <button
            type="button"
            onClick={() => setShowPhone(true)}
            className="min-h-[44px] px-3 bg-[#1B5E3A] hover:bg-[#14472B] text-white rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>{t.callSellerBtn}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCopyPhone}
            className="min-h-[44px] px-3 bg-[#1B5E3A]/10 border border-[#1B5E3A] text-[#1B5E3A] rounded-xl text-xs font-bold tabular-nums inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : animal.sellerPhone}</span>
          </button>
        )}
      </div>
    </div>
  );
};
