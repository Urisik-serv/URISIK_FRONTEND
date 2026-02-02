export interface PostFamilyRoomRequest {
  familySize: number;
  familyComposition: FamilyComposition;
  familyPolicy: string;
}

export interface FamilyComposition {
  hasMother: boolean;
  hasFather: boolean;
  sonCount: number;
  daughterCount: number;
}
