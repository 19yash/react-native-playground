import { useRouter } from 'expo-router'
import React from 'react'

import { StyledPageWrapper, StyledSafeAreaView } from '@/helpers/styles'
import { useAuth } from '@/services/context/auth'
import { useUser } from '@/services/context/user'
import { AuthenticationMode } from '@/types'
import Button from '@/ui/button'
import Icon from '@/ui/icon'
import Text from '@/ui/text'

import { ActionContainer, TopContainer } from './styles'

const Onboarding = () => {
  const router = useRouter()
  const { authenticateUser } = useAuth()
  const { setUser } = useUser()

  const navigateToAuthScreen = (authMode: AuthenticationMode) => {
    router.push({
      pathname: '/unprotected/authentication',
      params: { authMode },
    })
  }

  const handleDemoSignIn = async () => {
    setUser({
      address: {
        id: 1,
        address_1: '123 Starter Way',
        address_2: 'Suite 400',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        pincode: '94103',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      customer: {
        id: 'cust-1',
        first_name: 'Alex',
        last_name: 'Doe',
        dob: '1995-01-01',
        gender: 'OTHER',
        aadhaar_number: '1234',
        is_profile_completed: true,
        created_at: new Date().toISOString(),
      },
      kyc_document: {
        file_name: 'doc.pdf',
        file_size_bytes: 1024,
        mime_type: 'application/pdf',
        url: 'https://example.com/doc.pdf',
      },
      profile_image: {
        file_name: 'avatar.png',
        file_size_bytes: 2048,
        mime_type: 'image/png',
        url: '',
      },
      user: {
        id: 'user-1',
        mobile: '+1234567890',
        email: 'alex.doe@example.com',
        is_active: true,
        verification_process_status: 'VERIFIED',
        verification_notes: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    })
    await authenticateUser('demo-access-token', 'demo-refresh-token')
  }

  return (
    <StyledSafeAreaView>
      <StyledPageWrapper>
        <TopContainer>
          <Icon name="sparkle" color="color-primary-300" size={80} />
          <Text
            variant="h1.bold"
            color="color-neutral-900"
            spacingTop="md"
            align="center"
          >
            Expo Starter
          </Text>
          <Text
            variant="body_md.regular"
            color="color-neutral-500"
            spacingTop="xs"
            align="center"
          >
            A scalable, decoupled React Native starter with Expo Router, atomic
            UI, and theme tokens.
          </Text>
        </TopContainer>

        <ActionContainer>
          <Button
            type="solid"
            color="color-primary-300"
            titleColor="color-neutral-1000"
            onPress={handleDemoSignIn}
          >
            Explore App (Demo Sign In)
          </Button>
          <Button
            type="outline"
            color="color-neutral-900"
            titleColor="color-neutral-900"
            onPress={() => navigateToAuthScreen(AuthenticationMode.login)}
          >
            Sign In with Phone
          </Button>
          <Button
            type="clear"
            titleColor="color-neutral-600"
            onPress={() => navigateToAuthScreen(AuthenticationMode.signup)}
          >
            Create New Account
          </Button>
        </ActionContainer>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  )
}

export default Onboarding
