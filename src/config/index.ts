export default {
  appStorageKey: 'verantus@data',
  yahooFinanceApiModules:
    'assetProfile,quoteType,defaultKeyStatistics,financialData',
  yahooFinanceApiKey: import.meta.env.VITE_YAHOO_FINANCE_API_KEY as string
} as const;
