/**
 * Configuration System Usage Examples
 * Practical examples of using the configuration system in components
 */

import React, { useState } from 'react';
import {
  CONFIG,
  ELDER_UI,
  COLORS,
  HEALTH,
  MEDIA,
  API,
  ROUTES,
} from './index';
import {
  getHeartRateStatus,
  getBloodPressureStatus,
  getStepsProgress,
  isValidFileSize,
  isValidFileType,
  formatFileSize,
  getApiUrl,
  getElderFontSize,
  getElderIconSize,
  formatNumber,
} from './utils';
import type {
  HealthMetrics,
  MediaItem,
  PointsBalance,
} from './types';

// =============================================================================
// EXAMPLE 1: Using Elder UI Configuration
// =============================================================================

export function ElderFriendlyButton() {
  return (
    <button
      style={{
        fontSize: ELDER_UI.FONT_SIZES.BASE, // 24px
        minWidth: `${ELDER_UI.TOUCH_TARGET.MIN_WIDTH}px`, // 96px
        minHeight: `${ELDER_UI.TOUCH_TARGET.MIN_HEIGHT}px`, // 96px
        padding: ELDER_UI.SPACING.MD, // 24px
        backgroundColor: COLORS.PRIMARY.ORANGE[500],
      }}
      className="rounded-lg font-medium"
    >
      大字體按鈕
    </button>
  );
}

// =============================================================================
// EXAMPLE 2: Using Health Status Utilities
// =============================================================================

