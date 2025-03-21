# Teacher's DashBoard For IBM Educational Project

## Features

- **Upload JSON**: Allows teachers to upload a JSON file containing questions or other relevant data to configure quizzes or games.
- **Camera Capture**: Supports capturing images via the camera for object recognition.
- **Quiz Question Generator**: Automatically generates quiz questions based on selected subjects, age group, and other parameters.
- **Time Limit Configuration**: Teachers can set time limits for quizzes to challenge students.
- **Start Game Option**: A seamless way to begin interactive quizzes or games with generated questions.

## Technologies Used

- **React**: For building a responsive and dynamic user interface.
- **Vite**: For fast builds and development with Hot Module Replacement (HMR).
- **ESLint**: For maintaining code quality and consistency.
- **Fetch API**: For server communication to generate quiz questions and process uploaded files.
- **LocalStorage**: For temporarily storing user-selected settings and uploaded data.
- **CSS Modules**: For styling components.

## Project Structure

The project follows a modular structure for better organization and scalability:

```
src/
├── components/       # Reusable React components
├── pages/            # Main application pages (e.g., UploadQuizQuestionPage, GenerateQuestionPage)
├── assets/           # Static assets (e.g., images, fonts)
├── styles/           # Global and component-specific styles
├── App.jsx           # Main application component
├── main.jsx          # Application entry point
```

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 16+ recommended).
- **Package Manager**: Use either npm or yarn.

## Installation

To get started with the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/jackmok33/teacher-ui.git
   cd teacher-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Scripts

The project includes the following npm scripts:

- `npm run dev`: Starts the development server with HMR.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Lints the codebase using ESLint.

## Pages Overview

### 1. **UploadQuizQuestionPage**

- **Purpose**: Allows teachers to upload a JSON file containing quiz or game data.
- **Key Features**:
    - File selection and upload progress tracking.
    - Time limit selection for quizzes.
    - Stores uploaded data and settings in `localStorage`.

### 2. **GenerateQuestionPage**

- **Purpose**: Generate quiz questions based on selected settings.
- **Key Features**:
    - Generates quiz questions via a backend API.
    - Displays generated questions and allows starting the game.

## API Integration

The application communicates with a backend API for generating quiz questions and processing uploads. Example API endpoints:

- **`POST /recognize`**: Handles image recognition
- **`GET /generate`**: Generates quiz questions based on selected settings.

### Example API Request for Quiz Generation

```bash
GET /generate?ageGroup=7-9&number=10&subject=History
```

## Backend Description

The backend for the Educational Project is managed within the [EducationalQuestionGenerator](https://github.com/System-Engineering-Group-9/EducationalQuestionGenerator) repository and provides core functionality for the quiz question generator. Its main features include:

- **AI Server**:  
  A FastAPI-based server that handles API requests for:
    - **Image Recognition**: Uses YOLO for object detection.
    - **Question Generation**: Leverages the quantized IBM granite-3.0-8b-instruct model to generate educational quiz questions.

- **Installation & Prerequisites**:
    - **CUDA 12.4 or later** is required for GPU acceleration.
    - **Python 3.8 or later** must be installed.
    - Dependencies are managed via `pip`, with special configuration for `llama-cpp-python` (enabling CUDA or Metal support for MacOS).

- **Usage**:
    - **GUI Application**: Launch the desktop application with `python ./main.py` to generate questions interactively.
    - **API Server**: Start the FastAPI server with:
      ```bash
      uvicorn app.main:app --reload
      ```
      This exposes endpoints such as `/ai/recognize/` and `/ai/generate/` for integration with the front-end.

- **Docker Deployment**:
    - **Build the Docker image**:
      ```bash
      docker build -t educational-quiz-generator .
      ```
    - **Run the Docker container**:
      ```bash
      docker run --gpus all -p 8000:8000 educational-quiz-generator
      ```
      The API can then be accessed at `http://127.0.0.1:8000`.

For further details on backend setup, testing, and troubleshooting, refer to the [EducationalQuestionGenerator GitHub repository](https://github.com/System-Engineering-Group-9/EducationalQuestionGenerator).

## Customization

### Using a Different Backend
Replace the API endpoints in the `fetch` calls within the React components to connect to a different server.

### Styling
The project uses CSS modules. You can customize styles by modifying the corresponding `.css` files in the `styles/` directory.
