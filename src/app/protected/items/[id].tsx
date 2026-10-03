import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { STARTER_ITEMS } from '@/constants/starter-items'
import { StyledPageWrapper, StyledSafeAreaView } from '@/helpers/styles'
import Badge from '@/ui/badge'
import Button from '@/ui/button'
import Card from '@/ui/card'
import Icon from '@/ui/icon'
import Text from '@/ui/text'

export default function ItemDetailScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { id } = useLocalSearchParams<{ id: string }>()

  const item = STARTER_ITEMS.find((entry) => entry.id === id)

  if (!item) {
    return (
      <StyledSafeAreaView>
        <StyledPageWrapper>
          <View style={styles.notFoundContainer}>
            <Text variant="h2.bold" color="color-neutral-900">
              Item Not Found
            </Text>
            <Text
              variant="body_md.regular"
              color="color-neutral-500"
              spacingTop="xs"
            >
              No module found with ID &quot;{id}&quot;.
            </Text>
            <Button
              type="solid"
              color="color-primary-300"
              titleColor="color-neutral-1000"
              spacingTop={24}
              onPress={() => router.back()}
              icon={<Icon name="arrowLeft" />}
            >
              Go Back
            </Button>
          </View>
        </StyledPageWrapper>
      </StyledSafeAreaView>
    )
  }

  return (
    <StyledSafeAreaView>
      <StyledPageWrapper>
        <View style={styles.headerRow}>
          <Button
            type="clear"
            full={false}
            titleColor="color-neutral-900"
            onPress={() => router.back()}
            icon={<Icon name="arrowLeft" />}
          >
            Back
          </Button>
          <Badge
            i18nLabel={item.tag}
            bgColor="color-primary-200"
            textColor="color-neutral-1000"
          />
        </View>

        <View style={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
          <Text variant="h1.bold" color="color-neutral-900" spacingTop="md">
            {item.title}
          </Text>

          <Text
            variant="body_lg.medium"
            color="color-neutral-600"
            spacingTop="xs"
          >
            {item.subtitle}
          </Text>

          <Card
            paddingVertical="lg"
            paddingHorizontal="lg"
            radius="lg"
            spacingTop="lg"
          >
            <Text variant="h4.semiBold" color="color-neutral-900">
              Description
            </Text>
            <Text
              variant="body_md.regular"
              color="color-neutral-600"
              spacingTop="xs"
            >
              {item.description}
            </Text>
          </Card>

          <Card
            paddingVertical="lg"
            paddingHorizontal="lg"
            radius="lg"
            spacingTop="md"
          >
            <Text variant="h4.semiBold" color="color-neutral-900">
              Dynamic Route Details
            </Text>
            <Text
              variant="body_sm.regular"
              color="color-neutral-500"
              spacingTop="xs"
            >
              Route segment: &quot;items/[id].tsx&quot;
            </Text>
            <Text
              variant="body_sm.regular"
              color="color-neutral-500"
              spacingTop="xxs"
            >
              Resolved parameter: id = {id}
            </Text>
          </Card>

          <Button
            type="outline"
            color="color-primary-300"
            titleColor="color-neutral-900"
            spacingTop={24}
            onPress={() => router.push('/protected/modal')}
            icon={<Icon name="sparkle" />}
          >
            Open Modal from Dynamic Route
          </Button>
        </View>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  content: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})
