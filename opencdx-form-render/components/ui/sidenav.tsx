import React, { useCallback, useEffect, useMemo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Link, useNavigation, usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cn } from "../../lib/cn";

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

export const SidebarLink: React.FC<SidebarLinkProps> = ({ link, className }) => {
  const pathname = usePathname();
  const navigation = useNavigation();

  const selected = useMemo(() => pathname.includes(link.href), [pathname, link.href]);

  useEffect(() => {
    if (link.href === '/dashboard') {
      AsyncStorage.getItem('serviceToken').then(token => {
        if (!token) navigation.navigate('auth/login' as never);
      });
    }
  }, [link.href, navigation]);

  const handlePress = useCallback(async () => {
    if (link.href === '/auth/login') {
      await AsyncStorage.removeItem('serviceToken');
    }
    link.onClick?.();
  }, [link]);

  const linkStyle = cn(
    "flex-row items-start justify-start py-2 rounded-lg",
    className
  );

  const viewStyle = cn(
    selected
      ? 'bg-gradient-to-r from-blue-800 to-blue-500 pr-10 pl-2 py-3 rounded-lg'
      : 'py-2 ml-2',
    'flex-row items-start justify-start'
  );

  const textStyle = `
    text-white dark:text-neutral-200 text-sm pl-2
    group-hover/sidebar:translate-x-1 transition duration-150
    text-left
  `;

  return (
    <Link href={link.href as any} asChild>
      <TouchableOpacity className={linkStyle} onPress={handlePress}>
        <View className={viewStyle}>
          <View className="flex-row justify-start pl-2">
            {link.icon}
            <Text className={textStyle}>{link.label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SidebarLink;
