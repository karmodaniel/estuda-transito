export interface SidebarItem {
  key: string;
  title: string;
  icon: string;
  route: string;
  tooltip?: string;
}

export const SIDEBAR_CONFIG: SidebarItem[] = [
  {
    key: 'placas',
    title: 'Placas',
    icon: 'book',
    route: '/placas',
    tooltip: 'Estudar placas de trânsito',
  },
  {
    key: 'quiz',
    title: 'Quiz',
    icon: 'question-circle',
    route: '/quiz',
    tooltip: 'Testar conhecimentos',
  },
];

export const SIDEBAR_HEADER = {
  title: 'Estuda Trânsito',
  icon: 'home',
  tooltip: 'Página inicial',
};
