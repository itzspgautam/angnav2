import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdInfo, MdMail, MdPerson, MdPhone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateUser } from "../../Redux/Actions/UserActions";

const UpdateProfileTab = () => {
  const toast = useToast();
  const Dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.User);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [iAm, setIAm] = useState("");
  const [iamDesc, setIamDesc] = useState("");

  const handleIamSelect = (iamSelected) => {
    setIAm(iamSelected);
  };

  const updateprofileSubmithandle = () => {
    const updatedData = {
      name,
      email,
      phone,
      gender,
      iAm: { iAm_type: iAm, iAm_designation: iamDesc },
    };
    Dispatch(updateUser(updatedData));
  };

  useEffect(() => {
    if (!user) return;
    setName(user.name ? user.name : "");
    setEmail(user.email ? user.email : "");
    setPhone(user.phone ? user.phone : "");
    setGender(user.gender ? user.gender : "");
    setIAm(user.iAm ? user.iAm.iAm_type : "");
    setIamDesc(user.iAm ? user.iAm.iAm_designation : "");
  }, [user]);

  useEffect(() => {
    if (!error) {
      return;
    }
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    Dispatch(clearErrors());
  }, [error, Dispatch, toast]);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent={"space-between"}
      h="100%"
    >
      <Stack spacing={4} p="3">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<MdPerson />}
          />
          <Input
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<MdMail />}
          />
          <Input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isReadOnly={user.authProvider === "phone" ? false : true}
          />
          <InputRightElement children={<CheckIcon color="green.500" />} />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<MdPhone />}
          />
          <Input
            placeholder="Enter Phone Number"
            value={phone ? phone : ""}
            onChange={(e) => setPhone(e.target.value)}
            isReadOnly={user.authProvider === "phone" ? true : false}
          />
          <InputRightElement children={<CheckIcon color="green.500" />} />
        </InputGroup>

        <InputGroup>
          <Select
            placeholder="Select Gender"
            color="gray.500"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Other</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Select
            placeholder="I am"
            color="gray.500"
            onChange={(e) => handleIamSelect(e.target.value)}
            value={iAm}
          >
            <option value="Alumni">Alumni</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Other">Other</option>
          </Select>
        </InputGroup>

        {iAm && (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<MdInfo />}
            />
            <Input
              placeholder={
                iAm === "Alumni"
                  ? "Please Enter designation"
                  : iAm === "Student"
                  ? "Please enter your class"
                  : iAm === "Teacher"
                  ? "Please enter your designation"
                  : "Please specify if others"
              }
              value={iamDesc}
              onChange={(e) => setIamDesc(e.target.value)}
            />
          </InputGroup>
        )}
      </Stack>
      <Button
        isLoading={loading ? true : false}
        loadingText="UPDATING..."
        colorScheme={"yellow"}
        onClick={updateprofileSubmithandle}
      >
        UPDATE
      </Button>
    </Box>
  );
};

export default UpdateProfileTab;
