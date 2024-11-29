import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Divider,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock blog post data (in a real app, this would come from an API)
const blogPost = {
  title: 'Getting Started with Our Platform',
  content: `
    <h2>Introduction</h2>
    <p>Welcome to our comprehensive guide on getting started with our platform. Whether you're a new user or looking to explore advanced features, this guide will help you make the most of our tools and services.</p>

    <h2>Key Features</h2>
    <p>Our platform offers a wide range of features designed to enhance your productivity and streamline your workflow:</p>
    <ul>
      <li>Intuitive dashboard for easy navigation</li>
      <li>Powerful analytics tools</li>
      <li>Collaborative workspaces</li>
      <li>Advanced security features</li>
    </ul>

    <h2>Setting Up Your Account</h2>
    <p>Getting started is easy. Follow these simple steps:</p>
    <ol>
      <li>Create your account using your email address</li>
      <li>Verify your email</li>
      <li>Complete your profile</li>
      <li>Invite team members</li>
    </ol>

    <h2>Best Practices</h2>
    <p>To get the most out of our platform, consider these best practices:</p>
    <ul>
      <li>Regularly update your security settings</li>
      <li>Use two-factor authentication</li>
      <li>Keep your team information up to date</li>
      <li>Regularly backup your data</li>
    </ul>

    <h2>Advanced Features</h2>
    <p>Once you're comfortable with the basics, explore our advanced features:</p>
    <ul>
      <li>Custom workflows</li>
      <li>API integration</li>
      <li>Advanced reporting</li>
      <li>Automated tasks</li>
    </ul>

    <h2>Getting Support</h2>
    <p>If you need help at any point, our support team is here for you. You can:</p>
    <ul>
      <li>Contact our 24/7 support team</li>
      <li>Browse our knowledge base</li>
      <li>Join our community forums</li>
      <li>Schedule a demo with our team</li>
    </ul>
  `,
  image: 'https://source.unsplash.com/random/1200x600?technology',
  category: 'Tutorial',
  date: '2024-01-15',
  author: {
    name: 'Sarah Johnson',
    avatar: 'https://source.unsplash.com/random/100x100?portrait',
    role: 'Product Manager',
  },
  readTime: '8 min read',
  relatedPosts: [
    {
      id: 2,
      title: 'Best Practices for Team Collaboration',
      excerpt: 'Discover proven strategies to enhance team productivity...',
      image: 'https://source.unsplash.com/random/400x300?team',
      slug: 'team-collaboration-best-practices',
    },
    {
      id: 3,
      title: 'Security Updates: What You Need to Know',
      excerpt: 'Stay informed about our latest security features...',
      image: 'https://source.unsplash.com/random/400x300?security',
      slug: 'security-updates-guide',
    },
  ],
};

const BlogPost = () => {
  useParams();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Back to Blog Button */}
        <Button
          component={RouterLink}
          to="/blog"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4 }}
        >
          Back to Blog
        </Button>

        {/* Header Image */}
        <Box
          component="img"
          src={blogPost.image}
          alt={blogPost.title}
          sx={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            borderRadius: 2,
            mb: 4,
          }}
        />

        {/* Article Header */}
        <Box sx={{ mb: 4 }}>
          <Chip label={blogPost.category} sx={{ mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            {blogPost.title}
          </Typography>

          {/* Author Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={blogPost.author.avatar}
              alt={blogPost.author.name}
              sx={{ width: 48, height: 48, mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1">
                {blogPost.author.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {blogPost.author.role} • {blogPost.readTime} • {' '}
                {new Date(blogPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Article Content */}
        <Box
          sx={{ mb: 6 }}
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        <Divider sx={{ mb: 6 }} />

        {/* Related Posts */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            Related Articles
          </Typography>
          <Grid container spacing={4}>
            {blogPost.relatedPosts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6}>
                <Card
                  component={RouterLink}
                  to={`/blog/${post.slug}`}
                  sx={{
                    display: 'flex',
                    height: '100%',
                    textDecoration: 'none',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={post.image}
                    alt={post.title}
                    sx={{
                      width: 160,
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogPost;
