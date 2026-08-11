# Sommer's Sault Gymnastics - MERN Frontend

A complete, production-ready React frontend for Sommer's Sault Gymnastics featuring a stunning public website and a full-featured CRM admin dashboard.

## Features

### Public Website
- **Hero Section** with animated logo and CTAs
- **About Section** showcasing Sommer's background and facility
- **Classes Section** displaying all gymnastics programs with pricing
- **Staff Section** with team member profiles (click for details)
- **Credentials Section** highlighting certifications and safety
- **Contact Section** with inquiry form and location info
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** works perfectly on all devices

### CRM Admin Dashboard
- **Dashboard Stats** - Overview of students, classes, revenue, pending payments
- **Student Management** - Add, edit, delete students with full profiles
- **Class Management** - View class details, enrollment, schedules
- **Payment Tracking** - Monitor paid and pending payments by student
- **Attendance Records** - Track class attendance with statistics
- **Fully Functional Forms** - Working add/edit modals with validation
- **Real-time Updates** - See changes immediately reflected in tables

## Setup Instructions

### 1. Extract the Project
Unzip the `sommersault-project.zip` file to your desired location.

### 2. Install Dependencies
```bash
cd sommersault-project
npm install
```

This will install all required packages:
- React & React DOM
- React Router for navigation
- Framer Motion for animations
- Tailwind CSS for styling
- React Icons for icon library
- Axios for API calls (ready for backend integration)

### 3. Start the Development Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Project Structure

```
sommersault-project/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Classes.js
│   │   ├── Staff.js
│   │   ├── Credentials.js
│   │   └── Contact.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── CRMDashboard.js
│   │   └── CRM/
│   │       ├── CRMStats.js
│   │       ├── CRMStudents.js
│   │       ├── CRMClasses.js
│   │       ├── CRMPayments.js
│   │       └── CRMAttendance.js
│   ├── context/
│   │   └── StudentContext.js (State management)
│   ├── assets/
│   │   └── logos/
│   │       ├── logo-horizontal.png
│   │       └── logo-circular.png
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Navigation

### Website
- **Home** - Landing page with hero and all sections
- **CRM Admin** - Switch to admin dashboard (button in top nav)

### CRM Dashboard Tabs
- **Dashboard** - Overview statistics and recent activity
- **Students** - Full student management with add/edit/delete
- **Classes** - View all classes with enrollment info
- **Payments** - Track all payments with status
- **Attendance** - Monitor class attendance
- **Settings** - Coming soon

## Key Features Explained

### Student Management
- Add new students with full details (name, email, phone, class)
- Edit existing student information
- Delete students (with confirmation)
- View student status (Active/Inactive)
- Track outstanding balances

### Class Overview
- See all 5 class types (Tiny Tumblers through Competitive Team)
- View enrollment progress with visual progress bars
- Check pricing and schedules
- See capacity utilization at a glance

### Payment Tracking
- Dashboard showing total revenue and pending amounts
- Attendance rate percentage
- Payment history table with student names, amounts, dates, methods, and status
- Automatic calculations for summary statistics

### Animations & UX
- Smooth page transitions with Framer Motion
- Hover effects on buttons and cards
- Loading animations on statistics
- Modal dialogs for forms
- Responsive mobile menu
- Scroll-to-section navigation

## Customization

### Colors
Edit `tailwind.config.js` to change the primary, secondary, and accent colors:
```js
colors: {
  primary: '#0052cc',    // Main blue
  secondary: '#ff6b35',  // Orange
  accent: '#ff1493',     // Pink
}
```

### Contact Information
Update contact details in `src/components/Contact.js`:
- Phone number
- Email address
- Physical address
- Hours of operation

### Staff Members
Edit `src/components/Staff.js` to add or remove staff members.

### Classes
Update class information in `src/context/StudentContext.js`.

## Data Persistence

Currently, all data is stored in React Context (in-memory). To persist data:
1. Add localStorage integration in StudentContext
2. Connect to a backend API (Node.js/Express)
3. Use a database (MongoDB, PostgreSQL, etc.)

Example backend endpoints to implement:
- `GET /api/students` - Fetch all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- Similar endpoints for classes, payments, attendance

## Backend Integration Ready

The project is structured to easily connect to a backend:
1. Context API is already set up for state management
2. Axios is installed for API calls
3. Replace state updates with API calls in `StudentContext.js`
4. Add authentication when backend is ready

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized with React.memo and lazy loading
- Tailwind CSS for minimal CSS bundle
- Framer Motion for smooth 60fps animations
- Responsive images and lazy loading ready

## Troubleshooting

### Port 3000 Already in Use
```bash
npm start -- --port 3001
```

### npm install fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Animations not smooth
- Ensure hardware acceleration is enabled in your browser
- Check browser dev tools for performance

## Next Steps

1. **Customize** the content with real information
2. **Add Backend** - Connect to Node.js/Express API
3. **Implement Auth** - Add login for admin dashboard
4. **Deploy** - Use Vercel, Netlify, or AWS
5. **Domain** - Set up www.sommersault-gymnastics.com

## Support

For issues or questions, contact Hassan at your preferred method.

---

Built with React, Tailwind CSS, and Framer Motion.
Ready for full backend integration.
