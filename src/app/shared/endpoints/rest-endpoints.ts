export const restEndpoints = {
  getExchanges: (baseCurrency: string = "USD") => `/api/latest/${baseCurrency}`,
  getConvertedData: (baseCurrency: string, quoteCurrency: string) => `/api/pair/${baseCurrency}/${quoteCurrency}`
};
