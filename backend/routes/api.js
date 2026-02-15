
const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Helper for consistent error handling
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
        console.error(err);
        res.status(500).json({ message: "An internal server error occurred." });
    });
};

// --- Helper Functions for Data Processing ---

const processTrainingProgramRow = (p) => {
    const parsedThread = p.thread ? JSON.parse(p.thread) : [];
    return {
        ...p,
        thread: parsedThread,
        description: (parsedThread.length > 0 && parsedThread[0].text) ? parsedThread[0].text : '',
    };
};

const processProjectRow = (p) => {
    const parsedThread = p.thread ? JSON.parse(p.thread) : [];
    const firstUpdate = parsedThread.length > 0 ? parsedThread[0] : {};
    return {
        ...p,
        thread: parsedThread,
        description: firstUpdate.text || '',
        imageUrl: (firstUpdate.media && firstUpdate.media.length > 0) ? firstUpdate.media[0] : '',
    };
};

const processVtlCraftProjectRow = (p) => {
    const parsedThread = p.thread ? JSON.parse(p.thread) : [];
    const firstUpdate = parsedThread.length > 0 ? parsedThread[0] : {};
    return {
        id: p.id,
        title: p.title,
        createdAt: p.createdAt,
        thread: parsedThread,
        description: firstUpdate.text || '',
        coverImageUrl: (firstUpdate.media && firstUpdate.media.length > 0) ? firstUpdate.media[0] : '',
    };
};

const processStudentProjectRow = (p) => {
    const parsedThread = p.thread ? JSON.parse(p.thread) : [];
    const firstUpdate = parsedThread.length > 0 ? parsedThread[0] : {};
    return {
        id: p.id,
        title: p.title,
        studentName: p.studentName,
        createdAt: p.createdAt,
        thread: parsedThread,
        description: firstUpdate.text || '',
        coverImageUrl: (firstUpdate.media && firstUpdate.media.length > 0) ? firstUpdate.media[0] : '',
        githubLink: p.githubLink || '',
        websiteLink: p.websiteLink || '',
    };
};


// --- GET Routes ---

router.get('/posts', asyncHandler(async (req, res) => {
    const [rows] = await db.query("SELECT uuid as id, title, description, imageUrl, category, createdAt FROM posts ORDER BY createdAt DESC");
    res.json(rows);
}));

router.get('/training-programs', asyncHandler(async (req, res) => {
    const [rows] = await db.query("SELECT uuid as id, title, duration, status, year, applicationUrl, thread, createdAt FROM training_programs ORDER BY createdAt DESC");
    const programs = rows.map(processTrainingProgramRow);
    res.json(programs);
}));

router.get('/training-programs/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.query("SELECT uuid as id, title, duration, status, year, applicationUrl, thread, createdAt FROM training_programs WHERE uuid = ?", [id]);
    if (rows.length > 0) {
        const program = processTrainingProgramRow(rows[0]);
        res.json(program);
    } else {
        res.status(404).json({ message: 'Training program not found' });
    }
}));

router.get('/projects', asyncHandler(async (req, res) => {
    const [rows] = await db.query("SELECT uuid as id, title, year, trainingProgramId, thread, createdAt FROM projects ORDER BY createdAt DESC");
    const projects = rows.map(processProjectRow);
    res.json(projects);
}));

router.get('/projects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.query("SELECT uuid as id, title, year, trainingProgramId, thread, createdAt FROM projects WHERE uuid = ?", [id]);
    if (rows.length > 0) {
        const project = processProjectRow(rows[0]);
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
}));


router.get('/vtl-craft-projects', asyncHandler(async (req, res) => {
    const [rows] = await db.query("SELECT uuid as id, title, thread, createdAt FROM vtl_craft_projects ORDER BY createdAt DESC");
    res.json(rows.map(processVtlCraftProjectRow));
}));

router.get('/vtl-craft-projects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.query("SELECT uuid as id, title, thread, createdAt FROM vtl_craft_projects WHERE uuid = ?", [id]);
    if (rows.length > 0) {
        res.json(processVtlCraftProjectRow(rows[0]));
    } else {
        res.status(404).json({ message: 'VTL Craft project not found' });
    }
}));

