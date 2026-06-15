# Configuration System

This is the centralized configuration system for the Elder Care Platform. All application constants, settings, and configuration values are managed here.

## 📁 Structure

```
config/
├── index.ts       # Main configuration file with all constants
├── utils.ts       # Utility functions for working with configuration
├── types.ts       # TypeScript type definitions
└── README.md      # This file
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { CONFIG } from '@/app/config';

// Access configuration values
const apiUrl = CONFIG.API.BASE_URL;
const elderFontSize = CONFIG.ELDER_UI.FONT_SIZES.BASE;
const defaultLanguage = CONFIG.LANGUAGES.DEFAULT;
```

### Using Utility Functions

```typescript
import { 
  getApiUrl, 
  getHeartRateStatus, 
  formatFileSize,
  validatePassword 
} from '@/app/config/utils';

// Get full API URL
const endpoint = getApiUrl('/health/status');

// Check health metrics
const status = getHeartRateStatus(75); // 'normal'

// Format file size
const formatted = formatFileSize(1024000); // "1 MB"

// Validate password
const result = validatePassword('MyPass123');
if (!result.isValid) {
  console.log(result.error);
}
```

### Using Types

```typescript
import type { 
  Language, 
  HealthMetrics, 
  MediaItem,
  UserProfile 
} from '@/app/config/types';

const userProfile: UserProfile = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'elder',
  language: 'en',
  createdAt: new Date(),
};
```

## 📚 Configuration Categories

### 1. Environment Configuration (`ENV`)

```typescript
import { ENV } from '@/app/config';

if (ENV.IS_DEVELOPMENT) {
  console.log('Running in development mode');
}
```

### 2. API Configuration (`API`)

```typescript
import { API } from '@/app/config';

// Base URL
const baseUrl = API.BASE_URL;

// Endpoints
const healthEndpoint = API.ENDPOINTS.HEALTH.GET_STATUS;

// Request settings
const timeout = API.TIMEOUT;
```

### 3. Elder-Friendly UI Configuration (`ELDER_UI`)

All UI settings optimized for elderly users:

```typescript
import { ELDER_UI } from '@/app/config';

// Font sizes (24px base for readability)
const fontSize = ELDER_UI.FONT_SIZES.BASE; // '1.5rem' (24px)
const largeFontSize = ELDER_UI.FONT_SIZES['4XL']; // '4rem' (64px)

// Icon sizes (larger for visibility)
const iconSize = ELDER_UI.ICON_SIZES.LG; // 64px

// Touch targets (minimum 96x96px)
const minWidth = ELDER_UI.TOUCH_TARGET.MIN_WIDTH; // 96
const minHeight = ELDER_UI.TOUCH_TARGET.MIN_HEIGHT; // 96

// Spacing
const spacing = ELDER_UI.SPACING.LG; // '2rem' (32px)
```

### 4. Color Configuration (`COLORS`)

```typescript
import { COLORS } from '@/app/config';

// Primary colors
const orangeColor = COLORS.PRIMARY.ORANGE[500]; // '#f97316'
const greenColor = COLORS.PRIMARY.GREEN[500]; // '#22c55e'

// Semantic colors
const successColor = COLORS.SEMANTIC.SUCCESS;
const errorColor = COLORS.SEMANTIC.ERROR;
```

### 5. Language Configuration (`LANGUAGES`)

```typescript
import { LANGUAGES } from '@/app/config';

// Supported languages
const languages = LANGUAGES.SUPPORTED; // ['zh-TW', 'en', 'vi']

// Default language
const defaultLang = LANGUAGES.DEFAULT; // 'en'

// Language display names
const langName = LANGUAGES.NAMES['en']; // 'English'
```

### 6. Health Monitoring (`HEALTH`)

