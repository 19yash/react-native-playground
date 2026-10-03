import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

import { REGEX } from '@/constants'
import {
  POST_LOGIN_OTP_REQUEST,
  POST_SIGNUP_OTP_REQUEST,
} from '@/constants/api-endpoints'
import { StyledPageWrapper, StyledSafeAreaView } from '@/helpers/styles'
import { usePost } from '@/hooks/use-https'
import { useAuth } from '@/services/context/auth'
import { useUser } from '@/services/context/user'
import { toast } from '@/services/toast'
import { AuthenticationMode } from '@/types'
import Button from '@/ui/button'
import Icon from '@/ui/icon'
import Text from '@/ui/text'
import TextInput from '@/ui/text-input'

import { ActionWrapper, BrandContainer, FormContainer } from './styles'

const validatePhoneNumber = (phone: string): string => {
  if (!phone) return 'Phone number is required'
  if (!REGEX.PHONE_NUMBER.test(phone))
    return 'Please enter a valid 10-digit number'
  return ''
}

const AuthenticationScreen = () => {
  const router = useRouter()
  const { authMode = AuthenticationMode.login } = useLocalSearchParams<{
    authMode: AuthenticationMode
  }>()
  const { authenticateUser } = useAuth()
  const { setUser } = useUser()

  const [mobileNumber, setMobileNumber] = useState('')
  const [mobileNumberError, setMobileNumberError] = useState('')

  const endpoint =
    authMode === AuthenticationMode.login
      ? POST_LOGIN_OTP_REQUEST
      : POST_SIGNUP_OTP_REQUEST

  const { loading: requestOtpLoading, execute: requestOtp } = usePost(
    endpoint,
    { lazy: true },
  )

  const isSignup = authMode === AuthenticationMode.signup

  const handleSubmit = async () => {
    const error = validatePhoneNumber(mobileNumber)
    if (error) {
      setMobileNumberError(error)
      return
    }

    try {
      await requestOtp({ mobile: mobileNumber })
      router.push({
        pathname: '/unprotected/otp',
        params: { mobileNumber, authMode },
      })
    } catch {
      toast.error('Failed to send verification code. Try demo sign in.')
    }
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
        mobile: mobileNumber || '+1234567890',
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

  const isSubmitDisabled = useMemo(() => {
    return !mobileNumber || !!validatePhoneNumber(mobileNumber)
  }, [mobileNumber])

  return (
    <StyledSafeAreaView>
      <StyledPageWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <Button
            type="clear"
            full={false}
            onPress={() => router.back()}
            icon={<Icon name="arrowLeft" />}
            titleColor="color-neutral-900"
          >
            Back
          </Button>

          <BrandContainer>
            <Icon name="userAvatar" color="color-primary-300" size={64} />
            <Text variant="h2.bold" color="color-neutral-900" spacingTop="sm">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text
              variant="body_sm.regular"
              color="color-neutral-500"
              spacingTop="xxs"
            >
              Enter your mobile number to receive a one-time passcode.
            </Text>
          </BrandContainer>

          <FormContainer>
            <TextInput
              i18nLabel="Phone Number"
              i18nPlaceholder="e.g. 9876543210"
              value={mobileNumber}
              onChangeText={(text) => {
                setMobileNumber(text.trim())
                if (mobileNumberError) setMobileNumberError('')
              }}
              i18nErrorMessage={mobileNumberError}
              keyboardType="phone-pad"
            />
          </FormContainer>

          <ActionWrapper>
            <Button
              type="solid"
              color="color-primary-300"
              titleColor="color-neutral-1000"
              loading={requestOtpLoading}
              disabled={isSubmitDisabled}
              onPress={handleSubmit}
            >
              Send Verification Code
            </Button>

            <Button
              type="outline"
              color="color-neutral-900"
              titleColor="color-neutral-900"
              onPress={handleDemoSignIn}
            >
              Skip with Demo Login
            </Button>
          </ActionWrapper>
        </KeyboardAvoidingView>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  )
}

export default AuthenticationScreen
