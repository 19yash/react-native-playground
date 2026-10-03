import { Link, Stack } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { StyledPageWrapper, StyledSafeAreaView } from '@/helpers/styles'
import Button from '@/ui/button'
import Card from '@/ui/card'
import Text from '@/ui/text'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <StyledSafeAreaView>
        <StyledPageWrapper>
          <View style={styles.container}>
            <Text variant="h2.bold" color="color-neutral-900">
              Page Not Found
            </Text>
            <Text
              variant="body_md.regular"
              color="color-neutral-500"
              spacingTop="xs"
              align="center"
            >
              This screen doesn&apos;t exist or was moved in the route
              hierarchy.
            </Text>

            <Card
              paddingVertical="md"
              paddingHorizontal="md"
              radius="md"
              spacingTop="lg"
            >
              <Text
                variant="body_sm.medium"
                color="color-neutral-700"
                align="center"
              >
                Expo Router handles unmapped paths via the `+not-found.tsx`
                convention.
              </Text>
            </Card>

            <Link href="/" asChild>
              <Button
                type="solid"
                color="color-primary-300"
                titleColor="color-neutral-1000"
                spacingTop={24}
              >
                Return to Home Screen
              </Button>
            </Link>
          </View>
        </StyledPageWrapper>
      </StyledSafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})
