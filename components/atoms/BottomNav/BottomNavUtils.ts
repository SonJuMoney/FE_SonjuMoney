export type BottomNavItemData = {
  path: string;
  label: string;
};

export type PathInfo = Record<string, boolean>;

export const BOTTOM_NAV_ITEM_DATA: Array<BottomNavItemData> = [
  { path: '/home', label: '홈' },
  { path: '/feed', label: '소식' },
  { path: '/calendar', label: '일정' },
  { path: '/call', label: '화상통화' },
];

// 특정 path에서 BottomNav Open 여부 데이터 객체
export const BOTTOM_NAV_PATH_INFO: PathInfo = {
  '/home': true,
  '/feed': true,
  '/calendar': true,
  '/call': true,
};