export function HealthStatusDisplay({ metrics }: { metrics: HealthMetrics }) {
  const hrStatus = getHeartRateStatus(metrics.heartRate.value);
  const bpStatus = getBloodPressureStatus(
    metrics.bloodPressure.systolic,
    metrics.bloodPressure.diastolic
  );
  const stepsProgress = getStepsProgress(
    metrics.steps.count,
    metrics.steps.goal
  );

  const getStatusColor = (status: 'normal' | 'warning' | 'danger') => {
    switch (status) {
      case 'normal': return COLORS.SEMANTIC.SUCCESS;
      case 'warning': return COLORS.SEMANTIC.WARNING;
      case 'danger': return COLORS.SEMANTIC.ERROR;
    }
  };

  return (
    <div className="space-y-4">
      {/* Heart Rate */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h3 style={{ fontSize: ELDER_UI.FONT_SIZES.LG }}>心率</h3>
        <p
          style={{
            fontSize: ELDER_UI.FONT_SIZES['2XL'],
            color: getStatusColor(hrStatus),
          }}
        >
          {metrics.heartRate.value} bpm
        </p>
        <p className="text-gray-500">
          正常範圍: {HEALTH.HEART_RATE.NORMAL_MIN}-{HEALTH.HEART_RATE.NORMAL_MAX}
        </p>
      </div>

      {/* Blood Pressure */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h3 style={{ fontSize: ELDER_UI.FONT_SIZES.LG }}>血壓</h3>
        <p
          style={{
            fontSize: ELDER_UI.FONT_SIZES['2XL'],
            color: getStatusColor(bpStatus),
          }}
        >
          {metrics.bloodPressure.systolic}/{metrics.bloodPressure.diastolic}
        </p>
      </div>

      {/* Steps Progress */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h3 style={{ fontSize: ELDER_UI.FONT_SIZES.LG }}>步數</h3>
        <p style={{ fontSize: ELDER_UI.FONT_SIZES['2XL'] }}>
          {formatNumber(metrics.steps.count)}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div
            className="h-4 rounded-full"
            style={{
              width: `${stepsProgress}%`,
              backgroundColor: COLORS.PRIMARY.GREEN[500],
            }}
          />
        </div>
        <p className="text-gray-500 mt-1">
          目標: {formatNumber(HEALTH.STEPS.DAILY_GOAL)} 步
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// EXAMPLE 3: Using Media Validation
// =============================================================================

export function MediaUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setSelectedFile(file);

    // Validate file type
    if (!isValidFileType(file, 'photo')) {
      setError(`僅支援以下格式: ${MEDIA.ACCEPTED_TYPES.PHOTO.join(', ')}`);
      return;
    }

    // Validate file size
    if (!isValidFileSize(file, 'photo')) {
      const maxSize = formatFileSize(MEDIA.SIZE_LIMITS.PHOTO_MAX);
      setError(`檔案大小不得超過 ${maxSize}`);
      return;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 style={{ fontSize: ELDER_UI.FONT_SIZES.LG }} className="mb-4">
        上傳照片
      </h3>

      <input
        type="file"
        accept={MEDIA.ACCEPTED_TYPES.PHOTO.join(',')}
        onChange={handleFileChange}
        className="mb-4"
        style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}
      />

      {selectedFile && !error && (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <p style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}>
            檔案名稱: {selectedFile.name}
          </p>
          <p style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}>
            檔案大小: {formatFileSize(selectedFile.size)}
          </p>
        </div>
      )}

      {error && (
        <div
          className="mt-4 p-4 rounded"
          style={{
            backgroundColor: COLORS.SEMANTIC.ERROR + '20',
            fontSize: ELDER_UI.FONT_SIZES.BASE,
            color: COLORS.SEMANTIC.ERROR,
          }}
        >
          {error}
        </div>
      )}

      <p className="mt-2 text-gray-500" style={{ fontSize: ELDER_UI.FONT_SIZES.SM }}>
        最大檔案大小: {formatFileSize(MEDIA.SIZE_LIMITS.PHOTO_MAX)}
      </p>
    </div>
  );
}

// =============================================================================
// EXAMPLE 4: Using API Configuration
// =============================================================================

export function useHealthData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = getApiUrl(API.ENDPOINTS.HEALTH.GET_STATUS);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(API.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch health data');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(CONFIG.ERROR_MESSAGES.NETWORK_ERROR);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchHealthStatus, loading, error };
}

// =============================================================================
// EXAMPLE 5: Using Points System Configuration
// =============================================================================

export function PointsBalanceCard({ balance }: { balance: PointsBalance }) {
  const careHours = balance.available / CONFIG.POINTS.CONVERSION.POINTS_TO_CARE_HOURS;

  return (
    <div className="p-6 bg-linear-to-br from-orange-50 to-green-50 rounded-xl shadow-lg">
      <h3 style={{ fontSize: ELDER_UI.FONT_SIZES.LG }} className="mb-4">
        點數餘額
      </h3>

      <div className="mb-6">
        <p
          style={{
            fontSize: ELDER_UI.FONT_SIZES['4XL'],
            color: COLORS.PRIMARY.ORANGE[600],
          }}
          className="font-bold"
        >
          {formatNumber(balance.available)}
        </p>
        <p style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }} className="text-gray-600">
          可用點數
        </p>
      </div>

      <div className="p-4 bg-white rounded-lg">
        <p style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}>
          可兌換照護時數: <strong>{careHours.toFixed(1)} 小時</strong>
        </p>
        <p
          style={{ fontSize: ELDER_UI.FONT_SIZES.SM }}
          className="text-gray-500 mt-2"
        >
          (每 {CONFIG.POINTS.CONVERSION.POINTS_TO_CARE_HOURS} 點 = 1 小時)
        </p>
      </div>

      {balance.available < CONFIG.POINTS.MINIMUM.REDEEM && (
        <div
          className="mt-4 p-3 rounded"
          style={{
            backgroundColor: COLORS.SEMANTIC.WARNING + '20',
            fontSize: ELDER_UI.FONT_SIZES.SM,
          }}
        >
          需要至少 {CONFIG.POINTS.MINIMUM.REDEEM} 點才能兌換
        </div>
      )}
    </div>
  );
}

// =============================================================================
// EXAMPLE 6: Using Color Configuration
// =============================================================================

