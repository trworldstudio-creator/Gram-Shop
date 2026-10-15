import React, { useState, useMemo } from 'react';
import { X, MapPin, Navigation, Check, Search, Compass } from 'lucide-react';
import { LanguageCode, UI_TRANSLATIONS } from '../data/translations';
import { POPULAR_LOCATIONS, LocationHub } from '../data/locations';

export interface UserLocationState {
  label: string;
  lat: number;
  lng: number;
  radiusKm: number | null; // null means 'All India' (no max limit)
}

interface LocationModalProps {
  isOpen: boolean;
  currentLocation: UserLocationState;
  lang: LanguageCode;
  onClose: () => void;
  onApplyLocation: (newLocation: UserLocationState) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  currentLocation,
  lang,
  onClose,
  onApplyLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHub, setSelectedHub] = useState<LocationHub | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number | null>(
    currentLocation.radiusKm
  );
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Initialize selected hub based on current coordinates
  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setGpsError(null);
      setSelectedRadius(currentLocation.radiusKm);

      // Match closest or exact hub
      const matching = POPULAR_LOCATIONS.find(
        (loc) =>
          Math.abs(loc.lat - currentLocation.lat) < 0.1 &&
          Math.abs(loc.lng - currentLocation.lng) < 0.1
      );
      setSelectedHub(matching || POPULAR_LOCATIONS[0]);
    }
  }, [isOpen, currentLocation]);

  const t = UI_TRANSLATIONS[lang];

  const filteredLocations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return POPULAR_LOCATIONS;

    return POPULAR_LOCATIONS.filter((loc) => {
      const matchName =
        loc.name.en.toLowerCase().includes(q) ||
        loc.name.hi.toLowerCase().includes(q) ||
        loc.name.gu.toLowerCase().includes(q) ||
        loc.name.mr.toLowerCase().includes(q);
      const matchState =
        loc.state.en.toLowerCase().includes(q) ||
        loc.state.hi.toLowerCase().includes(q) ||
        loc.state.gu.toLowerCase().includes(q) ||
        loc.state.mr.toLowerCase().includes(q);
      return matchName || matchState;
    });
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleGpsDetect = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetectingGps(false);
        const { latitude, longitude } = position.coords;

        // Find nearest known hub
        let closest = POPULAR_LOCATIONS[0];
        let minDiff = 999999;
        for (const loc of POPULAR_LOCATIONS) {
          const diff =
            Math.abs(loc.lat - latitude) + Math.abs(loc.lng - longitude);
          if (diff < minDiff) {
            minDiff = diff;
            closest = loc;
          }
        }

        setSelectedHub(closest);
      },
      (error) => {
        setIsDetectingGps(false);
        // Fallback gracefully without breaking
        setGpsError('Could not access GPS. Please choose your district below.');
      },
      { timeout: 8000 }
    );
  };

  const handleSave = () => {
    if (selectedHub) {
      onApplyLocation({
        label: `${selectedHub.name[lang]}, ${selectedHub.state[lang]}`,
        lat: selectedHub.lat,
        lng: selectedHub.lng,
        radiusKm: selectedRadius,
      });
      onClose();
    } else if (searchQuery.trim()) {
      // User typed a custom city
      onApplyLocation({
        label: searchQuery.trim(),
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        radiusKm: selectedRadius,
      });
      onClose();
    }
  };

  const radiusOptions: Array<number | null> = [25, 50, 100, 250, null];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-[#E7E2DA] rounded-2xl shadow-xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E7E2DA] bg-[#FAF8F5] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A]">
              <Compass className="w-4 h-4" />
              <span>{t.locationModalTitle}</span>
            </div>
            <p className="text-xs text-[#525854] mt-0.5">
              {t.locationModalSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525854] hover:text-[#181D1A] hover:bg-[#E7E2DA]/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* GPS Location Button */}
          <button
            type="button"
            onClick={handleGpsDetect}
            disabled={isDetectingGps}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#1B5E3A]/30 bg-[#1B5E3A]/5 hover:bg-[#1B5E3A]/10 text-[#1B5E3A] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Navigation
              className={`w-4 h-4 ${isDetectingGps ? 'animate-spin' : ''}`}
            />
            <span>
              {isDetectingGps ? t.detectingLocation : t.detectMyLocation}
            </span>
          </button>

          {gpsError && (
            <div className="text-[11px] text-[#B91C1C] px-1">{gpsError}</div>
          )}

          {/* Search Box */}
          <div className="relative flex items-center bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl focus-within:bg-white focus-within:border-[#1B5E3A] transition-colors">
            <Search className="w-4 h-4 text-[#525854] ml-3.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchCityDistrict}
              className="w-full h-10 px-2.5 text-xs sm:text-sm text-[#181D1A] placeholder-[#525854] bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mr-2 px-2 py-0.5 text-xs font-semibold text-[#525854] hover:text-[#181D1A] bg-[#E7E2DA]/60 rounded cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Radius Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#181D1A] mb-1.5">
              {t.radiusFilterTitle}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {radiusOptions.map((rad) => {
                const isSelected = selectedRadius === rad;
                const label = rad ? t.radiusKm(rad) : t.allIndiaRadius;
                return (
                  <button
                    key={rad ?? 'all'}
                    type="button"
                    onClick={() => setSelectedRadius(rad)}
                    className={`min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#181D1A] text-white shadow-xs'
                        : 'bg-[#FAF8F5] border border-[#E7E2DA] text-[#525854] hover:text-[#181D1A]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* District / Hub List */}
          <div>
            <div className="text-xs font-semibold text-[#181D1A] mb-2 flex items-center justify-between">
              <span>{t.popularDistricts}</span>
              {selectedHub && (
                <span className="text-[11px] font-medium text-[#15803D] flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {selectedHub.name[lang]}, {selectedHub.state[lang]}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto p-0.5">
              {filteredLocations.map((hub) => {
                const isSelected = selectedHub?.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setSelectedHub(hub)}
                    className={`min-h-[46px] p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-[#1B5E3A] bg-[#1B5E3A]/8 text-[#1B5E3A]'
                        : 'border-[#E7E2DA] bg-[#FAF8F5] text-[#181D1A] hover:bg-white hover:border-[#1B5E3A]/40'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">
                        {hub.name[lang]}
                      </div>
                      <div className="text-[10px] text-[#525854] truncate">
                        {hub.state[lang]}
                      </div>
                    </div>
                    {isSelected ? (
                      <Check className="w-4 h-4 shrink-0 text-[#1B5E3A]" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-[#525854]/50" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-[#E7E2DA] bg-[#FAF8F5] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#525854] truncate mr-2">
            {selectedHub
              ? `${selectedHub.name[lang]} · ${
                  selectedRadius ? t.radiusKm(selectedRadius) : t.allIndiaRadius
                }`
              : t.currentLocation}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] px-3.5 rounded-xl border border-[#E7E2DA] text-xs font-semibold text-[#525854] hover:text-[#181D1A] hover:bg-white transition-colors cursor-pointer"
            >
              {t.closePanel}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="min-h-[40px] px-5 bg-[#1B5E3A] hover:bg-[#14472B] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {t.applyLocationBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
