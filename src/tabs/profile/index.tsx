import React from 'react'
import { Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import ActionList from '@/components/action-list'
import { ActionListOption } from '@/components/action-list/typings'
import { ProfileImagePickerView } from '@/components/profile-image-picker-view'
import { StyledSafeAreaView } from '@/helpers/styles'
import { useAuth } from '@/services/context/auth'
import { useTheme } from '@/services/context/theme'
import { useUser } from '@/services/context/user'
import { ThemeType } from '@/types'
import Button from '@/ui/button'
import Icon from '@/ui/icon'
import Text from '@/ui/text'
import { Toggle } from '@/ui/toggle'

import {
  Container,
  Header,
  LogoutButtonWrapper,
  Section,
  ThemeToggleCard,
} from './styles'

const ProfileScreen = () => {
  const insets = useSafeAreaInsets()
  const { logoutUser } = useAuth()
  const { userProfile } = useUser()
  const { theme, toggleTheme } = useTheme()

  const userName = userProfile?.customer?.first_name
    ? `${userProfile.customer.first_name} ${userProfile.customer.last_name || ''}`.trim()
    : 'Alex Doe'
  const userEmail = userProfile?.user?.email || 'alex.doe@example.com'
  const isDarkMode = theme === ThemeType.dark

  const settingsOptions: ActionListOption[] = [
    {
      leftTitle: 'Notifications',
      rightIconName: 'arrowRight',
      onPress: () =>
        Alert.alert(
          'Notifications',
          'Notification preferences can be configured here.',
        ),
    },
    {
      leftTitle: 'Security & Privacy',
      rightIconName: 'arrowRight',
      onPress: () =>
        Alert.alert('Security', 'Security settings can be customized here.'),
    },
    {
      leftTitle: 'About Expo Starter',
      rightIconName: 'arrowRight',
      rightTitle: 'v1.0.0',
      onPress: () =>
        Alert.alert(
          'Expo Starter',
          'A universal React Native + Expo production-grade starter boilerplate.',
        ),
    },
  ]

  return (
    <StyledSafeAreaView>
      <Container
        contentContainerStyle={{
          paddingBottom: insets.bottom + 80,
        }}
      >
        <Header>
          <ProfileImagePickerView
            size={88}
            onPress={() => Alert.alert('Avatar', 'Profile image picker demo')}
          />
          <Text variant="h2.bold" color="color-neutral-900" spacingTop="sm">
            {userName}
          </Text>
          <Text
            variant="body_sm.regular"
            color="color-neutral-500"
            spacingTop="xxs"
          >
            {userEmail}
          </Text>
        </Header>

        <Section>
          <Text
            variant="h4.semiBold"
            color="color-neutral-800"
            spacingBottom="sm"
          >
            Preferences
          </Text>
          <ThemeToggleCard>
            <Text variant="body_md.medium" color="color-neutral-900">
              Dark Mode
            </Text>
            <Toggle value={isDarkMode} onChange={toggleTheme} />
          </ThemeToggleCard>

          <Text
            variant="h4.semiBold"
            color="color-neutral-800"
            spacingBottom="sm"
            spacingTop="md"
          >
            Settings
          </Text>
          <ActionList options={settingsOptions} />
        </Section>

        <LogoutButtonWrapper>
          <Button
            type="outline"
            color="color-danger-500"
            titleColor="color-danger-500"
            onPress={logoutUser}
            icon={<Icon name="arrowLeft" color="color-danger-500" />}
          >
            Sign Out
          </Button>
        </LogoutButtonWrapper>
      </Container>
    </StyledSafeAreaView>
  )
}

export default ProfileScreen
