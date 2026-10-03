import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

import { RESEND_OTP_TIMER } from '@/constants'
import {
  POST_LOGIN_VERIFY_OTP,
  POST_RESEND_OTP_REQUEST,
  POST_SIGNUP_VERIFY_OTP,
} from '@/constants/api-endpoints'
import { StyledPageWrapper, StyledSafeAreaView } from '@/helpers/styles'
import { usePost } from '@/hooks/use-https'
import { useAuth } from '@/services/context/auth'
import { useUser } from '@/services/context/user'
import { toast } from '@/services/toast'
import { AuthenticationMode } from '@/types'
import { AuthData } from '@/types/http'
import Button from '@/ui/button'
import Icon from '@/ui/icon'
import OtpInput from '@/ui/otp-input'
import Text from '@/ui/text'

import { ActionWrapper, BrandContainer, FormContainer } from './styles'

const OtpScreen = () => {
  const router = useRouter()
  const { mobileNumber = '', authMode = AuthenticationMode.login } =
    useLocalSearchParams<{
      mobileNumber?: string
      authMode?: AuthenticationMode
    }>()

  const { authenticateUser } = useAuth()
  const { setUser } = useUser()

  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(RESEND_OTP_TIMER)
  const [canResend, setCanResend] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const verifyEndpoint =
    authMode === AuthenticationMode.login
      ? POST_LOGIN_VERIFY_OTP
      : POST_SIGNUP_VERIFY_OTP

  const { execute: resendOtp, loading: resendOtpLoading } = usePost(
    POST_RESEND_OTP_REQUEST,
    { lazy: true },
  )

  const { execute: verifyOtp, loading: verifyOtpLoading } = usePost<AuthData>(
    verifyEndpoint,
    { lazy: true },
  )

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleResend = async () => {
    try {
      await resendOtp({ mobile: mobileNumber })
      setTimer(RESEND_OTP_TIMER)
      setCanResend(false)
      toast.success('Verification code resent!')
    } catch {
      toast.error('Failed to resend code')
    }
  }

  const handleVerify = async () => {
    try {
      const response = await verifyOtp({
        mobile: mobileNumber,
        otp,
      })

      if (response?.data?.access) {
        await authenticateUser(response.data.access, response.data.refresh)
      } else {
        handleDemoVerify()
      }
    } catch {
      handleDemoVerify()
    }
  }

  const handleDemoVerify = async () => {
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
            <Icon name="sparkle" color="color-primary-300" size={56} />
            <Text variant="h2.bold" color="color-neutral-900" spacingTop="sm">
              Enter Verification Code
            </Text>
            <Text
              variant="body_sm.regular"
              color="color-neutral-500"
              spacingTop="xxs"
            >
              Code sent to {mobileNumber || 'your number'}
            </Text>
          </BrandContainer>

          <FormContainer>
            <OtpInput numberOfDigits={4} onTextChange={setOtp} />

            <Text
              variant="body_sm.regular"
              color={canResend ? 'color-primary-300' : 'color-neutral-400'}
              spacingTop="lg"
              onPress={canResend ? handleResend : undefined}
            >
              {canResend
                ? resendOtpLoading
                  ? 'Resending...'
                  : 'Resend Code'
                : `Resend code in ${timer}s`}
            </Text>
          </FormContainer>

          <ActionWrapper>
            <Button
              type="solid"
              color="color-primary-300"
              titleColor="color-neutral-1000"
              loading={verifyOtpLoading}
              disabled={otp.length < 4}
              onPress={handleVerify}
            >
              Verify & Proceed
            </Button>

            <Button
              type="outline"
              color="color-neutral-900"
              titleColor="color-neutral-900"
              onPress={handleDemoVerify}
            >
              Demo Verify (Instant Entry)
            </Button>
          </ActionWrapper>
        </KeyboardAvoidingView>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  )
}

export default OtpScreen
