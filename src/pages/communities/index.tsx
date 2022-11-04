import { useContext } from 'react'
import NextLink from 'next/link'
import { Flex, Box, Heading, Divider, Button, Icon, Text, Avatar, Badge } from "@chakra-ui/react"
import { motion } from 'framer-motion'
import { RiAddLine, RiBubbleChartLine, RiPencilLine } from "react-icons/ri"

//import { withSSRAuth } from "../../utils/withSSRAuth"
import { CommunitiesContext } from '../../contexts/CommunityContext'
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"

export default function Communities() {
  const { userCommunities } = useContext(CommunitiesContext)

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p="6"
          maxW={800}
        >
          <Flex align="center" justify="space-between">
            <Heading size="lg" fontWeight="normal">My Communities</Heading>

            <NextLink href="/communities/create" passHref>
              <Button
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="orange"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Add new
              </Button>
            </NextLink>
          </Flex>

          <Divider my="6" borderColor="gray.700" />
          
          <Flex direction="column" gap={2}>
            { userCommunities && userCommunities.length > 0 ? (
              userCommunities.map(community => (
                <Flex 
                  as={motion.div}
                  key={community.communityId}
                  bg="gray.900" 
                  borderRadius={6} 
                  p={2} 
                  alignItems="center"
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.5 },
                  }}
                >
                  <Avatar 
                    icon={<RiBubbleChartLine fontSize="2rem" />} 
                    src={community.coverImage} 
                    borderRadius={4} 
                    size="lg" 
                  />
                  
                  <NextLink href={`/community/${community.slug}`} key={community.communityId} passHref>
                    <Box as='a' ml='3'>
                      <Flex align="center" gap={2}>
                        <Text fontWeight='bold' fontSize="xl">
                          {community.name}
                        </Text>
                        <Badge colorScheme='orange' variant="solid">
                          {community.categoryName}
                        </Badge>
                      </Flex>
                      <Text fontSize='sm'>{community.memberCount} members</Text>
                    </Box>
                  </NextLink>

                  <NextLink href={`/communities/${community.slug}`} passHref>
                    <Button
                      as="a" 
                      colorScheme="orange"
                      variant="ghost"
                      ml="auto"
                      px={0}
                      title="Edit"
                    >
                      <RiPencilLine size={18} />
                    </Button>
                  </NextLink>
                </Flex>
              ))
            ) : (
              <Flex
                align="center"
                direction="column"
                gap={4}
                mt={10}
              >
                <RiBubbleChartLine fontSize="60" />
                <Text>
                  Looks like you don&apos;t have any fandom communities yet
                </Text>
                <NextLink href="/communities/create" passHref>
                  <Button
                    as="a" 
                    fontSize="sm" 
                    colorScheme="orange"
                    mt={6}
                  >
                    Create community
                  </Button>
                </NextLink>
              </Flex>
            )}
          </Flex>  
        </Box>
      </Flex>
    </Flex>
  )
}

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   return {
//     props: {}
//   }
// })