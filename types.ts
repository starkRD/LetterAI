
export enum LetterCategory {
  VALENTINE = 'Valentine Gift',
  CLOSURE = 'Closure Gift',
  FRIENDS = 'Friends Gift',
  ANNIVERSARY = 'Anniversary Milestone',
  BIRTHDAY = 'Birthday Wish',
  APOLOGY = 'Heartfelt Apology'
}

export interface LetterData {
  senderName: string;
  recipientName: string;
  category: LetterCategory;
  memory: string;
  tone: string;
  photo?: string; // base64 string
}

export interface GeneratedLetter {
  content: string;
  title: string;
}
