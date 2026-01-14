
const express = require('express');
const router = express.Router();

// Import our mutable mock data
let { posts, trainingPrograms, projects, applications, galleryImages } = require('../data/mockData');

// --- GET Routes ---

router.get('/posts', (req, res) => {
    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(sortedPosts);
});

router.get('/training-programs', (req, res) => {
    const sortedPrograms = [...trainingPrograms].sort((a, b) => b.year - a.year);
    res.json(sortedPrograms);
});

router.get('/projects', (req, res) => {
    const sortedProjects = [...projects].sort((a, b) => b.year - a.year);
    res.json(sortedProjects);
});

router.get('/gallery-images', (req, res) => {
    res.json(galleryImages);
});

router.get('/applications', (req, res) => {
    const sortedApplications = [...applications].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    res.json(sortedApplications);
});


// --- POST Routes ---

router.post('/posts', (req, res) => {
    const { title, description, category, imageUrl } = req.body;
    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const newPost = {
        id: `post_${Date.now()}`,
        createdAt: new Date().toISOString(),
        title,
        description,
        category,
        imageUrl: imageUrl || `https://picsum.photos/seed/${Date.now()}/600/400`,
    };
    posts.unshift(newPost);
    res.status(201).json(newPost);
});

router.post('/applications', (req, res) => {
    const { fullName, email, phone, courseId, courseName, motivation } = req.body;
     if (!fullName || !email || !courseId || !motivation) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const newApplication = {
        id: `app_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        fullName,
        email,
        phone,
        courseId,
        courseName,
        motivation,
    };
    applications.push(newApplication);
    console.log("New Application Submitted via API:", newApplication);
    res.status(201).json(newApplication);
});

router.post('/training-programs', (req, res) => {
    const { title, description, duration, status, year } = req.body;
    if (!title || !description || !duration || !status || !year) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const newProgram = {
        id: `tp_${Date.now()}`,
        title,
        description,
        duration,
        status,
        year,
    };
    trainingPrograms.unshift(newProgram);
    res.status(201).json(newProgram);
});


module.exports = router;
