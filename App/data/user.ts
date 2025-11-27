export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl: string;
  role: 'student' | 'teacher'; 
  bio: string;
  enrolledCoursesIds: string[];  // Já existente
  completedCoursesIds: string[]; // Já existente
  favoriteCoursesIds: string[];  // <--- NOVO CAMPO
};

// Atualize o Mock para incluir o array vazio, senão pode dar erro
export const MOCKED_USERS: User[] = [
  {
    id: 'u1',
    name: 'Isabela da Silva',
    email: 'Bela@email.com',
    password: '123',
    avatarUrl: 'https://placehold.co/200x200/E9D5FF/2E1065?text=IS&font=sans-serif',
    role: 'student',
    bio: 'Estudante apaixonada por tecnologia e design.',
    enrolledCoursesIds: [],
    completedCoursesIds: [], 
    favoriteCoursesIds: [], // <--- Inicialize vazio
  }
];