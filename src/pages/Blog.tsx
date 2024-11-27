import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

// Mock blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Our Platform',
    excerpt: 'Learn how to make the most of our platform with this comprehensive guide for beginners.',
    image: 'https://source.unsplash.com/random/800x600?technology',
    category: 'Tutorial',
    date: '2024-01-15',
    author: 'Sarah Johnson',
    slug: 'getting-started-platform',
  },
  {
    id: 2,
    title: 'Best Practices for Team Collaboration',
    excerpt: 'Discover proven strategies to enhance team productivity and collaboration in remote environments.',
    image: 'https://source.unsplash.com/random/800x600?team',
    category: 'Productivity',
    date: '2024-01-10',
    author: 'Michael Chen',
    slug: 'team-collaboration-best-practices',
  },
  {
    id: 3,
    title: 'Security Updates: What You Need to Know',
    excerpt: 'Stay informed about our latest security features and how they protect your data.',
    image: 'https://source.unsplash.com/random/800x600?security',
    category: 'Security',
    date: '2024-01-05',
    author: 'Alex Rivera',
    slug: 'security-updates-guide',
  },
  {
    id: 4,
    title: 'Upcoming Features: Q1 2024',
    excerpt: 'Get a sneak peek at the exciting new features we\'re launching in the first quarter of 2024.',
    image: 'https://source.unsplash.com/random/800x600?future',
    category: 'Product Updates',
    date: '2024-01-01',
    author: 'Emily Watson',
    slug: 'upcoming-features-q1-2024',
  },
];

const Blog = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Header */}
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Blog
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" paragraph>
          Insights, updates, and resources to help you make the most of our platform
        </Typography>

        {/* Search and Filter */}
        <Box sx={{ my: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search articles..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Featured Categories */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          {['All', 'Tutorial', 'Productivity', 'Security', 'Product Updates'].map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              color={category === 'All' ? 'primary' : 'default'}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={6}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={post.category} 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      By {post.author}
                    </Typography>
                    <Button 
                      component={RouterLink} 
                      to={`/blog/${post.slug}`}
                      size="small" 
                      color="primary"
                    >
                      Read More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" color="primary">
            Load More Articles
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Blog;
