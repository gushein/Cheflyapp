import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, Filter, X } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilter: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, onFilter, placeholder = "Search recipes..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    onChangeText('');
  };

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" />
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {value.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <X size={16} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
        <Filter size={20} color="#68B684" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  focusedContainer: {
    borderColor: '#68B684',
    shadowColor: '#68B684',
    shadowOpacity: 0.1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    paddingVertical: 12,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
});