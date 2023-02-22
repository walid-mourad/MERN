
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const routes = require('./routes/BlogRoute');
const routes_user = require('./routes/UserRoute');
const routes_comments = require('./routes/CommentRoute');




const cors = require('cors');

// Enable body parsing and CORS


app.use(cors({
  origin : 'http://localhost:3000/',
  method : 'GET,POST,PUT,DELETE,OPTIONS'
}
));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// dotenv 
dotenv.config({ path: './config/config.env' });
const port = process.env.PORT;

// Connecter MongoDb
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// les routes
app.use(express.json());
app.use('/api/blogs/', routes);
app.use('/api/users/', routes_user);
app.use('/api/comments/', routes_comments);



// demarrer serveur
app.listen(port, () => console.log(`Server listening on port ${port}`));













//const express = require('express');
//const routes = express.Router();
//const mongoose = require('mongoose');
//const dotenv= require('dotenv');
//const app = express();
/*
app.use(express.json());


//dotenv
dotenv.config({path:'./config/config.env'})
const port = process.env.PORT;
mongoose.set('strictQuery', true);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));



// Create a schema for blog posts
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  author: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
});

// Create a model for blog posts
const Blog = mongoose.model('Blog', postSchema);

// Creer une route pour visualiser tout les blogs
routes.get('/api/blogs', async (req, res) => {
  try {
    const Blogs = await Blog.find();
    res.json({
      success: true,
      count: Blogs.length,
      Blogs
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Crer une route pour visualiser un blog selon son id
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({
      success: true,
      blog
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Creer une root pour ajout d'un blog
app.post('/api/blogs/addBlog', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(200).json({
      created: true,
      blog
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Creer une route pour modifier un blog selon son id

app.patch('/api/blogs/Update/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      updated: true,
      blog }
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

// Creer une route pour supprimer un blog
app.delete('/api/blogs/deleteBlogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({
      deletd: true,
      blog
    });
  } catch (err) {
    res.status(500).send(err);
  }
});



app.listen(port, () => console.log(`Server listening on port ${port}`));
*/




  