```typescript
import { HEALTH } from '@/app/config';

// Heart rate ranges
const normalMin = HEALTH.HEART_RATE.NORMAL_MIN; // 60
const normalMax = HEALTH.HEART_RATE.NORMAL_MAX; // 100

// Blood pressure ranges
const systolicNormal = HEALTH.BLOOD_PRESSURE.SYSTOLIC.NORMAL_MAX; // 120

// Steps goal
const dailyGoal = HEALTH.STEPS.DAILY_GOAL; // 8000

// Refresh intervals
const refreshInterval = HEALTH.REFRESH_INTERVALS.NORMAL; // 5 minutes
```

### 7. Media Configuration (`MEDIA`)

```typescript
import { MEDIA } from '@/app/config';

// File size limits
const photoMaxSize = MEDIA.SIZE_LIMITS.PHOTO_MAX; // 10MB
const videoMaxSize = MEDIA.SIZE_LIMITS.VIDEO_MAX; // 100MB

// Accepted types
const photoTypes = MEDIA.ACCEPTED_TYPES.PHOTO;
// ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

// Display settings
const recentCount = MEDIA.DISPLAY.RECENT_MEDIA_COUNT; // 6
```

### 8. Points System (`POINTS`)

```typescript
import { POINTS } from '@/app/config';

// Conversion rates
const mlToPoints = POINTS.CONVERSION.BLOOD_DONATION_ML_TO_POINTS; // 1
const pointsToHours = POINTS.CONVERSION.POINTS_TO_CARE_HOURS; // 100

// Minimum amounts
const minRedeem = POINTS.MINIMUM.REDEEM; // 100
```

### 9. Feature Flags (`FEATURES`)

```typescript
import { FEATURES } from '@/app/config';

// Check feature availability
if (FEATURES.ENABLE_CHAT) {
  // Show chat feature
}

// Beta features
if (FEATURES.BETA.EMERGENCY_ALERT) {
  // Show emergency alert feature
}
```

### 10. Routes (`ROUTES`)

```typescript
import { ROUTES } from '@/app/config';

// Internal routes
const elderHome = ROUTES.ELDER_HOME; // '/elder'
const dashboard = ROUTES.FAMILY_DASHBOARD; // '/family'

// External links
const helpCenter = ROUTES.EXTERNAL.HELP_CENTER;
```

## 🛠 Utility Functions

### API Utilities

```typescript
import { getApiUrl, getApiRequestOptions } from '@/app/config/utils';

// Get full API URL
const url = getApiUrl('/health/status');
// 'https://api.eldercare.example.com/health/status'

// Get request options with defaults
const options = getApiRequestOptions({
  method: 'POST',
  body: JSON.stringify({ data: 'value' }),
});
```

### Elder UI Utilities

```typescript
import { 
  getElderFontSize, 
  getElderIconSize,
  meetsElderTouchTarget 
} from '@/app/config/utils';

// Get font size
const fontSize = getElderFontSize('LG'); // '2rem'

// Get icon size
const iconSize = getElderIconSize('XL'); // 80

// Check touch target
const isValid = meetsElderTouchTarget(100, 100); // true
```

### Health Utilities

```typescript
import { 
  getHeartRateStatus, 
  getBloodPressureStatus,
  getStepsProgress 
} from '@/app/config/utils';

// Check heart rate status
const hrStatus = getHeartRateStatus(75); // 'normal'

// Check blood pressure status
const bpStatus = getBloodPressureStatus(120, 80); // 'normal'

// Calculate steps progress
const progress = getStepsProgress(5000, 8000); // 63
```

### Media Utilities

```typescript
import { 
  isValidFileSize, 
  isValidFileType,
  formatFileSize,
  getMaxFileSize 
} from '@/app/config/utils';

// Validate file
const file = new File([...], 'photo.jpg', { type: 'image/jpeg' });

const validSize = isValidFileSize(file, 'photo'); // true/false
const validType = isValidFileType(file, 'photo'); // true/false

// Format size
const formatted = formatFileSize(1024000); // "1 MB"

// Get max size
const maxSize = getMaxFileSize('photo'); // 10485760 (10MB in bytes)
```

### Validation Utilities

