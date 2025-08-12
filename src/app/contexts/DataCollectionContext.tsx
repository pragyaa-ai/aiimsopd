"use client";

import React, { createContext, useContext, useState, FC, PropsWithChildren } from 'react';

export interface DataPoint {
  id: string;
  name: string;
  value: string | null;
  status: 'pending' | 'captured' | 'verified';
  timestamp?: Date;
}

interface DataCollectionContextValue {
  capturedData: DataPoint[];
  captureDataPoint: (dataId: string, value: string, status?: 'captured' | 'verified') => void;
  updateDataPoint: (dataId: string, updates: Partial<DataPoint>) => void;
  resetAllData: () => void;
  getCompletionPercentage: () => number;
  getCapturedCount: () => number;
  exportData: () => any;
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
    { id: 'preferred_language', name: 'Preferred Language', value: null, status: 'pending' },
    { id: 'employee_name', name: 'Employee Name', value: null, status: 'pending' },
    { id: 'job_role', name: 'Job Role/Position', value: null, status: 'pending' },
    { id: 'department', name: 'Department/Team', value: null, status: 'pending' },
    { id: 'experience_level', name: 'Experience Level', value: null, status: 'pending' },
    { id: 'learning_style', name: 'Learning Style Preference', value: null, status: 'pending' },
    { id: 'prior_lms_experience', name: 'Prior LMS Experience', value: null, status: 'pending' },
    { id: 'topik_use_case', name: 'Primary Topik Use Case', value: null, status: 'pending' },
    { id: 'community_role', name: 'Community Role (Admin/Instructor/Learner)', value: null, status: 'pending' },
    { id: 'training_goals', name: 'Training Goals & Objectives', value: null, status: 'pending' },
    { id: 'collaboration_needs', name: 'Collaboration Requirements', value: null, status: 'pending' },
    { id: 'content_creation_needs', name: 'Content Creation Needs', value: null, status: 'pending' },
    { id: 'analytics_requirements', name: 'Analytics & Reporting Needs', value: null, status: 'pending' },
    { id: 'integration_needs', name: 'Integration Requirements', value: null, status: 'pending' },
    { id: 'onboarding_progress', name: 'Onboarding Module Progress', value: null, status: 'pending' },
    { id: 'questions_answered', name: 'Questions Answered', value: null, status: 'pending' },
    { id: 'next_steps', name: 'Recommended Next Steps', value: null, status: 'pending' },
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

  const value: DataCollectionContextValue = {
    capturedData,
    captureDataPoint,
    updateDataPoint,
    resetAllData,
    getCompletionPercentage,
    getCapturedCount,
    exportData,
  };

  return (
    <DataCollectionContext.Provider value={value}>
      {children}
    </DataCollectionContext.Provider>
  );
}; 