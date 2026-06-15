/**
 * Configuration Type Definitions
 * Type definitions for the configuration system
 */

import type { LANGUAGES, HEALTH } from './index';

// =============================================================================
// LANGUAGE TYPES
// =============================================================================

/** Supported language codes */
export type Language = (typeof LANGUAGES.SUPPORTED)[number];

/** Translation key type */
export type TranslationKey = string;

/** Translation dictionary */
export type TranslationDictionary = Record<TranslationKey, string>;

/** All translations */
export type Translations = Record<Language, TranslationDictionary>;

// =============================================================================
// HEALTH TYPES
// =============================================================================

/** Health status levels */
export type HealthStatus = 'normal' | 'warning' | 'danger';

/** Heart rate data */
export interface HeartRateData {
  value: number;
  timestamp: Date;
  status: HealthStatus;
}

/** Blood pressure data */
export interface BloodPressureData {
  systolic: number;
  diastolic: number;
  timestamp: Date;
  status: HealthStatus;
}

/** Steps data */
export interface StepsData {
  count: number;
  goal: number;
  progress: number;
  timestamp: Date;
}

/** Complete health metrics */
export interface HealthMetrics {
  heartRate: HeartRateData;
  bloodPressure: BloodPressureData;
  steps: StepsData;
}

// =============================================================================
// MEDIA TYPES
// =============================================================================

/** Media file type */
export type MediaType = 'photo' | 'video';

/** Media item */
export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  description?: string;
}

/** Media upload result */
export interface MediaUploadResult {
  success: boolean;
  item?: MediaItem;
  error?: string;
}

/** Media validation result */
export interface MediaValidationResult {
  isValid: boolean;
  errors: string[];
}

// =============================================================================
// POINTS TYPES
// =============================================================================

/** Points transaction type */
export type PointsTransactionType = 'earn' | 'redeem' | 'transfer' | 'adjustment';

/** Points transaction */
export interface PointsTransaction {
  id: string;
  type: PointsTransactionType;
  amount: number;
  balance: number;
  timestamp: Date;
  description: string;
}

/** Points balance */
export interface PointsBalance {
  total: number;
  available: number;
  pending: number;
  lastUpdated: Date;
}

// =============================================================================
// USER TYPES
// =============================================================================

/** User role */
export type UserRole = 'elder' | 'family' | 'caregiver' | 'admin';

/** User profile */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  language: Language;
  avatarUrl?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

/** User preferences */
export interface UserPreferences {
  language: Language;
  notifications: {
    enabled: boolean;
    email: boolean;
    push: boolean;
  };
  accessibility: {
    fontSize: keyof typeof import('./index').ELDER_UI.FONT_SIZES;
    highContrast: boolean;
    screenReader: boolean;
  };
}

// =============================================================================
// API TYPES
// =============================================================================

/** API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: Date;
}

/** API error */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/** API request options */
export interface ApiRequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

/** Paginated response */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// =============================================================================
// FORM TYPES
// =============================================================================

/** Form field validation */
export interface FieldValidation {
  isValid: boolean;
  error?: string;
}

/** Form state */
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// =============================================================================
// NOTIFICATION TYPES
// =============================================================================

/** Notification severity */
export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error';

/** Notification */
export interface Notification {
  id: string;
  severity: NotificationSeverity;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// =============================================================================
// DEVICE TYPES
// =============================================================================

/** Device type */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/** Health monitoring device */
export interface HealthDevice {
  id: string;
  name: string;
  type: 'heart_rate' | 'blood_pressure' | 'activity_tracker' | 'glucose';
  status: 'connected' | 'disconnected' | 'error';
  batteryLevel?: number;
  lastSyncAt?: Date;
}

// =============================================================================
// CHART TYPES
// =============================================================================

/** Chart data point */
export interface ChartDataPoint {
  timestamp: Date;
  value: number;
  label?: string;
}

/** Chart configuration */
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: ChartDataPoint[];
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
}

// =============================================================================
// STORAGE TYPES
// =============================================================================

/** Cache entry */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

/** Storage key type */
export type StorageKey = (typeof import('./index').CACHE.KEYS)[keyof typeof import('./index').CACHE.KEYS];

// =============================================================================
// EVENT TYPES
// =============================================================================

/** Application event */
export interface AppEvent {
  type: string;
  payload?: unknown;
  timestamp: Date;
}

/** Health alert */
export interface HealthAlert extends AppEvent {
  type: 'health_alert';
  payload: {
    metric: 'heart_rate' | 'blood_pressure' | 'steps';
    severity: HealthStatus;
    value: number;
    message: string;
  };
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/** Deep partial - makes all properties optional recursively */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Required fields - makes specified fields required */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Optional fields - makes specified fields optional */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Nullable - makes type nullable */
export type Nullable<T> = T | null;

/** Async result */
export type AsyncResult<T, E = Error> = Promise<
  | { success: true; data: T }
  | { success: false; error: E }
>;
