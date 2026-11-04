export interface CommunityEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string; // ISO string from the API
  creatorEmail: string;
  creatorName: string;
  createdAt: string;
    participantCount?: number;
  hasPassed?: boolean;
}