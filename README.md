# Digital Note-Taker

A responsive, theme-switching note-taking web application with offline support using local storage and a Flask backend for full functionality. This project demonstrates the integration of React for the frontend, Flask for backend API services, and responsive UI design.

## Features

- **Add, Edit, and Delete Notes**: Create notes with a title, content, and optional tags for easy organization.
- **Responsive Design**: Adjusts beautifully across desktop, tablet, and mobile screens.
- **Theme Toggle**: Easily switch between Dark and Light themes for optimal readability.
- **Offline Support**: Automatically uses local storage if the Flask backend is not available, making it usable offline.
- **Error Handling**: Gracefully handles API errors and switches seamlessly between local and remote data storage.

## Skills and Technologies Demonstrated

### Frontend
- **React**: Component-based structure for managing the app’s UI and state.
- **CSS**: Custom styling for a modern and accessible user experience.
- **React Router**: Navigation to different pages, including a "How to Use" page for user guidance.
- **Responsive Design**: Ensures usability on all screen sizes with responsive CSS and media queries.
- **React Icons**: Use of icons for better visual cues and aesthetics.

### Backend
- **Flask**: Simple Python web framework to provide RESTful API endpoints for CRUD operations on notes.
- **Axios**: For HTTP requests between the React frontend and Flask backend.
- **Local Storage Fallback**: If Flask is not running, the app stores notes in local storage for offline access.

### Deployment
- **GitHub Pages**: Hosted the frontend application on GitHub Pages.
- **Git and GitHub**: Version control and collaboration tools for efficient project management.

## Project Setup and Installation

### Prerequisites
- **Node.js**: For running the React app.
- **Python and Flask**: To run the backend server.

### Frontend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/haseebraza715/digital-note-taker.git
   cd digital-note-taker/frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the App**:
   ```bash
   npm start
   ```

4. **Deploy**:
   To deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

### Backend Setup

1. **Navigate to Backend Directory**:
   ```bash
   cd ../backend
   ```

2. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask Server**:
   ```bash
   flask run
   ```
   The server will run at `http://127.0.0.1:5000`.

## Usage

- **Offline Usage**: The app checks for a connection to the Flask backend on startup. If the backend is unavailable, it automatically switches to local storage for note storage.
- **Switch Themes**: Toggle between Dark and Light modes using the button in the header.
- **View How-To Guide**: Click "How to Use" in the header for guidance and examples of usage.

## Future Improvements

- **Search and Filter**: Add a search functionality to quickly find notes.
- **Tag-Based Filtering**: Organize notes by tags for better usability.
- **User Authentication**: Secure notes for individual users.