router.get('/applications', asyncHandler(async (req, res) => {
    const [rows] = await db.query("SELECT uuid as id, fullName, email, phone, courseId, courseName, motivation, submittedAt FROM applications ORDER BY submittedAt DESC");
    res.json(rows);
}));

// --- POST Routes ---

router.post('/posts', asyncHandler(async (req, res) => {
    const { title, description, category, imageUrl } = req.body;
    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Title, description, and category are required for posts.' });
    }
    const newPost = {
        uuid: uuidv4(),
        title,
        description,
        category,
        imageUrl: imageUrl || `https://picsum.photos/seed/${Date.now()}/600/400`,
    };
    await db.query("INSERT INTO posts (uuid, title, description, category, imageUrl) VALUES (?, ?, ?, ?, ?)", 
        [newPost.uuid, newPost.title, newPost.description, newPost.category, newPost.imageUrl]);
    
    const [createdPost] = await db.query("SELECT uuid as id, title, description, imageUrl, category, createdAt FROM posts WHERE uuid = ?", [newPost.uuid]);
    res.status(201).json(createdPost[0]);
}));

router.post('/vtl-craft-projects', asyncHandler(async (req, res) => {
    const { title, thread } = req.body;
    if (!title || !thread) {
        return res.status(400).json({ message: 'Title and thread are required for VTL Craft projects.' });
    }

    const threadWithIds = (thread || []).map(item => ({...item, id: uuidv4()}));

    const newProject = {
        uuid: uuidv4(),
        title,
        thread: JSON.stringify(threadWithIds),
    };
    
    await db.query("INSERT INTO vtl_craft_projects (uuid, title, thread) VALUES (?, ?, ?)",
        [newProject.uuid, newProject.title, newProject.thread]);
    
    const [createdRow] = await db.query("SELECT uuid as id, title, thread, createdAt FROM vtl_craft_projects WHERE uuid = ?", [newProject.uuid]);
    res.status(201).json(processVtlCraftProjectRow(createdRow[0]));
}));


router.post('/applications', asyncHandler(async (req, res) => {
    const { fullName, email, phone, courseId, courseName, motivation } = req.body;
    if (!fullName || !email || !courseId || !motivation) {
        return res.status(400).json({ message: 'Missing required fields for application.' });
    }
    const newApplication = {
        uuid: uuidv4(),
        fullName,
        email,
        phone,
        courseId,
        courseName,
        motivation,
    };

    await db.query("INSERT INTO applications (uuid, fullName, email, phone, courseId, courseName, motivation) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [newApplication.uuid, newApplication.fullName, newApplication.email, newApplication.phone, newApplication.courseId, newApplication.courseName, newApplication.motivation]);

    const [createdApp] = await db.query("SELECT uuid as id, submittedAt FROM applications WHERE uuid = ?", [newApplication.uuid]);
    res.status(201).json({ ...newApplication, id: newApplication.uuid, submittedAt: createdApp[0].submittedAt });
}));

router.post('/training-programs', asyncHandler(async (req, res) => {
    const { title, duration, status, year, applicationUrl, thread } = req.body;
    if (!title || !duration || !status || !year || !thread) {
        return res.status(400).json({ message: 'Duration, year, and status are required for training programs.' });
    }

    const threadWithIds = (thread || []).map(item => ({...item, id: uuidv4()}));

    const newProgram = {
        uuid: uuidv4(),
        title,
        duration,
        status,
        year,
        applicationUrl: applicationUrl || null,
        thread: JSON.stringify(threadWithIds),
    };
    
    await db.query("INSERT INTO training_programs (uuid, title, duration, status, year, applicationUrl, thread) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [newProgram.uuid, newProgram.title, newProgram.duration, newProgram.status, newProgram.year, newProgram.applicationUrl, newProgram.thread]);
    
    const [createdProgramRow] = await db.query("SELECT uuid as id, title, duration, status, year, applicationUrl, thread, createdAt FROM training_programs WHERE uuid = ?", [newProgram.uuid]);
    const createdProgram = processTrainingProgramRow(createdProgramRow[0]);

    res.status(201).json(createdProgram);
}));

router.post('/projects', asyncHandler(async (req, res) => {
    const { title, year, trainingProgramId, thread } = req.body;
    if (!title || !year || !thread) {
        return res.status(400).json({ message: 'Title, year, and thread are required for projects.' });
    }

    const threadWithIds = (thread || []).map(item => ({...item, id: uuidv4()}));

    const newProject = {
        uuid: uuidv4(),
        title,
        year,
        trainingProgramId: trainingProgramId || null,
        thread: JSON.stringify(threadWithIds),
    };
    
    await db.query("INSERT INTO projects (uuid, title, year, trainingProgramId, thread) VALUES (?, ?, ?, ?, ?)",
        [newProject.uuid, newProject.title, newProject.year, newProject.trainingProgramId, newProject.thread]);
    
    const [createdProjectRow] = await db.query("SELECT uuid as id, title, year, trainingProgramId, thread, createdAt FROM projects WHERE uuid = ?", [newProject.uuid]);
    const createdProject = processProjectRow(createdProjectRow[0]);

    res.status(201).json(createdProject);
}));

// --- DELETE Routes ---
router.delete('/posts/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM posts WHERE uuid = ?", [id]);
    if (result.affectedRows > 0) res.status(204).send();
    else res.status(404).json({ message: 'Post not found.' });
}));

