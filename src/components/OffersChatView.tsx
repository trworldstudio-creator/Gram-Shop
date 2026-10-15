import React, { useState } from 'react';
import { Phone, Send, Check, Copy } from 'lucide-react';
import { AnimalListing, formatIndianPrice } from '../data/animals';
import { LanguageCode, UI_TRANSLATIONS } from '../data/translations';
import { AnimalImage } from './AnimalImage';

export interface SaudaMessage {
  id: string;
  sender: 'buyer' | 'farmer';
  text: string;
  offerAmountInr?: number;
  time: string;
}

export interface SaudaThread {
  animalId: string;
  animal: AnimalListing;
  lastOfferInr: number;
  status: 'pending' | 'replied';
  messages: SaudaMessage[];
}

interface OffersChatViewProps {
  threads: SaudaThread[];
  activeThreadId: string;
  lang: LanguageCode;
  onSelectThread: (animalId: string) => void;
  onSendMessage: (animalId: string, text: string, offerAmountInr?: number) => void;
}

export const OffersChatView: React.FC<OffersChatViewProps> = ({
  threads,
  activeThreadId,
  lang,
  onSelectThread,
  onSendMessage,
}) => {
  const [draftText, setDraftText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[lang];
  const currentThread =
    threads.find((item) => item.animalId === activeThreadId) || threads[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftText.trim() || !currentThread) return;
    onSendMessage(currentThread.animalId, draftText.trim());
    setDraftText('');
  };

  const handleCopyPhone = (phone: string, id: string) => {
    navigator.clipboard?.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden bg-[#FAF8F5]">
      {/* Left Thread List */}
      <div className="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-[#E7E2DA] bg-white flex flex-col shrink-0 max-h-[38vh] lg:max-h-none">
        <div className="p-4 border-b border-[#E7E2DA] bg-[#FAF8F5]">
          <h1 className="text-base font-semibold text-[#181D1A]">
            {t.offersScreenTitle}
          </h1>
          <p className="text-xs text-[#525854] mt-0.5">
            {t.offersScreenSubtitle}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#E7E2DA]">
          {threads.map((thread) => {
            const isSelected = currentThread?.animalId === thread.animalId;
            return (
              <button
                key={thread.animalId}
                type="button"
                onClick={() => onSelectThread(thread.animalId)}
                className={`w-full p-3.5 text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#1B5E3A]/8' : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F2EFE9] shrink-0">
                  <AnimalImage
                    src={thread.animal.image}
                    alt={thread.animal.title[lang]}
                    category={thread.animal.category}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#181D1A] truncate">
                      {thread.animal.sellerName[lang]}
                    </span>
                    <span className="text-xs font-bold text-[#1B5E3A] tabular-nums shrink-0">
                      {formatIndianPrice(thread.lastOfferInr)}
                    </span>
                  </div>
                  <div className="text-xs text-[#525854] truncate mt-0.5">
                    {thread.animal.title[lang]}
                  </div>
                  <div className="text-[11px] text-[#525854] mt-0.5 flex items-center gap-1.5">
                    <span
                      className={
                        thread.status === 'replied'
                          ? 'text-[#15803D] font-semibold'
                          : 'text-[#C86D1F] font-medium'
                      }
                    >
                      {thread.status === 'replied'
                        ? t.offerStatusAccepted
                        : t.offerStatusPending}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">
                      {thread.messages[thread.messages.length - 1]?.text}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Active Conversation & Price Negotiation Pane */}
      {currentThread && (
        <div className="flex-1 flex flex-col min-h-0 bg-[#FAF8F5]">
          {/* Active Thread Header */}
          <div className="px-4 py-3 bg-white border-b border-[#E7E2DA] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F2EFE9] shrink-0">
                <AnimalImage
                  src={currentThread.animal.image}
                  alt={currentThread.animal.title[lang]}
                  category={currentThread.animal.category}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#181D1A] truncate">
                  {currentThread.animal.title[lang]}
                </div>
                <div className="text-xs text-[#525854] flex items-center gap-1.5 tabular-nums">
                  <span>{currentThread.animal.sellerName[lang]}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Asking {formatIndianPrice(currentThread.animal.priceInr)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                handleCopyPhone(
                  currentThread.animal.sellerPhone,
                  currentThread.animalId
                )
              }
              className="min-h-[40px] px-3.5 bg-[#1B5E3A] hover:bg-[#14472B] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              {copiedId === currentThread.animalId ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="tabular-nums">
                    {currentThread.animal.sellerPhone}
                  </span>
                </>
              ) : (
                <>
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.acceptCounterBtn}:</span>
                  <span className="tabular-nums">
                    {currentThread.animal.sellerPhone}
                  </span>
                  <Copy className="w-3 h-3 ml-0.5 opacity-80" />
                </>
              )}
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {currentThread.messages.map((msg) => {
              const isBuyer = msg.sender === 'buyer';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isBuyer ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md rounded-2xl px-4 py-2.5 text-xs sm:text-sm ${
                      isBuyer
                        ? 'bg-[#1B5E3A] text-white'
                        : 'bg-white border border-[#E7E2DA] text-[#181D1A]'
                    }`}
                  >
                    {msg.offerAmountInr && (
                      <div
                        className={`text-xs font-bold tabular-nums pb-1 mb-1 border-b ${
                          isBuyer
                            ? 'border-white/20 text-white'
                            : 'border-[#E7E2DA] text-[#C86D1F]'
                        }`}
                      >
                        Sauda Offer: {formatIndianPrice(msg.offerAmountInr)}
                      </div>
                    )}
                    <p className="leading-relaxed">{msg.text}</p>
                    <div
                      className={`text-[10px] mt-1 tabular-nums ${
                        isBuyer ? 'text-white/75' : 'text-[#525854]'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Counter-Offer Chips + Message Input */}
          <div className="p-3 sm:p-4 bg-white border-t border-[#E7E2DA] space-y-2.5 shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
              <span className="text-[11px] font-medium text-[#525854] shrink-0">
                {t.quickOfferLabel}
              </span>
              {[
                Math.round((currentThread.animal.priceInr * 0.92) / 500) * 500,
                Math.round((currentThread.animal.priceInr * 0.96) / 500) * 500,
                currentThread.animal.priceInr,
              ].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() =>
                    onSendMessage(
                      currentThread.animalId,
                      lang === 'hi'
                        ? `मेरा भाव ${formatIndianPrice(amt)} है। क्या यह मंजूर है?`
                        : lang === 'gu'
                        ? `મારો ભાવ ${formatIndianPrice(amt)} છે. શું આ માન્ય છે?`
                        : lang === 'mr'
                        ? `माझी ऑफर ${formatIndianPrice(amt)} आहे. आपण बोलू शकतो का?`
                        : `I would like to offer ${formatIndianPrice(amt)}. Can we finalize?`,
                      amt
                    )
                  }
                  className="px-3 py-1 text-xs font-semibold tabular-nums rounded-lg border border-[#E7E2DA] bg-[#FAF8F5] hover:border-[#1B5E3A] hover:text-[#1B5E3A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {formatIndianPrice(amt)}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                placeholder={t.typeMessagePlaceholder}
                className="flex-1 min-h-[44px] px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl focus:outline-none focus:bg-white focus:border-[#1B5E3A]"
              />
              <button
                type="submit"
                className="min-h-[44px] px-5 bg-[#1B5E3A] hover:bg-[#14472B] text-white text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.sendBtn}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
