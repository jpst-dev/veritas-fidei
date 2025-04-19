import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  GiftIcon,
  BookOpenIcon,
  UserGroupIcon,
  HeartIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  TagIcon,
  BookmarkIcon,
  ClockIcon,
  ChartBarIcon,
  ScaleIcon,
  FireIcon,
  BoltIcon,
  ExclamationCircleIcon,
  ChevronUpIcon,
  UserIcon,
  UsersIcon,
  LightBulbIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  HomeIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

// This file provides icon mappings for components to use
// when they need to dynamically reference icons by string name

// Create a mapping of icon names to their correct components
// Make sure to include all icons that might be referenced by string name in your application
export const iconMap: Record<string, any> = {
  // Basic icons
  AcademicCapIcon,
  BuildingOfficeIcon,
  GiftIcon,
  BookOpenIcon,
  UserGroupIcon,
  HeartIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  TagIcon,
  BookmarkIcon,
  ChartBarIcon,
  ScaleIcon,
  ClockIcon,
  FireIcon,
  BoltIcon,
  ExclamationCircleIcon,
  ChevronUpIcon,
  UserIcon,
  UsersIcon,
  HomeIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,

  // Icon name mappings (for backwards compatibility or convenience)
  LightBulbIcon: FireIcon,
  SparklesIcon: BoltIcon,
  ExclamationTriangleIcon: ExclamationCircleIcon,
  ArrowUpIcon: ChevronUpIcon,
};

// Function to safely get an icon component by string name
export const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || BookOpenIcon; // Default to BookOpenIcon if not found
};

export default getIconComponent;
