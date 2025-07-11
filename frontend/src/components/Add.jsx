import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.isEdit || false;
  const blogToEdit = location.state?.blog || null;
  
  var [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  useEffect(() => {
    if (isEdit && blogToEdit) {
      setInputs({
        title: blogToEdit.title,
        content: blogToEdit.content,
        img_url: blogToEdit.img_url,
      });
    }
  }, [isEdit, blogToEdit]);
  const inputHandler = (e) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("in",inputs);
  };
  const addData = () => {
    console.log("clicked", { isEdit, blogToEdit, inputs });
    
    if (isEdit && blogToEdit) {
      console.log("Sending update request:", {
        url: `http://localhost:3001/update/${blogToEdit._id}`,
        data: inputs,
        blogId: blogToEdit._id
      });
      axios.put(`http://localhost:3001/update/${blogToEdit._id}`, inputs)
        .then((res) => {
          console.log("Update success:", res.data);
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log("Update error details:", {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
          });
          alert(`Error updating blog: ${err.response?.data?.message || err.message}`);
        });
    } else {
      axios.post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log("Add error:", err);
          alert("Error adding blog");
        });
    }
  };
  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "600px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Title"
              onChange={inputHandler}
              name="title"
              value={inputs.title}
              fullWidth
            />
            <TextField
              variant="outlined"
              placeholder="content"
              onChange={inputHandler}
              name="content"
              value={inputs.content}
              multiline
              rows={4}
            />
            <TextField
              variant="outlined"
              placeholder="image url"
              onChange={inputHandler}
              name="img_url"
              value={inputs.img_url}
            />

            <Button variant="contained" color="secondary" onClick={addData}>
              {isEdit ? "Update" : "Submit"}
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Add;
