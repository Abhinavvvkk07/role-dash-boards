type DashboardType = 'admin' | 'employee' | 'management' | 'login';
type Theme = 'dark' | 'light' | 'system';

export const getStorageKey = (dashboard: DashboardType) => `vite-ui-theme-${dashboard}`;

export const getDashboardTheme = (dashboard: DashboardType): Theme => {
  const theme = localStorage.getItem(getStorageKey(dashboard));
  return (theme as Theme) || 'dark';
};

export const setDashboardTheme = (dashboard: DashboardType, theme: Theme) => {
  localStorage.setItem(getStorageKey(dashboard), theme);
};

export const getCurrentDashboard = (): DashboardType => {
  const path = window.location.pathname;
  if (path.startsWith('/employee')) return 'employee';
  if (path.startsWith('/management')) return 'management';
  if (path.startsWith('/login')) return 'login';
  return 'admin';
}; 