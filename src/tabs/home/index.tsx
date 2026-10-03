import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { STARTER_ITEMS } from '@/constants/starter-items'
import { StyledSafeAreaView } from '@/helpers/styles'
import { useAuth } from '@/services/context/auth'
import { useUser } from '@/services/context/user'
import Badge from '@/ui/badge'
import Button from '@/ui/button'
import Card from '@/ui/card'
import Icon from '@/ui/icon'
import { SegmentedToggle } from '@/ui/segment-toggle'
import Text from '@/ui/text'

import {
  ActionsContainer,
  CardRow,
  Container,
  Header,
  Section,
  StatCard,
} from './styles'

const HomeScreen = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { userProfile } = useUser()
  const { logoutUser } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'actions'>('overview')

  const displayName = userProfile?.customer?.first_name
    ? `Welcome, ${userProfile.customer.first_name}`
    : 'Welcome, Explorer'

  return (
    <StyledSafeAreaView>
      <Container
        contentContainerStyle={{
          paddingBottom: insets.bottom + 80,
        }}
      >
        <Header>
          <Badge
            i18nLabel="Expo Starter v1.0"
            bgColor="color-primary-200"
            textColor="color-neutral-1000"
          />
          <Text variant="h2.bold" spacingTop="xs" color="color-neutral-900">
            {displayName}
          </Text>
          <Text variant="body_md.regular" color="color-neutral-500">
            A production-ready foundation with Expo Router, atomic UI, and
            themes.
          </Text>

          <CardRow>
            <StatCard>
              <Text variant="h3.semiBold" color="color-neutral-900">
                26
              </Text>
              <Text variant="body_xs.regular" color="color-neutral-500">
                UI Atoms Ready
              </Text>
            </StatCard>
            <StatCard>
              <Text variant="h3.semiBold" color="color-neutral-900">
                {STARTER_ITEMS.length}
              </Text>
              <Text variant="body_xs.regular" color="color-neutral-500">
                Sample Features
              </Text>
            </StatCard>
          </CardRow>
        </Header>

        <Section>
          <SegmentedToggle
            options={[
              { label: 'Overview', value: 'overview' },
              { label: 'Quick Actions', value: 'actions' },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'overview' ? (
            <ActionsContainer>
              <Text
                variant="h4.semiBold"
                color="color-neutral-800"
                spacingTop="md"
              >
                Featured Modules
              </Text>

              {STARTER_ITEMS.slice(0, 3).map((item) => (
                <Card
                  key={item.id}
                  paddingVertical="md"
                  paddingHorizontal="md"
                  radius="md"
                  spacingBottom="sm"
                  onPress={() => router.push(`/protected/items/${item.id}`)}
                >
                  <Badge
                    i18nLabel={item.tag}
                    bgColor="color-primary-100"
                    textColor="color-neutral-900"
                  />
                  <Text
                    variant="body_lg.semiBold"
                    spacingTop="xxs"
                    color="color-neutral-900"
                  >
                    {item.title}
                  </Text>
                  <Text
                    variant="body_sm.regular"
                    color="color-neutral-500"
                    spacingTop="xxs"
                  >
                    {item.description}
                  </Text>
                </Card>
              ))}
            </ActionsContainer>
          ) : (
            <ActionsContainer>
              <Text
                variant="h4.semiBold"
                color="color-neutral-800"
                spacingTop="md"
              >
                Demonstrations
              </Text>

              <Button
                type="solid"
                color="color-primary-300"
                titleColor="color-neutral-1000"
                onPress={() => router.push('/protected/modal')}
                icon={<Icon name="sparkle" />}
              >
                Open Demo Modal
              </Button>

              <Button
                type="outline"
                color="color-neutral-900"
                titleColor="color-neutral-900"
                onPress={() => router.push('/protected/items/1')}
                icon={<Icon name="magnifyingGlass" />}
              >
                Inspect Dynamic Route ([id])
              </Button>

              <Button
                type="clear"
                titleColor="color-danger-500"
                onPress={logoutUser}
                icon={<Icon name="arrowLeft" color="color-danger-500" />}
              >
                Sign Out
              </Button>
            </ActionsContainer>
          )}
        </Section>
      </Container>
    </StyledSafeAreaView>
  )
}

export default HomeScreen
