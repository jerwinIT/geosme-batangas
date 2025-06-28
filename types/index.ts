export interface Business {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  municipality: string;
  category: string;
  priceRange: string;
  isFavorite: boolean;
  paymentMethods: string[];
  status?: "pending" | "approved" | "rejected" | "under_review";
  ownerName?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  businessLicense?: string;
  registrationDate?: string;
  lastUpdated?: string;
  description?: string;
  operatingHours?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  tags?: string[];
  verified?: boolean;
}

export interface Municipality {
  id: string;
  name: string;
  businessCount: number;
  imageUrl: string;
}

export interface BusinessCategory {
  id: string;
  name: string;
  icon: string;
  businessCount: number;
}

export interface SMEStats {
  pendingVerification: number;
  underReview: number;
  approvedSMEs: number;
  rejectedSMEs: number;
  totalSMEs: number;
}

export interface SMEFilter {
  status?: "all" | "pending" | "approved" | "rejected" | "under_review";
  municipality?: string;
  category?: string;
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SMETableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface SMETableRow {
  id: string;
  business: Business;
  actions: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "sme_owner" | "regular_user";
  status: "active" | "inactive" | "suspended" | "pending";
  avatar?: string;
  phone?: string;
  municipality?: string;
  businessId?: string; // For SME owners
  businessName?: string; // For SME owners
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  permissions?: string[];
  isVerified: boolean;
}

export interface UserFilter {
  role?: "all" | "admin" | "sme_owner" | "regular_user";
  status?: "all" | "active" | "inactive" | "suspended" | "pending";
  municipality?: string;
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  smeOwners: number;
  admins: number;
  regularUsers: number;
  suspendedUsers: number;
  newUsersThisMonth: number;
}
