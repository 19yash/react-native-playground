import { useQuery } from '@tanstack/react-query'

import { STARTER_ITEMS, StarterItem } from '@/constants/starter-items'

export const useItems = () => {
  return useQuery<StarterItem[]>({
    queryKey: ['items'],
    queryFn: async () => {
      // In a real application, replace this with your API call, e.g.:
      // const response = await api.get('/items')
      // return response.data
      return STARTER_ITEMS
    },
  })
}
