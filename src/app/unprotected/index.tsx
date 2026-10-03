import { Redirect } from 'expo-router'

export default function UnprotectedIndex() {
  // console.log("/unprotected Index - no-op; layout handles routing");
  return <Redirect href="/unprotected/onboarding" />
}
