export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar: string;
  bio: string;
  stats: {
    topicsRead: number;
    comments: number;
    lastActive: string;
  };
}

export interface Comment {
  id: string;
  userId: string;
  topicId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
}

export const users: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    role: "admin",
    avatar: "/avatars/joao.jpg",
    bio: "Estudante de Teologia e Filosofia",
    stats: {
      topicsRead: 15,
      comments: 8,
      lastActive: "2024-03-15",
    },
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    role: "user",
    avatar: "/avatars/maria.jpg",
    bio: "Interessada em Apologética Católica",
    stats: {
      topicsRead: 10,
      comments: 5,
      lastActive: "2024-03-15",
    },
  },
];

export const comments: Comment[] = [
  {
    id: "1",
    userId: "1",
    topicId: 1,
    content:
      "Excelente explicação das Cinco Vias! Gostaria de saber mais sobre a relação entre a Primeira Via e a física moderna.",
    createdAt: "2024-03-15T10:30:00",
    updatedAt: "2024-03-15T10:30:00",
    likes: 3,
    replies: [
      {
        id: "1-1",
        userId: "2",
        content:
          "Ótima pergunta! A física moderna, especialmente a mecânica quântica, não invalida a Primeira Via, mas oferece novas perspectivas sobre o movimento.",
        createdAt: "2024-03-15T11:15:00",
        updatedAt: "2024-03-15T11:15:00",
        likes: 2,
      },
    ],
  },
  {
    id: "2",
    userId: "2",
    topicId: 2,
    content:
      "O argumento cosmológico Kalam é muito convincente! Como ele se relaciona com a teoria do multiverso?",
    createdAt: "2024-03-15T14:20:00",
    updatedAt: "2024-03-15T14:20:00",
    likes: 1,
    replies: [],
  },
];
