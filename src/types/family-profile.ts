interface Allergy {
  id: string;
  name: string;
  icon: string;
  alternativeIngredients: string[];
}

interface WishList {
  id: number;
  name: string;
  category: string;
  tags: string[];
  rating: number;
}

export interface FamilyProfile {
  id: number;
  name: string;
  role: string;
  preferences: {
    likedFood: string[];
  };
  allergies: Allergy[];
  wishList: WishList[];
}

export interface FamilyMembers {
  familyMembers: FamilyProfile[];
}
