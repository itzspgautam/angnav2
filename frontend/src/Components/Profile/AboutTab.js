import { Badge, Box, Divider, Link, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { MdEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AboutTab = (props) => {
  const { user } = props;
  return (
    <Box p="3">
      <VStack alignItems={"left"}>
        <Text>
          <b>Full Name :</b>
          {user.name ? (
            user.name
          ) : (
            <Link href="/profile/Update">
              <Badge bg={"yellow.300"} p="1" borderRadius="md">
                <Text display={"flex"} alignItems="center" gap={1}>
                  <MdEdit /> Update Profile
                </Text>
              </Badge>
            </Link>
          )}
        </Text>
        <Text>
          <b>Phone Number :</b>
          {user.phone ? (
            user.phone
          ) : (
            <Link href="/profile/Update">
              <Badge bg={"yellow.300"} p="1" borderRadius="md">
                <Text display={"flex"} alignItems="center" gap={1}>
                  <MdEdit /> Update Profile
                </Text>
              </Badge>
            </Link>
          )}
        </Text>
        <Text>
          <b>Email :</b>
          {user.email ? (
            user.email
          ) : (
            <Link href="/profile/Update">
              <Badge bg={"yellow.300"} p="1" borderRadius="md">
                <Text display={"flex"} alignItems="center" gap={1}>
                  <MdEdit /> Edit Profile
                </Text>
              </Badge>
            </Link>
          )}
        </Text>
        <Text>
          <b>Gender :</b>
          {user.gender ? (
            user.gender
          ) : (
            <Link href="/profile/Update">
              <Badge bg={"yellow.300"} p="1" borderRadius="md">
                <Text display={"flex"} alignItems="center" gap={1}>
                  <MdEdit /> Edit Profile
                </Text>
              </Badge>
            </Link>
          )}
        </Text>
        <Divider />
        <Text>
          <b>I am :</b>
          {user.iAm && user.iAm.iAm_type ? (
            user.iAm.iAm_type
          ) : (
            <Link href="/profile/Update">
              <Badge bg={"yellow.300"} p="1" borderRadius="md">
                <Text display={"flex"} alignItems="center" gap={1}>
                  <MdEdit /> Edit Profile
                </Text>
              </Badge>
            </Link>
          )}
        </Text>
        <Text>
          <b>
            {user.iAm && user.iAm.iAm_type && user.iAm.iAm_type === "Alumni"
              ? "Designation"
              : user.iAm && user.iAm.iAm_type && user.iAm.iAm_type === "Student"
              ? "Student"
              : "Designation"}
            :{" "}
          </b>
          {user.iAm && user.iAm.iAm_designation && user.iAm.iAm_designation ? (
            user.iAm.iAm_designation
          ) : (
            <Link href="/profile/Update">
              <Badge bg={"yellow.300"} p="1" borderRadius="md">
                <Text display={"flex"} alignItems="center" gap={1}>
                  <MdEdit /> Edit Profile
                </Text>
              </Badge>
            </Link>
          )}
        </Text>
      </VStack>
    </Box>
  );
};

export default AboutTab;