router.delete('/training-programs/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM training_programs WHERE uuid = ?", [id]);
    if (result.affectedRows > 0) res.status(204).send();
    else res.status(404).json({ message: 'Training program not found.' });
}));

router.delete('/projects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM projects WHERE uuid = ?", [id]);
    if (result.affectedRows > 0) res.status(204).send();
    else res.status(404).json({ message: 'Project not found.' });
}));

router.delete('/vtl-craft-projects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Project ID is required.' });
    }
    const [result] = await db.query("DELETE FROM vtl_craft_projects WHERE uuid = ?", [id]);
    if (result.affectedRows > 0) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Project not found.' });
    }
}));


// --- PUT (Update) Routes ---
router.put('/posts/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, category, imageUrl } = req.body;
    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Title, description, and category are required.' });
    }
    await db.query("UPDATE posts SET title = ?, description = ?, category = ?, imageUrl = ? WHERE uuid = ?", 
        [title, description, category, imageUrl, id]);
    
    const [updatedRows] = await db.query("SELECT uuid as id, title, description, imageUrl, category, createdAt FROM posts WHERE uuid = ?", [id]);
    if (updatedRows.length > 0) res.json(updatedRows[0]);
    else res.status(404).json({ message: 'Post not found after update.' });
}));

router.put('/training-programs/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, duration, status, year, applicationUrl, thread } = req.body;
    if (!title || !duration || !status || !year || !thread) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const threadWithIds = (thread || []).map(item => ({...item, id: item.id || uuidv4()}));
    const threadJSON = JSON.stringify(threadWithIds);

    await db.query("UPDATE training_programs SET title = ?, duration = ?, status = ?, year = ?, applicationUrl = ?, thread = ? WHERE uuid = ?",
        [title, duration, status, year, applicationUrl || null, threadJSON, id]);
    
    const [updatedRows] = await db.query("SELECT uuid as id, title, duration, status, year, applicationUrl, thread, createdAt FROM training_programs WHERE uuid = ?", [id]);
    if (updatedRows.length > 0) res.json(processTrainingProgramRow(updatedRows[0]));
    else res.status(404).json({ message: 'Training program not found after update.' });
}));

router.put('/projects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, year, trainingProgramId, thread } = req.body;
    if (!title || !year || !thread) {
        return res.status(400).json({ message: 'Title, year, and thread are required.' });
    }
    const threadWithIds = (thread || []).map(item => ({...item, id: item.id || uuidv4()}));
    const threadJSON = JSON.stringify(threadWithIds);

    await db.query("UPDATE projects SET title = ?, year = ?, trainingProgramId = ?, thread = ? WHERE uuid = ?",
        [title, year, trainingProgramId || null, threadJSON, id]);

    const [updatedRows] = await db.query("SELECT uuid as id, title, year, trainingProgramId, thread, createdAt FROM projects WHERE uuid = ?", [id]);
    if (updatedRows.length > 0) res.json(processProjectRow(updatedRows[0]));
    else res.status(404).json({ message: 'Project not found after update.' });
}));

