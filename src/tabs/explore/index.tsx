import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React, { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { STARTER_ITEMS, StarterItem } from '@/constants/starter-items'
import { StyledSafeAreaView } from '@/helpers/styles'
import { useAppStore } from '@/stores/app-store'
import Badge from '@/ui/badge'
import Icon from '@/ui/icon'
import Pressable from '@/ui/pressable'
import Text from '@/ui/text'
import TextInput from '@/ui/text-input'

import {
  Container,
  Header,
  ItemCard,
  ItemHeader,
  SearchInputWrapper,
} from './styles'

const ExploreScreen = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { searchQuery, setSearchQuery, addSearchHistory } = useAppStore()

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return STARTER_ITEMS
    const q = searchQuery.toLowerCase()
    return STARTER_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q),
    )
  }, [searchQuery])

  const handleItemPress = (item: StarterItem) => {
    if (searchQuery.trim()) {
      addSearchHistory(searchQuery.trim())
    }
    router.push(`/protected/items/${item.id}`)
  }

  return (
    <StyledSafeAreaView>
      <Container>
        <Header>
          <Text variant="h2.bold" color="color-neutral-900">
            Explore Modules
          </Text>
          <Text variant="body_sm.regular" color="color-neutral-500">
            Browse foundation items with FlashList & dynamic routing.
          </Text>
          <SearchInputWrapper>
            <TextInput
              i18nPlaceholder="Search components, features..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={<Icon name="search" size={20} />}
            />
          </SearchInputWrapper>
        </Header>

        <FlashList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 80,
          }}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleItemPress(item)}>
              <ItemCard>
                <ItemHeader>
                  <Text variant="body_md.semiBold" color="color-neutral-900">
                    {item.title}
                  </Text>
                  <Badge
                    i18nLabel={item.tag}
                    bgColor="color-primary-200"
                    textColor="color-neutral-1000"
                  />
                </ItemHeader>
                <Text variant="body_sm.regular" color="color-neutral-600">
                  {item.subtitle}
                </Text>
                <Text
                  variant="body_xs.regular"
                  color="color-neutral-400"
                  spacingTop="xs"
                >
                  {item.date}
                </Text>
              </ItemCard>
            </Pressable>
          )}
          ListEmptyComponent={
            <Header>
              <Text
                variant="body_md.regular"
                color="color-neutral-500"
                align="center"
              >
                No modules match &quot;{searchQuery}&quot;.
              </Text>
            </Header>
          }
        />
      </Container>
    </StyledSafeAreaView>
  )
}

export default ExploreScreen
