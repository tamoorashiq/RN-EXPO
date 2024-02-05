// store/auth.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  password: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  users: User[];
  currentUser: User | null;
}

const initialUsers: User[] = [
  { name: "user1", email: "user1@gmail.com", password: "password1" },
  { name: "user2", email: "user2@gmail.com", password: "password2" },
  // Add more predefined users as needed
];

const initialState: AuthState = {
  isAuthenticated: false,
  users: initialUsers,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        state.isAuthenticated = true;
        state.currentUser = user;
      } else {
        // Handle unsuccessful login
        state.isAuthenticated = false;
        state.currentUser = null;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
