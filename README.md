# Social AI

> Unleash Creativity, Share Memories—Where AI Meets Your Imagination!

Social AI is a full-stack web application that allows users to:
- Generate AI images using OpenAI's DALL•E
- Upload and share images or videos
- View a searchable gallery of content
- Register, login, and manage content securely

---

## Features
- **AI Image Generation**: Generate high-quality images with DALL•E-3
- **Media Uploading**: Upload images or videos with captions
- **Smart Search**: Search posts by keyword or user
- **Responsive UI**: Mobile-first design with Ant Design and Material UI
- **User Authentication**: Login, logout, and JWT-based session handling
- **Lightbox Viewer**: Zoom, fullscreen, slideshow, and delete functionality

---

## Tech Stack
- **Frontend**: React, Ant Design, MUI, Styled Components
- **Media Proxying**: `http-proxy-middleware` to fetch image blobs from OpenAI
- **Lightbox and Album**: `yet-another-react-lightbox`, `react-photo-album`

---

## Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/j-r-yi/SocialAI_Frontend.git
cd social-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_OPENAI_KEY=your_openai_api_key_here
```

### 4. Start Development Server
```bash
npm start
```
The app will be available at `http://localhost:3000`

### 5. Optional: Deploy to Google App Engine
Make sure you have the `app.yaml` config set, then:
```bash
gcloud app deploy
```

---

## Project Structure

```
src/
├── App.js              # Root component
├── Main.js             # Routing
├── constants.js        # Constants (token keys, API base URL)
├── components/
│   ├── ResponsiveAppBar.js
│   ├── Login.js
│   ├── Register.js
│   ├── Landing.js      # Image generation
│   ├── Collection.js   # Gallery view
│   ├── PhotoGallery.js
│   ├── SearchBar.js
│   ├── CreatePostButton.js
│   └── PostForm.js
└── setupProxy.js       # Proxy blob requests to OpenAI blob server
```

---

## API Endpoints
- `POST /signup` — User registration
- `POST /signin` — User login
- `POST /upload` — Upload image or video
- `GET /search` — Fetch posts (filter by keyword or user)
- `DELETE /post/:id` — Delete a post

---

## Proxy Setup

`setupProxy.js` is used to fetch OpenAI image blobs that cannot be directly accessed from the browser.
```js
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://oaidalleapiprodscus.blob.core.windows.net/',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  })
);
```

This allows the app to fetch a blob from `https://oaidalleapiprodscus.blob.core.windows.net/xyz` using `/api/xyz`.

---

## License
MIT License © 2025 Joshua Yi
