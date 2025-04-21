# Gadget Review Assistant

A modern, responsive chat interface powered by Google's Gemini AI that helps users get detailed information about gadgets, comparisons, and reviews.


## Features

- 🤖 AI-powered gadget recommendations and reviews
- 💬 Real-time chat interface with a modern design
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- ⚡ Quick suggestion prompts
- 🔄 Real-time loading states
- 🗑️ Chat history management

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **UI Components**: Chakra UI
- **AI Integration**: Google Gemini AI
- **Icons**: React Icons
- **Routing**: React Router DOM

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm
- A Google Gemini API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/anugrahthomas/gadget-support.git
cd gadget-support
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── Chat.tsx        # Main chat interface
│   └── ...
├── config/             # Configuration files
│   └── gemini.ts      # Gemini AI configuration
├── routes/             # Application routes
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Features in Detail

### Chat Interface
- Real-time messaging with AI assistant
- Message history with clear visual distinction between user and assistant messages
- Loading states with typing indicators
- Clear chat functionality
- Auto-scroll to latest messages

### AI Integration
- Powered by Google's Gemini AI model
- Quick response generation for gadget-related queries
- Contextual understanding of user questions
- Detailed product comparisons and reviews

### User Interface
- Clean and modern design using Chakra UI
- Responsive layout that works on all device sizes
- Dark/Light mode toggle
- Smooth animations and transitions
- Quick suggestion chips for common queries

## Configuration

### Gemini AI Setup
1. Obtain an API key from Google AI Studio
2. Add the API key to your `.env` file
3. Configure the model settings in `src/config/gemini.ts`

### Customizing the UI
- Theme customization can be done through Chakra UI's theme provider
- Color schemes and component styles can be modified in the theme configuration

## Usage Examples

The assistant can help with:
- Finding the best laptops within a specific budget
- Comparing different smartphone models
- Getting detailed reviews of gadgets
- Providing recommendations based on user requirements

Example queries:
- "What are the best laptops under Rs.20000?"
- "Compare iPhone 14 Pro and Samsung Galaxy S23"
- "Review the Sony WH-1000XM4 headphones"

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for powering the assistant
- Chakra UI for the component library
- React Icons for the icon set
- All contributors who have helped improve this project

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by [Anugrah]
