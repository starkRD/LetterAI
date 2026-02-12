
import React from 'react';
import { LetterCategory } from './types';

export const CATEGORIES = [
  { id: LetterCategory.VALENTINE, icon: '💝', label: 'Valentine Gift', description: 'Express deep romantic love and passion.' },
  { id: LetterCategory.CLOSURE, icon: '🕊️', label: 'Closure Gift', description: 'Gracefully say goodbye or find peace.' },
  { id: LetterCategory.FRIENDS, icon: '👫', label: 'Friends Gift', description: 'Celebrate a platonic bond that lasts.' },
  { id: LetterCategory.ANNIVERSARY, icon: '✨', label: 'Anniversary', description: 'Commemorate years of love together.' },
  { id: LetterCategory.BIRTHDAY, icon: '🎂', label: 'Birthday', description: 'Make their special day even more special.' },
  { id: LetterCategory.APOLOGY, icon: '🙏', label: 'Apology', description: 'Mend broken bridges with sincere words.' }
];

export const THEMES = {
  PRIMARY: 'rose-500',
  SECONDARY: 'rose-600',
  ACCENT: 'rose-100',
  TEXT_HEADING: 'rose-900',
};

export const PROMO_URL = 'https://songcart.in/pages/a-custom-song';
