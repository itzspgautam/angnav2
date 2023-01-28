import React, { useEffect, useState } from "react";
import RichTextEditor from "react-rte";

const Rte = (props) => {
  const [value, setValue] = useState(
    RichTextEditor.createValueFromString("", "html")
  );

  const onChange = (value) => {
    props.setContent(value.toString("html"));
    setValue(value);
    if (props.onChange) {
      props.onChange(value.toString("html"));
    }
  };

  const setInit = (data) => {};

  useEffect(() => {
    setValue(RichTextEditor.createValueFromString(props.content, "html"));
  }, []);

  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      rootStyle={{ borderRadius: "7px", borderColor: "#E2E8F0" }}
      editorStyle={{
        minHeight: "150px",
        fontWeight: "normal",
        fontFamily: "poppins",
      }}
    />
  );
};

export default Rte;
