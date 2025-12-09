// Gerenciamento de LocalStorage para o app Minha Obra

import { User, Work, Message, Notification, Material } from './types';

const STORAGE_KEYS = {
  CURRENT_USER: 'minha_obra_current_user',
  USERS: 'minha_obra_users',
  WORKS: 'minha_obra_works',
  MESSAGES: 'minha_obra_messages',
  NOTIFICATIONS: 'minha_obra_notifications',
  MATERIALS: 'minha_obra_materials',
};

// User Management
export const saveCurrentUser = (user: User | null) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const saveUser = (user: User) => {
  if (typeof window !== 'undefined') {
    const users = getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
};

export const getUsers = (): User[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const getUserById = (id: string): User | null => {
  const users = getUsers();
  return users.find(u => u.id === id) || null;
};

// Works Management
export const saveWork = (work: Work) => {
  if (typeof window !== 'undefined') {
    const works = getWorks();
    const index = works.findIndex(w => w.id === work.id);
    if (index >= 0) {
      works[index] = work;
    } else {
      works.push(work);
    }
    localStorage.setItem(STORAGE_KEYS.WORKS, JSON.stringify(works));
  }
};

export const getWorks = (): Work[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.WORKS);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const getWorkById = (id: string): Work | null => {
  const works = getWorks();
  return works.find(w => w.id === id) || null;
};

export const getWorksByClientId = (clientId: string): Work[] => {
  const works = getWorks();
  return works.filter(w => w.clientId === clientId);
};

export const getWorksByColaboradorId = (colaboradorId: string): Work[] => {
  const works = getWorks();
  return works.filter(w => w.colaboradorId === colaboradorId);
};

// Messages Management
export const saveMessage = (message: Message) => {
  if (typeof window !== 'undefined') {
    const messages = getMessages();
    messages.push(message);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }
};

export const getMessages = (): Message[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const getMessagesByWorkId = (workId: string): Message[] => {
  const messages = getMessages();
  return messages.filter(m => m.workId === workId).sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

export const markMessageAsRead = (messageId: string) => {
  if (typeof window !== 'undefined') {
    const messages = getMessages();
    const message = messages.find(m => m.id === messageId);
    if (message) {
      message.read = true;
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
  }
};

// Notifications Management
export const saveNotification = (notification: Notification) => {
  if (typeof window !== 'undefined') {
    const notifications = getNotifications();
    notifications.unshift(notification);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }
};

export const getNotifications = (): Notification[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const getNotificationsByUserId = (userId: string): Notification[] => {
  const notifications = getNotifications();
  return notifications.filter(n => n.userId === userId);
};

export const markNotificationAsRead = (notificationId: string) => {
  if (typeof window !== 'undefined') {
    const notifications = getNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    }
  }
};

// Materials Management
export const saveMaterial = (material: Material) => {
  if (typeof window !== 'undefined') {
    const materials = getMaterials();
    const index = materials.findIndex(m => m.id === material.id);
    if (index >= 0) {
      materials[index] = material;
    } else {
      materials.push(material);
    }
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
  }
};

export const getMaterials = (): Material[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.MATERIALS);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const searchMaterials = (query: string): Material[] => {
  const materials = getMaterials();
  const lowerQuery = query.toLowerCase();
  return materials.filter(m => 
    m.name.toLowerCase().includes(lowerQuery) ||
    m.category.toLowerCase().includes(lowerQuery) ||
    m.supplier.toLowerCase().includes(lowerQuery)
  );
};

// Initialize demo data
export const initializeDemoData = () => {
  if (typeof window !== 'undefined') {
    // Check if already initialized
    if (localStorage.getItem(STORAGE_KEYS.USERS)) {
      return;
    }

    // Demo materials
    const demoMaterials: Material[] = [
      {
        id: '1',
        name: 'Tinta Acrílica Premium 18L',
        category: 'Pintura',
        supplier: 'Tintas Brasil',
        price: 189.90,
        location: 'São Paulo - SP',
        rating: 4.8,
        description: 'Tinta acrílica de alta cobertura'
      },
      {
        id: '2',
        name: 'Cimento CP-II 50kg',
        category: 'Alvenaria',
        supplier: 'Construmax',
        price: 32.50,
        location: 'São Paulo - SP',
        rating: 4.5,
        description: 'Cimento de alta qualidade'
      }
    ];

    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(demoMaterials));
  }
};
