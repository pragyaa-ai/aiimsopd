"use client";

import React, { createContext, useContext, useState, FC, PropsWithChildren } from 'react';

export interface DataPoint {
  id: string;
  name: string;
  value: string | null;
  status: 'pending' | 'captured' | 'verified';
  timestamp?: Date;
  attempts?: number;
  needsExpert?: boolean;
}

interface DataCollectionContextValue {
  capturedData: DataPoint[];
  captureDataPoint: (dataId: string, value: string, status?: 'captured' | 'verified') => void;
  updateDataPoint: (dataId: string, updates: Partial<DataPoint>) => void;
  resetAllData: () => void;
  getCompletionPercentage: () => number;
  getCapturedCount: () => number;
  exportData: () => any;
  incrementAttempt: (dataId: string) => number;
  getAttempts: (dataId: string) => number;
  markNeedsExpert: (dataId: string) => void;
  getValueById: (dataId: string) => string | null;
}

const DataCollectionContext = createContext<DataCollectionContextValue | undefined>(undefined);

export const useDataCollection = () => {
  const context = useContext(DataCollectionContext);
  if (context === undefined) {
    throw new Error('useDataCollection must be used within a DataCollectionProvider');
  }
  return context;
};

export const DataCollectionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [capturedData, setCapturedData] = useState<DataPoint[]>([
    { id: 'preferred_language', name: 'Preferred Language', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'date', name: 'Date', value: new Date().toISOString().slice(0,10), status: 'captured', attempts: 0, needsExpert: false },
    { id: 'department', name: 'Department to be shown', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'patient_name', name: 'Name (BLOCK LETTERS)', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'age', name: 'Age', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'gender', name: 'Gender', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'guardian_relation', name: 'S/W/D of', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'address', name: 'Address', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'contact_number', name: 'Contact No.', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'dob', name: 'D.O.B.', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'state', name: 'State', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'referred', name: 'Referred or Not', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'referring_department', name: 'Referring Department', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'token_number', name: 'Registration Token', value: null, status: 'pending', attempts: 0, needsExpert: false },
    { id: 'aadhar_number', name: 'Aadhaar Number', value: null, status: 'pending', attempts: 0, needsExpert: false },
  ]);

  const captureDataPoint = (dataId: string, value: string, status: 'captured' | 'verified' = 'captured') => {
    console.log(`[DataCollection] Capturing ${dataId}: ${value}`);
    setCapturedData(prev => prev.map(item => 
      item.id === dataId 
        ? { ...item, value, status, timestamp: new Date() }
        : item
    ));
  };

  const updateDataPoint = (dataId: string, updates: Partial<DataPoint>) => {
    setCapturedData(prev => prev.map(item => 
      item.id === dataId 
        ? { ...item, ...updates, timestamp: new Date() }
        : item
    ));
  };

  const resetAllData = () => {
    setCapturedData(prev => prev.map(item => ({
      ...item,
      value: null,
      status: 'pending' as const,
      timestamp: undefined
    })));
  };

  const getCompletionPercentage = () => {
    const capturedCount = capturedData.filter(item => item.status === 'captured' || item.status === 'verified').length;
    return Math.round((capturedCount / capturedData.length) * 100);
  };

  const getCapturedCount = () => {
    return capturedData.filter(item => item.status === 'captured' || item.status === 'verified').length;
  };

  const exportData = () => {
    return capturedData
      .filter(item => item.value)
      .reduce((acc, item) => {
        acc[item.name] = {
          value: item.value,
          timestamp: item.timestamp?.toISOString(),
          status: item.status
        };
        return acc;
      }, {} as any);
  };

  const incrementAttempt = (dataId: string) => {
    let newCount = 0;
    setCapturedData(prev => prev.map(item => {
      if (item.id === dataId) {
        newCount = (item.attempts ?? 0) + 1;
        return { ...item, attempts: newCount };
      }
      return item;
    }));
    return newCount;
  };

  const getAttempts = (dataId: string) => {
    const item = capturedData.find(i => i.id === dataId);
    return item?.attempts ?? 0;
  };

  const markNeedsExpert = (dataId: string) => {
    setCapturedData(prev => prev.map(item => 
      item.id === dataId ? { ...item, needsExpert: true, status: 'pending' } : item
    ));
  };

  const getValueById = (dataId: string) => {
    const item = capturedData.find(i => i.id === dataId);
    return item?.value ?? null;
  };

  const value: DataCollectionContextValue = {
    capturedData,
    captureDataPoint,
    updateDataPoint,
    resetAllData,
    getCompletionPercentage,
    getCapturedCount,
    exportData,
    incrementAttempt,
    getAttempts,
    markNeedsExpert,
    getValueById,
  };

  return (
    <DataCollectionContext.Provider value={value}>
      {children}
    </DataCollectionContext.Provider>
  );
}; 