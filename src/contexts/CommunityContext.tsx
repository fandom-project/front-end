import { ReactNode, createContext } from "react"
import Router from 'next/router'
import { toast } from 'react-toastify'

import axios from '../api/axios'
import { useMutation, UseMutationResult } from "react-query"
import { queryClient } from "../services/queryClient"

type CommunitiesContextData = {
  createCommunity: UseMutationResult<void, unknown, CommunityData, unknown>;
  editCommunity: UseMutationResult<void, unknown, CommunityData, unknown>;
  deleteCommunity: UseMutationResult<void, unknown, number, unknown>;
}

type CommunityData = {
  name: string;
  communityId?: number;
  slug?: string;
  categoryId: number;
  coverImage: string;
  bannerImage: string;
  description: string; 
  userId?: number;
}

type CommunitiesContextProviderProps = {
  children: ReactNode;
}

export const CommunitiesContext = createContext({} as CommunitiesContextData)

export function CommunitiesProvider({ children }: CommunitiesContextProviderProps) {
  const createCommunity = useMutation(async (community: CommunityData) => {
    const url = '/communities'

    try {
      const response = await axios.post(url, community)
  
      if (response.status === 201) {
  
        toast.success(response.data.message)

        Router.push('/my-communities')
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }, {
    onSuccess : () => {
      queryClient.invalidateQueries('communities by user'),
      queryClient.invalidateQueries('communities')
    }
  })

  const editCommunity = useMutation(async (community: CommunityData) => {
    const url = `/communities/${community.communityId}`

    console.log(community)

    try {
      const response = await axios.put(url, community)
  
      if (response.status === 200) {
        toast.success("Your community was updated")

        Router.push('/my-communities')
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }, {
    onSuccess : () => {
      queryClient.invalidateQueries('communities by user'),
      queryClient.invalidateQueries('communities')
    }
  })

  const deleteCommunity = useMutation(async (communityId: number) => {
    const url = `/communities/${communityId}`

    try {
      const response = await axios.delete(url)
  
      if (response.status === 200) {
        toast.success("Your community was deleted.")

        Router.push('/my-communities')
      } 
    } catch (e: any) {
        
      const errorMessage = e.response.data.message       

      toast.error(errorMessage)
    }
  }, {
    onSuccess : () => {
      queryClient.invalidateQueries('communities by user'),
      queryClient.invalidateQueries('communities')
    }
  })

  return (
    <CommunitiesContext.Provider value={{
      createCommunity,
      editCommunity,
      deleteCommunity
    }}>
      {children}
    </CommunitiesContext.Provider>
  )
}