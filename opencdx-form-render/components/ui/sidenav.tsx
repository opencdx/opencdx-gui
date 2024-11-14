import React, { useCallback, useEffect, useMemo } from 'react';
import { TouchableOpacity, View, Text, Image, ImageSourcePropType } from 'react-native';
import { Link, usePathname, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cn } from "../../lib/cn";

interface Links {
  label: string;
  href: string;
  selectedIcon: ImageSourcePropType;
  unselectedIcon: ImageSourcePropType;
  onClick?: () => void;
}

interface SidebarLinkProps {
  link: Links;
  className?: string;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ link, className }) => {
  const pathname = usePathname();
  const navigation = useNavigation();

  // Check if the current path matches the link's href exactly
  // Normalize paths by ensuring both start with a leading slash
  const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);
  const selected = normalizePath(pathname) === normalizePath(link.href);

  // Debugging information
  console.log(`Current pathname: ${pathname}, link.href: ${link.href}`);
  console.log(`Rendering ${link.label} - selected: ${selected}`);

  useEffect(() => {
    if (link.href === 'app/dashboard') {
      AsyncStorage.getItem('serviceToken').then(token => {
        if (!token) navigation.navigate('app/auth/login' as never);
      });
    }
  }, [link.href, navigation]);

  const handlePress = useCallback(async () => {
    if (link.href === 'app/auth/login') {
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


  // Use the appropriate icon based on the selected state
  const iconSource = selected ? link.selectedIcon : link.unselectedIcon;
  console.log(`Icon for ${link.label} - selected: ${selected}, icon:`, iconSource);


  return (
    <Link href={link.href as any} asChild>
      <TouchableOpacity className={linkStyle} onPress={handlePress}>
        <View className={viewStyle}>
          <View className="flex-row justify-start pl-2">
          <Image source={iconSource} style={{ width: 20, height: 20 }} />
          <Text className={textStyle}>{link.label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SidebarLink;
