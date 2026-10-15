import React from 'react';
import { Check, Plus, Trash2, Globe, ShieldCheck } from 'lucide-react';
import { AnimalListing, formatIndianPrice } from '../data/animals';
import {
  LANGUAGES,
  LanguageCode,
  UI_TRANSLATIONS,
} from '../data/translations';
import { AnimalImage } from './AnimalImage';

interface MyShedAccountViewProps {
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  myListings: AnimalListing[];
  soldIds: string[];
  userLocationLabel?: string;
  onOpenLocationModal?: () => void;
  onToggleSold: (id: string) => void;
  onDeleteListing: (id: string) => void;
  onGoToSell: () => void;
}

export const MyShedAccountView: React.FC<MyShedAccountViewProps> = ({
  lang,
  onChangeLang,
  myListings,
  soldIds,
  userLocationLabel,
  onOpenLocationModal,
  onToggleSold,
  onDeleteListing,
  onGoToSell,
}) => {
  const t = UI_TRANSLATIONS[lang];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Farmer Account Summary Card */}
      <div className="bg-white border border-[#E7E2DA] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-[#15803D] inline-flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.farmerProfileLabel}</span>
          </div>
          <h1 className="text-xl font-semibold text-[#181D1A] mt-1">
            Rameshbhai Patel · +91 98254 41209
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={onOpenLocationModal}
              className="text-xs text-[#525854] hover:text-[#181D1A] inline-flex items-center gap-1 underline underline-offset-2 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C86D1F]" />
              <span>{userLocationLabel || t.currentLocation}</span>
              <span className="text-[11px] text-[#1B5E3A] font-semibold ml-1">
                ({t.locationModalTitle})
              </span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onGoToSell}
          className="min-h-[44px] px-4 bg-[#1B5E3A] hover:bg-[#14472B] text-white text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.tabSell}</span>
        </button>
      </div>

      {/* Regional Language Selector Section */}
      <div className="bg-white border border-[#E7E2DA] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-[#1B5E3A]" />
          <h2 className="text-base font-semibold text-[#181D1A]">
            {t.languageSettingsHeading}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LANGUAGES.map((l) => {
            const isSelected = lang === l.code;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => onChangeLang(l.code)}
                className={`min-h-[64px] p-3.5 rounded-xl border text-left transition-colors flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#1B5E3A] bg-[#1B5E3A]/8 text-[#1B5E3A]'
                    : 'border-[#E7E2DA] bg-[#FAF8F5] text-[#181D1A] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-base font-bold">{l.nativeName}</span>
                  {isSelected && <Check className="w-4 h-4 shrink-0" />}
                </div>
                <span className="text-xs text-[#525854] mt-1">
                  {l.englishName} · {l.regionLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* My Posted Animals Manager */}
      <div className="bg-white border border-[#E7E2DA] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E7E2DA] bg-[#FAF8F5] flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#181D1A]">
            {t.myListingsHeading} ({myListings.length})
          </h2>
        </div>

        <div className="divide-y divide-[#E7E2DA]">
          {myListings.map((item) => {
            const isSold = soldIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F2EFE9] shrink-0">
                    <AnimalImage
                      src={item.image}
                      alt={item.title[lang]}
                      category={item.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#525854]">
                      <span className="font-semibold text-[#1B5E3A]">
                        {item.breed[lang]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {item.weightOrCountLabel[lang]}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-[#181D1A] truncate mt-0.5">
                      {item.title[lang]}
                    </h3>
                    <div className="text-sm font-bold text-[#181D1A] tabular-nums mt-0.5">
                      {formatIndianPrice(item.priceInr)}
                      {isSold && (
                        <span className="ml-2 text-xs font-semibold text-[#C86D1F]">
                          · {t.soldStatus}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleSold(item.id)}
                    className={`min-h-[40px] px-3.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                      isSold
                        ? 'border-[#15803D] bg-[#15803D]/10 text-[#15803D]'
                        : 'border-[#E7E2DA] bg-[#FAF8F5] hover:bg-[#F2EFE9] text-[#181D1A]'
                    }`}
                  >
                    {isSold ? t.soldStatus : t.markSoldBtn}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteListing(item.id)}
                    aria-label={t.deleteListingBtn}
                    className="min-h-[40px] px-3 text-xs font-semibold rounded-xl border border-[#E7E2DA] text-[#B91C1C] hover:bg-[#B91C1C]/8 inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.deleteListingBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
