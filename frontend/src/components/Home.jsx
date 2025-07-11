import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://localhost:3001/delete/${id}`)
        .then((res) => {
          alert(res.data.message);
          fetchBlogs();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEdit = (blog) => {
    navigate("/add", { state: { blog, isEdit: true } });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url}
                alt={blog.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.content}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button 
                  size="small" 
                  sx={{ mr: 1, backgroundColor: "violet", color: "white", "&:hover": { backgroundColor: "darkviolet" } }}
                  onClick={() => handleEdit(blog)}
                >
                  Update
                </Button>
                <Button 
                  size="small" 
                  sx={{ backgroundColor: "violet", color: "white", "&:hover": { backgroundColor: "darkviolet" } }}
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;