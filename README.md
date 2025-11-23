# AnimeFlux

An anime streaming mobile application built with React Native and Expo, featuring real-time data from AniList API.

##Features

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

##Tech Stack

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

##Screenshots


##Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ScorpJu-101/AnimeFlux.git
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


##API Integration

This app uses the free **AniList GraphQL API** to fetch anime data. No API key is required!

API Endpoint: `https://graphql.anilist.co`
