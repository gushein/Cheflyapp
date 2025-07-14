import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Chef, Booking, Review, Subscription, LoyaltyReward, AIMenuSuggestion, Notification, Invoice } from '@/types';

interface AppState {
  currentUser: User | null;
  chefs: Chef[];
  bookings: Booking[];
  reviews: Review[];
  subscriptions: Subscription[];
  loyaltyRewards: LoyaltyReward[];
  aiSuggestions: AIMenuSuggestion[];
  notifications: Notification[];
  invoices: Invoice[];
  loading: boolean;
  currentLanguage: 'en' | 'az' | 'ru';
  trackingEnabled: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CHEFS'; payload: Chef[] }
  | { type: 'UPDATE_CHEF_LOCATION'; payload: { chefId: string; location: any } }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'UPDATE_BOOKING'; payload: { id: string; updates: Partial<Booking> } }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'SET_SUBSCRIPTIONS'; payload: Subscription[] }
  | { type: 'ADD_SUBSCRIPTION'; payload: Subscription }
  | { type: 'SET_LOYALTY_REWARDS'; payload: LoyaltyReward[] }
  | { type: 'UPDATE_LOYALTY_POINTS'; payload: { userId: string; points: number } }
  | { type: 'SET_AI_SUGGESTIONS'; payload: AIMenuSuggestion[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_INVOICES'; payload: Invoice[] }
  | { type: 'ADD_INVOICE'; payload: Invoice }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'az' | 'ru' }
  | { type: 'TOGGLE_TRACKING'; payload: boolean };

const initialState: AppState = {
  currentUser: null,
  chefs: [],
  bookings: [],
  reviews: [],
  subscriptions: [],
  loyaltyRewards: [],
  aiSuggestions: [],
  notifications: [],
  invoices: [],
  loading: false,
  currentLanguage: 'en',
  trackingEnabled: true
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_CHEFS':
      return { ...state, chefs: action.payload };
    case 'UPDATE_CHEF_LOCATION':
      return {
        ...state,
        chefs: state.chefs.map(chef =>
          chef.id === action.payload.chefId
            ? { ...chef, currentLocation: action.payload.location }
            : chef
        )
      };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id
            ? { ...booking, ...action.payload.updates }
            : booking
        )
      };
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };
    case 'SET_SUBSCRIPTIONS':
      return { ...state, subscriptions: action.payload };
    case 'ADD_SUBSCRIPTION':
      return { ...state, subscriptions: [...state.subscriptions, action.payload] };
    case 'SET_LOYALTY_REWARDS':
      return { ...state, loyaltyRewards: action.payload };
    case 'UPDATE_LOYALTY_POINTS':
      return {
        ...state,
        currentUser: state.currentUser
          ? { ...state.currentUser, loyaltyPoints: action.payload.points }
          : null
      };
    case 'SET_AI_SUGGESTIONS':
      return { ...state, aiSuggestions: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification
        )
      };
    case 'SET_INVOICES':
      return { ...state, invoices: action.payload };
    case 'ADD_INVOICE':
      return { ...state, invoices: [...state.invoices, action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    case 'TOGGLE_TRACKING':
      return { ...state, trackingEnabled: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}