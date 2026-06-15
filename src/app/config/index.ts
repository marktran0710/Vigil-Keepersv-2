/**
 * Application Configuration System
 * Central configuration for the Elder Care Platform
 */

// =============================================================================
// ENVIRONMENT CONFIGURATION
// =============================================================================

export const ENV = {
  /** Current environment mode */
  MODE: import.meta.env.MODE || 'development',
  /** Is production environment */
  IS_PRODUCTION: import.meta.env.MODE === 'production',
  /** Is development environment */
  IS_DEVELOPMENT: import.meta.env.MODE === 'development',
} as const;

// =============================================================================
// API CONFIGURATION
// =============================================================================

export const API = {
  /** Base API URL */
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.eldercare.example.com',
  /** API timeout in milliseconds */
  TIMEOUT: 30000,
  /** API retry attempts */
  RETRY_ATTEMPTS: 3,

  /** API Endpoints */
  ENDPOINTS: {
    /** Health data endpoints */
    HEALTH: {
      GET_STATUS: '/health/status',
      GET_HISTORY: '/health/history',
      SUBMIT_DATA: '/health/submit',
    },
    /** Media endpoints */
    MEDIA: {
      UPLOAD_PHOTO: '/media/upload/photo',
      UPLOAD_VIDEO: '/media/upload/video',
      GET_RECENT: '/media/recent',
      DELETE: '/media/delete',
    },
    /** Points system endpoints */
    POINTS: {
      GET_BALANCE: '/points/balance',
      GET_HISTORY: '/points/history',
      REDEEM: '/points/redeem',
    },
    /** User endpoints */
    USER: {
      GET_PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/update',
      GET_DEVICES: '/user/devices',
    },
  },
} as const;

// =============================================================================
// ELDER-FRIENDLY UI CONFIGURATION
// =============================================================================

export const ELDER_UI = {
  /** Font sizes optimized for elderly users */
  FONT_SIZES: {
    /** Extra small text (16px) */
    XS: '1rem',
    /** Small text (18px) */
    SM: '1.125rem',
    /** Base text (24px) - Default for elder-friendly UI */
    BASE: '1.5rem',
    /** Large text (32px) */
    LG: '2rem',
    /** Extra large text (40px) */
    XL: '2.5rem',
    /** 2XL text (48px) */
    '2XL': '3rem',
    /** 3XL text (56px) */
    '3XL': '3.5rem',
    /** 4XL text (64px) - For main headings */
    '4XL': '4rem',
  },

  /** Icon sizes for better visibility */
  ICON_SIZES: {
    /** Small icons (32px) */
    SM: 32,
    /** Medium icons (48px) */
    MD: 48,
    /** Large icons (64px) */
    LG: 64,
    /** Extra large icons (80px) */
    XL: 80,
  },

  /** Touch target minimum sizes (px) */
  TOUCH_TARGET: {
    /** Minimum width for touch targets */
    MIN_WIDTH: 96,
    /** Minimum height for touch targets */
    MIN_HEIGHT: 96,
    /** Recommended padding */
    PADDING: 16,
  },

  /** Spacing scale for layouts */
  SPACING: {
    XS: '0.5rem',   // 8px
    SM: '1rem',     // 16px
    MD: '1.5rem',   // 24px
    LG: '2rem',     // 32px
    XL: '3rem',     // 48px
    '2XL': '4rem',  // 64px
  },
} as const;

// =============================================================================
// COLOR THEME CONFIGURATION
// =============================================================================

export const COLORS = {
  /** Primary warm colors for elder-friendly UI */
  PRIMARY: {
    ORANGE: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
    },
    GREEN: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
    },
  },

  /** Semantic colors */
  SEMANTIC: {
    SUCCESS: '#22c55e',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    INFO: '#3b82f6',
  },

  /** Neutral colors */
  NEUTRAL: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
} as const;

// =============================================================================
// LANGUAGE CONFIGURATION
// =============================================================================

export const LANGUAGES = {
  /** Supported languages */
  SUPPORTED: ['zh-TW', 'en', 'vi'] as const,
  /** Default language */
  DEFAULT: 'en' as const,
  /** Language names for display */
  NAMES: {
    'zh-TW': '繁體中文',
    'en': 'English',
    'vi': 'Tiếng Việt',
  },
} as const;

export type SupportedLanguage = typeof LANGUAGES.SUPPORTED[number];

// =============================================================================
// HEALTH MONITORING CONFIGURATION
// =============================================================================

export const HEALTH = {
  /** Heart rate ranges (bpm) */
  HEART_RATE: {
    MIN: 40,
    MAX: 200,
    NORMAL_MIN: 60,
    NORMAL_MAX: 100,
    WARNING_MIN: 50,
    WARNING_MAX: 120,
  },

  /** Blood pressure ranges (mmHg) */
  BLOOD_PRESSURE: {
    SYSTOLIC: {
      MIN: 80,
      MAX: 200,
      NORMAL_MAX: 120,
      HIGH_MIN: 140,
    },
    DIASTOLIC: {
      MIN: 40,
      MAX: 130,
      NORMAL_MAX: 80,
      HIGH_MIN: 90,
    },
  },

  /** Steps goal */
  STEPS: {
    DAILY_GOAL: 8000,
    MIN_GOAL: 3000,
  },

  /** Data refresh intervals (milliseconds) */
  REFRESH_INTERVALS: {
    REAL_TIME: 5000,      // 5 seconds
    FREQUENT: 30000,      // 30 seconds
    NORMAL: 300000,       // 5 minutes
    SLOW: 900000,         // 15 minutes
  },
} as const;

