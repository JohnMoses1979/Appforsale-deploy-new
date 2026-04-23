import React, { createContext, useContext, useMemo, useState } from 'react';
import { appsData } from '../data/appsData';

const MarketplaceContext = createContext(null);

const safeText = (value) => (typeof value === 'string' ? value.trim() : '');

export function MarketplaceProvider({ children }) {
  const [apps, setApps] = useState(
    appsData.map((item, index) => ({
      ...item,
      id: String(item.id ?? `seed-${index + 1}`),
      isUserUploaded: false,
    }))
  );

  const addApp = (formData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      title: safeText(formData.title),
      description: safeText(formData.description),
      category: safeText(formData.category),
      price: safeText(formData.price),
      image: formData.image || require('../../assets/images/apps/app1.jpg'),
      ownerName: safeText(formData.ownerName),
      ownerEmail: safeText(formData.ownerEmail),
      ownerPhone: safeText(formData.ownerPhone),
      company: safeText(formData.company),
      features: safeText(formData.features),
      isUserUploaded: true,
    };

    setApps((prev) => [newApp, ...prev]);
    return newApp;
  };

  const value = useMemo(
    () => ({
      apps,
      addApp,
    }),
    [apps]
  );

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used inside MarketplaceProvider');
  }
  return context;
}