import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Globe } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';

const LANGUAGES = [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'az' as const, name: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'ru' as const, name: 'Русский', flag: '🇷🇺' }
];

export function LanguageSelector() {
  const { state, dispatch } = useApp();

  const handleLanguageChange = (language: 'en' | 'az' | 'ru') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Globe size={20} color="#3B82F6" />
        <Text style={styles.title}>Language / Dil / Язык</Text>
      </View>
      
      <View style={styles.languageList}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageItem,
              state.currentLanguage === lang.code && styles.selectedLanguage
            ]}
            onPress={() => handleLanguageChange(lang.code)}
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            <Text style={[
              styles.languageName,
              state.currentLanguage === lang.code && styles.selectedLanguageName
            ]}>
              {lang.name}
            </Text>
            {state.currentLanguage === lang.code && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  languageList: {
    gap: 8,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  selectedLanguage: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  selectedLanguageName: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});