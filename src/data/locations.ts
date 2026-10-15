import { LocalizedText } from './animals';

export interface LocationHub {
  id: string;
  name: LocalizedText;
  state: LocalizedText;
  lat: number;
  lng: number;
}

export const POPULAR_LOCATIONS: LocationHub[] = [
  {
    id: 'anand-gu',
    name: {
      en: 'Anand',
      hi: 'आणंद',
      gu: 'આણંદ',
      mr: 'आणंद',
    },
    state: {
      en: 'Gujarat',
      hi: 'गुजरात',
      gu: 'ગુજરાત',
      mr: 'गुजरात',
    },
    lat: 22.5645,
    lng: 72.9289,
  },
  {
    id: 'mehsana-gu',
    name: {
      en: 'Mehsana',
      hi: 'मेहसाणा',
      gu: 'મહેસાણા',
      mr: 'मेहसाणा',
    },
    state: {
      en: 'Gujarat',
      hi: 'गुजरात',
      gu: 'ગુજરાત',
      mr: 'गुजरात',
    },
    lat: 23.6000,
    lng: 72.4000,
  },
  {
    id: 'rajkot-gu',
    name: {
      en: 'Rajkot',
      hi: 'राजकोट',
      gu: 'રાજકોટ',
      mr: 'राजकोट',
    },
    state: {
      en: 'Gujarat',
      hi: 'गुजरात',
      gu: 'ગુજરાત',
      mr: 'गुजरात',
    },
    lat: 22.3039,
    lng: 70.8022,
  },
  {
    id: 'surat-gu',
    name: {
      en: 'Surat',
      hi: 'सूरत',
      gu: 'સુરત',
      mr: 'सुरत',
    },
    state: {
      en: 'Gujarat',
      hi: 'गुजरात',
      gu: 'ગુજરાત',
      mr: 'सुरत',
    },
    lat: 21.1702,
    lng: 72.8311,
  },
  {
    id: 'banaskantha-gu',
    name: {
      en: 'Banaskantha (Palanpur)',
      hi: 'बनासकांठा (पालनपुर)',
      gu: 'બનાસકાંઠા (પાલનપુર)',
      mr: 'बनासकांठा (पालनपूर)',
    },
    state: {
      en: 'Gujarat',
      hi: 'गुजरात',
      gu: 'ગુજરાત',
      mr: 'गुजरात',
    },
    lat: 24.1724,
    lng: 72.4346,
  },
  {
    id: 'pune-mr',
    name: {
      en: 'Pune / Baramati',
      hi: 'पुणे / बारामती',
      gu: 'પુણે / બારામતી',
      mr: 'पुणे / बारामती',
    },
    state: {
      en: 'Maharashtra',
      hi: 'महाराष्ट्र',
      gu: 'મહારાષ્ટ્ર',
      mr: 'महाराष्ट्र',
    },
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    id: 'nashik-mr',
    name: {
      en: 'Nashik',
      hi: 'नासिक',
      gu: 'નાશિક',
      mr: 'नाशिक',
    },
    state: {
      en: 'Maharashtra',
      hi: 'महाराष्ट्र',
      gu: 'મહારાષ્ટ્ર',
      mr: 'महाराष्ट्र',
    },
    lat: 19.9975,
    lng: 73.7898,
  },
  {
    id: 'kolhapur-mr',
    name: {
      en: 'Kolhapur',
      hi: 'कोल्हापुर',
      gu: 'કોલ્હાપુર',
      mr: 'कोल्हापूर',
    },
    state: {
      en: 'Maharashtra',
      hi: 'महाराष्ट्र',
      gu: 'મહારાષ્ટ્ર',
      mr: 'महाराष्ट्र',
    },
    lat: 16.7050,
    lng: 74.2433,
  },
  {
    id: 'karnal-hr',
    name: {
      en: 'Karnal',
      hi: 'करनाल',
      gu: 'કરનાલ',
      mr: 'करनाल',
    },
    state: {
      en: 'Haryana',
      hi: 'हरियाणा',
      gu: 'હરિયાણા',
      mr: 'हरियाणा',
    },
    lat: 29.6857,
    lng: 76.9905,
  },
  {
    id: 'hisar-hr',
    name: {
      en: 'Hisar',
      hi: 'हिसार',
      gu: 'હિસાર',
      mr: 'हिसार',
    },
    state: {
      en: 'Haryana',
      hi: 'हरियाणा',
      gu: 'હરિયાણા',
      mr: 'हरियाणा',
    },
    lat: 29.1492,
    lng: 75.7217,
  },
  {
    id: 'jodhpur-rj',
    name: {
      en: 'Jodhpur',
      hi: 'जोधपुर',
      gu: 'જોધપુર',
      mr: 'जोधपूर',
    },
    state: {
      en: 'Rajasthan',
      hi: 'राजस्थान',
      gu: 'રાજસ્થાન',
      mr: 'राजस्थान',
    },
    lat: 26.2389,
    lng: 73.0243,
  },
  {
    id: 'jaipur-rj',
    name: {
      en: 'Jaipur',
      hi: 'जयपुर',
      gu: 'જયપુર',
      mr: 'जयपूर',
    },
    state: {
      en: 'Rajasthan',
      hi: 'राजस्थान',
      gu: 'રાજસ્થાન',
      mr: 'राजस्थान',
    },
    lat: 26.9124,
    lng: 75.7873,
  },
  {
    id: 'indore-mp',
    name: {
      en: 'Indore',
      hi: 'इंदौर',
      gu: 'ઈન્દોર',
      mr: 'इंदूर',
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
      gu: 'મધ્ય પ્રદેશ',
      mr: 'मध्य प्रदेश',
    },
    lat: 22.7196,
    lng: 75.8577,
  },
  {
    id: 'ludhiana-pb',
    name: {
      en: 'Ludhiana',
      hi: 'लुधियाना',
      gu: 'લુધિયાણા',
      mr: 'लुधियाना',
    },
    state: {
      en: 'Punjab',
      hi: 'पंजाब',
      gu: 'પંજાબ',
      mr: 'पंजाब',
    },
    lat: 30.9010,
    lng: 75.8573,
  },
  {
    id: 'meerut-up',
    name: {
      en: 'Meerut',
      hi: 'मेरठ',
      gu: 'મેરઠ',
      mr: 'मेरठ',
    },
    state: {
      en: 'Uttar Pradesh',
      hi: 'उत्तर प्रदेश',
      gu: 'ઉત્તર પ્રદેશ',
      mr: 'उत्तर प्रदेश',
    },
    lat: 28.9845,
    lng: 77.7064,
  },
];

/**
 * Calculates geodesic distance between two latitude/longitude points in kilometers using Haversine formula
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Math.round(R * c);
  // Guarantee a friendly local distance (at least 3km if in the exact same village hub)
  return distance === 0 ? 3 : distance;
}
