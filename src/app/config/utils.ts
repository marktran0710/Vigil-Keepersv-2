/**
 * Configuration Utility Functions
 * Helper functions for working with application configuration
 */

import { API, ELDER_UI, HEALTH, MEDIA, VALIDATION } from './index';

// =============================================================================
// API UTILITIES
// =============================================================================

/**
 * Constructs a full API URL from an endpoint path
 * @param endpoint - The endpoint path (e.g., '/health/status')
 * @returns Full API URL
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = API.BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
}

/**
 * Creates API request options with default settings
 * @param options - Additional fetch options
 * @returns Fetch options with defaults
 */
export function getApiRequestOptions(
  options: RequestInit = {}
): RequestInit {
  return {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
}

// =============================================================================
// ELDER UI UTILITIES
// =============================================================================

/**
 * Gets the appropriate font size class for elder-friendly UI
 * @param size - Font size key
 * @returns CSS class string or inline style value
 */
export function getElderFontSize(
  size: keyof typeof ELDER_UI.FONT_SIZES = 'BASE'
): string {
  return ELDER_UI.FONT_SIZES[size];
}

/**
 * Gets the appropriate icon size for elder-friendly UI
 * @param size - Icon size key
 * @returns Icon size in pixels
 */
export function getElderIconSize(
  size: keyof typeof ELDER_UI.ICON_SIZES = 'MD'
): number {
  return ELDER_UI.ICON_SIZES[size];
}

/**
 * Checks if an element meets minimum touch target size requirements
 * @param width - Element width in pixels
 * @param height - Element height in pixels
 * @returns True if meets requirements
 */
export function meetsElderTouchTarget(width: number, height: number): boolean {
  return (
    width >= ELDER_UI.TOUCH_TARGET.MIN_WIDTH &&
    height >= ELDER_UI.TOUCH_TARGET.MIN_HEIGHT
  );
}

// =============================================================================
// HEALTH UTILITIES
// =============================================================================

/**
 * Checks if heart rate is within normal range
 * @param heartRate - Heart rate in bpm
 * @returns Status: 'normal', 'warning', or 'danger'
 */
export function getHeartRateStatus(heartRate: number): 'normal' | 'warning' | 'danger' {
  if (heartRate >= HEALTH.HEART_RATE.NORMAL_MIN && heartRate <= HEALTH.HEART_RATE.NORMAL_MAX) {
    return 'normal';
  }
  if (heartRate >= HEALTH.HEART_RATE.WARNING_MIN && heartRate <= HEALTH.HEART_RATE.WARNING_MAX) {
    return 'warning';
  }
  return 'danger';
}

/**
 * Checks if blood pressure is within normal range
 * @param systolic - Systolic blood pressure
 * @param diastolic - Diastolic blood pressure
 * @returns Status: 'normal', 'warning', or 'danger'
 */
export function getBloodPressureStatus(
  systolic: number,
  diastolic: number
): 'normal' | 'warning' | 'danger' {
  const { SYSTOLIC, DIASTOLIC } = HEALTH.BLOOD_PRESSURE;

  if (systolic <= SYSTOLIC.NORMAL_MAX && diastolic <= DIASTOLIC.NORMAL_MAX) {
    return 'normal';
  }
  if (systolic >= SYSTOLIC.HIGH_MIN || diastolic >= DIASTOLIC.HIGH_MIN) {
    return 'danger';
  }
  return 'warning';
}

/**
 * Calculates steps progress percentage
 * @param currentSteps - Current step count
 * @param goal - Step goal (defaults to daily goal)
 * @returns Progress percentage (0-100)
 */
export function getStepsProgress(
  currentSteps: number,
  goal: number = HEALTH.STEPS.DAILY_GOAL
): number {
  const progress = (currentSteps / goal) * 100;
  return Math.min(Math.round(progress), 100);
}

// =============================================================================
// MEDIA UTILITIES
// =============================================================================

/**
 * Validates file size against configured limits
 * @param file - File to validate
 * @param type - File type ('photo' or 'video')
 * @returns True if valid, false otherwise
 */
export function isValidFileSize(file: File, type: 'photo' | 'video'): boolean {
  const maxSize = type === 'photo' ? MEDIA.SIZE_LIMITS.PHOTO_MAX : MEDIA.SIZE_LIMITS.VIDEO_MAX;
  return file.size <= maxSize;
}

/**
 * Validates file type against configured accepted types
 * @param file - File to validate
 * @param type - File type category ('photo' or 'video')
 * @returns True if valid, false otherwise
 */
export function isValidFileType(file: File, type: 'photo' | 'video'): boolean {
  const acceptedTypes = type === 'photo' ? MEDIA.ACCEPTED_TYPES.PHOTO : MEDIA.ACCEPTED_TYPES.VIDEO;
  return acceptedTypes.includes(file.type);
}

/**
 * Formats file size to human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Gets the maximum file size for a given type
 * @param type - File type ('photo' or 'video')
 * @returns Maximum size in bytes
 */
export function getMaxFileSize(type: 'photo' | 'video'): number {
  return type === 'photo' ? MEDIA.SIZE_LIMITS.PHOTO_MAX : MEDIA.SIZE_LIMITS.VIDEO_MAX;
}

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/**
 * Validates password against configured requirements
 * @param password - Password to validate
 * @returns Object with validation result and error message
 */
export function validatePassword(password: string): {
  isValid: boolean;
  error?: string;
} {
  const { MIN_LENGTH, REQUIRE_UPPERCASE, REQUIRE_LOWERCASE, REQUIRE_NUMBER } = VALIDATION.PASSWORD;

  if (password.length < MIN_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${MIN_LENGTH} characters long`,
    };
  }

  if (REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }

  if (REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one lowercase letter',
    };
  }

  if (REQUIRE_NUMBER && !/\d/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one number',
    };
  }

  return { isValid: true };
}

/**
 * Validates phone number format
 * @param phone - Phone number to validate
 * @returns True if valid, false otherwise
 */
export function validatePhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  const { MIN_LENGTH, MAX_LENGTH } = VALIDATION.PHONE;
  return digitsOnly.length >= MIN_LENGTH && digitsOnly.length <= MAX_LENGTH;
}

/**
 * Validates name field
 * @param name - Name to validate
 * @returns True if valid, false otherwise
 */
export function validateName(name: string): boolean {
  const trimmedName = name.trim();
  const { MIN_LENGTH, MAX_LENGTH } = VALIDATION.NAME;
  return trimmedName.length >= MIN_LENGTH && trimmedName.length <= MAX_LENGTH;
}

// =============================================================================
// STORAGE UTILITIES
// =============================================================================

/**
 * Saves a value to localStorage with error handling
 * @param key - Storage key
 * @param value - Value to store
 * @returns True if successful, false otherwise
 */
export function saveToStorage(key: string, value: unknown): boolean {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save to storage:', error);
    return false;
  }
}

/**
 * Retrieves a value from localStorage with error handling
 * @param key - Storage key
 * @param defaultValue - Default value if not found or error
 * @returns Stored value or default value
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to retrieve from storage:', error);
    return defaultValue;
  }
}

/**
 * Removes a value from localStorage
 * @param key - Storage key
 * @returns True if successful, false otherwise
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Failed to remove from storage:', error);
    return false;
  }
}

// =============================================================================
// RESPONSIVE UTILITIES
// =============================================================================

/**
 * Gets current device type based on window width
 * @returns Device type: 'mobile', 'tablet', or 'desktop'
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;

  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Checks if current device is mobile
 * @returns True if mobile device
 */
export function isMobile(): boolean {
  return getDeviceType() === 'mobile';
}

/**
 * Checks if current device is tablet
 * @returns True if tablet device
 */
export function isTablet(): boolean {
  return getDeviceType() === 'tablet';
}

/**
 * Checks if current device is desktop
 * @returns True if desktop device
 */
export function isDesktop(): boolean {
  return getDeviceType() === 'desktop';
}

// =============================================================================
// FORMAT UTILITIES
// =============================================================================

/**
 * Formats a number with thousand separators
 * @param value - Number to format
 * @returns Formatted string
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Formats a date to locale string
 * @param date - Date to format
 * @param locale - Locale string (defaults to 'en')
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Formats a date to time string
 * @param date - Date to format
 * @param locale - Locale string (defaults to 'en')
 * @returns Formatted time string
 */
export function formatTime(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
