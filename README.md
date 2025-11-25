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

![1](https://github.com/user-attachments/assets/ae4eace9-814b-4c87-8820-f82229ba1a51)
![3](https://github.com/user-attachments/assets/7bfddbac-5261-4a40-8e33-68fef7d9d7a6)

![9](https://github.com/user-attachments/assets/376fc9bd-2db0-4af1-8f89-4a7ec3f87f96)
![8](https://github.com/user-attachments/assets/455c40d2-c4e7-4338-a42d-7f8e885be8fa)
![7](https://github.com/user-attachments/assets/a3659606-386f-4555-8a4d-90af62a6f7a0)
![6](https://github.com/user-attachments/assets/3c5570a4-fb8c-4de8-8638-c1bd8ec192a4)
![5](https://github.com/user-attachments/assets/69bc4309-85ca-4568-aa72-b921058c575b)
![4-1](https://github.com/user-attachments/assets/4249d60c-7cdc-43e4-8a63-8f20ceabe6fe)
![4](https://github.com/user-attachments/assets/ad600465-8fbe-4837-8310-4fb5e28ece15)
![10](https://github.com/user-attachments/assets/a84c3d4f-2a20-4f0f-b4c8-fe7bcbd1e324)

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
