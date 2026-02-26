# SkyVoice ✈️

**Assistive Browser Agent for visually impaired users.**

## The Problem
Traditional screen readers often fail on dynamic, complex web interfaces like transportation seat maps, visual calendars, or interactive booking flows. This creates a critical accessibility gap, making it nearly impossible for visually impaired users to book travel or navigate modern web applications independently.

## Our Mission
SkyVoice leverages AI and voice technology to bridge this gap, transforming complex visual layouts into intuitive, conversation-driven interactions. We empower users to navigate the digital world with confidence and autonomy.

## Project Structure

- **`/extension`**: High-performance React-based Chrome Extension (Vite + Tailwind CSS).
- **`/backend`**: Node.js backend for processing voice commands and AI integration.

## Getting Started

### Extension Setup

1. Navigate to the `extension` directory:
   ```bash
   cd extension
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `extension/dist` folder.

### Updating Changes

Whenever you make changes to the extension source code:
1. **Rebuild the extension**:
   ```bash
   npm run build
   ```
2. **Refresh in Chrome**:
   - Go to `chrome://extensions/`
   - Click the **Refresh** (circular arrow) icon on the SkyVoice extension card.