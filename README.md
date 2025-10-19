
```markdown
# AI Short Video Generator

This project allows users to generate AI-powered short videos using advanced technologies such as Gemini, Google Cloud Text-to-Speech API, Replicate Image API, and more. The frontend is built using **Next.js**, with backend services powered by **Neon**, **Drizzle ORM**, and **Firebase**.

## Technologies Used

- **Frontend**: Next.js
- **Backend**: Neon, Drizzle ORM
- **Image Generation**: Replicate Image API
- **Text-to-Speech**: Google Cloud Text-to-Speech API
- **Database**: Neon, Firebase
- **Cloud Services**: Firebase (for authentication, storage, etc.)
- **Version Control**: Git, Git LFS for large files

## Features

- Generate short AI-powered videos based on user input.
- Text-to-speech conversion for voice narration.
- Image generation for video visuals.
- Secure user authentication and data storage with Firebase.

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or later)
- **Git**
- **Firebase CLI**
- **Google Cloud API Key** (for Text-to-Speech API)
- **Replicate API Key** (for Image Generation)
- **Neon** (for database)

### Steps to Set Up

1. **Clone the Repository**

   First, clone the repository:

   ```bash
   git clone <repository-url>
   cd ai-short-video-generator
   ```

2. **Install Dependencies**

   Install the necessary dependencies using **npm** or **yarn**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   You will need to create a `.env.local` file in the root directory and add the following environment variables (replace with your actual values):

   ```dotenv
   DRIZZLE_DATABASE_URL=""
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
   CLERK_SECRET_KEY=""
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_GEMINI_API_KEY=""
   GOOGLE_API_KEY=""
   NEXT_PUBLIC_FIREBASE_API_KEY=""
   CAPTION_API=""
   REPLICATE_API_TOKEN=""
   GOOGLE_APPLICATION_CREDENTIALS=C:\Users\HP\Desktop\AI video generator\gen-lang-client-0217637627-4d1014a40fd9.json
   ```

4. **Steps to Obtain a Service Account Key (`GOOGLE_APPLICATION_CREDENTIALS`)**:

   1. **Create a Google Cloud Project:**
      - If you don’t already have a project, go to the [Google Cloud Console](https://console.cloud.google.com/).
      - Click on **Select a project** in the top menu, and then click **New Project** to create one.

   2. **Enable Google Cloud APIs:**
      - In your Google Cloud project, enable the APIs you want to use (e.g., Vision API, Translate API, Cloud Storage, etc.).
      - To do this, navigate to **API & Services** in the left sidebar, then click **Library**, and search for the APIs you need. Enable them one by one.

   3. **Create a Service Account:**
      - Navigate to **IAM & Admin > Service Accounts**.
      - Click **Create Service Account**.
      - Give it a name (e.g., **AI Video Generator Service Account**), and optionally a description.
      - Click **Create**.

   4. **Assign Roles:**
      - Assign roles to the service account, depending on the APIs you want to access. For example, you can assign **Editor** or a more specific role like **Cloud Vision API User** depending on the access level your app needs.

   5. **Create the Service Account Key:**
      - After assigning roles, click **Done**.
      - On the Service Accounts page, find the account you just created and click on the three dots under "Actions".
      - Select **Create Key**.
      - Choose the **JSON** key type and click **Create**.
      - A JSON file will be downloaded to your computer. This is your **service account key**.

   6. **Set the `GOOGLE_APPLICATION_CREDENTIALS` Environment Variable:**
      - Move the downloaded JSON file to a secure location on your machine or server (for example, you can place it in your project directory).
      - Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to the path of this JSON file. In your `.env.local` file, you would add:

      ```dotenv
      GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json
      ```

      Replace `/path/to/your/service-account-key.json` with the actual path to the downloaded JSON file.

5. **Start the Development Server**

   Run the development server to view the application:

   ```bash
   npm run dev
   ```

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the project.

   ## Docker (local build & Remotion renderer)

   You can containerize the Next.js app and the Remotion renderer to run builds and server-side rendering in CI or locally.

   - Build the Next.js production image:

   ```powershell
   docker build -f Dockerfile -t ai-short-video-app:latest .
   ```

   - Build the Remotion renderer image (includes ffmpeg/chromium):

   ```powershell
   docker build -f Dockerfile.remotion -t ai-short-video-remotion:latest .
   ```

   - Run the Remotion renderer (example):

   ```powershell
   docker run --rm -v ${PWD}/remotion/out:/remotion/out ai-short-video-remotion:latest
   ```

   Notes:
   - The Remotion container installs ffmpeg and chromium to allow headless rendering. You may need to tweak the `Dockerfile.remotion` for your environment.

   ## GitHub Actions & CI/CD

   This repository includes three workflows under `.github/workflows`:

   - `ci.yml` — runs on push and PRs to `main`; installs dependencies, runs lint/tests (if present), and builds Next.js.
   - `docker-publish.yml` — builds and publishes Docker images (app + remotion) on git tag push (vX.Y.Z) or manual dispatch. It pushes to GitHub Container Registry by default.
   - `deploy-firebase.yml` — builds the app and deploys to Firebase Hosting on push to `main` (requires `FIREBASE_TOKEN`).

   Required repository secrets:

   - `FIREBASE_TOKEN` — a CI token generated via `firebase login:ci` for deploying to Firebase.
   - (Optional) If you want to push to Docker Hub instead of GHCR, set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` and modify the `docker-publish.yml` accordingly.

   Example: create a Firebase token and add it to GitHub secrets

   ```powershell
   # Locally (your dev machine)
   npm i -g firebase-tools
   firebase login:ci
   # copy the printed token and add it to the repo secrets as FIREBASE_TOKEN
   ```


