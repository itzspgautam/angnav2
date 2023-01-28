import {
  Box,
  Grid,
  GridItem,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const ContestDetailsSkeleton = () => {
  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gap="5"
    >
      <GridItem w="100%" h="100%">
        <Box
          h="100%"
          bg="white"
          borderRadius={"lg"}
          boxShadow="sm"
          p={3}
          mt={{ base: "5", lg: "0" }}
        >
          <Stack>
            <Skeleton height="40px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
          <Stack mt="5">
            <Skeleton height="10px" />
            <Skeleton height="10px" />
            <Skeleton height="10px" />
          </Stack>
        </Box>
      </GridItem>
      <GridItem w="100%">
        <Box
          h="100%"
          bg="white"
          borderRadius={"lg"}
          boxShadow="sm"
          p={3}
          mt={{ base: "5", lg: "0" }}
        >
          <Stack>
            <Box display={"flex"} gap="2">
              <SkeletonCircle height="40px" flexGrow={1} />
              <SkeletonCircle height="40px" flexGrow={1} />
            </Box>
          </Stack>
          <Stack mt="5">
            <Skeleton height="20px" />

            <Skeleton height="10px" />
            <Skeleton height="10px" />
            <Skeleton height="10px" />
            <Skeleton height="10px" />
            <Skeleton height="10px" />
            <Skeleton height="10px" />
          </Stack>
        </Box>
      </GridItem>

      <GridItem w="100%">
        <Box
          h="100%"
          bg="white"
          borderRadius={"lg"}
          boxShadow="sm"
          p={3}
          mt={{ base: "5", lg: "0" }}
        >
          <Stack>
            <Box display={"flex"} gap="2">
              <SkeletonCircle height="100px" width={"100px"} flexGrow={1} />
            </Box>
          </Stack>
          <Stack mt="5">
            <Skeleton height="20px" />

            <Skeleton height="10px" />

            <Skeleton height="10px" />
            <Skeleton height="50px" />
          </Stack>
        </Box>
      </GridItem>
      <GridItem w="100%" h="100%">
        <Box
          h="100%"
          bg="white"
          borderRadius={"lg"}
          boxShadow="sm"
          p={3}
          mt={{ base: "5", lg: "0" }}
        >
          <Stack>
            <Skeleton height="40px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
          <Stack mt="5">
            <Skeleton height="10px" />
            <Skeleton height="10px" />
            <Skeleton height="10px" />
          </Stack>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ContestDetailsSkeleton;