```typescript
import { 
  validatePassword, 
  validatePhone,
  validateName 
} from '@/app/config/utils';

// Validate password
const pwdResult = validatePassword('MyPass123');
if (!pwdResult.isValid) {
  console.log(pwdResult.error);
}

// Validate phone
const isValidPhone = validatePhone('+886912345678'); // true/false

// Validate name
const isValidName = validateName('John Doe'); // true/false
```

### Storage Utilities

```typescript
import { 
  saveToStorage, 
  getFromStorage,
  removeFromStorage 
} from '@/app/config/utils';

// Save to localStorage
saveToStorage('user_preferences', { theme: 'light' });

// Get from localStorage
const prefs = getFromStorage('user_preferences', { theme: 'dark' });

// Remove from localStorage
removeFromStorage('user_preferences');
```

### Responsive Utilities

```typescript
import { 
  getDeviceType, 
  isMobile,
  isTablet,
  isDesktop 
} from '@/app/config/utils';

// Get device type
const device = getDeviceType(); // 'mobile' | 'tablet' | 'desktop'

// Check device
if (isMobile()) {
  // Mobile-specific code
}
```

### Format Utilities

```typescript
import { 
  formatNumber, 
  formatDate,
  formatTime 
} from '@/app/config/utils';

// Format number
const formatted = formatNumber(1234567); // "1,234,567"

// Format date
const date = formatDate(new Date(), 'en'); // "May 19, 2026"

// Format time
const time = formatTime(new Date(), 'en'); // "02:30 PM"
```

## 📝 Best Practices

### 1. Always Use Configuration Instead of Hard-Coded Values

❌ **Bad:**
```typescript
const fontSize = '24px';
const apiUrl = 'https://api.example.com';
```

✅ **Good:**
```typescript
import { ELDER_UI, API } from '@/app/config';

const fontSize = ELDER_UI.FONT_SIZES.BASE;
const apiUrl = API.BASE_URL;
```

### 2. Use Utility Functions for Common Tasks

❌ **Bad:**
```typescript
if (heartRate >= 60 && heartRate <= 100) {
  return 'normal';
}
```

✅ **Good:**
```typescript
import { getHeartRateStatus } from '@/app/config/utils';

const status = getHeartRateStatus(heartRate);
```

### 3. Use Type Definitions for Type Safety

❌ **Bad:**
```typescript
const user = {
  name: 'John',
  role: 'elder', // No type checking
};
```

✅ **Good:**
```typescript
import type { UserProfile } from '@/app/config/types';

const user: UserProfile = {
  id: '123',
  name: 'John',
  role: 'elder', // Type-checked
  // ... other required fields
};
```

### 4. Environment-Specific Configuration

```typescript
import { ENV, API } from '@/app/config';

// Use environment variables for sensitive data
const apiKey = ENV.IS_PRODUCTION 
  ? import.meta.env.VITE_PROD_API_KEY 
  : import.meta.env.VITE_DEV_API_KEY;
```

## 🔧 Adding New Configuration

### 1. Add to Main Config (`index.ts`)

```typescript
export const NEW_FEATURE = {
  SETTING_1: 'value1',
  SETTING_2: 'value2',
} as const;

// Update main CONFIG export
export const CONFIG = {
  // ... existing config
  NEW_FEATURE,
} as const;
```

### 2. Add Utility Functions (`utils.ts`)

```typescript
export function getNewFeatureSetting(): string {
  return NEW_FEATURE.SETTING_1;
}
```

### 3. Add Type Definitions (`types.ts`)

```typescript
export interface NewFeatureData {
  id: string;
  value: string;
}
```

## 📖 Additional Resources

- See individual component examples in `/src/app/pages` and `/src/app/components`
- Check TypeScript types in `types.ts` for detailed interface definitions
- Refer to utility functions in `utils.ts` for implementation examples

## 🤝 Contributing

When adding new configuration:

1. Keep values organized by category
2. Use descriptive names with proper casing
3. Add `as const` for type safety
4. Document complex configurations
5. Add corresponding utility functions if needed
6. Update TypeScript types
7. Update this README with examples
