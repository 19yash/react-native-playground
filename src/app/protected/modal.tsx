import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { StyledPageWrapper, StyledSafeAreaView } from '@/helpers/styles'
import Button from '@/ui/button'
import Card from '@/ui/card'
import Icon from '@/ui/icon'
import Text from '@/ui/text'

export default function ModalScreen() {
  const router = useRouter()

  return (
    <StyledSafeAreaView>
      <StyledPageWrapper>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text variant="h2.bold" color="color-neutral-900">
              Demo Modal Route
            </Text>
            <Button
              type="clear"
              full={false}
              onPress={() => router.back()}
              icon={<Icon name="close" />}
            >
              Close
            </Button>
          </View>

          <Card
            paddingVertical="lg"
            paddingHorizontal="lg"
            radius="lg"
            spacingTop="md"
          >
            <Text variant="h4.semiBold" color="color-neutral-900">
              Modal Conventions in Expo Router
            </Text>
            <Text
              variant="body_md.regular"
              color="color-neutral-600"
              spacingTop="xs"
            >
              This screen is registered as a modal presentation in the protected
              layout stack:
            </Text>
            <Text
              variant="body_sm.regular"
              color="color-neutral-500"
              spacingTop="xs"
            >
              options=&#123;&#123; presentation: &apos;modal&apos; &#125;&#125;
            </Text>
          </Card>

          <Card
            paddingVertical="lg"
            paddingHorizontal="lg"
            radius="lg"
            spacingTop="md"
          >
            <Text variant="h4.semiBold" color="color-neutral-900">
              Deep-Link Support
            </Text>
            <Text
              variant="body_md.regular"
              color="color-neutral-600"
              spacingTop="xs"
            >
              Modals in Expo Router have real URL paths. You can deep link
              directly to `/protected/modal` from notification payloads or web
              URLs.
            </Text>
          </Card>

          <Button
            type="solid"
            color="color-primary-300"
            titleColor="color-neutral-1000"
            spacingTop={24}
            onPress={() => router.back()}
          >
            Dismiss Modal
          </Button>
        </View>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
})
