interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
  createdAt: string;
}

type CreateUserPayload = Omit<UserProfile, "id" | "createdAt">;
type UpdateUserPayload = Partial<UserProfile>;
type PublicProfile = Pick<UserProfile, "username" | "bio" | "avatarUrl">;
type UserStore = Record<string, UserProfile>;

function createUser(payload: CreateUserPayload): UserProfile {
  return { id: 1, createdAt: new Date().toISOString(), ...payload };
}

function updateUser(
  profile: UserProfile,
  changes: UpdateUserPayload,
): UserProfile {
  return { ...profile, ...changes };
}

function toPublicProfile(profile: UserProfile): PublicProfile {
  return {
    username: profile.username,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl,
  };
}

function addToStore(store: UserStore, profile: UserProfile): UserStore {
  return { ...store, [String(profile.id)]: profile };
}

const newUser = createUser({
  username: "alice",
  email: "alice@example.com",
  bio: "Learning TypeScript",
  avatarUrl: "https://example.com/alice.png",
});

console.log(newUser);
console.log(updateUser(newUser, { bio: "TypeScript enthusiast" }));
console.log(toPublicProfile(newUser));
console.log(addToStore({}, newUser));