router.put('/vtl-craft-projects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, thread } = req.body;
    if (!title || !thread) {
        return res.status(400).json({ message: 'Title and thread are required.' });
    }
    const threadWithIds = (thread || []).map(item => ({...item, id: item.id || uuidv4()}));
    const threadJSON = JSON.stringify(threadWithIds);

    await db.query("UPDATE vtl_craft_projects SET title = ?, thread = ? WHERE uuid = ?",
        [title, threadJSON, id]);

    const [updatedRows] = await db.query("SELECT uuid as id, title, thread, createdAt FROM vtl_craft_projects WHERE uuid = ?", [id]);
    if (updatedRows.length > 0) res.json(processVtlCraftProjectRow(updatedRows[0]));
    else res.status(404).json({ message: 'VTL Craft project not found after update.' });
}));

// --- Student Projects Routes ---
router.get('/student-projects', asyncHandler(async (req, res) => {
    const [rows] = await db.query("SELECT uuid as id, title, studentName, thread, githubLink, websiteLink, createdAt FROM student_projects ORDER BY createdAt DESC");
    const projects = rows.map(row => processStudentProjectRow(row));
    res.json(projects);
}));

router.get('/student-projects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.query("SELECT uuid as id, title, studentName, thread, githubLink, websiteLink, createdAt FROM student_projects WHERE uuid = ?", [id]);
    if (rows.length > 0) {
        res.json(processStudentProjectRow(rows[0]));
    } else {
        res.status(404).json({ message: 'Student project not found.' });
    }
}));

router.post('/student-projects', asyncHandler(async (req, res) => {
    const { title, studentName, thread, githubLink, websiteLink } = req.body;
    if (!title || !studentName || !thread) {
        return res.status(400).json({ message: 'Title, studentName, and thread are required.' });
    }

    const threadWithIds = (thread || []).map(item => ({...item, id: item.id || uuidv4()}));

    const newProject = {
        uuid: uuidv4(),
        title,
        studentName,
        thread: JSON.stringify(threadWithIds),
        githubLink: githubLink || null,
        websiteLink: websiteLink || null,
    };
    
    await db.query("INSERT INTO student_projects (uuid, title, studentName, thread, githubLink, websiteLink) VALUES (?, ?, ?, ?, ?, ?)",
        [newProject.uuid, newProject.title, newProject.studentName, newProject.thread, newProject.githubLink, newProject.websiteLink]);
    
    const [createdProjectRow] = await db.query("SELECT uuid as id, title, studentName, thread, githubLink, websiteLink, createdAt FROM student_projects WHERE uuid = ?", [newProject.uuid]);
    const createdProject = processStudentProjectRow(createdProjectRow[0]);

    res.status(201).json(createdProject);
}));

router.put('/student-projects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, studentName, thread, githubLink, websiteLink } = req.body;
    if (!title || !studentName || !thread) {
        return res.status(400).json({ message: 'Title, studentName, and thread are required.' });
    }
    const threadWithIds = (thread || []).map(item => ({...item, id: item.id || uuidv4()}));
    const threadJSON = JSON.stringify(threadWithIds);

    await db.query("UPDATE student_projects SET title = ?, studentName = ?, thread = ?, githubLink = ?, websiteLink = ? WHERE uuid = ?",
        [title, studentName, threadJSON, githubLink || null, websiteLink || null, id]);

    const [updatedRows] = await db.query("SELECT uuid as id, title, studentName, thread, githubLink, websiteLink, createdAt FROM student_projects WHERE uuid = ?", [id]);
    if (updatedRows.length > 0) res.json(processStudentProjectRow(updatedRows[0]));
    else res.status(404).json({ message: 'Student project not found after update.' });
}));

router.delete('/student-projects/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM student_projects WHERE uuid = ?", [id]);
    if (result.affectedRows > 0) res.status(204).send();
    else res.status(404).json({ message: 'Student project not found.' });
}));

module.exports = router;