// =============================================================================
// MEDIA CONFIGURATION
// =============================================================================

export const MEDIA = {
  /** File size limits (bytes) */
  SIZE_LIMITS: {
    PHOTO_MAX: 10 * 1024 * 1024,      // 10MB
    VIDEO_MAX: 100 * 1024 * 1024,     // 100MB
  },

  /** Accepted file types */
  ACCEPTED_TYPES: {
    PHOTO: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    VIDEO: ['video/mp4', 'video/webm', 'video/quicktime'],
  },

  /** Display limits */
  DISPLAY: {
    RECENT_MEDIA_COUNT: 6,
    GALLERY_PAGE_SIZE: 20,
  },
} as const;

// =============================================================================
// POINTS SYSTEM CONFIGURATION
// =============================================================================

export const POINTS = {
  /** Points conversion rates */
  CONVERSION: {
    /** Blood donation (ml) to points ratio */
    BLOOD_DONATION_ML_TO_POINTS: 1,    // 1ml = 1 point
    /** Points to care hours ratio */
    POINTS_TO_CARE_HOURS: 100,         // 100 points = 1 hour
  },

  /** Minimum transaction amounts */
  MINIMUM: {
    REDEEM: 100,
    TRANSFER: 50,
  },

  /** Display settings */
  DISPLAY: {
    DECIMAL_PLACES: 0,
    SHOW_DECIMALS: false,
  },
} as const;

// =============================================================================
// NAVIGATION CONFIGURATION
// =============================================================================

export const ROUTES = {
  /** Application routes */
  ELDER_HOME: '/elder',
  FAMILY_DASHBOARD: '/family',
  PRESENTATION: '/presentation',
  ROOT: '/',

  /** External links */
  EXTERNAL: {
    HELP_CENTER: 'https://help.eldercare.example.com',
    PRIVACY_POLICY: 'https://eldercare.example.com/privacy',
    TERMS_OF_SERVICE: 'https://eldercare.example.com/terms',
  },
} as const;

// =============================================================================
// FEATURE FLAGS
// =============================================================================

export const FEATURES = {
  /** Enable/disable features */
  ENABLE_VIDEO_CALLS: false,
  ENABLE_CHAT: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_OFFLINE_MODE: false,
  ENABLE_ANALYTICS: true,

  /** Beta features */
  BETA: {
    VOICE_COMMANDS: false,
    AI_HEALTH_INSIGHTS: false,
    EMERGENCY_ALERT: true,
  },
} as const;

// =============================================================================
// BROWSER/DEVICE CONFIGURATION
// =============================================================================

export const DEVICE = {
  /** Breakpoints for responsive design (px) */
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1280,
  },

  /** Supported browsers */
  SUPPORTED_BROWSERS: {
    CHROME: 90,
    FIREFOX: 88,
    SAFARI: 14,
    EDGE: 90,
  },
} as const;

// =============================================================================
// VALIDATION RULES
// =============================================================================

export const VALIDATION = {
  /** Password requirements */
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: false,
  },

  /** Phone number */
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
  },

  /** Name fields */
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
} as const;

// =============================================================================
// CACHE CONFIGURATION
// =============================================================================

export const CACHE = {
  /** Cache durations (milliseconds) */
  DURATIONS: {
    SHORT: 60000,          // 1 minute
    MEDIUM: 300000,        // 5 minutes
    LONG: 3600000,         // 1 hour
    VERY_LONG: 86400000,   // 24 hours
  },

  /** Cache keys */
  KEYS: {
    USER_PROFILE: 'user_profile',
    HEALTH_DATA: 'health_data',
    MEDIA_LIST: 'media_list',
    POINTS_BALANCE: 'points_balance',
    LANGUAGE_PREFERENCE: 'language_preference',
  },
} as const;

// =============================================================================
// ERROR MESSAGES
// =============================================================================

export const ERROR_MESSAGES = {
  /** Network errors */
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',

  /** Validation errors */
  INVALID_FILE_TYPE: 'Invalid file type. Please select a supported file.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  REQUIRED_FIELD: 'This field is required.',

  /** Auth errors */
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
} as const;

// =============================================================================
// EXPORT ALL CONFIGURATION
// =============================================================================

export const CONFIG = {
  ENV,
  API,
  ELDER_UI,
  COLORS,
  LANGUAGES,
  HEALTH,
  MEDIA,
  POINTS,
  ROUTES,
  FEATURES,
  DEVICE,
  VALIDATION,
  CACHE,
  ERROR_MESSAGES,
} as const;

export default CONFIG;
