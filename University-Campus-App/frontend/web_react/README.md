# University Campus App - Web Frontend

A modern React-based web application for connecting students and teachers on campus.

## Features

- **User Authentication**: Login for students, teachers, and administrators
- **Dashboard**: Overview of attendance, courses, and upcoming events
- **Attendance Tracking**: View attendance rates by subject with visual indicators
- **Timetable Management**: Weekly class schedule with instructor details
- **Event Management**: Browse and register for campus events
- **Notifications**: Real-time updates on academic and campus activities
- **User Profile**: Personal and academic information management

## Technology Stack

- **React 18**: UI library
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library
- **Axios**: HTTP client (ready for API integration)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd frontend/web_react
npm install
```

### Running the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.js      # Top navigation bar
│   ├── Sidebar.js     # Main navigation sidebar
│   ├── EventCard.js   # Event display card
│   └── AttendanceCard.js # Attendance status card
├── pages/             # Page components
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── AttendancePage.js
│   ├── TimetablePage.js
│   ├── EventsPage.js
│   ├── NotificationsPage.js
│   └── ProfilePage.js
├── App.js            # Main app component with routing
└── index.js          # Entry point
```

## Pages

### Login Page
- User type selection (Student/Teacher/Admin)
- Email and password authentication
- Sign-up link for new users

### Dashboard
- Quick statistics (attendance rate, courses, events)
- Attendance overview for current courses
- Upcoming events preview

### Attendance
- Overall attendance percentage
- Per-subject attendance cards with visual progress bars
- Attendance trend statistics

### Timetable
- Weekly class schedule
- Class timing, location, and instructor details
- Quick view of all courses

### Events
- Browse all campus events
- Filter by category (All/Academic/Social)
- Event details including date, time, location, and attendees

### Notifications
- Real-time notification updates
- Filter by type (success, warning, info)
- Timestamp for all notifications

### Profile
- Personal information display
- Academic information
- Account settings
- Edit profile functionality

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_APP_NAME=University Campus App
```

## API Integration

The app is ready for backend integration. Update the API calls in each page/component:

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Example API call
const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/endpoint`);
    // Handle response
  } catch (error) {
    // Handle error
  }
};
```

## Styling

The app uses Tailwind CSS for styling. Key design tokens:

- **Primary Color**: Blue (#3B82F6)
- **Secondary Color**: Purple
- **Success Color**: Green
- **Warning Color**: Yellow
- **Danger Color**: Red

## Development Notes

- Components are built as functional components with hooks
- Routing is handled with React Router v6
- State management is basic (useState). Consider Redux or Context API for larger state
- API calls should be moved to custom hooks or services

## Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] File upload for assignments
- [ ] Discussion forums
- [ ] Video conferencing integration
- [ ] Analytics dashboard for teachers
- [ ] Mobile responsive improvements
- [ ] Dark mode toggle
- [ ] Accessibility improvements (WCAG compliance)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - See LICENSE file for details
