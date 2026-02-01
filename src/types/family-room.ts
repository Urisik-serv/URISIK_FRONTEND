export interface PostFamilyRoomRequest {
  familySize: number;
  familyComposition: FamilyComposition;
  familyPolicy: string;
}

export interface FamilyComposition {
  hasMotehr: boolean;
  hasFather: boolean;
  sonCount: number;
  daughterCount: number;
}