export function ColorThemeExample() {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {/* Primary Colors */}
      <div>
        <h4 className="mb-2">主要色彩 - 橘色</h4>
        {Object.entries(COLORS.PRIMARY.ORANGE).map(([shade, color]) => (
          <div
            key={shade}
            className="h-12 mb-2 rounded flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            {shade}: {color}
          </div>
        ))}
      </div>

      <div>
        <h4 className="mb-2">主要色彩 - 綠色</h4>
        {Object.entries(COLORS.PRIMARY.GREEN).map(([shade, color]) => (
          <div
            key={shade}
            className="h-12 mb-2 rounded flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            {shade}: {color}
          </div>
        ))}
      </div>

      {/* Semantic Colors */}
      <div>
        <h4 className="mb-2">語意色彩</h4>
        {Object.entries(COLORS.SEMANTIC).map(([name, color]) => (
          <div
            key={name}
            className="h-12 mb-2 rounded flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            {name}: {color}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// EXAMPLE 7: Using Feature Flags
// =============================================================================

export function FeatureBasedUI() {
  return (
    <div className="space-y-4">
      {CONFIG.FEATURES.ENABLE_CHAT && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}>
            聊天功能已啟用
          </p>
        </div>
      )}

      {CONFIG.FEATURES.BETA.EMERGENCY_ALERT && (
        <div className="p-4 bg-red-50 rounded-lg">
          <p style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}>
            緊急警報功能 (測試版)
          </p>
        </div>
      )}

      {!CONFIG.FEATURES.ENABLE_VIDEO_CALLS && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }} className="text-gray-500">
            視訊通話功能即將推出
          </p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// EXAMPLE 8: Using Routes Configuration
// =============================================================================

export function NavigationExample() {
  return (
    <nav className="flex gap-4 p-4 bg-white shadow">
      <a
        href={ROUTES.ELDER_HOME}
        style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}
        className="text-orange-600 hover:text-orange-700"
      >
        長者首頁
      </a>
      <a
        href={ROUTES.FAMILY_DASHBOARD}
        style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}
        className="text-green-600 hover:text-green-700"
      >
        家屬儀表板
      </a>
      <a
        href={ROUTES.PRESENTATION}
        style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}
        className="text-blue-600 hover:text-blue-700"
      >
        募資簡報
      </a>

      {/* External links */}
      <div className="ml-auto flex gap-4">
        <a
          href={ROUTES.EXTERNAL.HELP_CENTER}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: ELDER_UI.FONT_SIZES.SM }}
          className="text-gray-600 hover:text-gray-700"
        >
          幫助中心
        </a>
        <a
          href={ROUTES.EXTERNAL.PRIVACY_POLICY}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: ELDER_UI.FONT_SIZES.SM }}
          className="text-gray-600 hover:text-gray-700"
        >
          隱私政策
        </a>
      </div>
    </nav>
  );
}

// =============================================================================
// EXAMPLE 9: Using Responsive Configuration
// =============================================================================

export function ResponsiveLayout() {
  const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < CONFIG.DEVICE.BREAKPOINTS.TABLET) {
        setDeviceType('mobile');
      } else if (width < CONFIG.DEVICE.BREAKPOINTS.DESKTOP) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="p-4">
      <p style={{ fontSize: ELDER_UI.FONT_SIZES.BASE }}>
        當前設備類型: {deviceType}
      </p>
      <p style={{ fontSize: ELDER_UI.FONT_SIZES.SM }} className="text-gray-500">
        平板斷點: {CONFIG.DEVICE.BREAKPOINTS.TABLET}px <br />
        桌面斷點: {CONFIG.DEVICE.BREAKPOINTS.DESKTOP}px
      </p>
    </div>
  );
}

// =============================================================================
// EXAMPLE 10: Complete Component Using Multiple Configurations
// =============================================================================

export function CompleteHealthDashboard() {
  const mockMetrics: HealthMetrics = {
    heartRate: {
      value: 75,
      timestamp: new Date(),
      status: 'normal',
    },
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
      timestamp: new Date(),
      status: 'normal',
    },
    steps: {
      count: 5234,
      goal: HEALTH.STEPS.DAILY_GOAL,
      progress: 65,
      timestamp: new Date(),
    },
  };

  const mockBalance: PointsBalance = {
    total: 2500,
    available: 2500,
    pending: 0,
    lastUpdated: new Date(),
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundColor: COLORS.NEUTRAL[50],
      }}
    >
      <h1
        style={{
          fontSize: ELDER_UI.FONT_SIZES['4XL'],
          color: COLORS.PRIMARY.ORANGE[600],
        }}
        className="mb-8 font-bold"
      >
        健康儀表板
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Health Status */}
        <HealthStatusDisplay metrics={mockMetrics} />

        {/* Points Balance */}
        <PointsBalanceCard balance={mockBalance} />
      </div>

      {/* Feature-based components */}
      <div className="mt-8">
        <FeatureBasedUI />
      </div>
    </div>
  );
}
