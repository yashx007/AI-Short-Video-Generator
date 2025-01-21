
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

