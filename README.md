# AnimeFlux 🎌

A beautiful anime streaming mobile application built with React Native and Expo, featuring real-time data from AniList API.

## ✨ Features

- **User Authentication**: Secure login and registration with form validation
- **Trending Anime**: Browse trending anime from AniList API
- **Anime Details**: View comprehensive anime information including:
  - Synopsis and descriptions
  - Episode count and ratings
  - Genres and status
  - Beautiful banner and poster images
- **Favorites**: Add anime to favorites and persist them locally
- **User Profile**: Manage account settings and view statistics
- **Edit Profile**: Update name and email information
- **Smooth Navigation**: Tab and stack navigation with React Navigation
- **Colorful UI**: Modern, gradient-based design with pink/purple theme
- **State Management**: Redux Toolkit for efficient state handling
- **Data Persistence**: Secure storage for user sessions and AsyncStorage for favorites

## 🛠️ Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Redux Toolkit** - State management
- **React Navigation** - Navigation library
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client for API calls
- **AniList GraphQL API** - Anime data source
- **Expo SecureStore** - Secure user authentication storage
- **AsyncStorage** - Local favorites storage
- **Expo Linear Gradient** - Gradient backgrounds
- **Feather Icons** - Icon library

## 📱 Screenshots

[Add your screenshots here]

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/AnimeFlux.git
cd AnimeFlux
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Scan the QR code with Expo Go app on your Android device

## 📂 Project Structure

```
MediaFlux/
├── src/
│   ├── components/
│   │   ├── CustomButton.js
│   │   └── CustomInput.js
│   ├── constants/
│   │   └── theme.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── DetailsScreen.js
│   │   ├── FavoritesScreen.js
│   │   ├── ProfileScreen.js
│   │   └── EditProfileScreen.js
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   ├── authSlice.js
│   │   ├── moviesSlice.js
│   │   └── store.js
│   └── utils/
├── assets/
├── App.js
└── package.json
```

## 🎨 Key Features Details

### Authentication
- Secure login/registration flow
- Form validation with Yup
- Persistent sessions with Expo SecureStore
- Auto-login on app restart

### Anime Discovery
- Real-time trending anime from AniList
- Beautiful card-based grid layout
- Ratings and episode information
- Smooth navigation to details

### Favorites Management
- Add/remove favorites with heart icon
- Persistent storage with AsyncStorage
- Dedicated favorites screen
- Real-time updates

### User Profile
- Account settings and statistics
- Edit profile information
- Logout functionality
- Delete account option (demo)

## 🌐 API Integration

This app uses the free **AniList GraphQL API** to fetch anime data. No API key is required!

API Endpoint: `https://graphql.anilist.co`

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- AniList for the amazing free API
- Expo team for the excellent development platform
- React Native community

## 📧 Contact

For questions or feedback, please reach out to [your-email@example.com]

---

Made with ❤️ and React Native
