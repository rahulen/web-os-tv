# TV Tunes - A Music Player for Smart TVs

![TV Tunes Screenshot](https://storage.googleapis.com/aip-dev-images/tv-tunes-screenshot.png)

TV Tunes is a sleek and modern music player application designed for a Smart TV experience. Built with Next.js and styled with Tailwind CSS and shadcn/ui, it provides a beautiful and intuitive interface for browsing and playing your favorite tunes on the big screen.

## Features

-   **Modern UI for TV:** A clean, dark-themed interface optimized for large screens and easy navigation with a remote control.
-   **Playlist Management:** View and select songs from a curated playlist.
-   **Full-fledged Player Controls:**
    -   Play/Pause functionality.
    -   Skip to the next or previous track.
    -   Shuffle the playlist for a random playback order.
    -   Repeat modes (no repeat, repeat all, repeat one).
    -   Seek through the current track with a progress slider.
    -   Volume control and mute functionality.
-   **Rich Album Art:** Displays high-quality album art for the currently playing song.
-   **Responsive Design:** While designed for TVs, the layout adapts gracefully to different screen sizes.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (React)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (or yarn) installed on your machine.

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone <your-repository-url>
    ```

2.  Navigate into the project directory:
    ```bash
    cd <project-directory>
    ```

3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
```

This will start the application on `http://localhost:9002`. Open this URL in your browser to see the application in action.

## Project Structure

-   `src/app/`: Contains the core application logic, including pages and layouts.
-   `src/components/`: Contains all the React components, including UI components from shadcn/ui.
-   `src/lib/`: Contains utility functions and data, like the song list.
-   `src/styles/`: Contains global styles and Tailwind CSS configuration.
-   `public/`: For static assets like images.

## Customization

-   **Theme:** Colors and styling can be customized in `src/app/globals.css` and `tailwind.config.ts`.
-   **Songs:** The playlist is currently hardcoded in `src/lib/songs.ts`. You can modify this file to add or change the songs.
-   **Images:** Placeholder images are managed in `src/lib/placeholder-images.json`.
