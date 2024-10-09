import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Link } from 'expo-router'; // Keep using expo-router
import { cn } from "../../lib/cn"; // Assuming you have a utility for class names

// Assuming you have a custom Icon component that works with React Native
// import Icon from './Icon';

interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface SidebarLinkProps {
  link: Links;
  className?: string;
}

export const SidebarLink = ({ link, className }: SidebarLinkProps) => {
  const isFormBuilder = link.href === '/dashboard';
  return (
    <Link href={link.href as any} asChild>
      <TouchableOpacity
        className={cn(
          "flex-row items-start justify-start py-2 rounded-lg",
          className
        )}
      >
        <View
          className={cn(
            isFormBuilder
              ? 'bg-gradient-to-r from-blue-800 to-blue-500 pr-10 pl-2 py-3 rounded-lg'
              : 'py-2 ml-2',
            'flex-row items-start justify-start' // Ensure left alignment
          )}
        >
          <View className="flex-row justify-start pl-2"> {/* Ensure left alignment */}
            {link.icon}
            <Text
              className="
                text-white dark:text-neutral-200 text-sm pl-2
                group-hover/sidebar:translate-x-1 transition duration-150
                text-left
              "
            >
              {link.label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SidebarLink;