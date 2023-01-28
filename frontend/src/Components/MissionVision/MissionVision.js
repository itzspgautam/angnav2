import {
  Box,
  Grid,
  GridItem,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";

import visionBg from "../../Assets/Images/visionBg.svg";
import visionIcon from "../../Assets/Images/visionIcon.png";

import missionIcon from "../../Assets/Images/missionIcon.png";

import angnaCircleLogo from "../../Assets/Images/angnaCircleLogo.png";

const MissionVision = () => {
  return (
    <Box p="3">
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
        gap="2"
      >
        <GridItem pt="10">
          <Box h="100%">
            <Tabs variant="soft-rounded" align="center" h="100%">
              <TabList>
                <Tab
                  bg="white"
                  borderRightRadius={0}
                  _selected={{
                    bg: "white",
                  }}
                  borderLeftRadius="3"
                >
                  ABOUT ANGNA
                </Tab>
              </TabList>
              <TabPanels mt="-4" h="100%">
                <TabPanel
                  h="100%"
                  display={{ md: "flex" }}
                  backgroundImage={visionBg}
                  backgroundRepeat="no-repeat"
                  backgroundSize={"cover"}
                  backgroundPosition={{ base: "right", md: "center" }}
                  borderRadius="10"
                  border={"2.5px solid #e6e7e8"}
                  boxShadow="lg"
                >
                  <Box flexShrink={0} borderRadius={5}>
                    <Image
                      height={{ base: "200px", md: "" }}
                      borderRadius="lg"
                      src={angnaCircleLogo}
                      alt="Angna Logo"
                      title="Angna Logo"
                      loading="lazy"
                    />
                  </Box>
                  <Box
                    ml={{ md: 6 }}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                  >
                    <Text
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="sm"
                      letterSpacing="wide"
                      color="teal.600"
                      align={"left"}
                    >
                      What is ANGNA
                    </Text>
                    <Text
                      mt={1}
                      display="block"
                      fontSize="lg"
                      lineHeight="normal"
                      fontWeight="semibold"
                      href="#"
                      align={"left"}
                    >
                      It is an Association of Garhwa Navodaya Alumni
                    </Text>
                    <Text mt={2} color="gray.500" align={"left"}>
                      Our aim to provide a lifelong connection between the
                      Alumni and students of JNV Garhwa. It is a platform for
                      interaction and expression for the various members of JNV
                      Garhwa. JNV Garhwa is situated at Annaraj Nawadih in the
                      Garhwa district of Jharkhand. In collaboration with
                      extremely dedicated volunteers, we seek to connect alumni,
                      support students and build an unforgettable experience
                      through diverse events, programs, councellings and
                      service.
                    </Text>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
        <GridItem>
          <Box h="100%" pt="10">
            <Tabs variant="soft-rounded" align="center" h="100%">
              <TabList>
                <Tab
                  bg="white"
                  borderRightRadius={0}
                  _selected={{
                    bgGradient: "linear(to-l, #7928CA, #FF0080)",
                    color: "white",
                  }}
                  borderLeftRadius="3"
                >
                  VISION
                </Tab>
                <Tab
                  bg="white"
                  borderLeftRadius={0}
                  _selected={{
                    bgGradient: "linear(to-l, #7928CA, #FF0080)",
                    color: "white",
                  }}
                  borderRightRadius="3"
                >
                  MISSION
                </Tab>
              </TabList>
              <TabPanels mt="-4" h="100%">
                <TabPanel
                  h="100%"
                  display={{ md: "flex" }}
                  backgroundImage={visionBg}
                  backgroundRepeat="no-repeat"
                  backgroundSize={"cover"}
                  backgroundPosition={{ base: "right", md: "center" }}
                  borderRadius="10"
                  border={"2.5px solid #e6e7e8"}
                  boxShadow="lg"
                >
                  <Box flexShrink={0}>
                    <Image
                      height={{ base: "200px", md: "" }}
                      borderRadius="lg"
                      width={{ md: 40 }}
                      src={visionIcon}
                      alt="Vision"
                      title="Vision"
                      loading="lazy"
                    />
                  </Box>
                  <Box
                    ml={{ md: 6 }}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                  >
                    <Text
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="sm"
                      letterSpacing="wide"
                      color="teal.600"
                      align={"left"}
                    >
                      Our Vision
                    </Text>

                    <Text mt={2} color="gray.500" align={"left"}>
                      To see JNVites emerging as a global leader/ a complete
                      human committed to serve the humanity of India and World,
                      by establishing mutual cooperation, support, knowledge
                      share and help social sustainable growth through best
                      education practices from school to universities and
                      experience attained from all the spheres of life.
                    </Text>
                  </Box>
                </TabPanel>
                <TabPanel
                  h="100%"
                  display={"flex"}
                  backgroundImage={visionBg}
                  backgroundRepeat="no-repeat"
                  backgroundSize={"cover"}
                  backgroundPosition={{ base: "right", md: "center" }}
                  borderRadius="10"
                  border={"2.5px solid #e6e7e8"}
                  boxShadow="lg"
                  flexDirection={{ base: "column-reverse", md: "row" }}
                >
                  <Box
                    ml={{ md: 6 }}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                  >
                    <Text
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="sm"
                      letterSpacing="wide"
                      color="teal.600"
                      align={"left"}
                    >
                      Our Mission
                    </Text>
                    <Text mt={2} color="gray.500" align={"left"}>
                      The ASSOCIATION OF GARHWA NAVODAYA ALUMNI (ANGNA)
                      (hereafter as “Association”) is formed to consolidate the
                      school’s worldwide alumni network, to connect alumni to
                      the school and other alumni, to provide valued services to
                      its members and mainly to support the current students of
                      the school attaining their goal.
                    </Text>
                  </Box>
                  <Box flexShrink={0}>
                    <Image
                      height={{ base: "200px", md: "" }}
                      borderRadius="lg"
                      width={{ md: 40 }}
                      src={missionIcon}
                      alt="Mission"
                      title="Mission"
                      loading="lazy"
                    />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MissionVision;
