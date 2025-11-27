import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { MOCKED_USERS, User } from '../data/user';

type AuthContextData = {
  user: User | null;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signOut: () => void;
  signUp: (userData: User) => Promise<boolean>;
  
  enrollInCourse: (courseId: string) => void;
  unenrollFromCourse: (courseId: string) => void; // Função de sair
  isEnrolled: (courseId: string) => boolean;
  
  toggleFavorite: (courseId: string) => void;
  isFavorite: (courseId: string) => boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const DB_KEY = '@myApp:usersDB';
const SESSION_KEY = '@myApp:sessionUser';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);

  // Carregamento Inicial
  useEffect(() => {
    async function loadData() {
      try {
        const storedUsersParams = await AsyncStorage.getItem(DB_KEY);
        const storedSession = await AsyncStorage.getItem(SESSION_KEY);

        let currentList: User[] = [];

        if (storedUsersParams) {
          currentList = JSON.parse(storedUsersParams);
        } else {
          currentList = MOCKED_USERS;
          await AsyncStorage.setItem(DB_KEY, JSON.stringify(currentList));
        }
        
        setUsersList(currentList);

        if (storedSession) {
          const sessionUser = JSON.parse(storedSession);
          const updatedUser = currentList.find(u => u.id === sessionUser.id);
          if (updatedUser) {
            setUser(updatedUser);
          }
        }
      } catch (error) {
        console.log("Erro ao carregar dados", error);
      }
    }
    loadData();
  }, []);

  // Helper Central de Salvamento
  const saveUserChanges = async (updatedUser: User) => {
    setUser(updatedUser);
    const newUsersList = usersList.map(u => (u.id === updatedUser.id ? updatedUser : u));
    setUsersList(newUsersList);

    try {
      await AsyncStorage.setItem(DB_KEY, JSON.stringify(newUsersList));
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Erro ao salvar persistência", error);
    }
  };

  // --- Auth Functions ---
  async function signIn(email: string, pass: string) {
    const foundUser = usersList.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);
    if (foundUser) {
      const safeUser = {
        ...foundUser,
        enrolledCoursesIds: foundUser.enrolledCoursesIds || [],
        favoriteCoursesIds: foundUser.favoriteCoursesIds || [],
        completedCoursesIds: foundUser.completedCoursesIds || []
      };
      setUser(safeUser);
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
      return true;
    }
    return false;
  }

  async function signUp(newUser: User) {
    if (usersList.some(u => u.email === newUser.email)) return false;
    
    const userToRegister: User = {
        ...newUser,
        enrolledCoursesIds: [],
        favoriteCoursesIds: [],
        completedCoursesIds: []
    };
    
    const newList = [...usersList, userToRegister];
    setUsersList(newList);
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(newList));
    
    setUser(userToRegister);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userToRegister));
    return true;
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  }

  // --- Course Functions ---
  function enrollInCourse(courseId: string) {
    if (!user) return;
    const currentEnrolled = user.enrolledCoursesIds || [];
    
    // Evita duplicatas (Converte para String para garantir)
    if (currentEnrolled.some(id => String(id) === String(courseId))) {
        Alert.alert("Aviso", "Você já está inscrito neste curso.");
        return;
    }
    
    const updatedUser = { ...user, enrolledCoursesIds: [...currentEnrolled, courseId] };
    saveUserChanges(updatedUser);
    Alert.alert("Sucesso", "Inscrição realizada!");
  }

  // CORREÇÃO PRINCIPAL: REMOVER INSCRIÇÃO
  function unenrollFromCourse(courseId: string) {
    if (!user) return;
    
    const currentEnrolled = user.enrolledCoursesIds || [];

    // Filtra removendo o ID (Força comparação de String)
    const newEnrolled = currentEnrolled.filter(id => String(id) !== String(courseId));
    
    const updatedUser = { 
        ...user, 
        enrolledCoursesIds: newEnrolled 
    };

    saveUserChanges(updatedUser);
    Alert.alert("Cancelado", "Sua inscrição foi cancelada.");
  }

  function isEnrolled(courseId: string): boolean {
      if (!user || !user.enrolledCoursesIds) return false;
      return user.enrolledCoursesIds.some(id => String(id) === String(courseId));
  }

  // --- Favorite Functions ---
  function toggleFavorite(courseId: string) {
    if (!user) return;
    const currentFavorites = user.favoriteCoursesIds || [];
    const isAlreadyFavorite = currentFavorites.some(id => String(id) === String(courseId));
    
    let newFavorites: string[];
    if (isAlreadyFavorite) {
      newFavorites = currentFavorites.filter(id => String(id) !== String(courseId));
    } else {
      newFavorites = [...currentFavorites, courseId];
    }

    const updatedUser = { ...user, favoriteCoursesIds: newFavorites };
    saveUserChanges(updatedUser);
  }

  function isFavorite(courseId: string): boolean {
      if (!user || !user.favoriteCoursesIds) return false;
      return user.favoriteCoursesIds.some(id => String(id) === String(courseId));
  }

  return (
    <AuthContext.Provider value={{ 
        user, signIn, signOut, signUp, 
        enrollInCourse, unenrollFromCourse, isEnrolled, 
        toggleFavorite, isFavorite 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);